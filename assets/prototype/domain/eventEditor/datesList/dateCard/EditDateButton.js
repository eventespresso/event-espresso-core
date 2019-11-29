import { useContext } from '@wordpress/element';
import { Button } from '@blueprintjs/core/lib/esm';
import { DateTimeContext } from '../../../../infrastructure/services/contextProviders/DateTimeProvider';

const EditDateButton = ({ position }) => {
	const { isOpen, setIsOpen } = useContext(DateTimeContext);
	const onClick = () => setIsOpen(!isOpen);

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
			<Button icon={'edit'} onClick={onClick} minimal />
		</div>
	);
};

export default EditDateButton;
