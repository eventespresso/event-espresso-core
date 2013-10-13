<div id="tkt-slctr-tbl-wrap-dv-<?php echo $EVT_ID; ?>" class="tkt-slctr-tbl-wrap-dv" >
	<table id="tkt-slctr-tbl-<?php echo $EVT_ID; ?>" class="tkt-slctr-tbl" border="1" cellspacing="0" cellpadding="0">		
		<thead>
			<tr>
				<th scope="col" width="60%"><h3><?php _e( 'Ticket Options', 'event_espresso' ); ?></h3></th>
				<th scope="col" width="18%"><?php _e( 'Price', 'event_espresso' ); ?> <span class="small-text no-bold"><?php _e( '(each)', 'event_espresso' ); ?></span></th>
				<th scope="col" width="14%"><?php _e( 'Status', 'event_espresso' ); ?></th>
				<th scope="col" width="8%" class="cntr"><?php _e( 'Qty', 'event_espresso' ); ?></th>
			</tr>
		</thead>
		<tbody>
<?php 

		$row = 0;
		foreach ( $tickets as $TKT_ID => $ticket ) {
			
			//d( $ticket );
			
			switch ( $ticket->ticket_status() ) {
				// expired
				case -1 :
					$ticket_status = '<span class="ticket-sales-expired">' . $ticket->ticket_status( TRUE ) . '</span>';
					$status_class = 'ticket-sales-expired lt-grey-text';
				break;
				// archived
				case 0 :
					$ticket_status = '<span class="archived-ticket">' . $ticket->ticket_status( TRUE ) . '</span>';
					$status_class = 'archived-ticket hidden';
				break;
				// pending
				case 1 :
					$ticket_status = '<span class="ticket-pending">' . $ticket->ticket_status( TRUE ) . '</span>';
					$status_class = 'ticket-pending';	
				break;
				// onsale
				case 2 :
					$ticket_status = '<span class="ticket-on-sale">' . $ticket->ticket_status( TRUE ) . '</span>';
					$status_class = 'ticket-on-sale';
				break;
			}


?>
			<tr class="tckt-slctr-tbl-tr <?php echo $status_class; ?>">		
				<td class="tckt-slctr-tbl-td-name">
					<b><?php echo $ticket->get_pretty('TKT_name');?></b>
					<?php if ( $ticket->ticket_status() > 0 ) { ?>
					<a 
						id="display-tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>" 
						class="display-tckt-slctr-tkt-details display-the-hidden lt-grey-text smaller-text" 
						rel="tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>" 
						title="<?php _e( 'click to show additional ticket details', 'event_espresso' ); ?>"						
					>
						<?php echo sprintf( __( 'show%sdetails +', 'event_espresso' ), '&nbsp;' ); ?>						
					</a>
					<a 
						id="hide-tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>" 
						class="hide-tckt-slctr-tkt-details hide-the-displayed lt-grey-text smaller-text" 
						rel="tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>" 
						title="<?php _e( 'click to hide additional ticket details', 'event_espresso' ); ?>"
						style="display:none;"
					>
						<?php _e( 'hide details -', 'event_espresso' ); ?>
					</a>
					<?php } ?>
				</td>	
				<td class="tckt-slctr-tbl-td-price"><?php echo $ticket->get_pretty('TKT_price'); ?></td>
				<td class="tckt-slctr-tbl-td-status"><?php echo $ticket_status; ?></td>
				<td class="tckt-slctr-tbl-td-qty cntr">
			<?php 
				if ( $ticket->is_on_sale() && $ticket->available() ) {
					// display submit button since we have tickets availalbe
					add_filter( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true' );
					// if only one attendee is allowed
					if ( $max_atndz > 1 ) { 
				?>
					<select name="tkt-slctr-qty-<?php echo $EVT_ID; ?>[]" id="ticket-selector-tbl-qty-slct-<?php echo $EVT_ID . '-' . $row; ?>" class="ticket-selector-tbl-qty-slct">
						<option value="0">&nbsp;0&nbsp;</option>
					<?php 
						$max_atndz = $ticket->max() ? $ticket->max() : $max_atndz;
						$start_atndz = $ticket->min() ? $ticket->min() : 1;
						for ( $i = $start_atndz; $i <= $max_atndz; $i++) { 
					?>
						<option value="<?php echo $i; ?>">&nbsp;<?php echo $i; ?>&nbsp;</option>
					<?php } ?>
					</select>
				<?php 
					} else { 
				?>
					<label>
						<input 
							type="radio" 
							name="tkt-slctr-qty-<?php echo $EVT_ID; ?>" 
							id="ticket-selector-tbl-qty-slct-<?php echo $EVT_ID . '-' . $row; ?>" 
							class="ticket-selector-tbl-qty-slct ui-widget-content ui-corner-all"
							value="<?php echo $row . '-'; ?>1"
							<?php echo $row == 0 ? ' checked="checked"' : ''; ?>
						/>
					</label>
			<?php
					} 
				} else {
					if ( ! $ticket->available() ) {
						echo '<span class="sold-out">' . __( 'Sold&nbsp;Out', 'event_espresso' ) . '</span>';
					} else if ( ! $ticket->is_on_sale() ) {
					?>
					<select class="ticket-selector-tbl-qty-slct" disabled="disabled">
						<option value="0">&nbsp;0&nbsp;</option>
					</select>
					<?php
					} else {
					?>
					<select class="ticket-selector-tbl-qty-slct" disabled="disabled">
						<option value="0">&nbsp;0&nbsp;</option>
					</select>
					<?php
					}
				?>	
					<input type="hidden" name="tkt-slctr-qty-<?php echo $EVT_ID; ?>[]" value="0" />					
				<?php
				}
			?>	
					<input type="hidden" name="tkt-slctr-ticket-id-<?php echo $EVT_ID; ?>[]" value="<?php echo $TKT_ID; ?>" />
					<input type="hidden" name="tkt-slctr-ticket-obj-<?php echo $EVT_ID; ?>[]" value="<?php echo base64_encode( serialize( $ticket )); ?>" />

				</td>
			</tr>
			<tr class="tckt-slctr-tkt-details-tr">
				<td colspan="4">
					<div id="tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>-dv" class="tckt-slctr-tkt-details-dv hidden">
						
						<h3><?php _e( 'Ticket Details', 'event_espresso' ); ?></h3>
						<p><?php echo $ticket->description(); ?></p>
							
						<h5><?php _e( 'Ticket Sale Dates', 'event_espresso' ); ?></h5>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( 'Goes On Sale:', 'event_espresso' ); ?></span><?php echo $ticket->start_date('l F jS, Y @') ; ?><br/>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( 'Sales End:', 'event_espresso' ); ?></span><?php echo $ticket->end_date('l F jS, Y @') ; ?><br/>
						<span class="drk-grey-text smaller-text no-bold"> - <?php _e( 'the dates when this ticket is available for purchase', 'event_espresso' ); ?></span>
						<br/>						
						
						<h5><?php _e( 'Purchasable Quantities', 'event_espresso' ); ?></h5>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( 'Min Qty:', 'event_espresso' ); ?></span><?php echo $ticket->min() ? $ticket->min() : 0; ?><br/>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( 'Max Qty:', 'event_espresso' ); ?></span><?php echo $ticket->max() ? $ticket->max() : __( 'no limit', 'event_espresso' ); ?><br/>
						<span class="drk-grey-text smaller-text no-bold"> - <?php _e( 'the number of tickets that can be purchased per registration', 'event_espresso' ); ?></span>
						<br/>
						
						<h5><?php _e( 'Ticket Uses', 'event_espresso' ); ?></h5>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( '# of Uses:', 'event_espresso' ); ?></span><?php echo $ticket->uses() ? $ticket->uses() : 1; ?><br/>
						<span class="drk-grey-text smaller-text no-bold"> - <?php _e( 'the number of times this ticket can be used to gain entrance to this event', 'event_espresso' ); ?></span>
						<br/>
						
						<?php if ( $datetimes = $ticket->get_many_related( 'Datetime' )) { ?>
						<h5><?php _e( 'Event Access', 'event_espresso' ); ?></h5>
						<span class="drk-grey-text smaller-text no-bold"> - <?php _e( 'This ticket allows access to the following event dates and times:', 'event_espresso' ); ?></span><br/>
						<div class="tckt-slctr-tkt-details-tbl-wrap-dv">
							<table class="tckt-slctr-tkt-details-tbl">
								<thead>
									<tr>
										<th><?php _e( 'Event Date ', 'event_espresso' ); ?></th>
										<th><?php _e( 'Time ', 'event_espresso' ); ?></th>
										<th class="cntr"><?php _e( 'Sold ', 'event_espresso' ); ?></th>
										<th class="cntr"><?php _e( 'Remaining ', 'event_espresso' ); ?></th>
									</tr>
								</thead>
								<tbody>
								<?php foreach ( $datetimes as $datetime ) { ?>
								
								<tr>
									<td><?php echo $datetime->start_date('l F jS, Y'); ?></td>
									<td><?php echo $datetime->time_range(); ?></td>
									<td class="cntr"><?php echo $datetime->sold(); ?></td>
									<?php $tkts_left = $datetime->sold_out() ? '<span class="sold-out">' . __( 'Sold&nbsp;Out', 'event_espresso' ) . '</span>' : $datetime->reg_limit() - $datetime->sold(); ?>
									<td class="cntr"><?php echo $datetime->reg_limit() ? $tkts_left : __( 'unlimited ', 'event_espresso' ); ?></td>
								</tr>
								<?php } ?>
								</tbody>
							</table>
						</div>
						<?php } ?>
						
					</div>					
				</td>
			</tr>
<?php
					$row++;

				}

?>				
						
		</tbody>	
	</table>

	<input type="hidden" name="noheader" value="true" />
	<input type="hidden" name="tkt-slctr-return-url-<?php echo $EVT_ID ?>" value="<?php echo $_SERVER['REQUEST_URI']?>" />
	<input type="hidden" name="tkt-slctr-rows-<?php echo $EVT_ID; ?>" value="<?php echo $row; ?>" />
	<input type="hidden" name="tkt-slctr-max-atndz-<?php echo $EVT_ID; ?>" value="<?php echo $max_atndz; ?>" />
	<input type="hidden" name="tkt-slctr-event-id" value="<?php echo $EVT_ID; ?>" />
	<input type="hidden" name="tkt-slctr-event-<?php echo $EVT_ID; ?>" value="<?php echo base64_encode( serialize( $event )); ?>" />
		
</div>	
