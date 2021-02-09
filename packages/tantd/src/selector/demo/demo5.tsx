/**
 *
 * title.zh-CN: 暴露apiRef
 * desc.zh-CN: 可通过apiRef实例获取维护最近选择项的方法。
 */
import React, { useState, useRef } from 'react';
import { Selector } from 'tantd';
import { RefApiProps } from 'tantd/lib/selector';

export default () => {

    const [labels, setLabels] = useState('')
    const apiRef = useRef<RefApiProps>()

    const dataSource = [];
    for (let i = 10; i < 36; i++) {
        dataSource.push({ title: i.toString(36) + i, code: i + 1 });
    }

    return <>
        <Selector
            selectorId='demo-apiRef'
            useStorage
            apiRef={apiRef}
            dataSource={dataSource}
            dataConfig={{
                valueProp: 'code',
                labelProp: 'title'
            }}
            style={{ width: 400 }}
        />
        <div>
            <button
                style={{ marginTop: 5 }}
                onClick={() => {
                    const list = apiRef.current.getStorageList();
                    setLabels(list.map((i) => i.label).join(','));
                }}>
                获取最近可选
                </button>
               ：<span>{labels || '暂无'}</span>
        </div>
        <button style={{ marginTop: 5 }} onClick={() => apiRef.current.setStorageList()}>清除最近可选</button>
    </>
}