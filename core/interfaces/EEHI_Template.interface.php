<?php
defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Interface EEHI_Template
 */
interface EEHI_Template
{

    /**
     * EEH_Template::format_currency
     * This helper takes a raw float value and formats it according to the default config country currency settings, or the country currency settings from the supplied country ISO code
     *
     * @param  float   $amount       raw money value
     * @param  boolean $return_raw   whether to return the formatted float value only with no currency sign or code
     * @param  boolean $display_code whether to display the country code (USD). Default = TRUE
     * @param  string  $CNT_ISO      2 letter ISO code for a country
     * @param string   $cur_code_span_class
     * @return string the html output for the formatted money value
     */
    public static function format_currency(
        $amount = null,
        $return_raw = false,
        $display_code = true,
        $CNT_ISO = '',
        $cur_code_span_class = 'currency-code'
    );
}

// End of file EEHI_Template.interface.php
// Location: core/interfaces/EEHI_Template.interface.php