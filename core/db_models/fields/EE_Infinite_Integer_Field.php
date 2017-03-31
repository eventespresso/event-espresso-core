<?php
defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * For storing integers which can assume the value of INFINITY. They're stored in the DB as -1,
 * but in the code they're delivered as EE_INF (the constant representing Infinity).
 * Note: this field isn't a good choice if it can acquire the value of -1 through means
 * other than explicitly setting it to EE_INF.
 * Makes use of constant EE_INF_IN_DB set in espresso.php, and EE_INF, which is a PHP constant definedin the ether
 */
class EE_Infinite_Integer_Field extends EE_Model_Field_Base
{

    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null)
    {
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaType(array('integer', 'null'));
    }


    function prepare_for_use_in_db($value_of_field_on_model_object)
    {
        if ($value_of_field_on_model_object === EE_INF) {
            return EE_INF_IN_DB;
        } else {
            return intval($value_of_field_on_model_object);
        }
    }

    function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        if ($value_inputted_for_field_on_model_object === EE_INF_IN_DB ||
            $value_inputted_for_field_on_model_object === EE_INF ||
            $value_inputted_for_field_on_model_object === "EE_INF" ||
            $value_inputted_for_field_on_model_object === ""
        ) {
            return EE_INF;
        } else {
            return intval($value_inputted_for_field_on_model_object);
        }
    }

    function prepare_for_set_from_db($value_inputted_for_field_on_model_object)
    {
        $intval = intval($value_inputted_for_field_on_model_object);
        if ($intval == EE_INF_IN_DB) {
            return EE_INF;
        } else {
            return $intval;
        }
    }

    /**
     * For outputting this field's value. If you want to output it into an input or something,
     * use $schema=='input', as it will replace EE_INF with ''. If you want a readable version, use $schema=='text'
     * as it will replace EE_INF with i18n Infinite
     *
     * @param type   $value_on_field_to_be_outputted
     * @param string $schema input, symbol, text; or any string you want to show if the value equals EE_INF
     * @return string
     */
    function prepare_for_pretty_echoing($value_on_field_to_be_outputted, $schema = null)
    {
        if ($value_on_field_to_be_outputted === EE_INF) {
            switch ($schema) {
                case 'input':
                case 'form_input':
                    return '';
                case 'symbol':
                    return "&infin;";
                case 'text':
                case null:
                    return __("Unlimited", "event_espresso");
                default:
                    return $schema;
            }
        } else {
            return $value_on_field_to_be_outputted;
        }
    }
}
