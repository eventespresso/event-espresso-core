<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Yes_No_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Yes_No_Input extends EE_Select_Input{

	/**
	 * @param array $options
	 */
	function __construct( $options = array()){
		$select_options = array(true=>  __("Yes", "event_espresso"),false=>  __("No", "event_espresso"));

		parent::__construct($select_options,$options);
	}
}
