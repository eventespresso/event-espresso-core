<?php

namespace EventEspresso\core\domain\entities\routing\handlers\frontend;

use EE_Core_Config;
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
                || $this->request->getRequestParam('action', '', DataType::STRING) === 'display_spco_reg_step'
                || $this->request->getRequestParam('action', '', DataType::STRING) === 'process_reg_step'
                || $this->request->getRequestParam('action', '', DataType::STRING) === 'update_reg_step'
                || $this->isRegCheckoutPage()
            );
    }


    /**
     * true if the request is for the configured reg checkout page,
     * by page_id (plain permalinks) or by its permalink path (custom slugs)
     *
     * @since 5.0.61
     */
    protected function isRegCheckoutPage(): bool
    {
        /** @var EE_Core_Config $core_config */
        $core_config = $this->loader->getShared(EE_Core_Config::class);
        $reg_page_id = $core_config->reg_page_id;
        if (! $reg_page_id) {
            return false;
        }
        if ($this->request->getRequestParam('page_id', 0, DataType::INT) === $reg_page_id) {
            return true;
        }
        $reg_page_path = wp_parse_url((string) get_permalink($reg_page_id), PHP_URL_PATH);
        $request_path  = wp_parse_url($this->request->requestUri(), PHP_URL_PATH);
        // a home path (plain permalinks) would match every front page request
        if (! $reg_page_path || ! $request_path || $reg_page_path === wp_parse_url(home_url('/'), PHP_URL_PATH)) {
            return false;
        }
        return untrailingslashit(rawurldecode($request_path)) === untrailingslashit(rawurldecode($reg_page_path));
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
