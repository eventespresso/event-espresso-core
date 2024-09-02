<?php

use EventEspresso\core\services\orm\model_field\SchemaType;

/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields.
 * Wish PHP had multiple-inheritance for this...)
 */
class EE_Float_Field extends EE_Model_Field_Base
{
    /**
     * @var EE_Currency_Config
     */
    protected $currency;


    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null)
    {
        $this->currency = EE_Config::instance()->currency instanceof EE_Currency_Config
            ? EE_Config::instance()->currency
            : new EE_Currency_Config();
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaType(SchemaType::NUMBER);
    }


    /**
     * If provided a string, strips out number-related formatting, like commas, periods, spaces, other junk, etc.
     * However, treats commas and periods as thousand-separators ro decimal marks, as indicate by the config's currency.
     * So if you want to pass in a string that NEEDS to interpret periods as decimal marks, typecast as float first.
     * Returns a float
     *
     * @param float|string $number
     * @return float
     */
    public function prepare_for_set($number)
    {
        // remove whitespaces and thousands separators
        if (is_string($number)) {
            // scientific notation can just be cast as a float
            if (strpos($number, 'e') || strpos($number, 'E')) {
                return (float) $number;
            }
            $number = str_replace(
                array(" ", $this->currency->thsnds),
                "",
                $number
            );
            // normalize it so periods are decimal marks (we don't care where you're from: we're talking PHP now)
            $number = str_replace(
                $this->currency->dec_mrk,
                ".",
                $number
            );
            // double-check there's absolutely nothing left on this string besides numbers
            $number = preg_replace(
                "/[^0-9,.]/",
                "",
                $number
            );
        }
        return (float) $number;
    }

    /**
     * Returns the number formatted according to local custom (set by the country of the blog).
     *
     * @param float $number
     * @return string
     */
    public function prepare_for_pretty_echoing($number, ?string $schema = null)
    {
        return number_format(
            $number,
            $this->currency->dec_plc,
            $this->currency->dec_mrk,
            $this->currency->thsnds
        );
    }

    public function prepare_for_set_from_db($number)
    {
        return (float) $number;
    }
}
