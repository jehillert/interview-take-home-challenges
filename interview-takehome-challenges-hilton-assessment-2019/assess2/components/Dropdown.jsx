import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import styled from 'styled-components';

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
  const options = choices.map((o) => (<option key={uuidv1()} value={o}>{o}</option>));

  const handleChange = (event) => {
    console.log(label1);
    console.log(event.target.value);
    console.log(id);

    if (label1 === 'Adults') {
      dispatch({ type: 'SET_ADULTS', adultsSelected: Number(event.target.value), roomId: Number(id[id.length -1])});
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
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  label1: PropTypes.string.isRequired,
  label2: PropTypes.string.isRequired,
  selected: PropTypes.number.isRequired,
  choices: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Dropdown;
