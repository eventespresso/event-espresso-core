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
 * EE_Paypal_Standard_Form
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Paypal_Standard_Form extends EE_Payment_Method_Form{
	public function __construct($options_array = array()) {
		$this->_extra_meta_inputs = array(
			'paypal_email'=>new EE_Email_Input(),
			'shipping_override'=>new EE_Yes_No_Input(),
		);
		parent::__construct($options_array);
	}
}

// End of file EE_Paypal_Standard_Form.form.php