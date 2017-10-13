import { RouterModule, Routes } from "@angular/router";
import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
]
// Using a '/' to make sure Angular goes to the absolute path and not the relative,
// which would append the path to the current url

// pathMatch -> to make sure it matches exact, otherwise the empty path would be matched with all paths

export const routing = RouterModule.forRoot(APP_ROUTES);
