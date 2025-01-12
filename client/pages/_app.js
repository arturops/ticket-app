import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <h1>Header {currentUser.email} </h1>
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const axiosClient = buildClient(appContext.ctx);
  const currentUserURL = 'api/v0/users/currentuser';
  const { data } = await axiosClient.get(currentUserURL);

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    currentUser: data.currentUser,
  };
};

export default AppComponent;
