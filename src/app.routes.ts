import { Routes, provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { AdminLoginComponent } from './app/admin-login/admin-login.component';
import { HomeComponent } from './app/home/home.component';
import { AdminDashboardComponent } from './app/admin-dashboard/admin-dashboard.component';
import { authGuard } from './auth.guard';
import { BLANK } from './contants';

export const routes: Routes = [
    { path: BLANK, redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'admin-login', component: AdminLoginComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
};