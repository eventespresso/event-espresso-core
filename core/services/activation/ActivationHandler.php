<?php

namespace EventEspresso\core\services\activation;

use EE_Addon;
use EE_Maintenance_Mode;
use EE_System;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');


/**
 * Class DetectActivationsAndUpgrades
 * Determines whether this is a brand new install, code upgrade, etc,
 * and handles setting up the DB or setting up maintenance mode etc.
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson, Brent Christensen
 * @since         4.9.40
 */
class ActivationHandler
{

    /**
     * @var ActivationHistory $activation_history
     */
    private $activation_history;

    /**
     * @var EE_Maintenance_Mode $maintenance_mode
     */
    private $maintenance_mode;

    /**
     * @var RequestType $request_type
     */
    private $request_type;

    /**
     * System object handling the activation or upgrade.
     * Either EE_System for Core, or an EE_Addon class
     *
     * @var ActivatableInterface|EE_Addon $system_activated
     */
    private $system_activated;

    /**
     * @var boolean $activation_detected
     */
    private $activation_detected = false;



    /**
     * ActivationHandler constructor.
     *
     * @param ActivatableInterface $system_activated
     * @param RequestType                   $request_type
     * @param ActivationHistory             $activation_history
     * @param EE_Maintenance_Mode           $maintenance_mode
     * @throws InvalidArgumentException
     */
    public function __construct(
        ActivatableInterface $system_activated,
        RequestType $request_type,
        ActivationHistory $activation_history,
        EE_Maintenance_Mode $maintenance_mode
    ) {
        $this->setSystemActivated($system_activated);
        $this->request_type       = $request_type;
        $this->activation_history = $activation_history;
        $this->maintenance_mode   = $maintenance_mode;
    }



    /**
     * @param ActivatableInterface $system_activated
     * @throws InvalidArgumentException
     */
    public function setSystemActivated(ActivatableInterface $system_activated)
    {
        $this->system_activated = $system_activated;
        if (! ($this->system_activated instanceof EE_System || $this->system_activated instanceof EE_Addon)) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'The %1$s parameter must either be an instance of EE_System for Core, or an EE_Addon class. The following was supplied: %2$s%3$s',
                        'event_espresso'
                    ),
                    '$system',
                    '<br />',
                    var_export($this->system_activated, true)
                )
            );
        }
    }



    /**
     * @return string
     */
    public function getSystemName()
    {
        return get_class($this->system_activated);
    }



    /**
     * switches handling based on request type
     *
     * @return boolean
     */
    public function detectActivations()
    {
        do_action(
            'AHEE__EventEspresso_core_services_activation_DetectActivationsAndUpgrades__handleActivationRequestTypes__detect__before',
            $this->system_activated,
            $this
        );
        switch ($this->request_type->getRequestType()) {
            case RequestType::NEW_ACTIVATION:
                $this->handleNewActivation();
                break;
            case RequestType::REACTIVATION:
                $this->handleReactivation();
                break;
            case RequestType::UPGRADE:
                $this->handleUpgrade();
                break;
            case RequestType::DOWNGRADE:
                $this->handleDowngrade();
                break;
            case RequestType::NORMAL:
            default:
                $this->handleNormalRequest();
            break;
        }
        do_action(
            'AHEE__EventEspresso_core_services_activation_DetectActivationsAndUpgrades__handleActivationRequestTypes__detect__complete',
            $this->system_activated,
            $this
        );
        return $this->activation_detected;
    }



    /**
     * handling for new activations
     *
     * @return void
     */
    private function handleNewActivation()
    {
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleNewActivation',
            $this->system_activated,
            $this
        );
        $this->handleCoreVersionChange();
    }



    /**
     * handling for reactivations
     *
     * @return void
     */
    private function handleReactivation()
    {
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleReactivation',
            $this->system_activated,
            $this
        );
        $this->handleCoreVersionChange();
    }



    /**
     * handling for upgrades
     *
     * @return void
     */
    private function handleUpgrade()
    {
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleUpgrade',
            $this->system_activated,
            $this
        );
        $this->maintenance_mode->set_maintenance_mode_if_db_old();
        $this->handleCoreVersionChange();
    }



    /**
     * handling for downgrades
     *
     * @return void
     */
    private function handleDowngrade()
    {
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleDowngrade',
            $this->system_activated,
            $this
        );
        $this->maintenance_mode->set_maintenance_mode_if_db_old();
        $this->handleCoreVersionChange();
    }



    /**
     * handling for normal requests
     *
     * @return void
     */
    private function handleNormalRequest()
    {
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__handleNormalRequest',
            $this->system_activated,
            $this
        );
    }



    /**
     * Updates the list of installed versions
     * then allows subsystem to handle further processing
     *
     * @return void
     */
    private function handleCoreVersionChange()
    {
        $this->activation_detected = true;
        $this->activation_history->updateActivationHistory();
    }





}
