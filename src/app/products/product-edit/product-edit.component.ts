import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productId: string | null = null;
  product = {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    sku: ''
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      // Fetch product data from service based on productId
      this.fetchProductData(this.productId);
    }
  }

  fetchProductData(id: string) {
    // Replace this with actual service call
    console.log('Fetching product with ID:', id);
    
    // Mock data - replace with actual API call
    this.product = {
      name: 'Laptop',
      category: 'Electronics',
      price: 999.99,
      stock: 15,
      sku: 'LPTOPT123'
    };
  }

  save() {
    console.log('Updating product:', this.product);
    // Add your product update logic here
    this.router.navigate(['/products']);
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}