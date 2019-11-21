import { Button } from '@blueprintjs/core/lib/esm';
import { AppToaster } from '../EventEditor';

const btnStyle = {
	margin: '0 0 0 1rem',
};

const AddNewDateButton = () => (
	<Button
		icon={ 'calendar' }
		text={ 'Add New Date' }
		onClick={ () => AppToaster.show( {
			intent: 'success',
			message: 'Date Created'
		} ) }
		style={ btnStyle }
		large
	/>
);

export default AddNewDateButton;
