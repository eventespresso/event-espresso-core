import useTicketItem from '../data/queries/tickets/useTicketItem';

const TicketId = ({ id }) => {
	const { dbId = null } = useTicketItem({ id });
	return <code>{dbId}</code>;
};

export default TicketId;
