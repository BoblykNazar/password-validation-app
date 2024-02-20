import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidationFormComponent } from './components/validation-form/validation-form.component';

const routes: Routes = [{
  path: '', component: ValidationFormComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
