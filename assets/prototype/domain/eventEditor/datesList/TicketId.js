import useTicketItem from '../containers/queries/useTicketItem';

const TicketId = ({ id }) => {
	const { ticketId = null } = useTicketItem({ id });
	return <code>{ticketId}</code>;
};

export default TicketId;
