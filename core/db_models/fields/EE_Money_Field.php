<?php

use EventEspresso\core\services\helpers\DecimalValues;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\orm\model_field\SchemaType;

/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields.
 * Wish PHP had multiple-inheritance for this...)
 */
class EE_Money_Field extends EE_Float_Field
{
    /**
     * @var DecimalValues
     */
    protected $decimal_values;


    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param null   $default_value
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct($table_column, $nicename, $nullable, $default_value = null)
    {
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaType(SchemaType::OBJECT);
        $this->decimal_values = LoaderFactory::getShared(
            'EventEspresso\core\services\helpers\DecimalValues',
            [EE_Currency_Config::getCurrencyConfig()]
        );
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
    public function prepare_for_pretty_echoing($value_on_field_to_be_outputted, ?string $schema = null)
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
     * So if you want to pass in a string that NEEDS to interpret periods as decimal marks,typecast as a float first.
     *
     * @param string $amount
     * @return float
     */
    public function prepare_for_set($amount): float
    {
        // now it's a float-style string or number
        $float_val = parent::prepare_for_set($amount);
        // round to the correctly number of decimal places for this  currency
        $float_val = $this->decimal_values->roundDecimalValue($float_val);
        // finally, cap money values so they fit nicely within the db's Decimal(12,6) schema
        return min($float_val, 999999.999999);
    }


    /**
     * @return array[]
     */
    public function getSchemaProperties(): array
    {
        return [
            'raw'    => [
                'description' => sprintf(
                    esc_html__('%s - the raw value as it exists in the database as a simple float.', 'event_espresso'),
                    $this->get_nicename()
                ),
                'type'        => SchemaType::NUMBER,
            ],
            'pretty' => [
                'description' => sprintf(
                    esc_html__('%s - formatted for display in the set currency and decimal places.', 'event_espresso'),
                    $this->get_nicename()
                ),
                'type'        => SchemaType::STRING,
                'format'      => 'money',
            ],
        ];
    }
}
