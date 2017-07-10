<?php

namespace EventEspresso\core\services\activation;

use EE_Addon;
use EE_System;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;


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
    public static function getActivationsAndUpgradesManager()
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
    public static function createActivationHistory(ActivatableInterface $activation) {
        return LoaderFactory::getLoader()->getNew(
            'EventEspresso\core\services\activation\ActivationHistory',
            $activation instanceof EE_Addon
                ? array(
                    $activation->get_activation_history_option_name(),
                    $activation->get_activation_indicator_option_name(),
                    $activation->version()
                )
                : array()
        );
    }



    /**
     * @return MigrateActivationHistory
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function getMigrateActivationHistory() {
        return LoaderFactory::getLoader()->getNew(
            'EventEspresso\core\services\activation\MigrateActivationHistory'
        );
    }



    /**
     * @return RequestTypeDetector
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function getRequestTypeDetector() {
        return LoaderFactory::getLoader()->getShared(
            'EventEspresso\core\services\activation\RequestTypeDetector'
        );
    }



    /**
     * @param ActivatableInterface $activation
     * @return InitializeCore|InitializeAddon|null
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function createInitializer(ActivatableInterface $activation) {
        if ($activation instanceof EE_System) {
            return LoaderFactory::getLoader()->getNew(
                'EventEspresso\core\services\activation\InitializeCore',
                array($activation->getRequestType())
            );
        }
        if ($activation instanceof EE_Addon) {
            return LoaderFactory::getLoader()->getNew(
                'EventEspresso\core\services\activation\InitializeAddon',
                array($activation)
            );
        }
        return null;
    }



}
// Location: ActivationsFactory.php
