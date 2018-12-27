<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EE_Currency_Config;
use EE_Registry;
use EE_Template_Config;
use EED_Core_Rest_Api;
use EEH_DTT_Helper;
use EEH_Qtip_Loader;
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
    const JS_HANDLE_JQUERY = 'jquery';

    const JS_HANDLE_JQUERY_VALIDATE = 'jquery-validate';

    const JS_HANDLE_JQUERY_VALIDATE_EXTRA = 'jquery-validate-extra-methods';

    const JS_HANDLE_UNDERSCORE = 'underscore';

    const JS_HANDLE_ACCOUNTING_CORE = 'ee-accounting-core';

    /**
     * @since 4.9.71.p
     */
    const JS_HANDLE_REACT = 'react';

    /**
     * @since 4.9.71.p
     */
    const JS_HANDLE_REACT_DOM = 'react-dom';

    /**
     * @since 4.9.71.p
     */
    const JS_HANDLE_LODASH = 'lodash';

    // EE JS assets handles
    const JS_HANDLE_MANIFEST = 'ee-manifest';

    const JS_HANDLE_JS_CORE = 'eejs-core';

    const JS_HANDLE_VENDOR = 'eventespresso-vendor';

    const JS_HANDLE_DATA_STORES = 'eventespresso-data-stores';

    const JS_HANDLE_HELPERS = 'eventespresso-helpers';

    const JS_HANDLE_MODEL = 'eventespresso-model';

    const JS_HANDLE_VALUE_OBJECTS = 'eventespresso-value-objects';

    const JS_HANDLE_HOCS = 'eventespresso-hocs';

    const JS_HANDLE_COMPONENTS = 'eventespresso-components';

    const JS_HANDLE_EDITOR_HOCS = 'eventespresso-editor-hocs';

    const JS_HANDLE_VALIDATORS = 'eventespresso-validators';

    const JS_HANDLE_CORE = 'espresso_core';

    const JS_HANDLE_I18N = 'eei18n';

    const JS_HANDLE_ACCOUNTING = 'ee-accounting';

    const JS_HANDLE_WP_PLUGINS_PAGE = 'ee-wp-plugins-page';

    // EE CSS assets handles
    const CSS_HANDLE_DEFAULT = 'espresso_default';

    const CSS_HANDLE_CUSTOM = 'espresso_custom_css';

    const CSS_HANDLE_COMPONENTS = 'eventespresso-components';

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
     * @since 4.9.62.p
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws InvalidInterfaceException
     */
    public function addAssets()
    {
        $this->addJavascriptFiles();
        $this->addStylesheetFiles();
    }


    /**
     * @since 4.9.62.p
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws InvalidInterfaceException
     */
    public function addJavascriptFiles()
    {
        $this->loadCoreJs();
        $this->loadJqueryValidate();
        $this->loadAccountingJs();
        add_action(
            'AHEE__EventEspresso_core_services_assets_Registry__registerScripts__before_script',
            array($this, 'loadQtipJs')
        );
        $this->registerAdminAssets();
    }


    /**
     * @since 4.9.62.p
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     */
    public function addStylesheetFiles()
    {
        $this->loadCoreCss();
    }


    /**
     * core default javascript
     *
     * @since 4.9.62.p
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws InvalidInterfaceException
     */
    private function loadCoreJs()
    {
        // conditionally load third-party libraries that WP core MIGHT have.
        $this->registerWpAssets();

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_MANIFEST,
            $this->registry->getJsUrl($this->domain->assetNamespace(), 'manifest')
        );

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_JS_CORE,
            $this->registry->getJsUrl($this->domain->assetNamespace(), 'eejs'),
            array(CoreAssetManager::JS_HANDLE_MANIFEST)
        )
        ->setHasInlineData();

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_VENDOR,
            $this->registry->getJsUrl($this->domain->assetNamespace(), 'vendor'),
            array(
                CoreAssetManager::JS_HANDLE_JS_CORE,
                CoreAssetManager::JS_HANDLE_REACT,
                CoreAssetManager::JS_HANDLE_REACT_DOM,
                CoreAssetManager::JS_HANDLE_LODASH,
            )
        );

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_VALIDATORS,
            $this->registry->getJsUrl($this->domain->assetNamespace(), 'validators')
        )->setRequiresTranslation();

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_HELPERS,
            $this->registry->getJsUrl($this->domain->assetNamespace(), 'helpers'),
            array(
                CoreAssetManager::JS_HANDLE_VALIDATORS
            )
        )->setRequiresTranslation();

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_MODEL,
            $this->registry->getJsUrl($this->domain->assetNamespace(), 'model'),
            array(
                CoreAssetManager::JS_HANDLE_HELPERS
            )
        )->setRequiresTranslation();

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_VALUE_OBJECTS,
            $this->registry->getJsUrl($this->domain->assetNamespace(), 'valueObjects'),
            array(
                CoreAssetManager::JS_HANDLE_MODEL
            )
        )->setRequiresTranslation();

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_DATA_STORES,
            $this->registry->getJsUrl($this->domain->assetNamespace(), 'data-stores'),
            array(
                CoreAssetManager::JS_HANDLE_VENDOR,
                'wp-data',
                'wp-api-fetch',
                CoreAssetManager::JS_HANDLE_VALUE_OBJECTS
            )
        )
             ->setRequiresTranslation();

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_HOCS,
            $this->registry->getJsUrl($this->domain->assetNamespace(), 'hocs'),
            array(
                CoreAssetManager::JS_HANDLE_DATA_STORES,
                CoreAssetManager::JS_HANDLE_VALUE_OBJECTS,
                'wp-components',
            )
        )->setRequiresTranslation();

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_COMPONENTS,
            $this->registry->getJsUrl($this->domain->assetNamespace(), 'components'),
            array(
                CoreAssetManager::JS_HANDLE_DATA_STORES,
                CoreAssetManager::JS_HANDLE_VALUE_OBJECTS,
                'wp-components',
            )
        )
        ->setRequiresTranslation();

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_EDITOR_HOCS,
            $this->registry->getJsUrl($this->domain->assetNamespace(), 'editor-hocs'),
            array(
                CoreAssetManager::JS_HANDLE_COMPONENTS
            )
        )->setRequiresTranslation();

        $this->registry->addData('eejs_api_nonce', wp_create_nonce('wp_rest'));
        $this->registry->addData(
            'paths',
            array(
                'rest_route' => rest_url('ee/v4.8.36/'),
                'collection_endpoints' => EED_Core_Rest_Api::getCollectionRoutesIndexedByModelName(),
                'primary_keys' => EED_Core_Rest_Api::getPrimaryKeyNamesIndexedByModelName(),
                'site_url' => site_url('/'),
                'admin_url' => admin_url('/'),
            )
        );
        /** site formatting values **/
        $this->registry->addData(
            'site_formats',
            array(
                'date_formats' => EEH_DTT_Helper::convert_php_to_js_and_moment_date_formats()
            )
        );
        /** currency data **/
        $this->registry->addData(
            'currency_config',
            $this->getCurrencySettings()
        );
        /** site timezone */
        $this->registry->addData(
            'default_timezone',
            array(
                'pretty' => EEH_DTT_Helper::get_timezone_string_for_display(),
                'string' => get_option('timezone_string'),
                'offset' => EEH_DTT_Helper::get_site_timezone_gmt_offset(),
            )
        );
        /** site locale (user locale if user logged in) */
        $this->registry->addData(
            'locale',
            array(
                'user' => get_user_locale(),
                'site' => get_locale()
            )
        );

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_CORE,
            EE_GLOBAL_ASSETS_URL . 'scripts/espresso_core.js',
            array(CoreAssetManager::JS_HANDLE_JQUERY)
        )
        ->setInlineDataCallback(
            function () {
                wp_localize_script(
                    CoreAssetManager::JS_HANDLE_CORE,
                    CoreAssetManager::JS_HANDLE_I18N,
                    EE_Registry::$i18n_js_strings
                );
            }
        );
    }


    /**
     * Registers vendor files that are bundled with a later version WP but might not be for the current version of
     * WordPress in the running environment.
     *
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DomainException
     * @since 4.9.71.p
     */
    private function registerWpAssets()
    {
        global $wp_version;
        if (version_compare($wp_version, '5.0.beta', '>=')) {
            return;
        }
        $this->addVendorJavascript(CoreAssetManager::JS_HANDLE_REACT)
            ->setVersion('16.6.0');
        $this->addVendorJavascript(
            CoreAssetManager::JS_HANDLE_REACT_DOM,
            array(CoreAssetManager::JS_HANDLE_REACT)
        )->setVersion('16.6.0');
        $this->addVendorJavascript(CoreAssetManager::JS_HANDLE_LODASH)
            ->setInlineDataCallback(
                function() {
                    wp_add_inline_script(
                        CoreAssetManager::JS_HANDLE_LODASH,
                        'window.lodash = _.noConflict();'
                    );
                }
            )
            ->setVersion('4.17.11');
    }


    /**
     * Returns configuration data for the accounting-js library.
     * @since 4.9.71.p
     * @return array
     */
    private function getAccountingSettings() {
        return array(
            'currency' => array(
                'symbol'    => $this->currency_config->sign,
                'format'    => array(
                    'pos'  => $this->currency_config->sign_b4 ? '%s%v' : '%v%s',
                    'neg'  => $this->currency_config->sign_b4 ? '- %s%v' : '- %v%s',
                    'zero' => $this->currency_config->sign_b4 ? '%s--' : '--%s',
                ),
                'decimal'   => $this->currency_config->dec_mrk,
                'thousand'  => $this->currency_config->thsnds,
                'precision' => $this->currency_config->dec_plc,
            ),
            'number'   => array(
                'precision' => $this->currency_config->dec_plc,
                'thousand'  => $this->currency_config->thsnds,
                'decimal'   => $this->currency_config->dec_mrk,
            ),
        );
    }


    /**
     * Returns configuration data for the js Currency VO.
     * @since 4.9.71.p
     * @return array
     */
    private function getCurrencySettings()
    {
        return array(
            'code' => $this->currency_config->code,
            'singularLabel' => $this->currency_config->name,
            'pluralLabel' => $this->currency_config->plural,
            'sign' => $this->currency_config->sign,
            'signB4' => $this->currency_config->sign_b4,
            'decimalPlaces' => $this->currency_config->dec_plc,
            'decimalMark' => $this->currency_config->dec_mrk,
            'thousandsSeparator' => $this->currency_config->thsnds,
        );
    }


    /**
     * @since 4.9.62.p
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     */
    private function loadCoreCss()
    {
        if ($this->template_config->enable_default_style && ! is_admin()) {
            $this->addStylesheet(
                CoreAssetManager::CSS_HANDLE_DEFAULT,
                is_readable(EVENT_ESPRESSO_UPLOAD_DIR . 'css/style.css')
                    ? EVENT_ESPRESSO_UPLOAD_DIR . 'css/espresso_default.css'
                    : EE_GLOBAL_ASSETS_URL . 'css/espresso_default.css',
                array('dashicons')
            );
            //Load custom style sheet if available
            if ($this->template_config->custom_style_sheet !== null) {
                $this->addStylesheet(
                    CoreAssetManager::CSS_HANDLE_CUSTOM,
                    EVENT_ESPRESSO_UPLOAD_URL . 'css/' . $this->template_config->custom_style_sheet,
                    array(CoreAssetManager::CSS_HANDLE_DEFAULT)
                );
            }
        }
        $this->addStylesheet(
            CoreAssetManager::CSS_HANDLE_COMPONENTS,
            $this->registry->getCssUrl(
                $this->domain->assetNamespace(),
                'components'
            )
        );
    }


    /**
     * jQuery Validate for form validation
     *
     * @since 4.9.62.p
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     */
    private function loadJqueryValidate()
    {
        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_JQUERY_VALIDATE,
            EE_GLOBAL_ASSETS_URL . 'scripts/jquery.validate.min.js',
            array(CoreAssetManager::JS_HANDLE_JQUERY)
        )
        ->setVersion('1.15.0');

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_JQUERY_VALIDATE_EXTRA,
            EE_GLOBAL_ASSETS_URL . 'scripts/jquery.validate.additional-methods.min.js',
            array(CoreAssetManager::JS_HANDLE_JQUERY_VALIDATE)
        )
        ->setVersion('1.15.0');
    }


    /**
     * accounting.js for performing client-side calculations
     *
     * @since 4.9.62.p
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     */
    private function loadAccountingJs()
    {
        //accounting.js library
        // @link http://josscrowcroft.github.io/accounting.js/
        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_ACCOUNTING_CORE,
            EE_THIRD_PARTY_URL . 'accounting/accounting.js',
            array(CoreAssetManager::JS_HANDLE_UNDERSCORE)
        )
        ->setVersion('0.3.2');

        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_ACCOUNTING,
            EE_GLOBAL_ASSETS_URL . 'scripts/ee-accounting-config.js',
            array(CoreAssetManager::JS_HANDLE_ACCOUNTING_CORE)
        )
        ->setInlineDataCallback(
            function () {
                 wp_localize_script(
                     CoreAssetManager::JS_HANDLE_ACCOUNTING,
                     'EE_ACCOUNTING_CFG',
                     $this->getAccountingSettings()
                 );
            }
        )
        ->setVersion();
    }


    /**
     * registers assets for cleaning your ears
     *
     * @param JavascriptAsset $script
     */
    public function loadQtipJs(JavascriptAsset $script)
    {
        // qtip is turned OFF by default, but prior to the wp_enqueue_scripts hook,
        // can be turned back on again via: add_filter('FHEE_load_qtip', '__return_true' );
        if (
            $script->handle() === CoreAssetManager::JS_HANDLE_WP_PLUGINS_PAGE
            && apply_filters('FHEE_load_qtip', false)
        ) {
            EEH_Qtip_Loader::instance()->register_and_enqueue();
        }
    }


    /**
     * assets that are used in the WordPress admin
     *
     * @since 4.9.62.p
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     */
    private function registerAdminAssets()
    {
        $this->addJavascript(
            CoreAssetManager::JS_HANDLE_WP_PLUGINS_PAGE,
            $this->registry->getJsUrl($this->domain->assetNamespace(), 'wp-plugins-page'),
            array(
                CoreAssetManager::JS_HANDLE_JQUERY,
                CoreAssetManager::JS_HANDLE_VENDOR,
            )
        )
        ->setRequiresTranslation();

        $this->addStylesheet(
            CoreAssetManager::JS_HANDLE_WP_PLUGINS_PAGE,
            $this->registry->getCssUrl($this->domain->assetNamespace(), 'wp-plugins-page')
        );
    }
}
