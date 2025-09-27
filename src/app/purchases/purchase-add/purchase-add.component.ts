import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchase-add',
  templateUrl: './purchase-add.component.html',
  styleUrls: ['./purchase-add.component.scss']
})
export class PurchaseAddComponent implements OnInit {

  form!: FormGroup;

  suppliers = [
    { id: 1, name: 'ABC Supplier' },
    { id: 2, name: 'XYZ Trading' }
  ];

  products = [
    { id: 101, name: 'Product A', cost: 120 },
    { id: 102, name: 'Product B', cost: 200 },
    { id: 103, name: 'Product C', cost: 80 }
  ];

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      poNumber: ['', Validators.required],
      date: ['', Validators.required],
      expectedDate: [''],
      status: ['Pending', Validators.required],
      supplierId: [null, Validators.required],
      notes: [''],
      shipping: [0],
      discount: [0],
      taxRate: [0],
      items: this.fb.array([])
    });

    // Add first row
    this.addItem();
  }

  addItem(): void {
    this.items.push(this.fb.group({
      productId: [null, Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      qty: [1, [Validators.required, Validators.min(1)]]
    }));
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  onProductChange(index: number): void {
    const itemGroup = this.items.at(index) as FormGroup;
    const productId = itemGroup.get('productId')?.value;
    const product = this.products.find(p => p.id === productId);
    if (product) {
      itemGroup.patchValue({ cost: product.cost });
    }
  }

  lineTotal(index: number): number {
    const item = this.items.at(index).value;
    return (item.cost || 0) * (item.qty || 0);
  }

  get subtotal(): number {
    return this.items.controls
      .map((_: any, i: number) => this.lineTotal(i))
      .reduce((a: any, b: any) => a + b, 0);
  }

  get taxAmount(): number {
    const rate = this.form.get('taxRate')?.value || 0;
    return (this.subtotal - this.discount + this.shipping) * (rate / 100);
  }

  get discount(): number {
    return this.form.get('discount')?.value || 0;
  }

  get shipping(): number {
    return this.form.get('shipping')?.value || 0;
  }

  get grandTotal(): number {
    return this.subtotal + this.shipping - this.discount + this.taxAmount;
  }

  onSubmit(): void {
    if (this.form.valid && this.subtotal > 0) {
      const purchaseData = {
        ...this.form.value,
        subtotal: this.subtotal,
        taxAmount: this.taxAmount,
        grandTotal: this.grandTotal
      };
      console.log('Purchase Saved:', purchaseData);
      // 🔗 TODO: Call API to save purchase
    }
  }
}