/**
 * External imports
 */
import {
	withFormHandler,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { compose } from '@wordpress/compose';
import { isEmpty } from 'lodash';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ticketEntityFormInputs } from '../';
import { useTicketPriceCalculators } from '../price-calculator';
import { withTicketPrices, withPriceTypes } from '../../data';

const getFormRows = (
	ticket,
	calculator,
	exclude,
	currentValues,
	FormInput,
	recalculateBasePrice
) => ticketEntityFormInputs(
	ticket,
	calculator,
	exclude,
	currentValues,
	FormInput,
	recalculateBasePrice,
);

const EditTicketForm = ( {
	ticket,
	prices = [],
	priceTypes = [],
	calculator,
	submitButton,
	cancelButton,
	currentValues = {},
	initialValues = {},
	newObject = false,
} ) => {
	const { calculateTicketBasePrice } = useTicketPriceCalculators( priceTypes );
	// hooks must be at the top of the function and never change order.
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const recalculateBasePrice = useCallback( () => {
		calculateTicketBasePrice( ticket.price.toNumber(), prices );
	}, [ ticket, prices, calculateTicketBasePrice ] );
	// edit forms for existing objects must have initial values
	if (
		( ! newObject && isEmpty( initialValues ) ) ||
		isEmpty( currentValues )
	) {
		return null;
	}
	const {
		FormInput,
		FormSection,
		FormWrapper,
		FormSaveCancelButtons,
		FormInfo,
	} = twoColumnAdminFormLayout;

	// entity properties we don't want to be editable
	const exclude = [
		'TKT_ID',
		'sold',
		'reserved',
		'order',
		'parent',
		'deleted',
		'wpUser',
		'status',
	];
	const formRows = getFormRows(
		ticket,
		calculator,
		exclude,
		currentValues,
		FormInput,
		recalculateBasePrice,
	);
	formRows.unshift(
		<FormInfo
			key="formInfo"
			formInfo={
				__(
					'all fields marked with an asterisk are required',
					'event_espresso'
				)
			}
			dismissable={ false }
		/>
	);

	return ticket && ticket.id ? (
		<FormWrapper>
			<FormSection
				htmlId={ `ee-ticket-editor-${ ticket.id }-form-section` }
				children={ formRows }
			/>
			<FormSaveCancelButtons
				htmlClass={ `ee-ticket-editor-${ ticket.id }` }
				submitButton={ submitButton }
				cancelButton={ cancelButton }
			/>
		</FormWrapper>
	) : null;
};

/**
 * Enhanced EditTicketForm with FormHandler
 */
export default compose( [
	withTicketPrices,
	withPriceTypes,
	withFormHandler,
] )( EditTicketForm );
