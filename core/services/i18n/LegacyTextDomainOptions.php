<?php

namespace EventEspresso\core\services\i18n;

/**
 * Class LegacyTextDomainOptions
 * Previously Event Espresso stored a separate WP option record for every version for each locale.
 * This class attempts to collect all of the ee_lang_check_* options stored in the database
 * and add them to the new LoadedTextDomains option then delete the old record.
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\i18n
 * @since   5.0.0.p
 */
class LegacyTextDomainOptions
{
    /**
     * @var LoadedTextDomains
     */
    private $loaded_text_domains;


    /**
     * @param LoadedTextDomains|null $loaded_text_domains
     */
    public function __construct(?LoadedTextDomains $loaded_text_domains = null)
    {
        $this->loaded_text_domains = $loaded_text_domains ?? new LoadedTextDomains();
    }


    /**
     * attempts to collect all of the ee_lang_check_* options stored in the database
     * and add them to one single option handled by EventEspresso\core\services\i18n\LoadedTextDomains
     *
     * @since   5.0.0.p
     */
    public function convertToConsolidatedFormat()
    {
        $options = wp_load_alloptions();
        foreach ($options as $slug => $values) {
            if (strpos($slug, 'ee_lang_check_') === 0) {
                // convert something like "ee_lang_check_en_CA_4.10.39.rc.018" to 'en_CA_4.10.39.rc.018'
                $locale_version = str_replace('ee_lang_check_', '', $slug);
                // split 'en_CA_4.10.39.rc.018' into [ 'en', 'CA', '4.10.39.rc.018' ]
                $locale_version = explode('_', $locale_version);
                $locale         = null;
                $version        = null;
                switch (count($locale_version)) {
                    case 3:
                        $locale  = "$locale_version[0]_$locale_version[1]";
                        $version = $locale_version[2];
                        break;
                    case 2:
                        $locale  = $locale_version[0];
                        $version = $locale_version[1];
                        break;
                }
                if ($locale && $version) {
                    $this->loaded_text_domains->versionLoaded($locale, $version);
                    delete_option($slug);
                }
            }
        }
    }
}
