import { FilterModel } from './filter-model';
import { SortModel } from './sort-model';

export class ColumnModel {
    constructor(
        public accessor: string,
        public filter: FilterModel,
        public name: string,
        public sort: SortModel,
        public type: string,
    ) {

    }
}


