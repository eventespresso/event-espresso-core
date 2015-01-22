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
 * authorize_net_aim_debug_info
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
?>
	<div class="sandbox-panel">
		<h2>
			<?php _e( 'Authorize.net AIM Test Mode', 'event_espresso' ); ?>
		</h2>

		<p>
			<?php _e( 'Test Mode allows you to submit test transactions to the payment gateway. Transactions that are submitted while Test Mode is ON are NOT actually processed. The result of a transaction depends on the card number submitted, and the invoice amount. If you want a transaction to be approved, use one of the following card numbers.', 'event_espresso' ); ?>
		</p>

		<p>
			<strong><?php _e( 'Example Card Numbers:', 'event_espresso' ); ?></strong>
		</p>

		<p>
			370000000000002 (<?php _e( 'American Express', 'event_espresso' ); ?>)<br/>
			6011000000000012 (<?php _e( 'Discover', 'event_espresso' ); ?>)<br/>
			5424000000000015 (<?php _e( 'MasterCard', 'event_espresso' ); ?>)<br/>
			4007000000027 (<?php _e( 'Visa', 'event_espresso' ); ?>)
		</p>
	</div>
<?php

// End of file authorize_net_aim_debug_info.template.php