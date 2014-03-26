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
 * EE_Template_Layout
 * 
 * For very customized layouts, where you provide this class with the location of
 * a template file to use for laying out the form section. Inherits from EE_Div_per_Section
 * in case you call layout_input() or layout_proper_subsection(), or get_html_for_label(), 
 * get_html_for_input(), or get_html_for_errors() on one if the form section's inputs.
 * When would you want to use this instead of just laying out the form's subsections manually
 * in a template file? When you want a very customized layout, but that layout is essential
 * to the form; so that if you were to use the same form on two different pages (eg a contact form,
 * one on the website's frontend for contacting the site admin, and then again on the backend for
 * contacting the plugin's developer), you would still use this exact same template layout strategy.
 * (Eg, if you wanted to add a button to that same form for automatically adding "@gmail.com" or "@yahoo.com"
 * onto the 'from' input. The input is important to the form section on either page, but isn't an input so it's best
 * added as a part of the template layout.)
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Template_Layout extends EE_Div_Per_Section_Layout{
	protected $_layout_templatet_file;
	protected $_input_template_file;
	protected $_subsection_template_file;
	public function __construct($layout_template_file,$input_template_file = NULL,$subsection_template_file = NULL) {		
		$this->_layout_templatet_file = $layout_template_file;
		$this->_input_template_file = $input_template_file;
		$this->_subsection_template_file = $subsection_template_file;
		parent::__construct();
	}
	public function layout_form() {
		EE_Registry::instance()->load_helper('Template');
		return EEH_Template::locate_template($this->_layout_templatet_file, true, $this->_form_section, true);
	}
	/**
	 * If an input_template_file was provided upon construction, uses that to layout the input. Otherwise uses parent.
	 * @see EE_DIv_Per_Section_Layout::layout_input() for documentation
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_input($input) {
		if($this->_input_template_file){
			EE_Registry::instance()->load_helper('Template');
			return EEH_Template::locate_template($this->_input_template_file, true, array('input'=>$input), true);
		}
		return parent::layout_input($input);
	}
	/**
	 * If a subsection_template_file was provided upon construction, uses that to layout the subsection. Otherwise uses parent.
	 * @see EE_DIv_Per_Section_Layout::layout_proper_subsection() for documentation
	 * @param EE_Form_Input_Base $input
	 * @return string
	 */
	public function layout_proper_subsection($formsection) {
		
		if($this->_subsection_template_file){
			EE_Registry::instance()->load_helper('Template');
			return EEH_Template::locate_template($this->_subsection_template_file, true, array('form'=>$formsection), true);
		}
		return parent::layout_proper_subsection($formsection);
	}
}

// End of file EE_Template_Layout.strategy.php