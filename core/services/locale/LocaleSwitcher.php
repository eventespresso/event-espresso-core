<?php

namespace EventEspresso\core\services\locale;

/**
 * Class LocaleSwitcher
 * really more of a data store for raw locale data
 * although we do switch locales since that is the only actual way to retrieve locale data from the system
 * but we immediately switch things back to what they were before proceeding
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\locale
 * @since   $VID:$
 */
class LocaleSwitcher
{
    /**
     * @var array
     */
    protected $current_system_locales = [];

    /**
     * @var array
     */
    protected $locales = [];


    /**
     * @param string $locale_name
     * @param string $charset
     * @return bool
     */
    private function changeLocale($locale_name, $charset)
    {
        $locale_changed = setlocale(LC_ALL, "{$locale_name}.{$charset}");
        if ($locale_changed !== false) {
            $this->locales[ $locale_name ] = localeconv();
            return true;
        }
        return false;
    }


    /**
     * @return array
     */
    private function getLocaleCharsets()
    {
        return (array) apply_filters(
            'FHEE_EventEspresso_core_services_formatters_Locale__getLocaleCharsets__charsets',
            [
                'UTF-8',
                'UTF8',
                'utf-8',
                'utf8',
                'iso88591',
            ]
        );
    }


    /**
     * returns the locale settings to their previous value
     *
     * @link https://www.php.net/manual/en/function.setlocale.php#106811
     */
    private function resetSystemLocales()
    {
        foreach ($this->current_system_locales as $locale_setting) {
            if (strpos($locale_setting, '=') !== false) {
                list ($category, $locale) = explode('=', $locale_setting);
            } else {
                $category = LC_ALL;
                $locale   = $locale_setting;
            }
            setlocale(absint($category), $locale);
        }
    }


    /**
     * stashes the current locale settings so that they can be reset later
     *
     * @link https://www.php.net/manual/en/function.setlocale.php#106811
     */
    private function stashCurrentSystemLocales()
    {
        // passing "0" for second parameter of setlocale()
        // returns the current settings as opposed to setting anything ¯\_(ツ)_/¯
        $current_system_locales       = setlocale(LC_ALL, 0);
        $this->current_system_locales = explode(';', $current_system_locales);
    }


    /**
     * stashes the current locale settings
     * switches to the provided locale
     * retrieves ALL details for the provided locale
     * caches the retrieved data using the provided locale value as the key
     * resets the locale to its original value
     * returns the requested locale data
     *
     * @param string $locale_name
     * @param int    $allow_recurse
     * @return array
     */
    public function getLocale($locale_name, $allow_recurse = 2)
    {
        if (! isset($this->locales[ $locale_name ])) {
            $this->stashCurrentSystemLocales();
            $charsets         = $this->getLocaleCharsets();
            // some systems use dashes and some use underscores for the locale names, ie: "en_US" vs "en-US"
            $alternate_locale = strpos($locale_name, '_')
                ? str_replace('_', '-', $locale_name)
                : str_replace('-', '_', $locale_name);
            foreach ($charsets as $charset) {
                // if the first locale gets set, then the conditional will short-circuit and break the loop
                // otherwise we'll try again with the alternate locale name
                if ($this->changeLocale($locale_name, $charset) || $this->changeLocale($alternate_locale, $charset)) {
                    break;
                }
            }
            $this->resetSystemLocales();
        }
        if (isset($this->locales[ $locale_name ])) {
            return $this->locales[ $locale_name ];
        }
        // if our second attempt to get a locale failed, then try one more time using the site locale
        if ($allow_recurse === 2) {
            return $this->getLocale(get_locale(), 1);
        }
        // if the above doesn't work then the locale likely isn't installed on the server.
        // we'll try "en_US" and if that doesn't work then the server is definitely not configured properly,
        // or the customer is trying to use a language on a server in a country that doesn't speak that language...
        // like trying to use English on a server in Australia! :drop-bear-emoji:
        return $allow_recurse ? $this->getLocale('en_US', 0) : [];
    }
}
