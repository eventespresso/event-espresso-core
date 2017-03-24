<?php

namespace EventEspresso\core\entities\money;

use EE_Country;
use EE_Error;
use EEM_Country;
use EventEspresso\core\entities\Label;
use InvalidArgumentException;

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
     * Whether the currency sign should come before the number or not
     *
     * @var boolean $sign_b4
     */
    private $sign_b4;

    /**
     * How many digits should come after the decimal place
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
     * Currency constructor.
     *
     * @param string $code
     * @param Label  $label
     * @param string $sign
     * @param bool   $sign_b4
     * @param int    $decimal_places
     * @param string $decimal_mark
     * @param string $thousands
     */
    private function __construct($code, Label $label, $sign, $sign_b4, $decimal_places, $decimal_mark, $thousands)
    {
        $this->code = $code;
        $this->label = $label;
        $this->sign = $sign;
        $this->sign_b4 = $sign_b4;
        $this->decimal_places = $decimal_places;
        $this->decimal_mark = $decimal_mark;
        $this->thousands = $thousands;
    }



    /**
     * returns a Currency object for the supplied country code
     *
     * @param string $CNT_ISO
     * @return Currency
     * @throws InvalidArgumentException
     */
    public static function createFromCountryCode($CNT_ISO)
    {
        /** @var EE_Country $country */
        $country = EEM_Country::instance()->get_one_by_ID($CNT_ISO);
        if (! $country instanceof EE_Country){
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'A valid country could not be found for the "%1$s" country code;',
                        'event_espresso'
                    ),
                    $CNT_ISO
                )
            );
        }
        return new Currency(
            $country->currency_code(),
            new Label(
                $country->currency_name_single(),
                $country->currency_name_plural()
            ),
            $country->currency_sign(),
            $country->currency_sign_before(),
            $country->currency_decimal_places(),
            $country->currency_decimal_mark(),
            $country->currency_thousands_separator()
        );
    }



    /**
     * returns a Currency object for the supplied currency code
     * PLZ NOTE: variations may exist between how different countries display the same currency,
     * so it may be necessary to use Currency::createFromCountryCode() to achieve the desired results
     *
     * @param string $code
     * @return Currency
     * @throws InvalidArgumentException
     * @throws EE_Error
     */
    public static function createFromCode($code)
    {
        /** @var EE_Country $country */
        $country = EEM_Country::instance()->get_one(array(array('CNT_cur_code' => $code)));
        if (! $country instanceof EE_Country) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'A valid currency could not be found for the "%1$s" currency code;',
                        'event_espresso'
                    ),
                    $code
                )
            );
        }
        return new Currency(
            $country->currency_code(),
            new Label(
                $country->currency_name_single(),
                $country->currency_name_plural()
            ),
            $country->currency_sign(),
            $country->currency_sign_before(),
            $country->currency_decimal_places(),
            $country->currency_decimal_mark(),
            $country->currency_thousands_separator()
        );
    }



    /**
     * returns true if this currency is the same as the supplied currency
     *
     * @param Currency $other
     * @return bool
     */
    public function equals(Currency $other){
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
     * @return string
     */
    public function __toString()
    {
        return $this->code();
    }



}
// End of file Currency.php
// Location: core/entities/money/Currency.php