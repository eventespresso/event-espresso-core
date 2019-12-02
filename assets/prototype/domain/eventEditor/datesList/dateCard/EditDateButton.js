import { useContext } from '@wordpress/element';
import { Button } from '@blueprintjs/core/lib/esm';
import { DateTimeContext } from '../../../../infrastructure/services/contextProviders/DateTimeProvider';

const EditDateButton = () => {
	const { isOpen, setIsOpen } = useContext(DateTimeContext);
	const onClick = () => setIsOpen(!isOpen);

	return (
		<div
			style={{
				top: '.5rem',
				position: 'absolute',
				right: '.5rem',
				textAlign: 'right',
				zIndex: '1',
			}}
		>
			<Button icon={'edit'} onClick={onClick} minimal />
		</div>
	);
};

export default EditDateButton;
