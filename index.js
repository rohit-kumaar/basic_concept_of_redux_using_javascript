const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

/** comment ACTIONS
 * The only way your application can interact with store
 * Carry some information form your app to the redux store
 * Plain Javascript object
 * Have a 'type' property that describe something that happened in the application
 * The 'type' property is typically defined as string constants
 */
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

/** comment REDUCERS
 * Specify how the app's state changes in response to actions to actions sent to store
 * Function that accepts state and action as arguments, and return the next state of the application
 * (previousState, action) => newState
 */
const initialState = {
  numOfCakes: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };

    default:
      return state;
  }
};

/** comment REDUX STORE
 * One store for entire application
 ** Responsibilities --
 * Holds application state
 * Allows access to state via getState()
 * Allows state to be updated via dispatch(action)
 * Registers listeners via subscribe(listener)
 * Handles registering of listeners via the function returned by subscribe(listener)
 */
const store = createStore(reducer);
console.log(`Initial State`, store.getState());

const unsubscribe = store.subscribe(() =>
  console.log(`Update state`, store.getState())
);

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

unsubscribe();
