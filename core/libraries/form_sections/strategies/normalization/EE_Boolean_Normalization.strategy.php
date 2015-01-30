<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Boolean_Normalization
 * Just casts it to a boolean (so we're assuming that we're only receiving 0 and 1s as
 * inputs. DOes not handle stuff like 'yes','true','money',whatever. 1s and 0s.
 * Does not growl because the only reason they would NOT have a 1 or 0, using something like
 * a select or checkbox, is because they hacked the form
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Boolean_Normalization extends EE_Normalization_Strategy_Base{

	/**
	 * @param string | int | bool $value_to_normalize
	 * @return boolean
	 */
	public function normalize( $value_to_normalize ) {
		return filter_var( $value_to_normalize, FILTER_VALIDATE_BOOLEAN );
	}



	/**
	 *
	 * @param boolean $normalized_value
	 * @return string
	 */
	public function unnormalize( $normalized_value ) {
		if( $normalized_value ){
			return '1';
		}else{
			return '0';
		}
	}



}

// End of file EE_Boolean_Normalization.strategy.php