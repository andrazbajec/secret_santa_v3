import React, {SyntheticEvent, useState} from "react";
import {Link} from "react-router-dom";
import AxiosHelper from "../components/Axioshelper";

const Login = () => {
    const [getState, setState] = useState({
        username: '',
        password: ''
    });

    const url = '/login';

    const changeUsernameValue = (event: SyntheticEvent<HTMLInputElement>) => {
        setState({
            ...getState,
            username: event.currentTarget.value
        });
    }

    const changePasswordValue = (event: SyntheticEvent<HTMLInputElement>) => {
        setState({
            ...getState,
            password: event.currentTarget.value
        });
    }

    const submit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', getState.username);
        formData.append('password', getState.password);
        AxiosHelper.post(url, formData);
    }

    return (
        <div className='fullscreenLayout'>
            <div className='col-sm-7 col-lg-4'>
                <h1>
                    Vpiši se
                </h1>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Uporabniško Ime"
                            name="username"
                            required
                            value={getState.username}
                            onChange={changeUsernameValue}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Geslo"
                            name="password"
                            required
                            value={getState.password}
                            onChange={changePasswordValue}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="btn btn-outline-success btn-block"
                            type="submit"
                            value="Vpis"
                        />
                    </div>
                    <Link
                        to="/register"
                        className="btn btn-outline-danger btn-block"
                    >
                        Nisi registriran?
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;