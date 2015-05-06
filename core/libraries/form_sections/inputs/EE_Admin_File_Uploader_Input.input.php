<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Class EE_Admin_File_Uploader_Input
 *
 * @package            Event Espresso
 * @subpackage    core
 * @author                Mike Nelson
 * @since                4.6
 *
 */
class EE_Admin_File_Uploader_Input extends EE_Form_Input_Base{

	/**
	 * @param array $input_settings
	 */
	function __construct($input_settings = array()){
		$this->_set_display_strategy(new EE_Admin_File_Uploader_Display_Strategy());
		$this->_set_normalization_strategy(new EE_Text_Normalization());
		$this->_add_validation_strategy(new EE_URL_Validation_Strategy( isset( $input_settings[ 'validation_error_message' ] ) ? $input_settings[ 'validation_error_message' ] : NULL ) );
		parent::__construct($input_settings);
	}
}