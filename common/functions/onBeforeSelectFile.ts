import { message, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';

const onBeforeSelectFile = (props: { file: RcFile; ruleType?: string[]; ruleSize?: number }) => {
  const { file, ruleType = ['image/jpeg', 'image/png'], ruleSize = 2 } = props;

  let isAllowType = true;
  isAllowType = ruleType.includes(file.type);
  if (!isAllowType)
    message.error(
      `You can only upload ${ruleType
        .map((i, index) => {
          return i.split('/')[1].toUpperCase() + (index !== ruleType.length - 1 ? ', ' : '');
        })
        .join('')} file!`
    );

  let isLimitSize = true;
  isLimitSize = file.size / 1024 / 1024 < ruleSize;
  if (!isLimitSize) message.error(`Image must smaller than ${ruleSize}MB!`);

  return (isAllowType && isLimitSize) || Upload.LIST_IGNORE;
};

export default onBeforeSelectFile;
