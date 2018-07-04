<?php

namespace EventEspresso\caffeinated\modules\recaptcha_invisible;

use EventEspresso\core\domain\services\factories\FactoryInterface;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;

/**
 * Class RecaptchaFactory
 * Factory class for generating InvisibleRecaptcha or RecaptchaAdminSettings objects
 *
 * @package EventEspresso\caffeinated\modules\recaptcha_invisible
 * @author  Brent Christensen
 * @since   4.9.59.p
 */
class RecaptchaFactory implements FactoryInterface
{

    /**
     * @param array $arguments
     * @return InvisibleRecaptcha
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public static function create($arguments = array())
    {
        return LoaderFactory::getLoader()->getShared(
            'EventEspresso\caffeinated\modules\recaptcha_invisible\InvisibleRecaptcha',
            $arguments
        );
    }



    /**
     * @param array $arguments
     * @return RecaptchaAdminSettings
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public static function getAdminModule($arguments = array())
    {
        return LoaderFactory::getLoader()->getShared(
            'EventEspresso\caffeinated\modules\recaptcha_invisible\RecaptchaAdminSettings',
            $arguments
        );
    }
}
