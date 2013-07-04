<?php
class EE_Sample_Form extends EE_Form_Section_Proper{
	function __construct(){
		$this->_subsections = array(
			'name'=>new EE_Text_Input(array('required'=>true)),
			'email'=>new EE_Email_Input(array('required'=>true)),
		);
		parent::__construct();
	}
}