import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PFR';
  public isInitialized: boolean = false;

  public initializePage() {
    this.isInitialized = true;
  }
}
