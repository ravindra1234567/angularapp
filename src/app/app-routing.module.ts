import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { EditProductComponent } from './pages/admin/edit-product/edit-product.component';
import { ViewProductComponent } from './pages/admin/view-product/view-product.component';
import { ViewSingleProductComponent } from './pages/admin/view-single-product/view-single-product.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { CommentComponent } from './pages/user/add-comment/comment.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoadProductComponent } from './pages/user/load-product/load-product.component';
import { UserdashboardComponent } from './pages/user/userdashboard/userdashboard.component';
import { ViewCommentComponent } from './pages/user/view-comment/view-comment.component';
import { AdminViewCommentComponent } from './pages/admin/admin-view-comment/admin-view-comment.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'comment/:pid', component: CommentComponent
  },
  {
    path: 'admin', component: DashboardComponent,
    canActivate:[AdminGuard],
    children : [
      { path: '', component: WelcomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'view-products', component: ViewProductComponent },
      { path: 'edit-product/:pid', component: EditProductComponent },
      { path: 'view-single-product/:pid', component: ViewSingleProductComponent },
      {path:'admin-view-comment',component:AdminViewCommentComponent}

  ]
  },
  {
    path: 'user-dashboard', component: UserdashboardComponent,
    canActivate:[NormalGuard],
    children: [
      { path: '', component: LoadProductComponent },
      { path: 'view-single-product/:pid', component: ViewSingleProductComponent },
      {path:'user-view-comment',component:ViewCommentComponent}
  ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
