import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import RoomsContext from '../contexts/RoomsContext';
import defaultData from '../data/data';
import roomsReducer from '../reducers/roomsReducer';
import Card from './Card';

const S = {};

S.CardContainer = styled.div`
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
`

const Form = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const [rooms, dispatchRooms] = useReducer(roomsReducer, defaultData);
  // const [rooms, dispatchRooms] = useReducer(roomsReducer, cookies.user || defaultData);

  useEffect(() => {
    dispatchRooms({ type: 'REPLACE_ENTIRELY', newRooms: cookies.user });
  }, []);

  const handleSubmit = () => {
    event.preventDefault();
    setCookie('user', JSON.stringify(rooms), { path: '/' });
  }

  return (
    <RoomsContext.Provider value={rooms, dispatchRooms}>
      <>
        <form css='padding: 1rem;' onSubmit={handleSubmit}>
          <S.CardContainer>
            {rooms.map((room) => {
              const { id } = room;
              return (
                  <Card
                    key={id}
                    dispatch={dispatchRooms}
                    room={room}
                  />
              );
            })}
          </S.CardContainer>
          <S.SubmitButton css='margin: 8px' type='submit' value='Submit' />
        </form>
      </>
    </RoomsContext.Provider>
  );
};

export default Form;
