<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * EE_Load_Textdomain
 *
 * @package        Event Espresso
 * @subpackage     /includes/core/EE_Load_Textdomain.core.php
 * @author         Darren Ethier
 */
class EE_Load_Textdomain extends EE_Base
{

    /**
     * holds the current lang in WP
     *
     * @var string
     */
    private static $locale;


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
            $old_mo_path = EE_LANGUAGES_SAFE_DIR . 'event_espresso-' . EE_Load_Textdomain::$locale . '.mo';
            if (is_readable($old_mo_path)) {
                load_plugin_textdomain('event_espresso', false, EE_LANGUAGES_SAFE_LOC);
                return;
            }
            $EE4_mo_path = EE_LANGUAGES_SAFE_DIR . 'event_espresso-4-' . EE_Load_Textdomain::$locale . '.mo';
            if (is_readable($EE4_mo_path)) {
                load_textdomain('event_espresso', $EE4_mo_path);
                return;
            }
        }
        load_plugin_textdomain('event_espresso', false, dirname(EE_PLUGIN_BASENAME) . '/languages/');
    }


    /**
     * The purpose of this method is to sideload all of the lang files for EE, this includes the POT file and also the PO/MO files for the given WPLANG locale (if necessary).
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
        $language_check_option_name = 'ee_lang_check_' . EE_Load_Textdomain::$locale . '_' . EVENT_ESPRESSO_VERSION;
        // check if language files has already been sideloaded
        if (get_option($language_check_option_name)) {
            return;
        }

        $repo_base_URL = 'https://github.com/eventespresso/languages-ee4/blob/master/event_espresso';

        // load sideloader and sideload the .POT file as this should always be included.
        $sideloader_args = array(
            '_upload_to'     => EE_PLUGIN_DIR_PATH . 'languages/',
            '_download_from'   => $repo_base_URL .'.pot?raw=true',
            '_new_file_name' => 'event_espresso.pot',
        );
        /** @var EEH_Sideloader $sideloader */
        $sideloader = EE_Registry::instance()->load_helper('Sideloader', $sideloader_args, false);
        $sideloader->sideload();

        // if locale is "en_US" then lets just get out, since Event Espresso core is already "en_US"
        if (EE_Load_Textdomain::$locale === 'en_US') {
            return;
        }
        $repo_locale_URL = $repo_base_URL . '-' . EE_Load_Textdomain::$locale;
        $file_name_base = 'event_espresso-' . EE_Load_Textdomain::$locale;

        // made it here so let's get the language files from the github repo, first the .mo file
        $sideloader->set_download_from("{$repo_locale_URL}.mo?raw=true");
        $sideloader->set_new_file_name("{$file_name_base}.mo");
        $sideloader->sideload();

        // now the .po file:
        $sideloader->set_download_from("{$repo_locale_URL}.po?raw=true");
        $sideloader->set_new_file_name("{$file_name_base}.po");
        $sideloader->sideload();

        // set option so the above only runs when EE updates.
        update_option($language_check_option_name, 1);
    }
}
