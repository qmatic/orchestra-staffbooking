import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICustomer } from '../../../../../../models/ICustomer';
import { CustomerDispatchers, UserSelectors } from '../../../../../../store';

@Component({
  selector: 'qm-customer-search-results',
  templateUrl: './qm-customer-search-results.component.html',
  styleUrls: ['./qm-customer-search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QmCustomerSearchResultsComponent implements OnInit {
  @Input() private customers: ICustomer[];
  @Input() private customersLoading: boolean;
  @Input() private customersLoaded: boolean;
  @Input() private searchText: string;
  private userDirection$: Observable<string>;

  constructor(
    private userSelectors: UserSelectors,
    private customerDispatchers: CustomerDispatchers
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit() {
  }

  showResults() {
    return this.customersLoaded && this.customers.length > 0;
  }

  showNoResults() {
    return this.customersLoaded && this.customers.length === 0;
  }

  showLoading() {
    return !this.customersLoaded && this.customersLoading;
  }

  selectCustomer(customer: ICustomer) {
    this.customerDispatchers.selectCustomer(customer);
    this.resetSearch();
  }

  resetSearch() {
    this.customerDispatchers.resetCustomers();
    this.customerDispatchers.resetCustomerSearchText();
  }
}
