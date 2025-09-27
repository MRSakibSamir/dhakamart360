import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  // Quick stats for user view
  ordersCount = 0;
  pendingDeliveries = 0;
  wishlistCount = 0;
  walletBalance = 0;   // e.g., BDT balance
  rewardPoints = 0;

  ngOnInit(): void {
    // Simulate API calls
    this.loadUserDashboardData();
  }

  private loadUserDashboardData(): void {
    // TODO: replace these with real service calls
    this.ordersCount = 32;
    this.pendingDeliveries = 2;
    this.wishlistCount = 9;
    this.walletBalance = 1250;   // BDT
    this.rewardPoints = 480;
  }
}
