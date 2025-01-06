import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  const urlCurrentUser = '/api/v0/users/currentuser';
  console.log(req.headers);
  //hack to know if we are running on the server side
  // of next js or client side
  if (typeof window === 'undefined') {
    // server side has no window defined
    // we are on the server! and in k8s
    // this means requests should go to different
    // namespace ingress
    console.log('server side');
    const serviceName = 'ingress-nginx-controller';
    const namespace = 'ingress-nginx';
    const ingressHostname = 'tx-app.io';
    const { data } = await axios.get(
      `http://${serviceName}.${namespace}.svc.cluster.local${urlCurrentUser}`,
      {
        headers: req.headers,
        // headers: {
        //   Host: ingressHostname,
        // },
      }
    );
    // .catch((error) => {
    //   console.log('Error: ', error?.message);
    // });
    return data;
  } else {
    // we are on the browser!
    // request do not need special base url, simply
    // route
    console.log('browser side');
    const { data } = await axios.get(urlCurrentUser);
    // .catch((error) => {
    //   console.log('Error: ', error?.message);
    // });
    return data;
  }
  return {};
};

export default LandingPage;
