<?php  if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit( 'No direct script access allowed' ); }
/**
 * Class EE_Country_Select_Input
 *
 * Generates an HTML <select> form input
 * and populates it with a list of Countries from the wp_esp_country table
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				Brent Christensen
 * @since 				$VID:$
 *
 */
class EE_Country_Select_Input extends EE_Select_Input{

	/**
	 * @param array $country_options
	 * @param array $input_settings
	 * @return EE_Country_Select_Input
	 */
	public function __construct( $country_options = NULL, $input_settings = array() ){
		$country_options = apply_filters(
			'FHEE__EE_Country_Select_Input____construct__country_options',
			$this->get_country_answer_options( $country_options ),
			$this
		);
		$input_settings['html_class'] = isset( $input_settings['html_class'] )
			? $input_settings['html_class'] . ' ee-country-select-js'
			: 'ee-country-select-js';
		parent::__construct( $country_options, $input_settings );
	}



	/**
	 * get_country_answer_options
	 *
	 * @param array $country_options
	 * @return array
	 */
	public function get_country_answer_options( $country_options = NULL ){
		// if passed something that is NOT an array
		if ( ! is_array( $country_options )) {
			// get possibly cached list of countries
			$countries = EEM_Country::instance()->get_all_active_countries();
			if ( ! empty( $countries )) {
				$country_options[ '' ] = '';
				foreach( $countries as $country ){
					if ( $country instanceof EE_Country ) {
						$country_options[ $country->ID() ] = $country->name();
					}
				}
			} else {
				$country_options = array();
			}
		}
		return $country_options;
	}

}