import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const url = '/api/v0/users/signin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: url,
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  function isFieldError(errors, field) {
    if (errors === null) {
      return null;
    }
    const err = errors.some((e) => e.field === field);
    return err;
  }

  function parseErrors(errors, field) {
    if (isFieldError(errors, field)) {
      return (
        <div className="m-1 alert alert-danger" role="alert">
          <ul>
            {errors.map((e) =>
              e.field === field ? <li key={e.message}>{e.message}</li> : null
            )}
          </ul>
        </div>
      );
    }
    return null;
  }

  return (
    <form onSubmit={onSubmit}>
      <h1 className="m-2">Sign In to Ticketx!</h1>
      <div className="m-2 form-group">
        <label for="user-email" className="form-label">
          Email
        </label>
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
          <input
            className="form-control"
            id="user-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@email.com"
            aria-label="Email"
            aria-describedby="basic-addon1"
            type="email"
            required
          />
        </div>
        {parseErrors(errors, 'email')}
      </div>
      <div className="m-2 form-group">
        <label for="user-password" className="form-label">
          Password
        </label>
        <div className="input-group">
          <span className="input-group-text" id="lock">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-lock"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
            </svg>
          </span>
          <input
            className="form-control"
            id="user-password"
            type="password"
            placeholder="Password"
            aria-describedby="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div id="passwordHelpBlock" class="form-text">
          Your password:
          <ul>
            <li>Must be at least 4 characters long</li>
            <li>Contain letters and numbers</li>
            <li>Must NOT contain spaces, special characters, or emoji</li>
          </ul>
        </div>
        {parseErrors(errors, 'password')}
      </div>
      <button className="m-2 btn btn-primary">Sign In</button>
    </form>
  );
};
