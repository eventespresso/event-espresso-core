<?php

namespace EventEspresso\core\libraries\form_sections\inputs;

use EE_Select_Input;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\locale\WordPressLocales;

/**
 * Class EE_Locale_Select_Input
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\libraries\form_sections\inputs
 * @since   $VID:$
 */
class EE_Locale_Select_Input extends EE_Select_Input
{
    /**
     * @var array
     */
    private $available_languages;

    /**
     * @var string
     */
    private $selected;

    /**
     * @var array
     */
    private $translations;

    /**
     * @param array $input_settings
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function __construct($input_settings = [])
    {
        require_once ABSPATH . 'wp-admin/includes/translation-install.php';
        $this->available_languages = get_available_languages();
        $this->translations        = wp_get_available_translations();

        $lang = get_site_option('WPLANG');
        $this->selected = in_array($lang, $this->available_languages, true) ? $lang : 'en_US';

        $input_settings['default'] = $input_settings['default'] ?? $this->selected;
        $input_settings['html_class'] = isset($input_settings['html_class'])
            ? $input_settings['html_class'] . ' ee-locale-select-js'
            : 'ee-locale-select-js';
        parent::__construct($this->getLocaleOptions(), $input_settings);
    }


    /**
     * @return array
     */
    private function getLocaleOptions(): array
    {
        /*
         * $this->available_languages should only contain the locales.
         * Find the locale in $translations to get the native name. Fall back to locale.
         */
        $languages = [];
        foreach ($this->available_languages as $locale) {
            if (isset($this->translations[ $locale ])) {
                $languages[] = [
                    'locale'      => $this->translations[ $locale ]['language'],
                    'native_name' => $this->translations[ $locale ]['native_name'],
                    'language'    => current($this->translations[ $locale ]['iso']),
                ];
            } else {
                $languages[] = [
                    'locale'      => $locale,
                    'native_name' => $locale,
                    'language'    => '',
                ];
            }
        }

        // default.
        $options = [
            'en' => ['en_US' => 'en_US : English (United States)']
        ];

        // List installed languages.
        foreach ($languages as $language_data) {
            $language = $language_data['language'];

            $locale = $language_data['locale'];
            $locale = WordPressLocales::hasLocaleForLanguage($locale)
                ? WordPressLocales::getLocaleForLanguage($locale)
                : $locale;
            $locale = esc_attr($locale);

            if (WordPressLocales::hasExtraLocalesForLanguage($locale)) {
                $extra_locales = WordPressLocales::getExtraLocalesForLanguage($locale);
                foreach ($extra_locales as $extra_locale => $native_name) {
                    $options[ $language ][ $extra_locale ] = $extra_locale . ' : ' . esc_html($native_name);
                }
            } else {
                $options[ $language ][ $locale ] = $locale . ' : ' . esc_html($language_data['native_name']);
            }
        }

        // now sort it
        ksort($options, SORT_NATURAL | SORT_FLAG_CASE);
        foreach ($options as $key => $option) {
            if (is_array($option)) {
                ksort($option, SORT_NATURAL | SORT_FLAG_CASE);
                $options[ $key ] = $option;
            }
        }
        return $options;
    }
}
