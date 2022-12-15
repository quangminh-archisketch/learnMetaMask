import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const { DEPLOY_ENV } = publicRuntimeConfig

var configs

if (DEPLOY_ENV === 'prod') {
  configs = {
    apiServer: 'http://movieapi.cyberlearn.vn',
  }
} else if (DEPLOY_ENV === 'dev') {
  configs = {
    apiServer: 'http://movieapi.cyberlearn.vn',
  }
} else {
  configs = {
    apiServer: 'http://movieapi.cyberlearn.vn',
    urlWeb: 'http://localhost:3008',
  }
}

const config = Object.assign(configs)

export default config
