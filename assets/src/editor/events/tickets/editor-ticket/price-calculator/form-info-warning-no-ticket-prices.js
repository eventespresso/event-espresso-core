/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { Dashicon } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';
import {
	LoadingNotice,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';

const { FormInfo } = twoColumnAdminFormLayout;

const FormInfoWarningNoTicketPrices = ( {
	priceCount,
	inProgress = false,
} ) => useMemo( () => priceCount < 1 ? (
	<>
		<FormInfo
			formInfo={
				__(
					'No ticket prices have been set! A base price is' +
					' required at the very minimum. Please wait while' +
					' a new base price is generated for you.',
					'event_espresso'
				)
			}
			formInfoVars={ [ <Dashicon icon="plus-alt" key={ 0 } /> ] }
			dashicon={ 'warning' }
			dismissable={ false }
			colSize={ 11 }
			offset={ 1 }
		/>
		<LoadingNotice loading={ inProgress } />
	</>
) : null, [ priceCount, inProgress ] );

export default FormInfoWarningNoTicketPrices;
