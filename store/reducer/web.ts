import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, AppStateWeb, WebsiteSettingsModel } from 'store/type';
import { BannerModel } from 'models/banner.models';
import { CategoryModel } from 'models/category.models';

const initialState: AppStateWeb = {
  movingPage: false,
  notificationTotal: 0,
};

export const slice = createSlice({
  name: 'webRedux',
  initialState,
  reducers: {
    //Settings
    SaveWebSettings: (state, action: PayloadAction<WebsiteSettingsModel>) => {
      state.setting = action.payload;
    },
    SaveCategory: (state, action: PayloadAction<CategoryModel[]>) => {
      state.categories = action.payload;
    },
    SaveBanner: (state, action: PayloadAction<BannerModel>) => {
      state.banner = action.payload;
    },
    MovePageStart: (state) => {
      state.movingPage = true;
    },
    MovePageEnd: (state) => {
      state.movingPage = false;
    },
    ShowNotificationBar: (state) => {
      state.notificationBar = true;
    },
    HideNotificationBar: (state) => {
      state.notificationBar = false;
    },
    UpdateNotification: (
      state,
      action: PayloadAction<{ type: 'set' | 'down' | 'reset'; count?: number }>
    ) => {
      switch (action.payload.type) {
        case 'set':
          state.notificationTotal = action.payload.count;
          return;
        case 'reset':
          state.notificationTotal = 0;
        case 'down':
          state.notificationTotal = (state.notificationTotal || 1) - 1;
      }
    },
    OpenShare: (state, action: PayloadAction<{ link: string }>) => {
      state.share = { link: action.payload.link };
    },
    CloseShare: (state) => {
      state.share = { link: '' };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  SaveWebSettings,
  SaveCategory,
  SaveBanner,
  MovePageStart,
  MovePageEnd,
  ShowNotificationBar,
  HideNotificationBar,
  UpdateNotification,
  OpenShare,
  CloseShare,
} = slice.actions;

export const detectShareVisible = (state: AppState) =>
  state.web.share && state.web.share.link.length > 0;

export const selectInfoShare = (state: AppState) => state.web.share;

export default slice.reducer;
