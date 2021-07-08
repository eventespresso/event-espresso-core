<?php

use EventEspresso\core\services\formatters\NumberFormatter;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Text_Fields is a base class for any fields which are have integer value. (Exception: foreign and private key fields.
 * Wish PHP had multiple-inheritance for this...)
 */
class EE_Integer_Field extends EE_Model_Field_Base
{

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
        $this->setSchemaType('integer');
    }


    /**
     * @param float|int|string $amount
     * @return int
     * @since $VID:$
     */
    public function prepare_for_get($amount)
    {
        return (int) $this->number_formatter->filterNumericValue($amount);
    }


    /**
     * Returns the number formatted according to local custom (set by the country of the blog).
     *
     * @param float        $value
     * @param null|string  $schema
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
     * @return int
     */
    public function prepare_for_set($value)
    {
        $value = $this->number_formatter->parseForLocale($value);
        return (int) $this->prepare_for_set_from_db($value);
    }


    /**
     * @param float $value
     * @return int
     */
    public function prepare_for_set_from_db($value)
    {
        return (int) $this->number_formatter->precisionRound($value, 0);
    }
}
