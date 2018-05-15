<?php
namespace EventEspresso\core\domain;

use DomainException;
use EventEspresso\core\interfaces\InterminableInterface;

/**
 * DomainInterface
 *
 * @package EventEspresso\core\domain
 * @author  Darren Ethier
 * @since   4.9.50
 */
interface DomainInterface extends InterminableInterface
{

    /**
     * @return string
     * @throws DomainException
     */
    public function pluginFile();


    /**
     * @return string
     * @throws DomainException
     */
    public function pluginBasename();


    /**
     * @return string
     */
    public function pluginPath();


    /**
     * @return string
     * @throws DomainException
     */
    public function pluginUrl();


    /**
     * @return string
     * @throws DomainException
     */
    public function version();


    /**
     * @return string
     */
    public function distributionAssetsPath();


    /**
     * @return string
     */
    public function distributionAssetsUrl();


    /**
     * @return string
     */
    public function assetNamespace();
}
