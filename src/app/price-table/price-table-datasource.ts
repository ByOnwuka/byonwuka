import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface PriceTableItem {
  name: string;
  id: number;
  amount: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: PriceTableItem[] = [
  {id: 1, name: 'Hydrogen', amount: 10},
  {id: 2, name: 'Helium', amount: 20},
  {id: 3, name: 'Lithium', amount: 30},
  {id: 4, name: 'Beryllium', amount: 40},
  {id: 5, name: 'Boron', amount: 50},
  {id: 6, name: 'Carbon', amount: 50},
  {id: 7, name: 'Nitrogen', amount: 50},
  {id: 8, name: 'Oxygen', amount: 40},
  {id: 9, name: 'Fluorine', amount: 30},
  {id: 10, name: 'Neon', amount: 20},
  {id: 11, name: 'Sodium', amount: 10},
  {id: 12, name: 'Magnesium', amount: 30},
  {id: 13, name: 'Aluminum', amount: 30},
  {id: 14, name: 'Silicon', amount: 20},
  {id: 15, name: 'Phosphorus', amount: 10},
  {id: 16, name: 'Sulfur', amount: 40},
  {id: 17, name: 'Chlorine', amount: 30},
  {id: 18, name: 'Argon', amount: 30},
  {id: 19, name: 'Potassium', amount: 20},
  {id: 20, name: 'Calcium', amount: 30},
];

/**
 * Data source for the PriceTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PriceTableDataSource extends DataSource<PriceTableItem> {
  data: PriceTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PriceTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: PriceTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: PriceTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'amount': return compare(+a.amount, +b.amount, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
