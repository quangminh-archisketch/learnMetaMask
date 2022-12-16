import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { DEPLOY_ENV } = publicRuntimeConfig;

var configs;

if (DEPLOY_ENV === 'prod') {
  configs = {
    deployEnv: 'production',
    websiteName: 'MovieApp',
    apiRoot: 'http://movieapi.cyberlearn.vn',
    urlRoot: 'http://localhost:3008',
  };
} else if (DEPLOY_ENV === 'dev') {
  configs = {
    websiteName: 'MovieApp (DEV)',
    apiRoot: 'http://movieapi.cyberlearn.vn',
  };
} else {
  configs = {
    websiteName: 'MovieApp (DEV)',
    apiRoot: 'http://movieapi.cyberlearn.vn',
    urlRoot: 'http://localhost:3008',
  };
}

const config = Object.assign(configs);

export default config;
