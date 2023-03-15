<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EE_Currency_Config;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\assets\AssetCollection;
use EventEspresso\core\services\assets\AssetManager;
use EventEspresso\core\services\assets\Registry;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;


/**
 * LegacyEditorAssetManager
 * assets for the EE legacy event editor
 *
 * @package EventEspresso\core\domain\services\assets
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class LegacyAccountingAssetManager extends AssetManager
{

    const JS_HANDLE_UNDERSCORE = 'underscore';

    const JS_HANDLE_ACCOUNTING_CORE = 'ee-accounting-core';

    const JS_HANDLE_ACCOUNTING = 'ee-accounting';


    /**
     * @var EE_Currency_Config $currency_config
     */
    protected $currency_config;

    /**
     * CoreAssetRegister constructor.
     *
     * @param AssetCollection    $assets
     * @param DomainInterface    $domain
     * @param Registry           $registry
     * @param EE_Currency_Config $currency_config
     */
    public function __construct(
        AssetCollection $assets,
        DomainInterface $domain,
        Registry $registry,
        EE_Currency_Config $currency_config
    ) {
        $this->currency_config = $currency_config;
        parent::__construct($domain, $assets, $registry);
    }



    /**
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     * @throws DomainException
     */
    public function addAssets()
    {
        $this->loadAccountingJs();
        add_action('admin_enqueue_scripts', [$this, 'enqueueLegacyAccountingAssets'], 100);
    }


    /**
     * accounting.js for performing client-side calculations
     *
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @since 5.0.0.p
     */
    private function loadAccountingJs()
    {
        //accounting.js library
        // @link http://josscrowcroft.github.io/accounting.js/
        $this->addJavascript(
            LegacyAccountingAssetManager::JS_HANDLE_ACCOUNTING_CORE,
            EE_THIRD_PARTY_URL . 'accounting/accounting.js',
            [LegacyAccountingAssetManager::JS_HANDLE_UNDERSCORE],
            true,
            '0.3.2'
        );

        $this->addJavascript(
            LegacyAccountingAssetManager::JS_HANDLE_ACCOUNTING,
            EE_GLOBAL_ASSETS_URL . 'scripts/ee-accounting-config.js',
            [LegacyAccountingAssetManager::JS_HANDLE_ACCOUNTING_CORE]
        )
             ->setInlineDataCallback(
                 function () {
                     wp_localize_script(
                         LegacyAccountingAssetManager::JS_HANDLE_ACCOUNTING,
                         'EE_ACCOUNTING_CFG',
                         $this->getAccountingSettings()
                     );
                 }
             );
    }


    /**
     * Returns configuration data for the accounting-js library.
     *
     * @return array
     * @since 5.0.0.p
     */
    private function getAccountingSettings()
    {
        return [
            'currency' => [
                'symbol'    => $this->currency_config->sign,
                'format'    => [
                    'pos'  => $this->currency_config->sign_b4 ? '%s%v' : '%v%s',
                    'neg'  => $this->currency_config->sign_b4 ? '- %s%v' : '- %v%s',
                    'zero' => $this->currency_config->sign_b4 ? '%s--' : '--%s',
                ],
                'decimal'   => $this->currency_config->dec_mrk,
                'thousand'  => $this->currency_config->thsnds,
                'precision' => $this->currency_config->dec_plc,
            ],
            'number'   => [
                'precision' => $this->currency_config->dec_plc,
                'thousand'  => $this->currency_config->thsnds,
                'decimal'   => $this->currency_config->dec_mrk,
            ],
        ];
    }


    /**
     * enqueue_scripts - Load the scripts and css
     *
     * @return void
     */
    public function enqueueLegacyAccountingAssets()
    {
        $this->enqueueAsset(LegacyAccountingAssetManager::JS_HANDLE_ACCOUNTING);
    }
}
