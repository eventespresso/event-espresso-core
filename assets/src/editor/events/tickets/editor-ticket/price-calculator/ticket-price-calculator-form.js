/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { useEffect } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import {
	ResponsiveTable,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';

/**
 * Internal dependencies
 */
import {
	TicketPriceCalculatorFormHiddenInputs,
	FormInfoTicketPriceReverseCalculation,
	FormInfoWarningNoTicketPrices,
} from './';
import {
	useAddTicketBasePrice,
	useTicketPriceCalculatorFormHeader,
	useTicketPriceCalculatorFormRows,
	useTicketPriceCalculatorFormTotalRow,
} from './hooks';
import { TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX } from './constants';
import './style.css';

const { FormSection, FormWrapper } = twoColumnAdminFormLayout;

/**
 * TicketPriceCalculatorForm
 *
 * @function
 * @param {BaseEntity} ticketEntity ticket model object
 * @param {BaseEntity[]} priceEntities array of prices
 * @param {Function} updateField
 * @param {Object} initialValues
 * @param {Object} currentValues
 * @return {Object} rendered form
 */
const TicketPriceCalculatorForm = ( {
	ticketEntity,
	priceEntities,
	updateField,
	initialValues = {},
	currentValues = {},
} ) => {
	const {
		addTicketBasePrice,
		inProgress,
	} = useAddTicketBasePrice( ticketEntity );
	useEffect( () => {
		if ( isEmpty( priceEntities ) && ! inProgress ) {
			addTicketBasePrice();
		}
	}, [ priceEntities ] );
	let ticketPrefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
	ticketPrefix += '-ticket-' + ticketEntity.id;
	const values = isEmpty( currentValues ) ? initialValues : currentValues;
	const columnHeaders = useTicketPriceCalculatorFormHeader();
	const totalRow = useTicketPriceCalculatorFormTotalRow(
		ticketEntity,
		ticketPrefix,
		values,
		updateField
	);
	const formRows = useTicketPriceCalculatorFormRows(
		ticketEntity,
		ticketPrefix,
		priceEntities,
		values
	);
	return (
		<FormWrapper>
			<FormSection
				htmlId={ `${ ticketPrefix }-form-section` }
				htmlClass="ee-ticket-price-calculator-form-section"
			>
				<FormInfoWarningNoTicketPrices
					priceCount={ priceEntities.length }
					inProgress={ inProgress }
				/>
				<ResponsiveTable
					columns={ columnHeaders }
					rowData={ formRows }
					footerData={ totalRow }
					metaData={ {
						tableId: ticketPrefix,
						tableCaption: __(
							'Ticket Price Modifiers',
							'event_espresso'
						),
					} }
					classes={ { tableClass: 'ee-ticket-price-calculator' } }
				/>
				<TicketPriceCalculatorFormHiddenInputs values={ values } />
			</FormSection>
			<FormSection htmlClass="ee-ticket-price-calculator-form-info" >
				<FormInfoTicketPriceReverseCalculation
					reverseCalculate={ ticketEntity.reverseCalculate }
				/>
			</FormSection>
		</FormWrapper>
	);
};

export default ifValidTicketEntity( TicketPriceCalculatorForm );
