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
 * bank_payment_overview_content
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
?><div class="event-display-boxes">
			<h4 id="page_title" class="payment_type_title section-heading"><?php echo $page_title ?></h4>
				<p class="instruct"><?php echo $payment_instructions ?></p>
				<p><span class="section-title"><?php _e('Name on Account:', 'event_espresso'); ?></span>
					<?php echo stripslashes_deep(empty($name_on_bank_account) ? '' : '<span class="highlight">' . $name_on_bank_account) . '</span>'; ?></p>
				<p><span class="section-title"><?php _e('Account Number:', 'event_espresso'); ?></span>
					<?php echo stripslashes_deep(empty($bank_account_number) ? '' : '<span class="highlight">' . $bank_account_number) . '</span>'; ?></p>
				<p><span class="section-title"><?php _e('Financial Institution:', 'event_espresso'); ?></span>
					<?php echo stripslashes_deep(empty($bank_name) ? '' : '<span class="highlight">' . $bank_name) . '</span>' ?></p>
				<div class="address-block">
					<?php echo wpautop(stripslashes_deep(empty($bank_address) ? '' : $bank_address)); ?>
				</div>
		</div>
<?php
// End of file bank_payment_overview_content.template.php