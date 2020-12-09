<?php

namespace EventEspresso\core\services\assets;

use DomainException;
use EventEspresso\core\domain\DomainFactory;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\services\factory\FactoryInterface;
use EventEspresso\core\domain\values\FullyQualifiedName;
use EventEspresso\core\services\loaders\LoaderInterface;

class BaristaFactory implements FactoryInterface
{
    /**
     * @var AssetManifestFactory
     */
    private $manifest_factory;

    /**
     * @var BaristaInterface[]
     */
    private static $baristas = [];

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;


    /**
     * BaristaFactory constructor.
     *
     * @param AssetManifestFactory $manifest_factory
     * @param LoaderInterface      $loader
     */
    public function __construct(AssetManifestFactory $manifest_factory, LoaderInterface $loader)
    {
        $this->manifest_factory = $manifest_factory;
        $this->loader           = $loader;
    }


    /**
     * @param string $domain_fqcn
     * @return BaristaInterface
     */
    public function createFromDomainClass($domain_fqcn)
    {
        /** @var DomainInterface $domain */
        $domain = $this->loader->getShared($domain_fqcn);
        return $this->createFromDomainObject($domain);
    }


    /**
     * @param DomainInterface $domain
     * @return BaristaInterface
     */
    public function createFromDomainObject(DomainInterface $domain)
    {
        $asset_manifest = $this->manifest_factory->createFromDomainObject($domain);
        return $this->getBaristaForDomain($asset_manifest, $domain);
    }


    /**
     * @param string $domain_fqcn      Fully Qualified Class Name for the applicable DomainInterface class
     * @param array  $domain_arguments arguments required by the applicable DomainInterface class
     * @return BaristaInterface
     */
    public function create($domain_fqcn = '', array $domain_arguments = [])
    {
        $domain         = $this->getDomain($domain_fqcn, $domain_arguments);
        $asset_manifest = $this->manifest_factory->createFromDomainObject($domain);
        return $this->getBaristaForDomain($asset_manifest, $domain);
    }


    /**
     * @param AssetManifestInterface $asset_manifest
     * @param DomainInterface        $domain
     * @return BaristaInterface
     */
    private function getBaristaForDomain(AssetManifestInterface $asset_manifest, DomainInterface $domain)
    {
        $domain_fqcn = get_class($domain);
        if (! isset(BaristaFactory::$baristas[ $domain_fqcn ])) {
            $barista = new Barista($asset_manifest);
            // we still need to share this with the core loader to facilitate automatic dependency injection
            $this->loader->share(Barista::class, $barista, [$asset_manifest]);
            BaristaFactory::$baristas[ $domain_fqcn ] = $barista;
        }
        return BaristaFactory::$baristas[ $domain_fqcn ];
    }


    /**
     * @param string $domain_fqcn Fully Qualified Class Name for the applicable DomainInterface class
     * @param array  $arguments
     * @return DomainInterface
     */
    private function getDomain($domain_fqcn, array $arguments = [])
    {
        // if no FQCN is supplied for the domain, then we are loading the defaults for core
        // add-ons will always have to supply their domain FQCN and arguments to retrieve their manifest
        $domain = empty($domain_fqcn)
            ? DomainFactory::getEventEspressoCoreDomain()
            : DomainFactory::getShared(new FullyQualifiedName($domain_fqcn), $arguments);
        if ($domain instanceof DomainInterface) {
            return $domain;
        }
        throw new DomainException(
            sprintf(
                esc_html__(
                    'BaristaFactory::create() requires a fully qualified class name (FQCN) for the currently applicable Domain object.
                    %1$sThe supplied FQCN ("%2$s") is either invalid or the class is missing.',
                    'event_espresso'
                ),
                '<br />',
                $domain_fqcn
            )
        );
    }
}
