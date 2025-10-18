import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  nextId: number = 11;
  newProduct: Product = { id: 0, name: '', category: '', price: 0, stock: 0 };
  editProductData: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // --- LOAD FROM BACKEND ---
  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        // Adjust nextId if needed based on backend data
        const maxId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) : 0;
        this.nextId = maxId + 1;
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  // --- CREATE ---
  create() {
    if (!this.newProduct.name || !this.newProduct.category) return;
    const productToAdd: Product = { ...this.newProduct, id: this.nextId++ };

    // Save to backend
    this.productService.createProduct(productToAdd).subscribe({
      next: (createdProduct) => {
        this.products.push(createdProduct);
        this.newProduct = { id: 0, name: '', category: '', price: 0, stock: 0 };
      },
      error: (err) => console.error('Error creating product:', err)
    });
  }

  // --- READ (VIEW) ---
  read(id: number) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      alert(`Product Details:\nName: ${product.name}\nCategory: ${product.category}\nPrice: ${product.price}\nStock: ${product.stock}`);
    }
  }

  // --- EDIT ---
  edit(product: Product) {
    this.editProductData = { ...product };
  }

  saveEdit() {
    if (this.editProductData) {
      this.productService.updateProduct(this.editProductData).subscribe({
        next: (updatedProduct) => {
          this.products = this.products.map(p =>
            p.id === updatedProduct.id ? updatedProduct : p
          );
          this.editProductData = null;
        },
        error: (err) => console.error('Error updating product:', err)
      });
    }
  }

  cancelEdit() {
    this.editProductData = null;
  }

  // --- DELETE ---
  delete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
        },
        error: (err) => console.error('Error deleting product:', err)
      });
    }
  }
}
