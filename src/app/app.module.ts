import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Material modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AfiliacionComponent } from './component/afiliacion/afiliacion.component';
import { HomeComponent } from './component/home/home.component';
import { SolicitudComponent } from './component/solicitud/solicitud.component';
import { MainComponent } from './layout/main/main.component';
import { AuthInterceptor } from './shared/session/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { AuthGuard } from './shared/session/auth-guard.service';
import { LoadingComponent } from './layout/loading/loading.component';
import { PendingComponent } from './component/solicitud/pending/pending.component';
import { ApprovedComponent } from './component/solicitud/approved/approved.component';
import { RejectedComponent } from './component/solicitud/rejected/rejected.component';
import { UserComponent } from './component/solicitud/user/user.component';
import { ViewComponent } from './component/solicitud/view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AfiliacionComponent,
    HomeComponent,
    SolicitudComponent,
    MainComponent,
    SidenavComponent,
    LoadingComponent,
    PendingComponent,
    ApprovedComponent,
    RejectedComponent,
    UserComponent,
    ViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
