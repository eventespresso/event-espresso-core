<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Month_Input
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Month_Input extends EE_Select_Input{

	/**
	 * @param bool  $leading_zero
	 * @param array $input_settings
	 * @param bool $january_is_month_1 whether january should have value of 1; or it should be month 0
	 */
	function __construct( $leading_zero = false, $input_settings = array(), $january_is_month_1 = true){
		$key_begin_range = $january_is_month_1 ? 1 : 0;
		$key_range = range($key_begin_range, $key_begin_range + 11 );
		if($leading_zero){
			array_walk( $key_range, array( $this, '_zero_pad' ) );	
		}
		$value_range = range( 1, 12 );
		array_walk( $value_range, array( $this, '_zero_pad' ) );
		parent::__construct(
			array_combine( 
				$key_range, 
				$value_range 
			),
			$input_settings
		);
	}
	
	/**
	 * Changes int 1 to 01, etc. Useful with array_walk
	 * @param int $input
	 * @param mixed $key
	 */
	protected function _zero_pad( &$input, $key ) {
		$input = str_pad( $input, 2, '0', STR_PAD_LEFT );
	}
}