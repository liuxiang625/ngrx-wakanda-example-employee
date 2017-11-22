import * as employeeCollection from '../actions/employeeCollection';


export interface State {
  loaded: boolean;
  loading: boolean;
  ids: number[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  ids: []
};

export function reducer(state = initialState, action: employeeCollection.Actions): State {
  switch (action.type) {
    case employeeCollection.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case employeeCollection.LOAD_SUCCESS: {
      const employees = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: employees.map(employee => employee.ID)
      };
    }

    case employeeCollection.ADD_EMPLOYEE_SUCCESS:
    case employeeCollection.REMOVE_EMPLOYEE_FAIL: {
      const employee = action.payload;

      if (state.ids[employee.ID]) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, employee.ID ]
      });
    }

    case employeeCollection.REMOVE_EMPLOYEE_SUCCESS:
    case employeeCollection.ADD_EMPLOYEE_FAIL: {
      const employee = action.payload;
      return Object.assign({}, state, {
        ids: state.ids.filter(ID => ID !== employee.ID)
      });
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
