<h3>EventDatetimes</h3>

<div class="event-datetimes-container">
	<div id="event-datetime-row1" class="event-datetime-row">
		<section id="display-event-datetime-row1" class="datetime-summary">
			<span class="datetime-title">September 10,2013 @ 10:00am-2:00pm</span><span class="gear-icon clickable" data-datetime-row="row1" data-context="datetime"></span><span data-datetime-row="row1"  data-context="datetime" class="ticket-icon clickable"></span><span  data-context="datetime" data-datetime-row="row1" class="clone-icon clickable"></span><span  data-context="datetime" data-datetime-row="row1" class="trash-icon clickable"></span><span  data-context="datetime" data-datetime-row="row1" class="datetime-tickets-sold">Total Tickets Sold: 152</span>
		</section>
		<section id="edit-event-datetime-row1" class="datetime-edit">
			<input type="hidden" name="edit_event_datetimes[row1][DTT_ID]" id="event-datetimes-DTT_ID-row1" value="15">
			<input type="hidden" name="edit_event_datetimes[row1][DTT_is_primary]" id="event-datetimes-DTT_is_primary-row1" value="1">
			<table id="edit-event-datetime-table-row1" class="datetime-edit-table">
				<tr>
					<td class="event-datetime-column">
						<label for="event-datetimes-DTT_EVT_start-row1">Event Start</label>
						<input type="text" name="edit_event_datetimes[row1][DTT_EVT_start]" id="event-datetimes-DTT_EVT_start-row1">
					</td>
					<td class="event-datetime-column">
						<label for="event-datetimes-DTT_EVT_end-row1">Event End</label>
						<input type="text" name="edit_event_datetimes[row1][DTT_EVT_end]" id="event-datetimes-DTT_EVT_end-row1">
					</td>
					<td class="event-datetime-column">
						<label for="event-datetimes-DTT_reg_limit-row1">Reg Limit</label>
						<input type="text" name="edit_event_datetimes[row1][DTT_reg_limit]" id="event-datetimes-DTT_reg_limit-row1" size="1">
					</td>
					<td class="event-datetime-column">
						<button data-datetime-row="row1"  data-context="datetime" class="button-primary ee-save-button">
							Save Datetime
						</button>
					</td>
				</tr>
			</table>
		</section>
		<section id="edit-event-datetime-tickets-row1" class="datetime-tickets-edit">
			<h5 class="datetime-tickets-heading">Assigned Tickets</h5>
			<ul class="datetime-tickets-list">
				<li data-datetime-row="row1" data-context="datetime-ticket" data-ticket-row="ticket1" class="datetime-ticket ticket-selected clickable">
					<input type="checkbox" name="datetime_ticket[row1][ticketrow1]" id="datetime-ticket-checkbox-row1-ticketrow1" value="1" checked=checked>
					<span class="ticket-list-ticket-name">General Admission: 152</span>
					<span class="clickable gear-icon" data-datetime-row="row1" data-context="ticket" data-ticket-row="ticket2"></span>
				</li>
				<li data-datetime-row="row1" data-context="datetime-ticket" data-ticket-row="ticket2" class="datetime-ticket clickable">
					<input type="checkbox" name="datetime_ticket[row1][ticketrow2]" id="datetime-ticket-checkbox-row1-ticketrow2" value="1">
					<span class="ticket-list-ticket-name">Early Bird: 0</span>
					<span class="clickable gear-icon" rel="edit-event-ticket-ticketrow2" data-ticket-row="ticket2"></span>
				</li>
			</ul>
			<!-- these hidden inputs appear when a ticket is selected and are removed when a ticket is deselected -->
			<input type="hidden" name="datetime_ticket_IDs[row1][ticketrow1]" id="datetime-ticket-id-row1-ticketrow1" value="1">
			<!-- here's an example of a row for a ticket that might not have a ticket id yet.  However we can still reference later what ticket it belongs to via the "ticketrow" arraykey -->
			<!-- <input type="hidden" name="datetime_ticket_IDs[row1][ticketrow1]" id="datetime-ticket-id-row1-ticketrow1" value="0"> -->
			<div class="add-datetime-ticket-container">
				<!-- NOTE that the add-new-ticket-table will only appear ONCE in the DOM, we'll use jQuery to simply show the element in the appropriate place when needed -->
				<h5 class="datetime-tickets-heading">Add New Ticket</h5><a href="#" class="help_img">Help Link</a>
				<table class="add-new-ticket-table">
					<thead>
						<tr valign="top">
							<td>Ticket Name</td>
							<td>Goes On Sale</td>
							<td>Sell Until</td>
							<td>Base Price</td>
							<td>Price</td>
							<td>Qty</td>
							<td></td>
						</tr>
					</thead>
					<tr valign="top" id="add-new-ticket-shortcut-row">
						<td>
							<input type="text" name="add_new_ticket[TKT_name]" id="add-new-ticket-TKT_name">
						</td>
						<td>
							<input type="text" name="add_new_ticket[TKT_start_date]" id="add-new-ticket-TKT_start_date">
						</td>
						<td>
							<input type="text" name="add_new_ticket[TKT_end_date]" id="add-new-ticket-TKT_end_date">
						</td>
						<td>
							<select name="add_new_ticket[PRT_ID]" id="add-new-ticket-PRT_ID">
								<option value="1">Event Price</option>
								<option value="2">Discount</option>
							</select>
						</td>
						<td>	
							<input type="text" name="add_new_ticket[PRC_amount]" id="add-new-ticket-PRC_amount" size="1">
						</td>
						<td>
							<input type="text" name="add_new_ticket[TKT_qty]" id="add-new-ticket-TKT_qty" size="1">
						</td>
						<td>
							<span class="clickable gear-icon add-edit" data-context="ticket" data-datetime-row="row1"></span>
							<!-- the "add-edit" class is used by jQuery to indicate we need to retrieve a edit form using the value from the #next-ticket-row hidden input (which in turn is incremented if the new created item is saved). -->
							<!-- Also: when the Add New Ticket form is recalled, jQuery will automatically populate the data-context and data-datetime-row properties on the edit icon and save buttons from the event handler for the datetime being edited. -->
						</td>
					</tr>
					<tr valign="top" id="add-new-ticket-action-row">
						<td colspan="7">
							<div class="save-cancel-button-container">
								<!-- note: when the save button is clicked we update the #next-ticket-row hidden input (increment forward) -->
								<button data-context="ticket" data-datetime-row="row1" class="button-primary ee-save-button">
									Save_Ticket
								</button>
								<button data-context="ticket" class="button-secondary ee-cancel-button add-edit">
									Cancel
								</button>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</section>
	</div>
	<div id="event-datetime-row2" class="event-datetime-row">
		<section id="display-event-datetime-row2" class="datetime-summary">
			<span class="datetime-title">September 11, 2013 @ 10:00am-2:00pm</span>
			<span data-datetime-row="row2" data-context="datetime" class="gear-icon clickable"></span>
			<span data-datetime-row="row2" data-context="datetime" class="ticket-icon clickable"></span>
			<span data-datetime-row="row2" data-context="datetime" class="clone-icon clickable"></span>
			<span data-datetime-row="row2" data-context="datetime" class="trash-icon clickable"></span>
			<span data-datetime-row="row2" data-context="datetime" class="datetime-tickets-sold">Total Tickets Sold: 152</span>
		</section>
		<!-- and you would have the edit and ticket sections here for datetime row 2 -->
	</div>
	<div id="add-event-datetime" class="event-datetime-row">
		<input type="hidden" name="add_new_datetime[DTT_is_primary]" id="add-new-event-datetime-DTT_is_primary" value="1">
		<table id="add-new-event-datetime-table" class="datetime-edit-table">
			<tr>
				<td class="event-datetime-column">
					<label for="add-new-event-datetime-DTT_EVT_start">Event Start</label>
					<input type="text" name="add_new_datetime[DTT_EVT_start]" id="add-new-event-datetime-DTT_EVT_start">
				</td>
				<td class="event-datetime-column">
					<label for="add-new-event-datetime-DTT_EVT_end">Event End</label>
					<input type="text" name="add_new_datetime[DTT_EVT_end]" id="add-new-event-datetime-DTT_EVT_end">
				</td>
				<td class="event-datetime-column">
					<label for="add-new-event-datetime-DTT_reg_limit">Reg Limit</label>
					<input type="text" name="add_new_datetime[DTT_reg_limit]" id="add-new-event-datetime-DTT_reg_limit" size="1">
				</td>
				<td class="event-datetime-column">
					<button data-context="datetime" class="button-primary ee-save-button add-edit">
						Save Datetime
					</button>
				</td>
			</tr>
		</table>
	</div>
	<input type="hidden" name="datetime_IDs" id="datetime-IDs" value="1,2">
	<input type="hidden" name="datetime_total_rows" id="datetime-total-rows" value="2">
	<!-- above is used by js to calculate what the next datetime row will be and is incremented when a new datetime is "saved". -->

