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
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  // --- CREATE ---
  create() {
    if (
      !this.newProduct.name.trim() ||
      !this.newProduct.category.trim() ||
      this.newProduct.price < 0 ||
      this.newProduct.stock < 0
    ) {
      console.warn('Invalid product data');
      return;
    }

    const productToAdd: Product = { ...this.newProduct }; // backend assigns ID

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
      // In real app, use modal instead of alert
      alert(
        `Product Details:\n` +
        `Name: ${product.name}\n` +
        `Category: ${product.category}\n` +
        `Price: ${product.price}\n` +
        `Stock: ${product.stock}`
      );
    }
  }

  // --- EDIT ---
  edit(product: Product) {
    this.editProductData = { ...product };
  }

  saveEdit() {
    if (this.editProductData) {
      if (
        !this.editProductData.name.trim() ||
        !this.editProductData.category.trim() ||
        this.editProductData.price < 0 ||
        this.editProductData.stock < 0
      ) {
        console.warn('Invalid product data');
        return;
      }

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
