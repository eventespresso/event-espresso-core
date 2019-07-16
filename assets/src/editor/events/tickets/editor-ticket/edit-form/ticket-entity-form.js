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
import { useCallback, useMemo } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { useTicketPriceCalculators } from '../price-calculator';
import { withTicketPriceEntities, withPriceTypeEntities } from '../../../hocs';
import editEntityFormInputs from '../../../../helpers/forms/edit-entity-form-inputs';
import ticketEntityInputConfig from './ticket-entity-input-config';

const {
	FormSection,
	FormWrapper,
	FormSaveCancelButtons,
	FormInfo,
} = twoColumnAdminFormLayout;

const TicketEntityForm = ( {
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
	const { calculateTicketBasePrice } = useTicketPriceCalculators(
		priceTypeEntities
	);
	const recalculateBasePrice = useCallback( () => {
		calculateTicketBasePrice(
			ticketEntity.price.toNumber(),
			priceEntities
		);
	}, [ ticketEntity, priceEntities, calculateTicketBasePrice ] );
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
	const inputConfig = useMemo(
		() => ticketEntityInputConfig(
			ticketEntity,
			calculator,
			recalculateBasePrice
		),
		[
			ticketEntity,
			calculator,
			recalculateBasePrice,
		]
	);
	const formRows = useMemo(
		() => editEntityFormInputs(
			ticketEntity,
			inputConfig,
			`ee-ticket-${ ticketEntity.id }`,
			isEmpty( currentValues ) ? initialValues : currentValues,
			exclude
		),
		[
			ticketEntity,
			inputConfig,
			currentValues,
			initialValues,
			exclude,
		]
	);
	const formInfo = useMemo(
		() => (
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
		),
		[]
	);
	if ( Array.isArray( formRows ) ) {
		formRows.unshift( formInfo );
	}
	return useMemo(
		() => {
			// edit forms for existing objects must have initial values
			return ! ( ! newObject && isEmpty( initialValues ) ) &&
			isModelEntityOfModel( ticketEntity, 'ticket' ) ?
				(
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
		},
		[
			newObject,
			initialValues,
			ticketEntity,
			formRows,
			submitButton,
			cancelButton,
		]
	);
};

/**
 * Enhanced TicketEntityForm with FormHandler
 */
export default compose( [
	withTicketPriceEntities,
	withPriceTypeEntities,
	withFormHandler,
] )( TicketEntityForm );
