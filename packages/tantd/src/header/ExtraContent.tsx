import React, { memo, useMemo, useLayoutEffect, useRef, useState, ReactElement } from 'react'
import { Dropdown, Menu, Button } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'

interface ExtraContentProps {
	width?: number,
	tools: (ReactElement | string | any)[],
	prefixCls: string
}

export default memo(function ExtraContent({ width = 0, tools, prefixCls }: ExtraContentProps) {
	const [startIndex, setStartIndex] = useState(-1);
	const [toolsHeight, setToolsHeight] = useState(0);
	const toolsRef = useRef<HTMLDivElement>(null)
	const ref = useRef<HTMLDivElement>(null)

	const renderFixed = useMemo(() => {
		return React.Children.map(tools, (item, index) => {
			return React.cloneElement(item, { key: index })
		})
	}, [tools])

	const getDrapContent = useMemo(() => {
		if (startIndex === -1) return null;
		const renderDrapChildren: JSX.Element[] = []
		React.Children.map(tools, (item, index) => {
			if (index >= startIndex) renderDrapChildren.push(<div key={index} style={{ margin: '5px' }}>{item}</div>)
		})
		return renderDrapChildren
	}, [tools, startIndex])

	const renderExtra = useMemo(() => {
		if (startIndex === -1) return React.Children.map(tools, (item, index) => {
			return React.cloneElement(item, { key: index })
		})
		const renderChildren: ReactElement[] = []
		React.Children.map(tools, (item, index) => {
			if (index < startIndex) {
				renderChildren.push(React.cloneElement(item, { key: index }))
			}
		})
		return renderChildren
	}, [tools, startIndex]);

	useLayoutEffect(() => {
		if (toolsRef.current && (width)) {
			const toolsRefHeight = toolsRef.current.clientHeight;
			setToolsHeight(toolsRefHeight);
			if (width - toolsRefHeight - 20 >= toolsRef.current.clientWidth) {
				setStartIndex(-1);
			}
			let toolWidth = 0;
			const childrenItems = toolsRef.current.children;
			for (let i = 0; i < childrenItems.length - 1; i++) {
				if (!childrenItems[i]) return
				const childItem = childrenItems.item(i);
				if (!childItem) { return }
				const { width: styleWidth, marginLeft, marginRight, height } = getComputedStyle(childItem);
				const itemWidth = parseInt(styleWidth) + parseInt(marginLeft) + parseInt(marginRight);
				toolWidth += itemWidth;
				const itemHeight = parseInt(height)
				setToolsHeight(itemHeight);
				if (toolWidth + toolsRefHeight + 20 > width) {
					return setStartIndex(i)
				}
			}
			return setStartIndex(-1)
		}
	}, [toolsRef.current, width, tools])

	return (
		<div className={`${prefixCls}-extra`}>
			<div className={`${prefixCls}-extra-tools`} ref={ref} >
				{renderExtra}
				{
					startIndex > -1 && <Dropdown
						trigger={['click']}
						overlay={<Menu style={{ padding: '5px 0' }} >{getDrapContent}</Menu>}
						placement="bottomRight"
						overlayStyle={{ zIndex: 2 }}
						overlayClassName={prefixCls + '-dropdown'}
					>
						<Button className={`${prefixCls}-icon`}
							style={{ height: toolsHeight, width: toolsHeight }}
						>
							<EllipsisOutlined />
						</Button>
					</Dropdown>
				}
			</div>
			<div ref={toolsRef} className={`${prefixCls}-extra-fixed`} >
				{renderFixed}
			</div>
		</div>
	)
})
