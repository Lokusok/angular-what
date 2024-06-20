import { Component, EventEmitter, Input, OnChanges, Output, effect, input } from '@angular/core';
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
  isDisabled = input(false);
  @Input() user: IUser = {
    id: '',
    name: '',
    descr: '',
  };
  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl({ value: this.user.name, disabled: this.isDisabled() }, [
        Validators.required,
        Validators.minLength(2),
      ]),
      descr: new FormControl({ value: this.user.descr, disabled: this.isDisabled() }, [
        Validators.required,
        Validators.minLength(30),
      ]),
    });
  }

  constructor() {
    effect(() => {
      if (this.isDisabled()) {
        this.form.get('name')?.disable();
        this.form.get('descr')?.disable();
      } else {
        this.form.get('name')?.enable();
        this.form.get('descr')?.enable();
      }
    });
  }

  // ngOnChanges(changes: Record<string, any>) {
  //   const isDisabledNew = changes['isDisabled'];

  //   if (isDisabledNew) {
  //     if (isDisabledNew.currentValue) {
  // this.form.get('name')?.disable();
  // this.form.get('descr')?.disable();
  //     } else {
  // this.form.get('name')?.enable();
  // this.form.get('descr')?.enable();
  //     }
  //   }
  // }

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
