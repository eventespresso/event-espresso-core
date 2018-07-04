<?php

namespace EventEspresso\core\domain\values\assets;

use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * Class Asset
 * Value Object for providing details about a registrable asset
 *
 * @package EventEspresso\core\domain\values
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
abstract class Asset
{

    /**
     * indicates the file extension for a build distribution CSS file
     */
    const FILE_EXTENSION_DISTRIBUTION_CSS = '.dist.css';

    /**
     * indicates the file extension for a build distribution JS file
     */
    const FILE_EXTENSION_DISTRIBUTION_JS = '.dist.js';

    /**
     * indicates a Cascading Style Sheet asset
     */
    const TYPE_CSS = 'css';

    /**
     * indicates a Javascript asset
     */
    const TYPE_JS = 'js';

    /**
     * indicates a Javascript manifest file
     */
    const TYPE_MANIFEST = 'manifest';

    /**
     * @var DomainInterface $domain
     */
    protected $domain;

    /**
     * @var string $type
     */
    private $type;

    /**
     * @var string $handle
     */
    private $handle;

    /**
     * @var bool $registered
     */
    private $registered = false;


    /**
     * Asset constructor.
     *
     * @param                 $type
     * @param string          $handle
     * @param DomainInterface $domain
     * @throws InvalidDataTypeException
     */
    public function __construct($type, $handle, DomainInterface $domain)
    {
        $this->domain = $domain;
        $this->setType($type);
        $this->setHandle($handle);
    }


    /**
     * @return array
     */
    public function validAssetTypes()
    {
        return array(
            Asset::TYPE_CSS,
            Asset::TYPE_JS,
            Asset::TYPE_MANIFEST,
        );
    }


    /**
     * @param string $type
     * @throws InvalidDataTypeException
     */
    private function setType($type)
    {
        if (! in_array($type, $this->validAssetTypes(), true)) {
            throw new InvalidDataTypeException(
                'Asset::$type',
                $type,
                'one of the TYPE_* class constants on \EventEspresso\core\domain\values\Asset is required'
            );
        }
        $this->type = $type;
    }


    /**
     * @param string $handle
     * @throws InvalidDataTypeException
     */
    private function setHandle($handle)
    {
        if (! is_string($handle)) {
            throw new InvalidDataTypeException(
                '$handle',
                $handle,
                'string'
            );
        }
        $this->handle = $handle;
    }


    /**
     * @return string
     */
    public function assetNamespace()
    {
        return $this->domain->assetNamespace();
    }


    /**
     * @return string
     */
    public function type()
    {
        return $this->type;
    }


    /**
     * @return string
     */
    public function handle()
    {
        return $this->handle;
    }

    /**
     * @return bool
     */
    public function isRegistered()
    {
        return $this->registered;
    }

    /**
     * @param bool $registered
     */
    public function setRegistered($registered = true)
    {
        $this->registered = filter_var($registered, FILTER_VALIDATE_BOOLEAN);
    }
}
