import { Component, OnInit } from '@angular/core';
import { Sale, SaleItem } from 'model';


@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
})
export class SalesDetailComponent implements OnInit {
  sale: Sale | null = null;  // make nullable to be safe
  total: number = 0;
  loading: boolean = true;
  error: string = '';

  ngOnInit(): void {
    this.fetchSale();
  }

  fetchSale() {
    // Simulate API call
    setTimeout(() => {
      try {
        const items: SaleItem[] = [
          { product: { name: 'Product A' }, price: 100, qty: 2, lineTotal: 0 },
          { product: { name: 'Product B' }, price: 50, qty: 3, lineTotal: 0 },
        ];

        this.sale = {
          id: 101,
          date: new Date(),
          customer: { name: 'John Doe' },
          status: 'Completed',
          items,
        };

        this.calculateTotals();
        this.loading = false;
      } catch (err) {
        this.error = 'Failed to load sale details';
        this.loading = false;
      }
    }, 1000);
  }


  calculateTotals() {
  if (!this.sale?.items) return;

  // Calculate line totals
  this.sale.items.forEach((item: SaleItem) => {
    item.lineTotal = item.price * item.qty;  // ok even if lineTotal is optional
  });

  // Calculate grand total safely
  this.total = this.sale.items.reduce(
    (sum, item) => sum + (item.lineTotal ?? 0),
    0
  );
}

}
