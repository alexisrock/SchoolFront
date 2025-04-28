import { CommonModule } from '@angular/common';
import { Component, ContentChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingStore } from '../../../data/stores/loading.store';

@Component({
  selector: 'app-loadding',
  imports: [CommonModule],
  templateUrl: './loadding.component.html',
  styleUrl: './loadding.component.scss'
})
export class LoaddingComponent {
  loading$: Observable<boolean> | undefined;
  @ContentChild("loading")
  customLoadingIndicator: TemplateRef<any> | null = null;


  /**
   *
   */
  constructor(private readonly store: LoadingStore) {
    this.loading$ = this.store.loading$;

  }

}
