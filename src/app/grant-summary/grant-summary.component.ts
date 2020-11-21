import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grant-summary',
  templateUrl: './grant-summary.component.html',
  styleUrls: ['./grant-summary.component.scss']
})
export class GrantSummaryComponent implements OnInit {

  public readonly grants: any[] = [
    {
      name: 'STOP Smog',
      description: 'Program adresowany jest do mieszkańców Zduńskiej Woli. Wniosek złożyć mogą osoby i podmioty, które dysponują prawem własności, współwłasności lub użytkowania wieczystego do położonej w naszym mieście nieruchomości, w której zainstalowano piec węglowy. Podmioty uprawnione do otrzymania dotacji',
      grantAmount: 'Maksymalna dotacja to 5.000 zł. Nie może ona stanowić więcej niż 50% kosztów inwestycji. Przykład: jeśli kocioł gazowy kosztuje 11.000 zł, to 5.000 zł wydajesz z dotacji, a 6.000 dopłacasz sam. Dotacja stanowi ok. 45% wartości inwestycji, a więc zgodnie z wymogiem nie przekracza 50%',
      link: 'http://zdunskawola.pl/pl/aktualnosci/1494-stop-smog-mamy-nowy-regulamin-przyznawania-dotacji-na-wymiane-piecow-weglowych',
      attachment: 'attachment'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
