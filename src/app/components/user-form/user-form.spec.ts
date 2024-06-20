import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  it('should create', () => {
    const comp = new UserFormComponent();
    expect(comp.isDisabled).toBeFalsy();
  });
});
