<?php

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
        $this->currency = EE_Config::instance()->currency;
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaType('number');
    }


    /**
     * If provided a string, strips out number-related formatting, like commas, periods, spaces, other junk, etc.
     * However, treats commas and periods as thousand-separators ro decimal marks, as indicate by the config's currency.
     * So if you want to pass in a string that NEEDS to interpret periods as decimal marks, call floatval() on it first.
     * Returns a float
     *
     * @param float|string $value_inputted_for_field_on_model_object
     * @return float
     */
    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        // remove whitespaces and thousands separators
        if (is_string($value_inputted_for_field_on_model_object)) {
            $value_inputted_for_field_on_model_object = str_replace(
                array(" ", $this->currency->thsnds),
                "",
                $value_inputted_for_field_on_model_object
            );
            // normalize it so periods are decimal marks (we don't care where you're from: we're talking PHP now)
            $value_inputted_for_field_on_model_object = str_replace(
                $this->currency->dec_mrk,
                ".",
                $value_inputted_for_field_on_model_object
            );
            // double-check there's absolutely nothing left on this string besides numbers
            $value_inputted_for_field_on_model_object = preg_replace(
                "/[^0-9,.]/",
                "",
                $value_inputted_for_field_on_model_object
            );
        }
        return floatval($value_inputted_for_field_on_model_object);
    }

    /**
     * Returns the number formatted according to local custom (set by the country of the blog).
     *
     * @param float $value_on_field_to_be_outputted
     * @return string
     */
    public function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null)
    {
        return number_format(
            $value_on_field_to_be_outputted,
            $this->currency->dec_plc,
            $this->currency->dec_mrk,
            $this->currency->thsnds
        );
    }

    public function prepare_for_set_from_db($value_found_in_db_for_model_object)
    {
        return floatval($value_found_in_db_for_model_object);
    }
}
