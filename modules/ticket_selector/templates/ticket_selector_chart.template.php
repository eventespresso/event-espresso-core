
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
					<th scope="col" width="18%"><?php _e( 'Date', 'event_espresso' ); ?></th>
					<th scope="col" width="25%"><?php _e( 'Time', 'event_espresso' ); ?></th>
					<th scope="col" width="49%"><?php _e( 'Ticket Price', 'event_espresso' ); ?></th>
					<th scope="col" width="8%"><?php _e( 'Qty', 'event_espresso' ); ?></th>
				</tr>
			</thead>
			<tbody>
<?php 

			$row = 0;
			$prev_date = '';
			$prev_time = '';
			
			foreach ( $datetimes as $DTT_ID => $datetime ) {  
				foreach ( $datetime->tickets() as $TKT_ID => $ticket ) {					
					if ( $ticket->is_on_sale() && $ticket->available() ) {
									
						if ( $row == 0 ) {
							$date_display = $prev_date = $datetime->start_date('D M jS');
						} elseif ( $datetime->start_date('D M jS') == $prev_date ) { 
							// add styling to duplicate dates
							$date_display = '<span class="lt-grey-text">' . $datetime->start_date('D M jS') . '</span>';
						} else {
							$date_display = $prev_date = $datetime->start_date('D M jS');
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
					<td class="tckt-slctr-tbl-td-qty">
					<?php if ( $max_atndz > 1 ) { ?>
						<select name="tkt-slctr-qty-<?php echo $event_id; ?>[]" id="ticket-selector-tbl-qty-slct-<?php echo $event_id . '-' . $row; ?>" class="ticket-selector-tbl-qty-slct ui-widget-content ui-corner-all">
<?php for ($i = 0; $i <= $max_atndz; $i++) { ?>
							<option value="<?php echo $i; ?>" <?php do_action('AHEE_ticket_selector_option',$event_id,$datetime,$ticket,$i,$max_atndz);?>>&nbsp;<?php echo $i; ?>&nbsp;</option><?php } ?>
						</select>
					<?php } else { ?>
						<label>
							<input type="radio" 
										name="tkt-slctr-qty-<?php echo $event_id; ?>" 
										id="ticket-selector-tbl-qty-slct-<?php echo $event_id . '-' . $row; ?>" 
										class="ticket-selector-tbl-qty-slct ui-widget-content ui-corner-all"
										value="<?php echo $row . '-'; ?>1"
										<?php echo $row == 0 ? ' checked="checked"' : ''; ?>
							/>
						</label>
					<?php } ?>											
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
									name="tkt-slctr-ticket-<?php echo $event_id; ?>[]"
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
									name="tkt-slctr-$datetime-obj-<?php echo $event_id; ?>[]"
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
					}

?>				
				<input type="hidden"
							name="tkt-slctr-rows-<?php echo $event_id; ?>"
							value="<?php echo $row; ?>"
					/>
							
			</tbody>
		
		</table>
