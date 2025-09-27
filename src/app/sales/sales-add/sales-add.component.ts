import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Customer {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-sales-add',
  templateUrl: './sales-add.component.html'
})
export class SalesAddComponent implements OnInit {
  form!: FormGroup;
  customers: Customer[] = [];
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.form = this.fb.group({
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      customerId: [null, Validators.required],
      status: ['Placed', Validators.required],
      items: this.fb.array([])
    });

    // Example data (replace with API call)
    this.customers = [
      { id: 1, name: 'Customer A' },
      { id: 2, name: 'Customer B' }
    ];

    this.products = [
      { id: 1, name: 'Product X', price: 100 },
      { id: 2, name: 'Product Y', price: 250 },
      { id: 3, name: 'Product Z', price: 400 }
    ];

    // Start with one empty item
    this.addItem();
  }

  // Items getter
  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  // Add new item row
  addItem(): void {
    const item = this.fb.group({
      productId: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      qty: [1, [Validators.required, Validators.min(1)]]
    });
    this.items.push(item);
  }

  // Remove item row
  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  // On product selection, auto-fill price
  onProductChange(index: number): void {
    const itemGroup = this.items.at(index) as FormGroup;
    const productId = itemGroup.get('productId')?.value;
    const product = this.products.find(p => p.id === productId);
    if (product) {
      itemGroup.patchValue({ price: product.price });
    }
  }

  // Total amount calculation
  get total(): number {
    return this.items.controls.reduce((sum, row) => {
      const val = row.value;
      return sum + (val.price * val.qty);
    }, 0);
  }

  // Submit form
  onSubmit(): void {
    if (this.form.invalid || this.items.length === 0) {
      this.form.markAllAsTouched();
      return;
    }

    const saleData = this.form.value;
    console.log('Sale Submitted:', saleData);

    // TODO: Replace with API call
    alert('Sale saved successfully!');
    this.router.navigate(['/sales']);
  }
}
