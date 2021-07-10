export interface IVaccineEntry{
  id?: number;
  txnDay?: number;
  txnMonth?: number;
  txnYear?: number;
  name: string;
  age?: number;
  existinghealthproblems?: string;
  email?: string;
  hospitalname?: string;
  productname?: string
}

export interface IState{
    vaccineEntries: IVaccineEntry[],
    onAddEntry: boolean
}

/**
 * Below is used for data passed to SectionList display
 */
 export type EntriesInDateSections = {
  data: IVaccineEntry[],
  title: string
}

/**
* Display options used in main component
*/
export enum DisplayOptions {
  SECTION_LIST_BY_DATE = 1,
  FLAT_LIST = 2,
  SPREADSHEET = 3
}

export type ISettings = {
  onSettings: boolean,
  displayOption: DisplayOptions
}
