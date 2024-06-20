import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../data/users/user.interface';
import { UsersService } from '../../data/users/users.service';
import { map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [AsyncPipe, UserFormComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  usersService = inject(UsersService);

  disabledActions = false;
  mode: 'view' | 'edit' = 'view';

  user = this.route.params.pipe(
    switchMap(({ id }) => {
      return this.usersService.getUserById(id);
    })
  );

  onDeleteBtnClick(userId: IUser['id']) {
    this.disabledActions = true;
    this.usersService.deleteUserById(userId).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  editUser(user: IUser) {
    this.disabledActions = true;

    this.usersService.editById(user.id, user).subscribe(() => {
      this.mode = 'view';
      this.disabledActions = false;
      this.user = this.usersService.getUserById(user.id);
    });
  }

  toEditMode() {
    this.mode = 'edit';
  }

  toViewMode() {
    this.mode = 'view';
  }
}
