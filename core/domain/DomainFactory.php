<?php

namespace EventEspresso\core\domain;

use EventEspresso\core\domain\values\FullyQualifiedName;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use EventEspresso\core\services\loaders\LoaderFactory;

defined('EVENT_ESPRESSO_VERSION') || exit;



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
     * @param FullyQualifiedName $domain_fqcn [required] Fully Qualified Class Name for the Domain class
     * @param array              $arguments   [required] array of arguments to be passed to the Domain class
     *                                        constructor. must include the following two elements as a minimum:
     *                                        array(
     *                                          $plugin_file, // full server path to the addon main file (__FILE__)
     *                                          $version, // standard version string like #.#.#
     *                                        )
     * @return mixed
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
        return LoaderFactory::getLoader()->getShared($domain_fqcn, $arguments);
    }

}
// Location: DomainFactory.php
