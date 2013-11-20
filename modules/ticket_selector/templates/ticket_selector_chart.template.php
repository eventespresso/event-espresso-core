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
					<?php //d( $TKT_ID ); ?>
					<b><?php echo $ticket->get_pretty('TKT_name');?></b>
					<?php if ( $ticket->ticket_status() > 0 ) { ?>
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
				<?php } 
//echo '<h4>$max_atndz : ' . $max_atndz . '</h4>';
//echo '<h4>$ticket->is_on_sale() : ' . $ticket->is_on_sale() . '</h4>';
//echo '<h4>$ticket->available() : ' . $ticket->available() . '</h4>';
//echo '<h4>$ticket->remaining() : ' . $ticket->remaining() . '</h4>';
				?>
				</td>	
				<td class="tckt-slctr-tbl-td-price"><?php echo $ticket->get_pretty('TKT_price'); ?></td>
				<!--<td class="tckt-slctr-tbl-td-status"><?php echo $ticket_status; ?></td>-->
				<td class="tckt-slctr-tbl-td-qty cntr">
			<?php 
				
				if ( $ticket->is_on_sale() && $ticket->is_remaining() ) {
					// display submit button since we have tickets availalbe
					add_filter( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true' );
					// if more than one attendee is allowed
					if ( $max_atndz > 1 ) { 
						$tickets_remaining = $ticket->remaining();
						// if $tickets_remaining equals -1, then there are unlimited tickets for sale, so use $max_atndz, 
						// otherwise offer however many tickets are left, as long as that is still less than $max_atndz
						$max = $tickets_remaining < 0 ? $max_atndz : min( $tickets_remaining, $max_atndz );
						// but... we also want to restrict the number of tickets by the ticket max setting,
						// however, the max still can't be higher than what was just set above
						$max = $ticket->max() > 0 ? min( $ticket->max(), $max ) : $max;
						// and we also want to restrict the minimum number of tickets by the ticket min setting
						$min = $ticket->min() > 0 ? $ticket->min() : 1;

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
					} else { 
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
					} 
					
				} else {
					// sold out or other status ?
					if ( ! $ticket->is_remaining() && $ticket->ticket_status() >= 0 ) {
						echo '<span class="sold-out">' . __( 'Sold&nbsp;Out', 'event_espresso' ) . '</span>';
					} else if ( $ticket->is_pending() ) {
					?>	
					<p class="ticket-pending-pg">
						<span class="ticket-pending"><?php _e( 'Goes&nbsp;On&nbsp;Sale', 'event_espresso' ); ?></span><br/>
						<span class="small-text"><?php echo $ticket->start_date( 'M d, Y', ' ' ); ?></span>
					</p>
					<?php
					} else {
						echo $ticket_status;
					} 
					// depending on group reg we need to change the format for qty
					if (  $max_atndz > 1 ) {
					?>	
					<input type="hidden" name="tkt-slctr-qty-<?php echo $EVT_ID; ?>[]" value="0" />
					<?php
					} 
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
						<span class="drk-grey-text smaller-text no-bold"> - <?php _e( 'The dates when this ticket is available for purchase.', 'event_espresso' ); ?></span>
						<br/>						
						
						<?php if ( isset( $min ) && isset( $max )) : ?>
						<h5><?php _e( 'Purchasable Quantities', 'event_espresso' ); ?></h5>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( 'Min Qty:', 'event_espresso' ); ?></span><?php echo $min > 0 ? $min : 0; ?><br/>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( 'Max Qty:', 'event_espresso' ); ?></span><?php echo $max > 0 ? $max : __( 'no limit', 'event_espresso' ); ?><br/>
						<span class="drk-grey-text smaller-text no-bold"> - <?php _e( 'The number of tickets that can be purchased per transaction.', 'event_espresso' ); ?></span>
						<br/>
						<?php endif; ?>
						
						<?php if ( ! defined( 'EE_DECAF' ) || EE_DECAF !== TRUE ) : ?>							
						<h5><?php _e( 'Ticket Uses', 'event_espresso' ); ?></h5>
						<span class="ticket-details-label-spn drk-grey-text"><?php _e( '# of Uses:', 'event_espresso' ); ?></span><?php echo $ticket->uses() > 1 ? $ticket->uses() : 1; ?><br/>
						<span class="drk-grey-text smaller-text no-bold"> - <?php _e( 'The number of times this ticket can be used to gain entrance to this event.', 'event_espresso' ); ?></span>
						<br/>
						<?php endif; ?>
						
						<?php if ( $datetimes = $ticket->get_many_related( 'Datetime' )) : ?>
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
								<?php foreach ( $datetimes as $datetime ) : ?>
								
								<tr>
									<td><?php echo $datetime->start_date('l F jS, Y'); ?></td>
									<td><?php echo $datetime->time_range(); ?></td>
									<td class="cntr"><?php echo $datetime->sold(); ?></td>
									<?php $tkts_left = $datetime->sold_out() ? '<span class="sold-out">' . __( 'Sold&nbsp;Out', 'event_espresso' ) . '</span>' : $datetime->reg_limit() - $datetime->sold(); ?>
									<td class="cntr"><?php echo $datetime->reg_limit() ? $tkts_left : __( 'unlimited ', 'event_espresso' ); ?></td>
								</tr>
								<?php endforeach; ?>
								</tbody>
							</table>
						</div>
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
	<p class="smaller-text lt-grey-text">* <?php echo sprintf( __( 'Please note that a maximum number of %d tickets can be purchased per transaction for this event.', 'event_espresso' ), $max_atndz );?></p>
<?php } ?>

	<?php do_action( 'AHEE_after_ticket_selector' ); ?>

</div>
