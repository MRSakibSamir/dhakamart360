import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  totalProducts = 0;
  salesToday = 0;
  lowStockCount = 0;
  pendingOrders = 0;

  ngOnInit(): void {
    // Simulate API calls
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Replace with service calls in a real app
    this.totalProducts = 154;
    this.salesToday = 2560;
    this.lowStockCount = 12;
    this.pendingOrders = 7;
  }
}