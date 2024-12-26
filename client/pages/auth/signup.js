import { useState } from 'react';
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let [errors, setErrors] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.post('/api/v0/users/signup', {
        email: email,
        password: password,
      });
    } catch (error) {
      setErrors(error.response.data.errors);
      console.log(error.response.data.errors);
    }
  };

  function isFieldError(errors, field) {
    const err = errors.some((e) => e.field === field);
    console.log(err);
    return err;
  }

  return (
    <form onSubmit={onSubmit}>
      <h1 className="m-2">This is Ticketx!</h1>
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
        {isFieldError(errors, 'email') && (
          <div className="m-1 alert alert-danger" role="alert">
            <ul>
              {errors.map((e) =>
                e.field === 'email' ? (
                  <li key={e.message}>{e.message}</li>
                ) : null
              )}
            </ul>
          </div>
        )}
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
        {isFieldError(errors, 'password') && (
          <div className="m-1 alert alert-danger" role="alert">
            <ul>
              {errors.map((e) =>
                e.field === 'password' ? (
                  <li key={e.message}>{e.message}</li>
                ) : null
              )}
            </ul>
          </div>
        )}
      </div>
      <button className="m-2 btn btn-primary">Join Ticketxing!</button>
    </form>
  );
};
