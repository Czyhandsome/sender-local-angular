import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class RouterService {
  constructor(private router: Router) {
  }

  public jumpTo(url: string): void {
    this.router.navigateByUrl(url);
  }
}
