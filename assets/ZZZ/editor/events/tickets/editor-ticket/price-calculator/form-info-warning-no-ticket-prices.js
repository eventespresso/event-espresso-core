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
import PropTypes from 'prop-types';

const { FormInfo } = twoColumnAdminFormLayout;

const FormInfoWarningNoTicketPrices = ( {
	priceCount,
	inProgress,
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

FormInfoWarningNoTicketPrices.propTypes = {
	priceCount: PropTypes.number.isRequired,
	inProgress: PropTypes.bool,
};

FormInfoWarningNoTicketPrices.defaultProps = {
	inProgress: false,
};

export default FormInfoWarningNoTicketPrices;
