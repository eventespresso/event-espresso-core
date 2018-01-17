<?php

namespace EventEspresso\core\domain\values\currency;

use EventEspresso\core\entities\Label;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class Currency
 * DTO for data pertaining to a currency
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class Currency
{

    /**
     * eg 'US'
     *
     * @var string $code
     */
    private $code;

    /**
     * @var Label $label
     */
    private $label;

    /**
     * currency sign
     *
     * @var string $sign
     * eg '$'
     */
    private $sign;

    /**
     * Whether the currency sign should come before the amount or not
     *
     * @var boolean $sign_b4
     */
    private $sign_b4;

    /**
     * Space (or nothing) displayed between currency sign and amount
     *
     * @var string $sign_separator
     */
    private $sign_separator;

    /**
     * How many digits should come after the decimal place
     * Although not theoretically true, it can effectively
     * be considered that all currencies are decimal based.
     * Therefore the number of decimal places can be used
     * to calculate number of subunits like so:
     *  subunits = pow( 10, decimal places  )
     *
     * @var int $decimal_places
     */
    private $decimal_places;

    /**
     * Symbol to use for decimal mark
     *
     * @var string $decimal_mark
     * eg '.'
     */
    private $decimal_mark;

    /**
     * Symbol to use for thousands
     *
     * @var string $thousands
     * eg ','
     */
    private $thousands;

    /**
     * The number of fractional divisions of a currency's main unit
     * Can be used to determine the number of decimal places used.
     * Because
     *  subunits = pow( 10, decimal places )
     * then
     *  decimal places = log( subunits )
     * except that a result of 1 means there are zero decimal places
     *
     * @var int
     */
    private $subunits;


    /**
     * Currency constructor.
     *
     * @param string $code
     * @param Label  $label
     * @param string $sign
     * @param bool   $sign_b4
     * @param int    $decimal_places the number of decimal places to use when DISPLAYING the currency
     * @param string $decimal_mark
     * @param string $thousands
     * @param int    $subunits       number of fractional divisions of a currency's main unit
     * @param string $sign_separator
     */
    public function __construct(
        $code,
        Label $label,
        $sign,
        $sign_b4,
        $decimal_places,
        $decimal_mark,
        $thousands,
        $subunits,
        $sign_separator = ''
    ) {
        $this->code           = $code;
        $this->label          = $label;
        $this->sign           = $sign;
        $this->sign_b4        = $sign_b4;
        $this->decimal_places = $decimal_places;
        $this->decimal_mark   = $decimal_mark;
        $this->thousands      = $thousands;
        $this->subunits       = $subunits;
        $this->sign_separator = $sign_separator;
    }



    /**
     * returns true if this currency is the same as the supplied currency
     *
     * @param Currency $other
     * @return bool
     */
    public function equals(Currency $other)
    {
        return $this->code() === $other->code();
    }



    /**
     * @return string
     */
    public function code()
    {
        return $this->code;
    }



    /**
     * @return string
     */
    public function name()
    {
        return $this->label->singular();
    }



    /**
     * @return string
     */
    public function plural()
    {
        return $this->label->plural();
    }



    /**
     * @return string
     */
    public function sign()
    {
        return $this->sign;
    }



    /**
     * @return bool
     */
    public function signB4()
    {
        return $this->sign_b4;
    }


    /**
     * @return string
     */
    public function signSeparator()
    {
        return $this->sign_separator;
    }



    /**
     * @return int
     */
    public function decimalPlaces()
    {
        return $this->decimal_places;
    }



    /**
     * @return string
     */
    public function decimalMark()
    {
        return $this->decimal_mark;
    }



    /**
     * @return string
     */
    public function thousands()
    {
        return $this->thousands;
    }


    /**
     * The number of divisions of the currency's main unit that comprises the smallest units
     * ex: 1 US Dollar has 100 Pennies, so USD subunits = 100
     * **WARNING**
     * Some currencies, such as the Japanese Yen have no subunits,
     * ie: the main unit is the smallest division
     * so you need to always check that subunits is not zero
     * before performing multiplication or division with it
     *
     * @return int
     */
    public function subunits()
    {
        return $this->subunits;
    }



    /**
     * @return string
     */
    public function __toString()
    {
        return $this->code();
    }



}
// End of file Currency.php
// Location: core/entities/money/Currency.php
