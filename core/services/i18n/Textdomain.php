<?php

namespace EventEspresso\core\services\i18n;

use EEH_File;
use EEH_Sideloader;

/**
 * Textdomain
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\i18n
 * @author      Brent Christensen
 * @since       5.0.42
 */
class Textdomain
{
    private const REPO_BASE_URL = 'https://github.com/eventespresso/languages-ee4/raw/refs/heads/master';

    private const TEXT_DOMAIN   = 'event_espresso';


    public string $languages_dir;

    public string $languages_repo;

    public string $locale;

    public string $text_domain;


    public function __construct()
    {
        $this->languages_dir  = EE_PLUGIN_DIR_PATH . 'languages';
        $this->languages_repo = Textdomain::REPO_BASE_URL;
        $this->locale         = determine_locale();
        $this->text_domain    = Textdomain::TEXT_DOMAIN;
    }


    public function loadPluginTextdomain(): void
    {
        // can't download a language file if a language isn't set <taps temple>
        // also don't load the textdomain if the locale is 'en_US' or if the textdomain is already loaded
        if (! $this->locale || $this->locale === 'en_US' || is_textdomain_loaded($this->text_domain)) {
            return;
        }
        // espresso uploads dir = /wp-content/uploads/espresso
        $uploads_dir = untrailingslashit(EE_LANGUAGES_SAFE_DIR);

        $upload_paths = [
            // uploads/espresso/languages/event_espresso-{locale}.mo
            'custom'    => "$uploads_dir/$this->text_domain-$this->locale.mo",
            // uploads/espresso/languages/event-espresso-4-{locale}.mo
            'glotpress' => "$uploads_dir/event-espresso-4-$this->locale.mo",
            // plugins/event-espresso-core-reg/languages/event_espresso-{locale}.mo
            'default'   => "$this->languages_dir/$this->text_domain-$this->locale.mo",
        ];

        foreach ($upload_paths as $type => $upload_path) {
            // verify the default language file exists in the plugin directory and sideload if not
            if ($type === 'default') {
                if(! EEH_File::exists($upload_path)) {
                    $this->loadTranslationsForLocaleOnActivation();
                }
                // verify that the sideloaded translation file if readable, and if so, load it and return
                if (
                    is_readable($upload_path)
                    && load_plugin_textdomain($this->text_domain, false, dirname(EE_PLUGIN_BASENAME) . '/languages/')
                ) {
                    return;
                }
            }
            // as soon as we find a readable file, load it and return
            if (is_readable($upload_path) && load_textdomain($this->text_domain, $upload_path, $this->locale)) {
                return;
            }
        }
    }


    public function loadTranslationsForLocaleOnActivation(): void
    {
        $side_loader = new EEH_Sideloader(['upload_path' => $this->languages_dir]);
        $lang_files  = [
            'mo'  => "$this->text_domain-$this->locale.mo",
            'po'  => "$this->text_domain-$this->locale.po",
            'pot' => "$this->text_domain.pot",
        ];
        foreach ($lang_files as $type => $file_name) {
            // first delete the existing file
            if (EEH_File::exists("$this->languages_dir/$file_name")) {
                EEH_File::delete("$this->languages_dir/$file_name");
            }
            // only side-load the .POT file for main site of the network or if not running Multisite.
            if ($type === 'pot' && ! is_main_site()) {
                continue;
            }
            // set the download URL and filename then side-load the file
            $side_loader->setDownloadUrl("$this->languages_repo/$file_name");
            $side_loader->setNewFileName($file_name);
            $side_loader->sideload();
        }
    }


    public function deleteLegacyTextDomainOption()
    {
        if (version_compare(EVENT_ESPRESSO_VERSION, '5.2.0', '<')) {
            return;
        }
        $loaded_text_domains = new LoadedTextDomains();
        $loaded_text_domains->deleteOption();
    }
}
