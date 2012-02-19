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
				<?php foreach ($data->events as $event) { ?>
				<div>
				<?php echo stripslashes_deep($event->event_link) ?>
				</div>
	<?php } ?>
			<h4 class="section-title"><?php _e('Registration  Details:', 'event_espreso'); ?></h4>
			<div class="reg-gen-details">
				<dl class="dl-inline">
					<dt>
	<?php _e('Primary Registrant:', 'event_espresso'); ?>
					</dt>
					<dd><?php echo stripslashes_deep($data->attendees[0]->fname . ' ' . $data->attendees[0]->lname) ?></dd>
					<?php echo $data->txn_type == '' ? '' : '<dt>' . __('Payment Type:', 'event_espresso') . '</dt> <dd>' . espresso_payment_type($data->txn_type) . '</dd>'; ?> <?php echo ($data->payment_date == '' || ($data->payment_status == 'Pending' && (espresso_payment_type($data->txn_type) == 'Invoice' || espresso_payment_type($data->txn_type) == 'Offline payment'))) ? '' : '<dt>' . __('Payment Date:', 'event_espresso') . '</dt> <dd>' . event_date_display($data->payment_date) . '</dd>'; ?>
					<dt>
	<?php _e('Amount Paid/Owed:', 'event_espresso'); ?>
					</dt>
					<dd><?php echo $org_options['currency_symbol'] ?><?php echo $data->total_cost ?>
	<?php event_espresso_paid_status_icon($data->payment_status) ?>
					</dd>
					<dt>
	<?php _e('Payment Status:', 'event_espresso'); ?>
					</dt>
					<dd><?php echo $data->payment_status ?></dd>
					<dt>
	<?php _e('Registration ID:', 'event_espresso'); ?>
					</dt>
					<dd><?php echo $data->attendees[0]->registration_id ?></dd>
	<?php echo $data->txn_id == '' ? '' : '<dt>' . __('Transaction ID:', 'event_espresso') . '</dt> <dd>' . $data->txn_id . '</dd>'; ?>
				</dl>
			</div><!-- / .reg-gen-details -->
		</div><!-- / .event-data-display -->
	</div><!-- / .event-display-boxes -->
	<?php
}

add_action('action_hook_espresso_display_payment_overview_template', 'espresso_display_payment_overview_template');