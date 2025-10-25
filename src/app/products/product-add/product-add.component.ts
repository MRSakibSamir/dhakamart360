import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  product = {
    name: '',
    category: '',
    price: null,  // Changed from 0 to null
    stock: null,  // Changed from 0 to null
    sku: ''
  };

  constructor(private router: Router) {}

  save() {
    console.log('Creating product:', this.product);
    
    // Validate form before proceeding
    if (this.isFormValid()) {
      // Add your product creation logic here (e.g., call a ProductService)
      // For now, just log and navigate
      this.router.navigate(['/products']);
    } else {
      console.error('Form is invalid. Please fill all required fields.');
      // You can add user feedback here (toast, alert, etc.)
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }

  // Helper method to validate form
  private isFormValid(): boolean {
    return !!(
      this.product.name &&
      this.product.category &&
      this.product.price !== null &&
      this.product.price >= 0 &&
      this.product.stock !== null &&
      this.product.stock >= 0 &&
      this.product.sku
    );
  }
}