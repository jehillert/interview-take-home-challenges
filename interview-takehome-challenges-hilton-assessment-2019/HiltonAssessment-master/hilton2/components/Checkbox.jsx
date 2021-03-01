import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

S.Label = styled.label`
  align-self: center;
  ${props => (props.isBold)
      ? 'font-weight: bold;'
      : 'font-weight: normal;'
  }
  margin: 0;
`;

S.Checkbox = styled.input`
  ${props => (props.id === 1) ? 'display: none' : 'display: inline-block'};
`;

const Checkbox = ({ id, label, isSelected, onCheckboxChange }) => {
  return (
    <S.CheckboxContainer>
      <S.Checkbox
        id={id}
        type='checkbox'
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
      />
      <S.Label isBold={isSelected}>
        {label}
      </S.Label>
    </S.CheckboxContainer>
  );
};

Checkbox.defaultProps = {
  label: '',
  id: null,
}

Checkbox.propTypes = {
  id: PropTypes.number,
  label: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
