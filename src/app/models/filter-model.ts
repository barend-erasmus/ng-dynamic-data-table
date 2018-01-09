import { CheckboxValueModel } from "./checkbox-value-model";

export class FilterModel {
    constructor(
        public isOpen: boolean,
        public operator: string,
        public type: string,
        public value: any,
        public checkboxValues: CheckboxValueModel[],
    ) {

    }
}
