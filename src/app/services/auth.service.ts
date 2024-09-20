import { Injectable, signal } from '@angular/core';
import { AuthResponse, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  currentUser = signal<{ email: string; username: string } | null>(null);

  register(email: string, username: string, password: string): Observable<AuthResponse> {
    const promise = this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    return from(promise);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabase.auth.signInWithPassword({ email, password });
    return from(promise);
  }

  private async retryLogin(email: string, password: string, retries = 3): Promise<AuthResponse> {
    try {
      const session = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });
      return session;
    } catch (error: any) {
      if (error.message.includes('NavigatorLockAcquireTimeoutError') && retries > 0) {
        console.warn('Failed to acquire lock, retrying...');
        await this.delay(1000);
        return this.retryLogin(email, password, retries - 1);
      } else {
        throw error;
      }
    }
  }


  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  logout(): void {
    this.supabase.auth.signOut();
  }


  private async performLogin(email: string, password: string): Promise<AuthResponse> {
    try {
      const session = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });
      return session;
    } catch (error: any) {
      if (error.message.includes('NavigatorLockAcquireTimeoutError')) {
        console.warn('Failed to acquire lock for authentication token. Retrying...');

        return Promise.reject('Lock timeout, try again.');
      } else {
        console.error('Error during sign-in:', error);
        throw error;
      }
    }
  }
}
