export type TypeFilter = 'name' | 'price' | 'date' | 'status';

export type BodyOrder = {
  order_status: boolean;
  start_date: Date;
  end_date: Date;
};

export type OrderModel = {
  createdAt: string;
  discount: number;
  id: string;
  market_coupon?: {
    code: string;
    discount: number;
    id: string;
  };
  market_items_boughts_aggregate?: {
    aggregate: {
      count: number;
      sum: {
        price: number;
      };
    };
    nodes: {
      is_checked: boolean;
    }[];
  };
  market_user: {
    image: string;
    name: string;
    nickname: string;
  };
  order_no: number;
};

export type ModelsType = {
  bought_count: number;
  createAt: Date;
  id: string;
  image: string;
  like_count: number;
  price: number;
  status: 0 | 1 | 5;
  sumamry_review: {
    aggregate: {
      avg: {
        rate?: number;
      };
      count: number;
    };
  };
  summary_comment: {
    aggregate: {
      count: number;
    };
  };
  summary_sold: {
    aggregate: {
      sum: {
        price: number;
      };
    };
  };
  title: string;
  viewed_count: number;
};

export type TotalAmountType = {
  avalible: number | null;
  holding: number | null;
  request: number | null;
  total: number | null;
  withdraw: number | null;
  total_amount_day: {
    aggregate: {
      sum: {
        price: number | null;
      };
    };
  };
  total_amount_month: {
    aggregate: {
      sum: {
        price: number | null;
      };
    };
  };
  total_current_amount: number;
  total_revenue: {
    aggregate: {
      sum: {
        price: number | null;
      };
    };
  };
  total_withdraw: {
    aggregate: {
      sum: {
        price: number | null;
      };
    };
  };
};

export type ParamFilter = {
  name?: string;
  start_date: string | Date;
  end_date: string | Date;
  order_status?: boolean;
  status?: number;
  sort_by?: string;
  sort_type?: 'desc' | 'asc';
};

export type MarketItemBought = {
  market_item: {
    id: string;
    image: string;
    old_price: number | null;
    price: number;
    title: string;
  };
};

export type OrderDetailModel = {
  createdAt: string | Date;
  discount: number;
  id: string;
  market_coupon?: {
    code: string;
    prefix: string;
    value: number;
  };
  market_items_boughts: MarketItemBought[];
  order_no: number;
  payment_method: string;
  subtotal: {
    aggregate: {
      sum: {
        price: number;
      };
    };
  };
};

export type WithdrawModel = {
  account_name: string;
  amount: number;
  card_number: string;
  createAt: string | Date;
  id: string;
  market_user: {
    email: string;
    name: string;
    nickname: string;
  };
  order_no: number;
  status: 1 | 2 | 3;
  swift_code: string;
  user_id: string;
};

export type ParamWithdraw = {
  account_name: string;
  swift_code: string;
  bank_name: string;
  card_number: string;
  amount: number;
  amount_withdraw?: number;
};

export type MarketUserType = {
  id: string;
  image: string;
  name: string;
  nickname: string;
};

export type MarketReviewsType = {
  content: string;
  createAt?: string | Date;
  id?: string;
  is_replied?: boolean;
  item_id?: string;
  parentid?: string;
  market_user?: MarketUserType;
  updateAt?: string | Date;
  user_id?: string;
};

export type ReviewModel = {
  content: string;
  createdAt: string | Date;
  id: string;
  is_replied: boolean;
  market_item: {
    id: string;
    image: string;
    title: string;
  };
  market_user: MarketUserType;
  market_reviews: MarketReviewsType[] | [];
  rate: number;
};

export type ParamReview = {
  start_date?: string | Date;
  end_date?: string | Date;
  sort_type?: 'desc' | 'asc' | '';
  sort_by?: string;
  rate?: number;
  title?: string;
  is_replied: boolean;
};

export type StatisticalModel = {
  time: number | string;
  value: number;
};

export type MyWithdrawType = {
  loadingWithdraw: boolean;
  minWithdraw: number;
  currentWithdraw: number;
  onCheckWithdraw: () => void;
};
