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
 * EE_Billing_Info_Form
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Billing_Info_Form extends EE_Form_Section_Proper{
	public function __construct($options_array= array()){
		
		$this->_subsections = array(
			'first_name'=>new EE_Text_Input(),
			'last_name'=>new EE_Text_Input(),
			'email'=>new EE_Email_Input(),
			'address1'=>new EE_Text_Input(array(
				'html_label_text'=>  __("Address", 'event_espresso')
			)),
			'address2'=>new EE_Text_Input(array(
				'html_label_text'=> __("Address (cont.)", 'event_espresso')
			)),
			'city'=>new EE_Text_Input(),
//			'province'=>
//			'country'=>,
			'zip'=>new EE_Text_Input()
		);
		parent::construct($options_array);
	}
}

// End of file EE_Billing_Info_Form.form.php