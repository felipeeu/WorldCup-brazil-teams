const initialState = {
  yearState: null
};
export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_YEAR":
      return {
        ...state,
        yearState: action.yearState
      };

    default:
      return state;
  }
};
