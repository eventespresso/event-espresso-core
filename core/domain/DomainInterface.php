<?php
namespace EventEspresso\core\domain;

use DomainException;

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * DomainInterface
 *
 * @package EventEspresso\core\domain
 * @author  Darren Ethier
 * @since   4.9.50
 */
interface DomainInterface
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
}
