import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CommonService {
  constructor(private injector: Injector) {

  }

  public goTo(url: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  public toLogin(): void {
    this.goTo('/login');
  }
}
