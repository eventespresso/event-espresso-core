<div id="event-and-ticket-form-content">
	<h4 class="event-tickets-datetimes-title">Event Datetimes</h4>

	<div class="event-datetimes-container">
		<div id="event-datetime-row1" class="event-datetime-row">
			<section id="display-event-datetime-row1" class="datetime-summary">
				<span class="datetime-title">September 10,2013 @ 10:00am-2:00pm</span><span class="gear-icon clickable" data-datetime-row="row1" data-context="datetime"></span><span data-datetime-row="row1"  data-context="datetime" class="ticket-icon clickable"></span><span  data-context="datetime" data-datetime-row="row1" class="clone-icon clickable"></span><span  data-context="datetime" data-datetime-row="row1" class="trash-icon clickable"></span><span  data-context="datetime" data-datetime-row="row1" class="datetime-tickets-sold">Total Tickets Sold: 169</span>
			</section>
			<div style="clear:both;"></div>
			<section id="edit-event-datetime-row1" class="datetime-edit">
				<input type="hidden" name="edit_event_datetimes[row1][DTT_ID]" class="event-datetime-DTT_ID" value="15">
				<input type="hidden" name="edit_event_datetimes[row1][DTT_is_primary]" class="event-datetime-DTT_is_primary" value="1">
				<table id="edit-event-datetime-table-row1" class="datetime-edit-table">
					<tr>
						<td class="event-datetime-column date-column">
							<label for="event-datetime-DTT_EVT_start-row1">Event Start</label>
							<input type="text" name="edit_event_datetimes[row1][DTT_EVT_start]" id="event-datetime-DTT_EVT_start-row1" class="ee-text-inp event-datetime-DTT_EVT_start">
						</td>
						<td class="event-datetime-column date-column">
							<label for="event-datetime-DTT_EVT_end-row1">Event End</label>
							<input type="text" name="edit_event_datetimes[row1][DTT_EVT_end]" id="event-datetime-DTT_EVT_end-row1" class="ee-text-inp event-datetime-DTT_EVT_end">
						</td>
						<td class="event-datetime-column small-txt-column">
							<label for="event-datetime-DTT_reg_limit-row1">Reg Limit</label>
							<input type="text" name="edit_event_datetimes[row1][DTT_reg_limit]" id="event-datetime-DTT_reg_limit-row1" class="ee-small-text-inp event-datetime-DTT_reg_limit">
						</td>
						<td class="event-datetime-column button-column">
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
						<input type="checkbox" name="datetime_ticket[row1][ticketrow1]" class="datetime-ticket-checkbox" value="1" checked=checked>
						<span class="ticket-list-ticket-name">General Admission: 152</span>
						<span class="clickable gear-icon" data-datetime-row="row1" data-context="datetime-ticket" data-ticket-row="ticketrow1"></span>
					</li>
					<li data-datetime-row="row1" data-context="datetime-ticket" data-ticket-row="ticket2" class="datetime-ticket clickable ticket-selected">
						<input type="checkbox" name="datetime_ticket[row1][ticketrow2]" class="datetime-ticket-checkbox" value="1" checked=checked>
						<span class="ticket-list-ticket-name">Early Bird: 17</span>
						<span class="clickable gear-icon" date-datetime-row="row1" data-context="datetime-ticket" data-ticket-row="ticket2"></span>
					</li>
				</ul>
				<!-- these hidden inputs track changes in tickets attached to datetimes -->
				<input type="hidden" name="starting_datetime_ticket_IDs" id="starting-datetime-ticket-ids-row1" value="ticketrow1,ticketrow2" class="starting-datetime-ticket-ids">
				<input type="hidden" name="datetime_ticket_ids" class="datetime-ticket-ids" id="datetime-ticket-ids-row1" value="">
				
				<div id="add-new-datetime-ticket-holder-row1">
					<!-- this is the location where jquery brings up the add new ticket form (found in div#add-new-ticket-form-holder) when needed -->
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
			<div style="clear:both;"></div>
			<!-- and you would have the edit and ticket sections here for datetime row 2 but for the purpose of this example we're not adding them (yet). -->
		</div>
		<div id="add-event-datetime" class="event-datetime-row">
			<table id="add-new-event-datetime-table" class="datetime-edit-table">
				<tr>
					<td class="event-datetime-column date-column">
						<label for="add-new-event-datetime-DTT_EVT_start">Event Start</label>
						<input type="text" name="add_new_datetime[DTT_EVT_start]" id="add-new-event-datetime-DTT_EVT_start" class="ee-text-inp">
					</td>
					<td class="event-datetime-column date-column">
						<label for="add-new-event-datetime-DTT_EVT_end">Event End</label>
						<input type="text" name="add_new_datetime[DTT_EVT_end]" id="add-new-event-datetime-DTT_EVT_end" class="ee-text-inp">
					</td>
					<td class="event-datetime-column reg-limit-column">
						<label for="add-new-event-datetime-DTT_reg_limit">Reg Limit</label>
						<input type="text" name="add_new_datetime[DTT_reg_limit]" id="add-new-event-datetime-DTT_reg_limit" class="ee-small-text-inp">
					</td>
					<td class="event-datetime-column button-column">
						<button data-context="datetime" class="button-primary ee-create-button">
							Save Datetime
						</button>
					</td>
				</tr>
			</table>
		</div>
		
		<!-- these are actual dttids that get updated by ajax when a dttid=0 is saved -->
		<input type="hidden" name="datetime_IDs" id="datetime-IDs" value="1,2">

		<!-- this is used by js to calculate what the next datetime row will be and is incremented when a new datetime is "saved". -->
		<input type="hidden" name="datetime_total_rows" id="datetime-total-rows" value="2">
		

	</div>
	<div class="event-tickets-container">
		<h4 class="event-tickets-datetimes-title">Available Tickets</h4>
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
			<tbody>
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
						<fieldset id="edit-ticketrow-ticketrow1" class="ticket-fieldset">
							<legend>Edit Ticket</legend>
							<input type="hidden" name="edit_tickets[ticketrow1][TKT_ID]" class="edit-ticket-TKT_ID">
							<input type="hidden" name="edit_tickets[ticketrow1][TKT_display_order]" class="edit-ticket-TKT_display_order">
							<input type="text" name="edit_tickets[ticketrow1][TKT_name]" class="edit-ticket-TKT_name ee-large-text-inp" placeholder="Ticket Title" value="General Admission">
							<div class="total-price-container">Total Final Price: <span class="ticket-price-amount">$50.00</span></div>
							<textarea name="edit_tickets[ticketrow1][TKT_description]" class="edit-ticket-TKT_description ee-full-textarea-inp" placeholder="Ticket Description"></textarea>
							<div class="basic-ticket-container">
								<h5 class="tickets-heading">Ticket Details</h5>
								<table class="basic-ticket-info">
									<thead>
										<tr valign="bottom">
											<td colspan="2">Goes on Sale</td>
											<td colspan="2">Sell Until</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td colspan="2"><input type="text" name="edit_tickets[ticketrow1][TKT_start_date]" class="edit-ticket-TKT_start_date ee-text-inp" value="August 1, 2013 08:00 am"></td>
											<td colspan="2"><input type="text" name="edit_tickets[ticketrow1][TKT_end_date]" class="edit-ticket-TKT_end_date ee-text-inp" value="September 10, 2013 04:00 pm"></td>
										</tr>
									</tbody>
								</table>
								<table class="basic-ticket-info">
									<thead>
										<tr valign="bottom">
											<td>Quantity</td>
											<td>#Uses</td>
											<td>Min</td>
											<td>Max</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td><input type="text" class="edit-ticket-TKT_qty ee-small-text-inp" name="edit_tickets[ticketrow1][TKT_qty]" value="600"></td>
											<td><input type="text" class="edit-ticket-TKT_uses ee-small-text-inp" name="edit_tickets[ticketrow1][TKT_uses]"></td>
											<td><input type="text" class="edit-ticket-TKT_min ee-small-text-inp" name="edit_tickets[ticketrow1][TKT_min]"></td>
											<td><input type="text" class="edit-ticket-TKT_max ee-small-text-inp" name="edit_tickets[ticketrow1[TKT_max]"></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="price-table-container">
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
									<tbody>
										<tr id="price-row-ticketrow1-pricerow1">
											<td>Event Price</td>
											<td><input type="hidden" name="edit_prices[ticketrow1][pricerow1][PRT_ID]" class="edit-price-PRT_ID"><input type="text" class="edit-price-PRC_name ee-text-inp" name="edit_prices[ticketrow1][pricerow1][PRC_name]" value="General Admission"></td>
											<td><input type="text" size="1" class="edit-price-PRC_amount ee-small-text-inp" name="edit_prices[ticketrow1][pricerow1][PRC_amount]" value="50"></td>
											<td><span class="gear-icon clickable" data-ticket-row="ticketrow1" data-context="price" data-price-row="price-row1"></span><span class="trash-icon clickable" data-ticket-row="ticketrow1" data-context="price" data-price-row="pricerow1"></span></td>
										</tr>
									</tbody>
									<tfoot>
										<tr class="price-total-row">
											<td colspan="2">Total</td>
											<td>$50.00</td>
											<td></td>
										</tr>
									</tfoot>
								</table>
							</div>
							<div style="clear:both"></div>
							<h5 class="tickets-heading">Event Datetimes</h5>
							<p>This ticket will be usable (allow entrance) for the following selected event datetimes (click to select):</p>
							<ul class="datetime-tickets-list">
								<li class="datetime-ticket clickable ticket-selected" data-datetime-row="row1" data-context="ticket-datetime" data-ticket-row="ticketrow1">
									<input type="checkbox" name="ticket_datetime[row1][ticketrow1]" class="datetime-ticket-checkbox" value="1">
									<span class="ticket-list-ticket-name">Sept 10 - 10am - 2pm</span>
									<span class="clickable gear-icon" data-datetime-row="row1" data-context="ticket-datetime" data-ticket-row="ticket1"></span>
								</li>
								<li class="datetime-ticket clickable ticket-selected" data-datetime-row="row2" data-context="ticket-datetime" data-ticket-row="ticketrow1">
									<input type="checkbox" name="ticket_datetime[row2][ticketrow1]" class="datetime-ticket-checkbox" value="1">
									<span class="ticket-list-ticket-name">Sept 11 - 10am - 2pm</span>
									<span class="clickable gear-icon" data-datetime-row="row2" data-context="ticket-datetime" data-ticket-row="ticket1"></span>
								</li>
							</ul>
							<div class="save-cancel-button-container"><label for="edit-ticket-TKT_is_default">use this new ticket as a default ticket for any new events</label>  <input type="checkbox" name="edit_tickets[ticketrow1][TKT_is_default]" id="edit-ticket-TKT_is_default">  
							<button class="button-primary ee-save-button" data-context="ticket" data-ticket-row="ticketrow1">Save Ticket</button><button class="button-secondary ee-cancel-button" data-context="ticket">Cancel</button></div>
							<!-- these hidden inputs are for tracking changes in dtts attached to tickets during a js session -->
							<input type="hidden" name="starting_ticket_datetime_IDs" id="starting-ticket-datetime-ids-ticketrow1" value="row1" class="starting-ticket-datetime-ids">
							<input type="hidden" name="ticket_datetime_IDs" class="ticket-datetime-ids" id="ticket-datetime-ids-ticketrow1" value="">
		
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
						<fieldset id="edit-ticketrow-ticketrow1" class="ticket-fieldset">
							<legend>Edit Ticket</legend>
							<input type="hidden" name="edit_tickets[ticketrow1][TKT_ID]" class="edit-ticket-TKT_ID">
							<input type="hidden" name="edit_tickets[ticketrow1][TKT_display_order]" class="edit-ticket-TKT_display_order">
							<input type="text" name="edit_tickets[ticketrow1][TKT_name]" class="edit-ticket-TKT_name ee-large-text-inp" placeholder="Ticket Title" value="Early Bird Ticket">
							<div class="total-price-container">Total Final Price: <span class="ticket-price-amount">$45.00</span></div>
							<textarea name="edit_tickets[ticketrow1][TKT_description]" class="edit-ticket-TKT_description ee-full-textarea-inp" placeholder="Ticket Description"></textarea>
							<div class="basic-ticket-container">
								<h5 class="tickets-heading">Ticket Details</h5>
								<table class="basic-ticket-info">
									<thead>
										<tr valign="bottom">
											<td colspan="2">Goes on Sale</td>
											<td colspan="2">Sell Until</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td colspan="2"><input type="text" name="edit_tickets[ticketrow1][TKT_start_date]" class="edit-ticket-TKT_start_date ee-text-inp" value="August 1, 2013 08:00 am"></td>
											<td colspan="2"><input type="text" name="edit_tickets[ticketrow1][TKT_end_date]" class="edit-ticket-TKT_end_date ee-text-inp" value="September 10, 2013 04:00 pm"></td>
										</tr>
									</tbody>
									<thead>
										<tr valign="bottom">
											<td>Quantity</td>
											<td>#Uses</td>
											<td>Min</td>
											<td>Max</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td><input type="text" class="edit-ticket-TKT_qty ee-small-text-inp" name="edit_tickets[ticketrow1][TKT_qty]" value="600"></td>
											<td><input type="text" class="edit-ticket-TKT_uses ee-small-text-inp" name="edit_tickets[ticketrow1][TKT_uses]"></td>
											<td><input type="text" class="edit-ticket-TKT_min ee-small-text-inp" name="edit_tickets[ticketrow1][TKT_min]"></td>
											<td><input type="text" class="edit-ticket-TKT_max ee-small-text-inp" name="edit_tickets[ticketrow1[TKT_max]"></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="price-table-container">
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
									<tbody>
										<tr id="price-row-ticketrow1-pricerow1">
											<td>Event Price</td>
											<td><input type="hidden" name="edit_prices[ticketrow1][pricerow1][PRT_ID]" class="edit-price-PRT_ID"><input type="text" class="edit-price-PRC_name ee-text-inp" name="edit_prices[ticketrow1][pricerow1][PRC_name]" value="General Admission"></td>
											<td><input type="text" size="1" class="edit-price-PRC_amount ee-small-text-inp" name="edit_prices[ticketrow1][pricerow1][PRC_amount]" value="50"></td>
											<td><span class="gear-icon clickable" data-ticket-row="ticketrow1" data-context="price" data-price-row="price-row1"></span><span class="trash-icon clickable" data-ticket-row="ticketrow1" data-context="price" data-price-row="pricerow1"></span></td>
										</tr>
										<tr id="price-row-ticketrow1-pricerow2">
											<td>- Discount</td>
											<td><input type="hidden" name="edit_prices[ticketrow1][pricerow2][PRT_ID]" class="edit-price-PRT-ID"><input type="text" class="edit-price-PRC_name ee-text-inp" name="edit_prices[ticketrow1][pricerow2][PRC_name]" value="Early Bird"></td>
											<td><input type="text" size="1" class="edit-price-PRC_amount ee-small-text-inp" name="edit_prices[ticketrow1][pricerow2][PRC_amount]" value="10%"></td>
											<td><span class="gear-icon clickable" data-ticket-row="ticketrow1" data-context="price" data-price-row="price-row2"></span>
											<span class="trash-icon clickable" data-ticket-row="ticketrow1" data-context="price" data-price-row="pricerow2"></span>
											<button class="add-new-price"><strong>+</strong></button></td>
										</tr>
									</tbody>
									<tfoot>
										<tr class="price-total-row">
											<td colspan="2">Total</td>
											<td>$45.00</td>
											<td></td>
										</tr>
									</tfoot>
								</table>
							</div>
							<div style="clear:both"></div>
							<h5 class="tickets-heading">Event Datetimes</h5>
							<p>This ticket will be usable (allow entrance) for the following selected event datetimes (click to select):</p>
							<ul class="datetime-tickets-list">
								<li class="datetime-ticket clickable ticket-selected" data-datetime-row="row1" data-context="ticket-datetime" data-ticket-row="ticketrow1">
									<input type="checkbox" name="ticket_datetime[row1][ticketrow1]" class="datetime-ticket-checkbox" value="1">
									<span class="ticket-list-ticket-name">Sept 10 - 9am - 10am</span>
									<span class="clickable gear-icon" data-datetime-row="row1" data-context="ticket-datetime" data-ticket-row="ticket1"></span>
								</li>
								<li class="datetime-ticket clickable" data-datetime-row="row2" data-context="ticket-datetime" data-ticket-row="ticketrow1">
									<input type="checkbox" name="ticket_datetime[row2][ticketrow1]" class="datetime-ticket-checkbox" value="1">
									<span class="ticket-list-ticket-name">Sept 10 - 1pm - 2pm</span>
									<span class="clickable gear-icon" data-datetime-row="row2" data-context="ticket-datetime" data-ticket-row="ticket1"></span>
								</li>
							</ul>
							<div class="save-cancel-button-container"><label for="edit-ticket-TKT_is_default">use this new ticket as a default ticket for any new events</label>  <input type="checkbox" name="edit_tickets[ticketrow1][TKT_is_default]" id="edit-ticket-TKT_is_default">  
							<button class="button-primary ee-save-button" data-context="ticket" data-ticket-row="ticketrow1">Save Ticket</button><button class="button-secondary ee-cancel-button" data-context="ticket">Cancel</button></div>
						</fieldset>
					</td>
				</tr>
			</tbody>
		</table>

		<input type="hidden" name="ticket_IDs" id="ticket-IDs" value="1,2">
		<input type="hidden" name="ticket_total_rows" id="ticket-total-rows" value="2">
	</div>
	<div class="save-cancel-button-container"><button class="button-secondary ee-add-new-ticket-button">Create New Ticket</button></div>



	<!-- Below are the various templates that our javascript will use for generating new rows on the fly -->

	<!-- edit datetime base form -->
	<div id="edit-datetime-form-holder">
		<section id="edit-event-datetime-DTTNUM" class="datetime-edit">
			<input type="hidden" name="edit_event_datetimes[DTTNUM][DTT_ID]" id="event-datetime-DTT_ID-DTTNUM" class="event-datetime-DTT_ID" value="15">
			<input type="hidden" name="edit_event_datetimes[DTTNUM][DTT_is_primary]" id="event-datetime-DTT_is_primary-DTTNUM" class="event-datetime-DTT_is_primary" value="1">
			<table id="edit-event-datetime-table-DTTNUM" class="datetime-edit-table">
				<tr>
					<td class="event-datetime-column date-column">
						<label for="event-datetime-DTT_EVT_start-DTTNUM">Event Start</label>
						<input type="text" name="edit_event_datetimes[DTTNUM][DTT_EVT_start]" id="event-datetime-DTT_EVT_start_DTTNUM" class="ee-text-inp event-datetime-DTT_EVT_start">
					</td>
					<td class="event-datetime-column date-column">
						<label for="event-datetime-DTT_EVT_end-DTTNUM">Event End</label>
						<input type="text" name="edit_event_datetimes[DTTNUM][DTT_EVT_end]" id="event-datetime-DTT_EVT_end-DTTNUM" class="ee-text-inp event-datetime-DTT_EVT_end">
					</td>
					<td class="event-datetime-column small-txt-column">
						<label for="event-datetime-DTT_reg_limit-DTTNUM">Reg Limit</label>
						<input type="text" name="edit_event_datetimes[DTTNUM][DTT_reg_limit]" id="event-datetime-DTT_reg_limit-DTTNUM" class="ee-small-text-inp event-datetime-DTT_reg_limit">
					</td>
					<td class="event-datetime-column button-column">
						<button data-datetime-row="DTTNUM"  data-context="datetime" class="button-primary ee-save-button">
							Save Datetime
						</button>
					</td>
				</tr>
			</table>
		</section>
	</div>



	<!-- available tickets for datetime html -->
	<div id="edit-datetime-available-tickets-holder">
		<section id="edit-event-datetime-tickets-DTTNUM" class="datetime-tickets-edit">
			<h5 class="datetime-tickets-heading">Assigned Tickets</h5>

			<ul class="datetime-tickets-list">
				<li class="hidden"></li>
			</ul>
			
			<!-- these hidden inputs appear when a ticket is selected and are removed when a ticket is deselected -->
			<!-- <input type="hidden" name="datetime_ticket_IDs[DTTNUM][TICKETNUM]" id="datetime-ticket-id-DTTNUM-TICKETNUM" value="1"> -->
			<!-- here's an example of a row for a ticket that might not have a ticket id yet.  However we can still reference later what ticket it belongs to via the "ticketrow" arraykey -->
			<!-- <input type="hidden" name="datetime_ticket_IDs[row1][ticketrow1]" id="datetime-ticket-id-row1-ticketrow1" value="0"> -->
			
			<div id="add-datetime-ticket-container">
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
					<tbody>
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
								<span class="clickable gear-icon add-edit" data-context="ticket" data-datetime-row="DTTNUM"></span>
								<!-- the "add-edit" class is used by jQuery to indicate we need to retrieve a edit form using the value from the #next-ticket-row hidden input (which in turn is incremented if the new created item is saved). -->
								<!-- Also: when the Add New Ticket form is recalled, jQuery will automatically populate the data-context and data-datetime-row properties on the edit icon and save buttons from the event handler for the datetime being edited. -->
							</td>
						</tr>
					</tbody>
				</table>
				<div class="save-cancel-button-container">
					<!-- note: when the save button is clicked we update the #next-ticket-row hidden input (increment forward) -->
					<button data-context="short-ticket" data-datetime-row="DTTNUM" class="button-primary ee-create-button">
						Save Ticket
					</button>
					<button data-context="short-ticket" class="button-secondary ee-cancel-button add-edit">
						Cancel
					</button>
				</div>
				<div style="clear:both"></div>
			</div>
		</section>
	</div>

	<div id="dtt_new_display_row_holder">
		<section id="display-event-datetime-DTTNUM" class="datetime-summary">
			<span class="datetime-title">September 10, 2013 08:00 am</span><span class="gear-icon clickable" data-datetime-row="DTTNUM" data-context="datetime"></span><span data-datetime-row="DTTNUM"  data-context="datetime" class="ticket-icon clickable"></span><span  data-context="datetime" data-datetime-row="DTTNUM" class="clone-icon clickable"></span><span  data-context="datetime" data-datetime-row="DTTNUM" class="trash-icon clickable"></span><span  data-context="datetime" data-datetime-row="DTTNUM" class="datetime-tickets-sold">Total Tickets Sold: 169</span>
		</section>
		<div style="clear:both;"></div>
	</div>


	<!-- this will always have existing tickets listed here.  When we create a new ticket they get added to this container so that if a new datetime is created it just pulls from here. -->
	<ul id="dtt-existing-available-ticket-list-items-holder" class="hidden">
		<!-- on brand new events this is empty -->
		<li class="hidden"></li>
	</ul>
	

	<!-- same as above except for dtts -->
	<ul id="dtt-existing-available-datetime-list-items-holder" class="hidden">
		<li class="hidden"></li>
	</ul>

	<!-- single list item for a new available ticket created from a datetime -->
	<ul id="dtt-new-available-ticket-list-items-holder">
		<li data-datetime-row="DTTNUM" data-context="datetime-ticket" data-ticket-row="ticket1" class="datetime-ticket ticket-selected clickable">
			<input type="checkbox" name="datetime_ticket[DTTNUM][TICKETNUM]" class="datetime-ticket-checkbox" value="1" checked=checked>
			<span class="ticket-list-ticket-name">General Admission: 152</span>
			<span class="clickable gear-icon" data-datetime-row="DTTNUM" data-context="datetime-ticket" data-ticket-row="TICKETNUM"></span>
		</li>
	</ul>


	<!-- single list item for a new available datetime to add to our available ticket rows -->
	<ul id="dtt-new-available-datetime-list-items-holder">
		<li class="datetime-ticket clickable" data-datetime-row="DTTNUM" data-context="ticket-datetime" data-ticket-row="TICKETNUM">
			<input type="checkbox" name="ticket_datetime[DTTNUM][TICKETNUM]" class="datetime-ticket-checkbox" value="1">
			<span class="ticket-list-ticket-name">DTTDATE</span>
			<span class="clickable gear-icon" data-datetime-row="DTTNUM" data-context="ticket-datetime" data-ticket-row="TICKETNUM"></span>
		</li>
	</ul>
</div>