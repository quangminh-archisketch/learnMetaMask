import apiHandler from 'api/api-handler';
import apiConstant from 'api/api-constants';

const reviewServices = {
  getReviews: async (productId: string, limit: number, offset: number) => {
    const resp = await apiHandler.get(
      `${apiConstant.reviews}/item/${productId}/${limit}/${offset}`
    );
    return resp.data;
  },

  addReview: async (productId: string, content: string, rate: number) => {
    const resp = await apiHandler.create(`${apiConstant.reviews}/item/${productId}`, {
      content,
      rate,
    });
    return resp.data;
  },

  replyReview: async (id: string, body: { content: string }) => {
    const resp = await apiHandler.create(`${apiConstant.reviews}/child/${id}`, body);

    return resp.data;
  },
};

export default reviewServices;
