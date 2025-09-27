import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.products = [
      { id: 1, name: 'Rice', category: 'Grains', price: 60, stock: 30 },
      { id: 2, name: 'Bread', category: 'Bakery', price: 25, stock: 50 },
      { id: 3, name: 'Milk', category: 'Dairy', price: 40, stock: 20 },
      { id: 4, name: 'Apples', category: 'Fruits', price: 30, stock: 40 },
      
      
    ];
  }

  // --- CREATE ---
  create() {
    if (!this.newProduct.name || !this.newProduct.category) return;
    const productToAdd: Product = { ...this.newProduct, id: this.nextId++ };
    this.products.push(productToAdd);
    this.newProduct = { id: 0, name: '', category: '', price: 0, stock: 0 };
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
      this.products = this.products.map(p =>
        p.id === this.editProductData!.id ? this.editProductData! : p
      );
      this.editProductData = null;
    }
  }

  cancelEdit() {
    this.editProductData = null;
  }

  // --- DELETE ---
  delete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products = this.products.filter(p => p.id !== id);
    }
  }
}
