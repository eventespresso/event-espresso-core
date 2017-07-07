<?php

namespace EventEspresso\core\services\activation;

use DomainException;
use EE_Addon;
use EE_System;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\loaders\Loader;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');


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
     * @var ActivatableInterface[] $activations
     */
    private $activations;

    /**
     * @var Loader $loader
     */
    private $loader;



    /**
     * ActivationsAndUpgradesManager constructor.
     *
     * @param ActivatableInterface[] $activations
     * @param Loader                 $loader
     */
    public function __construct(
        array $activations,
        Loader $loader
    ) {
        $this->activations = $activations;
        $this->loader = $loader;
    }



    /**
     * @throws InvalidEntityException
     * @throws InvalidArgumentException
     * @throws DomainException
     */
    public function detectActivationsAndUpgrades()
    {
        $activation_detected = false;
        foreach ($this->activations as $key => $activation) {
            if ( ! $activation instanceof ActivatableInterface) {
                throw new InvalidEntityException(
                    $activation,
                    'EventEspresso\core\services\activation\ActivatableInterface'
                );
            }
            $activation_history = $this->getActivationHistory($activation);
            /** @var ActivationHandler $activation_handler */
            $activation_handler = $this->loader->getNew(
                'EventEspresso\core\services\activation\ActivationHandler',
                array(
                    $activation,
                    $this->getRequestType($activation, $activation_history),
                    $activation_history
                )
            );
            if ($activation_handler->detectActivations()) {
                $activation_detected = true;
            } else {
                unset($this->activations[$key]);
            }
        }
        if($activation_detected) {
            add_action(
                'AHEE__EE_System__perform_activations_upgrades_and_migrations',
                array($this, 'performActivationsAndUpgrades')
            );
        }
        return $activation_detected;
    }



    /**
     * @param ActivatableInterface $activation
     * @return ActivationHistory
     * @throws DomainException
     */
    private function getActivationHistory(ActivatableInterface $activation)
    {
        // get activation history and set arguments array based on activation type
        $activation_history = $this->loader->getNew(
            'EventEspresso\core\services\activation\ActivationHistory',
            $activation instanceof EE_Addon
                ? array(
                    $activation->get_activation_history_option_name(),
                    $activation->get_activation_indicator_option_name(),
                    $activation->version()
                )
                : array()
        );
        if ($activation_history instanceof ActivationHistory) {
            // convert EE Core activation history to the latest format
            if ($activation instanceof EE_System) {
                $migrate_activation_history = $this->loader->getNew(
                    'EventEspresso\core\services\activation\MigrateActivationHistory'
                );
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
     * @return RequestType
     * @throws InvalidArgumentException
     */
    private function getRequestType(ActivatableInterface $activation, ActivationHistory $activation_history)
    {
        // detect the request type for the activation
        /** @var RequestTypeDetector $request_type_detector */
        $request_type_detector = $this->loader->getNew(
            'EventEspresso\core\services\activation\RequestTypeDetector',
            array($activation_history)
        );
        // determine whether current request is new activation, upgrade, etc
        $request_type_detector->resolveFromActivationHistory();
        $request_type = $request_type_detector->getRequestType();
        $activation->setRequestType($request_type);
        return $request_type;
    }



    /**
     * @return void
     */
    public function performActivationsAndUpgrades()
    {
        foreach ($this->activations as $activation) {
            $initializer = null;
            if ($activation instanceof EE_System) {
                $initializer = $this->loader->getNew(
                    'EventEspresso\core\services\activation\InitializeCore',
                    array($activation->getRequestType())
                );
            } else if ($activation instanceof EE_Addon) {
                $initializer = $this->loader->getNew(
                    'EventEspresso\core\services\activation\InitializeAddon',
                    array($activation)
                );
            }
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
        $incompatible_addons = get_option('ee_incompatible_addons', array());
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
