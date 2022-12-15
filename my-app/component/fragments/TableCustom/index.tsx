import React, { memo } from 'react';

import moment from 'moment';
import { Table, Input, Col, Spin, Select, Button, Checkbox, Empty, DatePicker } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { RangePickerProps } from 'antd/lib/date-picker';

import TreeSelectFragment from 'components/fragments/TreeSelect';

import { DataTablesProps, SearchModel } from 'models/table.model';

import * as SC from './style';

const Index = (props: DataTablesProps) => {
  return (
    <SC.Table_Wrapper>
      {props.searchColumn && props.searchColumn?.length > 0 && (
        <SC.Search>
          {props.searchColumn.map((item: SearchModel, index) => {
            return (
              <Col
                key={index}
                className={
                  'gutter-row' +
                  (item.wrapperClass ? ' ' + item.wrapperClass : '') +
                  (item.type === 'checkbox-group' ? ' d-flex' : '')
                }
                xxl={item.width?.xxl}
                xl={item.width?.xl}
                lg={item.width?.lg}
                md={item.width?.md}
                sm={item.width?.sm}
                xs={item.width?.xs}
                span={item.width?.span}>
                <SC.SearchItem
                  className={`${item.type === 'button' ? 'justify-content-end' : ''}${
                    item.type === 'checkbox-group' ? 'align-items-start' : ''
                  }`}>
                  {/* Title Search */}
                  {item.title && item.type !== 'button' && (
                    <label className='title'>{item.title}:</label>
                  )}

                  {/* Search Box */}
                  {BoxSearch(item)}

                  {item.type === 'input-group' && (
                    <Input.Group compact>
                      {item.boxChildren?.map((item2) => {
                        return BoxSearch(item2);
                      })}
                    </Input.Group>
                  )}
                </SC.SearchItem>
              </Col>
            );
          })}

          {(props.onSearch || props.onReset) && (
            <Col className='gutter-row text-right' span={24}>
              {props.onReset && (
                <Button className='mr-3' type='ghost' onClick={props.onReset}>
                  Reset
                </Button>
              )}
              {props.onSearch && (
                <Button type='primary' onClick={props.onSearch}>
                  Search
                </Button>
              )}
            </Col>
          )}
        </SC.Search>
      )}

      <Spin spinning={props.loading || false}>
        <Table
          columns={props.columns}
          dataSource={props.data}
          rowKey={props.rowKey}
          expandable={props.expandable}
          locale={{
            emptyText: (
              <Empty
                description={!props.data ? 'No Data' : 'No Record Found'}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
          scroll={{ x: props.width }}
          pagination={
            props.isPagination
              ? {
                  current: props.page,
                  showSizeChanger: props.isChangePageSize || false,
                  pageSize: props.pageSize,
                  total: props.total || props.data?.length,
                  onShowSizeChange: (_, size) =>
                    props.onChangePageSize && props.onChangePageSize(size),
                  onChange: (page) => props.onChangePage && props.onChangePage(page),
                }
              : false
          }
        />
      </Spin>
    </SC.Table_Wrapper>
  );
};

export default memo(Index);

const BoxSearch = (props: SearchModel) => {
  switch (props.type) {
    case 'input':
      return (
        <Input
          allowClear
          type='text'
          addonBefore={props.addonBefore}
          addonAfter={props.addonAfter}
          suffix={props.suffix}
          placeholder={props.placeholder}
          min={0}
          value={props.value}
          onChange={(e) => props.onChange && props.onChange(props.key, e.currentTarget.value)}
        />
      );

    case 'input-number':
      return (
        <Input
          type='number'
          addonBefore={props.addonBefore}
          addonAfter={props.addonAfter}
          suffix={props.suffix}
          placeholder={props.placeholder}
          min={0}
          value={props.value}
          onChange={(e) => props.onChange && props.onChange(props.key, e.currentTarget.value)}
        />
      );

    case 'checkbox-group':
      return (
        <Checkbox.Group
          options={props.data ? props.data : undefined}
          value={props.value}
          onChange={(checkedValues: CheckboxValueType[]) =>
            props.onChange && props.onChange(props.key, checkedValues)
          }
        />
      );

    case 'select':
      return (
        <Select
          allowClear
          style={{ width: '100%' }}
          placeholder={props.placeholder}
          optionLabelProp='label'
          value={props.value}
          onClear={() => props.onChange && props.onChange(props.key, '')}
          onChange={(value) => props.onChange && props.onChange(props.key, value)}>
          {props.data?.map((option, index) => {
            return (
              <Select.Option key={index} value={option.value} label={option.label}>
                <div>{option.title}</div>
              </Select.Option>
            );
          })}
        </Select>
      );

    case 'select-multi':
      return (
        <Select
          mode='multiple'
          allowClear
          style={{ width: '100%' }}
          placeholder={props.placeholder}
          optionLabelProp='label'
          value={props.value}
          onChange={(value) => props.onChange && props.onChange(props.key, value)}>
          {props.data?.map((option, index) => {
            return (
              <Select.Option key={index} value={option.value} label={option.label}>
                <div>{option.title}</div>
              </Select.Option>
            );
          })}
        </Select>
      );

    case 'tree-select-multi':
      return (
        <TreeSelectFragment
          propKey={props.key}
          placeholder={props.placeholder}
          value={props.value}
          options={props.data || []}
          onChange={props.onChange}
        />
      );

    case 'range-picker':
      const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current && current > moment().endOf('day');
      };
      return (
        <DatePicker.RangePicker
          style={{ width: '100%' }}
          inputReadOnly
          disabledDate={props.blockDateFuture ? disabledDate : undefined}
          format='DD/MM/YYYY'
          value={props.value}
          onChange={(dates) => props.onChange && props.onChange(props.key, dates)}
        />
      );

    case 'button':
      return (
        <Button type='primary' onClick={props.onClick}>
          {props.title}
        </Button>
      );

    default:
      break;
  }
};
