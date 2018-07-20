import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AppService]
})
export class HomeComponent implements OnInit {
  personas:any[] = [];
  constructor(
    private _appService: AppService
  ) {
    this.getPersonas();
   }

  ngOnInit() {
  }

  getPersonas() {
    this._appService.getPersonas().subscribe(result => {
      this.personas = result;
    }, err => {
      console.log(err);
    })
  }

  eliminarPersona(id, index) {
    this._appService.eliminarPersona(id).subscribe(result => {
      console.log(result);
      this.personas.splice(index,1);
    }, err => {
      console.log(err);
    })
  }

}
