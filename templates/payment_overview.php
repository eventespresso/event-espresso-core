<?php

function espresso_display_payment_overview_template($data) {
	global $org_options;
	?>
	<div class="espresso_payment_overview event-display-boxes ui-widget" >
		<h3 class="section-heading display-box-heading ui-widget-header ui-corner-top">
	<?php _e('Payment Overview', 'event_espresso'); ?>
		</h3>
		<div class="event-data-display  ui-widget-content ui-corner-bottom">
			<h4 class="section-title list-events">
			<?php _e('Class/Event:', 'event_espresso'); ?>
			</h4>
				<div>
				<?php echo implode( '<br />', $data['events'] ); ?>
				</div>
			<h4 class="section-title"><?php _e('Registration  Details:', 'event_espreso'); ?></h4>
			<div class="reg-gen-details">
				<table id="thank-you-page-reg-details-tbl">
					<tbody>			
						<tr>
							<td>
								<label><?php _e('Primary Registrant:', 'event_espresso'); ?></label>
							</td>
							<td>
								<?php echo stripslashes_deep($data['fname'] . ' ' . $data['lname']); ?>
							</td>
						</tr>
						<?php if( ! empty( $data['txn_type'] )) : ?>
						<tr>
							<td>
								<label><?php _e('Payment Type:', 'event_espresso'); ?></label>
							</td>
							<td>
								<?php echo $data['txn_type']; ?>
							</td>
						</tr>
						<?php endif;?>
						<?php if( $data['payment_date'] == '' || ($data['payment_status'] == 'Pending' && (espresso_payment_type($data['txn_type']) == 'Invoice' || espresso_payment_type($data['txn_type']) == 'Offline payment'))) : ?>
						<tr>
							<td>
								<label><?php _e('Payment Date:', 'event_espresso'); ?></label>
							</td>
							<td>
								<?php echo event_date_display($data['payment_date']); ?>
							</td>
						</tr>
						<?php endif;?>
						<tr>
							<td>
								<label><?php _e('Amount Paid/Owed:', 'event_espresso'); ?></label>
							</td>
							<td>
							<?php echo event_espresso_paid_status_icon($data['payment_status']) . ' ' . $org_options['currency_symbol'] . number_format( $data['total_cost'], 2, '.', ',' ); ?>
							</td>
						</tr>
						<tr>
							<td>
								<label><?php _e('Payment Status:', 'event_espresso'); ?></label>
							</td>
							<td>
								<?php echo $data['payment_status']; ?>
							</td>
						</tr>
						<tr>
							<td>
								<label><?php _e('Registration ID:', 'event_espresso'); ?></label>
							</td>
							<td>
								<?php echo $data['registration_id']; ?>
							</td>
						</tr>
						<?php if( ! empty( $data['txn_id'] )) : ?>
						<tr>
							<td>
								<label><?php _e('Transaction ID:', 'event_espresso'); ?></label>
							</td>
							<td>
								<?php echo $data['txn_id']; ?>
							</td>
						</tr>
						<?php endif;?>
					</tbody>
				</table>					
			</div><!-- / .reg-gen-details -->
		</div><!-- / .event-data-display -->
	</div><!-- / .event-display-boxes -->
	<?php
}

add_action('action_hook_espresso_display_payment_overview_template', 'espresso_display_payment_overview_template');