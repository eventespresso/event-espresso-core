import React from 'react';
import { pathOr } from 'ramda';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table/interface';

const EspressoTable = <RecordType extends object = any>(props: TableProps<RecordType>) => {
	// Pagination props
	const hideOnSinglePage = pathOr(true, ['pagination', 'hideOnSinglePage'])(props);
	const pageSize = pathOr(2, ['pagination', 'pageSize'])(props);
	const size = pathOr('small', ['pagination', 'size'])(props);
	const total = pathOr(null, ['pagination', 'total'])(props);
	const pagination = { hideOnSinglePage, pageSize, size, total };

	return (
		<Table
			columns={props.columns}
			dataSource={props.dataSource}
			locale={props.locale}
			pagination={pagination}
			size='middle'
		/>
	);
};

export default EspressoTable;
