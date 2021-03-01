import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import styled from 'styled-components';
import RoomsContext from '../contexts/RoomsContext';

const S = {};

S.Label = styled.label`
  display: inline-block;
  select {
    background-color: white;
    margin-top: 0.25rem;
    margin-right: 1rem;
    width: 2.2rem;
  }
`;

function Dropdown({ id, choices, disabled, dispatch, label1, label2, selected }) {
// 692 wide
// 568 tasll
// 214 *2
// 31%

  // const { dispatchRooms } = useContext(RoomsContext);


  const options = choices.map(o => (<option key={uuidv1()} value={o}>{o}</option>));

  const handleChange = (event) => {
    if (label1 === 'Adults') {
      dispatch({ type: 'SET_ADULTS', adultsSelected: Number(event.target.value), roomId: id });
    }
    if (label1 === 'Children') {
      dispatch({ type: 'SET_CHILDREN', childrenSelected: Number(event.target.value), roomId: id });
    }
  };

  return (
    <>
      <S.Label>
        <div>{label1}</div>
        <div>{label2}</div>
        <select disabled={disabled} value={selected} onChange={handleChange}>
          {options}
        </select>
      </S.Label>
    </>
  );
}

Dropdown.propTypes = {
  label1: PropTypes.string.isRequired,
  label2: PropTypes.string.isRequired,
  selected: PropTypes.number.isRequired,
  choices: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Dropdown;
