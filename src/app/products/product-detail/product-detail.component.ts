import { Component, OnInit } from '@angular/core';

interface PurchaseItem {
  product?: { name: string };
  price: number;
  qty: number;
  lineTotal?: number;
}

interface Purchase {
  id: number;
  date: string | Date;  // Fixed: Allow both string and Date types
  supplier?: { name: string };
  status: string;
  items: PurchaseItem[];
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class PurchaseDetailComponent implements OnInit {
  purchase!: Purchase;
  total: number = 0;
  loading: boolean = true;
  error: string = '';

  ngOnInit(): void {
    this.fetchPurchase();
  }

  fetchPurchase() {
    // Replace with API call
    setTimeout(() => {
      try {
        this.purchase = {
          id: 201,
          date: new Date().toISOString(), // Fixed: Use ISO string format
          supplier: { name: 'Acme Supplies' },
          status: 'Received',
          items: [
            { product: { name: 'Item A' }, price: 25.50, qty: 4 }, // Fixed: Use decimal numbers
            { product: { name: 'Item B' }, price: 15.75, qty: 6 }, // Fixed: Use decimal numbers
          ],
        };
        this.calculateTotals();
        this.loading = false;
      } catch (err) {
        this.error = 'Failed to load purchase details';
        this.loading = false;
      }
    }, 1000);
  }

  calculateTotals() {
    if (!this.purchase?.items) return;

    this.purchase.items.forEach(item => {
      item.lineTotal = item.price * item.qty;
    });

    this.total = this.purchase.items.reduce((sum, item) => sum + (item.lineTotal ?? 0), 0);
  }
}