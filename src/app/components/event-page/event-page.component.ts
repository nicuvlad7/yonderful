import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Event } from 'src/app/models/event';
import { EventLocation } from 'src/app/models/event-location';
import { EndpointsService } from 'src/app/services/endpoints.service';
@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {
  @Input() eventId: number = 0;
  event: Event = {
    id: 1,
    categoryId: 1,
    hostId: 1,
    title: 'Outdoor',
    startingDate: '11/02/2022 @ 10:00',
    endingDate: '12/02/2022 @ 12:00',
    minimumParticipants: 5,
    maximumParticipants: 9,
    autoCancel: false,
    autoJoin: true,
    joinDeadline: '09/02/2022 @ 23:59',
    fee: 150,
    description: 'The Apuseni mountains are one among the most interesting touristic destinations from Romania.  Karst topography, flora and fauna are some of the reasons why the area was declared a nature reservation. Local people the so called "moti" , are famous for the wood carved objects they are still making for generations. Numerous wild gorges (Galbenei, Ordâncutii, Ariesului), sparkling waterfalls (Vârciorog, Valul Miresei, Evantai), huge and marvelous caves (Ponorului Fortresses, Altarului Cave, Live Fire Glacier, Scarisoara Glacier) and peaks (Bihorul, Piatra Grăitoare) adorn the Apuseni Mountains with true landscape treasures.',
    eventLocation: {
      id: 2,
      street: "Memorandumului",
      address: "10",
      city: "Cluj-Napoca",
      province: "Cluj"
    },
    contactEmail: 'asdf@tss-yonder.com',
    contactPhone: '0770123321',
    tags: 'Tag1*Tag2*Tag3*Tag4*Tag5',
    backgroundImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAuCAYAAAB9CdqYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAOJSURBVGhD7Zq9SjNBFIZPvgsI1kIgdoJNsBBiZSPYqSi2iYV98AKiF6Bob1BbRdBUKZMqllFIaiXa+3MD67yHOTrmW7M7k9m4ig+E3Zksm3n2nJkzK2YCBf1i/umjNaenp3R/f69b6cVZsF6v083NjW6ll9iCh4eHQ4UQ0VQKYw7G4fLyMpiYmAg6nY7u+eDg4CAoFArB3d2d7kkPVosMojQ7O0snJyfUarUon89TqVQiJc7n+KQO1rSgUqkECwsLHElE7quopoXICCJS+CBK5XKZpqamSAm9R2t3d5dub29JyXKEAa5LSzQjF5nn52d99oE5eIjjY16HdmrgOFqA9FQR4vNms8ltNSe5nUas6uDV1RUvMIhWJpOh1dVVWl5e9hax8/Nzen191S1PaNFIECWVmhw14enpiY87OztcJkbh7OwsmJubCxYXF3WPH2ILQgK1UFhZWfnUxupqytvQ7XZZrtFoBNVq1auk9RwUBgVd6ff773ICHpYvSWdByI1a/15eXlgE6TkIJNfW1nTLHefNtoogqXmnW/ZgMVESVCwWKZfLUa1W4/6HhwdS04G2t7e5f319nftd8f4+2Ov1aGZmRrfCEbnHx0duq0iyDIDg0tISC29sbHAbXFxc8NEajqMnMI+mp6cj5w8WksnJSU7Bo6MjTlXpN9MV32F+yrUueBHEAGX1w4oo5zJwEwxarouLlBAXyZEFMVD88Obm5iehvb09jqYpIhHByukCfsdWciTBdrvNA8bAw8D3kMRRap1N5MKwlXQSNFPSrF9hQA5zCHKQDSsJtthIWgtCDumIHwibY2EgapBDbRu3pJVgVEoOAw8DEZddiss9BoFg1MOKJSgpCbmolBwG7oNBYQGKk95xiLpHpKBLSn6F3AuCsugkzdCt2vX1NW+V5ufn6fj4mLLZrP7GHtm9YMeCHcr+/j4fE0eL/ocUVx9pJNFC5CSKSPlx8KUgxFwLsgnkMN/wwCCH83HJAatV1BZZdeVhSRTHSWKCZopLivqof7YkImhuqM0U/Q4SEUS0kJ4AKYlF5btwfqMfBsqKiiKfb21t8Ystyo33PwnGQYt6B2lpbscQSV/7UBsSE5SSYArJYvNrygRKg7wPmsirFoSTJlFBAAlIDspAGv1J18XEBYHIDG7WZduGaPrYNYUxFkEgtTEMfIe3fnNR8sXf/8n8dP4Efzp/gj8bojcCBL9t6iJCbAAAAABJRU5ErkJggg=='
  };
  tagsList: String[] = [];
  constructor(private endpointsService: EndpointsService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // this.endpointsService.getEventById(this.eventId).subscribe(givenEvent => {this.event = givenEvent});
    this.intializeTagsList();
  }

  transformStringToImage(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.event.backgroundImage);
  }
  intializeTagsList(): void {
    this.tagsList = this.event.tags.split("*");
  }

  
}
