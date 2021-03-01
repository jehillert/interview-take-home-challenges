/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from './Checkbox';
import ErrorBoundary from './ErrorBoundary';
import Dropdown from './Dropdown';
import {
  adultArr,
  childArr,
} from '../data/constants';

const S = {};

S.Card = styled.div`
  background-color: ${(props) => (props.disabled) ? '#DADAE2' : '#E6E6E6'};
  border: 0.25rem solid ${(props) => (props.disabled) ? '#CBCFD9' : '#E6E6E6'};
  border-radius: 9px;
  font-size: 12px;
  margin: 0.25rem;
`;

S.CardHeader = styled.div.attrs({
  'data-testid': 's-card-header',
})`
  display: flex;
  align-self: center;
  height: 1rem;
  background-color: ${(props) => (props.disabled) ? 'transparent' : '#E6E6E6'};
  border-radius: 6px 6px 0px 0px;
  padding: 0px 6px;
`;

S.CardBody = styled.div.attrs({
  'data-testid': 's-card-body',
})`
  display: flex;
  flex-wrap: nowrap;
  background-color: ${(props) => (props.disabled) ? 'transparent' : '#FFFFFF'};
  border-radius: 0px 0px 6px 6px;
  padding: 5px 11px 9px 9px;
`;

const Card = ({ room, dispatch }) => {
  const {
    id,
    isChecked,
    adults,
    children,
  } = room;

  const handleCheckboxChange = () => {
    dispatch({ type: 'SET_CHECKED', roomId: id });
  };

  return (
    <S.Card id='s-card' disabled={!isChecked}>
      <S.CardHeader disabled={!isChecked}>
        <ErrorBoundary>
          <Checkbox
            id={`checkbox-${id}`}
            label={`Room ${id}`}
            isSelected={isChecked}
            onCheckboxChange={handleCheckboxChange}
            key={id}
          />
        </ErrorBoundary>
      </S.CardHeader>
      <S.CardBody disabled={!isChecked}>
        <ErrorBoundary>
          <Dropdown
            id={`adults-dropdown-${id}`}
            disabled={!isChecked}
            label1='Adults'
            label2='(18+)'
            selected={adults}
            choices={adultArr}
            dispatch={dispatch}
          />
          <Dropdown
            id={`children-dropdown-${id}`}
            disabled={!isChecked}
            label1='Children'
            label2='(0-17)'
            selected={children}
            choices={childArr}
            dispatch={dispatch}
          />
        </ErrorBoundary>
      </S.CardBody>
    </S.Card>
  );
};

Card.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isChecked: PropTypes.bool.isRequired,
    adults: PropTypes.number.isRequired,
    children: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Card;
