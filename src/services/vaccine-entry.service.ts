import { Connection, createConnection, getRepository, Repository } from "typeorm";
import { VaccineEntry } from "../entities/vaccine-entry.entity";
import { EntriesInDateSections, IState, IVaccineEntry } from "../interfaces/vaccine-entry.interface";

export const getDbConnection = async (setConnection:React.Dispatch<React.SetStateAction<Connection | null>> , state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
      const connection = await createConnection({
        /* Use below if not using expo
      type: 'react-native',
      database: 'transaction_entries.db',
      location: 'default',
      */
        type: 'expo',
        database: 'vaccine_entries.db',
        driver: require('expo-sqlite'),

        //logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [VaccineEntry],
      });
      setConnection(connection);
      getVaccineEntries(state, setState);
    } catch (error) {
      console.log(error);
    }
}

export const getVaccineEntries = async (state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
        const vaccineEntryRepository: Repository<VaccineEntry> = getRepository(VaccineEntry);
        let vaccineEntries = await vaccineEntryRepository.find();
        setState({ ...state, vaccineEntries });
    } catch (error) {
        console.log(error);
    }
};

export const createVaccineEntry = async (vaccineEntryData: IVaccineEntry, state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
        const vaccineEntryRepository: Repository<VaccineEntry> = getRepository(VaccineEntry);
        const newVaccineEntry = vaccineEntryRepository.create(vaccineEntryData);
        const vaccineEntry = await vaccineEntryRepository.save(newVaccineEntry);
        //time to modify state after create
        const vaccineEntries = state.vaccineEntries;
        vaccineEntries.push(vaccineEntry);
        setState({ ...state, vaccineEntries, onAddEntry: false });
    } catch (error) {
        console.log(error);
    }
};

export const deleteVaccineEntry = async (id: number, state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
        const vaccineEntryRepository: Repository<VaccineEntry> = getRepository(VaccineEntry);
        await vaccineEntryRepository.delete(id);
        //remove entry from state
        const currentEntries = state.vaccineEntries;
        //find the index corresponding to the item with the passed id
        const index = currentEntries.findIndex((entry) => entry.id === id);
        currentEntries.splice(index, 1);//remove one element starting from the index position. This is removing the element itself
        //update state with the spliced currentItems
        setState({ ...state, vaccineEntries: currentEntries });
    } catch (error) {
        console.log(error);
    }
};

/**
     * Function below is called in useMemo hook to transform the entries list to that suitable for a section list in accordance with dates.
     * useMemo has been set to run only when entries in state changes.
     * First, ...new Set is used to iterate through data and get the unique dates. Afterwards it iterates through
     * unique dates and associates the matching entries in groups of dates.
     * @param entries 
     */
 export const transformEntriesToDateSections = (entries: IVaccineEntry[]): EntriesInDateSections[] => {
    //first get distinct txnDates in entry. See https://codeburst.io/javascript-array-distinct-5edc93501dc4 for ideas on how to use ...new Set
    const distinctTxnDates = [...new Set(entries.map(entry => {
      const txnDate = new Date(entry.txnYear!, entry.txnMonth!, entry.txnDay!).toLocaleDateString('en-GB');
      return txnDate;
    }))];

    //map through distinctTxnDates and then map through entries each time to compare dates and date sections with date as title and then the data
    const entryByDates: EntriesInDateSections[] = distinctTxnDates.map((distinctTxnDate) => {

      let dataOnTxnDate: IVaccineEntry[] = [];
      entries.map((entry) => {
        const txnDate = new Date(entry.txnYear!, entry.txnMonth!, entry.txnDay!).toLocaleDateString('en-GB');
        if (txnDate == distinctTxnDate) {
          dataOnTxnDate.push(entry)
        }
      })
      return { title: distinctTxnDate, data: dataOnTxnDate }

    });
    return entryByDates;
  }