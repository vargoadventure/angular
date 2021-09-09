import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AlertMessage } from '../models/alert-message.model';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly router: Router,
    private readonly sessionService: SessionService
  ) {}

  private authorize(): boolean {
    const authorized: boolean = (this.sessionService.getSession() !== null);

    if (!authorized) {
      const message: AlertMessage = { status: 'warning', text: 'Please login before continuing to that page.'}
      this.sessionService.setFlash(JSON.stringify(message));
      this.router.navigateByUrl('/');
    }

    return authorized;
  }

  canActivate(): boolean {
    return this.authorize();
  }
  canActivateChild(): boolean {
    return this.authorize();
  }
  
}
