// import React, { useContext, useReducer } from 'react';
import React, { useReducer } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';
import roomsReducer from '../reducers/roomsReducer';
import Card from './Card';

const S = {};

S.CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

S.SubmitButton = styled.input`
  background: #BFBFBF;
  box-shadow: 0px 0px 0px transparent;
  border: 2px solid #6C6C6C;
  text-shadow: 0px 0px 0px transparent;
  border-top: 2px solid #BFBFBF;
  border-left: 2px solid #BFBFBF;
  margin: 0.5rem;
`;

const Form = ({ roomsData, cookieId }) => {
  const [rooms, dispatch] = useReducer(roomsReducer, roomsData);

  // remember data only if intended by customer
  // Cookie.remove(cookieId)

  const handleSubmit = () => {
    event.preventDefault();
    Cookie.set(cookieId, rooms, { path: '/' });
  };

  return (
    <>
      <form css='padding: 1rem;' onSubmit={handleSubmit}>
        <S.CardsContainer>
          {rooms.map((room) => {
            const { id } = room;
            return (
              <Card
                key={`card-${id}`}
                dispatch={dispatch}
                room={room}
              />
            );
          })}
        </S.CardsContainer>
        <S.SubmitButton css='margin: 8px' type='submit' value='Submit' />
      </form>
    </>
  );
};

Form.propTypes = {
  cookieId: PropTypes.string.isRequired,
  roomsData: PropTypes.array.isRequired,
};

export default Form;
