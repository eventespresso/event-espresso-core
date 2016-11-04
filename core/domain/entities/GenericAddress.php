<?php
namespace EventEspresso\core\domain\entities;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class GenericAddress
 *
 * @package       Event Espresso
 * @subpackage    core\entities\
 * @author        Brent Christensen
 * @since         4.8
 */
class GenericAddress implements \EEI_Address {

	private $_address     = '';

	private $_address2    = '';

	private $_city        = '';

	private $_state_ID    = '';

	private $_state_obj   = '';

	private $_zip         = '';

	private $_country_ID  = '';

	private $_country_obj = '';



	/**
	 * @param string              $address
	 * @param string              $address2
	 * @param string              $city
	 * @param \EE_State | string   $state
	 * @param string              $zip
	 * @param \EE_Country | string $country
	 * @return GenericAddress
	 */
	public function __construct( $address, $address2, $city, $state, $zip, $country ) {
		$this->_address = $address;
		$this->_address2 = $address2;
		$this->_city = $city;
		if ( $state instanceof \EE_State ) {
			$this->_state_obj = $state;
		} else {
			$this->_state_ID = $state;
			$this->_state_obj = $this->_get_state_obj();
		}
		$this->_zip = $zip;
		if ( $country instanceof \EE_Country ) {
			$this->_country_obj = $country;
		} else {
			$this->_country_ID = $country;
			$this->_country_obj = $this->_get_country_obj();
		}
	}



	/**
	 * @return string
	 */
	public function address() {
		return $this->_address;
	}



	/**
	 * @return string
	 */
	public function address2() {
		return $this->_address2;
	}



	/**
	 * @return string
	 */
	public function city() {
		return $this->_city;
	}



	/**
	 * @return \EE_State
	 */
	private function _get_state_obj() {
		return $this->_state_obj instanceof \EE_State
			? $this->_state_obj
			: \EE_Registry::instance()->load_model( 'State' )->get_one_by_ID( $this->_state_ID );
	}



	/**
	 * @return string
	 */
	public function state_ID() {
		return $this->_state_ID;
	}



	/**
	 * @return string
	 */
	public function state_abbrev() {
		return $this->state_obj() instanceof \EE_State
			? $this->state_obj()->abbrev()
			: '';
	}



	/**
	 * @return string
	 */
	public function state_name() {
		return $this->state_obj() instanceof \EE_State
			? $this->state_obj()->name()
			: '';
	}



	/**
	 * @return \EE_State
	 */
	public function state_obj() {
		return $this->_state_obj;
	}



	/**
	 * @return string
	 */
	public function state() {
		if ( apply_filters( 'FHEE__EEI_Address__state__use_abbreviation', true, $this->state_obj() ) ) {
			return $this->state_obj()->abbrev();
		} else {
			return $this->state_name();
		}
	}



	/**
	 * @return \EE_Country
	 */
	private function _get_country_obj() {
		return $this->_country_obj instanceof \EE_Country
			? $this->_country_obj
			: \EE_Registry::instance()->load_model( 'Country' )->get_one_by_ID( $this->_country_ID );
	}



	/**
	 * @return string
	 */
	public function country_ID() {
		return $this->_country_ID;
	}



	/**
	 * @return string
	 */
	public function country_name() {
		return $this->country_obj() instanceof \EE_Country
			? $this->country_obj()->name()
			: '';
	}



	/**
	 * @return \EE_Country
	 */
	public function country_obj() {
		return $this->_country_obj;
	}



	/**
	 * @return string
	 */
	public function country() {
		if ( apply_filters( 'FHEE__EEI_Address__country__use_abbreviation', true, $this->country_obj() ) ) {
			return $this->country_ID();
		} else {
			return $this->country_name();
		}
	}



	/**
	 * @return string
	 */
	public function zip() {
		return $this->_zip;
	}

}
// End of file GenericAddress.php
// Location: core/entities/GenericAddress.php