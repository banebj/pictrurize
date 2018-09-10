import { Routes, RouterModule } from "@angular/router";
import { ImagesComponent } from "./components/images/images.component";

// COMPONENTS //

const appRoutes: Routes = [
    { path: '', component: ImagesComponent },
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true});
