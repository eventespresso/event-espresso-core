<?php

if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.3
 *
 * ------------------------------------------------------------------------
 *
 * payment_log_details
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
/*@var EE_Payment_Log $payment_Log */
?>
<div class="padding">
	<table class="form-table">
		<tbody>

			<tr>
				<th>
					<label>
						<?php _e('ID', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php $payment_log->ID()?>
					
				</td>
			</tr>
			<tr>
				<th>
					<label>
						<?php _e('Payment Method', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo $payment_log->payment_method() ? $payment_log->payment_method()->admin_name() : __("No Longer Exists", 'event_espresso')?>
					
				</td>
			</tr>
			<tr>
				<th>
					<label>
						<?php _e('Transaction', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo $payment_log->transaction()->ID()?>
					
				</td>
			</tr>
			<tr>
				<th>
					<label>
						<?php _e('Content', 'event_espresso'); ?>
					</label>
				</th>
				<td>
					<?php echo EEH_Template::layout_array_as_table($payment_log->content())?>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<?php
// End of file payment_log_details.template.php