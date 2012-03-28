<div id="event-list-reg-link-div-<?php echo $event_id ?>" class="event-list-reg-link-dv">

	<h4 class="event-list-reg-link-title"><span class="section-title">Ticket Options</span></h4>

	<form id="event-list-reg-link-form-<?php echo $event_id ?>" action="<?php echo $reg_href; ?>" method="post">

		<input type="hidden"
					name="event-list-reg-link-event-id"
					value="<?php echo $event_id ?>"
			/>		

		<input type="hidden"
					id="event-list-reg-link-nmbr-attndees-<?php echo $event_id ?>"
					name="event-list-reg-link-nmbr-attndees"
					value="1"
			/>	
				
		<input type="hidden"
					name="event-list-reg-link-event-name"
					value="<?php echo $event_name ?>"
			/>

		<input type="hidden"
					name="event-list-reg-link-return-url"
					value="<?php echo $_SERVER['REQUEST_URI']?>"
			/>

		<input type="hidden"
					name="event-list-ticket-selector-table-rows"
					value="1"
			/>


			
		<table id="event-list-ticket-selector-tbl-<?php echo $event_id ?>" class="event-list-ticket-selector-tbl" border="1" cellspacing="0" cellpadding="0">		
			<thead>
				<tr>
					<th scope="col">Date</th>
					<th scope="col">Time</th>
					<th scope="col">Price</th>
					<th scope="col">Qty</th>
				</tr>
			</thead>
			
			<tbody>
				<tr>
				
					<td>
						<?php
							 foreach ( $dates as $date ) { 
								echo date_i18n( 'D M jS', strtotime( $date )); 
							}
						?>
					</td>
					
					<td>
						<?php //echo pre_arr($times);?>
						<?php if ( $multiple_time_options ) { ?>
						<select name="time-slct-<?php echo $event_id ?>-1" id="ticket-selector-tbl-time-slct-<?php echo $event_id ?>" class="ticket-selector-tbl-time-slct ui-widget-content ui-corner-all">
						<?php foreach ( $times as $time ) { ?>
							<option value="<?php echo $time['start_time']; ?>"><?php echo $time['formatted']; ?></option>
						<?php } ?>	
						</select>
						<?php } else { 
										foreach ( $times as $time ) { 
											echo $time['formatted']; 
										}
									 } 
							?>
					</td>
					
					<td>
						<?php if ( $multiple_price_options ) { ?>
						<select name="price-slct-<?php echo $event_id ?>-1" id="ticket-selector-tbl-price-slct-<?php echo $event_id ?>" class="ticket-selector-tbl-price-slct ui-widget-content ui-corner-all">
						<?php foreach ( $prices as $key => $price ) { ?>
							<option value="<?php echo $key; ?>"><?php echo $price; ?></option>
						<?php } ?>	
						</select>
						<?php } else { 
										foreach ( $prices as $price ) { 
											echo $price; 
										}
									 } 
							?>
					</td>
					
					<td>
						<select name="qty-slct-<?php echo $event_id; ?>-1" id="ticket-selector-tbl-qty-slct-<?php echo $event_id ?>" class="ticket-selector-tbl-qty-slct ui-widget-content ui-corner-all">
						<?php for ($i = 1; $i <= $max_atndz; $i++) { ?>
							<option value="<?php echo $i; ?>">&nbsp;<?php echo $i; ?>&nbsp;&nbsp;&nbsp;</option>
						<?php } ?>
						</select>					
					</td>			
						
				</tr>

				<tr id="event-list-ticket-selector-empty-row-<?php echo $event_id; ?>" class="event-list-ticket-selector-empty-row" style="display:none;">
				
					<td>
						<?php echo $dates; ?>
					</td>
					
					<td>
						<?php //echo pre_arr($times);?>
						<?php if ( $multiple_time_options ) { ?>
						<select name="time-slct-<?php echo $event_id ?>" id="ticket-selector-tbl-time-slct-<?php echo $event_id ?>" class="ticket-selector-tbl-time-slct ui-widget-content ui-corner-all">
						<?php foreach ( $times as $time ) { ?>
							<option value="<?php echo $time['start_time']; ?>"><?php echo $time['formatted']; ?></option>
						<?php } ?>	
						</select>
						<?php } else { ?>
							<?php echo $times['formatted']; ?>
						<?php } ?>
					</td>
					
					<td>
						<?php if ( $multiple_price_options ) { ?>
						<select name="price-slct-<?php echo $event_id ?>" id="ticket-selector-tbl-price-slct-<?php echo $event_id ?>" class="ticket-selector-tbl-price-slct ui-widget-content ui-corner-all">
						<?php foreach ( $prices as $key => $price ) { ?>
							<option value="<?php echo $key; ?>"><?php echo $price; ?></option>
						<?php } ?>	
						</select>
						<?php } else { ?>
							<?php echo $prices; ?>
						<?php } ?>
					</td>
					
					<td>
						<select name="qty-slct-<?php echo $event_id; ?>" id="ticket-selector-tbl-qty-slct-<?php echo $event_id ?>" class="ticket-selector-tbl-qty-slct ui-widget-content ui-corner-all">
						<?php for ($i = 1; $i <= $max_atndz; $i++) { ?>
							<option value="<?php echo $i; ?>">&nbsp;<?php echo $i; ?>&nbsp;&nbsp;&nbsp;</option>
						<?php } ?>
						</select>					
					</td>			
						
				</tr>

			</tbody>
			
			<tfoot class="hidden">
				<tr>
					<td colspan="4">
						<a class="event-list-add-ticket-lnk" rel="event-list-ticket-selector-tbl-<?php echo $event_id ?>">
							<span class="ui-icon ui-icon-plus"></span>click here to add another row to the Ticket Options table
						</a>
					</td>
				</tr>			
			</tfoot>
			
		</table>				
		
		
		<div class="event-more-info-dv clear-float">	
		
			<noscript>
				<input type="submit" 
		 					name="event-list-reg-link-sbmt-btn" 
							class="event-list-reg-link-sbmt-btn ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx" 
							value="<?php _e( $sbmt_btn_text, 'event_espresso' ); ?>"
							role="button"
					/>
			</noscript>
																					
			<a class="event-list-reg-link-btn alt-mer-btn ui-button ui-button-big ui-priority-primary ui-state-default ui-corner-all add-hover-fx" style="display:none;">
				<span class="ui-icon ui-icon-cart"></span>&nbsp;<?php _e( $sbmt_btn_text, 'event_espresso' ); ?>
			</a>

		</div>
						

	</form>
</div>
						