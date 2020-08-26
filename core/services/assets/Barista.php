<?php

namespace EventEspresso\core\services\assets;

use EventEspresso\core\domain\DomainInterface;
use WP_Scripts;
use WP_Styles;

/**
 * @package EventEspresso\core\services\assets
 * @author  Manzoor Wani, Brent Christensen
 * @since   $VID:$
 */
class Barista
{

    const DEPENDENCY_LIST_REGISTERED = 'registered';


    /**
     * @var DomainInterface
     */
    protected $domain;

    /**
     * @var AssetManifest
     */
    private $asset_manifest;


    /**
     * Barista constructor.
     *
     * @param AssetManifest   $asset_manifest
     * @param DomainInterface $domain
     */
    public function __construct(AssetManifest $asset_manifest, DomainInterface $domain)
    {
        $this->asset_manifest = $asset_manifest;
        $this->domain         = $domain;
    }


    /**
     * @return void
     */
    public function initialize()
    {
        add_action('wp_default_scripts', [$this, 'registerScripts']);
        add_action('wp_default_styles', [$this, 'registerPackagesStyles']);
        add_action('admin_enqueue_scripts', [$this, 'addInlineData']);
    }


    /**
     * Registers a script according to `wp_register_script`. Honors this request by
     * reassigning internal dependency properties of any script handle already
     * registered by that name. It does not deregister the original script, to
     * avoid losing inline scripts which may have been attached.
     *
     * @param WP_Scripts       $scripts   WP_Scripts instance.
     * @param string           $handle    Name of the script. Should be unique.
     * @param string           $src       Full URL of the script, or path of the script relative to the WordPress root
     *                                    directory.
     * @param array            $deps      Optional. An array of registered script handles this script depends on.
     *                                    Default empty array.
     * @param string|bool|null $ver       Optional. String specifying script version number, if it has one, which is
     *                                    added to the URL as a query string for cache busting purposes. If version is
     *                                    set to false, a version number is automatically added equal to current
     *                                    installed WordPress version. If set to null, no version is added.
     * @param bool             $in_footer Optional. Whether to enqueue the script before </body> instead of in the
     *                                    <head>. Default 'false'.
     */
    protected function overrideScript($scripts, $handle, $src, $deps = [], $ver = false, $in_footer = false)
    {
        $script = $scripts->query($handle, Barista::DEPENDENCY_LIST_REGISTERED);
        if ($script) {
            /*
             * In many ways, this is a reimplementation of `wp_register_script` but
             * bypassing consideration of whether a script by the given handle had
             * already been registered.
             */

            // See: `_WP_Dependency::__construct` .
            $script->src  = $src;
            $script->deps = $deps;
            $script->ver  = $ver;
            $script->args = $in_footer;
        } else {
            $scripts->add($handle, $src, $deps, $ver, $in_footer);
            $script = $scripts->query($handle, Barista::DEPENDENCY_LIST_REGISTERED);
        }

        if ($script) {
            /*
            * The script's `group` designation is an indication of whether it is
            * to be printed in the header or footer. The behavior here defers to
            * the arguments as passed. Specifically, group data is not assigned
            * for a script unless it is designated to be printed in the footer.
            */
            // See: `wp_register_script` .
            unset($script->extra['group']);
            if ($in_footer) {
                $script->add_data('group', 1);
            }
        }
    }


    /**
     * Registers a style according to `wp_register_style`. Honors this request by
     * de-registering any style by the same handler before registration.
     *
     * @param WP_Styles        $styles WP_Styles instance.
     * @param string           $handle Name of the stylesheet. Should be unique.
     * @param string           $src    Full URL of the stylesheet, or path of the stylesheet relative to the WordPress
     *                                 root directory.
     * @param array            $deps   Optional. An array of registered stylesheet handles this stylesheet depends on.
     *                                 Default empty array.
     * @param string|bool|null $ver    Optional. String specifying stylesheet version number, if it has one, which is
     *                                 added to the URL as a query string for cache busting purposes. If version is set
     *                                 to false, a version number is automatically added equal to current installed
     *                                 WordPress version. If set to null, no version is added.
     * @param string           $media  Optional. The media for which this stylesheet has been defined.
     *                                 Default 'all'. Accepts media types like 'all', 'print' and 'screen', or media
     *                                 queries like
     *                                 '(orientation: portrait)' and '(max-width: 640px)'.
     */
    protected function overrideStyle($styles, $handle, $src, $deps = [], $ver = false, $media = 'all')
    {
        $style = $styles->query($handle, Barista::DEPENDENCY_LIST_REGISTERED);
        if ($style) {
            $styles->remove($handle);
        }
        $styles->add($handle, $src, $deps, $ver, $media);
    }


    /**
     * Registers all the WordPress packages scripts that are in the standardized
     * `build/` location.
     *
     * @param WP_Scripts $scripts WP_Scripts instance.
     */
    public function registerScripts($scripts)
    {
        $entry_points = $this->asset_manifest->getEntryPoints();
        foreach ($entry_points as $entry_point) {
            if ($this->asset_manifest->hasAsset($entry_point)) {
                $this->overrideScript(
                    $scripts,
                    $this->asset_manifest->getAssetHandle($entry_point),
                    $this->asset_manifest->getAssetUrl($entry_point),
                    $this->asset_manifest->getAssetDependencies($entry_point),
                    $this->asset_manifest->getAssetVersion($entry_point),
                    true
                );
            }
        }
    }


    /**
     * Registers all the packages and domain styles that are in the build folder.
     *
     * @param WP_Styles $styles WP_Styles instance.
     */
    public function registerPackagesStyles($styles)
    {
        $entry_points = $this->asset_manifest->getEntryPoints();
        foreach ($entry_points as $entry_point) {
            if ($this->asset_manifest->hasAsset($entry_point, AssetManifest::ASSET_EXT_CSS)) {
                $this->overrideStyle(
                    $styles,
                    $this->asset_manifest->getAssetHandle($entry_point),
                    $this->asset_manifest->getAssetUrl($entry_point, AssetManifest::ASSET_EXT_CSS),
                    $this->asset_manifest->getAssetDependencies($entry_point, AssetManifest::ASSET_EXT_CSS),
                    $this->asset_manifest->getAssetVersion($entry_point, AssetManifest::ASSET_EXT_CSS)
                );
            }
        }
    }


    /**
     * @return void
     */
    public function addInlineData()
    {
        wp_add_inline_script(
            $this->asset_manifest->getAssetHandle('hooks'),
            sprintf('var baristaAssetsUrl = "%s";', $this->domain->distributionAssetsUrl()),
            'before'
        );
    }
}
