<?php

namespace EventEspresso\core\domain\services\factories;

use EventEspresso\core\domain\services\validation\email\EmailValidationException;
use EventEspresso\core\domain\values\EmailAddress;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class EmailAddressFactory
 * creates an EmailAddress value object
 *
 * @package EventEspresso\core\domain\services\factories
 * @author  Brent Christensen
 */
class EmailAddressFactory extends LoaderFactory implements FactoryInterface
{
    /**
     * @param string $email_address
     * @return EmailAddress
     * @throws EmailValidationException
     */
    public static function create($email_address): EmailAddress
    {
        return EmailAddressFactory::getNew(EmailAddress::class, [$email_address]);
    }
}
