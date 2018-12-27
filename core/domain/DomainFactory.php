<?php

namespace EventEspresso\core\domain;

use DomainException;
use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\FullyQualifiedName;
use EventEspresso\core\domain\values\Version;
use EventEspresso\core\exceptions\InvalidClassException;
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
     * @param FullyQualifiedName $domain_fqcn   [required] Fully Qualified Class Name for the Domain class
     * @param array $arguments                  [required] array of arguments to be passed to the Domain class
     *                                          constructor. Must at least include the following two value objects:
     *                                          array(
     *                                              EventEspresso\core\domain\values\FilePath $plugin_file
     *                                              EventEspresso\core\domain\values\Version $version
     *                                          )
     * @return mixed
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function getShared(FullyQualifiedName $domain_fqcn, array $arguments)
    {
        if (! isset($arguments[0], $arguments[1])) {
            throw new InvalidArgumentException(
                esc_html__(
                    'You need to pass at least two arguments, representing the addon plugin file and version, in order to generate a Domain class',
                    'event_espresso'
                )
            );
        }
        $domain = LoaderFactory::getLoader()->getShared($domain_fqcn, $arguments);
        if (! $domain instanceof $domain_fqcn && ! $domain instanceof DomainBase) {
            throw new DomainException(
                sprintf(
                    esc_html__(
                        'The requested Domain class "%1$s" could not be loaded.',
                        'event_espresso'
                    ),
                    $domain_fqcn
                )
            );
        }
        return $domain;
    }


    /**
     * @return Domain
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidFilePathException
     * @throws InvalidInterfaceException
     */
    public static function getEventEspressoCoreDomain()
    {
        $domain = new Domain(
            new FilePath(EVENT_ESPRESSO_MAIN_FILE),
            Version::fromString(espresso_version())
        );
        LoaderFactory::getLoader()->share('EventEspresso\core\domain\Domain', $domain);
        return $domain;
    }
}
