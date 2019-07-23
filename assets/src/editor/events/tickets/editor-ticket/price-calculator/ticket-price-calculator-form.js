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
import { normalizeEntityId } from '@eventespresso/helpers';

/**
 * Internal dependencies
 */
import { TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX } from './constants';
import { parseMoneyValue } from './use-ticket-price-calculator-form-decorator';
import { shortenCuid } from '../../../../utils';
import './style.css';

const { MODEL_NAME: TICKET } = ticketModel;
const { BASE_PRICE_TYPES } = priceTypeModel;

const {
	FormInfo,
	FormInput,
	InputLabel,
	FormSection,
	FormWrapper,
} = twoColumnAdminFormLayout;

/**
 * TicketPriceCalculatorForm
 *
 * @constructor
 */
class TicketPriceCalculatorForm extends Component {
	/**
	 * @function
	 * @param {Array} priceTypeEntities
	 * @return {Array} price type options for use in select input
	 */
	buildPriceTypeOptions = ( priceTypeEntities ) => {
		const priceTypeOptions = [];
		for ( let i = 0; i < priceTypeEntities.length; i++ ) {
			const priceTypeEntity = priceTypeEntities[ i ];
			if ( isModelEntityOfModel( priceTypeEntity, 'price_type' ) ) {
				priceTypeOptions.push( {
					value: priceTypeEntity.id,
					label: priceTypeEntity.name,
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
		priceTypeId = normalizeEntityId( priceTypeId );
		const priceTypeEntity = find( this.priceTypeEntities, [ 'id', priceTypeId ] );
		if ( isModelEntityOfModel( priceTypeEntity, 'price_type' ) ) {
			return priceTypeEntity;
		}
		return last( this.priceTypeEntities );
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
	 * @param {Object} priceTypeEntity
	 * @return {Object} % or $ sign
	 */
	modifierSign = ( priceTypeEntity ) => {
		return priceTypeEntity && priceTypeEntity.isPercent ?
			this.percentSign() :
			this.currencySign();
	};

	/**
	 * @function
	 * @param {Object} priceTypeEntity
	 * @return {string} input field css class
	 */
	amountClass = ( priceTypeEntity = null ) => {
		return priceTypeEntity && priceTypeEntity.isPercent ?
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
				this.priceTypeEntities,
				( priceTypeEntity ) => priceTypeEntity.id !== 1
			)
		).id;
	};

	/**
	 * @function
	 * @param {Object} ticketEntity
	 * @param {string} ticketPrefix
	 * @param {Array} values
	 * @param {Object} priceEntity
	 * @param {Array} priceTypeOptions
	 * @param {boolean} lastRow
	 * @return {Object} rendered price modifier form row
	 */
	priceModifierRow = (
		ticketEntity,
		ticketPrefix,
		values,
		priceEntity,
		priceTypeOptions,
		lastRow,
	) => {
		const priceId = shortenCuid( priceEntity.id );
		const prefix = `${ ticketPrefix }-price-${ priceId }`;
		const priceTypeId = normalizeEntityId( values[ `${ prefix }-type` ] ) || 0;
		const priceTypeEntity = this.getPriceType( priceTypeId );
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
									priceEntity.prtId = value ?
										normalizeEntityId( value ) :
										this.getDefaultPriceTypeId();
								}
							}
							disabled={
								priceEntity.prtId === BASE_PRICE_TYPES.BASE_PRICE
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
							changeListener={ ( value ) => priceEntity.name = value }
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
							changeListener={ ( value ) => priceEntity.desc = value }
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
						{ this.modifierSign( priceTypeEntity ) }
						<FormInput
							key="price"
							type="text"
							name={ `${ prefix }-amount` }
							htmlId={ `${ prefix }-amount` }
							htmlClass={ this.amountClass( priceTypeEntity ) }
							value={
								priceEntity.amount.formatter.formatNumber(
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
										priceEntity.amount = new Money(
											parseMoneyValue( value ),
											SiteCurrency
										);
									}
								}
							}
							disabled={
								priceEntity.prtId === BASE_PRICE_TYPES.BASE_PRICE &&
								ticketEntity.reverseCalculate === true
							}
							format={ ( value ) => {
								return priceEntity.amount.formatter.formatNumber(
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
					priceTypeEntity,
					priceEntity,
					ticketEntity,
					prefix,
					values,
					lastRow
				),
			},
		];
	};

	/**
	 * @function
	 * @param {Object} priceTypeEntity
	 * @param {Object} priceEntity
	 * @param {Object} ticketEntity
	 * @param {string} prefix
	 * @param {Array} values
	 * @param {boolean} lastRow
	 * @return {Object} rendered price modifier form row
	 */
	getModifierActionButtons = (
		priceTypeEntity,
		priceEntity,
		ticketEntity,
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
							ticketEntity,
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
		const deleteModifier = priceTypeEntity.pbtId !== BASE_PRICE_TYPES.BASE_PRICE ?
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
						() => this.trashPriceModifier( priceEntity, ticketEntity )
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
	 * @param {Object} ticketEntity
	 * @param {string} ticketPrefix
	 * @param {Array} values
	 * @param {Function} updateField
	 * @return {Object} rendered form footer
	 */
	ticketTotalRow = ( ticketEntity, ticketPrefix, values, updateField ) => {
		const calcDirIcon = ticketEntity.reverseCalculate ? 'up' : 'down';
		const calcDirText = ticketEntity.reverseCalculate ?
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
								ticketEntity.price.formatter.formatNumber(
									parseMoneyValue( values.ticketTotal )
								)
							}
							changeListener={
								( value, previous ) => {
									if (
										parseFloat( value ) !== parseFloat( previous )
									) {
										ticketEntity.price = new Money(
											parseMoneyValue( value ),
											SiteCurrency
										);
									}
								}
							}
							disabled={ ticketEntity.reverseCalculate === false }
							format={ ( value ) => {
								return ticketEntity.price.formatter.formatNumber(
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
						<FormInput
							type="iconButton"
							name="reverseCalculate"
							htmlId="reverseCalculate"
							value={ !! ticketEntity.reverseCalculate }
							icon={ `arrow-${ calcDirIcon }-alt2` }
							helpText={ calcDirText }
							onClick={
								() => {
									const value = ! ticketEntity.reverseCalculate;
									ticketEntity.reverseCalculate = value;
									updateField( 'reverseCalculate', value );
								}
							}
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
			ticketEntity,
			priceEntities,
			priceTypeEntities,
			addPriceModifier,
			trashPriceModifier,
			updateField,
			initialValues = {},
			currentValues = {},
		} = this.props;
		this.setTimeout = setTimeout;
		this.clearTimeout = clearTimeout;
		this.addPriceModifier = addPriceModifier;
		this.trashPriceModifier = trashPriceModifier;
		if (
			! isModelEntityOfModel( ticketEntity, TICKET ) ||
			isEmpty( priceTypeEntities )
		) {
			return null;
		}
		this.priceTypeEntities = priceTypeEntities;
		const values = isEmpty( currentValues ) ?
			initialValues :
			currentValues;
		const allPriceTypeOptions = this.buildPriceTypeOptions(
			this.priceTypeEntities
		);
		let ticketPrefix = TICKET_PRICE_CALCULATOR_FORM_INPUT_PREFIX;
		ticketPrefix += '-ticket-' + ticketEntity.id;

		let warnings = null;
		const formRows = [];
		const priceCount = priceEntities.length;
		if ( priceCount > 0 ) {
			const priceTypeOptions = filter(
				allPriceTypeOptions,
				( priceTypeEntity ) => {
					return priceTypeEntity.value !== BASE_PRICE_TYPES.BASE_PRICE;
				}
			);
			const sortedPrices = sortBy( priceEntities, [ 'order', 'name' ] );
			for ( let i = 0; i < priceCount; i++ ) {
				const priceEntity = sortedPrices[ i ];
				if ( ! isModelEntityOfModel( priceEntity, 'price' ) ) {
					return;
				}
				// we don't want "Base Price" to be an option for
				// price modifiers because THERE CAN ONLY BE ONE!!!
				const options = priceEntity.prtId === BASE_PRICE_TYPES.BASE_PRICE ?
					allPriceTypeOptions :
					priceTypeOptions;
				formRows.push(
					this.priceModifierRow(
						ticketEntity,
						ticketPrefix,
						values,
						priceEntity,
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
		return ticketEntity && ticketEntity.id ? (
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
								ticketEntity,
								ticketPrefix,
								values,
								updateField
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
						htmlId="ee-ticketID"
						value={ values.ticketID }
					/>
					<FormInput
						type="hidden"
						key="priceIDs"
						name="priceIDs"
						htmlId="ee-priceIDs"
						value={ values.priceIDs }
					/>
					<FormInput
						type="hidden"
						key="priceTypes"
						name="priceTypes"
						htmlId="ee-priceTypes"
						value={ values.priceTypes }
					/>
				</FormSection>
				<FormSection htmlClass="ee-ticket-price-calculator-form-info" >
					<FormInfo
						formInfo={
							ticketEntity.reverseCalculate ?
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
