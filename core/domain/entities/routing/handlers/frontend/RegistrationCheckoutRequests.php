<?php

namespace EventEspresso\core\domain\entities\routing\handlers\frontend;

use EventEspresso\core\services\request\DataType;

/**
 * Class RegistrationCheckoutRequests
 * runs during the registration checkout process
 *
 * @package EventEspresso\core\domain\entities\routing\handlers\frontend
 * @author  Brent Christensen
 * @since   5.0.30.p
 */
class RegistrationCheckoutRequests extends FrontendRequests
{
    /**
     * returns true if the current request matches this route
     * child classes can override and use Request directly to match route with request
     * or supply a RouteMatchSpecification class and just use the below
     *
     * @return bool
     * @since   5.0.0.p
     */
    public function matchesCurrentRequest(): bool
    {
        return parent::matchesCurrentRequest()
            && (
                str_contains($this->request->requestUri(false, true), 'registration-checkout')
                || $this->request->getRequestParam('action', '', DataType::STRING) === 'process_reg_step'
                || $this->request->getRequestParam('action', '', DataType::STRING) === 'display_spco_reg_step'
            );
    }


    /**
     * @since 5.0.0.p
     */
    protected function registerDependencies()
    {

    }


    /**
     * implements logic required to run during request
     *
     * @return bool
     * @since   5.0.0.p
     */
    protected function requestHandler(): bool
    {
        do_action(
            'AHEE__EventEspresso_core_domain_entities_routing_handlers_frontend_RegistrationCheckoutRequests__requestHandler'
        );
        return true;
    }
}
