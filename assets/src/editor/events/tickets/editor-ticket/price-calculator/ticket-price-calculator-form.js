/**
 * External imports
 */
import { isEmpty, filter, find, last, sortBy, first } from 'lodash';
import { Component, Fragment } from '@wordpress/element';
import { Dashicon, IconButton, Tooltip } from '@wordpress/components';
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
import { TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX } from './constants';
import { parseMoneyValue } from './use-ticket-price-calculator-form-decorator';
import { shortenCuid } from './ticket-price-calculator-form-data-map';
import './style.css';

const { MODEL_NAME: TICKET } = ticketModel;
const { BASE_PRICE_TYPES } = priceTypeModel;

const {
	FormInfo,
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
		const priceType = find( this.priceTypes, [ 'id', priceTypeId ] );
		if ( isModelEntityOfModel( priceType, 'price_type' ) ) {
			return priceType;
		}
		return last( this.priceTypes );
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
	 * @return {number|string} priceType ID
	 */
	getDefaultPriceTypeId = () => {
		return first(
			filter(
				this.priceTypes,
				( priceType ) => priceType.id !== 1
			)
		).id;
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @param {string} ticketPrefix
	 * @param {Array} values
	 * @param {Object} price
	 * @param {Array} priceTypeOptions
	 * @param {boolean} lastRow
	 * @return {Object} rendered price modifier form row
	 */
	priceModifierRow = (
		ticket,
		ticketPrefix,
		values,
		price,
		priceTypeOptions,
		lastRow,
	) => {
		const priceId = shortenCuid( price.id );
		const prefix = `${ ticketPrefix }-price-${ priceId }`;
		const priceTypeId = parseInt( values[ `${ prefix }-type` ], 10 ) || 0;
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
							changeListener={
								( value ) => {
									price.prtId = value ?
										parseInt( value, 10 ) :
										this.getDefaultPriceTypeId();
								}
							}
							disabled={
								price.prtId === BASE_PRICE_TYPES.BASE_PRICE
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
							value={
								price.amount.formatter.formatNumber(
									parseMoneyValue(
										values[ `${ prefix }-amount` ] || 0
									)
								)
							}
							changeListener={
								( value, previous ) => {
									if (
										parseFloat( value ) !== parseFloat( previous )
									) {
										price.amount = new Money(
											parseMoneyValue( value ),
											SiteCurrency
										);
									}
								}
							}
							disabled={
								price.prtId === BASE_PRICE_TYPES.BASE_PRICE &&
								values.reverseCalculate === true
							}
							format={ ( value ) => {
								return price.amount.formatter.formatNumber(
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
				value: this.getModifierActionButtons(
					priceType,
					price,
					ticket,
					prefix,
					values,
					lastRow
				),
			},
		];
	};

	/**
	 * @function
	 * @param {Object} priceType
	 * @param {Object} price
	 * @param {Object} ticket
	 * @param {string} prefix
	 * @param {Array} values
	 * @param {boolean} lastRow
	 * @return {Object} rendered price modifier form row
	 */
	getModifierActionButtons = (
		priceType,
		price,
		ticket,
		prefix,
		values,
		lastRow
	) => {
		const addModifier = lastRow ?
			<Tooltip
				position={ 'top left' }
				text={ __(
					'click to add price modifier',
					'event_espresso'
				) }
			>
				<IconButton
					aria-label={ __(
						'click to add price modifier',
						'event_espresso'
					) }
					icon="plus-alt"
					onClick={
						() => this.addPriceModifier(
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
					className={ 'ee-add-price-modifier-btn' }
				/>
			</Tooltip> :
			'';
		const deleteModifier = priceType.pbtId !== BASE_PRICE_TYPES.BASE_PRICE ?
			<Tooltip
				position={ 'top left' }
				text={ __( 'click to delete price modifier', 'event_espresso' ) }
			>
				<IconButton
					aria-label={ __(
						'click to delete price modifier',
						'event_espresso'
					) }
					icon="trash"
					onClick={
						() => this.trashPriceModifier( price, ticket )
					}
				/>
			</Tooltip> :
			'';
		return <Fragment>
			{ deleteModifier }
			{ addModifier }
		</Fragment>;
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @param {string} ticketPrefix
	 * @param {Array} values
	 * @param {Function} setReverseCalculate
	 * @return {Object} rendered form footer
	 */
	ticketTotalRow = ( ticket, ticketPrefix, values, setReverseCalculate ) => {
		const calcDirIcon = values.reverseCalculate ? 'up' : 'down';
		const calcDirText = values.reverseCalculate ?
			__( 'reverse calculate base price from total', 'event_espresso' ) :
			__( 'calculate total from base price', 'event_espresso' );
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
					<InputLabel
						label={ __( 'Total', 'event_espresso' ) }
						htmlFor={ `${ ticketPrefix }-total` }
					/>
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
							value={
								ticket.price.formatter.formatNumber(
									parseMoneyValue( values.ticketTotal )
								)
							}
							changeListener={
								( value, previous ) => {
									if (
										parseFloat( value ) !== parseFloat( previous )
									) {
										ticket.price = new Money(
											parseMoneyValue( value ),
											SiteCurrency
										);
									}
								}
							}
							disabled={ values.reverseCalculate === false }
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
				class: 'ee-ticket-price-calculator-total-actions',
				value: (
					<Tooltip text={ calcDirText } position={ 'top left' } >
						<IconButton
							aria-label={ calcDirText }
							icon={ `arrow-${ calcDirIcon }-alt2` }
							onClick={ () => {
								setReverseCalculate( ! values.reverseCalculate );
							} }
						/>
					</Tooltip>
				),
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
			trashPriceModifier,
			setReverseCalculate,
			submitButton,
			cancelButton,
			initialValues = {},
			currentValues = {},
		} = this.props;
		this.setTimeout = setTimeout;
		this.clearTimeout = clearTimeout;
		this.addPriceModifier = addPriceModifier;
		this.trashPriceModifier = trashPriceModifier;
		if (
			! isModelEntityOfModel( ticket, TICKET ) ||
			isEmpty( priceTypes )
		) {
			return null;
		}
		this.priceTypes = priceTypes;
		const values = isEmpty( currentValues ) ?
			initialValues :
			currentValues;
		// console.log( ' > values: ', values );
		const allPriceTypeOptions = this.buildPriceTypeOptions(
			this.priceTypes
		);
		let ticketPrefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
		ticketPrefix += '-ticket-' + ticket.id;

		let warnings = null;
		const formRows = [];
		const priceCount = prices.length;
		if ( priceCount > 0 ) {
			const priceTypeOptions = filter(
				allPriceTypeOptions,
				( priceType ) => {
					return priceType.value !== BASE_PRICE_TYPES.BASE_PRICE;
				}
			);
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
						options,
						( i + 1 ) === priceCount
					)
				);
			}
		} else {
			warnings = (
				<FormInfo
					formInfo={
						__(
							'No ticket prices have been set! A base price' +
							' is required at the very minimum. Please' +
							' provide a "Label" and "Amount" and then' +
							' click the %%var%% button in the "Actions"' +
							' column to add the base price.',
							'event_espresso'
						)
					}
					formInfoVars={ [
						<Dashicon icon="plus-alt" key={ 0 } />,
					] }
					dashicon={ 'warning' }
					dismissable={ false }
					colSize={ 11 }
					offset={ 1 }
				/>
			);
		}
		return ticket && ticket.id ? (
			<FormWrapper>
				<FormSection
					htmlId={ `${ ticketPrefix }-form-section` }
					htmlClass="ee-ticket-price-calculator-form-section"
				>
					{ warnings }
					<ResponsiveTable
						columns={ this.formHeader() }
						rowData={ formRows }
						footerData={
							this.ticketTotalRow(
								ticket,
								ticketPrefix,
								values,
								setReverseCalculate
							)
						}
						metaData={ {
							tableId: ticketPrefix,
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
					<FormInput
						type="hidden"
						key="reverseCalculate"
						name="reverseCalculate"
						htmlId="reverseCalculate"
						value={ values.reverseCalculate }
					/>
				</FormSection>
				<FormSaveCancelButtons
					htmlClass={ 'ee-ticket-price-calculator-buttons' }
					submitButton={ submitButton }
					cancelButton={ cancelButton }
				/>
				<FormSection htmlClass="ee-ticket-price-calculator-form-info" >
					<FormInfo
						formInfo={
							values.reverseCalculate ?
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
				</FormSection>
			</FormWrapper>
		) : null;
	}
}

/**
 * Enhanced TicketPriceCalculatorForm with FormHandler
 */
export default withFormHandler( TicketPriceCalculatorForm );
