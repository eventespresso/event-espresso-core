/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { Dashicon } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';
import { twoColumnAdminFormLayout } from '@eventespresso/components';

const { FormInfo } = twoColumnAdminFormLayout;

const FormInfoWarningNoTicketPrices = ( { priceCount } ) => useMemo( () => (
	priceCount < 1 ? (
		<FormInfo
			formInfo={
				__(
					'No ticket prices have been set! A base price' +
					' is required at the very minimum. Please' +
					' provide a "Label" and "Amount" and then' +
					' click the %%var%% button in the "Actions"' +
					' column to add the base price.',
					'event_espresso'
				)
			}
			formInfoVars={ [
				<Dashicon icon="plus-alt" key={ 0 } />,
			] }
			dashicon={ 'warning' }
			dismissable={ false }
			colSize={ 11 }
			offset={ 1 }
		/>
	) : null
), [] );

export default FormInfoWarningNoTicketPrices;
