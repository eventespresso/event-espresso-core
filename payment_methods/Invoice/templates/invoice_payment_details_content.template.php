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
 * invoice_payment_details_content
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
if (!$show_on_page){
	return;
}
?>
<div class="event-display-boxes">
	<?php if (isset($page_title)) { ?>

		<?php
		echo '<h4 id="invoice_title" class="payment_type_title section-heading">' . stripslashes_deep($page_title) . '</h4>';
	}

	?>
	<p><a href="<?php echo $payment->transaction()->primary_registration()->invoice_url('download') ?>" class="ee-button-lnk inline-button ui-priority-primary ui-state-default ui-state-hover ui-state-focus ui-corner-all" target="_blank">
			<?php _e('Download PDF Invoice', 'event_espresso'); ?>
		</a></p>
	<?php
	if (isset($page_instructions)) {
		echo '<div class="event-messages ui-state-highlight"><span class="ui-icon ui-icon-alert"></span><p class="instruct">' . stripslashes_deep($page_instructions) . '</p></div>';
	}
	if (isset($page_payable_to)) {
		?>
		<p>
			<span class="section-title"><?php _e('Payable to:', 'event_espresso'); ?></span>
			<span class="highlight"><?php echo $page_payable_to; ?></span>
		</p>
		<?php
	}
	
	if (isset($payment_address)) {
		?>
		<div class="address-block">
			<?php echo wpautop(stripslashes_deep($page_address_payable)); ?>
		</div>
		<?php
	}
	?>
</div>
<?php
// End of file invoice_payment_details_content.template.php