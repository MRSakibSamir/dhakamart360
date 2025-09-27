import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

interface Supplier {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  cost: number;
}

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {
  form!: FormGroup;

  // Mock data — replace with API later
  // suppliers: Supplier[] = [
  //   { id: 1, name: 'Fresh Foods Ltd' },
  //   { id: 2, name: 'City Beverages' },
  //   { id: 3, name: 'HomeCare Supplies' },
  // ];

  products: Product[] = [
    { id: 1, name: 'Fresh Milk 1L',      cost: 95 },
    { id: 2, name: 'Premium Rice 5kg',   cost: 520 },
    { id: 3, name: 'Washing Powder 1kg', cost: 180 },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      poNumber: [this.generatePoNumber(), Validators.required],
      date: [this.today(), Validators.required],
      expectedDate: [this.today()],
      supplierId: [null, Validators.required],
      status: ['Pending', Validators.required],
      items: this.fb.array([this.createItem()]),
      shipping: [0, [Validators.min(0)]],   // flat amount
      discount: [0, [Validators.min(0)]],   // flat amount
      taxRate: [5, [Validators.min(0)]],    // %
      notes: ['']
    });
  }

  // Helpers
  today(): string { return new Date().toISOString().slice(0, 10); }
  generatePoNumber(): string {
    const d = new Date();
    return `PO-${d.getFullYear().toString().slice(2)}${(d.getMonth()+1).toString().padStart(2,'0')}${d.getDate().toString().padStart(2,'0')}-${d.getHours()}${d.getMinutes()}`;
  }

  // ---- Items ----
  get items(): FormArray { return this.form.get('items') as FormArray; }

  createItem(): FormGroup {
    return this.fb.group({
      productId: [null, Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      qty: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addItem(): void { this.items.push(this.createItem()); }
  removeItem(i: number): void { if (this.items.length > 1) this.items.removeAt(i); }

  onProductChange(i: number): void {
    const row = this.items.at(i) as FormGroup;
    const pid = row.get('productId')?.value;
    const found = this.products.find(p => p.id === +pid);
    if (found) row.patchValue({ cost: found.cost }, { emitEvent: false });
  }

  // ---- Totals ----
  lineTotal(i: number): number {
    const g = this.items.at(i) as FormGroup;
    const qty = Number(g.get('qty')?.value || 0);
    const cost = Number(g.get('cost')?.value || 0);
    return qty * cost;
  }

  get subtotal(): number {
    return this.items.controls.reduce((sum, _, i) => sum + this.lineTotal(i), 0);
  }

  get shipping(): number {
    return Math.max(Number(this.form.get('shipping')?.value || 0), 0);
  }

  get discount(): number {
    return Math.min(Number(this.form.get('discount')?.value || 0), this.subtotal + this.shipping);
  }

  get taxAmount(): number {
    const rate = Number(this.form.get('taxRate')?.value || 0) / 100;
    const base = Math.max(this.subtotal + this.shipping - this.discount, 0);
    return base * rate;
  }

  get grandTotal(): number {
    return this.subtotal + this.shipping - this.discount + this.taxAmount;
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
      shipping: this.shipping,
      discount: this.discount,
      taxAmount: this.taxAmount,
      grandTotal: this.grandTotal
    };

    // TODO: replace with service call
    console.log('PURCHASE SUBMIT:', payload);
    alert('Purchase saved! (check console for payload)');

    // Reset form
    this.form.reset({
      poNumber: this.generatePoNumber(),
      date: this.today(),
      expectedDate: this.today(),
      supplierId: null,
      status: 'Pending',
      items: [],
      shipping: 0,
      discount: 0,
      taxRate: 5,
      notes: ''
    });
    this.items.push(this.createItem());
  }
}
