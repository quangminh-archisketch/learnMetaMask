import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

export type ParamCreateUser = {
  username: string;
  email: string;
  password: string;
  name: string;
};

const userServices = {
  register: async (body: ParamCreateUser) => {
    const resp = await apiHandler.create(apiConstant.users + '/register', body);
    return resp.data;
  },

  confirmRegister: async (body: { email: string; token: string }) => {
    const resp = await apiHandler.create(apiConstant.users + '/register-confirmation', body);
    return resp.data;
  },

  sendMailVerify: async () => {
    const resp = await apiHandler.get(apiConstant.users + '/resend-confirmation');
    return resp.data;
  },

  getOTPChangeEmail: async () => {
    const resp = await apiHandler.get(apiConstant.users + '/change-email-otp');
    return resp.data;
  },

  changeEmail: async (body: { new_email: string; otp: string }) => {
    const resp = await apiHandler.create(apiConstant.users + '/change-email-request', body);
    return resp.data;
  },

  confirmChangeEmail: async (token: string) => {
    const resp = await apiHandler.update(apiConstant.users + '/change-email', { hash: token });
    return resp.data;
  },

  forgotPassword: async (body: { email: string }) => {
    const resp = await apiHandler.create(apiConstant.users + '/forgot-password', body);
    return resp.data;
  },

  checkTokenResetPw: async (token: string) => {
    const resp = await apiHandler.create(apiConstant.users + '/forgot-token-confirmation', {
      token,
    });
    return resp.data;
  },

  resetPassword: async (body: { email: string; password: string; token: string }) => {
    const resp = await apiHandler.create(apiConstant.users + '/reset-password', body);
    return resp.data;
  },

  changeAvatar: async (body: {
    oldImage?: string;
    image: string;
    filename: string;
    filetype: string;
  }) => {
    const resp = await apiHandler.update(apiConstant.users + '/update-profile', body);
    return resp.data;
  },

  updateProfile: async (body: {
    oldImage?: string;
    image?: string;
    filename?: string;
    filetype?: string;
    name?: string;
    work?: string;
    location?: string;
  }) => {
    const resp = await apiHandler.update(apiConstant.users + '/update-profile', body);
    return resp.data;
  },

  changePassword: async (body: { password: string; new_password: string }) => {
    const resp = await apiHandler.update(apiConstant.users + '/change-password', body);
    return resp.data;
  },

  updateNotification: async (body: { email_subscription: boolean }) => {
    const resp = await apiHandler.update(apiConstant.users + '/update-profile', body);
    return resp.data;
  },

  sellerRegister: async () => {
    const resp = await apiHandler.create(apiConstant.users + '/become-seller', null);
    return resp.data;
  },
};

export default userServices;
