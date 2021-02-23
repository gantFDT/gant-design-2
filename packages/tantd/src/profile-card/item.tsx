import React from 'react';
import { Tag, Tooltip } from 'antd';

export interface ItemProps {
    mode?: string;
    value: any[];
};

const Item = (props: ItemProps) => {
    const { value, mode = '' } = props;
    return (
        <>
            {
                value.constructor == Array ?
                    value.map(v => <Tag key={v}>{v}</Tag>) :
                    <Tooltip placement="bottomLeft" title={value}>
                        <p className="itemText omitdisplay" style={{ color: value ? 'rgba(0,0,0,.9)' : '#ccc' }}>{value || '暂无'}</p>
                    </Tooltip>
            }
        </>
    );
};
export default Item;
