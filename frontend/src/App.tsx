import React from 'react';
import './css/bootstrap.css';
import './css/app.css';
import Login from './views/Login';
import Register from './views/Register';
import {
    Route,
    Switch,
    withRouter
} from 'react-router-dom';

function App() {
    return (
        <div className="main">
            <Switch>
                <Route path="/login" exact>
                    <Login/>
                </Route>
                <Route
                    path="/register" exact
                    component={Register}
                />
            </Switch>
        </div>
    );
}

export default withRouter(App);