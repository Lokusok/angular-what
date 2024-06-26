import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../data/users/users.service';
import { IUser } from '../../data/users/user.interface';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-create-page',
  standalone: true,
  imports: [ReactiveFormsModule, UserFormComponent],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss',
})
export class CreatePageComponent {
  usersService = inject(UsersService);

  disabledActions = false;

  createUser(user: IUser) {
    this.disabledActions = true;
    this.usersService.addUser(user).subscribe(() => {
      this.disabledActions = false;
    });
  }
}
