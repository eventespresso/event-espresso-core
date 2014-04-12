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
 * EE_Payment_Log
 * Note: this is NOT a proper 
 *
 * @package			Event Espresso
 * @subpackage		
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Payment_Log {
	protected $_ID;
	protected $_PMD_ID;
	protected $_TXN_ID;
	protected $_date;
	protected $_content;
	public function __construct($ID, $PMD_ID,$TXN_ID,$date,$content){
		$args = get_defined_vars();
		foreach($args as $var_name => $var){
			$this->set($var_name,$var);
		}
	}
	public function set($variable_name,$value){
		$property_name = $this->_get_property_name($variable_name);
		$this->$property_name = $value;
	}
	public function get($variable_name){
		$property_name = $this->_get_property_name($variable_name);
		return $this->$property_name;
	}
	protected function _get_property_name($variable){
		return "_".$variable;
	}
	/**
	 * Gets ID
	 * @return int
	 */
	function ID() {
		return $this->get('ID');
	}
	/**
	 * Gets PMD_ID
	 * @return int
	 */
	function PMD_ID() {
		return $this->get('PMD_ID');
	}

	/**
	 * Sets PMD_ID
	 * @param int $PMD_ID
	 * @return boolean
	 */
	function set_PMD_ID($PMD_ID) {
		return $this->set('PMD_ID', $PMD_ID);
	}
	
	/**
	 * Gets TXN_ID
	 * @return int
	 */
	function TXN_ID() {
		return $this->get('TXN_ID');
	}

	/**
	 * Sets TXN_ID
	 * @param int $TXN_ID
	 * @return boolean
	 */
	function set_TXN_ID($TXN_ID) {
		return $this->set('TXN_ID', $TXN_ID);
	}
	/**
	 * Gets date
	 * @return string
	 */
	function date() {
		return $this->get('date');
	}

	/**
	 * Sets date
	 * @param string $date
	 * @return boolean
	 */
	function set_date($date) {
		return $this->set('date', $date);
	}
	/**
	 * Gets content
	 * @return mixed
	 */
	function content() {
		return $this->get('content');
	}

	/**
	 * Sets content
	 * @param mixed $content
	 * @return boolean
	 */
	function set_content($content) {
		return $this->set('content', $content);
	}
	/**
	 * 
	 * @return EE_Payment_Method
	 */
	function payment_method(){
		return EEM_Payment_Method::instance()->get_one_by_ID($this->PMD_ID());
	}
	/**
	 * 
	 * @return EE_Transaction
	 */
	public function transaction(){
		return EEM_Transaction::instance()->get_one_by_ID($this->TXN_ID());
	}



	
}

// End of file EE_Payment_Log.class.php