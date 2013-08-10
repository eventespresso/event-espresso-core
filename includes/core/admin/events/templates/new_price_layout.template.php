<h3>EventDatetimes</h3>

<div class="event-datetimes-container">
	<div id="event-datetime-row1">
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
		</section>
	</div>
	<div id="event-datetime-row2">
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
	<!-- TODO continue on here (the next item for the skeleton is the add datetime form ) -->
</div>
