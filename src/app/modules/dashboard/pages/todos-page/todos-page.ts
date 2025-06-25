import { Component } from '@angular/core';
import { CardStatusComponent } from "../../../todo/components/card-status-component/card-status-component";

@Component({
  selector: 'app-todos-page',
  imports: [CardStatusComponent],
  templateUrl: './todos-page.html',
})
export class TodosPage {

}
