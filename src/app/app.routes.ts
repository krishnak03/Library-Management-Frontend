import { Routes, provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'admin-login', component: AdminLoginComponent },
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
};