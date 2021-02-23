import React, { ReactNode } from 'react';
import { Row, Col, Form, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import classnames from 'classnames';
// import { Icon } from '@data-cell'
import Item from './item';

export interface ProfileCardProps {
  prefixCls?: string;
  data?: any;
  fields?: any[];
  showAvatar?: boolean;
  labelAlign?: any;
  avatarAlign?: string;
  extraLeftTop?: ReactNode;
  extraRightTop?: ReactNode;
  extraBottom?: ReactNode;
  backgroundImage?: string | boolean;
  backgroundBlur?: number | boolean;
  layout?: object;
  trigger?: string;
  placement?: any;
  overlayClassName?: string;
  onAvatarClick?: () => void;
  height?: number;
  width?: number;
  children?: any;
  className?: string;
  form?: any;
}

const ProfileCard = (props: ProfileCardProps) => {
  const {
    prefixCls: customizePrefixCls = 'gant',
    data,
    fields,
    showAvatar = true,
    labelAlign = 'default',
    avatarAlign = 'top',
    extraLeftTop,
    extraRightTop,
    extraBottom,
    backgroundImage,
    backgroundBlur = 3,
    height,
    width,
    trigger = 'hover',
    children,
    className,
    placement = 'bottom',
    overlayClassName,
    onAvatarClick,
    layout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
    },
  } = props;

  const prefixCls = customizePrefixCls + '-profilecard';
  const content = (
    <div className={classnames(prefixCls, avatarAlign, className)} style={{ height: height || 'auto', width: width || 'auto', paddingBottom: extraBottom ? 40 : 0 }}>
      {/* 左上角 */}
      {extraLeftTop && (
        <div className={`${prefixCls}-fixedlefttop`}>{extraLeftTop}</div>
      )}
      {/* 右上角 */}
      {extraRightTop && (
        <div className={`${prefixCls}-fixedrighttop`}>{extraRightTop}</div>
      )}
      {/* 头像 */}
      {showAvatar &&
        <div className={classnames(`${prefixCls}-avatarBox`, avatarAlign)}>
          <div className={classnames(`${prefixCls}-avatarBox-bg`, avatarAlign)} style={backgroundImage === false ? {} : { backgroundImage: `url(${backgroundImage || data.avatarUrl})`, backgroundSize: 'cover', filter: `blur( ${backgroundBlur}px )` }}></div>
          <div className={classnames(`${prefixCls}-avatarBox-avatar`, avatarAlign)} style={{ backgroundImage: `url(${data.avatarUrl})`, cursor: onAvatarClick ? 'pointer' : 'default' }} onClick={onAvatarClick && onAvatarClick}>
            {!data.avatarUrl && <UserOutlined />}
          </div>
        </div>
      }
      {/* form表单 */}
      <div className={classnames(`${prefixCls}-fields`, labelAlign == 'left' && 'dataform', avatarAlign,)} style={{ overflowY: 'auto', width: 'auto' }}>
        <Form labelAlign={labelAlign} style={{ height: '100%' }}>
          <Row gutter={24} style={{ marginBottom: '10px', width: '100%' }}>
            {
              fields.map(field => {
                return (
                  <Col key={field.key} style={{ minWidth: 200, width: '100%' }}>
                    <Form.Item
                      label={field.label}
                      {...layout}
                    >
                      <Item value={data[field.key]}{...field} />
                    </Form.Item>
                  </Col>
                );
              })
            }
          </Row>
        </Form>
      </div>
      {/* 底部 */}
      {extraBottom && (
        <div className={`${prefixCls}-fixedbottom`}>{extraBottom}</div>
      )}
    </div>
  );

  return (
    data && (children ?
      (
        <Popover placement={placement} content={content} trigger={trigger} overlayClassName={overlayClassName}>
          {children}
        </Popover>
      ) : content
    )
  );
};

export default ProfileCard;