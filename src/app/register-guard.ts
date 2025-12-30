import { CanDeactivateFn } from '@angular/router';
import { Register } from './pages/register/register';

export const registerGuard: CanDeactivateFn<Register> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  // Check if form is dirty or valid before confirming
  if (component.registerForm.dirty || component.registerForm.valid && !component.isRegisred) {
    const alert = window.confirm('Are you sure you want to leave this page?');
    return alert;
  }
  return true;
};
