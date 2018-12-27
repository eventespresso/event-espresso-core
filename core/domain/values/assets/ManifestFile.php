<?php

namespace EventEspresso\core\domain\values\assets;

use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;

/**
 * Class ManifestFile
 * Details for a JSON Manifest file
 *
 * @package EventEspresso\core\domain\values\assets
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class ManifestFile extends Asset
{

    /**
     * Asset constructor.
     *
     * @param DomainInterface $domain
     * @throws InvalidDataTypeException
     */
    public function __construct(DomainInterface $domain)
    {
        parent::__construct(Asset::TYPE_MANIFEST, $domain->assetNamespace(), $domain);
    }


    public function urlBase()
    {
        return $this->domain->distributionAssetsUrl();
    }


    public function filepath()
    {
        return $this->domain->distributionAssetsPath();
    }
}
