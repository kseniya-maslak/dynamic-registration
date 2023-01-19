import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        m => m.RegistrationModule
      ),
  },
  {
    path: 'welcome',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
