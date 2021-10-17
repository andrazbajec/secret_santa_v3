import React             from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Login             from "./components/Login";
import Register          from "./components/Register";
import NotFound          from './views/NotFound';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/login"
                       component={Login}
                       exact
                />
                <Route path="/register"
                       component={Register}
                       exact
                />
                <Route path="*"
                       component={NotFound}
                />
            </Switch>
        </div>
    );
}

export default App;
