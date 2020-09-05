<?php


namespace EventEspresso\core\services\assets;


use DomainException;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\services\factories\FactoryInterface;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\loaders\LoaderInterface;

class BaristaFactory implements FactoryInterface
{
    /**
     * @param string $domain_fqcn Fully Qualified Class Name for the applicable DomainInterface class
     * @return BaristaInterface
     */
    public static function create($domain_fqcn = '')
    {
        $loader = LoaderFactory::getLoader();
        // if no FQCN is supplied for the domain, then we are loading the defaults for core
        // and can just request the Barista instance directly.
        // add-ons will always have to supply their domain to retrieve their manifest
        if ( empty($domain_fqcn)) {
            return $loader->getShared(Barista::class);
        }
        $domain = BaristaFactory::getDomain($loader, $domain_fqcn);
        /** @var AssetManifestInterface $asset_manifest */
        $asset_manifest = $loader->getShared(AssetManifest::class, [$domain]);
        return $loader->getShared(Barista::class, [$asset_manifest]);
    }


    /**
     * @param LoaderInterface $loader
     * @param mixed $domain_fqcn Fully Qualified Class Name for the applicable DomainInterface class
     * @return DomainInterface
     */
    private static function getDomain(LoaderInterface $loader, $domain_fqcn)
    {
        $domain = is_string($domain_fqcn) ? $loader->getShared($domain_fqcn) : null;
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
