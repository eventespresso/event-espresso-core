import useDeleteDatetimeMutation from '../../containers/mutations/useDeleteDateMutation';
import { Button } from '@blueprintjs/core/lib/esm';

const DeleteDateButton = ({ eventId, id }) => {
	const deleteDatetime = useDeleteDatetimeMutation({ eventId, id });

	return (
		<div
			style={{
				bottom: '.5rem',
				position: 'absolute',
				right: '.5rem',
				textAlign: 'right'
			}}
		>
			<Button
				icon={'trash'}
				onClick={() => {
					try {
						deleteDatetime();
					} catch (e) {
						console.log({ e });
					}
				}}
				minimal
			/>
		</div>
	);
};

export default DeleteDateButton;
