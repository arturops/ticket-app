import axios from 'axios';

// get the request to extract headers (cookie info - host)
export default ({ req }) => {
  //hack to know if we are running on the server side
  // of next js or client side
  if (typeof window === 'undefined') {
    // server side has no window defined
    // we are on the server! and in k8s
    // this means requests should go to different
    // namespace ingress
    const serviceName = 'ingress-nginx-controller';
    const namespace = 'ingress-nginx';
    const url = `http://${serviceName}.${namespace}.svc.cluster.local`;
    return axios.create({
      baseURL: url,
      headers: req?.headers,
    });
  } else {
    // we are on the browser!
    // request do not need special base url, simply
    // route
    return axios.create({});
  }
};
