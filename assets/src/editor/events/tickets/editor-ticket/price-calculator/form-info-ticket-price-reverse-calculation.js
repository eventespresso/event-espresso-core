/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import PropTypes from 'prop-types';

const { FormInfo } = twoColumnAdminFormLayout;

const FormInfoTicketPriceReverseCalculation = ( {
	reverseCalculate,
} ) => useMemo( () => (
	<FormInfo
		formInfo={
			reverseCalculate ?
				__(
					'ticket base price is being calculated' +
					' by reversing the price modifiers' +
					' applied to the ticket total - change' +
					' the calculation direction by clicking' +
					' on the arrow button to the right of the' +
					' ticket total field',
					'event_espresso'
				) :
				__(
					'ticket total is being calculated by ' +
					' applying price modifiers to base price' +
					' - change the calculation direction by' +
					' clicking on the arrow button to the' +
					' right of the ticket total field',
					'event_espresso'
				)
		}
		dashicon={ 'info' }
		dismissable={ false }
		colSize={ 11 }
		offset={ 1 }
	/>
), [ reverseCalculate ] );

FormInfoTicketPriceReverseCalculation.propTypes = {
	reverseCalculate: PropTypes.bool,
};

FormInfoTicketPriceReverseCalculation.defaultProps = {
	reverseCalculate: true,
};

export default FormInfoTicketPriceReverseCalculation;
