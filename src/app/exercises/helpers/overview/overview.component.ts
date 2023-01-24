import { Component } from '@angular/core';

import { ExerciseEntry, exercisesList } from '../../exercises';

@Component({
  selector: 'rxw-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent {
  exercises: ExerciseEntry[] = exercisesList;
  generationDate = 1674396384545;
}
