<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\domain\entities\editor\BlockInterface;
use EventEspresso\core\domain\services\assets\CoreAssetManager;
use EventEspresso\core\domain\values\assets\BrowserAsset;
use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\domain\values\assets\StylesheetAsset;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\collections\DuplicateCollectionIdentifierException;

/**
 * Class BlockAssetRegister
 * Abstract parent for classes that handle asset registration for one or more editor blocks that share the same assets
 *
 * @package EventEspresso\core\services\editor
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
abstract class BlockAssetManager extends AssetManager implements BlockAssetManagerInterface
{

    /**
     * @var string $editor_script_handle
     */
    private $editor_script_handle;

    /**
     * @var string $editor_style_handle
     */
    private $editor_style_handle;

    /**
     * @var string $script_handle
     */
    private $script_handle;

    /**
     * @var string $style_handle
     */
    private $style_handle;


    /**
     * @return string
     */
    public function getEditorScriptHandle()
    {
        return $this->editor_script_handle;
    }


    /**
     * @param string $editor_script_handle
     */
    public function setEditorScriptHandle($editor_script_handle)
    {
        if(strpos($editor_script_handle, BlockInterface::NAME_SPACE . '-') !== 0) {
            $editor_script_handle = BlockInterface::NAME_SPACE . '-' . $editor_script_handle;
        }
        $this->editor_script_handle = $editor_script_handle;
    }


    /**
     * @return string
     */
    public function getEditorStyleHandle()
    {
        return $this->editor_style_handle;
    }


    /**
     * @param string $editor_style_handle
     */
    public function setEditorStyleHandle($editor_style_handle)
    {
        if (strpos($editor_style_handle, BlockInterface::NAME_SPACE . '-') !== 0) {
            $editor_style_handle = BlockInterface::NAME_SPACE . '-' . $editor_style_handle;
        }
        $this->editor_style_handle = $editor_style_handle;
    }


    /**
     * @return string
     */
    public function getScriptHandle()
    {
        return $this->script_handle;
    }


    /**
     * @param string $script_handle
     */
    public function setScriptHandle($script_handle)
    {
        if (strpos($script_handle, BlockInterface::NAME_SPACE . '-') !== 0) {
            $script_handle = BlockInterface::NAME_SPACE . '-' . $script_handle;
        }
        $this->script_handle = $script_handle;
    }


    /**
     * @return string
     */
    public function getStyleHandle()
    {
        return $this->style_handle;
    }


    /**
     * @param string $style_handle
     */
    public function setStyleHandle($style_handle)
    {
        if (strpos($style_handle, BlockInterface::NAME_SPACE . '-') !== 0) {
            $style_handle = BlockInterface::NAME_SPACE . '-' . $style_handle;
        }
        $this->style_handle = $style_handle;
    }

    /**
     * @since 4.9.71.p
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    public function addAssets()
    {
        $this->addEditorScript($this->getEditorScriptHandle());
        $this->addEditorStyle($this->getEditorStyleHandle());
        $this->addScript($this->getScriptHandle());
        $this->addStyle($this->getStyleHandle());
    }


    /**
     * @param       $handle
     * @param array $dependencies
     * @since 4.9.71.p
     * @return JavascriptAsset
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    public function addEditorScript($handle, array $dependencies = array())
    {
        if($this->assets->hasJavascriptAsset($handle)){
            return $this->assets->getJavascriptAsset($handle);
        }
        return parent::addJavascript(
            $handle,
            $this->registry->getJsUrl(
                $this->domain->assetNamespace(),
                $handle
            ),
            $this->addDefaultBlockScriptDependencies($dependencies)
        )
        ->setRequiresTranslation();
    }


    /**
     * @param        $handle
     * @param array  $dependencies
     * @since 4.9.71.p
     * @return StylesheetAsset
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    public function addEditorStyle($handle, array $dependencies = array())
    {
        if ($this->assets->hasStylesheetAsset($handle)) {
            return $this->assets->getStylesheetAsset($handle);
        }
        return parent::addStylesheet(
            $handle,
            $this->registry->getCssUrl(
                $this->domain->assetNamespace(),
                $handle
            ),
            $this->addDefaultBlockStyleDependencies($dependencies)
        );
    }


    /**
     * @param       $handle
     * @param array $dependencies
     * @since 4.9.71.p
     * @return JavascriptAsset
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    public function addScript($handle, array $dependencies = array())
    {
        if ($this->assets->hasJavascriptAsset($handle)) {
            return $this->assets->getJavascriptAsset($handle);
        }
        return parent::addJavascript(
            $handle,
            $this->registry->getJsUrl(
                $this->domain->assetNamespace(),
                $handle
            ),
            $dependencies + array( CoreAssetManager::JS_HANDLE_COMPONENTS )
        )
        ->setRequiresTranslation();
    }


    /**
     * @param        $handle
     * @param array  $dependencies
     * @since 4.9.71.p
     * @return StylesheetAsset
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws DuplicateCollectionIdentifierException
     */
    public function addStyle($handle, array $dependencies = array())
    {
        if ($this->assets->hasStylesheetAsset($handle)) {
            return $this->assets->getStylesheetAsset($handle);
        }
        return parent::addStylesheet(
            $handle,
            $this->registry->getCssUrl(
                $this->domain->assetNamespace(),
                $handle
            ),
            $dependencies + array( CoreAssetManager::CSS_HANDLE_COMPONENTS )
        );
    }


    /**
     * @param array $dependencies
     * @return array
     */
    protected function addDefaultBlockScriptDependencies(array $dependencies)
    {
        $dependencies += array(
                'wp-blocks',    // Provides useful functions and components for extending the editor
                'wp-i18n',      // Provides localization functions
                'wp-element',   // Provides React.Component
                'wp-components', // Provides many prebuilt components and controls
                CoreAssetManager::JS_HANDLE_EDITOR_HOCS,
                $this->getScriptHandle(),
            );
        return $dependencies;
    }


    /**
     * @param array $dependencies
     * @return array
     */
    protected function addDefaultBlockStyleDependencies(array $dependencies)
    {
        $dependencies += array(
            $this->getStyleHandle()
        );
        return $dependencies;
    }


    /**
     * @return JavascriptAsset|null
     */
    public function getEditorScript()
    {
        return $this->assets->getJavascriptAsset($this->editor_script_handle);
    }


    /**
     * @return StylesheetAsset|null
     */
    public function getEditorStyle()
    {
        return $this->assets->getStylesheetAsset($this->editor_style_handle);
    }


    /**
     * @return JavascriptAsset|null
     */
    public function getScript()
    {
        return $this->assets->getJavascriptAsset($this->script_handle);
    }


    /**
     * @return StylesheetAsset|null
     */
    public function getStyle()
    {
        return $this->assets->getStylesheetAsset($this->style_handle);
    }


    /**
     * @return  void
     */
    public function enqueueAssets()
    {
        $assets = array(
            $this->getEditorScript(),
            $this->getEditorStyle(),
            $this->getScript(),
            $this->getStyle(),
        );
        foreach ($assets as $asset) {
            if ($asset instanceof BrowserAsset && $asset->isRegistered()) {
                $asset->enqueueAsset();
            }
        }
    }

}
