import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {
  form!: FormGroup;

  // Mock data – replace with API later
  customers: Customer[] = [
    { id: 1, name: 'Taskin Ahmed' },
    { id: 2, name: 'Sujon Ahmed' },
    { id: 3, name: 'Rahim Uddin' },
  ];

  products: Product[] = [
    { id: 1, name: 'Fresh Milk 1L', price: 120 },
    { id: 2, name: 'Premium Rice 5kg', price: 650 },
    { id: 3, name: 'Washing Powder 1kg', price: 220 },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      date: [new Date().toISOString().slice(0,10), Validators.required],
      customerId: [null, Validators.required],
      status: ['Placed', Validators.required],
      items: this.fb.array([ this.createItem() ]),
      discount: [0, [Validators.min(0)]],   // flat amount (BDT)
      taxRate: [5, [Validators.min(0)]],    // percent
      notes: ['']
    });
  }

  // ---- Items helpers ----
  get items(): FormArray { return this.form.get('items') as FormArray; }

  createItem(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      qty: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(i: number): void {
    if (this.items.length > 1) this.items.removeAt(i);
  }

  onProductChange(i: number): void {
    const group = this.items.at(i) as FormGroup;
    const pid = group.get('productId')?.value;
    const found = this.products.find(p => p.id === +pid);
    if (found) group.patchValue({ price: found.price }, { emitEvent: false });
  }

  onQtyChange(i: number): void {
    const group = this.items.at(i) as FormGroup;
    const qty = Number(group.get('qty')?.value || 1);
    if (qty < 1) group.patchValue({ qty: 1 }, { emitEvent: false });
  }

  // ---- Calculations ----
  lineTotal(i: number): number {
    const g = this.items.at(i) as FormGroup;
    const qty = Number(g.get('qty')?.value || 0);
    const price = Number(g.get('price')?.value || 0);
    return qty * price;
  }

  totalQuantity(): number {
    return this.items.controls.reduce((sum, g) => sum + Number(g.get('qty')?.value || 0), 0);
  }

  get subtotal(): number {
    return this.items.controls.reduce((sum, _, i) => sum + this.lineTotal(i), 0);
  }

  get discount(): number {
    return Math.min(Number(this.form.get('discount')?.value || 0), this.subtotal);
  }

  get taxAmount(): number {
    const rate = Number(this.form.get('taxRate')?.value || 0) / 100;
    return Math.max((this.subtotal - this.discount) * rate, 0);
  }

  get grandTotal(): number {
    return this.subtotal - this.discount + this.taxAmount;
  }

  // ---- Submit ----
  onSubmit(): void {
    if (this.form.invalid || this.subtotal <= 0) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.form.value,
      subtotal: this.subtotal,
      discount: this.discount,
      taxAmount: this.taxAmount,
      grandTotal: this.grandTotal
    };

    // TODO: replace with service call
    console.log('SALE SUBMIT:', payload);
    alert('Sale saved! (check console for payload)');

    // Reset form and keep at least one item row
    this.form.reset({
      date: new Date().toISOString().slice(0,10),
      customerId: null,
      status: 'Placed',
      // items: [],
      discount: 0,
      taxRate: 5,
      notes: ''
    });
    this.items.clear();
    this.items.push(this.createItem());
  }
}
