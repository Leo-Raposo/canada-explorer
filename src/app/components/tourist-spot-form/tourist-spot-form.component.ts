import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tourist-spot-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tourist-spot-form.component.html',
  styleUrls: ['./tourist-spot-form.component.css']
})
export class TouristSpotFormComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  signUpForm: FormGroup;
  signInForm: FormGroup;
  isRightPanelActive = false;
  errorMessage: string | null = null;

  constructor() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSignUp() {
    const { email, password, username } = this.signUpForm.value;
    this.authService.register(email, username, password).subscribe({
      next: () => {
        console.log('Sign up successful');
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  onSignIn() {
    const { email, password } = this.signInForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        if (response.data?.session) {
          console.log('Sign in successful');
          this.router.navigateByUrl('/home');
        } else {
          this.errorMessage = 'Login failed, please check your credentials';
        }
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  onRecoverPassword() {
    console.log('Password recovery initiated');
  }

  togglePanel() {
    this.isRightPanelActive = !this.isRightPanelActive;
  }
}
