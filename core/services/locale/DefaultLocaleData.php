<?php

namespace EventEspresso\core\services\locale;

use EE_Currency_Config;

/**
 * Class DefaultLocaleData
 * just some default data based off of our legacy currency config
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\locale
 * @since   $VID:$
 */
class DefaultLocaleData
{
    /**
     * @var EE_Currency_Config
     */
    private $currency_config;


    /**
     * DefaultLocaleData constructor.
     *
     * @param EE_Currency_Config $currency_config
     */
    public function __construct(EE_Currency_Config $currency_config)
    {
        $this->currency_config = $currency_config;
    }


    /**
     * @return string
     */
    public function getDefaultLocale(): string
    {
        return $this->currency_config->locale();
    }


    /**
     * @return array
     */
    public function getDefaults(): array
    {
        // if locale info is missing, then fall back to legacy money formatting details
        return [
            Locale::CURRENCY_DECIMAL_POINT            => $this->currency_config->dec_plc,
            Locale::CURRENCY_GROUPING                 => 3,
            Locale::CURRENCY_ISO_CODE                 => $this->currency_config->code,
            Locale::CURRENCY_SYMBOL                   => $this->currency_config->sign,
            Locale::CURRENCY_SYMBOL_B4_NEGATIVE       => $this->currency_config->sign_b4,
            Locale::CURRENCY_SYMBOL_B4_POSITIVE       => $this->currency_config->sign_b4,
            Locale::CURRENCY_SYMBOL_SPACE_B4_NEGATIVE => true,
            Locale::CURRENCY_SYMBOL_SPACE_B4_POSITIVE => true,
            Locale::CURRENCY_THOUSANDS_SEP            => $this->currency_config->thsnds,
            Locale::INTL_DECIMAL_PRECISION            => $this->currency_config->dec_plc,
            Locale::LOCAL_DECIMAL_PRECISION           => $this->currency_config->dec_plc,
            Locale::NUMBER_DECIMAL_POINT              => $this->currency_config->dec_mrk,
            Locale::NUMBER_GROUPING                   => 3,
            Locale::NUMBER_THOUSANDS_SEP              => $this->currency_config->thsnds,
            Locale::NEGATIVE_SIGN                     => '-',
            Locale::NEGATIVE_SIGN_POSITION            => 1,
            Locale::POSITIVE_SIGN                     => '',
            Locale::POSITIVE_SIGN_POSITION            => 1,
        ];
    }
}
