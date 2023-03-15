<?php

namespace EventEspresso\core\services\i18n;

use EventEspresso\core\services\database\WordPressOption;

/**
 * Class LoadedTextDomains
 * Previously Event Espresso stored a separate WP option record for every version for each locale.
 * This class allows us to store info for ALL locales and versions in one single WP option.
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\i18n
 * @since   5.0.0.p
 */
class LoadedTextDomains extends WordPressOption
{
    /**
     * WP option name for storing loaded text domain info
     */
    private const OPTION_NAME = 'ee_loaded_event_espresso_text_domains';

    /**
     * outer keys are locales
     * inner keys are EE versions
     *
     * @var string[][]
     */
    public $loaded_text_domains;


    /**
     *  loads the "ee_loaded_event_espresso_text_domains" WP option upon construction
     */
    public function __construct()
    {
        parent::__construct(LoadedTextDomains::OPTION_NAME, [], false, true);
        $this->loaded_text_domains = $this->loadOption();
    }


    /**
     * @param string $locale
     * @return bool
     */
    public function hasLocale(string $locale): bool
    {
        return isset($this->loaded_text_domains[ $locale ]);
    }


    /**
     * @param string $locale
     * @param string $version
     * @return bool
     */
    public function hasVersion(string $locale, string $version): bool
    {
        return isset($this->loaded_text_domains[ $locale ][ $version ]);
    }


    /**
     * @param string $locale
     * @param string $version
     * @return int
     */
    public function versionLoaded(string $locale, string $version): int
    {
        if (! $this->hasLocale($locale)) {
            $this->loaded_text_domains[ $locale ] = [];
        }
        $this->loaded_text_domains[ $locale ][ $version ] = true;
        ksort($this->loaded_text_domains[ $locale ]);
        ksort($this->loaded_text_domains);
        return $this->updateOption($this->loaded_text_domains);
    }


    /**
     * @return string[][]
     */
    public function getAll(): array
    {
        return $this->loaded_text_domains;
    }
}
