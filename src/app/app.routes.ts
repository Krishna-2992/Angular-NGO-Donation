import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

export const routes: Routes = [
    {
        path: "login", 
        title: "Login", 
        component: LoginComponent
    }, 
    {
        path: "", 
        title: "Homepage", 
        component: HomepageComponent
    }
];
