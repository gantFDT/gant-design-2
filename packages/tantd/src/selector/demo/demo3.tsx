/**
 *
 * title.zh-CN: 最近选择-数量限制
 * desc.zh-CN: 可通过`storageCount`设置最近选择项的数量，默认为10，新选择项会替换掉旧选择项。
 */
import React from 'react';
import { Selector } from 'tantd';

export default () => {
    const options = [
        { label: 'Jack', value: 'jack' },
        { label: 'Lucky', value: 'lucky' },
        { label: 'Tom', value: 'tom' },
        { label: 'Mike', value: 'mike' },
        { label: 'John', value: 'john' },
    ]

    return <Selector
        selectorId='demo-storageCount'
        useStorage
        storageCount={2}
        options={options}
        style={{ width: 200 }}
    />
}