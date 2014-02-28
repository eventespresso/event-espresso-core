<?php
/**
 * Abstract parent class for all form layouts. Mostly just contains a reference to the form 
 * we are to lay out
 */
abstract class EE_Form_Section_Layout_Base{
	/**
	 * Form form section to lay out
	 * @var EE_Form_Section_Proper
	 */
	protected $_form_section;
	
	function __construct(){
		
	}

	/**
	 * The form section on which this strategy is to perform
	 * @param EE_Form_Section_Proper $form
	 */
	function _construct_finalize(EE_Form_Section_Proper $form){
		$this->_form_section = $form;
	}
	
	/**
	 * Also has teh side effect of enqueuing any needed JS and CSS for
	 * this form
	 * @return string HTML for displaying
	 */
	abstract function layout_form();
	
	abstract function layout_input($input);
	abstract function layout_proper_subsection($subsection);
}