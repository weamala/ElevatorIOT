import React from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';
import Password from './Password';

const Padding = styled.div`
    padding: ${({padding}) => padding};
`

const App = () => <Padding padding="20px">
    <Switch>
        <Route path="/:floor" component={Password} />
    </Switch>
</Padding>


export default App;