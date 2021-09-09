import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  private readonly storage: Storage = sessionStorage;

  public getFlash(): string {
    const message: string = this.storage.getItem('flash') as string;

    this.storage.removeItem('flash');

    return message;
  }

  public setFlash(value: string): void {
    this.storage.setItem('flash', value);
  }

  public setSession(): void {
    this.storage.setItem('authorized', 'true');
  }

  public getSession(): string {
    return this.storage.getItem('authorized') as string;
  }
}
