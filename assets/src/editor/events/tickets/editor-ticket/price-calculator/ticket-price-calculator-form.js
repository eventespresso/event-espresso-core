/**
 * External imports
 */
import { sortBy } from 'lodash';
import { Component } from '@wordpress/element';
import { Button, IconButton } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { sprintf, __ } from '@eventespresso/i18n';
import {
	InlineEditInput,
	withFormHandler,
	twoColumnAdminFormLayout,
	// validations,
} from '@eventespresso/components';
import { Money, SiteCurrency } from '@eventespresso/value-objects';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import {
	TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX,
} from './ticket-price-calculator-form-data-map';
import './style.css';

const {
	FormInput,
	InputLabel,
	FormColumn,
	FormRow,
	FormSection,
	FormWrapper,
	FormSaveCancelButtons,
	FormInfo,
} = twoColumnAdminFormLayout;

/**
 * TicketPriceCalculatorForm
 *
 * @constructor
 * @param {Object} ticket    JSON object defining the Ticket
 * @return {Object} rendered menu
 */
class TicketPriceCalculatorForm extends Component {
	constructor( props ) {
		super( props );
		this.toggleEditor = props.closeModal;
		this.state = {
			priceModifiers: [],
		};
	}

	buildPriceTypeOptions = ( priceTypes ) => {
		const priceTypeOptions = [];
		for ( let i = 0; i < priceTypes.length; i++ ) {
			const priceType = priceTypes[ i ];
			if ( isModelEntityOfModel( priceType, 'price_type' ) ) {
				priceTypeOptions.push( {
					value: priceType.id,
					label: priceType.name,
				} );
			}
		}
		return priceTypeOptions;
	};

	formHeader = () => (
		<FormRow key="header" htmlClass="ee-form-row-header">
			<FormColumn colSize="h">
				<h4>{ __( 'ID', 'event_espresso' ) }</h4>
			</FormColumn>
			<FormColumn colSize={ 2 }>
				<h4>{ __( 'Price Type', 'event_espresso' ) }</h4>
			</FormColumn>
			<FormColumn colSize="3h">
				<h4>{ __( 'Label', 'event_espresso' ) }</h4>
			</FormColumn>
			<FormColumn colSize="3h">
				<h4>{ __( 'Description', 'event_espresso' ) }</h4>
			</FormColumn>
			<FormColumn colSize="1h" htmlClass="text-sm-right">
				<h4>{ __( 'Amount', 'event_espresso' ) }</h4>
			</FormColumn>
			<FormColumn colSize={ 1 }>
			</FormColumn>
		</FormRow>
	);

	priceModifierRow = (
		ticketPrefix,
		values,
		price,
		priceTypeOptions,
		currencyFormatter,
	) => {
		const prefix = `${ ticketPrefix }-price-${ price.id }`;
		return (
			<FormRow key={ price.id } htmlClass="ee-form-row-price">
				<FormColumn colSize="h" htmlClass="text-sm-right">
					<span>{ parseInt( price.id ) || 0 }</span>
				</FormColumn>
				<FormColumn colSize={ 2 }>
					<InputLabel
						label={ __( 'Price Type', 'event_espresso' ) }
						htmlFor={ `${ prefix }-type` }
						htmlClass="ee-hidden-label"
					/>
					<FormInput
						key="type"
						type="select"
						name={ `${ prefix }-type` }
						value={
							values[ `${ prefix }-type` ]
						}
						options={ priceTypeOptions }
						htmlId={ `${ prefix }-type` }
						disabled={ price.prtId === 1 }
					/>
				</FormColumn>
				<FormColumn colSize="3h">
					<InputLabel
						label={ __( 'Label', 'event_espresso' ) }
						htmlFor={ `${ prefix }-name` }
						htmlClass="ee-hidden-label"
					/>
					<InlineEditInput
						key="name"
						type="text"
						name={ `${ prefix }-name` }
						htmlId={ `${ prefix }-name` }
						value={
							values[ `${ prefix }-name` ]
						}
						onChange={ ( text ) => {
							console.log( 'text', text );
						} }
					/>
				</FormColumn>
				<FormColumn colSize="3h">
					<InputLabel
						label={ __( 'Description', 'event_espresso' ) }
						htmlFor={ `${ prefix }-desc` }
						htmlClass="ee-hidden-label"
					/>
					<InlineEditInput
						key="desc"
						type="textarea"
						name={ `${ prefix }-desc` }
						htmlId={ `${ prefix }-desc` }
						value={
							values[ `${ prefix }-desc` ]
						}
						onChange={ ( text ) => {
							console.log( 'text', text );
						} }
					/>
				</FormColumn>
				<FormColumn
					colSize="1h"
					htmlClass="ee-ticket-price-calculator-price text-sm-right"
				>
					<InputLabel
						label={ __( 'Amount', 'event_espresso' ) }
						htmlFor={ `${ prefix }-amount` }
						htmlClass="ee-hidden-label"
					/>
					<InlineEditInput
						key="price"
						type="number"
						name={ `${ prefix }-amount` }
						htmlId={ `${ prefix }-amount` }
						value={
							values[ `${ prefix }-amount` ]
						}
						valueFormatter={ currencyFormatter }
						inputWidth="1h"
						step="0.01"
						onChange={ ( text ) => {
							console.log( 'text', text );
						} }
					/>
				</FormColumn>
				<FormColumn colSize={ 1 }>
					<IconButton icon="trash" />
				</FormColumn>
			</FormRow>
		);
	};

