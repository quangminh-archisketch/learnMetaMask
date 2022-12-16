export type ProfileSellerModel = {
  title: string;
  preview: boolean;
  image: string;
};

export type UserSellerModel = {
  id: string;
  image: string;
  is_seller: boolean;
  market_items_aggregate: {
    aggregate: {
      sum: {
        like_count: number;
        viewed_count: number;
      };
    };
  };
  market_reviews_aggregate: {
    aggregate: {
      avg: {
        rate: number;
      };
    };
  };
  name: string;
  nickname: string;
  skills: string[];
  softwares: string[];
  position: string;
  website: string;
  work?: string;
};

export type ModelsType = {
  id: string;
  image: string;
  like_count: number;
  market_reviews_aggregate: {
    aggregate: {
      count: number;
      avg: {
        rate: 5;
      };
    };
  };
  old_price: number;
  price: number;
  title: string;
  viewed_count: number;
};
