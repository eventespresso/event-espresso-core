<?php

use EventEspresso\core\services\i18n\LegacyTextDomainOptions;
use EventEspresso\core\services\i18n\LoadedTextDomains;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\Request;

/**
 * EventEspresso\core\domain\deprecated\EE_Load_Textdomain
 * replaced by \EventEspresso\core\services\i18n\Textdomain
 *
 * @package     Event Espresso
 * @subpackage  /includes/core/EventEspresso\core\domain\deprecated\EE_Load_Textdomain.core.php
 * @author      Darren Ethier
 * @depecated   5.0.42
 */
class EE_Load_Textdomain extends EE_Base
{
    private const REPO_BASE_URL    = 'https://github.com/eventespresso/languages-ee4/raw/refs/heads/master/event_espresso';

    private const FILE_NAME_PREFIX = 'event_espresso-';


    /**
     * holds the current lang in WP
     *
     * @var string
     */
    public static string $locale = '';


    /**
     * this takes care of retrieving a matching textdomain for event espresso for the current WPLANG from EE GitHub
     * repo (if necessary) and then loading it for translations. should only be called in wp plugins_loaded callback
     *
     * @return void
     * @depecated 5.0.42
     */
    public static function loadTextdomain()
    {
        EE_Load_Textdomain::$locale = get_locale();
        if (empty(EE_Load_Textdomain::$locale)) {
            // can't download a language file if a language isn't set <taps temple>
            return;
        }
        // hook into init to load the textdomain
        add_action('init', [EE_Load_Textdomain::class, 'loadTranslationsForLocale'], 9);
        add_action('init', [EE_Load_Textdomain::class, 'loadPluginTextdomain']);
    }


    /**
     * @return void
     * @depecated 5.0.42
     */
    public static function loadPluginTextdomain()
    {
        $locale_mo      = EE_Load_Textdomain::$locale . '.mo';
        $github_mo_path = EE_LANGUAGES_SAFE_DIR . EE_Load_Textdomain::FILE_NAME_PREFIX . $locale_mo;
        if (is_readable($github_mo_path)) {
            load_plugin_textdomain('event_espresso', false, EE_LANGUAGES_SAFE_LOC);
            return;
        }
        $glotpress_mo_path = EE_LANGUAGES_SAFE_DIR . EE_Load_Textdomain::FILE_NAME_PREFIX . '4-' . $locale_mo;
        if (is_readable($glotpress_mo_path)) {
            load_textdomain('event_espresso', $glotpress_mo_path);
            return;
        }
        load_plugin_textdomain('event_espresso', false, dirname(EE_PLUGIN_BASENAME) . '/languages/');
    }


    /**
     * The purpose of this method is to side-load the language files for EE,
     * this includes the POT file and the PO/MO files for the given WPLANG locale (if necessary).
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @depecated 5.0.42
     */
    public static function loadTranslationsForLocale()
    {
        $loaded_text_domains = new LoadedTextDomains();
        // check if language files has already been side-loaded
        if ($loaded_text_domains->hasVersion(EE_Load_Textdomain::$locale, EVENT_ESPRESSO_VERSION)) {
            return;
        }

        // if locale is "en_US" then lets just get out, since Event Espresso core is already "en_US"
        if (EE_Load_Textdomain::$locale === 'en_US') {
            // but set option first else we'll forever be downloading the pot file
            $loaded_text_domains->versionLoaded(EE_Load_Textdomain::$locale, EVENT_ESPRESSO_VERSION);
            return;
        }

        /** @var Request $request */
        $request = LoaderFactory::getShared(Request::class);
        if ($request->isActivation()) {
            // clean up old text domain tracking
            $LegacyTextDomainOptions = new LegacyTextDomainOptions($loaded_text_domains);
            $LegacyTextDomainOptions->convertToConsolidatedFormat();
        }

        [$mo_loaded, $po_loaded] = EE_Load_Textdomain::sideLoadMoPo();

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


    /**
     * @throws ReflectionException
     * @throws EE_Error
     * @depecated 5.0.42
     */
    private static function sideLoadMoPo(): array
    {
        // load side-loader and side-load the .POT file as this should always be included.
        $side_loader_args = [
            'upload_path'   => EE_PLUGIN_DIR_PATH . 'languages/',
            'download_url'  => EE_Load_Textdomain::REPO_BASE_URL . '.pot',
            'new_file_name' => 'event_espresso.pot',
        ];
        EE_Registry::instance()->load_helper('Sideloader');
        $side_loader = new EEH_Sideloader($side_loader_args);
        // side-load the .POT file only for main site of the network, or if not running Multisite.
        if (is_main_site()) {
            $side_loader->sideload();
        }
        $repo_locale_URL = EE_Load_Textdomain::REPO_BASE_URL . '-' . EE_Load_Textdomain::$locale;
        $file_name_base  = EE_Load_Textdomain::FILE_NAME_PREFIX . EE_Load_Textdomain::$locale;

        // made it here so let's get the language files from the GitHub repo, first the .mo file
        $side_loader->setDownloadUrl("$repo_locale_URL.mo");
        $side_loader->setNewFileName("$file_name_base.mo");
        $mo_loaded = $side_loader->sideload();

        // now the .po file:
        $side_loader->setDownloadUrl("$repo_locale_URL.po");
        $side_loader->setNewFileName("$file_name_base.po");
        $po_loaded = $side_loader->sideload();

        return [$mo_loaded, $po_loaded];
    }


    /**
     * @depecated 5.0.42
     */
    public static function load_textdomain()
    {
        EE_Load_Textdomain::loadTextdomain();
    }

}
