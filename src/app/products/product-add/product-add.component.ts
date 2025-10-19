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
    price: 0,
    stock: 0,
    sku: ''
  };

  constructor(private router: Router) {}

  save() {
    console.log('Creating product:', this.product);
    // Add your product creation logic here
    this.router.navigate(['/products']);
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}