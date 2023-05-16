<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\i18n\LegacyTextDomainOptions;
use EventEspresso\core\services\i18n\LoadedTextDomains;

/**
 * EE_Load_Textdomain
 *
 * @package        Event Espresso
 * @subpackage     /includes/core/EE_Load_Textdomain.core.php
 * @author         Darren Ethier
 */
class EE_Load_Textdomain extends EE_Base
{
    private const REPO_BASE_URL = 'https://raw.githubusercontent.com/eventespresso/languages-ee4/master/event_espresso';


    /**
     * holds the current lang in WP
     *
     * @var string
     */
    public static $locale;


    /**
     * this takes care of retrieving a matching textdomain for event espresso for the current WPLANG from EE GitHub
     * repo (if necessary) and then loading it for translations. should only be called in wp plugins_loaded callback
     *
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function load_textdomain()
    {
        EE_Load_Textdomain::loadTranslationsForLocale();
        // now load the textdomain
        if (!empty(EE_Load_Textdomain::$locale)) {
            $github_mo_path = EE_LANGUAGES_SAFE_DIR . 'event_espresso-' . EE_Load_Textdomain::$locale . '.mo';
            if (is_readable($github_mo_path)) {
                load_plugin_textdomain('event_espresso', false, EE_LANGUAGES_SAFE_LOC);
                return;
            }
            $glotpress_mo_path = EE_LANGUAGES_SAFE_DIR . 'event-espresso-4-' . EE_Load_Textdomain::$locale . '.mo';
            if (is_readable($glotpress_mo_path)) {
                load_textdomain('event_espresso', $glotpress_mo_path);
                return;
            }
        }
        load_plugin_textdomain('event_espresso', false, dirname(EE_PLUGIN_BASENAME) . '/languages/');
    }


    /**
     * The purpose of this method is to sideload the language files for EE,
     * this includes the POT file and the PO/MO files for the given WPLANG locale (if necessary).
     *
     * @access private
     * @static
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private static function loadTranslationsForLocale()
    {
        EE_Load_Textdomain::$locale = get_locale();
        // can't download a language file if a language isn't set <taps temple>
        if (empty(EE_Load_Textdomain::$locale)) {
            return;
        }
        $loaded_text_domains = new LoadedTextDomains();

        // check if language files has already been sideloaded
        if ($loaded_text_domains->hasVersion(EE_Load_Textdomain::$locale, EVENT_ESPRESSO_VERSION)) {
            return;
        }

        // clean up old text domain tracking
        $LegacyTextDomainOptions = new LegacyTextDomainOptions($loaded_text_domains);
        $LegacyTextDomainOptions->convertToConsolidatedFormat();

        // load sideloader and sideload the .POT file as this should always be included.
        $sideloader_args = array(
            '_upload_to'     => EE_PLUGIN_DIR_PATH . 'languages/',
            '_download_from' => EE_Load_Textdomain::REPO_BASE_URL . '.pot',
            '_new_file_name' => 'event_espresso.pot',
        );
        /** @var EEH_Sideloader $sideloader */
        $sideloader = EE_Registry::instance()->load_helper('Sideloader', $sideloader_args, false);
        // sideload the .POT file only for main site of the network, or if not running Multisite.
        if (is_main_site()) {
            $sideloader->sideload();
        }

        // if locale is "en_US" then lets just get out, since Event Espresso core is already "en_US"
        if (EE_Load_Textdomain::$locale === 'en_US') {
            // but set option first else we'll forever be downloading the pot file
            $loaded_text_domains->versionLoaded(EE_Load_Textdomain::$locale, EVENT_ESPRESSO_VERSION);
            return;
        }
        $repo_locale_URL = EE_Load_Textdomain::REPO_BASE_URL . '-' . EE_Load_Textdomain::$locale;
        $file_name_base = 'event_espresso-' . EE_Load_Textdomain::$locale;

        // made it here so let's get the language files from the GitHub repo, first the .mo file
        $sideloader->set_download_from("$repo_locale_URL.mo");
        $sideloader->set_new_file_name("$file_name_base.mo");
        $mo_loaded = $sideloader->sideload();

        // now the .po file:
        $sideloader->set_download_from("$repo_locale_URL.po");
        $sideloader->set_new_file_name("$file_name_base.po");
        $po_loaded = $sideloader->sideload();

        // set option so the above only runs when EE updates.
        $loaded_text_domains->versionLoaded(EE_Load_Textdomain::$locale, EVENT_ESPRESSO_VERSION);

        if ($mo_loaded && $po_loaded) {
            EE_Error::add_success(
                sprintf(
                    esc_html__(
                        'Successfully downloaded the Event Espresso text domain for the "%1$s" locale.',
                        'event_espresso'
                    ),
                    EE_Load_Textdomain::$locale
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
    }
}
