import { createSelector } from 'reselect';
import { Employee } from '../models/employee';
import * as employee from '../actions/employee';
import * as employeeCollection from '../actions/employeeCollection';


export interface State {
  ids: number[];
  entities: { [ID: number]: Employee };
  selectedEmployeeId: number | null;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedEmployeeId: null,
};

export function reducer(state = initialState, action: employee.Actions | employeeCollection.Actions): State {
  switch (action.type) {
    case employee.SEARCH_COMPLETE:
    case employeeCollection.LOAD_SUCCESS: {
      const employees = action.payload;
      const newEmployees = employees.filter(employee => !state.entities[employee.ID]);

      const newEmployeeIds = newEmployees.map(employee => employee.ID);
      const newEmployeeEntities = newEmployees.reduce((entities: { [ID: number]: Employee }, employee: Employee) => {
        return Object.assign(entities, {
          [employee.ID]: employee
        });
      }, {});

      return {
        ids: [ ...state.ids, ...newEmployeeIds ],
        entities: Object.assign({}, state.entities, newEmployeeEntities),
        selectedEmployeeId: state.selectedEmployeeId
      };
    }

    case employee.LOAD: {
      const employee = action.payload;

      if (state.ids[employee.ID]) {
        return state;
      }

      return {
        ids: [ ...state.ids, employee.ID ],
        entities: Object.assign({}, state.entities, {
          [employee.ID]: employee
        }),
        selectedEmployeeId: state.selectedEmployeeId
      };
    }

    case employee.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedEmployeeId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedEmployeeId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(ID => entities[ID]);
});
