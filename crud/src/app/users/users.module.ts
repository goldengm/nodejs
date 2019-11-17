import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [UserListComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        FormsModule,
        ModalModule.forRoot()
    ]
})
export class UsersModule { }