</div>
<div class="event-tickets-container">
	<h3>Available Tickets</h3>
	<table class="ticket-table">
		<thead>
			<tr valign="top">
				<td colspan="2">Ticket</td>
				<td>On Sale</td>
				<td>Sell Until</td>
				<td>Status</td>
				<td>Price</td>
				<td>Qty</td>
				<td colspan="2">Sold</td>
			</tr>
		</thead>
		<tr valign="top" class="ticket-row" id="display-ticketrow-ticketrow1">
			<td></td>
			<td>General Admission</td>
			<td>Aug 1, 2013</td>
			<td>Sept 10, 2013</td>
			<td>On Sale</td>
			<td>$50</td>
			<td>600</td>
			<td>330</td>
			<td><span class="gear-icon clickable" data-ticket-row="ticketrow1" data-context="ticket"></span><span class="clone-icon clickable" data-ticket-row="ticketrow1" data-context="ticket"></span></td>
		</tr>
		<tr id="edit-ticketrow-ticketrow-ticketrow1" class="edit-ticket-row">
			<td colspan="9">
				<fieldset id="edit-ticketrow-ticketrow1">
					<legend>Edit Ticket</legend>
					<input type="hidden" name="edit_tickets[ticketrow1][TKT_ID]" class="edit-ticket-TKT_ID">
					<input type="hidden" name="edit_tickets[ticketrow1][TKT_display_order]" class="edit-ticket-TKT_display_order">
					<input type="text" name="edit_tickets[ticketrow1][TKT_name]" id="edit-ticket-TKT_name" size="5">
					<div class="total-price-container"><strong>Total Final Price:</strong><span class="ticket-price-amount">$45.00</span></div>
					<textarea name="edit_tickets[ticketrow1][TKT_description]" id="edit-ticket-TKT_description" cols="30" rows="10">Ticket Description</textarea>
					<h5 class="tickets-heading">Ticket Details</h5>
					<table class="basic-ticket-info">
						<thead>
							<tr>
								<td>Goes on Sale</td>
								<td>Sell Until</td>
								<td>Quantity</td>
								<td>#Uses</td>
								<td>Min</td>
								<td>Max</td>
							</tr>
						</thead>
						<tr>
							<td><input type="text" name="edit_tickets[ticketrow1][TKT_start_date]" class="edit-ticket-TKT_start_date"></td>
							<td><input type="text" name="edit_tickets[ticketrow1][TKT_end_date]" class="edit-ticket-TKT_end_date"></td>
							<td><input type="text" class="edit-ticket-TKT_qty" name="edit_tickets[ticketrow1][TKT_qty]"></td>
							<td><input type="text" class="edit-ticket-TKT_uses" name="edit_tickets[ticketrow1][TKT_uses]"></td>
							<td><input type="text" class="edit-ticket-TKT_min" name="edit_tickets[ticketrow1][TKT_min]"></td>
							<td><input type="text" class="edit-ticket-TKT_max" name="edit_tickets[ticketrow1[TKT_max]"></td>
						</tr>
					</table>
					<h5 class="tickets-heading">Base Ticket Price and Price Modifiers</h5>
					<table class="price-table">
						<thead>
							<tr>
								<td>Price Type</td>
								<td>Name</td>
								<td>Amount</td>
								<td></td>
							</tr>
						</thead>
						<tr id="price-row-ticketrow1-pricerow1">
							<td>Event Price</td>
							<td><input type="hidden" name="edit_prices[ticketrow1][pricerow1][PRT_ID]" class="edit-price-PRT_ID"><input type="text" class="edit-price-PRC_name" name="edit_prices[ticketrow1][pricerow1][PRC_name]"></td>
							<td>$ <input type="text" size="1" class="edit-price-PRC_amount" name="edit_prices[ticketrow1][pricerow1][PRC_amount]"></td>
							<td><span class="gear-icon clickable" data-ticket-row="ticketrow1" data-context="price" data-price-row="price-row1"></span><span class="trash-icon clickable" data-ticket-row="ticketrow1" data-context="price" data-price-row="pricerow1"></span></td>
						</tr>
						<tr id="price-row-ticketrow1-pricerow2">
							<td>- Discount</td>
							<td><input type="hidden" name="edit_prices[ticketrow1][pricerow2][PRT_ID]" class="edit-price-PRT-ID"><input type="text" class="edit-price-PRC_name" name="edit_prices[ticketrow1][pricerow2][PRC_name]"></td>
							<td><input type="text" size="1" class="edit-price-PRC_amount" name="edit_prices[ticketrow1][pricerow2][PRC_amount]"> %</td>
							<td><span class="gear-icon clickable" data-ticket-row="ticketrow1" data-context="price" data-price-row="price-row2"></span>
							<span class="trash-icon clickable" data-ticket-row="ticketrow1" data-context="price" data-price-row="pricerow2"></span>
							<button class="add-new-price"></button></td>
						</tr>
						<tfoot>
							<tr class="price-total-row">
								<td colspan="2">Total</td>
								<td colspan="2">$45.00</td>
							</tr>
						</tfoot>
					</table>
					<h5 class="tickets-heading">Event Datetimes</h5>
					<p>This ticket will be usable (allow entrance) for the following selected event datetimes (click to select):</p>
					<ul class="datetime-tickets-list">
						<li class="datetime-ticket clickable" data-datetime-row="row1" data-context="ticket-datetime" data-ticket-row="ticketrow1">
							<input type="checkbox" name="ticket_datetime[row1][ticketrow1]" id="datetime-ticket-checkbox-row1-ticketrow1" value="1">
							<span class="ticket-list-ticket-name">Sept 10 - 9am - 10am</span>
							<span class="clickable gear-icon" data-datetime-row="row1" data-context="datetime" data-ticket-row="ticket1"></span>
						</li>
						<li class="datetime-ticket clickable ticket-selected" data-datetime-row="row2" data-context="ticket-datetime" data-ticket-row="ticketrow1">
							<input type="checkbox" name="ticket_datetime[row2][ticketrow1]" id="datetime-ticket-checkbox-row2-ticketrow1" value="1">
							<span class="ticket-list-ticket-name">Sept 10 - 1pm - 2pm</span>
							<span class="clickable gear-icon" data-datetime-row="row2" data-context="datetime" data-ticket-row="ticket1"></span>
						</li>
					</ul>
					<input type="checkbox" name="edit_tickets[ticketrow1][TKT_is_default]" id="edit-ticket-TKT_is_default">
					<label for="edit-ticket-TKT_is_default">use this new ticket as a default ticket for any new events</label>
					<div class="save-cancel-button-container"><button class="button-primary ee-save-button" data-context="ticket" data-ticket-row="ticketrow1">Save Ticket</button><button class="button-secondary ee-cancel-button" data-context="ticket">Cancel</button></div>
				</fieldset>
			</td>
		</tr>
		<tr valign="top" class="ticket-row" id="display-ticketrow-ticketrow2">
			<td></td>
			<td>Early Bird</td>
			<td>August 1, 2013</td>
			<td>Sept 10, 2013</td>
			<td>On Sale</td>
			<td>$45</td>
			<td>600</td>
			<td>17</td>
			<td><span class="gear-icon clickable" data-ticket-row="ticketrow2" data-context="ticket"></span>
			<span class="clone-icon clickable" data-ticket-row="ticketrow2" data-context="ticket"></span>
			<span class="trash-icon clickable" data-ticket-row="ticketrow2" data-context="ticket"></span></td>
		</tr>
		<tr id="edit-ticketrow-ticketrow-ticketrow2" class="edit-ticket-row">
			<td colspan="9">
				<fieldset id="edit-ticketrow-ticketrow2">
					<legend>Edit Ticket</legend>
					<input type="hidden" name="edit_tickets[ticketrow2][TKT_ID]" class="edit-ticket-TKT_ID">
					<input type="hidden" name="edit_tickets[ticketrow2][TKT_display_order]" class="edit-ticket-TKT_display_order">
					<input type="text" name="edit_tickets[ticketrow2][TKT_name]" id="edit-ticket-TKT_name" size="5">
					<div class="total-price-container"><strong>Total Final Price:</strong><span class="ticket-price-amount">$45.00</span></div>
					<textarea name="edit_tickets[ticketrow2][TKT_description]" id="edit-ticket-TKT_description" cols="30" rows="10">Ticket Description</textarea>
					<h5 class="tickets-heading">Ticket Details</h5>
					<table class="basic-ticket-info">
						<thead>
							<tr>
								<td>Goes on Sale</td>
								<td>Sell Until</td>
								<td>Quantity</td>
								<td>#Uses</td>
								<td>Min</td>
								<td>Max</td>
							</tr>
						</thead>
						<tr>
							<td><input type="text" name="edit_tickets[ticketrow2][TKT_start_date]" class="edit-ticket-TKT_start_date"></td>
							<td><input type="text" name="edit_tickets[ticketrow2][TKT_end_date]" class="edit-ticket-TKT_end_date"></td>
							<td><input type="text" class="edit-ticket-TKT_qty" name="edit_tickets[ticketrow2][TKT_qty]"></td>
							<td><input type="text" class="edit-ticket-TKT_uses" name="edit_tickets[ticketrow2][TKT_uses]"></td>
							<td><input type="text" class="edit-ticket-TKT_min" name="edit_tickets[ticketrow2][TKT_min]"></td>
							<td><input type="text" class="edit-ticket-TKT_max" name="edit_tickets[ticketrow2[TKT_max]"></td>
						</tr>
					</table>
					<h5 class="tickets-heading">Base Ticket Price and Price Modifiers</h5>
					<table class="price-table">
						<thead>
							<tr>
								<td>Price Type</td>
								<td>Name</td>
								<td>Amount</td>
								<td></td>
							</tr>
						</thead>
						<tr id="price-row-ticketrow2-pricerow1">
							<td>Event Price</td>
							<td><input type="hidden" name="edit_prices[ticketrow2][pricerow1][PRT_ID]" class="edit-price-PRT_ID"><input type="text" class="edit-price-PRC_name" name="edit_prices[ticketrow2][pricerow1][PRC_name]"></td>
							<td>$ <input type="text" size="1" class="edit-price-PRC_amount" name="edit_prices[ticketrow2][pricerow1][PRC_amount]"></td>
							<td><span class="gear-icon clickable" data-ticket-row="ticketrow2" data-context="price" data-price-row="price-row1"></span><span class="trash-icon clickable" data-ticket-row="ticketrow2" data-context="price" data-price-row="pricerow1"></span></td>
						</tr>
						<tr id="price-row-ticketrow2-pricerow2">
							<td>- Discount</td>
							<td><input type="hidden" name="edit_prices[ticketrow2][pricerow2][PRT_ID]" class="edit-price-PRT-ID"><input type="text" class="edit-price-PRC_name" name="edit_prices[ticketrow2][pricerow2][PRC_name]"></td>
							<td><input type="text" size="1" class="edit-price-PRC_amount" name="edit_prices[ticketrow2][pricerow2][PRC_amount]"> %</td>
							<td><span class="gear-icon clickable" data-ticket-row="ticketrow2" data-context="price" data-price-row="price-row2"></span>
							<span class="trash-icon clickable" data-ticket-row="ticketrow2" data-context="price" data-price-row="pricerow2"></span>
							<button class="add-new-price"></button></td>
						</tr>
						<tfoot>
							<tr class="price-total-row">
								<td colspan="2">Total</td>
								<td colspan="2">$45.00</td>
							</tr>
						</tfoot>
					</table>
					<h5 class="tickets-heading">Event Datetimes</h5>
					<p>This ticket will be usable (allow entrance) for the following selected event datetimes (click to select):</p>
					<ul class="datetime-tickets-list">
						<li class="datetime-ticket clickable" data-datetime-row="row1" data-context="ticket-datetime" data-ticket-row="ticketrow2">
							<input type="checkbox" name="ticket_datetime[row1][ticketrow2]" id="datetime-ticket-checkbox-row1-ticketrow2" value="1">
							<span class="ticket-list-ticket-name">Sept 10 - 9am - 10am</span>
							<span class="clickable gear-icon" data-datetime-row="row1" data-context="datetime" data-ticket-row="ticket1"></span>
						</li>
						<li class="datetime-ticket clickable ticket-selected" data-datetime-row="row2" data-context="ticket-datetime" data-ticket-row="ticketrow2">
							<input type="checkbox" name="ticket_datetime[row2][ticketrow2]" id="datetime-ticket-checkbox-row2-ticketrow2" value="1">
							<span class="ticket-list-ticket-name">Sept 10 - 1pm - 2pm</span>
							<span class="clickable gear-icon" data-datetime-row="row2" data-context="datetime" data-ticket-row="ticket1"></span>
						</li>
					</ul>
					<input type="checkbox" name="edit_tickets[ticketrow2][TKT_is_default]" id="edit-ticket-TKT_is_default">
					<label for="edit-ticket-TKT_is_default">use this new ticket as a default ticket for any new events</label>
					<div class="save-cancel-button-container"><button class="button-primary ee-save-button" data-context="ticket" data-ticket-row="ticketrow2">Save Ticket</button><button class="button-secondary ee-cancel-button" data-context="ticket">Cancel</button></div>
				</fieldset>
			</td>
		</tr>
	</table>
</div>
<div class="save-cancel-button-container"><button class="button-secondary ee-add-new-ticket-button">Create New Ticket</button></div>
