import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserInterfaceComponent } from './_components/layout/user-interface/user-interface.component';
import { StartComponent } from './_components/start/start.component';
import { PageNotFoundComponent } from './_components/layout/page-not-found/page-not-found.component';
import { LoginComponent } from './_components/auth/login/login.component';
import { RegisterComponent } from './_components/auth/register/register.component';
import { SendPasswordResetEmailComponent } from './_components/auth/send-password-reset-email/send-password-reset-email.component';
import { PostContentComponent } from './_components/post/post-content/post-content.component';
import { PetHomeComponent } from './_components/pet/pet-home/pet-home.component';
import { PetCharacteristicsComponent } from './_components/pet/pet-characteristics/pet-characteristics.component';
import { DonateHomeComponent } from './_components/donate/donate-home/donate-home.component';
import { ContactComponent } from './_components/contact/contact.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';
import { ProfileHomeComponent } from './_components/profile/profile-home/profile-home.component';
import { AdminHomeComponent } from './_components/admin/admin-home/admin-home.component';
import { DonateItemComponent } from './_components/donate/donate-item/donate-item.component';
import { PetAdminListComponent } from './_components/pet/pet-admin-list/pet-admin-list.component';
import { PostAdminListComponent } from './_components/post/post-admin-list/post-admin-list.component';
import { PostAdminFormComponent } from './_components/post/post-admin-form/post-admin-form.component';
import { PetAdminFormComponent } from './_components/pet/pet-admin-form/pet-admin-form.component';
import {DonateAdminComponent} from './_components/donate/donate-admin/donate-admin.component';
import {PetAdoptComponent} from './_components/pet/pet-adopt/pet-adopt.component';
import {CompleteProfileComponent} from './_components/profile/complete-profile/complete-profile.component';
import {ProfileCompletedGuard} from './_guards/profile-completed.guard';
import {ProfileAdoptRequestListComponent} from './_components/profile/profile-adopt-request-list/profile-adopt-request-list.component';
import {ProfilePersonalInfoComponent} from './_components/profile/profile-personal-info/profile-personal-info.component';
import {DonatePaypalComponent} from './_components/donate/donate-paypal/donate-paypal.component';
import {DonateTiendaComponent} from './_components/donate/donate-tienda/donate-tienda.component';
import {PetSponsorComponent} from './_components/pet/pet-sponsor/pet-sponsor.component';
import {AdoptRequestsAdminComponent} from './_components/adopt/adopt-requests-admin/adopt-requests-admin.component';
import {AdoptRequestDetailComponent} from './_components/adopt/adopt-request-detail/adopt-request-detail.component';
import {DonateItemDetailAdminComponent} from './_components/donate/donate-item-detail-admin/donate-item-detail-admin.component';

const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    {
        path: 'acceso', children: [
            { path: '', component: LoginComponent },
            { path: 'registro', component: RegisterComponent },
            { path: 'recuperar-cuenta', component: SendPasswordResetEmailComponent }
        ]
    },
    {
        path: 'inicio', component: UserInterfaceComponent, children: [
            { path: '', component: StartComponent }
        ]
    },
    {
        path: 'publicacion', component: UserInterfaceComponent, children: [
            { path: 'contenido/:uid', component: PostContentComponent }
        ]
    },
    {
        path: 'mascota', component: UserInterfaceComponent, children: [
            { path: '', component: PetHomeComponent },
            { path: 'caracteristicas/:uid', component: PetCharacteristicsComponent },
            { path: 'adoptar/:uid', component: PetAdoptComponent, canActivate: [AuthGuard, ProfileCompletedGuard] },
            { path: 'apadrinar', component: PetSponsorComponent }
        ]
    },
    {
        path: 'donar', component: UserInterfaceComponent, children: [
            { path: '', component: DonateHomeComponent }
        ]
    },
    {
        path: 'informacion', component: UserInterfaceComponent, children: [
            { path: '', component: ContactComponent }
        ]
    },
    {
        path: 'perfil', component: UserInterfaceComponent, canActivate: [AuthGuard], children: [
            { path: 'completar', component: CompleteProfileComponent },
            { path: '', component: ProfileHomeComponent }
        ]
    },
    {
        path: 'administrador', component: UserInterfaceComponent, canActivate: [AdminGuard], children: [
            { path: '', component: AdminHomeComponent },
            {
                path: 'publicaciones', children: [
                    { path: 'nueva', component: PostAdminFormComponent },
                    { path: 'editar/:uid', component: PostAdminFormComponent }
                ]
            },
            {
                path: 'mascotas', children: [
                    { path: 'nueva', component: PetAdminFormComponent },
                    { path: 'editar/:uid', component: PetAdminFormComponent },
                    { path: 'adoptar/:uid', component: AdoptRequestDetailComponent }
                ]
            },
            { path: 'donacion/:uid', component: DonateItemDetailAdminComponent }
        ]
    },
    { path: 'blank', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'blank' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
