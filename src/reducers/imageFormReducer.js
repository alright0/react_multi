const ADD_IMAGE = "ADD_IMAGE";
const SAVE_IMAGE = "SAVE_IMAGE";
const DELETE_IMAGE = "DELETE_IMAGE";

let initialState = {
  image: null,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return { ...state, ...action.image };
    default:
      return state;
  }
};

export const addImage = (amage) => {
  return { type: ADD_IMAGE, image: { image } };
};
