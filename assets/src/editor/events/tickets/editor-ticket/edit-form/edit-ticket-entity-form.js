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
import { withTicketPriceEntities, withPriceTypeEntities } from '../../data';

const getFormRows = (
	ticketEntity,
	calculator,
	exclude,
	currentValues,
	FormInput,
	recalculateBasePrice
) => ticketEntityFormInputs(
	ticketEntity,
	calculator,
	exclude,
	currentValues,
	FormInput,
	recalculateBasePrice,
);

const EditTicketEntityForm = ( {
	ticketEntity,
	priceEntities = [],
	priceTypeEntities = [],
	calculator,
	submitButton,
	cancelButton,
	currentValues = {},
	initialValues = {},
	newObject = false,
} ) => {
	const { calculateTicketBasePrice } = useTicketPriceCalculators( priceTypeEntities );
	// hooks must be at the top of the function and never change order.
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const recalculateBasePrice = useCallback( () => {
		calculateTicketBasePrice( ticketEntity.price.toNumber(), priceEntities );
	}, [ ticketEntity, priceEntities, calculateTicketBasePrice ] );
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
		ticketEntity,
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

	return ticketEntity && ticketEntity.id ? (
		<FormWrapper>
			<FormSection
				htmlId={ `ee-ticket-editor-${ ticketEntity.id }-form-section` }
				children={ formRows }
			/>
			<FormSaveCancelButtons
				htmlClass={ `ee-ticket-editor-${ ticketEntity.id }` }
				submitButton={ submitButton }
				cancelButton={ cancelButton }
			/>
		</FormWrapper>
	) : null;
};

/**
 * Enhanced EditTicketEntityForm with FormHandler
 */
export default compose( [
	withTicketPriceEntities,
	withPriceTypeEntities,
	withFormHandler,
] )( EditTicketEntityForm );
