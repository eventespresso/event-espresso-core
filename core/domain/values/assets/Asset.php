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
     * indicates the file extension for a CSS file
     */
    const EXT_CSS = '.css';

    /**
     * indicates the file extension for a JS file
     */
    const EXT_JS = '.js';

    /**
     * indicates the file extension for a JS file
     */
    const EXT_PHP = '.php';

    /**
     * indicates the file extension for a build distribution CSS file
     */
    const FILE_EXTENSION_DISTRIBUTION_CSS = '.dist.css';

    /**
     * indicates the file extension for a build distribution JS file
     */
    const FILE_EXTENSION_DISTRIBUTION_JS = '.dist.js';

    /**
     * Indicates the file extension for a build distribution dependencies json file.
     */
    const FILE_EXTENSION_DISTRIBUTION_DEPS = '.dist.deps.php';

    /**
     * indicates a Cascading Style Sheet asset
     */
    const TYPE_CSS = 'css';

    /**
     * indicates a Javascript asset
     */
    const TYPE_JS = 'js';

    /**
     * indicates a JSON asset
     */
    const TYPE_JSON = 'json';

    /**
     * indicates a PHP asset
     */
    const TYPE_PHP = 'php';

    /**
     * indicates a Javascript manifest file
     */
    const TYPE_MANIFEST = 'manifest';


    protected DomainInterface $domain;

    private string $type;

    private string $handle;

    protected bool $registered = false;

    private bool $enqueue_immediately = false;


    /**
     * Asset constructor.
     *
     * @param string          $type
     * @param string          $handle
     * @param DomainInterface $domain
     * @throws InvalidDataTypeException
     */
    public function __construct(string $type, string $handle, DomainInterface $domain)
    {
        $this->domain = $domain;
        $this->setType($type);
        $this->setHandle($handle);
    }


    /**
     * @return array
     */
    public function validAssetTypes(): array
    {
        return [
            Asset::TYPE_CSS,
            Asset::TYPE_JS,
            Asset::TYPE_MANIFEST,
        ];
    }


    /**
     * @param string $type
     * @throws InvalidDataTypeException
     */
    private function setType(string $type)
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
    private function setHandle(string $handle)
    {
        $this->handle = $handle;
    }


    /**
     * @return string
     */
    public function assetNamespace(): string
    {
        return $this->domain->assetNamespace();
    }


    /**
     * @return string
     */
    public function type(): string
    {
        return $this->type;
    }


    /**
     * @return string
     */
    public function handle(): string
    {
        return $this->handle;
    }


    /**
     * @return bool
     */
    public function isRegistered(): bool
    {
        return $this->registered
            || ($this instanceof JavascriptAsset && wp_script_is($this->handle(), 'registered'))
            || ($this instanceof StylesheetAsset && wp_style_is($this->handle(), 'registered'));
    }


    /**
     * @param bool|int|string $registered
     */
    public function setRegistered($registered = true)
    {
        $this->registered = filter_var($registered, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return bool
     */
    public function enqueueImmediately(): bool
    {
        return $this->enqueue_immediately;
    }


    /**
     * @param bool|int|string $enqueue_immediately
     */
    public function setEnqueueImmediately($enqueue_immediately = true)
    {
        $this->enqueue_immediately = filter_var($enqueue_immediately, FILTER_VALIDATE_BOOLEAN);
    }
}
