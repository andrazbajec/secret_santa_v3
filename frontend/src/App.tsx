import '../src/css/app.scss';
import React, { useEffect, useState }                         from 'react';
import { Route, Switch, useLocation, withRouter, useHistory } from 'react-router-dom';
import Login                                                  from './components/authentication/Login';
import Register                                               from './components/authentication/Register';
import NotFound                                               from './views/NotFound';
import Cookies                                                from 'js-cookie';
import BaseHelper                                             from './helpers/BaseHelper';
import axios                                                  from 'axios';
import Navbar                                                 from './components/Navbar';
import CreateRoom                                             from './components/room/CreateRoom';
import JoinRoom                                               from './components/room/JoinRoom';
import RoomList                                               from './components/room/RoomList';
import Room                                                   from './components/room/Room';
import Home                                                   from './components/Home';
import Instructions                                           from './components/Instructions';
import ResetPassword                                          from './components/authentication/ResetPassword';
import ResetPasswordApply                                     from './components/authentication/ResetPasswordApply';

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

        if (['/login', '/register', '/send-reset-password'].includes(location.pathname) || location.pathname.match(/\/reset-password\/[0-9]*/)) {
            if (getUserState.authenticated) {
                history.push('/');
            }
        } else if (location.pathname === '/logout') {
            Cookies.remove('user-id');
            Cookies.remove('user-token');
            window.location.pathname = '/login';
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
            <div className="App" id="snow-fall">
                <Navbar authenticated={getUserState.authenticated}/>
                <div className="snow layer1"/>
                <div className="snow layer1 offset"/>
                <div className="snow layer2"/>
                <div className="snow layer2 offset"/>
                <div className="snow layer3"/>
                <div className="snow layer3 offset"/>
                <div className="snow layer4"/>
                <div className="snow layer4 offset"/>
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
                           component={RoomList}
                           exact
                    />
                    <Route path="/soba/*"
                           component={Room}
                           exact
                    />
                    <Route path="/navodila"
                           component={Instructions}
                           exact
                    />
                <Route path="/send-reset-password"
                       component={ResetPasswordApply}
                       exact
                />
                <Route path="/reset-password/:token"
                       component={ResetPassword}
                       exact
                />
                <Route path="/logout"
                       exact
                >
                    Logging out...
                </Route>
                <Route path="*"
                       component={NotFound}
                />
            </Switch>
            </div>
        </div>
    );
}

export default withRouter(App);
