import React from 'react'
import styled from 'styled-components'
import Main from '../components/Main';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

export default () => <Main />


/*
import getData from "../common/getData";
import StaticContext from "./StaticContext";

const path = window.document.location.pathname;
const promises = getData(path);
const data = {};
Promise.all(promises).then(responses => {
    responses.forEach(r => {
        if (r) Object.assign(data, r);
    });

    ReactDOM.hydrate(
        <StaticContext.Provider value={data}>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </StaticContext.Provider>,
        document.getElementById("root")
    );
});
*/
