import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryAddComponent } from './categories/category-add/category-add.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerAddComponent } from './customers/customer-add/customer-add.component';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { SalesListComponent } from './sales/sales-list/sales-list.component';
import { SalesAddComponent } from './sales/sales-add/sales-add.component';
import { SalesDetailComponent } from './sales/sales-detail/sales-detail.component';
import { PurchaseListComponent } from './purchases/purchase-list/purchase-list.component';
import { PurchaseAddComponent } from './purchases/purchase-add/purchase-add.component';
import { PurchaseDetailComponent } from './purchases/purchase-detail/purchase-detail.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { StockAdjustmentComponent } from './inventory/stock-adjustment/stock-adjustment.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';
import { PurchaseReportComponent } from './reports/purchase-report/purchase-report.component';
import { InventoryReportComponent } from './reports/inventory-report/inventory-report.component';
// import { ProfitLossReportComponent } from './reports/profit-loss-report/profit-loss-report.component';
// import { ShopProfileComponent } from './settings/shop-profile/shop-profile.component';
// import { TaxSettingsComponent } from './settings/tax-settings/tax-settings.component';
// import { CurrencySettingsComponent } from './settings/currency-settings/currency-settings.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductEditComponent } from './products/product-edit/product-edit.component';

import { ProductFormComponent } from './products/product-form/product-form.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProductListComponent,
    ProductAddComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CustomerListComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerDetailComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    UserDetailComponent,
    SalesListComponent,
    SalesAddComponent,
    SalesDetailComponent,
    PurchaseListComponent,
    PurchaseAddComponent,
    PurchaseDetailComponent,
    InventoryListComponent,
    StockAdjustmentComponent,
    SalesReportComponent,
    PurchaseReportComponent,
    InventoryReportComponent,
    // ProfitLossReportComponent,
    // ShopProfileComponent,
    // TaxSettingsComponent,
    // CurrencySettingsComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ProductEditComponent,
    ProductFormComponent,
    CategoryFormComponent,
    CustomerFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
