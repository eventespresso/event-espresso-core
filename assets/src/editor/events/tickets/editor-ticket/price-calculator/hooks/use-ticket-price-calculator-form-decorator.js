/**
 * External imports
 */
import createDecorator from 'final-form-calculate';
import { useCallback } from '@wordpress/element';

/**
 * Internal imports
 */
import { amountsMatch } from '../utils/';

const DEFAULT_OBJECT = {};

/**
 * a form decorator used for capturing form data
 * so that the ticket price calculator can process changes
 *
 * @param {Function} setFormData
 * @return {Function}  decorator callback for react-final-form
 */
const useTicketPriceCalculatorFormDecorator = ( setFormData ) => {
	return useCallback( createDecorator(
		{
			field: /^(.*?(\b-amount\b))$/,
			updates: ( value, name, formData, prevData ) => {
				if ( ! amountsMatch( formData[ name ], prevData[ name ] ) ) {
					formData.updated = true;
					setFormData( formData );
				}
				return DEFAULT_OBJECT;
			},
		},
		{
			field: /^(.*?(\b-type\b))$/,
			updates: ( value, name, formData, prevData ) => {
				if ( formData[ name ] !== prevData[ name ] ) {
					formData.updated = true;
					setFormData( formData );
				}
				return DEFAULT_OBJECT;
			},
		},
		{
			field: 'ticketTotal',
			updates: ( value, name, formData, prevData ) => {
				if ( ! amountsMatch( formData[ name ], prevData[ name ] ) ) {
					formData.updated = true;
					setFormData( formData );
				}
				return DEFAULT_OBJECT;
			},
		},
	), [] );
};

export default useTicketPriceCalculatorFormDecorator;
