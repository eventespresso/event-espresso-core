import React, { useState } from 'react';
import { Table } from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import { pipe, update } from 'ramda';
import HTML5Backend from 'react-dnd-html5-backend';

import './styles.scss';

let dragingIndex = -1;

const BodyRow = ({ isOver, connectDragSource, connectDropTarget, moveRow, ...restProps }) => {
	const style = { ...restProps.style, cursor: 'move' };
	let { className } = restProps;

	if (isOver) {
		if (restProps.index > dragingIndex) {
			className += ' drop-over-downward';
		}
		if (restProps.index < dragingIndex) {
			className += ' drop-over-upward';
		}
	}

	return connectDragSource(connectDropTarget(<tr {...restProps} className={className} style={style} />));
};

const rowSource = {
	beginDrag(props) {
		dragingIndex = props.index;
		return {
			index: props.index,
		};
	},
};

const rowTarget = {
	drop(props, monitor) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Time to actually perform the action
		props.moveRow(dragIndex, hoverIndex);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
	},
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
}))(
	DragSource('row', rowSource, (connect) => ({
		connectDragSource: connect.dragSource(),
	}))(BodyRow)
);

const EspressoDragSortingTable = (props) => {
	const [data, setData] = useState(props.data);

	const components = {
		body: {
			row: DragableBodyRow,
		},
	};

	const moveRow = (dragIndex, hoverIndex) => {
		const dragRow = data[dragIndex];
		const hoverRow = data[hoverIndex];
		const newData = pipe(update(hoverIndex, dragRow), update(dragIndex, hoverRow))(data);

		setData(newData);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<Table
				className='table-drag-sorting'
				columns={columns}
				dataSource={data}
				components={components}
				onRow={(record, index) => ({
					index,
					moveRow: moveRow,
				})}
			/>
		</DndProvider>
	);
};

export default EspressoDragSortingTable;
