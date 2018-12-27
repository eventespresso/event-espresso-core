<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\domain\DomainInterface;
use EEH_DTT_Helper;

/**
 * I18nRegistry
 * Handles registering translations for registered script handles.
 *
 * @package EventEspresso\core\services\assets
 * @author  Darren Ethier
 * @since   4.9.62.p
 */
class I18nRegistry
{
    /**
     * @var DomainInterface
     */
    private $domain;

    /**
     * Will hold all registered i18n scripts.  Prevents script handles from being registered more than once.
     *
     * @var array
     */
    private $registered_i18n = array();


    /**
     * Used to hold queued translations for the chunks loading in a view.
     *
     * @var array
     */
    private $queued_handle_translations = array();

    /**
     * Used to track script handles queued for adding translation strings as inline data in the dom.
     *
     * @var array
     */
    private $queued_scripts = array();


    /**
     * Obtained from the generated json file from the all javascript using wp.i18n with a map of script handle names to
     * translation strings.
     *
     * @var array
     */
    private $i18n_map;


    /**
     * I18nRegistry constructor.
     *
     * @param array() $i18n_map  An array of script handle names and the strings translated for those handles.  If not
     *                            provided, the class will look for map in root of plugin with filename of
     *                            'translation-map.json'.
     * @param DomainInterface $domain
     */
    public function __construct(array $i18n_map = array(), DomainInterface $domain)
    {
        $this->domain = $domain;
        $this->setI18nMap($i18n_map);
        add_filter('print_scripts_array', array($this, 'queueI18n'));
    }


    /**
     * Used to register a script that has i18n strings for its $handle
     *
     * @param string $handle The script handle reference.
     * @param string $domain The i18n domain for the strings.
     */
    public function registerScriptI18n($handle, $domain = 'event_espresso')
    {
        if(! isset($this->registered_i18n[$handle])) {
            $this->registered_i18n[ $handle ] = 1;
            $this->queued_scripts[ $handle ] = $domain;
        }
    }



    /**
     * Callback on print_scripts_array to listen for scripts enqueued and handle setting up the localized data.
     *
     * @param array $handles Array of registered script handles.
     * @return array
     */
    public function queueI18n(array $handles)
    {
        if (empty($this->queued_scripts)) {
            return $handles;
        }
        foreach ($handles as $handle) {
            $this->queueI18nTranslationsForHandle($handle);
        }
        if ($this->queued_handle_translations) {
            foreach ($this->queued_handle_translations as $handle => $translations_for_domain) {
                $this->registerInlineScript(
                    $handle,
                    $translations_for_domain['translations'],
                    $translations_for_domain['domain']
                );
            }
        }
        return $handles;
    }


    /**
     * Registers inline script with translations for given handle and domain.
     *
     * @param string $handle       Handle used to register javascript file containing translations.
     * @param array  $translations Array of string translations.
     * @param string $domain       Domain for translations.  If left empty then strings are registered with the default
     *                             domain for the javascript.
     */
    protected function registerInlineScript($handle, array $translations, $domain)
    {
        $script = $domain ?
            'eejs.i18n.setLocaleData( ' . wp_json_encode($translations) . ', "' . $domain . '" );' :
            'eejs.i18n.setLocaleData( ' . wp_json_encode($translations) . ' );';
        wp_add_inline_script($handle, $script, 'before');
    }


    /**
     * Queues up the translation strings for the given handle.
     *
     * @param string $handle The script handle being queued up.
     */
    private function queueI18nTranslationsForHandle($handle)
    {
        if (isset($this->queued_scripts[$handle])) {
            $domain = $this->queued_scripts[$handle];
            $translations = $this->getJedLocaleDataForDomainAndChunk($handle, $domain);
            if (count($translations) > 0) {
                $this->queued_handle_translations[$handle] = array(
                    'domain'       => $domain,
                    'translations' => $translations,
                );
            }
            unset($this->queued_scripts[$handle]);
        }
    }


    /**
     * Sets the internal i18n_map property.
     * If $chunk_map is empty or not an array, will attempt to load a chunk map from a default named map.
     *
     * @param array $i18n_map  If provided, an array of translation strings indexed by script handle names they
     *                         correspond to.
     */
    private function setI18nMap(array $i18n_map)
    {
        if (empty($i18n_map)) {
            $i18n_map = file_exists($this->domain->pluginPath() . 'translation-map.json')
                ? json_decode(
                        file_get_contents($this->domain->pluginPath() . 'translation-map.json'),
                        true
                    )
                : array();
        }
        $this->i18n_map = $i18n_map;
    }


    /**
     * Get the jed locale data for a given $handle and domain
     *
     * @param string $handle The name for the script handle we want strings returned for.
     * @param string $domain The i18n domain.
     * @return array
     */
    protected function getJedLocaleDataForDomainAndChunk($handle, $domain)
    {
        $translations = $this->getJedLocaleData($domain);
        // get index for adding back after extracting strings for this $chunk.
        $index = $translations[''];
        $translations = $this->getLocaleDataMatchingMap(
            $this->getOriginalStringsForHandleFromMap($handle),
            $translations
        );
        $translations[''] = $index;
        return $translations;
    }


    /**
     * Get locale data for given strings from given translations
     *
     * @param array $string_set   This is the subset of strings (msgIds) we want to extract from the translations array.
     * @param array $translations Translation data to extra strings from.
     * @return array
     */
    protected function getLocaleDataMatchingMap(array $string_set, array $translations)
    {
        if (empty($string_set)) {
            return array();
        }
        // some strings with quotes in them will break on the array_flip, so making sure quotes in the string are
        // slashed also filter falsey values.
        $string_set = array_unique(array_filter(wp_slash($string_set)));
        return array_intersect_key($translations, array_flip($string_set));
    }


    /**
     * Get original strings to translate for the given chunk from the map
     *
     * @param string $handle The script handle name to get strings from the map for.
     * @return array
     */
    protected function getOriginalStringsForHandleFromMap($handle)
    {
        return isset($this->i18n_map[$handle]) ? $this->i18n_map[$handle] : array();
    }


    /**
     * Returns Jed-formatted localization data.
     *
     * @param  string $domain Translation domain.
     * @return array
     */
    private function getJedLocaleData($domain)
    {
        $translations = get_translations_for_domain($domain);

        $locale = array(
            '' => array(
                'domain' => $domain,
                'lang'   => is_admin() ? EEH_DTT_Helper::get_user_locale() : get_locale()
            ),
        );

        if (! empty($translations->headers['Plural-Forms'])) {
            $locale['']['plural_forms'] = $translations->headers['Plural-Forms'];
        }

        foreach ($translations->entries as $msgid => $entry) {
            $locale[$msgid] = $entry->translations;
        }

        return $locale;
    }
}