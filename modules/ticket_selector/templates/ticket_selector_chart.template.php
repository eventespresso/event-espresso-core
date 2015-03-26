<?php
/** @type int $EVT_ID */
/** @type int $max_atndz */
/** @type boolean $event_is_expired */

$template_settings =  isset ( EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector ) ? EE_Registry::instance()->CFG->template_settings->EED_Ticket_Selector : new EE_Ticket_Selector_Config();
?>
<div id="tkt-slctr-tbl-wrap-dv-<?php echo $EVT_ID; ?>" class="tkt-slctr-tbl-wrap-dv" >
	<table id="tkt-slctr-tbl-<?php echo $EVT_ID; ?>" class="tkt-slctr-tbl" border="0" cellspacing="0" cellpadding="0">
		<thead>
			<tr>
				<th scope="col" width="">
					<span class="ee-icon ee-icon-tickets"></span><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__table_header_available_tickets', __( 'Available Tickets', 'event_espresso' )); ?>
				</th>
				<?php if ( apply_filters( 'FHEE__ticket_selector_chart_template__display_ticket_price_details', TRUE )) { ?>
				<th scope="col" width="22.5%"><?php _e( 'Price', 'event_espresso' ); ?> </th>
				<?php } ?>
				<th scope="col" width="17.5%" class="cntr"><?php _e( 'Qty*', 'event_espresso' ); ?></th>
			</tr>
		</thead>
		<tbody>
<?php

