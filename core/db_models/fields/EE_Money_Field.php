<?php

use EventEspresso\core\services\formatters\CurrencyFormatter;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Text_Fields is a base class for any fields which are have float value. (Exception: foreign and private key fields.
 * Wish PHP had multiple-inheritance for this...)
 */
class EE_Money_Field extends EE_Float_Field
{

    /**
     * if true, then money values will be accurate to 6 decimal places
     * if false, then money values will be rounded to the correct number of subunits for the site's currency
     *
     * @var   bool
     * @since $VID:$
     */
    protected $allow_fractional_subunits;

    /**
     * @var CurrencyFormatter
     * @since $VID:$
     */
    protected $currency_formatter;


    /**
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param float  $default_value
     * @param bool   $allow_fractional_subunits
     */
    public function __construct(
        $table_column,
        $nicename,
        $nullable = false,
        $default_value = 0,
        $allow_fractional_subunits = true
    ) {
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->allow_fractional_subunits = $allow_fractional_subunits;
        // in a better world this would have been injected upon construction
        if (! $this->currency_formatter instanceof CurrencyFormatter) {
            $this->currency_formatter = LoaderFactory::getLoader()->getShared(CurrencyFormatter::class);
        }
        $this->setSchemaType('object');
    }


    /**
     * Returns whether or not this money field allows partial penny amounts
     *
     * @return boolean
     */
    public function allowFractionalSubunits()
    {
        return $this->allow_fractional_subunits;
    }


    /**
     * Schemas:
     *    'localized_float': '3,023.00'
     *    'no_currency_code': '$3,023.00'
     *    null: '$3,023.00<span>USD</span>'
     *
     * @param float|int|string $amount
     * @param string           $schema
     * @return string
     * @since $VID:$
     */
    public function prepare_for_get($amount, $schema = 'precision_float')
    {
        $schema = $schema ? $schema : 'precision_float';
        $format = $this->currency_formatter->getFormatFromLegacySchema($schema, $this->allow_fractional_subunits);
        return $this->currency_formatter->formatForLocale((float) $amount, $format);
    }


    /**
     * Schemas:
     *    'localized_float': "3,023.00"
     *    'no_currency_code': "$3,023.00"
     *    null: "$3,023.00<span>USD</span>"
     *
     * @param float|int|string $amount
     * @param string           $schema
     * @return string
     */
    public function prepare_for_pretty_echoing($amount, $schema = 'localized_currency')
    {
        $format = $this->currency_formatter->getFormatFromLegacySchema($schema, $this->allow_fractional_subunits);
        return $this->currency_formatter->formatForLocale((float) $amount, $format);
    }


    /**
     * Converts periods and commas according to the country's currency settings.
     * Strips out money-related formatting to turn it into a proper float.
     * If fractional subunits are not allowed,
     * it rounds the float to the correct number of decimal places for this country's currency.
     *
     * @param float|int|string $amount
     * @param string           $schema
     * @return float
     */
    public function prepare_for_set($amount, $schema = '')
    {
        $amount = $this->currency_formatter->parseForLocale($amount);
        return $this->prepare_for_set_from_db($amount);
    }


    /**
     * @param float $amount
     * @return float
     */
    public function prepare_for_set_from_db($amount)
    {
        return $this->allowFractionalSubunits()
            ? $this->currency_formatter->precisionRound($amount)
            : $this->currency_formatter->roundForLocale($amount);
    }


    /**
     * @return array[]
     */
    public function getSchemaProperties()
    {
        return [
            'raw'    => [
                'description' => sprintf(
                    esc_html__(
                        '%s - the raw value as it exists in the database as a simple float.',
                        'event_espresso'
                    ),
                    $this->get_nicename()
                ),
                'type'        => 'number',
            ],
            'pretty' => [
                'description' => sprintf(
                    esc_html__(
                        '%s - formatted for display in the set currency and decimal places.',
                        'event_espresso'
                    ),
                    $this->get_nicename()
                ),
                'type'        => 'string',
                'format'      => 'money',
            ],
        ];
    }


    /**
     * Returns whether or not this money field allows partial penny amounts
     *
     * @deprecatd $VID:$
     * @return boolean
     */
    public function whole_pennies_only()
    {
        return $this->allow_fractional_subunits;
    }
}
