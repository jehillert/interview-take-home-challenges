/* eslint-disable no-fallthrough */
import {
  adultArr,
  childArr,
} from '../data/constants';

const roomsReducer = (state, action) => {
  const {
    newRooms,
    adultsSelected,
    childrenSelected,
    roomId,
  } = action;

  switch (action.type) {
    case 'REPLACE_ROOMS':
      return newRooms

    case 'SET_CHECKED':
      const arr = state.map((room) => {
        const { id, isChecked } = room;

        if ((id < roomId) || (id === roomId && isChecked === false)) {
          return {  ...room, isChecked: true };
        }
        return {
          ...room,
          isChecked: false,
          adults: 1,
          children: 0,
        };
      });
      return arr;

    case 'SET_ADULTS':
      if (adultArr.includes(adultsSelected)) {
        return state.map((room) => {
          const { isChecked, id } = room;

          if (isChecked && roomId === id) {
            return { ...room, adults: adultsSelected };
          }

          return { ...room };
        });
      }

    case 'SET_CHILDREN':
      if (childArr.includes(childrenSelected)) {
        return state.map((room) => {
          const { isChecked, id } = room;

          if (isChecked && roomId === id) {
            return { ...room, children: childrenSelected };
          }

          return { ...room };
        });
      }

    default:
      throw new Error();
  }
};

export default roomsReducer;
