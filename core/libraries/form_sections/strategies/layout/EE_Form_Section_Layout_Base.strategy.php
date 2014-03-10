<?php
/**
 * Abstract parent class for all form layouts. Mostly just contains a reference to the form 
 * we are to lay out.
 * Form layouts should add HTML content for each form section (eg a header and footer)
 * for the form section, and dictate how to layout all the inputs and proper subsections
 * (laying out where to put the input's label, the actual input widget, and its errors; and
 * stating where the proper subsections should be placed (but usually leaving them to layout
 * their own headers and footers etc).
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
	 * this form.
	 * Creates all the HTML necessary for displaying this form, its inputs, and
	 * proper subsections.
	 * Returns the HTML
	 * @return string HTML for displaying
	 */
	abstract function layout_form();
	/**
	 * Should be used internally by layout_form() to layout each input (eg, if this layout
	 * is putting each input in a row of its own, this should probably be called by a
	 *  foreach loop in layout_form() (WITHOUT adding any content directly within layout_form()'s foreach loop.
	 * Eg, this method should add the tr and td tags). This method is exposed in case you want to completely
	 * customize the form's layout, but would like to make use of it for laying out 
	 * 'easy-to-layout' inputs
	 * @param EE_Form_Input_Base $input
	 * @return string html
	 */
	abstract function layout_input($input);
	/**
	 * Similar to layout_input(), should be used internally by layout_form() within a 
	 * loop to layout each proper subsection. Unlike layout_input(), however, it is assumed
	 * that the proper subsection will layout its container, label, etc on its own.
	 * @param EE_Form_Section_Proper $subsection
	 * @return string html
	 */
	abstract function layout_proper_subsection($subsection);
}