	formFooter = ( ticketPrefix, values, currencyFormatter ) => (
		<FormRow key="footer" htmlClass="ee-form-row-footer">
			<FormColumn colSize="7h" offset="h">
				<Button
					isDefault
					onClick={ this.addPriceModifier }
				>
					{ __( 'Add Price Modifier', 'event_espresso' ) }
				</Button>
			</FormColumn>
			<FormColumn
				colSize={ 1 }
				htmlClass="ee-ticket-price-calculator-total"
			>
				<InputLabel
					label={ __( 'Total', 'event_espresso' ) }
					htmlFor={ `${ ticketPrefix }-total` }
				/>
			</FormColumn>
			<FormColumn
				colSize={ 2 }
				htmlClass="ee-ticket-price-calculator-price text-sm-right"
			>
				<InlineEditInput
					key="total"
					type="number"
					name={ `${ ticketPrefix }-total` }
					htmlId={ `${ ticketPrefix }-total` }
					value={
						values[ `${ ticketPrefix }-price` ]
					}
					valueFormatter={ currencyFormatter }
					inputWidth="1"
					step="0.01"
					onChange={ ( text ) => {
						console.log( 'text', text );
					} }
				/>
			</FormColumn>
			<FormColumn colSize={ 1 }>
			</FormColumn>
		</FormRow>
	);

	addPriceModifier = async () => {
		let order = this.state.priceModifiers.length;
		order++;
		const priceModifier = await dispatch( 'eventespresso/core' )
			.createEntity(
				'price',
				{
					PRT_ID: 2,
					PRC_name: '',
					PRC_desc: '',
					PRC_amount: new Money( 0, SiteCurrency ),
					PRC_order: order,
				}
			);
		if ( isModelEntityOfModel( priceModifier, 'price' ) ) {
			this.setState( ( prevState ) => {
				const priceModifiers = prevState.priceModifiers;
				priceModifiers.push( priceModifier );
				return { priceModifiers: priceModifiers };
			} );
		}
	};

	formatMoney = ( value ) => sprintf( '$ %1$d', value );

	render() {
		this.counter++;
		const {
			ticket,
			priceTypes,
			submitButton,
			cancelButton,
			initialValues = {},
			currentValues = {},
		} = this.props;
		let { prices } = this.props;
		// console.log( '' );
		// console.log( 'TicketPriceCalculator.render()', this.props );
		// console.log( 'TicketPriceCalculator.render() ticket: ', ticket );
		// console.log( 'TicketPriceCalculator.render() prices: ', prices );
		// console.log( 'TicketPriceCalculator.render() priceTypes: ', priceTypes );
		// console.log( 'TicketPriceCalculator.render() initialValues', initialValues );
		// console.log( 'TicketPriceCalculator.render() currentValues', currentValues );
		const priceTypeOptions = this.buildPriceTypeOptions( priceTypes );
		// console.log( 'TicketPriceCalculator.render() priceTypeOptions: ', priceTypeOptions );

		let ticketPrefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
		ticketPrefix += '-ticket-' + ticket.id;
		const values = initialValues;

		const currencyFormatter = isModelEntityOfModel( ticket, 'ticket' ) ?
			ticket.price.formatter.formatMoney :
			this.formatMoney;

		const formRows = [];
		formRows.push( this.formHeader() );
		// formRows.push(
		// 	this.basePrice( ticketPrefix, values, currencyFormatter )
		// );
		const priceModifiers = this.state.priceModifiers;
		if ( Array.isArray( priceModifiers ) && priceModifiers.length ) {
			// console.log(
			// 	'TicketPriceCalculator.render() priceModifiers: ',
			// 	priceModifiers
			// );
			prices = prices.concat( priceModifiers );
			// console.log(
			// 	'TicketPriceCalculator.render() prices: ',
			// 	prices
			// );
		}
		const priceCount = prices.length;
		if ( priceCount ) {
			const sortedPrices = sortBy( prices, [ 'prtId', 'order' ] );
			for ( let i = 0; i < priceCount; i++ ) {
				const price = sortedPrices[ i ];
				if ( ! isModelEntityOfModel( price, 'price' ) ) {
					return;
				}
				formRows.push(
					this.priceModifierRow(
						ticketPrefix,
						values,
						price,
						priceTypeOptions,
						currencyFormatter
					)
				);
			}
		}

		formRows.push(
			this.formFooter( ticketPrefix, values, currencyFormatter )
		);
		// console.log( 'TicketPriceCalculator.render() formRows: ',
		// 	formRows
		// );

		return ticket && ticket.id ? (
			<FormWrapper>
				<FormSection
					htmlId={ `${ ticketPrefix }-form-section` }
					htmlClass="ee-ticket-price-calculator-form-section"
					children={ formRows }
				/>
				<FormSaveCancelButtons
					htmlClass={ `ee-ticket-editor-${ ticket.id }` }
					submitButton={ submitButton }
					cancelButton={ cancelButton }
					colSize={ 2 }
					offset={ 9 }
				/>
			</FormWrapper>
		) : null;
	}
}

/**
 * Enhanced TicketPriceCalculatorForm with FormHandler withDispatch
 */
export default withFormHandler( TicketPriceCalculatorForm );

// export default withFormHandler(
// 	withDispatch( ( dispatch, ownProps ) => {
// 		const { startSale } = dispatch( 'my-shop' );
// 		const { discountPercent } = ownProps;
//
// 		return {
// 			onClick() {
// 				startSale( discountPercent );
// 			},
// 		};
// 	} )( TicketPriceCalculatorForm )
// );

