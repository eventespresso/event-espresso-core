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
	 * 	$_order - when the reg step should be run relative to other steps
	 * 	@access protected
	 *	@type int $_template
	 */
	protected $_order = NULL;

	/**
	 * 	$_template - template name
	 * 	@access protected
	 *	@type string $_template
	 */
	protected $_template = NULL;

	/**
	 * 	$checkout - EE_Checkout object for handling the properties of the current checkout process
	 * 	@access public
	 *	@var EE_Checkout $checkout
	 */
	public $checkout = NULL;




	/**
	 * @return string
	 */
	public function name() {
		return $this->_name;
	}



	/**
	 * @return string
	 */
	public function slug() {
		return $this->_slug;
	}



	/**
	 * @param int $order
	 */
	public function set_order( $order ) {
		$this->_order = $order;
	}



	/**
	 * @return int
	 */
	public function order() {
		return $this->_order;
	}



	/**
	 * @return string
	 */
	public function template() {
		return $this->_template;
	}



	/**
	 * @return void
	 */
	abstract public function translate_js_strings();

	/**
	 * @return void
	 */
	abstract public function enqueue_styles_and_scripts();

	/**
	 * @return boolean
	 */
	abstract public function initialize_reg_step();

	/**
	 * @return string
	 */
	abstract public function display_reg_step();

	/**
	 * @return boolean
	 */
	abstract public function process_reg_step();

	/**
	 * @return boolean
	 */
	abstract public function update_reg_step();



}

// End of file EE_SPCO_Reg_Step.class.php
// Location: /EE_SPCO_Reg_Step.class.php