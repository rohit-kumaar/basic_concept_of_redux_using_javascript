const redux = require("redux");
const produce = require("immer").produce;

const initialState = {
  name: "Ricky",
  address: {
    street: "Camp - 2",
    city: "Bhilai",
    state: "CG",
  },
};

const STREET_UPDATE = "STREET_UPDATE";

const updateStreet = (street) => {
  return {
    type: STREET_UPDATE,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATE:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });

    default: {
      return state;
    }
  }
};

const store = redux.createStore(reducer);
console.log(`Initial State`, store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(`Update State`, store.getState());
});

store.dispatch(updateStreet("Sector - 20"));

unsubscribe();
