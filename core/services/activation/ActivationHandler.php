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
     * @var EE_Maintenance_Mode $maintenance_mode
     */
    private $maintenance_mode;



    /**
     * ActivationHandler constructor.
     *
     * @param EE_Maintenance_Mode $maintenance_mode
     */
    public function __construct(EE_Maintenance_Mode $maintenance_mode)
    {
        $this->maintenance_mode = $maintenance_mode;
    }



    /**
     * @param ActivatableInterface $system_activated
     * @throws InvalidArgumentException
     */
    public function verifySystemActivated(ActivatableInterface $system_activated)
    {
        if (! ($system_activated instanceof EE_System || $system_activated instanceof EE_Addon)) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'The %1$s parameter must either be an instance of EE_System for Core, or an EE_Addon class. The following was supplied: %2$s%3$s',
                        'event_espresso'
                    ),
                    '$system',
                    '<br />',
                    var_export($system_activated, true)
                )
            );
        }
    }



    /**
     * switches handling based on activation type
     *
     * @param ActivatableInterface $system_activated
     * @param ActivationType       $activation_type
     * @param ActivationHistory    $activation_history
     * @return bool
     * @throws InvalidArgumentException
     */
    public function detectActivationOrVersionChange(
        ActivatableInterface $system_activated,
        ActivationType $activation_type,
        ActivationHistory $activation_history
    ) {
        $this->verifySystemActivated($system_activated);
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__detectActivationOrVersionChange__before_detection',
            $system_activated,
            $this
        );
        switch ($activation_type->getActivationType()) {
            case ActivationType::NEW_ACTIVATION:
                $activation_detected = $this->handleNewActivation(
                    $system_activated,
                    $activation_history
                );
                break;
            case ActivationType::REACTIVATION:
                $activation_detected = $this->handleReactivation(
                    $system_activated,
                    $activation_history
                );
                break;
            case ActivationType::UPGRADE:
                $activation_detected = $this->handleUpgrade(
                    $system_activated,
                    $activation_history
                );
                break;
            case ActivationType::DOWNGRADE:
                $activation_detected = $this->handleDowngrade(
                    $system_activated,
                    $activation_history
                );
                break;
            case ActivationType::NOT_ACTIVATION:
            default:
                $activation_detected = $this->handleNormalRequest($system_activated);
                break;
        }
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__detectActivationOrVersionChange__detection_complete',
            $system_activated,
            $this
        );
        return $activation_detected;
    }



    /**
     * handling for new activations
     *
     * @param ActivatableInterface $system_activated
     * @param ActivationHistory    $activation_history
     * @return boolean
     */
    private function handleNewActivation(ActivatableInterface $system_activated, ActivationHistory $activation_history)
    {
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleNewActivation',
            $system_activated,
            $this
        );
        $activation_history->updateActivationHistory();
        return true;
    }



    /**
     * handling for reactivations
     *
     * @param ActivatableInterface $system_activated
     * @param ActivationHistory    $activation_history
     * @return boolean
     */
    private function handleReactivation(ActivatableInterface $system_activated, ActivationHistory $activation_history)
    {
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleReactivation',
            $system_activated,
            $this
        );
        $activation_history->updateActivationHistory();
        return true;
    }



    /**
     * handling for upgrades
     *
     * @param ActivatableInterface $system_activated
     * @param ActivationHistory    $activation_history
     * @return boolean
     */
    private function handleUpgrade(ActivatableInterface $system_activated, ActivationHistory $activation_history)
    {
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleUpgrade',
            $system_activated,
            $this
        );
        $this->maintenance_mode->set_maintenance_mode_if_db_old();
        $activation_history->updateActivationHistory();
        return true;
    }



    /**
     * handling for downgrades
     *
     * @param ActivatableInterface $system_activated
     * @param ActivationHistory    $activation_history
     * @return boolean
     */
    private function handleDowngrade(ActivatableInterface $system_activated, ActivationHistory $activation_history)
    {
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleDowngrade',
            $system_activated,
            $this
        );
        $this->maintenance_mode->set_maintenance_mode_if_db_old();
        $activation_history->updateActivationHistory();
        return true;
    }



    /**
     * handling for normal requests
     *
     * @param ActivatableInterface $system_activated
     * @return boolean
     */
    private function handleNormalRequest(ActivatableInterface $system_activated)
    {
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationHandler__handleNormalRequest',
            $system_activated,
            $this
        );
        return false;
    }



}
