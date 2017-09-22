<?php

namespace EventEspresso\core\domain\services\factories;

use EventEspresso\core\domain\services\validation\email\EmailValidationException;
use EventEspresso\core\domain\values\EmailAddress;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Class EmailAddressFactory
 * creates an EmailAddress value object
 *
 * @package EventEspresso\core\domain\services\factories
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EmailAddressFactory implements FactoryInterface
{

    /**
     * @param string $email_address
     * @return EmailAddress
     * @throws EmailValidationException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public static function create($email_address)
    {
        return LoaderFactory::getLoader()->getNew(
            'EventEspresso\core\domain\values\EmailAddress',
            array($email_address)
        );
    }

}
// Location: core/domain/services/factories/EmailAddressFactory.php
