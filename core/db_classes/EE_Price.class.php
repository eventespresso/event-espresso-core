<?php

use EventEspresso\core\domain\values\currency\UsesMoneyInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\currency\MoneyFactory;
use EventEspresso\core\services\loaders\LoaderFactory;

defined('EVENT_ESPRESSO_VERSION') || exit('NO direct script access allowed');


/**
 * EE_Price class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_Price.class.php
 * @author             Mike Nelson
 */
class EE_Price extends EE_Soft_Delete_Base_Class implements UsesMoneyInterface
{

    /**
     * @param array        $props_n_values      incoming values
     * @param string       $timezone            incoming timezone (if not set the timezone set for the website will be
     *                                          used.)
     * @param array        $date_formats        incoming date_formats in an array where the first value is the
     *                                          date_format and the second value is the time format
     * @param MoneyFactory $money_factory
     * @return EE_Price
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public static function new_instance(
        $props_n_values = array(),
        $timezone = null,
        $date_formats = array(),
        MoneyFactory $money_factory = null
    ) {
        $has_object = parent::_check_for_object(
            $props_n_values,
            __CLASS__,
            $timezone,
            $date_formats
        );
        return $has_object
            ? $has_object
            : new self(
                $props_n_values,
                false,
                $timezone,
                $date_formats,
                $money_factory
            );
    }


    /**
     * @param array        $props_n_values      incoming values from the database
     * @param string       $timezone            incoming timezone as set by the model.  If not set the timezone for
     *                                          the website will be used.
     * @param MoneyFactory $money_factory
     * @return EE_Price
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public static function new_instance_from_db(
        $props_n_values = array(),
        $timezone = null,
        MoneyFactory $money_factory = null
    ) {
        return new self(
            $props_n_values,
            true,
            $timezone,
            array(),
            $money_factory
        );
    }


    /**
     * basic constructor for Event Espresso classes, performs any necessary initialization, and verifies it's children
     * play nice
     *
     * @param array        $fieldValues  where each key is a field (ie, array key in the 2nd layer of the model's
     *                                   _fields array, (eg, EVT_ID, TXN_amount, QST_name, etc) and values are their
     *                                   values
     * @param boolean      $bydb         a flag for setting if the class is instantiated by the corresponding db model
     *                                   or not.
     * @param string       $timezone     indicate what timezone you want any datetime fields to be in when
     *                                   instantiating
     *                                   a EE_Base_Class object.
     * @param array        $date_formats An array of date formats to set on construct where first value is the
     *                                   date_format and second value is the time format.
     * @param MoneyFactory $money_factory
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    protected function __construct(
        array $fieldValues = array(),
        $bydb = false,
        $timezone = '',
        array $date_formats = array(),
        MoneyFactory $money_factory = null
    ) {
        if (! $money_factory instanceof MoneyFactory) {
            $money_factory = LoaderFactory::getLoader()->getShared('EventEspresso\core\services\currency\MoneyFactory');
        }
        $this->money_factory = $money_factory;
        parent::__construct($fieldValues, $bydb, $timezone, $date_formats);
    }


    /**
	 *        Set Price type ID
	 *
	 * @access        public
	 * @param        int $PRT_ID
	 */
	public function set_type( $PRT_ID = 0 ) {
		$this->set( 'PRT_ID', $PRT_ID );
	}



	/**
	 *        Set Price Amount
	 *
	 * @access        public
	 * @param        float $PRC_amount
	 */
	public function set_amount( $PRC_amount = 0.00 ) {
		$this->set( 'PRC_amount', $PRC_amount );
	}



	/**
	 *        Set Price Name
	 *
	 * @access        public
	 * @param        string $PRC_name
	 */
	public function set_name( $PRC_name = '' ) {
		$this->set( 'PRC_name', $PRC_name );
	}



	/**
	 *        Set Price Description
	 *
	 * @access        public
	 * @param        string $PRC_desc
	 */
	public function set_description( $PRC_desc = '' ) {
		$this->Set( 'PRC_desc', $PRC_desc );
	}



	/**
	*		set is_default
	*
	* 		@access		public
	*		@param		bool		$PRC_is_default
	*/
	public function set_is_default( $PRC_is_default = FALSE ) {
		$this->set( 'PRC_is_default', $PRC_is_default );
	}



