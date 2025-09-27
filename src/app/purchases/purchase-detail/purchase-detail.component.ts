import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailComponent implements OnInit {

  purchase: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // TODO: Replace with API call to get purchase by ID
    // Mock data for now:
    this.purchase = {
      id,
      poNumber: 'PO-1001',
      date: new Date(),
      expectedDate: new Date(),
      status: 'Pending',
      supplier: { id: 1, name: 'ABC Supplier' },
      notes: 'Urgent delivery required',
      shipping: 50,
      discount: 20,
      taxRate: 5,
      items: [
        { product: { id: 101, name: 'Product A' }, cost: 120, qty: 2 },
        { product: { id: 102, name: 'Product B' }, cost: 200, qty: 1 }
      ]
    };
  }

  get subtotal(): number {
    return this.purchase?.items
      ?.map((item: any) => item.cost * item.qty)
      ?.reduce((a: number, b: number) => a + b, 0) || 0;
  }

  get taxAmount(): number {
    return ((this.subtotal - this.purchase.discount + this.purchase.shipping) * (this.purchase.taxRate / 100));
  }

  get grandTotal(): number {
    return this.subtotal + this.purchase.shipping - this.purchase.discount + this.taxAmount;
  }
}
