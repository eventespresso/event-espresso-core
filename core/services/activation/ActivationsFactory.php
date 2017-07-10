<?php

namespace EventEspresso\core\services\activation;

use EE_Addon;
use EE_System;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;

/**
 * Class ActivationsFactory
 * Description
 *
 * @package EventEspresso\core\services\activation
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ActivationsFactory
{

    /**
     * @return ActivationsAndUpgradesManager
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public static function getActivationsAndUpgradesManager(): ActivationsAndUpgradesManager
    {
        return LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\activation\ActivationsAndUpgradesManager'
        );
    }


    /**
     * @param ActivatableInterface $activation
     * @return ActivationHistory
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function createActivationHistory(ActivatableInterface $activation): ActivationHistory
    {
        return LoaderFactory::getLoader()->getNew(
            'EventEspresso\core\services\activation\ActivationHistory',
            $activation instanceof EE_Addon
                ? [
                $activation->get_activation_history_option_name(),
                $activation->get_activation_indicator_option_name(),
                $activation->version()
            ]
                : []
        );
    }


    /**
     * @return MigrateActivationHistory
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function getMigrateActivationHistory(): MigrateActivationHistory
    {
        return LoaderFactory::getLoader()->getNew(
            'EventEspresso\core\services\activation\MigrateActivationHistory'
        );
    }


    /**
     * @return ActivationTypeDetector
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function getRequestTypeDetector(): ActivationTypeDetector
    {
        return LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\activation\ActivationTypeDetector'
        );
    }


    /**
     * @param ActivatableInterface $activation
     * @return InitializeCore|InitializeAddon|null
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function createInitializer(ActivatableInterface $activation)
    {
        if ($activation instanceof EE_System) {
            return LoaderFactory::getLoader()->getNew(
                'EventEspresso\core\services\activation\InitializeCore',
                [$activation->getActivationType()]
            );
        }
        if ($activation instanceof EE_Addon) {
            return LoaderFactory::getLoader()->getNew(
                'EventEspresso\core\services\activation\InitializeAddon',
                [$activation]
            );
        }
        return null;
    }
}