/**
 * External imports
 */
import { Component } from 'react';
import { FormToggle } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';
// import { withEditorModal } from '@eventespresso/higher-order-components';
import { withEditorModal } from '../../../higher-order-components';
import { EditorSaveCancelButtons } from '../../editor-save-cancel-buttons';

import './ticket-editor-style.css';
// import { AdminFormInput, AdminFormRow, FormInput } from '../../components/form/admin-form-inputs';

/**
 * TicketEditor
 *
 * @constructor
 * @param {Object} ticket
 * @param {Function} onClick    callback for adding date to exDates
 */
export class TicketEditor extends Component {
	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketID = ( ticket ) => {
		return (
			<div className="form-group row">
				<div className="col-6 col-sm-6 offset-sm-3">
					<h3>
						{ __( 'Ticket ID: ' + ticket.id, 'event_espresso' ) }
					</h3>
				</div>
			</div>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {Object} rendered form row
	 */
	getTicketName = ( ticket ) => {
		const id = `ee-event-date-ticket-name-${ ticket.id }`;
		return (
			<AdminFormInput
				type="text"
				id={ id }
				value={ ticket.name }
				label={ __( 'Ticket Label', 'event_espresso' ) }
				dataSet={ {
					'data-ticket': ticket.id,
					'data-name': 'name',
				} }
				onChange={ this.onTicketDataChange }
				helpText=""
				colSize={ 6 }
				addWrapper={ true }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {Object} rendered form row
	 */
	getTicketDesc = ( ticket ) => {
		const id = `ee-event-date-ticket-desc-${ ticket.id }`;
		return (
			<AdminFormInput
				type="textarea"
				id={ id }
				value={ ticket.description }
				label={ __( 'Description', 'event_espresso' ) }
				dataSet={ {
					'data-ticket': ticket.id,
					'data-name': 'description',
				} }
				onChange={ this.onTicketDataChange }
				helpText=""
				colSize={ 8 }
				addWrapper={ true }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketSaleDateCalc = ( ticket ) => {
		const id = `ee-event-date-ticket-sale-dates-calc-${ ticket.id }`;
		return (
			<AdminFormInput
				type="select"
				id={ id }
				label={ __( 'Sale Dates Calculated', 'event_espresso' ) }
				value={ ticket.saleDatesCalc }
				options={ [
					{
						label: __( 'Relative to Event Date', 'event_espresso' ),
						value: 'relative',
					},
					{
						label: __( 'On Specific Dates', 'event_espresso' ),
						value: 'absolute',
					},
				] }
				dataSet={ {
					'data-ticket': ticket.id,
					'data-name': 'saleDatesCalc',
				} }
				onChange={ this.onTicketDataChange }
				helpText={
					ticket.saleDatesCalc === 'relative' ?
						__(
							'The start and end dates for when the ticket' +
							' is available for purchase will be calculated' +
							' relative to the event date.',
							'event_espresso'
						) : __(
							'The start and end dates for when the ticket' +
							' is available for purchase will be specific' +
							' dates selected via a date picker.',
							'event_espresso'
						)
				}
				colSize={ 3 }
				addWrapper={ true }
			/>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketSaleStart = ( ticket ) => {
		const e = (
			<div className="form-group row">
				<div className="col-sm-3 text-sm-right">
					<label
						htmlFor={ `ee-event-date-ticket-start-${ ticket.id }` }
						className="col-form-label"
					>
						<strong>
							{ __( 'Ticket Sales Start', 'event_espresso' ) }
						</strong>
					</label>
				</div>
				<div className="col-6 col-sm-1h">
					<input
						id={ `ee-event-date-ticket-start-qty-${ ticket.id }` }
						className="form-control"
						type="number"
						defaultValue="4"
						data-ticket={ ticket.id }
						data-name="sale-start-qty"
						onChange={ this.onTicketDataChange }
					/>
				</div>
				<div className="col-6 col-sm-2">
					<select
						id={ `ee-event-date-ticket-start-interval-${ ticket.id }` }
						className="form-control"
						defaultValue="weeks"
						data-ticket={ ticket.id }
						data-name="sale-start-interval"
						onBlur={ this.onTicketDataChange }
					>
						<option value={ 'hours' }>
							{ __( 'hour(s)', 'event_espresso' ) }
						</option>
						<option value={ 'days' }>
							{ __( 'day(s)', 'event_espresso' ) }
						</option>
						<option value={ 'weeks' }>
							{ __( 'week(s)', 'event_espresso' ) }
						</option>
						<option value={ 'months' }>
							{ __( 'month(s)', 'event_espresso' ) }
						</option>
					</select>
				</div>
				<div className="col-6 col-sm-2">
					<select
						id={ `ee-event-date-ticket-start-when-${ ticket.id }` }
						className="form-control"
						defaultValue="before"
						data-ticket={ ticket.id }
						data-name="sale-start-when"
						onBlur={ this.onTicketDataChange }
					>
						<option value={ 'before' }>
							{ __( 'before', 'event_espresso' ) }
						</option>
						<option value={ 'on' }>
							{ __( 'on', 'event_espresso' ) }
						</option>
						<option value={ 'after' }>
							{ __( 'after', 'event_espresso' ) }
						</option>
					</select>
				</div>
				<div className="col-6 col-sm-2h">
					<select
						id={ `ee-event-date-ticket-start-action-${ ticket.id }` }
						className="form-control"
						defaultValue="start"
						data-ticket={ ticket.id }
						data-name="sale-start-action"
						onBlur={ this.onTicketDataChange }
					>
						<option value={ 'start' }>
							{ __( 'event date start', 'event_espresso' ) }
						</option>
						<option value={ 'end' }>
							{ __( 'event date ending', 'event_espresso' ) }
						</option>
					</select>
				</div>
			</div>
		);
		return <AdminFormRow formInput={ e } />;
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketSaleEnd = ( ticket ) => {
		return (
			<div className="form-group row">
				<div className="col-sm-3 text-sm-right">
					<label
						htmlFor={ `ee-event-date-ticket-end-${ ticket.id }` }
						className="col-form-label"
					>
						<strong>
							{ __( 'Ticket Sales End', 'event_espresso' ) }
						</strong>
					</label>
				</div>
				<div className="col-6 col-sm-1h">
					<input
						id={ `ee-event-date-ticket-end-qty-${ ticket.id }` }
						className="form-control"
						type="number"
						defaultValue="0"
						data-ticket={ ticket.id }
						data-name="sale-end-qty"
						onChange={ this.onTicketDataChange }
					/>
				</div>
				<div className="col-6 col-sm-2">
					<select
						id={ `ee-event-date-ticket-end-interval-${ ticket.id }` }
						className="form-control"
						defaultValue="hours"
						data-ticket={ ticket.id }
						data-name="sale-end-interval"
						onBlur={ this.onTicketDataChange }
					>
						<option value={ 'hours' }>
							{ __( 'hour(s)', 'event_espresso' ) }
						</option>
						<option value={ 'days' }>
							{ __( 'day(s)', 'event_espresso' ) }
						</option>
						<option value={ 'weeks' }>
							{ __( 'week(s)', 'event_espresso' ) }
						</option>
						<option value={ 'months' }>
							{ __( 'month(s)', 'event_espresso' ) }
						</option>
					</select>
				</div>
				<div className="col-6 col-sm-2">
					<select
						id={ `ee-event-date-ticket-end-when-${ ticket.id }` }
						className="form-control"
						defaultValue="on"
						data-ticket={ ticket.id }
						data-name="sale-end-when"
						onBlur={ this.onTicketDataChange }
					>
						<option value={ 'before' }>
							{ __( 'before', 'event_espresso' ) }
						</option>
						<option value={ 'on' }>
							{ __( 'on', 'event_espresso' ) }
						</option>
						<option value={ 'after' }>
							{ __( 'after', 'event_espresso' ) }
						</option>
					</select>
				</div>
				<div className="col-6 col-sm-2h">
					<select
						id={ `ee-event-date-ticket-end-action-${ ticket.id }` }
						className="form-control"
						defaultValue="end"
						data-ticket={ ticket.id }
						data-name="sale-end-action"
						onBlur={ this.onTicketDataChange }
					>
						<option value={ 'start' }>
							{ __( 'event date start', 'event_espresso' ) }
						</option>
						<option value={ 'end' }>
							{ __( 'event date ending', 'event_espresso' ) }
						</option>
					</select>
				</div>
			</div>
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketPrice = ( ticket ) => {
		const id = `ee-event-date-ticket-price-${ ticket.id }`;
		return this.getFormRow(
			id,
			__( 'Ticket Price', 'event_espresso' ),
			<input
				id={ id }
				className="form-control"
				type="text"
				defaultValue={ ticket.price }
				data-ticket={ ticket.id }
				data-name="price"
				onChange={ this.onTicketDataChange }
			/>,
			2,
			true,
			__(
				'If the "Modifiers Included" field below is checked, then' +
				' this is the final ticket price after all modifiers have' +
				' been applied. If the "Tax Included" field below is checked,' +
				' then the total price shown here also includes any' +
				' applicable taxes.',
				'event_espresso'
			)
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketQty = ( ticket ) => {
		const id = `ee-event-date-ticket-qty-${ ticket.id }`;
		return this.getFormRow(
			id,
			__( 'Ticket Quantity', 'event_espresso' ),
			<input
				id={ id }
				className="form-control"
				type="text"
				defaultValue={ ticket.qty }
				data-ticket={ ticket.id }
				data-name="qty"
				onChange={ this.onTicketDataChange }
			/>,
			2,
			true,
			__(
				'The total number of tickets available. If left blank then' +
				' the number of tickets available is unlimited and will only' +
				' be capped by the event date registration limit and/or the' +
				' venue capacity.',
				'event_espresso'
			)
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketUses = ( ticket ) => {
		const id = `ee-event-date-ticket-uses-${ ticket.id }`;
		return this.getFormRow(
			id,
			__( 'Ticket Uses', 'event_espresso' ),
			<input
				id={ id }
				className="form-control"
				type="text"
				defaultValue={ ticket.uses !== 'INF' ? ticket.uses : '' }
				data-ticket={ ticket.id }
				data-name="uses"
				onChange={ this.onTicketDataChange }
			/>,
			2,
			true,
			__(
				'The total number of times this ticket can be used to gain' +
				' entry to the event dates it has access to. If left blank' +
				' then this ticket can be used an unlimited number of times.',
				'event_espresso'
			)
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketMin = ( ticket ) => {
		const id = `ee-event-date-ticket-min-${ ticket.id }`;
		return this.getFormRow(
			id,
			__( 'Minimum Quantity', 'event_espresso' ),
			<input
				id={ id }
				className="form-control"
				type="text"
				defaultValue={ ticket.min !== 0 ? ticket.min : '' }
				data-ticket={ ticket.id }
				data-name="min"
				onChange={ this.onTicketDataChange }
			/>,
			2,
			true,
			__(
				'The minimum number of tickets that can be purchased at this' +
				' price. If left blank then there will be no minimum' +
				' quantity. This can be used to create ticket bundles and/or' +
				' graduated pricing.',
				'event_espresso'
			)
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketMax = ( ticket ) => {
		const id = `ee-event-date-ticket-max-${ ticket.id }`;
		return this.getFormRow(
			id,
			__( 'Maximum Quantity', 'event_espresso' ),
			<input
				id={ id }
				className="form-control"
				type="text"
				defaultValue={ ticket.max !== 'INF' ? ticket.max : '' }
				data-ticket={ ticket.id }
				data-name="max"
				onChange={ this.onTicketDataChange }
			/>,
			2,
			true,
			__(
				'The maximum number of tickets that can be purchased at this' +
				' price. If left blank then there will be no maximum' +
				' quantity. This can be used to create ticket bundles' +
				' and/or graduated pricing.',
				'event_espresso'
			)
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketRequired = ( ticket ) => {
		const id = `ee-event-date-ticket-required-${ ticket.id }`;
		return this.getFormRow(
			id,
			__( 'Required', 'event_espresso' ),
			<FormToggle
				id={ id }
				className="ee-admin-form-toggle"
				checked={ ticket.required }
				data-ticket={ ticket.id }
				data-name="required"
				onChange={ this.onTicketDataChange }
			/>,
			1,
			true,
			ticket.required ?
				__(
					'This ticket is required. It will appear' +
					' first in ticket lists and must be purchased.',
					'event_espresso'
				) : __(
					'This ticket is NOT required. It\'s purchase' +
					' is optional.',
					'event_espresso'
				)
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketTaxable = ( ticket ) => {
		const id = `ee-event-date-ticket-taxable-${ ticket.id }`;
		return this.getFormRow(
			id,
			__( 'Taxable', 'event_espresso' ),
			<FormToggle
				id={ id }
				className="ee-admin-form-toggle"
				checked={ ticket.taxable }
				data-ticket={ ticket.id }
				data-name="taxable"
				onChange={ this.onTicketDataChange }
			/>,
			1,
			true,
			ticket.taxable ?
				__(
					'Tax will be charged on this ticket.',
					'event_espresso'
				) : __(
					'Tax will NOT be charged on this' +
					' ticket.',
					'event_espresso'
				)
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketTaxIncluded = ( ticket ) => {
		const id = `ee-event-date-ticket-tax-included-${ ticket.id }`;
		return this.getFormRow(
			id,
			__( 'Tax Included', 'event_espresso' ),
			<FormToggle
				id={ id }
				className="ee-admin-form-toggle"
				checked={ ticket.taxIncluded }
				data-ticket={ ticket.id }
				data-name="taxIncluded"
				onChange={ this.onTicketDataChange }
			/>,
			1,
			true,
			ticket.taxIncluded ?
				__(
					'Tax will be included in the total price for this' +
					' ticket and NOT added during checkout.',
					'event_espresso'
				) : __(
					'Tax will NOT be included in the total price for this' +
					' ticket. Any applicable taxes will be added during' +
					' checkout.',
					'event_espresso'
				)
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getTicketPriceModifiersIncluded = ( ticket ) => {
		const id = `ee-event-date-ticket-price-mods-included-${ ticket.id }`;
		return this.getFormRow(
			id,
			__( 'Modifiers Included', 'event_espresso' ),
			<FormToggle
				id={ id }
				className="ee-admin-form-toggle"
				checked={ ticket.priceModsIncluded }
				data-ticket={ ticket.id }
				data-name="priceModsIncluded"
				onChange={ this.onTicketDataChange }
			/>,
			1,
			true,
			ticket.priceModsIncluded ?
				__(
					'All price modifiers (surcharges, discounts, etc) will be' +
					' included in the total price for this ticket and NOT' +
					' added during checkout. The ticket\'s base price will' +
					' be "reverse engineered" from the total after taking' +
					' modifiers into account.',
					'event_espresso'
				) : __(
					'All price modifiers (surcharges, discounts, etc) will' +
					' NOT be included in the total price for this ticket.' +
					' All price modifiers will be added during checkout and' +
					' the "Ticket Price" field above is the ticket\'s base' +
					' price.',
					'event_espresso'
				)
		);
	};

	/**
	 * @function
	 * @param {Object} ticket
	 * @return {string} rendered date name form row
	 */
	getEditorButtons = ( ticket ) => {
		return (
			<div className="form-group row">
				<div className="col-6 col-sm-6 offset-sm-3">
					<EditorSaveCancelButtons
						submitLabel={ __(
							'Save Ticket Details',
							'event_espresso'
						) }
						divClass={ `ee-editor-buttons-ticket-${ ticket.id }` }
					/>
				</div>
			</div>
		);
	};

	/**
	 * @function
	 * @param {number} event
	 */
	onTicketDataChange = ( event ) => {
		console.log( 'EventDateTicketDetails.onTicketDataChange()' );
		if ( ! event.target || ! event.target.dataset ) {
			console.log( 'event', event );
			return;
		}
		const data = {
			ticket: event.target.dataset.ticket,
			[ event.target.dataset.name ]: event.target.value,
		};
		this.changesSaved( true );
		this.toggleEditor();
		console.log( data );
	};

	render() {
		const { ticket, changesSaved, toggleEditor } = this.props;
		this.changesSaved = changesSaved;
		this.toggleEditor = toggleEditor;
		// console.log( '' );
		// console.log( 'TicketEditor', this.props );
		return ticket && (
			<div className="px-0 pt-3 border rounded">
				<div className="px-3">
					{ this.getTicketID( ticket ) }
					{ this.getTicketName( ticket ) }
					{ this.getTicketDesc( ticket ) }
					{ this.getTicketSaleDateCalc( ticket ) }
				</div>
			</div>
		);
	}
}

/**
 * Enhanced TicketEditor with Modal
 */
export const TicketEditorModal = withEditorModal( {
	title: __( 'Event Date Ticket Editor', 'event_espresso' ),
	customClass: 'ee-ticket-editor espresso-editor',
	closeButtonLabel: __( 'close ticket editor', 'event_espresso' ),
} )( TicketEditor );

/*

{ this.getTicketSaleStart( ticket ) }
{ this.getTicketSaleEnd( ticket ) }
{ this.getTicketPrice( ticket ) }
{ this.getTicketQty( ticket ) }
{ this.getTicketUses( ticket ) }
{ this.getTicketMin( ticket ) }
{ this.getTicketMax( ticket ) }
{ this.getTicketRequired( ticket ) }
{ this.getTicketTaxable( ticket ) }
{ this.getTicketTaxIncluded( ticket ) }
{ this.getTicketPriceModifiersIncluded( ticket ) }
{ this.getEditorButtons( ticket ) }

'id'          => $TKT_ID,
'templateId'  => null,
'name'        => $ticket->name(),
'description' => $ticket->description(),
'qty'         => $ticket->qty() !== INF ? $ticket->qty() : 'INF',
'sold'        => $ticket->sold(),
'reserved'    => $ticket->reserved(),
'uses'        => $ticket->uses() !== INF ? $ticket->uses() : 'INF',
'required'    => $ticket->required(),
'min'         => $ticket->min(),
'max'         => $ticket->max() !== INF ? $ticket->max() : 'INF',
'price'       => $ticket->price(),
'startDate'   => $ticket->start_date('D M d Y H:i:s O'),
'endDate'     => $ticket->end_date('D M d Y H:i:s O'),
'taxable'     => $ticket->taxable(),
'order'       => $ticket->order(),
'row'         => $ticket->row(),
'isDefault'   => $ticket->is_default(),
'wpUser'      => $ticket->wp_user(),
'parent'      => $ticket->parent(),
'deleted'     => $ticket->deleted(),
'status'      => $ticket->ticket_status(),
'regCount'    => $ticket->count_registrations(),
*/
