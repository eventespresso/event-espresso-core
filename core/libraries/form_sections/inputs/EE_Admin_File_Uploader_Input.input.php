<?php

class EE_Admin_File_Uploader_Input extends EE_Form_Input_Base{
	
	function __construct($options = array()){
		$this->_set_display_strategy(new EE_Admin_File_Uploader_Display_Strategy());
		$this->_set_normalization_strategy(new EE_Text_Normalization());
		$this->_add_validation_strategy(new EE_URL_Validation_Strategy());
		parent::__construct($options);
	}
}