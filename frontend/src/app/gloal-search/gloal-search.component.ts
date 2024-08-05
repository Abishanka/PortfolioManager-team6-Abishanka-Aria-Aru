import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { GloalSearchService } from '../gloal-search.service';

interface SearchOption {
  name: string,
  ticker: string,
}

@Component({
  selector: 'app-gloal-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gloal-search.component.html',
  styleUrl: './gloal-search.component.css'
})
export class GloalSearchComponent {
  searchControl = new FormControl('');
  // results$: Observable<SearchOption[]>;

  // constructor(private searchService: GloalSearchService) {
  //   this.results$ = this.searchControl.valueChanges.pipe(
  //     startWith(''),
  //     switchMap((term) => this.searchService.searchInstruments(term))
  //   );
  // }

  // displayWith(item: SearchOption): string {
  //   return item ? `${item.name} (${item.ticker})` : '';
  // }
  onSubmit() {
    console.log("Submitted")
  }
}
