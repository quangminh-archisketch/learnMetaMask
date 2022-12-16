import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { DEPLOY_ENV } = publicRuntimeConfig;

var configs;

if (DEPLOY_ENV === 'prod') {
  configs = {
    deployEnv: 'production',
    websiteName: 'VRStyler',
    apiRoot: 'https://api.vrstyler.com',
    urlRoot: 'https://vrstyler.com',
    urlModelViewer: 'https://modelviewer.vrstyler.com',
    stripePublicKey: 'pk_live_26WxvKJCQk1JEgSX6SAGmG8O',
    paypalClientId:
      'AZGWaTPud66oIduiQKs1IGJg_dBDtKhUZJrKhXWDyjDcQa4PqAwUegJbbGRVV6dl6iZhAagrF7KWyYRG',
    googleClientId: '663025876883-tk2kkctekgk68qpg1386729qoo3lc6tu.apps.googleusercontent.com',
    googleAnalyticsID: 'G-DQEWEVFE1T',
    facebookAppId: '577772940724693',
  };
} else if (DEPLOY_ENV === 'dev') {
  configs = {
    websiteName: 'VRStyler (DEV)',
    apiRoot: 'https://market-api.tainguyenviet.com',
    urlRoot: 'https://vrstyler.tainguyenviet.com',
    urlModelViewer: 'https://modelviewer.tainguyenviet.com',
    stripePublicKey: 'pk_test_HJSCHlbzNt0bsS2oJiShWA2I',
    paypalClientId:
      'AQrE0Y9RVP1L2IF4LauVLgdBZlixbbdHG6MZEzPT5ohgAA1USMRWwNztGiBHNmLPuN9M9HBkveOr_T6M',
    googleClientId: '663025876883-tk2kkctekgk68qpg1386729qoo3lc6tu.apps.googleusercontent.com',
    googleAnalyticsID: 'G-DQEWEVFE1T',
    facebookAppId: '577772940724693',
  };
} else {
  configs = {
    websiteName: 'VRStyler (DEV)',
    apiRoot: 'https://market-api.tainguyenviet.com',
    urlRoot: 'http://localhost:3008',
    urlModelViewer: 'https://modelviewer.tainguyenviet.com',
    stripePublicKey: 'pk_test_HJSCHlbzNt0bsS2oJiShWA2I',
    paypalClientId:
      'AQrE0Y9RVP1L2IF4LauVLgdBZlixbbdHG6MZEzPT5ohgAA1USMRWwNztGiBHNmLPuN9M9HBkveOr_T6M',
    googleClientId: '663025876883-tk2kkctekgk68qpg1386729qoo3lc6tu.apps.googleusercontent.com',
    googleAnalyticsID: 'G-DQEWEVFE1T',
    facebookAppId: '577772940724693',
  };
}

const config = Object.assign(configs);

export default config;
