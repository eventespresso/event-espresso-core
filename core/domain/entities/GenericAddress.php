<?php

namespace EventEspresso\core\domain\entities;

use EE_Country;
use EE_Error;
use EE_Registry;
use EE_State;
use EventEspresso\core\services\address\AddressInterface;
use ReflectionException;

/**
 * Class GenericAddress
 *
 * @package       Event Espresso
 * @subpackage    core\entities\
 * @author        Brent Christensen
 * @since         4.8
 */
class GenericAddress implements AddressInterface
{
    // phpcs:disable PSR2.Classes.PropertyDeclaration.Underscore
    /**
     * @var string
     */
    private $_address;

    /**
     * @var string
     */
    private $_address2;

    /**
     * @var string
     */
    private $_city;

    /**
     * @var int
     */
    private $_state_ID = 0;

    /**
     * @var EE_State
     */
    private $_state_obj;

    /**
     * @var string
     */
    private $_zip;

    /**
     * @var string
     */
    private $_country_ID = '';

    /**
     * @var EE_Country
     */
    private $_country_obj;
    // phpcs:enable


    // phpcs:disable PSR2.Methods.MethodDeclaration.Underscore
    /**
     * @param string            $address
     * @param string            $address2
     * @param string            $city
     * @param EE_State|int      $state
     * @param string            $zip
     * @param EE_Country|string $country
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(string $address, string $address2, string $city, $state, string $zip, $country)
    {
        $this->_address  = $address;
        $this->_address2 = $address2;
        $this->_city     = $city;
        if ($state instanceof EE_State) {
            $this->_state_obj = $state;
        } else {
            $this->_state_ID  = $state;
            $this->_state_obj = $this->_get_state_obj();
        }
        $this->_zip = $zip;
        if ($country instanceof EE_Country) {
            $this->_country_obj = $country;
        } else {
            $this->_country_ID  = $country;
            $this->_country_obj = $this->_get_country_obj();
        }
    }


    /**
     * @return string
     */
    public function address(): string
    {
        return $this->_address;
    }


    /**
     * @return string
     */
    public function address2(): string
    {
        return $this->_address2;
    }


    /**
     * @return string
     */
    public function city(): string
    {
        return $this->_city;
    }

    // phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps


    /**
     * @return EE_State
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_state_obj(): EE_State
    {
        return $this->_state_obj instanceof EE_State
            ? $this->_state_obj
            : EE_Registry::instance()->load_model('State')->get_one_by_ID($this->_state_ID);
    }


    /**
     * @return int
     */
    public function state_ID(): int
    {
        return $this->_state_ID;
    }


    /**
     * @return string
     */
    public function state_abbrev(): string
    {
        return $this->state_obj() instanceof EE_State
            ? $this->state_obj()->abbrev()
            : '';
    }


    /**
     * @return string
     */
    public function state_name(): string
    {
        return $this->state_obj() instanceof EE_State
            ? $this->state_obj()->name()
            : '';
    }


    /**
     * @return EE_State
     */
    public function state_obj(): EE_State
    {
        return $this->_state_obj;
    }


    /**
     * @return string
     */
    public function state(): string
    {
        if (apply_filters('FHEE__EEI_Address__state__use_abbreviation', true, $this->state_obj())) {
            return $this->state_obj()->abbrev();
        } else {
            return $this->state_name();
        }
    }


    /**
     * @return EE_Country
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _get_country_obj(): EE_Country
    {
        return $this->_country_obj instanceof EE_Country
            ? $this->_country_obj
            : EE_Registry::instance()->load_model('Country')->get_one_by_ID($this->_country_ID);
    }


    /**
     * @return string
     */
    public function country_ID(): string
    {
        return $this->_country_ID;
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function country_name(): string
    {
        return $this->country_obj() instanceof EE_Country
            ? $this->country_obj()->name()
            : '';
    }


    /**
     * @return EE_Country
     */
    public function country_obj(): EE_Country
    {
        return $this->_country_obj;
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function country(): string
    {
        if (apply_filters('FHEE__EEI_Address__country__use_abbreviation', true, $this->country_obj())) {
            return $this->country_ID();
        } else {
            return $this->country_name();
        }
    }


    /**
     * @return string
     */
    public function zip(): string
    {
        return $this->_zip;
    }
}
