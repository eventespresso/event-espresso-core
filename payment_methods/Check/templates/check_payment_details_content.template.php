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
 * check_payment_details_content
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
?>
		<div class="event-display-boxes">
			<h4 id="check_title" class="payment_type_title section-heading"><?php echo $check_title ?></h4>
			<p class="instruct"><?php echo $payment_instructions; ?></p>
			<p>
				<span class="section-title"><?php _e('Payable to:', 'event_espresso'); ?></span>
				<span class="highlight"><?php echo $payable_to; ?></span>
			</p>
			<p class="section-title"><?php _e('Payment Address: ', 'event_espresso'); ?></p>
			<div class="address-block">
				<?php echo wpautop($address_to_send_payment); ?>
			</div>
		</div>
		<?php
// End of file check_payment_details_content.template.php