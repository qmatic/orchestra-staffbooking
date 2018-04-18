import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/operator/take';
import {
  UserSelectors,
  AppointmentMetaSelectors,
  AppointmentMetaDispatchers
} from '../../../../store';
import { combineLatest } from 'rxjs/operators';


@Component({
  selector: 'qm-notes',
  templateUrl: './qm-notes.component.html',
  styleUrls: ['./qm-notes.component.scss']
})
export class QmNotesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private notesInput$: Subject<string> = new Subject<string>();
  private notesLength$: Observable<number>;
  private userDirection$: Observable<string>;
  private notes$: Observable<string>;
  private labelObservable: Observable<string>;

  private notes: string;
  private notesLength: number;
  private notesMaxLength = 255;
  private notesInputOpened = false;
  private buttonPlaceholderText: string;

  constructor(
    private userSelectors: UserSelectors,
    private appointmentMetaSelectors: AppointmentMetaSelectors,
    private appointmentMetaDispatchers: AppointmentMetaDispatchers,
    private translateService: TranslateService
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.notesLength$ = this.appointmentMetaSelectors.notesLength$;
    this.notes$ = this.appointmentMetaSelectors.notes$;
  }

  ngOnInit() {
    const notesInputSubscription = this.notesInput$.subscribe(
      (note: string) => this.setNote(note)
    );

    const notesSubscription = this.notes$.subscribe(
      (notes: string) => this.notes = notes
    );

    const notesLengthSubscription = this.notesLength$.subscribe(
      (notesLength: number) =>
        this.notesLength = notesLength
    );

    const buttonLabelSunscription = this.translateService.get('label.notes.presentational.placeholder').subscribe(
      (buttonPlaceholderText: string) =>
        this.buttonPlaceholderText = buttonPlaceholderText
    );

    this.subscriptions.add(notesInputSubscription);
    this.subscriptions.add(notesLengthSubscription);
    this.subscriptions.add(notesSubscription);
    this.subscriptions.add(buttonLabelSunscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleNotesInput(note: string) {
    this.notesInput$.next(note);
  }

  setNote(note: string) {
    this.appointmentMetaDispatchers.setAppointmentNote(note);
  }

  getButtonText() {
    return this.notes.trim().length === 0
            ? this.buttonPlaceholderText
            : this.notes;
  }

  hideNotesInput() {
    this.notesInputOpened = false;
  }

  toggleNotesInput() {
    this.notesInputOpened = !this.notesInputOpened;
  }
}
