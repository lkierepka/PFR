import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grant-summary',
  templateUrl: './grant-summary.component.html',
  styleUrls: ['./grant-summary.component.scss']
})
export class GrantSummaryComponent implements OnInit {

  public readonly link = 'http://zdunskawola.pl/pl/aktualnosci/1494-stop-smog-mamy-nowy-regulamin-przyznawania-dotacji-na-wymiane-piecow-weglowych';

  constructor() { }

  ngOnInit(): void {
  }

}
