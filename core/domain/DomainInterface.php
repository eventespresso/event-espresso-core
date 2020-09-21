<?php
namespace EventEspresso\core\domain;

use EventEspresso\core\domain\values\Version;
use EventEspresso\core\interfaces\InterminableInterface;

/**
 * DomainInterface
 *
 * @package EventEspresso\core\domain
 * @author  Darren Ethier, Brent Christensen
 * @since   4.9.50
 */
interface DomainInterface extends InterminableInterface
{

    /**
     * @param string $asset_namespace
     * @return void
     * @since $VID:$
     */
    public function initialize($asset_namespace = 'eventespresso');


    /**
     * @param string $asset_namespace
     * @return void
     */
    public function setAssetNamespace($asset_namespace = 'eventespresso');


    /**
     * @return string
     */
    public function pluginFile();


    /**
     * @return string
     */
    public function pluginBasename();


    /**
     * @param string $additional_path
     * @return string
     */
    public function pluginPath($additional_path = '');


    /**
     * @return string
     */
    public function pluginUrl();


    /**
     * @return string
     */
    public function version();


    /**
     * @return Version
     */
    public function versionValueObject();


    /**
     * @return string
     */
    public function distributionAssetsFolder();


    /**
     * @param string $additional_path
     * @return string
     */
    public function distributionAssetsPath($additional_path = '');


    /**
     * @param string $additional_path
     * @return string
     */
    public function distributionAssetsUrl($additional_path = '');


    /**
     * @return string
     */
    public function assetNamespace();
}
