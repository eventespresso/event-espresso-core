<?php

namespace EventEspresso\core\services\locale;

use DomainException;

/**
 * Class Locales
 * Dead simple DTO for storing Locales for both the site, current user, and any other locales requested
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\formatters
 * @since   $VID:$
 */
class Locales
{

    /**
     * Locale string for the site as set in the WP Settings admin
     */
    const SITE = 'site';

    /**
     * Locale string for the current user
     */
    const USER = 'user';

    /**
     * @var DefaultLocaleData
     */
    protected $default_data;

    /**
     * @var Locale[]
     */
    protected $locales;

    /**
     * @var LocaleSwitcher
     */
    protected $locale_switcher;

    /**
     * @var string
     */
    protected $site_locale;

    /**
     * @var string
     */
    protected $user_locale;


    /**
     * LocaleFloatFormatter constructor.
     *
     * @param DefaultLocaleData $default_data
     * @param LocaleSwitcher $locale_switcher
     */
    public function __construct(DefaultLocaleData $default_data, LocaleSwitcher $locale_switcher)
    {
        $this->default_data = $default_data;
        $this->locale_switcher = $locale_switcher;
        $this->site_locale = $this->default_data->getDefaultLocale();
        // give site owners a chance to change the locale for the site
        // ex: some of the WordPress language locales, like "ja" (Japan) do not specify a country
        // but the locale data on teh server might require it, like "ja_JP"
        $this->site_locale = sanitize_text_field(
            apply_filters(
                'FHEE__EventEspresso_core_services_locale_Locales__construct__site_locale',
                ! empty($this->site_locale) ? $this->site_locale : get_locale()
            )
        );
        $this->user_locale = get_user_locale();
    }


    /**
     * @param string|Locale $locale locale name ex: en_US or Locale object
     * @return Locale
     */
    public function getLocale($locale)
    {
        $locale = ! empty($locale) ? $locale : $this->site_locale;
        if ($locale instanceof Locale) {
            return $locale;
        }
        if (isset($this->locales[ $locale ])) {
            return $this->locales[ $locale ];
        }
        $locale_info = $this->locale_switcher->getLocale($locale);
        if (! empty($locale_info)) {
            $this->locales[ $locale ] = new Locale($locale, $locale_info, $this->default_data->getDefaults());
            return $this->locales[ $locale ];
        }
        throw new DomainException(
            sprintf(
                esc_html__(
                    'The "%1$s" locale is either missing or invalid. Please contact your hosting provider about having it enabled on the server',
                    'event_espresso'
                ),
                $locale
            )
        );
    }


    /**
     * @param string $currency_ISO              ex: "USD"
     * @param bool   $fallback_to_site_locale   [optional] if true, will return the site locale
     *                                          if a locale can not be identified for the supplied currency ISO
     * @return Locale
     */
    public function getLocaleForCurrencyISO($currency_ISO, $fallback_to_site_locale = false)
    {
        $locale_name = '';
        // first try to find a matching currency in the current list of locales
        foreach ($this->locales as $locale) {
            if ($locale instanceof Locale) {
                if ($locale->currencyIsoCode() === $currency_ISO) {
                    $locale_name = $locale->name();
                    break;
                }
            }
        }
        // give site owners a chance to specify the appropriate locale for the provided currency ISO code
        // ex: the Canadian Dollar "CAD" could be for the locale "en_CA" or "fr_CA"
        // and the Euro (EUR) could be one of ~20 or so countries that use it, many of which have multiple locales
        $locale_name = sanitize_text_field(
            apply_filters(
                'FHEE__EventEspresso_core_services_locale_Locales__getLocaleForCurrencyISO__locale_name',
                $locale_name,
                $currency_ISO
            )
        );
        if ($locale_name) {
            return $this->getLocale($locale_name);
        }
        if ($fallback_to_site_locale) {
            return $this->getSiteLocale();
        }
        throw new DomainException(
            sprintf(
                esc_html__(
                    'The "%1$s" locale corresponding to the "%2$s" currency is either missing or invalid. Please contact your hosting provider about having it enabled on the server',
                    'event_espresso'
                ),
                $locale_name,
                $currency_ISO
            )
        );
    }


    /**
     * @return Locale
     */
    public function getSiteLocale()
    {
        return $this->getLocale($this->site_locale);
    }


    /**
     * @return string
     */
    public function getSiteLocaleName()
    {
        return $this->site_locale;
    }


    /**
     * @return string
     */
    public function getUserLocale()
    {
        return $this->getLocale($this->user_locale);
    }


    /**
     * @return string
     */
    public function getUserLocaleName()
    {
        return $this->user_locale;
    }
}
