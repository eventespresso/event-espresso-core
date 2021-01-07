<?php

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
     * @param string $table_column
     * @param string $nicename
     * @param bool   $nullable
     * @param float   $default_value
     * @param bool $allow_fractional_subunits
     */
    public function __construct(
        string $table_column,
        string $nicename,
        bool $nullable = false,
        float $default_value = 0,
        bool $allow_fractional_subunits = true
    ) {
        $this->allow_fractional_subunits = $allow_fractional_subunits;
        parent::__construct($table_column, $nicename, $nullable, $default_value);
        $this->setSchemaType('object');
    }


    /**
     * Schemas:
     *    'localized_float': "3,023.00"
     *    'no_currency_code': "$3,023.00"
     *    null: "$3,023.00<span>USD</span>"
     *
     * @param string $amount
     * @param string $schema
     * @return string
     * @throws EE_Error
     */
    public function prepare_for_pretty_echoing($amount, $schema = null): string
    {
        return EEH_Template::format_currency(
            $amount,
            strpos($schema, 'localized_float') !== false,
            strpos($schema, 'no_currency_code') === false,
            '',
            'currency-code',
            $this->allow_fractional_subunits
                && strpos($schema, 'localized_currency') === false
                && strpos($schema, 'localized_float') === false
        );
    }


    /**
     * If provided with a string, strips out money-related formatting to turn it into a proper float.
     * Rounds the float to the correct number of decimal places for this country's currency.
     * Also, interprets periods and commas according to the country's currency settings.
     * So if you want to pass in a string that NEEDS to interpret periods as decimal marks,
     * type cast it as a float first.
     *
     * @param string $amount
     * @return float
     * @throws EE_Error
     */
    public function prepare_for_set($amount): float
    {
        // first convert to a float-style string or number
        // then round to the correct number of decimal places for this  currency
        return $this->roundSubunitsIfNotAllowed(parent::prepare_for_set($amount));
    }


    /**
     * @param mixed $amount
     * @return float|mixed
     * @throws EE_Error
     * @since $VID:$
     */
    public function prepare_for_get($amount): float
    {
        return $this->roundSubunitsIfNotAllowed(parent::prepare_for_get($amount));
    }


    public function getSchemaProperties(): array
    {
        return [
            'raw'    => [
                'description' => sprintf(
                    esc_html__('%s - the raw value as it exists in the database as a simple float.', 'event_espresso'),
                    $this->get_nicename()
                ),
                'type'        => 'number',
            ],
            'pretty' => [
                'description' => sprintf(
                    esc_html__('%s - formatted for display in the set currency and decimal places.', 'event_espresso'),
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
     * @return boolean
     */
    public function allowFractionalSubunits(): bool
    {
        return $this->allow_fractional_subunits;
    }


    /**
     * If partial pennies allowed, leaves the amount as-is; if not, rounds it according
     * to the site's currency
     *
     * @param float $amount
     * @return float
     * @throws EE_Error
     */
    protected function roundSubunitsIfNotAllowed(float $amount): float
    {
        if (! $this->allowFractionalSubunits()) {
            return EEH_Money::round_for_currency($amount, $this->currency->code);
        }
        return $amount;
    }


    /**
     * Returns whether or not this money field allows partial penny amounts
     *
     * @return boolean
     */
    public function whole_pennies_only(): bool
    {
        return $this->allow_fractional_subunits;
    }
}
