import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { authGuard } from './guards/auth.guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [
    {path:"", component:HomePageComponent},
    {path:"login", component:LoginPageComponent},
    {path:"registrar", component:RegisterPageComponent},
    {path:"mensajes", component:MessagesPageComponent,canActivate: [authGuard]},
    {path:"**", component:HomePageComponent,}
];
