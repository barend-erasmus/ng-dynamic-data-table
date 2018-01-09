import { ColumnModel } from "./column-model";

export class DynamicDataTableModel {
    constructor(
        public columns: ColumnModel[],
        public count: number,
        public data: any[],
        public parameters: any,
        public skip: number,
        public take: number,
    ) {

    }
}

