<?php

namespace EventEspresso\core\services\assets;

use DomainException;
use EE_Error;
use EventEspresso\core\domain\values\assets\Asset;
use EventEspresso\core\domain\values\assets\JavascriptAsset;
use EventEspresso\core\domain\values\assets\StylesheetAsset;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use Exception;
use InvalidArgumentException;

/**
 * Used for registering assets used in EE.
 *
 * @package    EventEspresso
 * @subpackage services\assets
 * @author     Darren Ethier
 * @since      4.9.24.rc.004
 */
class Registry
{

    const FILE_NAME_BUILD_MANIFEST = 'build-manifest.json';

    /**
     * @var AssetCollection[] $assets
     */
    protected $assets = [];

    /**
     * @var AssetManifestInterface
     */
    private $asset_manifest;

    /**
     * @var I18nRegistry
     */
    private $i18n_registry;

    /**
     * This holds the jsdata data object that will be exposed on pages that enqueue the `eejs-core` script.
     *
     * @var array
     */
    protected $jsdata = array();

    /**
     * This keeps track of all scripts with registered data.  It is used to prevent duplicate data objects setup in the
     * page source.
     *
     * @var array
     */
    private $script_handles_with_data = array();


    /**
     * Registry constructor.
     * Hooking into WP actions for script registry.
     *
     * @param AssetCollection        $assets
     * @param AssetManifestInterface $asset_manifest
     * @param I18nRegistry           $i18n_registry
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function __construct(AssetCollection $assets, AssetManifestInterface $asset_manifest, I18nRegistry $i18n_registry)
    {
        $this->addAssetCollection($assets);
        $this->asset_manifest = $asset_manifest;
        $this->asset_manifest->initialize();
        $this->i18n_registry = $i18n_registry;
        add_action('wp_enqueue_scripts', array($this, 'registerScriptsAndStyles'), 4);
        add_action('admin_enqueue_scripts', array($this, 'registerScriptsAndStyles'), 4);
        add_action('wp_enqueue_scripts', array($this, 'enqueueData'), 5);
        add_action('admin_enqueue_scripts', array($this, 'enqueueData'), 5);
        add_action('wp_print_footer_scripts', array($this, 'enqueueData'), 1);
        add_action('admin_print_footer_scripts', array($this, 'enqueueData'), 1);
    }


    /**
     * @param AssetCollection $asset_collection
     */
    public function addAssetCollection(AssetCollection $asset_collection)
    {
        $id = $asset_collection->collectionIdentifier();
        if (! array_key_exists($id, $this->assets)) {
            $this->assets[ $id ] = $asset_collection;
        }
    }




    /**
     * For classes that have Registry as a dependency, this provides a handy way to register script handles for i18n
     * translation handling.
     *
     * @return I18nRegistry
     */
    public function getI18nRegistry()
    {
        return $this->i18n_registry;
    }


