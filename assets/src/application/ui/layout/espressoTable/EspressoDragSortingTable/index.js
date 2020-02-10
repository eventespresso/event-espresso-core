import React from 'react';
import { Table } from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

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

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
];

class EspressoDragSortingTable extends React.Component {
	state = {
		data: [
			{
				key: '1',
				name: 'John Brown',
				age: 32,
				address: 'New York No. 1 Lake Park',
			},
			{
				key: '2',
				name: 'Jim Green',
				age: 42,
				address: 'London No. 1 Lake Park',
			},
			{
				key: '3',
				name: 'Joe Black',
				age: 32,
				address: 'Sidney No. 1 Lake Park',
			},
		],
	};

	components = {
		body: {
			row: DragableBodyRow,
		},
	};

	moveRow = (dragIndex, hoverIndex) => {
		const { data } = this.state;
		const dragRow = data[dragIndex];

		this.setState(
			update(this.state, {
				data: {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragRow],
					],
				},
			})
		);
	};

	render() {
		return (
			<DndProvider backend={HTML5Backend}>
				<Table
					className='table-drag-sorting'
					columns={columns}
					dataSource={this.state.data}
					components={this.components}
					onRow={(record, index) => ({
						index,
						moveRow: this.moveRow,
					})}
				/>
			</DndProvider>
		);
	}
}

export default EspressoDragSortingTable;
