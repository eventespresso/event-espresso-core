
	<h4 class="event-list-reg-link-title"><span class="section-title"><?php _e( 'Ticket Options', 'event_espresso' ); ?></span></h4>

		<input type="hidden"
					name="tkt-slctr-event-id"
					value="<?php echo $event_id; ?>"
			/>		

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
<?php 
			$rows = 0;
			foreach ( $dates as $date ) {
				foreach ( $times as $DTT_ID => $time ) {  
					foreach ( $prices as $price_id => $price ) {
					
?>
				<tr>				
					<td class="tckt-slctr-tbl-td-date"><?php echo $date; ?></td>
					<td class="tckt-slctr-tbl-td-time"><?php echo $time['formatted']; ?></td>
					<td class="tckt-slctr-tbl-td-desc"><?php echo $price['option']; ?></td>	
					<td class="tckt-slctr-tbl-td-qty">					
						<select name="tkt-slctr-qty-<?php echo $event_id; ?>[]" id="ticket-selector-tbl-qty-slct-<?php echo $event_id ?>" class="ticket-selector-tbl-qty-slct ui-widget-content ui-corner-all">
<?php for ($i = 0; $i <= $max_atndz; $i++) { ?>
							<option value="<?php echo $i; ?>">&nbsp;<?php echo $i; ?>&nbsp;</option><?php } ?>
						</select>												
						<input type="hidden"
									name="tkt-slctr-date-<?php echo $event_id; ?>[]"
									value="<?php echo $date; ?>"
							/>	
						<input type="hidden"
									name="tkt-slctr-time-<?php echo $event_id; ?>[]"
									value="<?php echo $time['start_time']; ?>"
							/>	
						<input type="hidden"
									name="tkt-slctr-dtt-id-<?php echo $event_id; ?>[]"
									value="<?php echo $DTT_ID; ?>"
							/>	
						<input type="hidden"
									name="tkt-slctr-price-<?php echo $event_id; ?>[]"
									value="<?php echo $price['raw']; ?>"
							/>
						<input type="hidden"
									name="tkt-slctr-price-id-<?php echo $event_id; ?>[]"
									value="<?php echo $price_id; ?>"
							/>
						<input type="hidden"
									name="tkt-slctr-price-desc-<?php echo $event_id; ?>[]"
									value="<?php echo esc_attr( $price['option'] ); ?>"
							/>

					</td>
				</tr>
<?php
								$rows++;
							} 
						}
					}
?>				
				<input type="hidden"
							name="tkt-slctr-rows-<?php echo $event_id; ?>"
							value="<?php echo $rows; ?>"
					/>
							
			</tbody>
		
		</table>						