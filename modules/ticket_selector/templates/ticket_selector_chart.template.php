<div id="tkt-slctr-tbl-wrap-dv-<?php echo $EVT_ID; ?>" class="tkt-slctr-tbl-wrap-dv" >
	<table id="tkt-slctr-tbl-<?php echo $EVT_ID; ?>" class="tkt-slctr-tbl" border="0" cellspacing="0" cellpadding="0">		
		<thead>
			<tr>
				<th scope="col" width="65%"><?php _e( 'Available Tickets', 'event_espresso' ); ?></th>
				<th scope="col" width="20%"><?php _e( 'Price', 'event_espresso' ); ?> <span class="small-text no-bold"><?php _e( '(each)', 'event_espresso' ); ?></span></th>
				<th scope="col" width="15%" class="cntr"><?php _e( 'Qty*', 'event_espresso' ); ?></th>
			</tr>
		</thead>
		<tbody>
<?php 

$row = 1;
$ticket_count = count( $tickets );
foreach ( $tickets as $TKT_ID => $ticket ) {
//	d( $ticket );
	$max = 0;
	$min = 0;
	$remaining = $ticket->remaining();
	if ( $ticket->is_on_sale() && $ticket->is_remaining() ) {
		if ( $max_atndz > 1 ) { 
			// offer the number of $tickets_remaining or $max_atndz, whichever is smaller
			$max = min( $remaining, $max_atndz );
			// but... we also want to restrict the number of tickets by the ticket max setting,
			// however, the max still can't be higher than what was just set above
			$max = $ticket->max() > 0 ? min( $ticket->max(), $max ) : $max;
			// and we also want to restrict the minimum number of tickets by the ticket min setting
			$min = $ticket->min() > 0 ? $ticket->min() : 1;
		}
	} 				

	$tkt_status = $ticket->ticket_status();
	// check ticket status
	switch ( $tkt_status ) {
		// sold_out
		case EE_Ticket::sold_out :
			$ticket_status = '<span class="ticket-sales-sold-out">' . $ticket->ticket_status( TRUE ) . '</span>';
			$status_class = 'ticket-sales-sold-out lt-grey-text';
		break;
		// expired
		case EE_Ticket::expired :
			$ticket_status = '<span class="ticket-sales-expired">' . $ticket->ticket_status( TRUE ) . '</span>';
			$status_class = 'ticket-sales-expired lt-grey-text';
		break;
		// archived
		case EE_Ticket::archived :
			$ticket_status = '<span class="archived-ticket">' . $ticket->ticket_status( TRUE ) . '</span>';
			$status_class = 'archived-ticket hidden';
		break;
		// pending
		case EE_Ticket::pending :
			$ticket_status = '<span class="ticket-pending">' . $ticket->ticket_status( TRUE ) . '</span>';
			$status_class = 'ticket-pending';	
		break;
		// onsale
		case EE_Ticket::onsale :
			$ticket_status = '<span class="ticket-on-sale">' . $ticket->ticket_status( TRUE ) . '</span>';
			$status_class = 'ticket-on-sale';
		break;
	}

?>
			<tr class="tckt-slctr-tbl-tr <?php echo $status_class; ?>">		
				<td class="tckt-slctr-tbl-td-name">
					<b><?php echo $ticket->get_pretty('TKT_name');?></b>
					<a 
						id="display-tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>" 
						class="display-tckt-slctr-tkt-details display-the-hidden lt-grey-text smaller-text" 
						rel="tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>" 
						title="<?php _e( 'click to show additional ticket details', 'event_espresso' ); ?>"						
					>
						<?php echo sprintf( __( 'show%1$sdetails%1$s+', 'event_espresso' ), '&nbsp;' ); ?>						
					</a>
					<a 
						id="hide-tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>" 
						class="hide-tckt-slctr-tkt-details hide-the-displayed lt-grey-text smaller-text" 
						rel="tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>" 
						title="<?php _e( 'click to hide additional ticket details', 'event_espresso' ); ?>"
						style="display:none;"
					>
						<?php echo sprintf( __( 'hide%1$sdetails%1$s-', 'event_espresso' ), '&nbsp;' ); ?>
					</a>
				<?php
//echo '<br/><b>$max_atndz : ' . $max_atndz . '</b>';
//echo '<br/><b>$max : ' . $max . '</b>';
//echo '<br/><b>$ticket->is_on_sale() : ' . $ticket->is_on_sale() . '</b>';
//echo '<br/><b>$ticket->available() : ' . $ticket->available() . '</b>';
//echo '<br/><b>$remaining : ' . $remaining . '</b>';
//echo '<br/><b> $ticket->ticket_status() : ' .  $tkt_status . '</b>';
//echo '<br/><b> $ticket->uses() : ' .  $ticket->uses() . '</b>';
				?>
				</td>	
				<td class="tckt-slctr-tbl-td-price"><?php echo $ticket->get_pretty('TKT_price'); ?></td>
				<td class="tckt-slctr-tbl-td-qty cntr">
			<?php 
			 	$hidden_input_qty = $max_atndz > 1 ? TRUE : FALSE;
				// sold out or other status ?
				if ( $tkt_status == EE_Ticket::sold_out || $remaining == 0 ) {
					echo '<span class="sold-out">' . __( 'Sold&nbsp;Out', 'event_espresso' ) . '</span>';
				} else if ( $tkt_status == EE_Ticket::expired || $tkt_status == EE_Ticket::archived ) {
					echo $ticket_status;
				} else if ( $tkt_status == EE_Ticket::pending ) {
				?>	
				<div class="ticket-pending-pg">
					<span class="ticket-pending"><?php _e( 'Goes&nbsp;On&nbsp;Sale', 'event_espresso' ); ?></span><br/>
					<span class="small-text"><?php echo $ticket->start_date( 'M d, Y', ' ' ); ?></span>
				</div>
				<?php
				// min qty purchasable is less than tickets available
				} else if ( $ticket->min() > $remaining ) {
				?>	
				<div class="archived-ticket-pg">
					<span class="archived-ticket small-text"><?php _e( 'Not Available', 'event_espresso' ); ?></span><br/>
				</div>
				<?php
				// if only one attendee is allowed to register at a time
				} else if ( $max_atndz  == 1 ) {
					// display submit button since we have tickets availalbe
					add_filter( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true' );
			?>
				<input 
					type="radio" 
					name="tkt-slctr-qty-<?php echo $EVT_ID; ?>" 
					id="ticket-selector-tbl-qty-slct-<?php echo $EVT_ID . '-' . $row; ?>" 
					class="ticket-selector-tbl-qty-slct"
					value="<?php echo $row . '-'; ?>1"
					<?php echo $row == 1 ? ' checked="checked"' : ''; ?>
				/>
		<?php
					$hidden_input_qty = FALSE;
					
				} elseif ( $max > 0 ) { 
					// display submit button since we have tickets availalbe
					add_filter( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true' );

			?>
				<select name="tkt-slctr-qty-<?php echo $EVT_ID; ?>[]" id="ticket-selector-tbl-qty-slct-<?php echo $EVT_ID . '-' . $row; ?>" class="ticket-selector-tbl-qty-slct">
					<option value="0">&nbsp;0&nbsp;</option>
				<?php
					// offer ticket quantities from the min to the max
					for ( $i = $min; $i <= $max; $i++) { 
				?>
					<option value="<?php echo $i; ?>">&nbsp;<?php echo $i; ?>&nbsp;</option>
				<?php } ?>
				</select>
			<?php 
					$hidden_input_qty = FALSE;
					
				} 
				// depending on group reg we need to change the format for qty
				if ( $hidden_input_qty ) {
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
				<td class="tckt-slctr-tkt-details-td" colspan="4">
					<div id="tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>-dv" class="tckt-slctr-tkt-details-dv hidden">
						
						<h3><?php _e( 'Ticket Details', 'event_espresso' ); ?></h3>
						<p><?php echo $ticket->description(); ?></p>
							
						<h5><?php _e( 'Ticket Sale Dates', 'event_espresso' ); ?></h5>
						<span class="drk-grey-text small-text no-bold"> - <?php _e( 'The dates when this ticket is available for purchase.', 'event_espresso' ); ?></span><br/>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( 'Goes On Sale:', 'event_espresso' ); ?></span><?php echo $ticket->start_date('l F jS, Y @') ; ?><br/>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( 'Sales End:', 'event_espresso' ); ?></span><?php echo $ticket->end_date('l F jS, Y @') ; ?><br/>
						<br/>
						
						<?php if ( $ticket->min() &&$ticket->max() ) : ?>
						<h5><?php _e( 'Purchasable Quantities', 'event_espresso' ); ?></h5>
						<span class="drk-grey-text small-text no-bold"> - <?php _e( 'The number of tickets that can be purchased per transaction (if available).', 'event_espresso' ); ?></span><br/>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( 'Minimum Qty:', 'event_espresso' ); ?></span><?php echo $ticket->min() > 0 ? $ticket->min() : 0; ?>
						<?php if ( $ticket->min() > $remaining ) { ?> &nbsp; <span class="important-notice small-text"><?php echo _e( 'The Minimum Quantity purchasable for this ticket exceeds the number of spaces remaining', 'event_espresso' ); ?></span><?php } ?><br/>
						<?php //$max = min( $max, $max_atndz );?>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( 'Maximum Qty:', 'event_espresso' ); ?></span><?php echo $ticket->max() === INF ? __( 'no limit', 'event_espresso' ) : max( $ticket->max(), 1 ); ?><br/>
						<br/>
						<?php endif; ?>
						
						<?php if ( $datetimes = $ticket->datetimes_ordered($event_is_expired,false)) : ?>
						<h5><?php _e( 'Event Access', 'event_espresso' ); ?></h5>
						<span class="drk-grey-text small-text no-bold"> - <?php _e( 'This ticket allows access to the following event dates and times. "Remaining" shows the number of this ticket type left:', 'event_espresso' ); ?></span>
						<div class="tckt-slctr-tkt-details-tbl-wrap-dv">
							<table class="tckt-slctr-tkt-details-tbl">
								<thead>
									<tr>
										<th><?php _e( 'Event Date ', 'event_espresso' ); ?></th>
										<th class="cntr"><?php _e( 'Time ', 'event_espresso' ); ?></th>
										<th class="cntr"><span class="smaller-text"><?php _e( 'This Ticket<br/>Sold', 'event_espresso' ); ?></span></th>
										<th class="cntr"><span class="smaller-text"><?php _e( 'This Ticket<br/>Remaining', 'event_espresso' ); ?></span></th>
										<th class="cntr"><span class="smaller-text"><?php _e( 'Total Tickets<br/>Sold', 'event_espresso' ); ?></span></th>
										<th class="cntr"><span class="smaller-text"><?php _e( 'Total Spaces<br/>Remaining', 'event_espresso' ); ?></span></th>
									</tr>
								</thead>
								<tbody>
								<?php foreach ( $datetimes as $datetime ) : ?>
								
								<tr>
									<td><?php echo $datetime->start_date('l F jS, Y'); ?></td>
									<td class="cntr"><?php echo $datetime->time_range(); ?></td>
									<td class="cntr"><?php echo $ticket->sold(); ?></td>		
									<td class="cntr"><?php echo $ticket->qty() - $ticket->sold(); ?></td>		
									<td class="cntr"><?php echo $datetime->sold(); ?></td>		
									<?php $tkts_left = $datetime->sold_out() ? '<span class="sold-out">' . __( 'Sold&nbsp;Out', 'event_espresso' ) . '</span>' : $datetime->spaces_remaining(); ?>
									<td class="cntr"><?php echo $tkts_left === INF ? __( 'unlimited ', 'event_espresso' ) : $tkts_left; ?></td>
								</tr>
								<?php endforeach; ?>
								</tbody>
							</table>
						</div>
						<br/>
						<?php endif; ?>
						
						<?php if ( $ticket->uses() !== INF && ( ! defined( 'EE_DECAF' ) || EE_DECAF !== TRUE )) : ?>							
						<h5><?php _e( 'Event Date Ticket Uses', 'event_espresso' ); ?></h5>
						<span class="drk-grey-text small-text no-bold"> - <?php _e( 'The number of separate event datetimes (see table above) that this ticket can be used to gain admittance to.<br/> <strong>Admission is always one person per ticket.</strong>', 'event_espresso' ); ?></span><br/>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( '# Datetimes:', 'event_espresso' ); ?></span><?php  echo $ticket->e( 'TKT_uses' );?><br/>
						<?php endif; ?>
						
						
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
	<input type="hidden" name="tkt-slctr-rows-<?php echo $EVT_ID; ?>" value="<?php echo $row - 1; ?>" />
	<input type="hidden" name="tkt-slctr-max-atndz-<?php echo $EVT_ID; ?>" value="<?php echo $max_atndz; ?>" />
	<input type="hidden" name="tkt-slctr-event-id" value="<?php echo $EVT_ID; ?>" />
	<input type="hidden" name="tkt-slctr-event-<?php echo $EVT_ID; ?>" value="<?php echo base64_encode( serialize( $event )); ?>" />

<?php if ( $max_atndz > 0 ) { ?>
	<p class="smaller-text lt-grey-text">* <?php echo sprintf( __( 'Please note that a maximum number of %d tickets can be purchased for this event per order.', 'event_espresso' ), $max_atndz );?></p>
<?php } ?>

	<?php do_action( 'AHEE_after_ticket_selector' ); ?>

</div>