	/**
	*		set deleted
	*
	* 		@access		public
	*		@param		bool		$PRC_deleted
	*/
	public function set_deleted( $PRC_deleted = NULL ) {
		$this->set( 'PRC_deleted', $PRC_deleted );
	}



	/**
	 *    get Price type
	 * @access        public
	 * @return        int
	 */
	public function type() {
		return $this->get( 'PRT_ID' );
	}



	/**
	 *    get Price Amount
	 * @access        public
	 * @return        float
	 */
	public function amount() {
		return $this->get( 'PRC_amount' );
	}



	/**
	 *    get Price Name
	 * @access        public
	 * @return        string
	 */
	public function name() {
		return $this->get( 'PRC_name' );
	}



	/**
	 *    get Price description
	 * @access        public
	 * @return        string
	 */
	public function desc() {
		return $this->get( 'PRC_desc' );
	}



	/**
	 *    get overrides
	 * @access        public
	 * @return        int
	 */
	public function overrides() {
		return $this->get( 'PRC_overrides' );
	}



	/**
	 *    get order
	 * @access        public
	 * @return        int
	 */
	public function order() {
		return $this->get( 'PRC_order' );
	}



	/**
	 * get the author of the price
	 *
	 * @since 4.5.0
	 *
	 * @return int
	 */
	public function wp_user() {
		return $this->get('PRC_wp_user');
	}



	/**
	 *    get is_default
	 * @access        public
	 * @return        bool
	 */
	public function is_default() {
		return $this->get( 'PRC_is_default' );
	}



	/**
	 *    get deleted
	 * @access        public
	 * @return        bool
	 */
	public function deleted() {
		return $this->get( 'PRC_deleted' );
	}



	/**
	 * @return bool
	 */
	public function parent() {
		return $this->get( 'PRC_parent' );
	}


	//some helper methods for getting info on the price_type for this price

	/**
	 * return whether the price is a base price or not
	 * @return boolean
	 */
	public function is_base_price() {
		$price_type = $this->type_obj();
		return $price_type->base_type() === 1;
	}



	/**
	 *
	 * @return EE_Price_Type
	 */
	public function type_obj() {
		return $this->get_first_related( 'Price_Type' );
	}



	/**
	 * Simply indicates whether this price increases or decreases the total
	 * @return boolean true = discount, otherwise adds to the total
	 */
	public function is_discount() {
		$price_type = $this->type_obj();
		return $price_type->is_discount();
	}



	/**
	 * whether the price is a percentage or not
	 * @return boolean
	 */
	public function is_percent() {
		$price_type = $this->type_obj();
		return $price_type->get( 'PRT_is_percent' );
	}


	/**
	 * return pretty price dependant on whether its a dollar or percent.
	 *
	 * @since 4.4.0
	 *
	 * @return string
	 */
	public function pretty_price() {
		return ! $this->is_percent() ? $this->get_pretty('PRC_amount') : $this->get('PRC_amount') . '%';
	}



	/**
	 * @return mixed
	 */
	public function get_price_without_currency_symbol() {
		return str_replace( EE_Registry::instance()->CFG->currency->sign, '', $this->get_pretty( 'PRC_amount' ) );
	}


    /**
     * Returns the payment's amount in subunits (if the currency has subunits; otherwise this will actually be
     * in the currency's main units)
     *
     * @return int
     * @throws EE_Error
     * @throws InvalidEntityException
     * @throws DomainException
     */
    public function amountInSubunits()
    {
        return $this->moneyInSubunits('PRC_amount');
    }


    /**
     * Sets the payment's amount based on the incoming monetary subunits (eg pennies). If the currency has no subunits,
     * the amount is actually assumed to be in the currency's main units
     *
     * @param int $amount_in_subunits
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidIdentifierException
     * @throws InvalidDataTypeException
     * @throws DomainException
     */
    public function setAmountInSubunits($amount_in_subunits)
    {
        $this->setMoneySubunits('PRC_amount', $amount_in_subunits);
    }
}
/* End of file EE_Price.class.php */
/* Location: /includes/classes/EE_Price.class.php */
