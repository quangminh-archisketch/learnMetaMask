import { EditFilled, MoreOutlined, CopyFilled, EyeFilled, DeleteFilled } from '@ant-design/icons';
import { Dropdown, Menu, Modal } from 'antd';

import { ModelsType } from 'models/seller.model';

type Disabled = 'view' | 'edit' | 'delete' | 'copy' | '';

type Props = {
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  data?: ModelsType;
  disabled?: Disabled[];
  contentDelete?: { title?: string; content?: string };
  handleView?: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handelCopy?: () => void;
};

const MenuAction = (props: Props) => {
  const actionMenu = () => {
    let menuItems = [];

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
          Modal.confirm({
            title: 'Are you sure delete this item?',
            content: props.data?.title,
            centered: true,
            onOk: props.handleDelete,
          }),
      });

    return <Menu items={menuItems} />;
  };

  return (
    <Dropdown
      overlay={actionMenu()}
      trigger={props.trigger || ['click']}
      arrow
      placement='bottom'
      overlayClassName='menu-action'>
      <MoreOutlined className='icon icon--dropdown' />
    </Dropdown>
  );
};

export default MenuAction;