$row = 1;
$ticket_count = count( $tickets );
$required_ticket_sold_out = FALSE;
foreach ( $tickets as $TKT_ID => $ticket ) {
	if ( $ticket instanceof EE_Ticket ) {
		//	d( $ticket );
		$max =$ticket->max();
		$min = 0;
		$remaining = $ticket->remaining();
		if ( $ticket->is_on_sale() && $ticket->is_remaining() ) {
			// offer the number of $tickets_remaining or $max_atndz, whichever is smaller
			$max = min( $remaining, $max_atndz );
			// but... we also want to restrict the number of tickets by the ticket max setting,
			// however, the max still can't be higher than what was just set above
			$max = $ticket->max() > 0 ? min( $ticket->max(), $max ) : $max;
			// and we also want to restrict the minimum number of tickets by the ticket min setting
			$min = $ticket->min() > 0 ? $ticket->min() : 0;
			// and if the ticket is required, then make sure that min qty is at least 1
			$min = $ticket->required() ? max( $min, 1 ) : $min;
		} else {
			// set flag if ticket is required (flag is set to start date so that future tickets are not blocked)
			$required_ticket_sold_out = $ticket->required() && ! $remaining ? $ticket->start_date() : $required_ticket_sold_out;
		}

		$ticket_price = $ticket->get_ticket_total_with_taxes();
		$ticket_bundle = FALSE;
		// for ticket bundles, set min and max qty the same
		if ( $ticket->min() != 0 && $ticket->min() == $ticket->max() ) {
			$ticket_price = $ticket_price * $ticket->min();
			$ticket_bundle = TRUE;
		}
		$ticket_price = apply_filters( 'FHEE__ticket_selector_chart_template__ticket_price', $ticket_price, $ticket );
		// if a previous required ticket with the same sale start date is sold out, then mark this ticket as sold out as well.
		// tickets that go on sale at a later date than the required ticket  will NOT be affected
		$tkt_status = $required_ticket_sold_out !== FALSE && $required_ticket_sold_out === $ticket->start_date() ? EE_Ticket::sold_out : $ticket->ticket_status();
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

		/**
		 * Allow plugins to hook in and abort the generation and display of this row to do
		 * something else if they want.
		 * For an addon to abort things, all they have to do is register a filter with this hook, and
		 * return a value that is NOT false.  Whatever is returned gets echoed instead of the
		 * current row.
		 *
		 *
		 * @var string|bool
		 */
		if ( false !== ( $new_row_content = apply_filters( 'FHEE__ticket_selector_chart_template__do_ticket_entire_row', false, $ticket, $max, $min, $required_ticket_sold_out, $ticket_price, $ticket_bundle, $ticket_status, $status_class ) ) ) {
			echo $new_row_content;
			continue;
		}
	?>
				<tr class="tckt-slctr-tbl-tr <?php echo $status_class . ' ' . espresso_get_object_css_class( $ticket ); ?>">
		<?php
		/**
		 * Allow plugins to hook in and abort the generation and display of the contents of this
		 * row to do something else if they want.
		 * For an addon to abort things, all they have to do is register a filter with this hook, and
		 * return a value that is NOT false.  Whatever is returned gets echoed instead of the
		 * current row.
		 *
		 *
		 * @var string|bool
		 */
		if ( false !== ( $new_row_cells_content = apply_filters( 'FHEE__ticket_selector_chart_template__do_ticket_inside_row', false, $ticket, $max, $min, $required_ticket_sold_out, $ticket_price, $ticket_bundle, $ticket_status, $status_class ) ) ) {
			echo $new_row_cells_content;
			echo '</tr>';
			continue;
		}
		?>
					<td class="tckt-slctr-tbl-td-name">
						<b><?php echo $ticket->get_pretty('TKT_name');?></b>
						<?php if ( $template_settings->show_ticket_details ) : ?>
							<a id="display-tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>" class="display-tckt-slctr-tkt-details display-the-hidden lt-grey-text smaller-text hide-if-no-js" rel="tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>" title="<?php echo esc_attr( apply_filters( 'FHEE__ticket_selector_chart_template__show_ticket_details_link_title', __( 'click to show additional ticket details', 'event_espresso' )) ); ?>">
								<?php echo sprintf( __( 'show%1$sdetails%1$s+', 'event_espresso' ), '&nbsp;' ); ?>
							</a>
							<a id="hide-tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>" class="hide-tckt-slctr-tkt-details hide-the-displayed lt-grey-text smaller-text hide-if-no-js" rel="tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>" title="<?php echo esc_attr( apply_filters( 'FHEE__ticket_selector_chart_template__hide_ticket_details_link_title', __( 'click to hide additional ticket details', 'event_espresso' )) ); ?>" style="display:none;">
								<?php echo sprintf( __( 'hide%1$sdetails%1$s-', 'event_espresso' ), '&nbsp;' ); ?>
							</a>
						<?php endif; //end show details check ?>
					<?php if ( $ticket->required() ) { ?>
						<p class="ticket-required-pg"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_required_message', __( 'This ticket is required and must be purchased.', 'event_espresso' )); ?></p>
					<?php } ?>
					<?php
//	echo '<br/><b>$max_atndz : ' . $max_atndz . '</b>';
//	echo '<br/><b>$max : ' . $max . '</b>';
//	echo '<br/><b>$min : ' . $min . '</b>';
//	echo '<br/><b>$ticket->is_on_sale() : ' . $ticket->is_on_sale() . '</b>';
//	echo '<br/><b>$ticket->available() : ' . $ticket->available() . '</b>';
//	echo '<br/><b>$remaining : ' . $remaining . '</b>';
//	echo '<br/><b> $ticket->ticket_status() : ' .  $tkt_status . '</b>';
//	echo '<br/><b> $ticket->uses() : ' .  $ticket->uses() . '</b>';
//	echo '<br/><b> $ticket->required() : ' .  $ticket->uses() . '</b>';
					?>
					</td>
					<?php if ( apply_filters( 'FHEE__ticket_selector_chart_template__display_ticket_price_details', TRUE )) { ?>
					<td class="tckt-slctr-tbl-td-price jst-rght"><?php echo EEH_Template::format_currency( $ticket_price ); ?>&nbsp;<span class="smaller-text no-bold"><?php
						if ( $ticket_bundle ) {
							echo apply_filters( 'FHEE__ticket_selector_chart_template__per_ticket_bundle_text', __( ' / bundle', 'event_espresso' ));
						} else {
							echo apply_filters( 'FHEE__ticket_selector_chart_template__per_ticket_text', __( ' / ticket', 'event_espresso' ));
						}?></span> &nbsp;
					</td>
					<?php } ?>
					<td class="tckt-slctr-tbl-td-qty cntr">
					<?php
					$hidden_input_qty = $max_atndz > 1 ? TRUE : FALSE;
					// sold out or other status ?
					if ( $tkt_status == EE_Ticket::sold_out || $remaining == 0 ) {
					?>
						<span class="sold-out"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_sold_out_msg', __( 'Sold&nbsp;Out', 'event_espresso' ));?></span>
					<?php
					} else if ( $tkt_status == EE_Ticket::expired || $tkt_status == EE_Ticket::archived ) {
						echo $ticket_status;
					} else if ( $tkt_status == EE_Ticket::pending ) {
					?>
					<div class="ticket-pending-pg">
						<span class="ticket-pending"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_goes_on_sale_msg', __( 'Goes&nbsp;On&nbsp;Sale', 'event_espresso' )); ?></span><br/>
						<span class="small-text"><?php echo date_i18n( 'M d, Y', strtotime( $ticket->start_date() )); ?></span>
					</div>
					<?php
					// min qty purchasable is less than tickets available
					} else if ( $ticket->min() > $remaining ) {
					?>
					<div class="archived-ticket-pg">
						<span class="archived-ticket small-text"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_not_available_msg', __( 'Not Available', 'event_espresso' )); ?></span><br/>
					</div>
					<?php
					// if only one attendee is allowed to register at a time
					} else if ( $max_atndz  == 1 ) {
						// display submit button since we have tickets available
						add_filter( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true' );
				?>
					<input type="radio" name="tkt-slctr-qty-<?php echo $EVT_ID; ?>" id="ticket-selector-tbl-qty-slct-<?php echo $EVT_ID . '-' . $row; ?>" class="ticket-selector-tbl-qty-slct" value="<?php echo $row . '-'; ?>1" <?php echo $row == 1 ? ' checked="checked"' : ''; ?>  title=""/>
			<?php
						$hidden_input_qty = FALSE;

					} else if ( $max_atndz  == 0 ) {
						echo '<span class="sold-out">' . apply_filters( 'FHEE__ticket_selector_chart_template__ticket_closed_msg', __( 'Closed', 'event_espresso' )) . '</span>';
					} elseif ( $max > 0 ) {
						// display submit button since we have tickets available
						add_filter( 'FHEE__EE_Ticket_Selector__display_ticket_selector_submit', '__return_true' );

				?>
					<select name="tkt-slctr-qty-<?php echo $EVT_ID; ?>[]" id="ticket-selector-tbl-qty-slct-<?php echo $EVT_ID . '-' . $row; ?>" class="ticket-selector-tbl-qty-slct" title="">
					<?php
						// this ensures that non-required tickets with non-zero MIN QTYs don't HAVE to be purchased
						if ( ! $ticket->required() && $min !== 0 ) {
					?>
						<option value="0">&nbsp;0&nbsp;</option>
					<?php }
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

					</td>
				</tr>
				<?php if ( $template_settings->show_ticket_details ) : ?>
					<tr class="tckt-slctr-tkt-details-tr <?php echo espresso_get_object_css_class( $ticket, '', 'details' );?>">
						<td class="tckt-slctr-tkt-details-td" colspan="4" style="padding: 0;border-top:none;">
							<div id="tckt-slctr-tkt-details-<?php echo $EVT_ID . '-' . $TKT_ID; ?>-dv" class="tckt-slctr-tkt-details-dv" style="display: none;">

								<section class="tckt-slctr-tkt-details-sctn">
									<h3><?php _e( 'Ticket Details', 'event_espresso' ); ?></h3>
									<p><?php echo $ticket->description(); ?></p>

									<?php if ( $ticket_price != 0 && apply_filters( 'FHEE__ticket_selector_chart_template__display_ticket_price_details', TRUE )) { ?>
									<section class="tckt-slctr-tkt-price-sctn">
										<h5><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_price_breakdown_heading', __( 'Ticket Price Breakdown', 'event_espresso' )); ?></h5>
										<div class="tckt-slctr-tkt-details-tbl-wrap-dv">
											<table class="tckt-slctr-tkt-details-tbl">
												<thead>
													<tr>
														<th width="30%" class=""><span class="small-text"><?php _e( 'Name', 'event_espresso' ); ?></span></th>
														<th width="" class="jst-cntr"><span class="small-text"><?php _e( 'Description', 'event_espresso' ); ?></span></th>
														<th width="25%" class="jst-rght"><span class="small-text"><?php _e( 'Amount', 'event_espresso' ); ?></span></th>
													</tr>
												</thead>
												<tbody>
										<?php if ( $ticket->base_price() instanceof EE_Price ) { ?>
													<tr>
														<td data-th="<?php _e( 'Name', 'event_espresso' ); ?>" class="small-text"><b><?php echo $ticket->base_price()->name(); ?></b></td>
														<td data-th="<?php _e( 'Description', 'event_espresso' ); ?>" class="small-text"><?php echo $ticket->base_price()->desc(); ?></td>
														<td data-th="<?php _e( 'Amount', 'event_espresso' ); ?>" class="jst-rght small-text"><?php echo $ticket->base_price()->pretty_price(); ?></td>
													</tr>
													<?php
															$running_total = $ticket->base_price()->amount();
														} else {
															$running_total = 0;
														}
														// now add price modifiers
														foreach ( $ticket->price_modifiers() as $price_mod ) { ?>
													<tr>
														<td data-th="<?php _e( 'Name', 'event_espresso' ); ?>" class="jst-rght small-text"><?php echo $price_mod->name(); ?></td>
													<?php if ( $price_mod->is_percent() ) { ?>
														<td data-th="<?php _e( 'Description', 'event_espresso' ); ?>" class="small-text"><?php echo $price_mod->desc(); ?> <?php echo $price_mod->amount(); ?>%</td>
														<?php
															$new_sub_total = $running_total * ( $price_mod->amount() / 100 );
															$new_sub_total = $price_mod->is_discount() ? $new_sub_total * -1 : $new_sub_total;
														?>
													<?php } else { ?>
														<?php $new_sub_total = $price_mod->is_discount() ? $price_mod->amount() * -1 : $price_mod->amount(); ?>
														<td data-th="<?php _e( 'Description', 'event_espresso' ); ?>" class="small-text"><?php echo $price_mod->desc(); ?></td>
														<?php $new_sub_total = $price_mod->is_discount() ? $price_mod->amount() * -1 : $price_mod->amount(); ?>
													<?php } ?>
														<td data-th="<?php _e( 'Amount', 'event_espresso' ); ?>" class="jst-rght small-text"><?php echo EEH_Template::format_currency( $new_sub_total ); ?></td>
														<?php $running_total += $new_sub_total; ?>
													</tr>
												<?php } ?>
												<?php if ( $ticket->taxable() ) { ?>
													<?php //$ticket_subtotal =$ticket->get_ticket_subtotal(); ?>
													<tr>
														<td colspan="2" class="jst-rght small-text sbttl"><b><?php _e( 'subtotal', 'event_espresso' ); ?></b></td>
														<td data-th="<?php _e( 'subtotal', 'event_espresso' ); ?>" class="jst-rght small-text"><b><?php echo  EEH_Template::format_currency( $running_total ); ?></b></td>
													</tr>

													<?php foreach ( $ticket->get_ticket_taxes_for_admin() as $tax ) { ?>
													<tr>
														<td data-th="<?php _e( 'Name', 'event_espresso' ); ?>" class="jst-rght small-text"><?php echo $tax->name(); ?></td>
														<td data-th="<?php _e( 'Description', 'event_espresso' ); ?>" class="jst-rght small-text"><?php echo $tax->amount(); ?>%</td>
														<?php $tax_amount = $running_total * ( $tax->amount() / 100 ); ?>
														<td data-th="<?php _e( 'Amount', 'event_espresso' ); ?>" class="jst-rght small-text"><?php echo EEH_Template::format_currency( $tax_amount ); ?></td>
														<?php $running_total += $tax_amount; ?>
													</tr>
													<?php } ?>
												<?php } ?>
													<tr>
														<td colspan="2" class="jst-rght small-text ttl-lbl-td"><b><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_total_price', __( 'Total Ticket Price', 'event_espresso' )); ?></b></td>
														<td data-th="<?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_total_price', __( 'Total Ticket Price', 'event_espresso' )); ?>" class="jst-rght small-text"><b><?php echo EEH_Template::format_currency( $running_total ); ?></b></td>
													</tr>
												</tbody>
											</table>
										</div>
									</section>
									<br/>
									<?php } ?>

									<section class="tckt-slctr-tkt-sale-dates-sctn">
										<h5><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_sales_date_heading', __( 'Ticket Sale Dates', 'event_espresso' )); ?></h5>
										<span class="drk-grey-text small-text no-bold"> - <?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_dates_available_message', __( 'The dates when this ticket is available for purchase.', 'event_espresso' )); ?></span><br/>
										<span class="ticket-details-label-spn drk-grey-text"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_goes_on_sale', __( 'Goes On Sale:', 'event_espresso' )); ?></span><span class="dashicons dashicons-calendar"></span><?php echo date_i18n( $date_format, strtotime( $ticket->start_date() )) . ' &nbsp; '; ?><span class="dashicons dashicons-clock"></span><?php echo date_i18n( $time_format, strtotime( $ticket->start_date() )) ; ?><br/>
										<span class="ticket-details-label-spn drk-grey-text"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_sales_end', __( 'Sales End:', 'event_espresso' )); ?></span><span class="dashicons dashicons-calendar"></span><?php echo date_i18n( $date_format, strtotime( $ticket->end_date() )) . ' &nbsp; '; ?><span class="dashicons dashicons-clock"></span><?php echo date_i18n( $time_format, strtotime( $ticket->end_date() )) ; ?><br/>
									</section>
									<br/>

									<?php do_action( 'AHEE__ticket_selector_chart_template__after_ticket_date', $ticket ); ?>

									<?php if ( $ticket->min() &&$ticket->max() ) { ?>
									<section class="tckt-slctr-tkt-quantities-sctn">
										<h5><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_purchasable_quantities_heading', __( 'Purchasable Quantities', 'event_espresso' )); ?></h5>
										<span class="drk-grey-text small-text no-bold"> - <?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_purchasable_quantities_message', __( 'The number of tickets that can be purchased per transaction (if available).', 'event_espresso' )); ?></span><br/>
										<span class="ticket-details-label-spn drk-grey-text"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_purchasable_quantities_min_qty', __( 'Minimum Qty:', 'event_espresso' )); ?></span><?php echo $ticket->min() > 0 ? $ticket->min() : 0; ?>
										<?php if ( $ticket->min() > $remaining ) { ?> &nbsp; <span class="important-notice small-text"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_purchasable_quantities_min_qty_message', __( 'The Minimum Quantity purchasable for this ticket exceeds the number of spaces remaining', 'event_espresso' )); ?></span><?php } ?><br/>
										<?php //$max = min( $max, $max_atndz );?>
										<span class="ticket-details-label-spn drk-grey-text"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_purchasable_quantities_max_qty', __( 'Maximum Qty:', 'event_espresso' )); ?></span><?php echo $ticket->max() === INF ? __( 'no limit', 'event_espresso' ) : max( $ticket->max(), 1 ); ?><br/>
									</section>
									<br/>
									<?php } ?>

									<?php if ( $ticket->uses() !== INF && ( ! defined( 'EE_DECAF' ) || EE_DECAF !== TRUE )) { ?>
									<section class="tckt-slctr-tkt-uses-sctn">
										<h5><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_date_ticket_uses_heading', __( 'Event Date Ticket Uses', 'event_espresso' )); ?></h5>
										<span class="drk-grey-text small-text no-bold"> - <?php
											echo apply_filters(
												'FHEE__ticket_selector_chart_template__ticket_details_event_date_ticket_uses_message',
												sprintf(
													__( 'The number of separate event datetimes (see table below) that this ticket can be used to gain admittance to.%1$s%2$sAdmission is always one person per ticket.%3$s', 'event_espresso' ),
													'<br/>',
													'<strong>',
													'</strong>'
												)
											);
											?></span><br/>
										<span class="ticket-details-label-spn drk-grey-text"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_date_number_datetimes', __( '# Datetimes:', 'event_espresso' )); ?></span><?php  echo $ticket->uses();?><br/>
									</section>
									<?php } ?>

									<?php
									$datetimes = $ticket->datetimes_ordered( $event_is_expired, FALSE );
									$chart_column_width = $template_settings->show_ticket_sale_columns ? '12.5%' : '50%';
									if ( ! empty( $datetimes )) { ?>
									<section class="tckt-slctr-tkt-datetimes-sctn">
										<h5><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_access_heading', __( 'Event Access', 'event_espresso' )); ?></h5>
										<span class="drk-grey-text small-text no-bold"> - <?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_access_message', __( 'This ticket allows access to the following event dates and times.', 'event_espresso' )); ?></span>
										<div class="tckt-slctr-tkt-details-tbl-wrap-dv">
											<table class="tckt-slctr-tkt-details-tbl">
												<thead>
													<tr>
														<th valign="middle">
															<span class="dashicons dashicons-calendar"></span><span class="small-text"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_event_date', __( 'Event Date ', 'event_espresso' )); ?></span>
														</th>
														<th width="<?php echo $chart_column_width; ?>" valign="middle" class="">
															<span class="dashicons dashicons-clock"></span><span class="small-text"><?php _e( 'Time ', 'event_espresso' ); ?></span>
														</th>
														<?php if ( $template_settings->show_ticket_sale_columns ) : ?>
															<th width="12.5%" valign="middle" class="cntr">
																<span class="smaller-text"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_this_ticket_sold', sprintf( __( 'This Ticket%sSold', 'event_espresso' ), '<br/>' )); ?></span>
															</th>
															<th width="12.5%" valign="middle" class="cntr">
																<span class="smaller-text"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_this_ticket_left', sprintf( __( 'This Ticket%sLeft', 'event_espresso' ), '<br/>' )); ?></span>
															</th>
															<th width="12.5%" valign="middle" class="cntr">
																<span class="smaller-text"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_total_ticket_sold', sprintf( __( 'Total Tickets%sSold', 'event_espresso' ), '<br/>' )); ?></span>
															</th>
															<th width="12.5%" valign="middle" class="cntr">
																<span class="smaller-text"><?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_total_ticket_left', sprintf( __( 'Total Spaces%sLeft', 'event_espresso' ), '<br/>' )); ?></span>
															</th>
														<?php endif; //end $template_settings->show_ticket_sale_columns conditional ?>
													</tr>
												</thead>
												<tbody>
											<?php
												foreach ( $datetimes as $datetime ) {
													if ( $datetime instanceof EE_Datetime ) {
											?>

												<tr>
													<td data-th="<?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_event_date', __( 'Event Date ', 'event_espresso' )); ?>" class="small-text">
														<?php $datetime_name = $datetime->name(); ?>
														<?php echo ! empty( $datetime_name ) ? '<b>' . $datetime_name . '</b><br/>' : ''; ?>
														<?php echo $datetime->date_range( $date_format, __( ' to  ', 'event_espresso' )); ?>
													</td>
													<td data-th="<?php _e( 'Time ', 'event_espresso' ); ?>" class="cntr small-text">
														<?php echo $datetime->time_range( $time_format, __( ' to  ', 'event_espresso' )); ?>
													</td>
													<?php if ( $template_settings->show_ticket_sale_columns ) : ?>
														<td data-th="<?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_this_ticket_sold', __( 'This Ticket Sold', 'event_espresso' )); ?>" class="cntr small-text">
															<?php echo $ticket->sold(); ?>
														</td>
														<td data-th="<?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_this_ticket_left', __( 'This Ticket Left', 'event_espresso' )); ?>" class="cntr small-text">
															<?php echo $ticket->qty() === INF ? '<span class="smaller-text">' .  __( 'unlimited ', 'event_espresso' ) . '</span>' : $ticket->qty() - $ticket->sold(); ?>
														</td>
														<td data-th="<?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_total_ticket_sold', __( 'Total Tickets Sold', 'event_espresso' )); ?>" class="cntr small-text">
															<?php echo $datetime->sold(); ?>
														</td>
												<?php $tkts_left = $datetime->sold_out() ? '<span class="sold-out smaller-text">' . __( 'Sold&nbsp;Out', 'event_espresso' ) . '</span>' : $datetime->spaces_remaining(); ?>
														<td data-th="<?php echo apply_filters( 'FHEE__ticket_selector_chart_template__ticket_details_event_access_table_total_ticket_left', __( 'Total Spaces Left', 'event_espresso' )); ?>" class="cntr small-text">
															<?php echo $tkts_left === INF ? '<span class="smaller-text">' .  __( 'unlimited ', 'event_espresso' ) . '</span>' : $tkts_left; ?>
														</td>
													<?php endif; //end $template_settings->show_ticket_sale_columns conditional ?>
												</tr>
												<?php } ?>
											<?php } ?>
												</tbody>
											</table>
										</div>
									</section>
									<br/>
									<?php } ?>

								</section>

							</div>
						</td>
					</tr>
				<?php endif;  //end template_settings->show_ticket_details check?>
	<?php
			$row++;
		}
	}
?>

		</tbody>
	</table>

	<input type="hidden" name="noheader" value="true" />
	<input type="hidden" name="tkt-slctr-return-url-<?php echo $EVT_ID ?>" value="<?php echo $_SERVER['REQUEST_URI']?>" />
	<input type="hidden" name="tkt-slctr-rows-<?php echo $EVT_ID; ?>" value="<?php echo $row - 1; ?>" />
	<input type="hidden" name="tkt-slctr-max-atndz-<?php echo $EVT_ID; ?>" value="<?php echo $max_atndz; ?>" />
	<input type="hidden" name="tkt-slctr-event-id" value="<?php echo $EVT_ID; ?>" />

<?php if ( $max_atndz > 0 ) { ?>
	<p class="smaller-text lt-grey-text">* <?php echo apply_filters( 'FHEE__ticket_selector_chart_template__maximum_tickets_purchased_footnote', sprintf( __( 'Please note that a maximum number of %d tickets can be purchased for this event per order.', 'event_espresso' ), $max_atndz ));?></p>
<?php } ?>

	<?php do_action( 'AHEE__ticket_selector_chart__template__after_ticket_selector', $EVT_ID ); ?>

</div>
