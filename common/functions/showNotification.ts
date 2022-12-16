import { ReactNode } from 'react';
import { notification } from 'antd';
import { IconType } from 'antd/lib/notification';

const showNotification = (type: IconType, option: { message: string; description?: ReactNode }) => {
  return notification[type]({
    ...option,
    top: 70,
    duration: 2.5,
    style: { width: 'auto', maxWidth: 600 },
  });
};

export default showNotification;
