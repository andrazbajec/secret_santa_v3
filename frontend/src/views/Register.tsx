import React, {useState} from "react";
import {Link} from 'react-router-dom'
import AxiosHelper from "../components/Axioshelper";

const Register = () => {
    const [getState, setState] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    });

    const url = '/register';

    const submit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', getState.name);
        formData.append('email', getState.email);
        formData.append('username', getState.username);
        formData.append('password', getState.password);
        AxiosHelper.post(url, formData);
    }

    const changeNameValue = (event: { target: { value: any; }; }) => {
        setState({
            ...getState,
            name: event.target.value
        });
    }

    const changeEmailValue = (event: { target: { value: any; }; }) => {
        setState({
            ...getState,
            email: event.target.value
        });
    }

    const changeUsernameValue = (event: { target: { value: any; }; }) => {
        setState({
            ...getState,
            username: event.target.value
        });
    }

    const changePasswordValue = (event: { target: { value: any; }; }) => {
        setState({
            ...getState,
            password: event.target.value
        });
    }

    return (
        <div className='fullscreenLayout'>
            <div className='col-sm-7 col-lg-4'>
                <h1>
                    Registriraj se
                </h1>
                <form onSubmit={submit}>
                    <div className='form-group'>
                        <input className='form-control'
                               type='text'
                               placeholder='Ime'
                               name='name'
                               required
                               value={getState.name}
                               onChange={changeNameValue}
                        />
                    </div>
                    <div className='form-group'>
                        <input className='form-control'
                               type='email'
                               placeholder='Email'
                               name='email'
                               required
                               value={getState.email}
                               onChange={changeEmailValue}
                        />
                    </div>
                    <div className='form-group'>
                        <input className='form-control'
                               type='text'
                               placeholder='Uporabniško ime'
                               name='username'
                               required
                               value={getState.username}
                               onChange={changeUsernameValue}
                        />
                    </div>
                    <div className='form-group'>
                        <input className='form-control'
                               type='password'
                               placeholder='Geslo'
                               name='password'
                               required
                               value={getState.password}
                               onChange={changePasswordValue}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="btn btn-outline-success btn-block"
                            type="submit"
                            value="Registracija"
                        />
                    </div>
                    <Link to='/login'
                          className="btn btn-outline-danger btn-block"
                    >
                        Že registriran?
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Register;