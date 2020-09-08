<?php

namespace EventEspresso\core\services\assets;

use DomainException;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\services\factory\FactoryInterface;
use EventEspresso\core\services\loaders\LoaderInterface;
use InvalidArgumentException;

class AssetManifestFactory implements FactoryInterface
{
    /**
     * @var AssetManifestInterface[]
     */
    private static $manifests = [];

    /**
     * @var LoaderInterface $loader
     */
    protected $loader;


    /**
     * AssetManifestFactory constructor.
     *
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }


    /**
     * returns the applicable AssetManifest for the provided Domain
     *
     * @param DomainInterface $domain
     * @return AssetManifestInterface
     */
    public function createFromDomainObject(DomainInterface $domain)
    {
        return $this->getAssetManifestForDomain(AssetManifest::class, $domain);
    }


    /**
     * for creating an atypical AssetManifest for the Domain provided in the $arguments array
     *
     * @param string $fqcn      Fully Qualified Class Name
     * @param array  $arguments [optional] array of data required for construction
     * @return AssetManifestInterface
     */
    public function create($fqcn, array $arguments = [])
    {
        if (! isset($arguments[0]) || ! $arguments[0] instanceof DomainInterface) {
            throw new InvalidArgumentException(
                esc_html__(
                    'In order to generate an AssetManifest class you need to supply an array where the first argument is an instance of DomainInterface.',
                    'event_espresso'
                )
            );
        }
        return $this->getAssetManifestForDomain($fqcn, $arguments[0]);
    }


    /**
     * @param string          $manifest_fqcn
     * @param DomainInterface $domain
     * @return AssetManifestInterface
     */
    private function getAssetManifestForDomain($manifest_fqcn, DomainInterface $domain)
    {
        $domain_fqcn = get_class($domain);
        if (! isset(AssetManifestFactory::$manifests[ $domain_fqcn ])) {
            $asset_manifest = new $manifest_fqcn($domain);
            if (! $asset_manifest instanceof AssetManifestInterface || ! $asset_manifest instanceof $manifest_fqcn) {
                throw new DomainException(
                    sprintf(
                        esc_html__(
                            'The requested AssetManifest class "%1$s" could not be loaded.',
                            'event_espresso'
                        ),
                        $manifest_fqcn
                    )
                );
            }
            // we still need to share this with the core loader to facilitate automatic dependency injection
            $this->loader->share(AssetManifest::class, $asset_manifest, [$domain]);
            AssetManifestFactory::$manifests[ $domain_fqcn ] = $asset_manifest;
        }
        return AssetManifestFactory::$manifests[ $domain_fqcn ];
    }
}
