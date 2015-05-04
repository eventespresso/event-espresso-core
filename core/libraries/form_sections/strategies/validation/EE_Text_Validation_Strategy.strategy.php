<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Text_Validation_Strategy
 * Optionally, a regular expression can be provided that will be used for validation.
 *
 * @package			Event Espresso
 * @subpackage	Expression package is undefined on line 19, column 19 in Templates/Scripting/PHPClass.php.
 * @author				Mike Nelson
 */
class EE_Text_Validation_Strategy extends EE_Validation_Strategy_Base{

	protected $_regex = null;
	public function __construct( $validation_error_message = NULL, $regex = null ) {
		$this->_regex = null;
		parent::__construct( $validation_error_message );
	}

	/**
	 * @param $normalized_value
	 */
	public function validate($normalized_value) {
		if( $this->_regex && $normalized_value) {
			if( ! preg_match( $this->_regex, $normalized_value ) ) {
				throw new EE_Validation_Error( $this->get_validation_error_message(), 'regex' );
			}
		}
	}

	/**
	 * @return array
	 */
	function get_jquery_validation_rule_array(){
		if( $this->_regex !== null ){
			return array( 'regex'=>true, 'messages' => array( 'regex' => $this->get_validation_error_message() ) );
		}else{
			return array();
		}

	}
}

// End of file EE_FUll_HTML_Validation_Strategy.strategy.php