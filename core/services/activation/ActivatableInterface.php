<?php

namespace EventEspresso\core\services\activation;

/**
 * ActivatableInterface
 * defines classes that belong to a system that can be activated
 * such as EE_System (for core) or EE_Addon (for addons)
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.40
 */
interface ActivatableInterface
{


    /**
     * Gets the ActivationHistory object for this addon
     *
     * @return ActivationHistory
     */
    public function getActivationHistory();



    /**
     * @param ActivationHistory $activation_history
     */
    public function setActivationHistory(ActivationHistory $activation_history);



    /**
     * @return RequestType
     */
    public function getRequestType();



    /**
     * @param RequestType $request_type
     */
    public function setRequestType(RequestType $request_type);

}
