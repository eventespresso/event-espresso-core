<?php

namespace EventEspresso\core\services\editor;

use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\assets\AssetRegisterInterface;
use EventEspresso\core\services\assets\Registry;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class BlockAssetRegister
 * Abstract parent for classes that handle asset registration for one or more editor blocks that share the same assets
 *
 * @package EventEspresso\core\services\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class BlockAssetRegister implements AssetRegisterInterface
{

    /**
     * @var DomainInterface $domain
     */
    private $domain;

    /**
     * @var Registry $registry
     */
    private $registry;

    /**
     * @var string $script_handle
     */
    private $script_handle;

    /**
     * @var array $script_dependencies
     */
    private $script_dependencies;

    /**
     * @var string $style_handle
     */
    private $style_handle;

    /**
     * @var array $style_dependencies
     */
    private $style_dependencies;


    /**
     * BlockAssetRegister constructor.
     *
     * @param string          $script_handle
     * @param array           $script_dependencies
     * @param string          $style_handle
     * @param array           $style_dependencies
     * @param DomainInterface $domain
     * @param Registry        $registry
     * @throws InvalidDataTypeException
     */
    public function __construct(
        $script_handle,
        array $script_dependencies,
        $style_handle,
        array $style_dependencies,
        DomainInterface $domain,
        Registry $registry
    ) {
        $this->setScriptHandle($script_handle);
        $this->setScriptDependencies($script_dependencies);
        $this->setStyleHandle($style_handle);
        $this->setStyleDependencies($style_dependencies);
        $this->domain              = $domain;
        $this->registry            = $registry;
    }


    /**
     * @return string
     */
    public function scriptHandle()
    {
        return $this->script_handle;
    }


    /**
     * @param string $script_handle
     * @throws InvalidDataTypeException
     */
    private function setScriptHandle($script_handle)
    {
        if (! is_string($script_handle)) {
            throw new InvalidDataTypeException('$script_handle', $script_handle, 'string');
        }
        $this->script_handle = $script_handle;
    }


    /**
     * @return string
     */
    public function styleHandle()
    {
        return $this->style_handle;
    }


    /**
     * @param string $style_handle
     * @throws InvalidDataTypeException
     */
    private function setStyleHandle($style_handle)
    {
        if (! is_string($style_handle)) {
            throw new InvalidDataTypeException('$style_handle', $style_handle, 'string');
        }
        $this->style_handle = $style_handle;
    }


    /**
     * @return array
     */
    private function scriptDependencies()
    {
        return $this->script_dependencies;
    }


    /**
     * @param array $script_dependencies
     */
    private function setScriptDependencies(array $script_dependencies)
    {
        $this->script_dependencies = $script_dependencies + array(
                'eejs-core',
                'wp-blocks',    // Provides useful functions and components for extending the editor
                'wp-i18n',      // Provides localization functions
                'wp-element',   // Provides React.Component
                'wp-components' // Provides many prebuilt components and controls
            );
    }


    /**
     * @return array
     */
    private function styleDependencies()
    {
        return $this->style_dependencies;
    }


    /**
     * @param array $style_dependencies
     */
    private function setStyleDependencies(array $style_dependencies)
    {
        $this->style_dependencies = $style_dependencies;
    }


    /**
     * @return void
     * @throws \EventEspresso\core\exceptions\InvalidFilePathException
     * @throws \InvalidArgumentException
     */
    public function registerManifestFile()
    {
        if($this->domain->assetNamespace() !== Registry::ASSET_NAMESPACE_CORE) {
            $this->registry->registerManifestFile(
                $this->domain->assetNamespace(),
                $this->domain->distributionAssetsUrl(),
                $this->domain->distributionAssetsPath() . Registry::FILE_NAME_BUILD_MANIFEST
            );
        }
    }


    /**
     * @return  void
     */
    public function registerScripts()
    {
        wp_register_script(
            $this->scriptHandle(),
            $this->registry->getJsUrl(
                $this->domain->assetNamespace(),
                $this->scriptHandle()
            ),
            $this->scriptDependencies(),
            null,
            true
        );
    }


    /**
     * @return void
     */
    public function registerStyles()
    {
        wp_register_style(
            $this->styleHandle(),
            $this->registry->getCssUrl(
                $this->domain->assetNamespace(),
                $this->styleHandle()
            ),
            $this->styleDependencies()
        );
    }
}