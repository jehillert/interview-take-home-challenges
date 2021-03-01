import Form from '../components/Form';
import RoomsLoader from '../components/RoomsLoader';
import GlobalStyle from '../styles/GlobalStyle';
import defaultData from '../data/defaultData';
import { cookieId } from '../data/constants';

export default () => {
  return (
    <>
      <GlobalStyle />
      <RoomsLoader cookieId={cookieId} defaultData={defaultData} didMount={false}>
        {({ cookieId, data, didMount }) => (
          didMount && (
            <Form
              cookieId={cookieId}
              roomsData={data}
            />
        ))}
      </RoomsLoader>
    </>
  );
};
