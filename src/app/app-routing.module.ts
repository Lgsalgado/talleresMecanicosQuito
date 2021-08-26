import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfiliacionComponent } from './component/afiliacion/afiliacion.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { SolicitudComponent } from './component/solicitud/solicitud.component';
import { MainComponent } from './layout/main/main.component';
import { AuthGuard } from './shared/session/auth-guard.service';
import { UserComponent as SolicitudUserComponent } from './component/solicitud/user/user.component';
import { ViewComponent as SolicitudViewComponent } from './component/solicitud/view/view.component';
import { TallerlistComponent } from './component/taller/tallerlist/tallerlist.component';
import { TallerviewComponent } from './component/taller/tallerview/tallerview.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'afiliacion',
        component: AfiliacionComponent,
      },
      {
        path: 'solicitudes',
        component: SolicitudComponent,
      },
      {
        path: 'solicitud/:id',
        component: SolicitudViewComponent,
      },
      {
        path: 'misafiliaciones',
        component: SolicitudUserComponent,
      },
      {
        path: 'taller',
        component: TallerlistComponent,
      },
      {
        path: 'taller/:id',
        component: TallerviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
