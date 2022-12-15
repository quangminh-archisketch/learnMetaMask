import { Dropdown, Menu } from 'antd';
import {
  DeleteFilled,
  EditFilled,
  EyeFilled,
  MoreOutlined,
  CopyFilled,
  CheckOutlined,
} from '@ant-design/icons';

import Icon from './Icons';

import { ProductModel } from 'models/product.model';
import { CouponType } from 'models/coupon.models';
import { AdministratorType } from 'models/administrator.model';

import { showConfirmDelete } from './ModalConfirm';
import { mediaType } from 'models/media.models';
import { SeoModel } from 'models/seo.models';
import { BannerModel } from 'models/banner.model';
import { DataHelpType } from 'models/help-model';
import { LicenseModel } from 'models/license.models';

type Disabled = 'view' | 'edit' | 'delete' | 'copy' | 'active' | 'restore' | '';

type Props = {
  data:
    | ProductModel
    | CouponType
    | AdministratorType
    | mediaType
    | SeoModel
    | BannerModel
    | DataHelpType
    | LicenseModel;
  disabled?: Disabled[];
  contentDelete?: { title?: string; content?: string };
  contentRestore?: { title?: string; content?: string };
  handleView?: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handelCopy?: () => void;
  handleActive?: () => void;
  handleRestore?: () => void;
};

const MenuAction = (props: Props) => {
  const actionMenu = (data: any) => {
    let menuItems = [];

    if (props.handleActive)
      menuItems.push({
        key: 'active',
        label: data?.status ? 'In-Active' : 'Active',
        icon: <CheckOutlined />,
        disabled: props.disabled?.includes('active'),
        onClick: props.handleActive,
      });

    if (props.handleRestore) {
      menuItems.push({
        key: 'restore',
        label: 'Restore',
        icon: (
          <div className='d-flex align-items-center'>
            <Icon iconName='reset-temporary' />
          </div>
        ),
        disabled: props.disabled?.includes('restore'),
        onClick: () =>
          props.handleRestore &&
          showConfirmDelete(
            data.id,
            props.handleRestore,
            props.contentRestore?.title,
            props.contentRestore?.content
          ),
      });
    }

    if (props.handelCopy)
      menuItems.push({
        key: 'copy',
        label: 'Copy',
        icon: <CopyFilled />,
        disabled: props.disabled?.includes('copy'),
        onClick: props.handelCopy,
      });

    if (props.handleView)
      menuItems.push({
        key: 'view',
        label: 'View',
        icon: <EyeFilled />,
        disabled: props.disabled?.includes('view'),
        onClick: props.handleView,
      });

    if (props.handleEdit)
      menuItems.push({
        key: 'edit',
        label: 'Edit',
        icon: <EditFilled />,
        disabled: props.disabled?.includes('edit'),
        onClick: props.handleEdit,
      });

    if (props.handleDelete)
      menuItems.push({
        key: 'delete',
        label: 'Delete',
        icon: <DeleteFilled />,
        disabled: props.disabled?.includes('delete'),
        onClick: () =>
          props.handleDelete &&
          showConfirmDelete(
            data.id,
            props.handleDelete,
            props.contentDelete?.title,
            props.contentDelete?.content
          ),
      });

    return <Menu items={menuItems} />;
  };

  return (
    <Dropdown
      overlay={actionMenu(props.data)}
      trigger={['click']}
      arrow
      placement='bottom'
      overlayClassName='menu-action'>
      <MoreOutlined />
    </Dropdown>
  );
};

export default MenuAction;
