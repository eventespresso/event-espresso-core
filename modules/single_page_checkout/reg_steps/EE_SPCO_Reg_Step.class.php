<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
 /**
 *
 * Class EE_SPCO_Reg_Step
 *
 * Description
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				4.5.0
 *
 */
abstract class EE_SPCO_Reg_Step {

	/**
	 * 	$_slug - URL param for this step
	 * 	@access protected
	 *	@type string $_slug
	 */
	protected $_slug = NULL;

	/**
	 * 	$_name - Step Name - translatable string
	 * 	@access protected
	 *	@type string $_slug
	 */
	protected $_name = NULL;

	/**
	 * 	$_template - template name
	 * 	@access protected
	 *	@type string $_template
	 */
	protected $_template = NULL;


	abstract public function translate_js_strings();
	abstract public function enqueue_styles_and_scripts();
	abstract public function display_reg_step();
	abstract public function process_reg_step();
	abstract public function finalize_reg_step();

}



// End of file EE_SPCO_Reg_Step.class.php
// Location: /EE_SPCO_Reg_Step.class.php