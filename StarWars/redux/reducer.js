export const InitialState = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAV':
      return [...state, {id: Math.random(), content: action.payload.content}];

    case 'REMOVE_FROM_FAV':
      return state.filter(item => action.payload !== item.id);

    default:
      return state;
  }
};
