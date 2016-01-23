<div id="event-and-ticket-form-content">
	<h3 class="event-tickets-datetimes-title">Event Datetimes</h3>

	<div class="event-datetimes-container">
		
		<!-- these are the ids for the current displayed datetimes (on create new this is blank -->
		<input type="hidden" name="datetime_IDs" id="datetime-IDs" value="">

		<!-- this is used by js to calculate what the next datetime row will be and is incremented when a new datetime is "saved". -->
		<input type="hidden" name="datetime_total_rows" id="datetime-total-rows" value="0">
		
	</div>
	<div id="add-event-datetime" class="event-datetime-row add-dtt-row">
		<h4 class="datetime-tickets-heading">Add New Datetime</h4><!-- <a href="#" class="help_img">Help Link</a> -->
		<table id="add-new-event-datetime-table" class="datetime-edit-table">
			<tr>
				<td class="event-datetime-column date-column">
					<label for="add-new-event-datetime-DTT_EVT_start">Event Start</label>
					<input type="text" name="add_new_datetime[DTT_EVT_start]" id="add-new-event-datetime-DTT_EVT_start" class="ee-text-inp ee-datepicker" data-context="start-dtt" data-date-field-context="#add-event-datetime" data-related-field="#add-new-event-datetime-DTT_EVT_end" data-next-field="#add-new-event-datetime-DTT_EVT_start">
				</td>
				<td class="event-datetime-column date-column">
					<label for="add-new-event-datetime-DTT_EVT_end">Event End</label>
					<input type="text" name="add_new_datetime[DTT_EVT_end]" id="add-new-event-datetime-DTT_EVT_end" class="ee-text-inp ee-datepicker" data-context="end-dtt" data-date-field-context="#add-event-datetime" data-related-field="#add-new-event-datetime-DTT_EVT_start" data-next-field="#add-new-event-datetime-DTT_reg_limit">
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
	<div class="event-tickets-container" style="display:none">
		<h3 class="event-tickets-datetimes-title">Available Tickets</h3>
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
				<tr valign="top" class="ticket-row" id="display-ticketrow-1">
					<td></td>
					<td><span class="ticket-display-row-TKT_name">Free Admission</span></td>
					<td><span class="ticket-display-row-TKT_start_date"></span></td>
					<td><span class="ticket-display-row-TKT_end_date"></span></td>
					<td><span class="ticket-display-row-TKT_status"></span></td>
					<td><span class="ticket-display-row-TKT_total_amount">$0.00</span></td>
					<td><span class="ticket-display-row-TKT_qty"></span></td>
					<td><span class="ticket-display-row-TKT_sold">0</span></td>
					<td><span class="gear-icon clickable" data-ticket-row="1" data-context="ticket"></span><span class="clone-icon ee-icon ee-icon-clone clickable" data-ticket-row="1" data-context="ticket"><span class="trash-icon dashicons dashicons-post-trash clickable" data-ticket-row="1" data-context="ticket" style="display:none;"></span></span></td>
				</tr>
				<tr id="edit-ticketrow-1" class="edit-ticket-row">
					<td colspan="9">
						<fieldset id="fieldset-edit-ticketrow-1" class="ticket-fieldset" style="display:none">
							<legend>Edit Ticket</legend>
							<input type="hidden" name="edit_tickets[1][TKT_ID]" class="edit-ticket-TKT_ID" value="0">
							<input type="hidden" name="edit_tickets[1][TKT_row]" class="edit-ticket-TKT_row" value="1">
							<input type="text" name="edit_tickets[1][TKT_name]" class="edit-ticket-TKT_name ee-large-text-inp" placeholder="Ticket Title" value="Free Admission">
							<div class="total-price-container">Total Final Price: <span class="ticket-price-amount">$0.00</span></div>
							<textarea name="edit_tickets[1][TKT_description]" class="edit-ticket-TKT_description ee-full-textarea-inp" placeholder="Ticket Description"></textarea>
							<div class="basic-ticket-container">
								<h4 class="tickets-heading">Ticket Details</h4>
								<table class="basic-ticket-info">
									<thead>
										<tr valign="bottom">
											<td colspan="2">Goes on Sale</td>
											<td colspan="2">Sell Until</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td colspan="2"><input type="text" name="edit_tickets[1][TKT_start_date]" class="edit-ticket-TKT_start_date ee-text-inp ee-datepicker" value="" data-context="start-ticket" data-date-field-context="#edit-ticketrow-1" data-related-field=".edit-ticket-TKT_end_date" data-next-field=".edit-ticket-TKT_end_date"></td>
											<td colspan="2"><input type="text" name="edit_tickets[1][TKT_end_date]" class="edit-ticket-TKT_end_date ee-text-inp ee-datepicker" value="" data-context="end-ticket" data-date-field-context="#edit-ticketrow-1" data-related-field=".edit-ticket-TKT_start_date" data-next-field=".edit-ticket-TKT_qty"></td>
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
											<td><input type="text" class="edit-ticket-TKT_qty ee-small-text-inp" name="edit_tickets[1][TKT_qty]" value=""></td>
											<td><input type="text" class="edit-ticket-TKT_uses ee-small-text-inp" name="edit_tickets[1][TKT_uses]"></td>
											<td><input type="text" class="edit-ticket-TKT_min ee-small-text-inp" name="edit_tickets[1][TKT_min]"></td>
											<td><input type="text" class="edit-ticket-TKT_max ee-small-text-inp" name="edit_tickets[1[TKT_max]"></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="price-table-container">
								<h4 class="tickets-heading">Base Ticket Price and Price Modifiers</h4>
								<table class="price-table">
									<thead>
										<tr>
											<td>Price Type</td>
											<td>Name</td>
											<td></td>
											<td>Amount</td>
											<td></td>
										</tr>
									</thead>
									<tbody class="ticket-price-rows">
										<tr id="price-row-1-1" class="ee-active-price">
											<td>
												<input type="hidden" name="edit_prices[1][1][PRT_ID]" class="edit-price-PRT_ID" value="1">
												<span class="price-type-text">Base Price</span>
												<input type="hidden" name="ee_price_selected_operator[1][1]" class="ee-price-selected-operator" value="+">
												<input type="hidden" name="ee_price_selected_operator[1][1]" class="ee-price-selected-is-percent" value="0">
											</td>
											<td><input type="hidden" name="edit_prices[1][1][PRC_ID]" class="edit-price-PRC_ID" value="1"><input type="text" class="edit-price-PRC_name ee-text-inp" name="edit_prices[1][1][PRC_name]" value="Free Admission"></td>
											<td>
												<span class="ticket-price-info-display ticket-price-plus-minus" style="display:none">+/-</span>
												<span class="ticket-price-info-display ticket-price-plus" style="display:none;">+</span>
												<span class="ticket-price-info-display ticket-price-minus" style="display:none;">-</span>
												<span class="ticket-price-info-display ticket-price-dollar-sign-display">$</span>
											</td>
											<td>
												<input type="text" size="1" class="edit-price-PRC_amount ee-small-text-inp" name="edit_prices[1][1][PRC_amount]" value="0">
												<span class="ticket-price-info-display ticket-price-percentage-char-display" style="display:none">%</span>
											</td>
											<td><span class="gear-icon clickable" data-ticket-row="1" data-context="price" data-price-row="1"></span><span class="trash-icon dashicons dashicons-post-trash clickable" data-ticket-row="1" data-context="price" data-price-row="1" style="display:none"></span><button data-ticket-row="1" data-price-row="1" data-context="price" class="ee-create-button"><strong>+</strong></button></td>
										</tr>
										<tr id="extra-price-row-1-1">
											<td colspan="5">
												<section class="extra-price-row" style="display:none">
													<textarea name="edit_prices[1][1][PRT_description]" class="edit-price-PRC_desc ee-full-textarea-inp" placeholder="Edit the description for the price here">This is a free admission ticket</textarea>
												</section>
											</td>
										</tr>
									</tbody>
									<tfoot>
										<tr class="price-total-row">
											<td colspan="3">Total</td>
											<td><input type="hidden" name="edit_tickets[1][TKT_price]" class="edit-tickets-TKT_price" value="0"><span id="price-total-amount-1">$0.00</span</td>
											<td><input type="hidden" name="price_total_rows_ticket1" id="price-total-rows-1" value="1"></td>
										</tr>
									</tfoot>
								</table>
							</div>
							<div style="clear:both"></div>
							<h4 class="tickets-heading">Event Datetimes</h4>
							<p>This ticket will be usable (allow entrance) for the following selected event datetimes (click to select):</p>
							<ul class="datetime-tickets-list">
								<li class="hidden"></li>
							</ul>
							<div class="save-cancel-button-container"><label for="edit-ticket-TKT_is_default_selector">use this new ticket as a default ticket for any new events</label>  <input type="checkbox" name="edit_tickets[1][TKT_is_default_selector]" class="edit-ticket-TKT_is_default_selector"> 
							<input type="hidden" name="edit_tickets[1][TKT_is_default]" class="edit-ticket-TKT_is_default" value=""> 
							<button class="button-primary ee-save-button" data-context="ticket" data-ticket-row="1">Save Ticket</button><button class="button-secondary ee-cancel-button" data-context="ticket" data-ticket-row="1">Cancel</button></div>
							<!-- these hidden inputs are for tracking changes in dtts attached to tickets during a js session -->
							<input type="hidden" name="starting_ticket_datetime_IDs[1]" id="starting-ticket-datetime-ids-1" value="" class="starting-ticket-datetime-ids">
							<input type="hidden" name="ticket_datetime_IDs" class="ticket-datetime-ids" id="ticket-datetime-ids-1" value="">

							<!-- these hidden inputs are for tracking changes in prices attached to tickets during a js session, note we only ADD actual price ids to this list.  It only gets updated after a autosave (or manual update)-->
						<input type="hidden" name="ticket_price_ids[1][]" id="ticket-price-ids-1" class="ticket-price-ids" value="1">
						<input type="hidden" name="edit_tickets[1][TTM_ID]" class="ticket-template-id" value="0">

						</fieldset>
					</td>
				</tr>
			</tbody>
		</table>

		<input type="hidden" name="ticket_IDs" id="ticket-IDs" value="">
		<input type="hidden" name="ticket_total_rows" id="ticket-total-rows" value="1">
		<div class="save-cancel-button-container"><button class="button-secondary ee-create-button" data-context="ticket">Create New Ticket</button></div>
	</div>
	<div style="clear:both"></div>



	<!-- Below are the various templates that our javascript will use for generating new rows on the fly -->
	
	<!-- main new dtt row container -->
	<div id="edit-datetime-form-container-holder">
		<div id="event-datetime-DTTNUM" class="event-datetime-row edit-dtt-row"></div>
	</div>

	<!-- edit datetime base form -->
	<div id="edit-datetime-form-holder" class="hidden">
		<section id="edit-event-datetime-DTTNUM" class="datetime-edit" style="display:none">
			<input type="hidden" name="edit_event_datetimes[DTTNUM][DTT_ID]" id="event-datetime-DTT_ID-DTTNUM" class="event-datetime-DTT_ID" value="15">
			<table id="edit-event-datetime-table-DTTNUM" class="datetime-edit-table">
				<tr>
					<td class="event-datetime-column date-column">
						<label for="event-datetime-DTT_EVT_start-DTTNUM">Event Start</label>
						<input type="text" name="edit_event_datetimes[DTTNUM][DTT_EVT_start]" id="event-datetime-DTT_EVT_start-DTTNUM" class="ee-text-inp event-datetime-DTT_EVT_start ee-datepicker"  data-context="start-dtt" data-date-field-context="#edit-event-datetime-DTTNUM" data-related-field=".event-datetime-DTT_EVT_end" data-next-field=".event-datetime-DTT_EVT_end">
					</td>
					<td class="event-datetime-column date-column">
						<label for="event-datetime-DTT_EVT_end-DTTNUM">Event End</label>
						<input type="text" name="edit_event_datetimes[DTTNUM][DTT_EVT_end]" id="event-datetime-DTT_EVT_end-DTTNUM" class="ee-text-inp event-datetime-DTT_EVT_end ee-datepicker"  data-context="end-dtt" data-date-field-context="#edit-event-datetime-DTTNUM" data-related-field=".event-datetime-DTT_EVT_start" data-next-field=".event-datetime-DTT_reg_limit">
					</td>
					<td class="event-datetime-column small-txt-column">
						<label for="event-datetime-DTT_reg_limit-DTTNUM">Reg Limit</label>
						<input type="text" name="edit_event_datetimes[DTTNUM][DTT_reg_limit]" id="event-datetime-DTT_reg_limit-DTTNUM" class="ee-small-text-inp event-datetime-DTT_reg_limit">
					</td>
					<td class="event-datetime-column button-column">
						<button data-datetime-row="DTTNUM"  data-context="datetime" class="button-primary ee-save-button">
							Save Datetime
						</button>
						<button data-datetime-row="DTTNUM" data-context="datetime" class="button-secondary ee-cancel-button">
							Cancel
						</button>
					</td>
				</tr>
			</table>
		</section>
	</div>


	<!-- retrieved by js to set a new ticket row -->
	<table id="ticket-row-form-holder" class="hidden">
		<tbody>
			<tr valign="top" class="ticket-row" id="display-ticketrow-TICKETNUM">
				<td></td>
				<td><span class="ticket-display-row-TKT_name"></span></td>
				<td><span class="ticket-display-row-TKT_start_date"></span></td>
				<td><span class="ticket-display-row-TKT_end_date"></span></td>
				<td><span class="ticket-display-row-TKT_status"></span></td>
				<td><span class="ticket-display-row-TKT_total_amount"></span></td>
				<td><span class="ticket-display-row-TKT_qty"></span></td>
				<td><span class="ticket-display-row-TKT_sold">0</span></td>
				<td><span class="gear-icon clickable" data-ticket-row="TICKETNUM" data-context="ticket"></span><span class="clone-icon clickable" data-ticket-row="TICKETNUM" data-context="ticket"></span><span class="trash-icon dashicons dashicons-post-trash clickable" data-ticket-row="TICKETNUM" data-context="ticket"></span></td>
			</tr>
			<tr id="edit-ticketrow-TICKETNUM" class="edit-ticket-row">
				<td colspan="9">
					<fieldset id="fieldset-edit-ticketrow-TICKETNUM" class="ticket-fieldset" style="display:none">
						<legend>Edit Ticket</legend>
						<input type="hidden" name="edit_tickets[TICKETNUM][TKT_ID]" class="edit-ticket-TKT_ID" value="0">
						<input type="hidden" name="edit_tickets[TICKETNUM][TKT_row]" class="edit-ticket-TKT_row" value="TICKETNUM">
						<input type="text" name="edit_tickets[TICKETNUM][TKT_name]" class="edit-ticket-TKT_name ee-large-text-inp" placeholder="Ticket Title" value="General Admission">
						<div class="total-price-container">Total Final Price: <span class="ticket-price-amount">$0.00</span></div>
						<textarea name="edit_tickets[TICKETNUM][TKT_description]" class="edit-ticket-TKT_description ee-full-textarea-inp" placeholder="Ticket Description"></textarea>
						<div class="basic-ticket-container">
							<h4 class="tickets-heading">Ticket Details</h4>
							<table class="basic-ticket-info">
								<thead>
									<tr valign="bottom">
										<td colspan="2">Goes on Sale</td>
										<td colspan="2">Sell Until</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td colspan="2"><input type="text" name="edit_tickets[TICKETNUM][TKT_start_date]" class="edit-ticket-TKT_start_date ee-text-inp ee-datepicker" value="" data-context="start-ticket" data-date-field-context="#edit-ticketrow-TICKETNUM" data-related-field=".edit-ticket-TKT_end_date" data-next-field=".edit-ticket-TKT_end_date"></td>
										<td colspan="2"><input type="text" name="edit_tickets[TICKETNUM][TKT_end_date]" class="edit-ticket-TKT_end_date ee-text-inp ee-datepicker" value="" data-context="end-ticket" data-date-field-context="#edit-ticketrow-TICKETNUM" data-related-field=".edit-ticket-TKT_start_date" data-next-field=".edit-ticket-TKT_qty"></td>
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
										<td><input type="text" class="edit-ticket-TKT_qty ee-small-text-inp" name="edit_tickets[TICKETNUM][TKT_qty]" value=""></td>
										<td><input type="text" class="edit-ticket-TKT_uses ee-small-text-inp" name="edit_tickets[TICKETNUM][TKT_uses]"></td>
										<td><input type="text" class="edit-ticket-TKT_min ee-small-text-inp" name="edit_tickets[TICKETNUM][TKT_min]"></td>
										<td><input type="text" class="edit-ticket-TKT_max ee-small-text-inp" name="edit_tickets[TICKETNUM[TKT_max]"></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="price-table-container">
							<h4 class="tickets-heading">Base Ticket Price and Price Modifiers</h4>
							<table class="price-table">
								<thead>
									<tr>
										<td>Price Type</td>
										<td>Name</td>
										<td></td>
										<td>Amount</td>
										<td></td>
									</tr>
								</thead>
								<tbody class="ticket-price-rows">
									<tr class="hidden"><td colspan="4"></td></tr>
								</tbody>
								<tfoot>
									<tr class="price-total-row">
										<td colspan="3">Total</td>
										<td><span id="price-total-amount-TICKETNUM">$0.00</span</td>
										<td><input type="hidden" name="price_total_rows_ticket[TICKETNUM]" id="price-total-rows-TICKETNUM" value="1"></td>
									</tr>
								</tfoot>
							</table>
						</div>
						<div style="clear:both"></div>
						<h4 class="tickets-heading">Event Datetimes</h4>
						<p>This ticket will be usable (allow entrance) for the following selected event datetimes (click to select):</p>
						<ul class="datetime-tickets-list">
							<li class="hidden"></li>
						</ul>
						<div class="save-cancel-button-container">
							<label for="edit-ticket-TKT_is_default_selector">use this new ticket as a default ticket for any new events</label>  <input type="checkbox" name="edit_tickets[TICKETNUM][TKT_is_default_selector]" class="edit-ticket-TKT_is_default_selector">
							<input type="hidden" name="edit_tickets[1][TKT_is_default]" class="edit-ticket-TKT_is_default" value=""> 
							<button class="button-primary ee-save-button" data-context="ticket" data-ticket-row="TICKETNUM">Save Ticket</button><button class="button-secondary ee-cancel-button" data-context="ticket" data-ticket-row="TICKETNUM">Cancel</button>
						</div>
						<!-- these hidden inputs are for tracking changes in dtts attached to tickets during a js session -->
						<input type="hidden" name="starting_ticket_datetime_IDs[TICKETNUM][]" id="starting-ticket-datetime-ids-TICKETNUM" value="" class="starting-ticket-datetime-ids">
						<input type="hidden" name="ticket_datetime_IDs[TICKETNUM][]" class="ticket-datetime-ids" id="ticket-datetime-ids-TICKETNUM" value="">

						<!-- these hidden inputs are for tracking changes in prices attached to tickets during a js session -->
						<input type="hidden" name="ticket_price_ids[TICKETNUM][]" id="ticket-price-ids-TICKETNUM" class="ticket-price-ids">
						<input type="hidden" name="edit_tickets[TICKETNUM][TTM_ID]" class="ticket-template-id" value="0">
					</fieldset>
				</td>
			</tr>
		</tbody>
	</table>

	
	<!-- this is retrieved by our js to set a new price row. Note this will also contain any default prices setup by event manager -->
	<table id="ticket-edit-row-initial-price-row" class="hidden">
		<tbody>
			<tr id="price-row-TICKETNUM-PRICENUM" class="ee-active-price">
				<td>
					<input type="hidden" name="edit_prices[TICKETNUM][PRICENUM][PRT_ID]" class="edit-price-PRT_ID" value="1">
					<span class="price-type-text">Base Price</span>
					<input type="hidden" name="ee_price_selected_operator[TICKETNUM][PRICENUM]" class="ee-price-selected-operator" value="+">
					<input type="hidden" name="ee_price_selected_operator[TICKETNUM][PRICENUM]" class="ee-price-selected-is-percent" value="0">
				</td>
				<td>
					<input type="hidden" name="edit_prices[TICKETNUM][PRICENUM][PRC_ID]" class="edit-price-PRC_ID">
					<input type="hidden" name="edit_prices[TICKETNUM][PRICENUM][PRC_is_default]" class="edit-price-PRC_is_default">
					<input type="text" class="edit-price-PRC_name ee-text-inp" name="edit_prices[TICKETNUM][PRICENUM][PRC_name]" value="General Admission"></td>
				<td>
					<span class="ticket-price-info-display ticket-price-plus-minus">+/-</span>
					<span class="ticket-price-info-display ticket-price-plus" style="display:none;">+</span>
					<span class="ticket-price-info-display ticket-price-minus" style="display:none;">-</span>
					<span class="ticket-price-info-display ticket-price-dollar-sign-display" style="display:none">$</span>
				</td>
				<td>
					<input type="text" size="1" class="edit-price-PRC_amount ee-small-text-inp" name="edit_prices[TICKETNUM][PRICENUM][PRC_amount]" value="50">
					<span class="ticket-price-info-display ticket-price-percentage-char-display" style="display:none">%</span>
				</td>
				<td><span class="gear-icon clickable" data-ticket-row="TICKETNUM" data-context="price" data-price-row="PRICENUM"></span><span class="trash-icon dashicons dashicons-post-trash clickable" data-ticket-row="TICKETNUM" data-context="price" data-price-row="PRICENUM" style="display:none"></span><button data-ticket-row="TICKETNUM" data-price-row="PRICENUM" data-context="price" class="ee-create-button"><strong>+</strong></button></td>
			</tr>
			<tr id="extra-price-row-TICKETNUM-PRICENUM">
				<td colspan="5">
					<section class="extra-price-row" style="display:none">
						<textarea name="edit_prices[TICKETNUM][PRICENUM][PRT_description]" class="edit-price-PRC_desc ee-full-textarea-inp" placeholder="Edit the description for the price here"></textarea>
					</section>
				</td>
			</tr>
		</tbody>
	</table>


	<!-- This is the selector and it ONLY lists price-modifiers (i.e. PBT_ID = 2 || 3).  It is used for new price rows added for EXISTING tickets (not new tickets) -->
	<div id="ticket-edit-row-price-modifier-selector" class="hidden">
		<select name="edit_prices[TICKETNUM][PRICENUM][PRT_ID]" class="edit-price-PRT_ID">
			<option value="0">Select Price Modifier</option>
			<option value="3">Discount</option>
			<option value="4">Surcharge</option>
		</select>
		<div class="ee-price-type-option-info hidden">
			<section id="price-option-3">
				<span class="ee-price-operator hidden">-</span><span class="ee-PRT_is_percent hidden">1</span>
			</section>
			<section id="price-option-4">
				<span class="ee-price-operator hidden">+</span><span class="ee-PRT_is_percent hidden">0</span>
			</section>
		</div>
		<input type="hidden" name="ee_price_selected[TICKETNUM][PRICENUM]" class="ee-price-selected-operator" value="-">
		<input type="hidden" name="ee_price_selected[TICKETNUM][PRICENUM]" class="ee-price-selected-is-percent" value="0">
	</div>

	<!-- available tickets for datetime html -->
	<div id="edit-datetime-available-tickets-holder" class="hidden">
		<section id="edit-event-datetime-tickets-DTTNUM" class="datetime-tickets-edit" style="display:none">
			<h4 class="datetime-tickets-heading">Assigned Tickets</h4>

			<ul class="datetime-tickets-list">
				<li class="hidden"></li>
			</ul>
			
			
			<div class="add-datetime-ticket-container">
				<h5 class="datetime-tickets-heading">Add New Ticket</h5><!-- <a href="#" class="help_img">Help Link</a> -->
				<table class="add-new-ticket-table">
					<thead>
						<tr valign="top">
							<td>Ticket Name</td>
							<td>Sale Starts</td>
							<td>Sell Until</td>
							<td>Price</td>
							<td>Qty</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						<tr valign="top" class="add-new-ticket-shortcut-row">
							<td>
								<input type="text" name="add_new_ticket[TKT_name]" class="add-new-ticket-TKT_name">
							</td>
							<td>
								<input type="text" name="add_new_ticket[TKT_start_date]" class="add-new-ticket-TKT_start_date ee-datepicker" data-context="start-ticket" data-date-field-context="#edit-event-datetime-tickets-DTTNUM" data-related-field=".add-new-ticket-TKT_end_date" data-next-field=".add-new-ticket-TKT_end_date">
							</td>
							<td>
								<input type="text" name="add_new_ticket[TKT_end_date]" class="add-new-ticket-TKT_end_date ee-datepicker" data-context="end-ticket" data-date-field-context="#edit-event-datetime-tickets-DTTNUM" data-related-field=".add-new-ticket-TKT_start_date" data-next-field=".add-new-ticket-PRC_amount">
							</td>
							<td>	
								<input type="text" name="add_new_ticket[PRC_amount]" class="add-new-ticket-PRC_amount" size="1">
							</td>
							<td>
								<input type="text" name="add_new_ticket[TKT_qty]" class="add-new-ticket-TKT_qty" size="1">
							</td>
							<td>
								<span class="clickable gear-icon add-edit" data-context="short-ticket" data-datetime-row="DTTNUM" style="display:none"></span>
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
					<button data-context="short-ticket" data-datetime-row="DTTNUM" class="button-secondary ee-cancel-button add-edit">
						Cancel
					</button>
				</div>
				<div style="clear:both"></div>
			</div>
		</section>
	</div>


	<!-- new datetime display content -->
	<div id="dtt_new_display_row_holder" class="hidden">
		<section id="display-event-datetime-DTTNUM" class="datetime-summary">
			<span class="datetime-title"></span><span class="gear-icon clickable" data-datetime-row="DTTNUM" data-context="datetime"></span><span data-datetime-row="DTTNUM"  data-context="datetime" class="ticket-icon ee-icon ee-icon-tickets clickable"></span><span  data-context="datetime" data-datetime-row="DTTNUM" class="clone-icon ee-icon ee-icon-clone clickable"></span><span  data-context="datetime" data-datetime-row="DTTNUM" class="trash-icon dashicons dashicons-post-trash clickable"></span><span  data-context="datetime" data-datetime-row="DTTNUM" class="datetime-tickets-sold">Total Tickets Sold: 0</span>
		</section>
		<div style="clear:both;"></div>
	</div>


	<!-- this will always have existing tickets listed here.  When we create a new ticket they get added to this container so that if a new datetime is created it just pulls from here. -->
	<ul id="dtt-existing-available-ticket-list-items-holder" class="hidden datetime-tickets-list">
		<!-- on brand new events this will hold the default ticket(s) -->
		<li data-datetime-row="DTTNUM" data-context="datetime-ticket" data-ticket-row="1" class="datetime-ticket clickable">
			<input type="checkbox" name="datetime_ticket[DTTNUM][1]" class="datetime-ticket-checkbox" value="1">
			<span class="ticket-list-ticket-name">Free Admission: 0</span>
			<span class="clickable gear-icon" data-datetime-row="DTTNUM" data-context="datetime-ticket" data-ticket-row="1"></span>
		</li>
	</ul>
	

	<!-- same as above except for dtts -->
	<ul id="dtt-existing-available-datetime-list-items-holder" class="hidden datetime-tickets-list">
		<!-- on brand new events this is empty -->
		<li class="hidden"></li>
	</ul>

	<!-- single list item for a new available ticket created from a datetime -->
	<ul id="dtt-new-available-ticket-list-items-holder" class="hidden">
		<li data-datetime-row="DTTNUM" data-context="datetime-ticket" data-ticket-row="TICKETNUM" class="datetime-ticket clickable">
			<input type="checkbox" name="datetime_ticket[DTTNUM][TICKETNUM]" class="datetime-ticket-checkbox" value="1">
			<span class="ticket-list-ticket-name">TKTNAME</span>
			<span class="clickable gear-icon" data-datetime-row="DTTNUM" data-context="datetime-ticket" data-ticket-row="TICKETNUM"></span>
		</li>
	</ul>


	<!-- single list item for a new available datetime to add to our available ticket rows -->
	<ul id="dtt-new-available-datetime-list-items-holder" class="hidden">
		<li class="datetime-ticket clickable" data-datetime-row="DTTNUM" data-context="ticket-datetime" data-ticket-row="TICKETNUM">
			<input type="checkbox" name="ticket_datetime[DTTNUM][TICKETNUM]" class="datetime-ticket-checkbox" value="1">
			<span class="ticket-list-ticket-name">DTTDATE</span>
			<span class="clickable gear-icon" data-datetime-row="DTTNUM" data-context="ticket-datetime" data-ticket-row="TICKETNUM"></span>
		</li>
	</ul>
</div>