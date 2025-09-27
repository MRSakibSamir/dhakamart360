import { Component, OnInit } from '@angular/core';

interface PurchaseItem {
  product?: { name: string };
  price: number;
  qty: number;
  lineTotal: number;
}

interface Purchase {
  id: number;
  date: Date;
  supplier?: { name: string };
  status: string;
  items: PurchaseItem[];
}

@Component({
  selector: 'app-purchase-edit',                     // match component name
  templateUrl: './product-edit.component.html',     // match template file
})
export class ProductEditComponent implements OnInit {
  purchase: Purchase | null = null;
  total: number = 0;
  loading: boolean = true;
  error: string = '';

  editItem: PurchaseItem | null = null;   // currently editing item
  backupItem: PurchaseItem | null = null; // backup copy for cancel

  ngOnInit(): void {
    this.fetchPurchase();
  }

  // Simulate fetching purchase from API
  fetchPurchase(): void {
    setTimeout(() => {
      try {
        const items: PurchaseItem[] = [
          { product: { name: 'Item A' }, price: 25, qty: 4, lineTotal: 100 },
          { product: { name: 'Item B' }, price: 15, qty: 6, lineTotal: 90 },
        ];

        this.purchase = {
          id: 201,
          date: new Date(),
          supplier: { name: 'Acme Supplies' },
          status: 'Received',
          items,
        };

        this.calculateTotals();
        this.loading = false;
      } catch (err) {
        this.error = 'Failed to load purchase details';
        this.loading = false;
      }
    }, 500);
  }

  // Begin editing an item
  edit(item: PurchaseItem): void {
    this.editItem = { ...item }; // create a copy for editing
    this.backupItem = item;      // original reference
  }

  // Cancel editing
  cancelEdit(): void {
    this.editItem = null;
    this.backupItem = null;
  }

  // Save edited item
  saveEdit(): void {
    if (this.editItem && this.backupItem) {
      this.backupItem.price = this.editItem.price;
      this.backupItem.qty = this.editItem.qty;
      this.updateLineTotal(this.backupItem);
    }
    this.editItem = null;
    this.backupItem = null;
    this.calculateTotals();
  }

  // Delete an item
  deleteItem(item: PurchaseItem): void {
    if (!this.purchase) return;
    this.purchase.items = this.purchase.items.filter(i => i !== item);
    this.calculateTotals();
  }

  // Update line total for a single item
  updateLineTotal(item: PurchaseItem): void {
    item.lineTotal = item.price * item.qty;
    this.calculateTotals();
  }

  // Calculate grand total
  calculateTotals(): void {
    if (!this.purchase) return;
    this.total = this.purchase.items.reduce((sum, item) => sum + item.lineTotal, 0);
  }
}
