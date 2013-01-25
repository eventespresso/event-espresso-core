
	<h4 class="event-list-reg-link-title"><span class="section-title"><?php _e( 'Ticket Options', 'event_espresso' ); ?></span></h4>

		<input type="hidden"
					name="tkt-slctr-event-id"
					value="<?php echo $event_id; ?>"
			/>
		
		<?php
		foreach ($meta_keys as $key=>$meta_key) {
		?>
			<input type="hidden"
						name="tkt-slctr-meta-keys-<?php echo $event_id ?>[<?php echo $key; ?>]"
						value="<?php echo $meta_key; ?>"
				/>
		<?php
		}
		
		foreach ($meta_values as $key=>$meta_value) {
		?>
		<input type="hidden"
					name="tkt-slctr-meta-values-<?php echo $event_id ?>[<?php echo $key; ?>]"
					value="<?php echo $meta_value; ?>"
			/>
		<?php
		}
		?>

		<input type="hidden"
					id="tkt-slctr-max-atndz-<?php echo $event_id ?>"
					name="tkt-slctr-max-atndz-<?php echo $event_id ?>"
					value="<?php echo $max_atndz; ?>"
			/>	
				
		<input type="hidden"
					name="tkt-slctr-event-name-<?php echo $event_id ?>"
					value="<?php echo $event_name; ?>"
			/>

		<input type="hidden"
					name="tkt-slctr-return-url-<?php echo $event_id ?>"
					value="<?php echo $_SERVER['REQUEST_URI']?>"
			/>

		<input type="hidden"
					name="tkt-slctr-pre-approval-<?php echo $event_id ?>"
					value="<?php echo $require_pre_approval; ?>"
			/>
	
		<table id="tkt-slctr-tbl-<?php echo $event_id; ?>" class="tkt-slctr-tbl" border="1" cellspacing="0" cellpadding="0">		
			<thead>
				<tr>
					<th scope="col" width="18%"><?php _e( 'Date', 'event_espresso' ); ?></th>
					<th scope="col" width="24%"><?php _e( 'Time', 'event_espresso' ); ?></th>
					<th scope="col" width="50%"><?php _e( 'Ticket Price', 'event_espresso' ); ?></th>
					<th scope="col" width="8%"><?php _e( 'Qty', 'event_espresso' ); ?></th>
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
							<option value="<?php echo $key; ?>"><?php echo $price['option']; ?></option>
						<?php } ?>	
						</select>
						<?php } else { 
										foreach ( $prices as $price['option'] ) { 
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
							<span class="ui-icon ui-icon-plus"></span><?php _e( 'click here to add another row to the Ticket Options table', 'event_espresso' ); ?>
						</a>
					</td>
				</tr>			
			</tfoot>
			
		</table>				
		