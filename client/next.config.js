module.exports = {
  webpack: (config) => {
    config.watchOptions.poll = 300; //300 ms refresh
    return config;
  },
};
