<?php

namespace EventEspresso\core\domain;

use DomainException;
use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\FullyQualifiedName;
use EventEspresso\core\domain\values\Version;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class DomainFactory
 * Factory class for generating addon Domain objects
 *
 * @package EventEspresso\core\domain
 * @author  Brent Christensen
 * @since   4.9.50
 */
class DomainFactory
{
    /**
     * @var DomainInterface[]
     */
    protected static $domains = [];


    /**
     * @param string $domain_fqcn       [required] Fully Qualified Class Name for the Domain class
     * @param string $main_file         [required] path to the main plugin file
     * @param string $version           [required] version string for the plugin
     * @return DomainInterface
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function create(string $domain_fqcn, string $main_file, string $version): DomainInterface
    {
        $fqcn = new FullyQualifiedName($domain_fqcn);
        return DomainFactory::getDomain($fqcn->string(), [$main_file, $version]);
    }


    /**
     * @param FullyQualifiedName $domain_fqcn   [required] Fully Qualified Class Name for the Domain class
     * @param array              $arguments     [required] array of arguments to be passed to the Domain class
     *                                          constructor. Must at least include the following two value objects:
     *                                          [
     *                                              EventEspresso\core\domain\values\FilePath $plugin_file
     *                                              EventEspresso\core\domain\values\Version $version
     *                                          ]
     * @return DomainInterface
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function getShared(FullyQualifiedName $domain_fqcn, array $arguments): DomainInterface
    {
        return DomainFactory::getDomain($domain_fqcn->string(), $arguments);
    }


    /**
     * @return DomainInterface
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidFilePathException
     * @throws InvalidInterfaceException
     */
    public static function getEventEspressoCoreDomain(): DomainInterface
    {
        $fqcn = 'EventEspresso\core\domain\Domain';
        if (! isset(DomainFactory::$domains[ $fqcn ])) {
            DomainFactory::getDomain($fqcn, [EVENT_ESPRESSO_MAIN_FILE, espresso_version()]);
        }
        return DomainFactory::$domains[ $fqcn ];
    }


    /**
     * @param string $fqcn
     * @param array  $arguments
     * @return DomainInterface
     */
    private static function getDomain(string $fqcn, array $arguments): DomainInterface
    {
        if (! isset(DomainFactory::$domains[ $fqcn ])) {
            if (! isset($arguments[0], $arguments[1])) {
                throw new InvalidArgumentException(
                    esc_html__(
                        'You need to pass at least two arguments, representing the addon plugin file and version, in order to generate a Domain class',
                        'event_espresso'
                    )
                );
            }
            $filepath = $arguments[0] instanceof FilePath ? $arguments[0] : new FilePath($arguments[0]);
            $version  = $arguments[1] instanceof Version ? $arguments[1] : Version::fromString($arguments[1]);
            $domain   = new $fqcn($filepath, $version);
            if (! $domain instanceof DomainBase || ! $domain instanceof $fqcn) {
                throw new DomainException(
                    sprintf(
                        esc_html__(
                            'The requested Domain class "%1$s" could not be loaded.',
                            'event_espresso'
                        ),
                        $fqcn
                    )
                );
            }
            DomainFactory::$domains[ $fqcn ] = $domain;
            // we still need to share this with the core loader to facilitate automatic dependency injection
            LoaderFactory::getLoader()->share($fqcn, $domain, [$filepath, $version, $domain->assetNamespace()]);
        }
        return DomainFactory::$domains[ $fqcn ];
    }
}
