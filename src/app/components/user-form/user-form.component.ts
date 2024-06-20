import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../data/users/user.interface';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  @Output() userSubmit = new EventEmitter<IUser>();
  @Input() submitText = 'Создать';
  @Input() user: IUser = {
    id: '',
    name: '',
    descr: '',
  };
  form: FormGroup = new FormGroup({});

  ngOnInit() {
    console.log('constructor:', this.user);

    this.form = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required, Validators.minLength(2)]),
      descr: new FormControl(this.user.descr, [Validators.required, Validators.minLength(30)]),
    });
  }

  onSubmit() {
    if (!this.form.valid) return;

    const user: IUser = {
      id: this.user.id || crypto.randomUUID(),
      name: this.form.value.name || '',
      descr: this.form.value.descr || '',
    };

    this.userSubmit.emit(user);
    this.form.reset();
  }
}
