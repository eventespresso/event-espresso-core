import useTicketItem from '../data/queries/tickets/useTicketItem';

const TicketId = ({ id }) => {
	const { dbId } = useTicketItem({ id }) || {};
	return dbId ? <code>{dbId}</code> : null;
};

export default TicketId;
