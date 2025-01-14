import { useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

// this is very quick and useEffect runs first thing by default
// so the html message is almost impercetible
// since on success we redirect to the home page
export default () => {
  const url = '/api/v0/users/signout';
  const { doRequest } = useRequest({
    url,
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing out ...</div>;
};
