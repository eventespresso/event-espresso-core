<?php

namespace EventEspresso\core\services\activation;

use DomainException;
use EE_Error;
use EE_System;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class ActivationsAndUpgradesManager
 * Checks for activation or upgrade for EE core,
 * then checks for activation or upgrade for registered addons
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson, Brent Christensen
 * @since         4.9.40
 */
class ActivationsAndUpgradesManager
{

    /**
     * option name for recording an array of addon names
     * that are not compatible with the current version of core
     */
    const EE_INCOMPATIBLE_ADDONS_OPTION_NAME = 'ee_incompatible_addons';

    /**
     * @var ActivatableInterface[] $activations
     */
    private $activations = array();

    /**
     * @var ActivationHandler $activation_handler
     */
    private $activation_handler;

    /**
     * @var ActivationTypeDetector $activation_type_detector
     */
    private $activation_type_detector;



    /**
     * ActivationsAndUpgradesManager constructor.
     *
     * @param ActivationHandler      $activation_handler
     * @param ActivationTypeDetector $activation_type_detector
     */
    public function __construct(
        ActivationHandler $activation_handler,
        ActivationTypeDetector $activation_type_detector
    ) {
        defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');
        $this->activation_handler       = $activation_handler;
        $this->activation_type_detector = $activation_type_detector;
    }



    /**
     * @param ActivatableInterface[] $activations
     * @return bool
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws InvalidArgumentException
     * @throws DomainException
     */
    public function detectActivationsAndVersionChanges(array $activations): bool
    {
        foreach ($activations as $activation) {
            if ( ! $activation instanceof ActivatableInterface) {
                throw new InvalidEntityException(
                    $activation,
                    'EventEspresso\core\services\activation\ActivatableInterface'
                );
            }
            $activation_history = $this->getActivationHistory($activation);
            if (
                $this->activation_handler->detectActivationOrVersionChange(
                    $activation,
                    $this->getActivationType($activation, $activation_history),
                    $activation_history
                )
            ) {
                $this->activations[] = $activation;
            }
        }
        // if no activations are scheduled, then just return false
        if($this->activations === array()) {
            return false;
        }
        add_action(
            'AHEE__EE_System__perform_activations_upgrades_and_migrations',
            array($this, 'performActivationsAndUpgrades')
        );
        return true;
    }



    /**
     * @param ActivatableInterface $activation
     * @return ActivationHistory
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws DomainException
     */
    private function getActivationHistory(ActivatableInterface $activation): ActivationHistory
    {
        // get activation history and set arguments array based on activation type
        $activation_history = ActivationsFactory::createActivationHistory($activation);
        if ($activation_history instanceof ActivationHistory) {
            // convert EE Core activation history to the latest format
            if ($activation instanceof EE_System) {
                $migrate_activation_history = ActivationsFactory::getMigrateActivationHistory();
                $activation_history = $migrate_activation_history->updateFormat($activation_history);
            }
            $activation->setActivationHistory($activation_history);
            return $activation_history;
        }
        throw new DomainException(
            sprintf(
                esc_html__(
                    'Could not obtain an ActivationHistory for the "%1$s" Activatable class.',
                    'event_espresso'
                ),
                get_class($activation)
            )
        );
    }



    /**
     * @param ActivatableInterface $activation
     * @param ActivationHistory    $activation_history
     * @return ActivationType
     * @throws InvalidArgumentException
     */
    private function getActivationType(ActivatableInterface $activation, ActivationHistory $activation_history): ActivationType
    {
        // determine whether current request is new activation, upgrade, etc
        $activation_type = $this->activation_type_detector->resolveActivationTypeFromActivationHistory(
            $activation_history
        );
        $activation->setActivationType($activation_type);
        return $activation_type;
    }


    /**
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function performActivationsAndUpgrades()
    {
        foreach ($this->activations as $activation) {
            $initializer = ActivationsFactory::createInitializer($activation);
            if($initializer instanceof InitializeInterface){
                $initializer->initialize();
            }
            do_action(
                'AHEE__EventEspresso_core_services_activation_ActivationsAndUpgradesManager__performActivationsAndUpgrades',
                $activation,
                $initializer
            );
        }
        $this->deactivateIncompatibleAddons();
    }



    /**
     * Using the information gathered in EE_System::_incompatible_addon_error,
     * deactivates any addons considered incompatible with the current version of EE
     */
    private function deactivateIncompatibleAddons()
    {
        $incompatible_addons = get_option(ActivationsAndUpgradesManager::EE_INCOMPATIBLE_ADDONS_OPTION_NAME, array());
        if (! empty($incompatible_addons)) {
            $active_plugins = get_option('active_plugins', array());
            foreach ($active_plugins as $active_plugin) {
                foreach ($incompatible_addons as $incompatible_addon) {
                    if (strpos($active_plugin, $incompatible_addon) !== false) {
                        unset($_GET['activate']);
                        espresso_deactivate_plugin($active_plugin);
                    }
                }
            }
        }
    }


}
