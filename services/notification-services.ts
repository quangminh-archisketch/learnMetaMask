import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

const notificationServices = {
  getAllNotification: async (limit: number, offset: number, body: any) => {
    const resp = await apiHandler.create(
      `${apiConstant.notification}/${limit}/${offset}`,
      body || {}
    );
    return resp.data;
  },
  markAllRead: async (body: any) => {
    const resp = await apiHandler.update(apiConstant.notification, body || null);
    return resp.data;
  },
  markRead: async (id: string) => {
    const resp = await apiHandler.update(`${apiConstant.notification}/${id}`, null);
    return resp.data;
  },
  deleteRead: async (id: string) => {
    const resp = await apiHandler.delete(`${apiConstant.notification}/${id}`);
    return resp.data;
  },
  deleteAllRead: async () => {
    const resp = await apiHandler.delete(apiConstant.notification + '/' + 'delete-all');
    return resp.data;
  },
  getCountNotificationUnread: async () => {
    const resp = await apiHandler.get(apiConstant.notification + '/' + 'count-noti-unread', null);
    return resp.data;
  },
};

export default notificationServices;
