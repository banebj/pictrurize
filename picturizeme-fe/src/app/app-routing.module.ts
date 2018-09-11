import { Routes, RouterModule } from "@angular/router";
import { ImagesComponent } from "./components/images/images.component";
import { HomeComponent } from "./components/home/home.component";

// COMPONENTS //

const appRoutes: Routes = [
    { path: 'upload', component: ImagesComponent },
    { path: '', component: HomeComponent },
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true});
