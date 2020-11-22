import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grant-information',
  templateUrl: './grant-information.component.html',
  styleUrls: ['./grant-information.component.scss']
})
export class GrantInformationComponent implements OnInit {
  public readonly link = 'http://zdunskawola.pl/pl/aktualnosci/1494-stop-smog-mamy-nowy-regulamin-przyznawania-dotacji-na-wymiane-piecow-weglowych';

  constructor() { }

  ngOnInit(): void {
  }

}
