import { useContext } from 'react';
import { Button } from '@blueprintjs/core/lib/esm';
import { DateTimeContext } from '../../context/DateTimeProvider';

const EditDateButton = ({ position }) => {
	const { editors, editorState } = useContext(DateTimeContext);
	const onClick = () => editorState.openEditor(editors.editForm);

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
