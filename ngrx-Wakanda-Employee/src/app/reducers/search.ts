import * as employee from '../actions/employee';


export interface State {
  ids: number[];
  loading: boolean;
  query: string;
};

const initialState: State = {
  ids: [],
  loading: false,
  query: ''
};

export function reducer(state = initialState, action: employee.Actions): State {
  switch (action.type) {
    case employee.SEARCH: {
      const query = action.payload; 

      if (query === '') {
        return {
          ids: [],
          loading: false,
          query
        };
      }

      return Object.assign({}, state, {
        query,
        loading: true
      });
    }

    case employee.SEARCH_COMPLETE: {
      const employees = action.payload;

      return {
        ids: employees.map(employee => employee.ID),
        loading: false,
        query: state.query
      };
    }

    default: {
      return state;
    }
  }
}


export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;