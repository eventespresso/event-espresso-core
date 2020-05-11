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
 * @since   $VID:$
 */
class LegacyEditorAssetManager extends AssetManager
{

    public const JS_HANDLE_UNDERSCORE = 'underscore';

    public const JS_HANDLE_ACCOUNTING_CORE = 'ee-accounting-core';

    public const JS_HANDLE_ACCOUNTING = 'ee-accounting';


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
    }


    /**
     * accounting.js for performing client-side calculations
     *
     * @throws DomainException
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @since $VID:$
     */
    private function loadAccountingJs()
    {
        //accounting.js library
        // @link http://josscrowcroft.github.io/accounting.js/
        $this->addJavascript(
            LegacyEditorAssetManager::JS_HANDLE_ACCOUNTING_CORE,
            EE_THIRD_PARTY_URL . 'accounting/accounting.js',
            [LegacyEditorAssetManager::JS_HANDLE_UNDERSCORE],
            true,
            '0.3.2'
        );

        $this->addJavascript(
            LegacyEditorAssetManager::JS_HANDLE_ACCOUNTING,
            EE_GLOBAL_ASSETS_URL . 'scripts/ee-accounting-config.js',
            [LegacyEditorAssetManager::JS_HANDLE_ACCOUNTING_CORE]
        )
             ->setInlineDataCallback(
                 function () {
                     wp_localize_script(
                         LegacyEditorAssetManager::JS_HANDLE_ACCOUNTING,
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
     * @since $VID:$
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
}
