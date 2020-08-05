<?php

namespace EventEspresso\core\domain\services\assets;

use EEH_Qtip_Loader;
use EventEspresso\core\services\assets\AssetManager;

/**
 * Class EspressoLegacyAdminAssetManager
 *
 * @package EventEspresso\core\domain\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoLegacyAdminAssetManager extends AssetManager
{

    const JS_HANDLE_EE_ADMIN                = 'ee_admin_js';

    const JS_HANDLE_EE_AJAX_TABLE_SORTING   = 'espresso_ajax_table_sorting';

    const JS_HANDLE_EE_DATEPICKER           = 'ee-datepicker';

    const JS_HANDLE_EE_DIALOG               = 'ee-dialog';

    const JS_HANDLE_EE_HELP_TOUR            = 'ee-help-tour';

    const JS_HANDLE_EE_INJECT_WP            = 'ee-inject-wp';

    const JS_HANDLE_EE_LEGACY_ADMIN = 'eventespresso-legacy-admin';

    const JS_HANDLE_GOOGLE_CHARTS           = 'google-charts';

    const JS_HANDLE_MOMENT                  = 'ee-moment';

    const JS_HANDLE_MOMENT_CORE             = 'ee-moment-core';

    const JS_HANDLE_PARSE_URI               = 'ee-parse-uri';

    const JS_HANDLE_EE_TEXT_LINKS           = 'ee-text-links';

    const JS_HANDLE_EE_SERIALIZE_FULL_ARRAY = 'ee-serialize-full-array';

    const JS_HANDLE_JOYRIDE_MODERNIZR       = 'joyride-modernizr';

    const JS_HANDLE_JQUERY_JOYRIDE          = 'jquery-joyride';

    const CSS_HANDLE_EE_ADMIN               = 'ee-admin-css';

    const CSS_HANDLE_EE_JOYRIDE             = 'ee-joyride-css';

    const CSS_HANDLE_EE_LEGACY_ADMIN = 'eventespresso-legacy-admin';

    const CSS_HANDLE_EE_ADMIN_MENU = 'espresso_menu';

    const CSS_HANDLE_EE_TEXT_LINKS          = 'ee-text-links';

    const CSS_HANDLE_EE_UI_THEME            = 'espresso-ui-theme';

    const CSS_HANDLE_JOYRIDE                = 'joyride-css';


    /**
     * @inheritDoc
     */
    public function addAssets()
    {
        $joyride = filter_var(apply_filters('FHEE_load_joyride', false), FILTER_VALIDATE_BOOLEAN);
        $this->registerJavascript($joyride);
        $this->registerStyleSheets($joyride);
    }


    /**
     * Register javascript assets
     *
     * @param bool $joyride
     */
    private function registerJavascript($joyride = false)
    {
        $this->addJs(
            EspressoLegacyAdminAssetManager::JS_HANDLE_EE_LEGACY_ADMIN,
            [
                EspressoLegacyAdminAssetManager::JS_HANDLE_EE_ADMIN,
                EspressoLegacyAdminAssetManager::JS_HANDLE_EE_AJAX_TABLE_SORTING,
                EspressoLegacyAdminAssetManager::JS_HANDLE_EE_SERIALIZE_FULL_ARRAY,
                EspressoLegacyAdminAssetManager::JS_HANDLE_EE_TEXT_LINKS,
                EspressoLegacyAdminAssetManager::JS_HANDLE_EE_DATEPICKER,
                EspressoLegacyAdminAssetManager::JS_HANDLE_GOOGLE_CHARTS,
                EspressoLegacyAdminAssetManager::JS_HANDLE_EE_INJECT_WP,
            ]
        )->enqueueAsset();

        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_EE_DIALOG,
            EE_ADMIN_URL . 'assets/ee-dialog-helper.js',
            [
                JqueryAssetManager::JS_HANDLE_JQUERY,
                JqueryAssetManager::JS_HANDLE_JQUERY_UI_DRAGGABLE,
            ]
        );

        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_EE_ADMIN,
            EE_ADMIN_URL . 'assets/ee-admin-page.js',
            [
                CoreAssetManager::JS_HANDLE_CORE,
                EspressoLegacyAdminAssetManager::JS_HANDLE_PARSE_URI,
                EspressoLegacyAdminAssetManager::JS_HANDLE_EE_DIALOG,
            ]
        );

        // script for sorting tables
        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_EE_AJAX_TABLE_SORTING,
            EE_ADMIN_URL . 'assets/espresso_ajax_table_sorting.js',
            [
                EspressoLegacyAdminAssetManager::JS_HANDLE_EE_ADMIN,
                JqueryAssetManager::JS_HANDLE_JQUERY_UI_SORTABLE,
            ]
        )->enqueueAsset();

        // script for parsing uri's
        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_PARSE_URI,
            EE_GLOBAL_ASSETS_URL . 'scripts/parseuri.js'
        );

        // and parsing associative serialized form elements
        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_EE_SERIALIZE_FULL_ARRAY,
            EE_GLOBAL_ASSETS_URL . 'scripts/jquery.serializefullarray.js',
            [JqueryAssetManager::JS_HANDLE_JQUERY]

        );

        // helpers scripts
        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_EE_TEXT_LINKS,
            EE_PLUGIN_DIR_URL . 'core/helpers/assets/ee_text_list_helper.js',
            [JqueryAssetManager::JS_HANDLE_JQUERY]
        );

        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_MOMENT_CORE,
            EE_THIRD_PARTY_URL . 'moment/moment-with-locales.min.js'
        );

        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_MOMENT,
            EE_THIRD_PARTY_URL . 'moment/moment-timezone-with-data.min.js',
            [EspressoLegacyAdminAssetManager::JS_HANDLE_MOMENT_CORE]
        );

        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_EE_DATEPICKER,
            EE_ADMIN_URL . 'assets/ee-datepicker.js',
            [
                JqueryAssetManager::JS_HANDLE_JQUERY_UI_TIMEPICKER_ADDON,
                EspressoLegacyAdminAssetManager::JS_HANDLE_MOMENT,
            ]
        );

        // google charts
        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_GOOGLE_CHARTS,
            'https://www.gstatic.com/charts/loader.js'
        );

        // this javascript is loaded on every admin page to catch any injections ee needs to add to wp run js.
        // Note: the intention of this script is to only do TARGETED injections.
        //ie: only injecting on certain script calls.
        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_EE_INJECT_WP,
            EE_ADMIN_URL . 'assets/ee-cpt-wp-injects.js',
            [JqueryAssetManager::JS_HANDLE_JQUERY]
        );

        $this->loadQtipJs();
        // joyride is turned OFF by default, but prior to the admin_enqueue_scripts hook,
        // can be turned back on again via: add_filter('FHEE_load_joyride', '__return_true' );
        if (! $joyride) {
            return;
        }

        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_JOYRIDE_MODERNIZR,
            EE_THIRD_PARTY_URL . 'joyride/modernizr.mq.js',
            [],
            true,
            '2.1'
        );

        // wanna go for a joyride?
        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_JQUERY_JOYRIDE,
            EE_THIRD_PARTY_URL . 'joyride/jquery.joyride-2.1.js',
            [
                JqueryAssetManager::JS_HANDLE_JQUERY_COOKIE,
                EspressoLegacyAdminAssetManager::JS_HANDLE_JOYRIDE_MODERNIZR,
            ],
            true,
            '2.1'
        )->enqueueAsset();

        $this->addJavascript(
            EspressoLegacyAdminAssetManager::JS_HANDLE_EE_HELP_TOUR,
            EE_ADMIN_URL . 'assets/ee-help-tour.js',
            [
                EspressoLegacyAdminAssetManager::JS_HANDLE_JQUERY_JOYRIDE,
            ],
            true,
            '2.1'
        )->enqueueAsset();
    }


    /**
     * Register CSS assets.
     *
     * @param bool $joyride
     */
    private function registerStyleSheets($joyride = false)
    {

        $this->addStylesheet(
            EspressoLegacyAdminAssetManager::CSS_HANDLE_EE_UI_THEME,
            EE_GLOBAL_ASSETS_URL . 'css/espresso-ui-theme/jquery-ui-1.10.3.custom.min.css'
        );

        $this->addStylesheet(
            EspressoLegacyAdminAssetManager::CSS_HANDLE_EE_TEXT_LINKS,
            EE_PLUGIN_DIR_URL . 'core/helpers/assets/ee_text_list_helper.css'
        );

        $this->addStylesheet(
            EspressoLegacyAdminAssetManager::CSS_HANDLE_EE_ADMIN,
            EE_ADMIN_URL . 'assets/ee-admin-page.css'
        )->enqueueAsset();

        $this->addStylesheet(
            EspressoLegacyAdminAssetManager::CSS_HANDLE_EE_ADMIN_MENU,
            EE_ADMIN_URL . 'assets/admin-menu-styles.css',
            ['dashicons']
        )->enqueueAsset();

        if (! $joyride) {
            return;
        }
        // joyride style
        $this->addStylesheet(
            EspressoLegacyAdminAssetManager::CSS_HANDLE_JOYRIDE,
            EE_THIRD_PARTY_URL . 'joyride/joyride-2.1.css',
            [],
            'all',
            '2.1'
        );

        $this->addStylesheet(
            EspressoLegacyAdminAssetManager::CSS_HANDLE_EE_JOYRIDE,
            EE_GLOBAL_ASSETS_URL . 'css/ee-joyride-styles.css',
            [EspressoLegacyAdminAssetManager::CSS_HANDLE_JOYRIDE],
            'all',
            EVENT_ESPRESSO_VERSION
        )->enqueueAsset();
    }


    /**
     * registers assets for cleaning your ears
     */
    public function loadQtipJs()
    {
        // qtip is turned OFF by default, but prior to the wp_enqueue_scripts hook,
        // can be turned back on again via: add_filter('FHEE_load_qtip', '__return_true' );
        if (apply_filters('FHEE_load_qtip', false)) {
            $qtip_loader = EEH_Qtip_Loader::instance();
            if ($qtip_loader instanceof EEH_Qtip_Loader) {
                $qtip_loader->register_and_enqueue();
            }
        }
    }
}
