import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, Subscription, Observable } from 'rxjs';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-error-handling',
  templateUrl: './error-handling.component.html',
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor(private es: ExerciseService) { }

  /**
   * Das Observable aus `this.es.randomError()` liefert mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln:
   * - wiederholen
   * - Fehler weiterwerfen
   * - Fehler umwandeln (in ein normales Element)
   * - Fehler verschlucken/ignorieren
   */

  start() {
    this.es.randomError().pipe(
      catchError(err => {
        console.log('FEHLER:', err);

        // Optionen:
        // - Fehler weiterwerfen
        // return new Observable(sub => {
        //   sub.error('Das ist mein Fehler!')
        // });
        return throwError(() => 'FEHLER!');

        // - Fehler ersetzen
        // return of('Hier war mal ein Fehler!')

        // - Fehler ignorieren
        //return new Observable();
        // return of();
        //return [1, 2, 3]; // return [] kommt auf das gleiche hinaus wie 'EMPTY'
        //return EMPTY;
      })
      ).subscribe({
        next: e => this.logStream$.next(e),
        error: err => this.logStream$.next('❌ ERROR: ' + err)
      });

  }
}
