<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE_Many_Valued_Normalization
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 */
class EE_Many_Valued_Normalization extends EE_Normalization_Strategy_Base{
	protected $_individual_item_normalization_strategy = array();
	/**
	 *
	 * @param EE_Normalization_Strategy_Base $individual_item_normalization_strategy
	 */
	public function __construct($individual_item_normalization_strategy) {
		$this->_individual_item_normalization_strategy = $individual_item_normalization_strategy;
		parent::__construct();
	}
	/**
	 * Normalizes the input into an array, and normalizes each item according to its
	 * individual item normalization strategy
	 * @param array | string 	$value_to_normalize
	 * @return array
	 */
	public function normalize($value_to_normalize) {
		if ( is_array( $value_to_normalize )){
			$items_to_normalize = $value_to_normalize;
		} else if( $value_to_normalize !== NULL ){
			$items_to_normalize = array( $value_to_normalize );
		} else {
			$items_to_normalize = array();
		}
		$normalized_array_value = array();
		foreach( $items_to_normalize as $key => $individual_item ){
			$normalized_array_value[ $key ] = $this->normalize_one( $individual_item );
		}
		return $normalized_array_value;
	}

	/**
	 * Normalized the one item (called for each array item in EE_Many_values_Normalization::normalize())
	 * @param string $individual_value_to_normalize but definitely NOT an array
	 * @return mixed
	 */
	public function normalize_one( $individual_value_to_normalize ) {
		return $this->_individual_item_normalization_strategy->normalize( $individual_value_to_normalize );
	}

	/**
	 * Converts the array of normalized things to an array of raw html values.
	 * @param array $normalized_values
	 * @return string[]
	 */
	public function unnormalize( $normalized_values ) {
		if( $normalized_values === null ) {
			$normalized_values = array();
		}
		if( ! is_array( $normalized_values ) ){
			$normalized_values = array( $normalized_values );
		}
		$non_normal_values = array();
		foreach( $normalized_values as $key => $value ) {
			$non_normal_values[ $key ] = $this->unnormalize_one( $value );
		}
		return $non_normal_values;
	}

	/**
	 * Unnormalizes an individual item in the array of values
	 * @param mixed $individual_value_to_unnormalize but certainly NOT an array
	 * @return string
	 */
	public function unnormalize_one( $individual_value_to_unnormalize ) {
		return $this->_individual_item_normalization_strategy->unnormalize( $individual_value_to_unnormalize );
	}
}



// End of file EE_Many_Valued_Normalization.strategy.php