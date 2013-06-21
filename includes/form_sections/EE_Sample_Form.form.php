<?php
require_once('base/EE_Form_Section_Proper.form.php');
class EE_Sample_Form extends EE_Form_Section_Proper{
	function __construct(){
		require_once('inputs/EE_Text_Input.input.php');
		$this->_subsections = array(
			'input1'=>new EE_Text_Input()
		);
	}
}