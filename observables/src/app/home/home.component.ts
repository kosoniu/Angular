import {Component, OnDestroy, OnInit} from '@angular/core';

import {interval, Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    let customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count == 2){
          observer.complete();
        }
        if(count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      },1000)
    });

    customIntervalObservable = customIntervalObservable.pipe(filter((data: number) => {
      return data % 2 === 0;
    }),map((data: number) => {
      return 'Round: ' + (data + 1);
    }));

    this.firstObsSubscription = customIntervalObservable.subscribe(count => {
      console.log(count);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
