import { useContext } from '@wordpress/element';
import { Button } from '@blueprintjs/core/lib/esm';
import { DateTimeContext } from '../../context/DateTimeProvider';

const EditDatetimeButton = ({ position }) => {
	const { setIsOpen } = useContext(DateTimeContext);

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

export default EditDatetimeButton;
