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
 * invoice_settings_header_gateway
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
?>
	<tr>
		<th><h3><?php _e("Invoice Gateway Settings", 'event_espresso');?></h3></th>
		<td>
			<span class="description"><?php _e("The following settings affect the functioning of the Invoice gateway.", 'event_espresso');?></span>
		</td>
	</tr>
<?php

// End of file invoice_settings_header_gateway.template.php