import { useContext } from '@wordpress/element';
import { Button } from '@blueprintjs/core/lib/esm';
import { TicketContext } from '../../context/TicketProvider';

const EditTicketButton = ({ position }) => {
	const { setIsOpen } = useContext(TicketContext);

	const style = {
		position: 'absolute',
		right: '.5rem',
		textAlign: 'right',
		zIndex: '1',
		...(position === 'top' && {
			top: '.5rem',
		}),
	};

	return (
		<div style={style}>
			<Button icon={'edit'} onClick={setIsOpen} minimal />
		</div>
	);
};

export default EditTicketButton;
