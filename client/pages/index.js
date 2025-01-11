import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing Page</h1>;
};

// pass the whole context, it contains request, etc
LandingPage.getInitialProps = async (context) => {
  const urlCurrentUser = '/api/v0/users/currentuser';
  const axiosClient = buildClient(context);
  const { data } = await axiosClient.get(urlCurrentUser);
  return data;
};

export default LandingPage;
