<?php
class EE_Sample_Form extends EE_Form_Section_Proper{
	function __construct(){
		$this->_subsections = array(
			'input1'=>new EE_Text_Input(array('required'=>true))
		);
		parent::__construct();
	}
}