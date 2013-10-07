
	<h4 id="tkt-slctr-title-h4"><?php _e( 'Ticket Options', 'event_espresso' ); ?></h4>

		<input type="hidden" name="noheader" value="true" />
		
		<input type="hidden" name="tkt-slctr-event-id" value="<?php echo $event_id; ?>" />

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
					<th scope="col" width="21%"><?php _e( 'Dates', 'event_espresso' ); ?></th>
					<th scope="col" width="21%"><?php _e( 'Times', 'event_espresso' ); ?></th>
					<th scope="col" width="50%"><?php _e( 'Available Tickets', 'event_espresso' ); ?></th>
					<th scope="col" width="8%" class="cntr"><?php _e( 'Qty', 'event_espresso' ); ?></th>
				</tr>
			</thead>
			<tbody>
<?php 

			$row = 0;
			$prev_date = '';
			$prev_time = '';

//d( $event );
			
//			foreach ( $tickets as $TKT_ID => $ticket ) {

				//printr( $ticket, '$ticket  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			foreach ( $datetimes as $DTT_ID => $datetime ) {
				foreach ( $datetime->tickets() as $TKT_ID => $ticket ) {
//					global $wpdb;
//					echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//					$datetime = $ticket->get_first_related( 'Datetime' );
//					$DTT_ID = $datetime->ID();
//					$datetime = $ticket->datetimes();
//					d( $datetime );
										
					if ( $row == 0 ) {
						$date_display = $prev_date = $datetime->date_range('D M jS',  __( '<br/>to ', 'event_espresso' ));
					} elseif ( $datetime->date_range('D M jS',  __( '<br/>to ', 'event_espresso' )) == $prev_date ) { 
						// add styling to duplicate dates
						$date_display = '<span class="lt-grey-text">' . $datetime->date_range('D M jS',  __( '<br/>to ', 'event_espresso' )) . '</span>';
					} else {
						$date_display = $prev_date = $datetime->date_range('D M jS',  __( '<br/>to ', 'event_espresso' ));
					}				
						
					if ( $row == 0 ) {
						$time_display = $prev_time = $datetime->start_time('g:ia');
					} elseif ( $datetime->start_time('g:ia') == $prev_time ) { 
						// add styling to duplicate times
						$time_display = '<span class="lt-grey-text">' . $datetime->start_time('g:ia') . '</span>';
					} else {
						$time_display = $prev_time = $datetime->start_time('g:ia');
					}


?>
				<tr>				
					<td class="tckt-slctr-tbl-td-date"><?php echo $date_display; ?></td>
					<td class="tckt-slctr-tbl-td-time"><?php echo $time_display; ?></td>
					<td class="tckt-slctr-tbl-td-desc"><?php echo $ticket->get_pretty('TKT_name') . ' ' . $ticket->get_pretty('TKT_price'); ?></td>	
					<td class="tckt-slctr-tbl-td-qty cntr">
				<?php 
					if ( ! $datetime->sold_out() && $ticket->is_on_sale() && $ticket->available() ) {
						// display submit button since we have tickets availalbe
						add_filter( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true' );
						// if only one attendee is allowed
						if ( $max_atndz > 1 ) { 
				?>
						<select name="tkt-slctr-qty-<?php echo $event_id; ?>[]" id="ticket-selector-tbl-qty-slct-<?php echo $event_id . '-' . $row; ?>" class="ticket-selector-tbl-qty-slct ui-widget-content ui-corner-all">
<?php for ($i = 0; $i <= $max_atndz; $i++) { ?>
							<option value="<?php echo $i; ?>" <?php do_action('AHEE_ticket_selector_option',$event_id,$datetime,$ticket,$i,$max_atndz);?>>&nbsp;<?php echo $i; ?>&nbsp;</option><?php } ?>
						</select>
					<?php 
						} else { 
					?>
						<label>
							<input type="radio" 
										name="tkt-slctr-qty-<?php echo $event_id; ?>" 
										id="ticket-selector-tbl-qty-slct-<?php echo $event_id . '-' . $row; ?>" 
										class="ticket-selector-tbl-qty-slct ui-widget-content ui-corner-all"
										value="<?php echo $row . '-'; ?>1"
										<?php echo $row == 0 ? ' checked="checked"' : ''; ?>
							/>
						</label>
				<?php
						} 
					} else {
						echo '<span class="sold-out">' . __( 'Sold&nbsp;Out', 'event_espresso' ) . '</span>';
					}
				?>											
						<input type="hidden"
									name="tkt-slctr-date-<?php echo $event_id; ?>[]"
									value="<?php echo $datetime->start_date('D M jS'); ?>"
							/>	
						<input type="hidden"
									name="tkt-slctr-time-<?php echo $event_id; ?>[]"
									value="<?php echo $datetime->start_time('g:ia'); ?>"
							/>	
						<input type="hidden"
									name="tkt-slctr-dtt-id-<?php echo $event_id; ?>[]"
									value="<?php echo $DTT_ID; ?>"
							/>	
						<input type="hidden"
									name="tkt-slctr-ticket-price-<?php echo $event_id; ?>[]"
									value="<?php echo $ticket->get('TKT_price'); ?>"
							/>
						<input type="hidden"
									name="tkt-slctr-ticket-id-<?php echo $event_id; ?>[]"
									value="<?php echo $TKT_ID; ?>"
							/>
						<input type="hidden"
									name="tkt-slctr-ticket-desc-<?php echo $event_id; ?>[]"
									value="<?php echo esc_attr( $ticket->get('TKT_name') ); ?>"
							/>
						<input type="hidden"
									name="tkt-slctr-datetime-obj-<?php echo $event_id; ?>[]"
									value="<?php echo base64_encode( serialize( $datetime )); ?>"
							/>
						<input type="hidden"
									name="tkt-slctr-ticket-obj-<?php echo $event_id; ?>[]"
									value="<?php echo base64_encode( serialize( $ticket )); ?>"
							/>

					</td>
				</tr>
<?php
							$row++;

						} 
					}

?>				
				<input type="hidden"
							name="tkt-slctr-rows-<?php echo $event_id; ?>"
							value="<?php echo $row; ?>"
					/>
							
			</tbody>
		
		</table>

