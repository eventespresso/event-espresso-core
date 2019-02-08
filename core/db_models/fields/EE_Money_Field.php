<?php

/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields.
 * Wish PHP had multiple-inheritance for this...)
 */
class EE_Money_Field extends EE_Float_Field
{
    protected $_whole_pennies_only;


    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null, $whole_pennies_only = true)
    {
        $this->_whole_pennies_only = $whole_pennies_only;
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaType('object');
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
     */
    public function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null)
    {
        $pretty_float = parent::prepare_for_pretty_echoing($value_on_field_to_be_outputted);

        if ($schema == 'localized_float') {
            return $pretty_float;
        }
        if ($schema == 'no_currency_code') {
//          echo "schema no currency!";
            $display_code = false;
        } else {
            $display_code = true;
        }
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
    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        // now it's a float-style string or number
        $float_val = parent::prepare_for_set($value_inputted_for_field_on_model_object);
        // round to the correctly number of decimal places for this  currency
        return $this->_round_if_no_partial_pennies( $float_val );
    }

    public function prepare_for_get($value_of_field_on_model_object)
    {
        return $this->_round_if_no_partial_pennies(parent::prepare_for_get($value_of_field_on_model_object));
    }

    public function getSchemaProperties()
    {
        return array(
            'raw' => array(
                'description' =>  sprintf(
                    esc_html__('%s - the raw value as it exists in the database as a simple float.', 'event_espresso'),
                    $this->get_nicename()
                ),
                'type' => 'number',
            ),
            'pretty' => array(
                'description' =>  sprintf(
                    esc_html__('%s - formatted for display in the set currency and decimal places.', 'event_espresso'),
                    $this->get_nicename()
                ),
                'type' => 'string',
                'format' => 'money'
            )
        );
    }

    /**
     * Returns whether or not this money field allows partial penny amounts
     * @return boolean
     */
    public function whole_pennies_only()
    {
        return $this->_whole_pennies_only;
    }

    /**
     * If partial pennies allowed, leaves the amount as-is; if not, rounds it according
     * to the site's currency
     * @param type $amount
     * @return float
     */
    protected function _round_if_no_partial_pennies( $amount )
    {
        if($this->whole_pennies_only()) {
            return EEH_Money::round_for_currency($amount, EE_Registry::instance()->CFG->currency->code);
        } else {
            return $amount;
        }
    }
}
