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
     * @since 5.0.0.p
     */
    public function initialize(string $asset_namespace = 'eventespresso');


    /**
     * @param string $asset_namespace
     * @return void
     */
    public function setAssetNamespace(string $asset_namespace = 'eventespresso');


    /**
     * @return string
     */
    public function pluginFile(): string;


    /**
     * @return string
     */
    public function pluginBasename(): string;


    /**
     * @param string $additional_path
     * @return string
     */
    public function pluginPath(string $additional_path = ''): string;


    /**
     * @return string
     */
    public function pluginUrl(): string;


    /**
     * @return string
     */
    public function version(): string;


    /**
     * @return Version
     */
    public function versionValueObject(): Version;


    /**
     * @return string
     */
    public function distributionAssetsFolder(): string;


    /**
     * @param string $additional_path
     * @return string
     */
    public function distributionAssetsPath(string $additional_path = ''): string;


    /**
     * @param string $additional_path
     * @return string
     */
    public function distributionAssetsUrl(string $additional_path = ''): string;


    /**
     * @return string
     */
    public function assetNamespace(): string;
}
