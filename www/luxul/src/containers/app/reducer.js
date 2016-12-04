import * as vars from './vars';

/*
    REDUCER
*/
export default function appReducer(initialState = vars.initialState, action = {}) {
  switch (action.type) {

    case vars.container + '/PAGE_URL':
      {
        // state
        let state = Object.assign({}, initialState);
        // state.page
        state.page = state.pageSelect(action.pageUrl);
        // cleanup
        state.drawerOpen = false;
        // =>
        return state;
      }

    case vars.container + '/DRAWER_TOGGLE':
      {
        // state
        let state = Object.assign({}, initialState);
        // state.drawerOpen
        state.drawerOpen = !state.drawerOpen;
        // =>
        return state;
      }

    default:
      {
        return initialState;
      }
  }
}
