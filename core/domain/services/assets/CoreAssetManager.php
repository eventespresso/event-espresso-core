<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EE_Currency_Config;
use EE_Registry;
use EE_Template_Config;
use EED_Core_Rest_Api;
use EEH_DTT_Helper;
use EventEspresso\core\domain\Domain;
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
        // todo verify that the following data is no longer being used anywhere and remove
        $this->registry->addData('eejs_api_nonce', wp_create_nonce('wp_rest'));
        $this->registry->addData(
            'paths',
            [
                'base_rest_route'      => rest_url(),
                'rest_route'           => rest_url('ee/v4.8.36/'),
                'collection_endpoints' => EED_Core_Rest_Api::getCollectionRoutesIndexedByModelName(),
                'primary_keys'         => EED_Core_Rest_Api::getPrimaryKeyNamesIndexedByModelName(),
                'site_url'             => site_url('/'),
                'admin_url'            => admin_url('/'),
            ]
        );
        // Event Espresso brand name
        $this->registry->addData('brandName', Domain::brandName());
        /** site formatting values **/
        $this->registry->addData(
            'site_formats',
            [
                'date_formats' => EEH_DTT_Helper::convert_php_to_js_and_moment_date_formats(),
            ]
        );
        /** currency data **/
        $this->registry->addData(
            'currency_config',
            $this->getCurrencySettings()
        );
        /** site timezone */
        $this->registry->addData(
            'default_timezone',
            [
                'pretty' => EEH_DTT_Helper::get_timezone_string_for_display(),
                'string' => get_option('timezone_string'),
                'offset' => EEH_DTT_Helper::get_site_timezone_gmt_offset(),
            ]
        );
        /** site locale (user locale if user logged in) */
        $this->registry->addData(
            'locale',
            [
                'user' => get_user_locale(),
                'site' => get_locale(),
            ]
        );

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_CORE,
            EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js',
            [JqueryAssetManager::JS_HANDLE_JQUERY]
        )->setInlineDataCallback(
            function() {
                wp_localize_script(
                    CoreAssetManager::JS_HANDLE_CORE,
                    CoreAssetManager::JS_HANDLE_I18N,
                    EE_Registry::$i18n_js_strings
                );
            }
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
        if ($this->template_config->enable_default_style && ! is_admin()) {
            $this->addStylesheet(
                CoreAssetManager::CSS_HANDLE_DEFAULT,
                is_readable(EVENT_ESPRESSO_UPLOAD_DIR . 'css/espresso_default.css')
                    ? EVENT_ESPRESSO_UPLOAD_URL . 'css/espresso_default.css'
                    : EE_GLOBAL_ASSETS_URL . 'css/espresso_default.css',
                ['dashicons']
            );
            //Load custom style sheet if available
            if ($this->template_config->custom_style_sheet !== null) {
                $this->addStylesheet(
                    CoreAssetManager::CSS_HANDLE_CUSTOM,
                    EVENT_ESPRESSO_UPLOAD_URL . 'css/' . $this->template_config->custom_style_sheet,
                    [CoreAssetManager::CSS_HANDLE_DEFAULT]
                );
            }
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
     * @param JavascriptAsset $script
     * @deprecated $VID:$
     */
    public function loadQtipJs(JavascriptAsset $script)
    {
        // replacement:
        // EventEspresso\core\domain\services\assets\EspressoLegacyAdminAssetManager::loadQtipJs()
    }
}
