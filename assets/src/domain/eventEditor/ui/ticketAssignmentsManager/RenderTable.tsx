import React from 'react';
import { Table } from 'antd';

import { RenderTableProps } from './types';
import { Datetime } from '@edtrServices/apollo/types';
import RenderCell from './RenderCell';
import TicketHeader from './TicketHeader';
import useRowClassName from './useRowClassName';
import useColClassName from './useColClassName';
import useCellProps from './useCellProps';

const { Column } = Table;

const RenderTable: React.FC<RenderTableProps> = ({ datetimes, tickets }) => {
	const getRowClass = useRowClassName();
	const getColClass = useColClassName();
	const getCellProps = useCellProps();

	return (
		<Table<Datetime>
			dataSource={datetimes}
			rowKey={(item) => item.id}
			pagination={{ pageSize: 5 }}
			rowClassName={(datetime) => getRowClass(datetime)}
			id='ticket-assignment-manager'
			bordered
		>
			<Column<Datetime>
				title={null}
				key={'titlecol'}
				className='title-col'
				render={(_, datetime) => (
					<span>
						{datetime.dbId}: {datetime.name}
					</span>
				)}
			/>

			{tickets.map((ticket) => {
				return (
					<Column<Datetime>
						title={(props) => <TicketHeader {...props} ticket={ticket} />}
						key={ticket.id}
						className={getColClass(ticket)}
						onCell={({ id: datetimeId }) => getCellProps({ datetimeId, ticketId: ticket.id })}
						render={(_, datetime) => <RenderCell datetime={datetime} ticket={ticket} />}
					/>
				);
			})}
		</Table>
	);
};

export default RenderTable;
