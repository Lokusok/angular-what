import { Component, inject } from '@angular/core';
import { UsersService } from '../../data/users/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  usersService = inject(UsersService);
}
