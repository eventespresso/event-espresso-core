<?php

use EventEspresso\core\services\formatters\NumberFormatter;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * EE_Float_Field is a base class for any fields which are have float value.
 * (Exception: foreign and private key fields. Wish PHP had multiple-inheritance for this...)
 */
class EE_Float_Field extends EE_Model_Field_Base
{

    /**
     * @var EE_Currency_Config
     * @deprecatd $VID:$
     */
    public $currency;

    /**
     * @var NumberFormatter
     * @since $VID:$
     */
    protected $number_formatter;


    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null)
    {
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        if (! $this->number_formatter instanceof NumberFormatter) {
            $this->number_formatter = LoaderFactory::getLoader()->getShared(NumberFormatter::class);
        }
        $this->setSchemaType('number');
    }


    /**
     * @param float|int|string $amount
     * @return float
     * @since $VID:$
     */
    public function prepare_for_get($amount)
    {
        return $this->number_formatter->filterNumericValue($amount);
    }


    /**
     * Returns the number formatted according to local custom (set by the country of the blog).
     *
     * @param float $value
     * @param null  $schema
     * @return string
     */
    public function prepare_for_pretty_echoing($value, $schema = null)
    {
        return $this->number_formatter->formatForLocale($value);
    }


    /**
     * If provided a string, strips out number-related formatting, like commas, periods, spaces, other junk, etc.
     * However, treats commas and periods as thousand-separators or decimal marks, as per the currency's config.
     *
     * @param float|int|string $value
     * @return float
     */
    public function prepare_for_set($value)
    {
        $value = $this->number_formatter->parseForLocale($value);
        return $this->prepare_for_set_from_db($value);
    }


    /**
     * @param float $value
     * @return float
     */
    public function prepare_for_set_from_db($value)
    {
        return $this->number_formatter->precisionRound($value);
    }
}
