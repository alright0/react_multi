ADD_COMPONENT = "ADD_SCREEN";
DELETE_COMPONENT = "DELETE_SCREEN";

initial_state = {
  components: [],
};

const componentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPONENT: {
    }
    case DELETE_COMPONENT: {
    }
    default: {
      return state;
    }
  }
};

export const add_component = (component) => {
  return { type: ADD_SCREEN, component };
};

export const delete_component = (key) => {
  return { type: DELETE_COMPONENT, key };
};
