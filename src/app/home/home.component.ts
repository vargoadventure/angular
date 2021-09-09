import { Component, OnInit } from '@angular/core';
import { AlertMessage } from '../shared/models/alert-message.model';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  message?: AlertMessage | null;

  constructor(private readonly sessionService: SessionService) {}

  private getFlashMessage(): void {
    const flashMessage: string = this.sessionService.getFlash();

    console.log('message: ', flashMessage);

    if (flashMessage) {
      this.message = JSON.parse(flashMessage);
    } else {
      this.message = null;
    }
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getFlashMessage();
    }, 1_000);
  }

}
