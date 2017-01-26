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
?>
<div class="event-display-boxes">
	<?php
	if ( ! empty( $page_title )) {
		echo '<h4 id="invoice_title" class="payment_type_title section-heading">' . stripslashes_deep( $page_title ) . '</h4>';
	}
	if ( ! empty( $invoice_url )) {
		?>
		<p>
			<a href="<?php echo $invoice_url; ?>" class="ee-button-lnk inline-button ee-invoice-lnk" target="_blank">
				<?php _e('View Invoice', 'event_espresso'); ?>
			</a>
		</p>
		<?php

		if (isset($page_confirmation_text)) {
			echo '<div class="event-messages ui-state-highlight"><span class="ui-icon ui-icon-alert"></span><p class="instruct">' . stripslashes_deep($page_confirmation_text) . '</p></div>';
		}

		if ( ! empty( $page_extra_info )) {
			?>
			<div class="address-block">
				<?php echo wpautop(stripslashes_deep($page_extra_info)); ?>
			</div>
			<?php
		}
		?>
	</div>
	<?php
	}
// End of file invoice_payment_details_content.template.php
