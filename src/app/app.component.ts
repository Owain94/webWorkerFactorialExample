import { Component } from '@angular/core';
import 'rxjs/add/operator/throttleTime';

import { FactorialService } from './factorial.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'factorial calculator';
  items = [];
  progress: number = 0;
  computingFactorials: boolean = false;
  firstFactorial: number = 700;
  numberOfFactorials: number = 20;


  constructor(private factorialService: FactorialService) { }


  public computeFactorials() {
    // clear list, reset progress indicator and show progress bar
    this.items = [];
    this.progress = 0;
    this.computingFactorials = true;

    // perform tasks
    for (let i = this.firstFactorial; i < this.firstFactorial + this.numberOfFactorials; i++) {
      setTimeout(this.getFactorialForN(i), 0);
    }

  }


  /* get factorial of a specific number and update interface*/
  private getFactorialForN(i: number) {
    return () => {
      let value = this.factorialService.syncFactorial(i);
      this.items = [...this.items, `${i} - ${value}`];
      this.progress += 100.0 / this.numberOfFactorials;

      // end
      if (i === this.firstFactorial + this.numberOfFactorials -1 ) {
        this.computingFactorials = false;
      }
    };
  }

  public cleanResults() {
    this.items = [];
  }

  public setStartNumber(e: Event) {
    this.firstFactorial = Number((e.target as HTMLInputElement).value);
  }


}


