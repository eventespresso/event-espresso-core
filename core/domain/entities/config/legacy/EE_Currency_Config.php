<?php

use EventEspresso\core\domain\services\database\DbStatus;
use EventEspresso\core\services\database\TableAnalysis;

/**
 * Class for defining what's in the EE_Config relating to currency
 */
class EE_Currency_Config extends EE_Config_Base
{
    /**
     * @var string $code
     * eg 'US'
     */
    public string $code = 'USD';

    /**
     * @var string $name
     * eg 'Dollar'
     */
    public string $name = 'Dollar';

    /**
     * plural name
     *
     * @var string $plural
     * eg 'Dollars'
     */
    public string $plural = 'Dollars';

    /**
     * currency sign
     *
     * @var string $sign
     * eg '$'
     */
    public string $sign = '$';

    /**
     * Whether the currency sign should come before the number or not
     *
     * @var bool|int $sign_b4
     */
    public $sign_b4 = true;

    /**
     * How many digits should come after the decimal place
     *
     * @var int $dec_plc
     */
    public int $dec_plc = 2;

    /**
     * Symbol to use for decimal mark
     *
     * @var string $dec_mrk
     * eg '.'
     */
    public string $dec_mrk = '.';

    /**
     * Symbol to use for thousands
     *
     * @var string $thsnds
     * eg ','
     */
    public string $thsnds = ',';


    /**
     * @param string|null $CNT_ISO
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(?string $CNT_ISO = 'US')
    {
        if ($CNT_ISO && $CNT_ISO === $this->code) {
            return;
        }
        // get country code from organization settings or use default
        $ORG_CNT = isset(EE_Registry::instance()->CFG->organization)
        && EE_Registry::instance()->CFG->organization instanceof EE_Organization_Config
            ? EE_Registry::instance()->CFG->organization->CNT_ISO
            : 'US';
        // but override if requested
        $CNT_ISO = ! empty($CNT_ISO) ? $CNT_ISO : $ORG_CNT;
        // so if that all went well, and we are not in M-Mode (cuz you can't query the db in M-Mode) and double-check the countries table exists
        $this->setCurrency($CNT_ISO);
        // fallback to hardcoded defaults, in case the above failed
        if (empty($this->code)) {
            $this->setFallbackCurrency();
        }
    }


    /**
     * @param string|null $CNT_ISO
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setCurrency(?string $CNT_ISO = 'US')
    {
        if (empty($CNT_ISO) || DbStatus::isOffline()) {
            return;
        }

        /** @var TableAnalysis $table_analysis */
        $table_analysis = EE_Registry::instance()->create('TableAnalysis', [], true);
        if (! $table_analysis->tableExists(EEM_Country::instance()->table())) {
            return;
        }
        // retrieve the country settings from the db, just in case they have been customized
        $country = EEM_Country::instance()->get_one_by_ID($CNT_ISO);
        if (! $country instanceof EE_Country) {
            throw new DomainException(
                sprintf(
                    esc_html__('Invalid Country ISO Code: %1$s', 'event_espresso'),
                    $CNT_ISO
                )
            );
        }
        $this->code    = $country->currency_code();                  // currency code: USD, CAD, EUR
        $this->name    = $country->currency_name_single();           // Dollar
        $this->plural  = $country->currency_name_plural();           // Dollars
        $this->sign    = $country->currency_sign();                  // currency sign: $
        $this->sign_b4 = $country->currency_sign_before();           // currency sign before or after
        $this->dec_plc = $country->currency_decimal_places();        // decimal places: 2 = 0.00  3 = 0.000
        $this->dec_mrk = $country->currency_decimal_mark();          // decimal mark: ',' = 0,01 or '.' = 0.01
        $this->thsnds  = $country->currency_thousands_separator();   // thousands sep: ',' = 1,000 or '.' = 1.000
    }


    private function setFallbackCurrency()
    {
        // set default currency settings
        $this->code    = 'USD';
        $this->name    = esc_html__('Dollar', 'event_espresso');
        $this->plural  = esc_html__('Dollars', 'event_espresso');
        $this->sign    = '$';
        $this->sign_b4 = true;
        $this->dec_plc = 2;
        $this->dec_mrk = '.';
        $this->thsnds  = ',';
    }


    /**
     * @param string|null $CNT_ISO
     * @return EE_Currency_Config
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function getCurrencyConfig(?string $CNT_ISO = ''): EE_Currency_Config
    {
        // if CNT_ISO passed lets try to get currency settings for it.
        $currency_config = ! empty($CNT_ISO)
            ? new EE_Currency_Config($CNT_ISO)
            : null;
        // default currency settings for site if not set
        if ($currency_config instanceof EE_Currency_Config) {
            return $currency_config;
        }
        EE_Config::instance()->currency = EE_Config::instance()->currency instanceof EE_Currency_Config
            ? EE_Config::instance()->currency
            : new EE_Currency_Config();
        return EE_Config::instance()->currency;
    }
}