    /**
     * Callback for the wp_enqueue_scripts actions used to register assets.
     *
     * @since 4.9.62.p
     * @throws Exception
     */
    public function registerScriptsAndStyles()
    {
        try {
            foreach ($this->assets as $asset_collection) {
                $this->registerScripts($asset_collection->getJavascriptAssets());
                $this->registerStyles($asset_collection->getStylesheetAssets());
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * Registers JS assets with WP core
     *
     * @param JavascriptAsset[] $scripts
     * @throws AssetRegistrationException
     * @throws InvalidDataTypeException
     * @throws DomainException
     * @since 4.9.62.p
     */
    public function registerScripts(array $scripts)
    {
        foreach ($scripts as $script) {
            // skip to next script if this has already been done
            if ($script->isRegistered()) {
                continue;
            }
            do_action(
                'AHEE__EventEspresso_core_services_assets_Registry__registerScripts__before_script',
                $script
            );
            $registered = wp_register_script(
                $script->handle(),
                $script->source(),
                $script->dependencies(),
                $script->version(),
                $script->loadInFooter()
            );
            if (! $registered && $this->debug()) {
                throw new AssetRegistrationException($script->handle());
            }
            $script->setRegistered($registered);
            if ($script->requiresTranslation()) {
                $this->registerTranslation($script->handle());
            }
            if ($script->enqueueImmediately()) {
                wp_enqueue_script($script->handle());
            }
            do_action(
                'AHEE__EventEspresso_core_services_assets_Registry__registerScripts__after_script',
                $script
            );
        }
    }


    /**
     * Registers CSS assets with WP core
     *
     * @param StylesheetAsset[] $styles
     * @throws InvalidDataTypeException
     * @throws DomainException
     * @since 4.9.62.p
     */
    public function registerStyles(array $styles)
    {
        foreach ($styles as $style) {
            // skip to next style if this has already been done
            if ($style->isRegistered()) {
                continue;
            }
            do_action(
                'AHEE__EventEspresso_core_services_assets_Registry__registerStyles__before_style',
                $style
            );
            wp_register_style(
                $style->handle(),
                $style->source(),
                $style->dependencies(),
                $style->version(),
                $style->media()
            );
            $style->setRegistered();
            if ($style->enqueueImmediately()) {
                wp_enqueue_style($style->handle());
            }
            do_action(
                'AHEE__EventEspresso_core_services_assets_Registry__registerStyles__after_style',
                $style
            );
        }
    }


    /**
     * Call back for the script print in frontend and backend.
     * Used to call wp_localize_scripts so that data can be added throughout the runtime until this later hook point.
     *
     * @throws Exception
     * @since 4.9.31.rc.015
     */
    public function enqueueData()
    {
        try {
            $this->removeAlreadyRegisteredDataForScriptHandles();
            wp_add_inline_script(
                'eejs-core',
                'var eejsdata=' . wp_json_encode(['data' => $this->jsdata]),
                'before'
            );
            foreach ($this->assets as $asset_collection) {
                $scripts = $asset_collection->getJavascriptAssetsWithData();
                foreach ($scripts as $script) {
                    $this->addRegisteredScriptHandlesWithData($script->handle());
                    if ($script->hasInlineDataCallback()) {
                        $localize = $script->inlineDataCallback();
                        $localize();
                    }
                }
            }
        } catch (Exception $exception) {
            EE_Error::add_error($exception->getMessage(), __FILE__, __FUNCTION__, __LINE__);
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * Used to add data to eejs.data object.
     * Note:  Overriding existing data is not allowed.
     * Data will be accessible as a javascript object when you list `eejs-core` as a dependency for your javascript.
     * If the data you add is something like this:
     *  $this->addData( 'my_plugin_data', array( 'foo' => 'gar' ) );
     * It will be exposed in the page source as:
     *  eejs.data.my_plugin_data.foo == gar
     *
     * @param string       $key   Key used to access your data
     * @param string|array $value Value to attach to key
     * @throws InvalidArgumentException
     */
    public function addData($key, $value)
    {
        if ($this->verifyDataNotExisting($key)) {
            $this->jsdata[ $key ] = $value;
        }
    }


    /**
     * Similar to addData except this allows for users to push values to an existing key where the values on key are
     * elements in an array.
     *
     * When you use this method, the value you include will be merged with the array on $key.
     * So if the $key was 'test' and you added a value of ['my_data'] then it would be represented in the javascript
     * object like this, eejs.data.test = [ my_data,
     * ]
     * If there has already been a scalar value attached to the data object given key (via addData for instance), then
     * this will throw an exception.
     *
     * Caution: Only add data using this method if you are okay with the potential for additional data added on the same
     * key potentially overriding the existing data on merge (specifically with associative arrays).
     *
     * @param string       $key   Key to attach data to.
     * @param string|array $value Value being registered.
     * @throws InvalidArgumentException
     */
    public function pushData($key, $value)
    {
        if (isset($this->jsdata[ $key ])
            && ! is_array($this->jsdata[ $key ])
        ) {
            if (! $this->debug()) {
                return;
            }
            throw new InvalidArgumentException(
                sprintf(
                    __(
                        'The value for %1$s is already set and it is not an array. The %2$s method can only be used to
                         push values to this data element when it is an array.',
                        'event_espresso'
                    ),
                    $key,
                    __METHOD__
                )
            );
        }
        if ( ! isset( $this->jsdata[ $key ] ) ) {
            $this->jsdata[ $key ] = is_array($value) ? $value : [$value];
        } else {
            $this->jsdata[ $key ] = array_merge( $this->jsdata[$key], (array) $value);
        }
    }


    /**
     * Used to set content used by javascript for a template.
     * Note: Overrides of existing registered templates are not allowed.
     *
     * @param string $template_reference
     * @param string $template_content
     * @throws InvalidArgumentException
     */
    public function addTemplate($template_reference, $template_content)
    {
        if (! isset($this->jsdata['templates'])) {
            $this->jsdata['templates'] = array();
        }
        //no overrides allowed.
        if (isset($this->jsdata['templates'][ $template_reference ])) {
            if (! $this->debug()) {
                return;
            }
            throw new InvalidArgumentException(
                sprintf(
                    __(
                        'The %1$s key already exists for the templates array in the js data array.  No overrides are allowed.',
                        'event_espresso'
                    ),
                    $template_reference
                )
            );
        }
        $this->jsdata['templates'][ $template_reference ] = $template_content;
    }


    /**
     * Retrieve the template content already registered for the given reference.
     *
     * @param string $template_reference
     * @return string
     */
    public function getTemplate($template_reference)
    {
        return isset($this->jsdata['templates'][ $template_reference ])
            ? $this->jsdata['templates'][ $template_reference ]
            : '';
    }


    /**
     * Retrieve registered data.
     *
     * @param string $key Name of key to attach data to.
     * @return mixed                If there is no for the given key, then false is returned.
     */
    public function getData($key)
    {
        return isset($this->jsdata[ $key ])
            ? $this->jsdata[ $key ]
            : false;
    }


    /**
     * Verifies whether the given data exists already on the jsdata array.
     * Overriding data is not allowed.
     *
     * @param string $key Index for data.
     * @return bool        If valid then return true.
     * @throws InvalidArgumentException if data already exists.
     */
    protected function verifyDataNotExisting($key)
    {
        if (isset($this->jsdata[ $key ])) {
            if (! $this->debug()) {
                return false;
            }
            if (is_array($this->jsdata[ $key ])) {
                throw new InvalidArgumentException(
                    sprintf(
                        __(
                            'The value for %1$s already exists in the Registry::eejs object.
                            Overrides are not allowed. Since the value of this data is an array, you may want to use the
                            %2$s method to push your value to the array.',
                            'event_espresso'
                        ),
                        $key,
                        'pushData()'
                    )
                );
            }
            throw new InvalidArgumentException(
                sprintf(
                    __(
                        'The value for %1$s already exists in the Registry::eejs object. Overrides are not
                        allowed.  Consider attaching your value to a different key',
                        'event_espresso'
                    ),
                    $key
                )
            );
        }
        return true;
    }


    /**
     * Get the actual asset path for asset manifests.
     * If there is no asset path found for the given $chunk_name, then the $chunk_name is returned.
     *
     * @param string $namespace  The namespace associated with the manifest file hosting the map of chunk_name to actual
     *                           asset file location.
     * @param string $chunk_name
     * @param string $asset_type
     * @return string
     * @since 4.9.59.p
     */
    public function getAssetUrl($namespace, $chunk_name, $asset_type)
    {
        return apply_filters(
            'FHEE__EventEspresso_core_services_assets_Registry__getAssetUrl',
            $this->asset_manifest->getAssetUrl($chunk_name, $asset_type),
            $namespace,
            $chunk_name,
            $asset_type
        );
    }



    /**
     * Return the url to a js file for the given namespace and chunk name.
     *
     * @param string $namespace
     * @param string $chunk_name
     * @return string
     */
    public function getJsUrl($namespace, $chunk_name)
    {
        return $this->getAssetUrl($namespace, $chunk_name, Asset::TYPE_JS);
    }


    /**
     * Return the url to a css file for the given namespace and chunk name.
     *
     * @param string $namespace
     * @param string $chunk_name
     * @return string
     */
    public function getCssUrl($namespace, $chunk_name)
    {
        return $this->getAssetUrl($namespace, $chunk_name, Asset::TYPE_CSS);
    }


    /**
     * This is used to set registered script handles that have data.
     *
     * @param string $script_handle
     */
    private function addRegisteredScriptHandlesWithData($script_handle)
    {
        $this->script_handles_with_data[ $script_handle ] = $script_handle;
    }


    /**i
     * Checks WP_Scripts for all of each script handle registered internally as having data and unsets from the
     * Dependency stored in WP_Scripts if its set.
     */
    private function removeAlreadyRegisteredDataForScriptHandles()
    {
        if (empty($this->script_handles_with_data)) {
            return;
        }
        foreach ($this->script_handles_with_data as $script_handle) {
            $this->removeAlreadyRegisteredDataForScriptHandle($script_handle);
        }
    }


    /**
     * Removes any data dependency registered in WP_Scripts if its set.
     *
     * @param string $script_handle
     */
    private function removeAlreadyRegisteredDataForScriptHandle($script_handle)
    {
        if (isset($this->script_handles_with_data[ $script_handle ])) {
            global $wp_scripts;
            $unset_handle = false;
            if ($wp_scripts->get_data($script_handle, 'data')) {
                unset($wp_scripts->registered[ $script_handle ]->extra['data']);
                $unset_handle = true;
            }
            //deal with inline_scripts
            if ($wp_scripts->get_data($script_handle, 'before')) {
                unset($wp_scripts->registered[ $script_handle ]->extra['before']);
                $unset_handle = true;
            }
            if ($wp_scripts->get_data($script_handle, 'after')) {
                unset($wp_scripts->registered[ $script_handle ]->extra['after']);
            }
            if ($unset_handle) {
                unset($this->script_handles_with_data[ $script_handle ]);
            }
        }
    }


    /**
     * register translations for a registered script
     *
     * @param string $handle
     */
    public function registerTranslation($handle)
    {
        $this->i18n_registry->registerScriptI18n($handle);
    }


    /**
     * @since 4.9.63.p
     * @return bool
     */
    private function debug()
    {
        return apply_filters(
            'FHEE__EventEspresso_core_services_assets_Registry__debug',
            defined('EE_DEBUG') && EE_DEBUG
        );
    }


    /**************** deprecated ****************/


    /**
     * @param string $namespace
     * @param string $chunk_name
     * @return array
     * @deprecated $VID:$
     */
    public function getCssAssetDetails($namespace, $chunk_name)
    {
        return [
            AssetManifest::KEY_DEPENDENCIES => $this->asset_manifest->getAssetDependencies($chunk_name, Asset::TYPE_CSS),
            AssetManifest::KEY_VERSION => $this->asset_manifest->getAssetVersion($chunk_name, Asset::TYPE_CSS),
        ];
    }


    /**
     * @param string $namespace
     * @param string $chunk_name
     * @return array
     * @deprecated $VID:$
     */
    public function getCssDependencies($namespace, $chunk_name)
    {
        return $this->asset_manifest->getAssetDependencies($chunk_name, AssetManifest::ASSET_EXT_CSS);
    }


    /**
     * @param string $namespace
     * @param string $chunk_name
     * @return array
     * @deprecated $VID:$
     */
    public function getJsAssetDetails($namespace, $chunk_name)
    {
        return [
            AssetManifest::KEY_DEPENDENCIES => $this->asset_manifest->getAssetDependencies($chunk_name, Asset::TYPE_JS),
            AssetManifest::KEY_VERSION => $this->asset_manifest->getAssetVersion($chunk_name, Asset::TYPE_JS),
        ];
    }


    /**
     * @param string $namespace
     * @param string $chunk_name
     * @return array
     * @deprecated $VID:$
     */
    public function getJsDependencies($namespace, $chunk_name)
    {
        return $this->asset_manifest->getAssetDependencies($chunk_name);
    }


    /**
     * @deprecated $VID:$
     */
    public function registerManifestFiles()
    {
    }


    /**
     * @param string $namespace
     * @param string $url_base
     * @param string $manifest_file
     * @param string $manifest_file_path
     * @deprecated $VID:$
     */
    public function registerManifestFile($namespace, $url_base, $manifest_file, $manifest_file_path = '')
    {
    }
}
