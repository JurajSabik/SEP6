import {Injectable, EventEmitter} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private searchExpanded = new BehaviorSubject<boolean>(false);

  searchExpanded$ = this.searchExpanded.asObservable();

  setSearchExpanded(isExpanded: boolean): void {
    this.searchExpanded.next(isExpanded);
  }

  // Create an event emitter to emit search results
  public searchResults = new EventEmitter<any[]>();

  // Call this to emit search results
  public emitSearchResults(results: any[]): void {
    this.searchResults.emit(results);
  }
}
