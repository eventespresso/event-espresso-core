<?php

namespace EventEspresso\core\services\activation;

use EE_Addon;
use EE_Maintenance_Mode;
use EE_System;
use EventEspresso\core\services\request\RequestType;
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
class DetectActivationsAndUpgrades
{

    /**
     * @var ActivationHistory $activation_history
     */
    private $activation_history;

    /**
     * callback method for initializing the db if no migrations are necessary
     *
     * @var callable $initialization_callback
     */
    private $initialization_callback;

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
     * @var EE_System|EE_Addon $system_activated
     */
    private $system_activated;



    /**
     * ActivationUpgradeHandler constructor.
     *
     * @param EE_System|EE_Addon $system_activated
     * @param RequestType         $request_type
     * @param ActivationHistory   $activation_history
     * @param EE_Maintenance_Mode $maintenance_mode
     * @param string              $initialization_callback
     * @throws InvalidArgumentException
     */
    public function __construct(
        $system_activated,
        RequestType $request_type,
        ActivationHistory $activation_history,
        EE_Maintenance_Mode $maintenance_mode,
        $initialization_callback = 'initialize_db_if_no_migrations_required'
    ) {
        $this->setSystemActivated($system_activated);
        $this->setInitializationCallback($initialization_callback);
        $this->request_type = $request_type;
        $this->activation_history = $activation_history;
        $this->maintenance_mode = $maintenance_mode;
    }



    /**
     * @param EE_Addon|EE_System $system_activated
     * @throws InvalidArgumentException
     */
    public function setSystemActivated($system_activated)
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
     * @param callable $initialization_callback
     * @throws InvalidArgumentException
     */
    public function setInitializationCallback($initialization_callback)
    {
        $this->initialization_callback = $initialization_callback;
        if (! is_callable(array($this->system_activated, $this->initialization_callback))) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'The %1$s parameter must be the name of a valid callback method on %2$s.%3$sThe following was supplied: %3$s%4$s',
                        'event_espresso'
                    ),
                    '$initialization_callback',
                    $this->getSystemName(),
                    '<br />',
                    var_export($this->initialization_callback, true)
                )
            );
        }
    }





    /**
     * @return ActivationHistory
     */
    public function getActivationHistory()
    {
        return $this->activation_history;
    }



    /**
     * @return RequestType
     */
    public function getRequestType()
    {
        return $this->request_type;
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
     * @return void
     */
    public function handleActivationRequestTypes()
    {
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__detect__before',
            $this->system_activated,
            $this
        );
        switch ($this->request_type->requestType()) {
            case RequestType::REQUEST_TYPE_NEW_ACTIVATION:
                $this->handleNewActivation();
                break;
            case RequestType::REQUEST_TYPE_REACTIVATION:
                $this->handleReactivation();
                break;
            case RequestType::REQUEST_TYPE_UPGRADE:
                $this->handleUpgrade();
                break;
            case RequestType::REQUEST_TYPE_DOWNGRADE:
                $this->handleDowngrade();
                break;
            case RequestType::REQUEST_TYPE_NORMAL:
            default:
                $this->handleNormalRequest();
            break;
        }
        do_action(
            'AHEE__EventEspresso_core_services_activation_ActivationUpgradeHandler__detect__complete',
            $this->system_activated,
            $this
        );
    }



    /**
     * @return void
     */
    private function setHookForInitializationCallback()
    {
        add_action(
            'AHEE__EE_System__perform_activations_upgrades_and_migrations',
            array($this->system_activated, $this->initialization_callback)
        );
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
        $this->setHookForInitializationCallback();
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
        $this->setHookForInitializationCallback();
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
        $this->setHookForInitializationCallback();
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
        $this->setHookForInitializationCallback();
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
        $this->activation_history->updateActivationHistory();
    }
}