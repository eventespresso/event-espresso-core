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
 * EE_Hidden_Display_Strategy
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Hidden_Display_Strategy extends EE_Display_Strategy_Base{
	/**
	 * 
	 * @return string of html to display the HIDDEN field
	 */
	function display(){
		$input = $this->_input;		
		return "<input type='hidden' id='{$input->html_id()}' name='{$input->html_name()}' class='{$input->html_class()}' style='{$input->html_style()}' value='{$input->raw_value_in_form()}' {$input->other_html_attributes()}/>";
	}
}

// End of file EE_Hidden_Display_Strategy.strategy.php