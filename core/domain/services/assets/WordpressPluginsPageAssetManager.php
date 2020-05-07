<?php

namespace EventEspresso\core\domain\services\assets;

use DomainException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;

/**
 * Class WpPluginsPageAssetManager
 * Description
 *
 * @package EventEspresso\core\domain\services\assets
 * @author  Brent Christensen
 * @since   $VID:$
 */
class WordpressPluginsPageAssetManager extends ReactAssetManager
{

    const JS_HANDLE_WP_PLUGINS_PAGE = 'eventespresso-wp-plugins-page';

    const CSS_HANDLE_WP_PLUGINS_PAGE = 'eventespresso-wp-plugins-page';


    /**
     * @inheritDoc
     */
    public function addAssets()
    {
        parent::addAssets();
        $this->registerJavascript();
        $this->registerStyleSheets();
    }


    /**
     * Register javascript assets
     *
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     * @throws DomainException
     */
    private function registerJavascript()
    {
        $this->addJs(
            WordpressPluginsPageAssetManager::JS_HANDLE_WP_PLUGINS_PAGE,
            [
                ReactAssetManager::JS_HANDLE_REACT,
                ReactAssetManager::JS_HANDLE_REACT_DOM,
                CoreAssetManager::JS_HANDLE_JS_CORE,
                'wp-components',
                'wp-i18n',
                'wp-url'
            ]
        )
        ->setRequiresTranslation()
        ->enqueueAsset();
    }


    /**
     * Register CSS assets.
     *
     * @throws DuplicateCollectionIdentifierException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DomainException
     */
    private function registerStyleSheets()
    {
        $this->addCss(
            WordpressPluginsPageAssetManager::CSS_HANDLE_WP_PLUGINS_PAGE,
            ['wp-components']
        )
        ->enqueueAsset();
    }
}
