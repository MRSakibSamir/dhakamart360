import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  product = {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    sku: ''
  };

  isEdit = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEdit = true;
      // Fetch product from service
      this.product = {
        name: 'Sample Product',
        category: 'Sample Category',
        price: 200,
        stock: 30,
        sku: 'SKU123'
      };
    }
  }

  save() {
    if (this.isEdit) {
      console.log('Updating product:', this.product);
    } else {
      console.log('Creating product:', this.product);
    }
    this.router.navigate(['/products']);
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}