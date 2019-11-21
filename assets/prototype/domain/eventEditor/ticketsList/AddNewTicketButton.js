import { Button } from '@blueprintjs/core/lib/esm';
import { AppToaster } from '../EventEditor';

const btnStyle = {
	margin: '0 0 0 1rem',
};

const AddNewTicketButton = () => (
	<Button
		icon={ 'widget-button' }
		text={ 'Add New Ticket' }
		onClick={ () => AppToaster.show( {
			intent: 'success',
			message: 'New Ticket Created'
		} ) }
		style={ btnStyle }
		large
	/>
);

export default AddNewTicketButton;
