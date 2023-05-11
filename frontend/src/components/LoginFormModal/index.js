import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";


function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          const login = {login: "The provided credentials were invalid"}
          setErrors(login)
        }
      });
  };

  const loginDemo = () => {
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    .then(closeModal)
  }

  useEffect(()=> {
    const errorObj = {};
    if (credential.length < 4) errorObj["username"] = "Username must be between 4 and 30 characters";
    if (password.length < 6) errorObj['password'] = "Password must be at least 6 characters long";
    setErrors(errorObj)
  }, [credential, password])

  // if (!Object.keys(errors).length) setDisabled(false);

  return (
    <div className="box">
      <h1>Log In</h1>
      <p className="errors">{errors.login}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit"
                disabled={disabled}
        >Log In</button>
      </form>
      <h2 onClick={loginDemo}>Demo User</h2>
    </div>
  );
}

export default LoginFormModal;