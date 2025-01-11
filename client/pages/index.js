import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>Hello!</h1> : <h1>You need to sign in</h1>;
};

// pass the whole context, it contains request, etc
LandingPage.getInitialProps = async (context) => {
  const urlCurrentUser = '/api/v0/users/currentuser';
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get(urlCurrentUser);
  return data;
};

export default LandingPage;
