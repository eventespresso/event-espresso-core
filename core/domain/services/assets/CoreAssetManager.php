<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EEH_Qtip_Loader;
use EE_Currency_Config;
use EE_Registry;
use EE_Template_Config;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\assets\AssetCollection;
use EventEspresso\core\services\assets\AssetManager;
use EventEspresso\core\services\assets\Registry;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;
use InvalidArgumentException;

/**
 * Class CoreAssetManager
 * Manager class for for Event Espresso core assets
 *
 * @package EventEspresso\core\services\assets
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class CoreAssetManager extends AssetManager
{

    // WordPress core / Third party JS asset handles
    const JS_HANDLE_JS_CORE = 'eejs-core';

    const JS_HANDLE_CORE    = 'espresso_core';

    const JS_HANDLE_I18N    = 'eei18n';

    const JS_HANDLE_VENDOR  = 'eventespresso-vendor';

    const JS_HANDLE_RAMDA  = 'ramda';

    const RAMDA_VERSION = '0.27.1';

    // EE CSS assets handles
    const CSS_HANDLE_DEFAULT = 'espresso_default';

    const CSS_HANDLE_CUSTOM  = 'espresso_custom_css';

    /**
     * @var EE_Currency_Config $currency_config
     */
    protected $currency_config;

    /**
     * @var EE_Template_Config $template_config
     */
    protected $template_config;


    /**
     * CoreAssetRegister constructor.
     *
     * @param AssetCollection    $assets
     * @param EE_Currency_Config $currency_config
     * @param EE_Template_Config $template_config
     * @param DomainInterface    $domain
     * @param Registry           $registry
     */
    public function __construct(
        AssetCollection $assets,
        EE_Currency_Config $currency_config,
        EE_Template_Config $template_config,
        DomainInterface $domain,
        Registry $registry
    ) {
        $this->currency_config = $currency_config;
        $this->template_config = $template_config;
        parent::__construct($domain, $assets, $registry);
    }


    /**
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws InvalidInterfaceException
     * @since 4.9.62.p
     */
    public function addAssets()
    {
        $this->addJavascriptFiles();
        $this->addStylesheetFiles();
    }


    /**
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws InvalidInterfaceException
     * @since 4.9.62.p
     */
    public function addJavascriptFiles()
    {
        $this->addJs(CoreAssetManager::JS_HANDLE_VENDOR);
        $this->addJs(CoreAssetManager::JS_HANDLE_JS_CORE)->setHasInlineData();
        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_CORE,
            EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js',
            [JqueryAssetManager::JS_HANDLE_JQUERY]
        )->setInlineDataCallback(
            function () {
                wp_localize_script(
                    CoreAssetManager::JS_HANDLE_CORE,
                    CoreAssetManager::JS_HANDLE_I18N,
                    EE_Registry::sanitize_i18n_js_strings()
                );
            }
        );
        $this->loadQtipJs();
        $this->addVendorJavascript(
            CoreAssetManager::JS_HANDLE_RAMDA,
            [],
            true,
            CoreAssetManager::RAMDA_VERSION
        );
    }


    /**
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DomainException
     * @since 4.9.62.p
     */
    public function addStylesheetFiles()
    {
        if (! is_admin()) {
            $this->addStylesheet(
                CoreAssetManager::CSS_HANDLE_DEFAULT,
                is_readable(EVENT_ESPRESSO_UPLOAD_DIR . 'css/espresso_default.css')
                    ? EVENT_ESPRESSO_UPLOAD_URL . 'css/espresso_default.css'
                    : EE_GLOBAL_ASSETS_URL . 'css/espresso_default.css',
                ['dashicons']
            );
        }
    }


    /**
     * Returns configuration data for the js Currency VO.
     *
     * @return array
     * @since 4.9.71.p
     */
    private function getCurrencySettings()
    {
        return [
            'code'               => $this->currency_config->code,
            'singularLabel'      => $this->currency_config->name,
            'pluralLabel'        => $this->currency_config->plural,
            'sign'               => $this->currency_config->sign,
            'signB4'             => $this->currency_config->sign_b4,
            'decimalPlaces'      => $this->currency_config->dec_plc,
            'decimalMark'        => $this->currency_config->dec_mrk,
            'thousandsSeparator' => $this->currency_config->thsnds,
        ];
    }


    /**
     * replacement:
     * EventEspresso\core\domain\services\assets\EspressoLegacyAdminAssetManager::loadQtipJs()
     *
     * @param JavascriptAsset $script
     * @deprecated 5.0.0.p
     */
    public function loadQtipJs(JavascriptAsset $script = null)
    {
        // qtip is turned OFF by default, but prior to the wp_enqueue_scripts hook,
        // can be turned back on again via: add_filter('FHEE_load_qtip', '__return_true' );
        if (apply_filters('FHEE_load_qtip', false)) {
            EEH_Qtip_Loader::instance()->register_and_enqueue();
        }
    }
}
