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
 * Default form which can be used by payment method types for their billing info
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Billing_Info_Form extends EE_Form_Section_Proper{
	/**
	 * 
	 * @param array $options_array @see EE_Form_Section_Proper::__construct()
	 */
	public function __construct($options_array= array()){
		$countries = EEM_Country::instance()->get_all(array(array('CNT_active'=>true)));
		$country_options = array();
		foreach($countries as $country){
			$country_options[$country->ID()] = $country->name();
		}
		$states = EEM_State::instance()->get_all(array(array('CNT_ISO'=>array('IN',array_keys($countries))),'force_join'=>array('Country')));
		$states_organized = array();
		foreach($states as $state){
			$states_organized[$state->country()->name()][$state->name()] = $state->name();
		}
		$this->_subsections = array_merge($this->_subsections,array(
			'first_name'=>new EE_Text_Input(array('required'=>true)),
			'last_name'=>new EE_Text_Input(array('required'=>true)),
			'email'=>new EE_Email_Input(),
			'address'=>new EE_Text_Input(array(
				'html_label_text'=>  __("Address", 'event_espresso')
			)),
			'address2'=>new EE_Text_Input(array(
				'html_label_text'=> __("Address (cont.)", 'event_espresso')
			)),
			'city'=>new EE_Text_Input(),
			'state'=>new EE_Select_Input($states_organized),
			'country'=>new EE_Select_Input($country_options),
			'zip'=>new EE_Text_Input(),
			'phone'=>new EE_Text_Input(),
		));
		parent::__construct($options_array);
	}
	/**
	 * Sets the defaults for the billing form according to the attendee's details
	 * @param EE_Attendee $attendee
	 */
	public function populate_from_attendee($attendee){
		$attendee = EEM_Attendee::instance()->ensure_is_obj($attendee);
		$state = $attendee->state_obj();
		$country = $attendee->country_obj();
		$this->populate_defaults(array(
			'first_name'=>$attendee->fname(),
			'last_name'=>$attendee->lname(),
			'email'=>$attendee->email(),
			'address'=>$attendee->address(),
			'address2'=>$attendee->address2(),
			'city'=>$attendee->city(),
			'state'=> $state ? $attendee->state_obj()->name() : '',
			'country'=> $country ? $attendee->country_obj()->name() : '',
			'zip'=>$attendee->zip(),
			'phone'=>$attendee->phone(),
		));
	}
}

// End of file EE_Billing_Info_Form.form.php