<?php

namespace EventEspresso\core\libraries\form_sections\inputs;

use EE_Select_Input;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

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

        $input_settings['default'] = isset($input_settings['default'])
            ? $input_settings['default']
            : $this->selected;
        $input_settings['html_class'] = isset($input_settings['html_class'])
            ? $input_settings['html_class'] . ' ee-locale-select-js'
            : 'ee-locale-select-js';
        parent::__construct($this->getLocaleOptions(), $input_settings);
    }


    /**
     * @return array
     */
    private function getLocaleOptions()
    {
        /*
         * $this->available_languages should only contain the locales.
         * Find the locale in $translations to get the native name. Fall back to locale.
         */
        $languages = [];
        foreach ($this->available_languages as $locale) {
            if (isset($this->translations[ $locale ])) {
                $languages[] = [
                    'language'    => $this->translations[ $locale ]['language'],
                    'native_name' => $this->translations[ $locale ]['native_name'],
                    'lang'        => current($this->translations[ $locale ]['iso']),
                ];
            } else {
                $languages[] = [
                    'language'    => $locale,
                    'native_name' => $locale,
                    'lang'        => '',
                ];
            }
        }

        $options = [];

        // Site default.
        $options['site-default'] = _x('Site Default', 'default site language');

        $options['en_US'] = [
            'display_text' => 'en_US : English(United States)',
            'lang' => 'en',
        ];

        // List installed languages.
        foreach ($languages as $language) {
            $value = esc_attr($language['language']);
            $options[ $value ] = [
                'display_text' => $value . ' : ' . esc_html($language['native_name']),
                'lang'         => $language['lang'],
            ];
        }

        return $options;
    }
}
