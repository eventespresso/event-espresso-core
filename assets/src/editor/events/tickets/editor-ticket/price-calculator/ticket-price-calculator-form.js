/**
 * External imports
 */
import { isEmpty, filter, find, last, sortBy } from 'lodash';
import { Component, Fragment } from '@wordpress/element';
import { IconButton, Tooltip } from '@wordpress/components';
import { sprintf, __ } from '@eventespresso/i18n';
import {
	ResponsiveTable,
	twoColumnAdminFormLayout,
	withFormHandler,
} from '@eventespresso/components';
import { priceTypeModel, ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import {
	shortenCuid,
	TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX,
} from './ticket-price-calculator-form-data-map';
import { parseMoneyValue } from './ticket-price-calculator';
import './style.css';

const { MODEL_NAME: TICKET } = ticketModel;
const { BASE_PRICE_TYPES } = priceTypeModel;

const {
	FormInput,
	InputLabel,
	FormSection,
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

/**
 * TicketPriceCalculatorForm
 *
 * @constructor
 */
class TicketPriceCalculatorForm extends Component {
	constructor( props ) {
		super( props );
		this.toggleEditor = props.closeModal;
	}

	/**
	 * @function
	 * @param {Array} priceTypes
	 * @return {Array} price type options for use in select input
	 */
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

	/**
	 * @function
	 * @param {number|string} priceTypeId
	 * @return {Object} priceType
	 */
	getPriceType = ( priceTypeId ) => {
		priceTypeId = parseInt( priceTypeId );
		const priceType = find( this.props.priceTypes, [ 'id', priceTypeId ] );
		if ( isModelEntityOfModel( priceType, 'price_type' ) ) {
			return priceType;
		}
		return last( this.props.priceTypes );
	};

	/**
	 * @function
	 * @return {string} currency sign position css class
	 */
	signB4 = () => {
		return SiteCurrency.signB4 ? ' ee-sign-before' : ' ee-sign-after';
	};

	/**
	 * @function
	 * @return {string} currency sign char length css class
	 */
	signChars = () => {
		return SiteCurrency.sign.length > 1 ?
			' ee-curSign-' + SiteCurrency.sign.length :
			'';
	};

	/**
	 * @function
	 * @return {Object} $ sign
	 */
	currencySign = () => {
		let signClass = 'ee-currency-sign';
		signClass += this.signB4() + this.signChars();
		return (
			<div className={ signClass }>
				{ SiteCurrency.sign }
			</div>
		);
	};

	/**
	 * @function
	 * @return {Object} % sign
	 */
	percentSign = () => {
		let signClass = 'ee-percent-sign';
		signClass += this.signB4() + this.signChars();
		return (
			<div className={ signClass }>
				{ __( '%', 'event_espresso' ) }
			</div>
		);
	};

	/**
	 * @function
	 * @param {Object} priceType
	 * @return {Object} % or $ sign
	 */
	modifierSign = ( priceType ) => {
		return priceType && priceType.isPercent ?
			this.percentSign() :
			this.currencySign();
	};

	/**
	 * @function
	 * @param {Object} priceType
	 * @return {string} input field css class
	 */
	amountClass = ( priceType = null ) => {
		return priceType && priceType.isPercent ?
			`ee-percent-field${ this.signB4() }${ this.signChars() }` :
			`ee-money-field${ this.signB4() }${ this.signChars() }`;
	};

	/**
	 * @function
	 * @return {Array} form header data
	 */
	formHeader = () => {
		return [
			{
				type: 'row',
				class: 'ee-ticket-price-calculator-header-row',
				value: '',
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-id ee-number-column',
				value: __( 'ID', 'event_espresso' ),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-type',
				value: __( 'Price Type', 'event_espresso' ),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-name',
				value: __( 'Label', 'event_espresso' ),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-desc',
				value: __( 'Description', 'event_espresso' ),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-amount ' +
					'ee-number-column ' + this.signB4(),
				value: __( 'Amount', 'event_espresso' ),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-actions',
				value: __( 'Actions', 'event_espresso' ),
			},
		];
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @param {string} ticketPrefix
	 * @param {Array} values
	 * @param {Object} price
	 * @param {Array} priceTypeOptions
	 * @return {Object} rendered price modifier form row
	 */
	priceModifierRow = (
		ticket,
		ticketPrefix,
		values,
		price,
		priceTypeOptions
	) => {
		const priceId = shortenCuid( price.id );
		const prefix = `${ ticketPrefix }-price-${ priceId }`;
		const priceTypeId = parseInt( values[ `${ prefix }-type` ] ) || 0;
		const priceType = this.getPriceType( priceTypeId );
		return [
			{
				type: 'row',
				class: 'ee-ticket-price-calculator-price-row',
				value: '',
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-price-id ee-number-column',
				value: (
					<FormInput
						key="id"
						type="text"
						name={ `${ prefix }-id` }
						htmlId={ `${ prefix }-id` }
						value={ values[ `${ prefix }-id` ] }
						disabled
					/>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-price-type',
				value: (
					<Fragment>
						<InputLabel
							label={ __( 'Price Type', 'event_espresso' ) }
							htmlFor={ `${ prefix }-type` }
							htmlClass="ee-hidden-label"
						/>
						<FormInput
							key="type"
							type="select"
							name={ `${ prefix }-type` }
							value={ priceTypeId }
							options={ priceTypeOptions }
							htmlId={ `${ prefix }-type` }
							disabled={
								price.prtId === BASE_PRICE_TYPES.BASE_PRICE
							}
							changeListener={
								( value ) => {
									price.prtId = parseInt( value );
									const newPriceType = this.getPriceType(
										value
									);
									price.order = newPriceType !== null ?
										newPriceType.order :
										priceType.order;
								}
							}
						/>
					</Fragment>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-price-name',
				value: (
					<Fragment>
						<InputLabel
							label={ __( 'Label', 'event_espresso' ) }
							htmlFor={ `${ prefix }-name` }
							htmlClass="ee-hidden-label"
						/>
						<FormInput
							key="name"
							type="text"
							name={ `${ prefix }-name` }
							htmlId={ `${ prefix }-name` }
							value={ values[ `${ prefix }-name` ] || '' }
							changeListener={ ( value ) => price.name = value }
						/>
					</Fragment>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-price-desc',
				value: (
					<Fragment>
						<InputLabel
							label={ __( 'Description', 'event_espresso' ) }
							htmlFor={ `${ prefix }-desc` }
							htmlClass="ee-hidden-label"
						/>
						<FormInput
							key="desc"
							type="textarea"
							name={ `${ prefix }-desc` }
							htmlId={ `${ prefix }-desc` }
							value={ values[ `${ prefix }-desc` ] || '' }
							changeListener={ ( value ) => price.desc = value }
						/>
					</Fragment>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-price-amount ee-number-column',
				value: (
					<Fragment>
						<InputLabel
							label={ __( 'Amount', 'event_espresso' ) }
							htmlFor={ `${ prefix }-amount` }
							htmlClass="ee-hidden-label"
						/>
						{ this.modifierSign( priceType ) }
						<FormInput
							key="price"
							type="text"
							name={ `${ prefix }-amount` }
							htmlId={ `${ prefix }-amount` }
							htmlClass={ this.amountClass( priceType ) }
							value={ values[ `${ prefix }-amount` ] || 0 }
							changeListener={
								( value ) => price.amount = new Money(
									parseMoneyValue( value ),
									SiteCurrency
								)
							}
							format={ ( value ) => {
								return ticket.price.formatter.formatNumber(
									parseMoneyValue( value )
								);
							} }
							formatOnBlur
						/>
					</Fragment>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-price-actions',
				value: (

					<Tooltip
						text={ __( 'delete price modifier', 'event_espresso' ) }
					>
						<IconButton
							icon="trash"
							onClick={
								() => this.props.trashPriceModifier( price )
							}
						/>
					</Tooltip>
				),
			},
		];
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @param {string} ticketPrefix
	 * @param {Array} values
	 * @param {Array} priceTypeOptions
	 * @param {Function} addPriceModifier
	 * @return {Object} rendered price modifier form row
	 */
	addPriceModifierRow = (
		ticket,
		ticketPrefix,
		values,
		priceTypeOptions,
		addPriceModifier
	) => {
		const priceId = 'new';
		const prefix = `${ ticketPrefix }-price-${ priceId }`;
		const priceTypeId = parseInt( values[ `${ prefix }-type` ] ) || 0;
		const priceType = this.getPriceType( priceTypeId );
		return [
			{
				type: 'row',
				class: 'ee-ticket-price-calculator-add-price-row',
				value: '',
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-add-price-id ee-number-column',
				value: __( 'add new', 'event_espresso' ),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-add-price-type',
				value: (
					<Fragment>
						<InputLabel
							label={ __( 'Price Type', 'event_espresso' ) }
							htmlFor={ `${ prefix }-type` }
							htmlClass="ee-hidden-label"
						/>
						<FormInput
							key="type"
							type="select"
							name={ `${ prefix }-type` }
							value={ values[ `${ prefix }-type` ] || priceTypeId }
							options={ priceTypeOptions }
							htmlId={ `${ prefix }-type` }
						/>
					</Fragment>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-add-price-name',
				value: (
					<Fragment>
						<InputLabel
							label={ __( 'Label', 'event_espresso' ) }
							htmlFor={ `${ prefix }-name` }
							htmlClass="ee-hidden-label"
						/>
						<FormInput
							key="name"
							type="text"
							name={ `${ prefix }-name` }
							htmlId={ `${ prefix }-name` }
							value={ values[ `${ prefix }-name` ] || '' }
						/>
					</Fragment>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-add-price-desc',
				value: (
					<Fragment>
						<InputLabel
							label={ __( 'Description', 'event_espresso' ) }
							htmlFor={ `${ prefix }-desc` }
							htmlClass="ee-hidden-label"
						/>
						<FormInput
							key="desc"
							type="textarea"
							name={ `${ prefix }-desc` }
							htmlId={ `${ prefix }-desc` }
							value={ values[ `${ prefix }-desc` ] || '' }
						/>
					</Fragment>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-add-price-amount ee-number-column',
				value: (
					<Fragment>
						<InputLabel
							label={ __( 'Amount', 'event_espresso' ) }
							htmlFor={ `${ prefix }-amount` }
							htmlClass="ee-hidden-label"
						/>
						{ this.modifierSign( priceType ) }
						<FormInput
							key="price"
							type="number"
							name={ `${ prefix }-amount` }
							htmlId={ `${ prefix }-amount` }
							htmlClass={ this.amountClass( priceType ) }
							value={ values[ `${ prefix }-amount` ] || 0 }
							format={ ticket.price.formatter.formatNumber }
							formatOnBlur
							step="0.01"
						/>
					</Fragment>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-add-price-actions',
				value: (
					<Tooltip
						text={ __( 'add price modifier', 'event_espresso' ) }
					>
						<IconButton
							icon="plus-alt"
							onClick={
								() => addPriceModifier(
									ticket,
									{
										type: values[ `${ prefix }-type` ],
										name: values[ `${ prefix }-name` ],
										desc: values[ `${ prefix }-desc` ],
										amount: values[ `${ prefix }-amount` ],
										order: '',
									}
								)
							}
						/>
					</Tooltip>
				),
			},
		];
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @param {string} ticketPrefix
	 * @param {Array} values
	 * @return {Object} rendered form footer
	 */
	ticketTotalRow = ( ticket, ticketPrefix, values ) => {
		return [
			{
				type: 'row',
				class: 'ee-ticket-price-calculator-total-row',
				value: '',
			},
			{
				type: 'cell',
				class: '',
				value: '',
			},
			{
				type: 'cell',
				class: '',
				value: '',
			},
			{
				type: 'cell',
				class: '',
				value: '',
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-total-label' +
					' ee-number-column',
				value: (
					<Fragment>
						<InputLabel
							label={ __( 'Total', 'event_espresso' ) }
							htmlFor={ `${ ticketPrefix }-total` }
						/>
					</Fragment>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-total ee-number-column',
				value: (
					<Fragment>
						{ this.currencySign() }
						<FormInput
							key="total"
							type="text"
							name="ticketTotal"
							htmlId="ticketTotal"
							htmlClass={ this.amountClass() }
							value={ values.ticketTotal }
							changeListener={
								( value ) => ticket.price = new Money(
									parseMoneyValue( value ),
									SiteCurrency
								)
							}
							format={ ( value ) => {
								return ticket.price.formatter.formatNumber(
									parseMoneyValue( value )
								);
							} }
							formatOnBlur
						/>
					</Fragment>
				),
			},
			{
				type: 'cell',
				class: '',
				value: '',
			},
		];
	};

	/**
	 * @function
	 * @param {string} value
	 * @return {string} formatted money value
	 */
	formatMoney = ( value ) => sprintf( '$ %1$d', value );

	render() {
		const {
			ticket,
			prices,
			priceTypes,
			addPriceModifier,
			submitButton,
			cancelButton,
			initialValues = {},
			currentValues = {},
		} = this.props;

		if ( ! isModelEntityOfModel( ticket, TICKET ) || isEmpty( priceTypes ) ) {
			return null;
		}
		const allPriceTypeOptions = this.buildPriceTypeOptions( priceTypes );
		const priceTypeOptions = filter(
			allPriceTypeOptions,
			( priceType ) => {
				return priceType.value !== BASE_PRICE_TYPES.BASE_PRICE;
			}
		);
		let ticketPrefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
		ticketPrefix += '-ticket-' + ticket.id;
		const values = isEmpty( currentValues ) ?
			initialValues :
			currentValues;

		const formRows = [];
		const priceCount = prices.length;
		if ( priceCount ) {
			const sortedPrices = sortBy( prices, [ 'order', 'name' ] );
			for ( let i = 0; i < priceCount; i++ ) {
				const price = sortedPrices[ i ];
				if ( ! isModelEntityOfModel( price, 'price' ) ) {
					return;
				}
				// we don't want "Base Price" to be an option for
				// price modifiers because THERE CAN ONLY BE ONE!!!
				const options = price.prtId === BASE_PRICE_TYPES.BASE_PRICE ?
					allPriceTypeOptions :
					priceTypeOptions;
				formRows.push(
					this.priceModifierRow(
						ticket,
						ticketPrefix,
						values,
						price,
						options
					)
				);
			}
		}
		formRows.push(
			this.addPriceModifierRow(
				ticket,
				ticketPrefix,
				values,
				priceTypeOptions,
				addPriceModifier
			)
		);
		return ticket && ticket.id ? (
			<FormWrapper>
				<FormSection
					htmlId={ `${ ticketPrefix }-form-section` }
					htmlClass="ee-ticket-price-calculator-form-section"
				>
					<ResponsiveTable
						columns={ this.formHeader() }
						rowData={ formRows }
						footerData={
							this.ticketTotalRow(
								ticket,
								ticketPrefix,
								values
							)
						}
						metaData={ {
							tableId: `${ ticketPrefix }-price-calculator`,
							tableCaption: __(
								'Ticket Price Modifiers',
								'event_espresso'
							),
						} }
						classes={ { tableClass: 'ee-ticket-price-calculator' } }
					/>
					<FormInput
						type="hidden"
						key="ticketID"
						name="ticketID"
						htmlId="ticketID"
						value={ values.ticketID }
					/>
					<FormInput
						type="hidden"
						key="priceIDs"
						name="priceIDs"
						htmlId="priceIDs"
						value={ values.priceIDs }
					/>
					<FormInput
						type="hidden"
						key="priceTypes"
						name="priceTypes"
						htmlId="priceTypes"
						value={ values.priceTypes }
					/>
				</FormSection>
				<FormSaveCancelButtons
					htmlClass={ 'ee-ticket-price-calculator-buttons' }
					submitButton={ submitButton }
					cancelButton={ cancelButton }
				/>
			</FormWrapper>
		) : null;
	}
}

/**
 * Enhanced TicketPriceCalculatorForm with FormHandler
 */
export default withFormHandler( TicketPriceCalculatorForm );
