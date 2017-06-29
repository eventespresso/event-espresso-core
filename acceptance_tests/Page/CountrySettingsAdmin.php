<?php

namespace Page;

/**
 * CountrySettingsAdmin
 * Selectors/references for elements in the Country Settings Admin page.
 *
 * @package Page
 * @author  Darren Ethier
 * @since   1.0.0
 */
class CountrySettingsAdmin extends CoreAdmin
{


    const COUNTRY_SETTINGS_SAVE_BUTTON = '#country_settings_save_2';



    /**
     * Return the url for the country settings admin page.
     * @param string $additional_params
     * @return string
     */
    public static function url($additional_params = '')
    {
        return self::adminUrl('espresso_general_settings', 'country_settings', $additional_params);
    }


    /**
     * Return the decimal places (precision) radio field locator for selection.
     * @param int    $decimal_place_value
     * @param string $country_code
     * @return string
     */
    public static function currencyDecimalPlacesRadioField($decimal_place_value = 2, $country_code = 'US')
    {
        return "//input[@id='CNT_cur_dec_plc-$country_code-$decimal_place_value']";
    }


    /**
     * Return the currency decimal mark field locator for selection.
     * @param string $decimal_mark
     * @return string
     */
    public static function currencyDecimalMarkRadioField($decimal_mark = '.')
    {
        return "//input[@class='CNT_cur_dec_mrk' and @value='$decimal_mark']";
    }


    /**
     * Return the currency thousands separator field locator for selection.
     * @param string $thousands_separator
     * @return string
     */
    public static function currencyThousandsSeparatorField($thousands_separator = ',')
    {
        return "//input[@class='CNT_cur_thsnds' and @value='$thousands_separator']";
    }
}