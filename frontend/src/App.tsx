import './App.css';
import React, { useEffect, useState }                         from 'react';
import { Route, Switch, useLocation, withRouter, useHistory } from 'react-router-dom';
import Login      from './components/Login';
import Register   from './components/Register';
import NotFound   from './views/NotFound';
import Cookies    from 'js-cookie';
import BaseHelper from './helpers/BaseHelper';
import axios      from 'axios';
import Navbar     from './components/Navbar';
import CreateRoom from './components/CreateRoom';
import JoinRoom   from './components/JoinRoom';
import ShowRooms  from './components/ShowRooms';
import Home       from './components/Home';
import Room       from './components/Room';

axios.defaults.withCredentials = true;
let appLoaded = false;

const App = () => {
    const [getUserState, setUserState] = useState({
        userID: null,
        userToken: null,
        authenticated: false
    });

    const location = useLocation();
    const history = useHistory();

    const authenticate = () => {
        const userID = Cookies.get('user-id');
        const userToken = Cookies.get('user-token');

        if (!userID || !userToken) {
            appLoaded = true;
            return;
        }

        const url = BaseHelper.generateUrl('authenticate');
        const formData = BaseHelper.buildFormData(getUserState);

        axios.post(url, formData)
            .then((response: any) => {
                const userID = response?.data.UserID;
                const userToken = response?.data.Token;

                if (!userID || !userToken) {
                    return;
                }

                setUserState({
                    ...getUserState,
                    userID: userID,
                    userToken: userToken,
                    authenticated: true
                });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                appLoaded = true;
            });
    }

    const validateRoute = () => {
        if (!appLoaded) {
            return;
        }

        if (['/login', '/register'].includes(location.pathname)) {
            if (getUserState.authenticated) {
                history.push('/');
            }
        } else if (location.pathname === '/logout') {
            Cookies.remove('user-id');
            Cookies.remove('user-token');
            window.location.pathname = '/login'
        } else if (!getUserState.authenticated) {
            history.push('/login');
        }
    }

    useEffect(() => {
        authenticate();
    }, []);

    useEffect(() => {
        validateRoute();
    });

    return (
        <div className="App">
            <Navbar/>
            <Switch>
                <Route path="/"
                       component={Home}
                       exact
                />
                <Route path="/login"
                       component={Login}
                       exact
                />
                <Route path="/register"
                       component={Register}
                       exact
                />
                <Route path="/naredi-sobo"
                       component={CreateRoom}
                       exact
                />
                <Route path="/pridruzi-se-sobi"
                       component={JoinRoom}
                       exact
                />
                <Route path="/pokazi-sobe"
                       component={ShowRooms}
                       exact
                />
                <Route path="/soba/*"
                       component={Room}
                       exact
                />
                <Route path="*"
                       component={NotFound}
                />
            </Switch>
        </div>
    );
}

export default withRouter(App);
