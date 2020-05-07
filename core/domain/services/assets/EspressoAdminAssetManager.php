<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\assets\AssetManager;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;

/**
 * Class EspressoAdminAssetManager
 * Description
 *
 * @package EventEspresso\core\domain\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EspressoAdminAssetManager extends AssetManager
{

    const JS_HANDLE_INJECT_WP = 'ee-inject-wp';

    const JS_HANDLE_JQUERY_COOKIE = 'jquery-cookie';

    const JS_HANDLE_JOYRIDE_MODERNIZR = 'joyride-modernizr';

    const JS_HANDLE_JQUERY_JOYRIDE = 'jquery-joyride';

    const CSS_HANDLE_EE_JOYRIDE = 'ee-joyride-css';

    const CSS_HANDLE_JOYRIDE = 'joyride-css';


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
        // this javascript is loaded on every admin page to catch any injections ee needs to add to wp run js.
        // Note: the intention of this script is to only do TARGETED injections.
        //ie: only injecting on certain script calls.
        $this->addJavascript(
            EspressoAdminAssetManager::JS_HANDLE_INJECT_WP,
            EE_ADMIN_URL . 'assets/ee-cpt-wp-injects.js',
            ['jquery'],
            true,
            EVENT_ESPRESSO_VERSION
        );
        // joyride is turned OFF by default, but prior to the admin_enqueue_scripts hook,
        // can be turned back on again via: add_filter('FHEE_load_joyride', '__return_true' );
        if (! $joyride) {
            return;
        }
        // register cookie script for future dependencies
        $this->addJavascript(
            EspressoAdminAssetManager::JS_HANDLE_JQUERY_COOKIE,
            EE_THIRD_PARTY_URL . 'joyride/jquery.cookie.js',
            ['jquery'],
            true,
            '2.1'
        );
        $this->addJavascript(
            EspressoAdminAssetManager::JS_HANDLE_JOYRIDE_MODERNIZR,
            EE_THIRD_PARTY_URL . 'joyride/modernizr.mq.js',
            [],
            true,
            '2.1'
        );
        // wanna go for a joyride?
        $this->addJavascript(
            EspressoAdminAssetManager::JS_HANDLE_JQUERY_JOYRIDE,
            EE_THIRD_PARTY_URL . 'joyride/jquery.joyride-2.1.js',
            [
                EspressoAdminAssetManager::JS_HANDLE_JQUERY_COOKIE,
                EspressoAdminAssetManager::JS_HANDLE_JOYRIDE_MODERNIZR
            ],
            '2.1',
            true
        )->enqueueAsset();
    }


    /**
     * Register CSS assets.
     *
     * @param bool $joyride
     */
    private function registerStyleSheets($joyride = false)
    {
        if (! $joyride) {
            return;
        }       // joyride style
        $this->addStylesheet(
            EspressoAdminAssetManager::CSS_HANDLE_JOYRIDE,
            EE_THIRD_PARTY_URL . 'joyride/joyride-2.1.css',
            [],
            'all',
            '2.1'
        );
        $this->addStylesheet(
            EspressoAdminAssetManager::CSS_HANDLE_EE_JOYRIDE,
            EE_GLOBAL_ASSETS_URL . 'css/ee-joyride-styles.css',
            ['joyride-css'],
            'all',
            EVENT_ESPRESSO_VERSION
        )->enqueueAsset();
    }
}