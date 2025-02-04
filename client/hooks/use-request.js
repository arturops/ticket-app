import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const resp = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(resp.data);
      }

      return resp.data;
    } catch (error) {
      // set the 'errors' value, which is an array
      // of objects {field, message}
      setErrors(error.response.data.errors);
    }
  };

  return { doRequest, errors };
};
