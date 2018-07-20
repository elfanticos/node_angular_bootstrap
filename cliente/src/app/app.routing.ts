import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
const ROUTES: Routes = [
    { path: '', component: HomeComponent},
    { path: 'create_edit/:id', component: CreateEditComponent},
    { path: 'create_edit', component: CreateEditComponent },
    { path: '**', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }