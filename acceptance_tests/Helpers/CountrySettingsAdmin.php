<?php
namespace EventEspresso\Codeception\helpers;

use Page\CoreAdmin;
use Page\CountrySettingsAdmin as CountrySettings;

trait CountrySettingsAdmin
{
    /**
     * Instructs the actor to browse to the country settings page.
     * Assumes the actor is already logged in.
     * @param string $additional_params
     */
    public function amOnCountrySettingsAdminPage($additional_params = '')
    {
        $this->actor()->amOnAdminPage(CountrySettings::url($additional_params));
    }


    /**
     * Instructs the actor to select the given decimal places radio option.
     * Assumes the actor is already on the country settings page.
     * @param string $decimal_places
     * @param string $country_code
     */
    public function setCurrencyDecimalPlacesTo($decimal_places = '2', $country_code = 'US')
    {
        $this->actor()->click(CountrySettings::currencyDecimalPlacesRadioField($decimal_places, $country_code));
    }


    /**
     * Instructs the actor to select the given decimal mark radio option.
     * Assumes the actor is already on the country settings page.
     * @param string $decimal_mark
     */
    public function setCurrencyDecimalMarkTo($decimal_mark = '.')
    {
        $this->actor()->click(CountrySettings::currencyDecimalMarkRadioField($decimal_mark));
    }


    /**
     * Instructs the actor to select the given thousands separator radio option.
     * Assumes the actor is already on the country settings page.
     * @param string $thousands_seperator
     */
    public function setCurrencyThousandsSeparatorTo($thousands_seperator = ',')
    {
        $this->actor()->click(CountrySettings::currencyThousandsSeparatorField($thousands_seperator));
    }


    /**
     * Clicks the country settings submit button.
     * Assumes the actor is on the country settings admin page.
     */
    public function saveCountrySettings()
    {
        $this->actor()->click(CountrySettings::COUNTRY_SETTINGS_SAVE_BUTTON);
        //no indicator on the page when stuff has been updated so just give a bit of time for it to finish.
        $this->actor()->wait(5);
    }
}