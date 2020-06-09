import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from './components';
import {
    Home,
    ActorDetails,
    ShowDetails,
} from 'pages';
import { StoreProvider } from 'stores';
import { StateMachineProvider } from './fsm';
import states from './states';

function App() {
    return (
        <div>
            <StateMachineProvider states={states}>
                <StoreProvider>
                    <Router>
                        <Header></Header>
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/show/:showId">
                                <ShowDetails />
                            </Route>
                            <Route exact path="/actor/:actorId">
                                <ActorDetails />
                            </Route>
                        </Switch>
                    </Router>
                </StoreProvider>
            </StateMachineProvider>
        </div>
    );
}

export default App;
