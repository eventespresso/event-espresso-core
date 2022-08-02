<?php

namespace EventEspresso\core\domain\services\factories;

use EventEspresso\core\domain\services\validation\email\EmailValidationException;
use EventEspresso\core\domain\services\validation\email\EmailValidationService;
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
     * @var EmailValidationService
     * @since $VID:$
     */
    private static $validator;


    /**
     * @return EmailValidationService
     */
    public static function getValidator(): EmailValidationService
    {
        if (! EmailAddressFactory::$validator instanceof EmailValidationService) {
            EmailAddressFactory::setValidator(EmailAddressFactory::getShared(EmailValidationService::class));
        }
        return EmailAddressFactory::$validator;
    }


    /**
     * @param EmailValidationService $validator
     */
    public static function setValidator(EmailValidationService $validator): void
    {
        EmailAddressFactory::$validator = $validator;
    }


    /**
     * @param string $email_address
     * @return EmailAddress
     * @throws EmailValidationException
     */
    public static function create($email_address): EmailAddress
    {
        return EmailAddressFactory::getNew(
            EmailAddress::class,
            [
                $email_address,
                EmailAddressFactory::getValidator()
            ]
        );
    }
}
