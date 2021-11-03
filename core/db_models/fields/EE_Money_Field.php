<?php

/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields.
 * Wish PHP had multiple-inheritance for this...)
 */
class EE_Money_Field extends EE_Float_Field
{


    /**
     * number of decimal places to round numbers to when performing calculations
     *
     * @var integer
     */
    protected $decimal_precision = 6;

    /**
     * number of decimal places to round numbers to for display
     *
     * @var integer
     */
    protected $locale_precision = 6;


    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null)
    {
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaType('object');
        $this->locale_precision = EE_Registry::instance()->CFG->currency->dec_plc;
    }


    /**
     * Schemas:
     *    'localized_float': "3,023.00"
     *    'no_currency_code': "$3,023.00"
     *    null: "$3,023.00<span>USD</span>"
     *
     * @param string $value_on_field_to_be_outputted
     * @param string $schema
     * @return string
     * @throws EE_Error
     */
    public function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null): string
    {
        if ($schema == 'localized_float') {
            return parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted);
        }
        $display_code = $schema !== 'no_currency_code';
        // we don't use the $pretty_float because format_currency will take care of it.
        return EEH_Template::format_currency($value_on_field_to_be_outputted, false, $display_code);
    }


    /**
     * If provided with a string, strips out money-related formatting to turn it into a proper float.
     * Rounds the float to the correct number of decimal places for this country's currency.
     * Also, interprets periods and commas according to the country's currency settings.
     * So if you want to pass in a string that NEEDS to interpret periods as decimal marks, call floatval() on it first.
     *
     * @param string $value_inputted_for_field_on_model_object
     * @return float
     */
    public function prepare_for_set($value_inputted_for_field_on_model_object): float
    {
        // now it's a float-style string or number
        $float_val = parent::prepare_for_set($value_inputted_for_field_on_model_object);
        // round to the correctly number of decimal places for this  currency
        return $this->roundNumericValue($float_val);
    }


    /**
     * @return array[]
     */
    public function getSchemaProperties(): array
    {
        return [
            'raw'    => [
                'description' => sprintf(
                    __('%s - the raw value as it exists in the database as a simple float.', 'event_espresso'),
                    $this->get_nicename()
                ),
                'type'        => 'number',
            ],
            'pretty' => [
                'description' => sprintf(
                    __('%s - formatted for display in the set currency and decimal places.', 'event_espresso'),
                    $this->get_nicename()
                ),
                'type'        => 'string',
                'format'      => 'money',
            ],
        ];
    }


    /**
     * strips formatting, rounds the provided number, and returns a float
     * if $round is set to true, then the decimal precision for the site locale will be used,
     * otherwise the default decimal precision of 6 will be used
     *
     * @param float|int|string $number unformatted number value, ex: 1234.5678956789
     * @param bool             $round  whether to round the price off according to the locale settings
     * @return float                      rounded value, ex: 1,234.567896
     */
    private function roundNumericValue($number, bool $round = false): float
    {
        $precision = $round ? $this->locale_precision : $this->decimal_precision;
        return round(
            $this->filterNumericValue($number),
            $precision ?? $this->decimal_precision,
            PHP_ROUND_HALF_UP
        );
    }


    /**
     * Removes all characters except digits, +- and .
     *
     * @param float|int|string $number
     * @return float
     */
    private function filterNumericValue($number): float
    {
        return (float) filter_var($number, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    }
}
