import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private openDialogSubject: Subject<any> = new Subject<any>();
  openDialog$ = this.openDialogSubject.asObservable();

  constructor() {}

  openDialog(component: any) {
    this.openDialogSubject.next(component);
    console.log('open ',component)
  }

}
