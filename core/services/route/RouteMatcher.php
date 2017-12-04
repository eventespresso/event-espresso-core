<?php
namespace EventEspresso\core\services\route;

use Closure;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\request\RequestInterface;
use InvalidArgumentException;

/**
 * RouteMatcher
 * This class should be injected into any service that needs to determine whether the process is running on a specific
 * named "route match".  Route matches are defined by an instance of RouteMatchConfig and is any route that is a match
 * per the closure doing the conditional check in the class instance.
 *
 * Typical usage would be for client code to use this to do logic like:
 * "If we're on a route that matches RouteMatcher::ROUTE_ADMIN_ANY_EE. Then do this."
 *
 * @package EventEspresso\core\services\route
 * @author  Darren Ethier
 * @since   4.9.53.rc
 */
final class RouteMatcher
{
    const ROUTE_ANY = 'on_every_route';
    const ROUTE_ADMIN_ANY = 'on_any_admin_route';
    const ROUTE_ADMIN_ANY_EE = 'on_any_ee_admin_route';
    const ROUTE_NONE = 'on_no_route';

    /**
     * @var RouteMatcherConfigCollection
     */
    private $route_matcher_collection;


    /**
     * @var RequestInterface
     */
    private $request;


    /**
     * @var array
     */
    private $registered_route_match_identifiers;


    /**
     * This will contain route match identifiers that are protected.  This means any attempts to register a route
     * route matcher with this identifier will fail.
     * @var array
     */
    private $protected_route_match_identifiers;


    /**
     * RouteMatcher constructor.
     *
     * @param RouteMatcherConfigCollection $route_matcher_collection
     * @param RequestInterface             $request
     * @throws InvalidEntityException
     */
    public function __construct(
        RouteMatcherConfigCollection $route_matcher_collection,
        RequestInterface $request
    ) {
        $this->route_matcher_collection = $route_matcher_collection;
        $this->request = $request;
        $this->initialize();
    }


    /**
     * Initializes the registered route_match_identifiers and adds the default RouteMatchConfigs.
     *
     * @throws InvalidEntityException
     */
    private function initialize()
    {
        /**
         * These cannot be filtered.
         */
        $this->protected_route_match_identifiers = array(
            self::ROUTE_ANY,
            self::ROUTE_ADMIN_ANY,
            self::ROUTE_ADMIN_ANY_EE,
            self::ROUTE_NONE
        );
        $this->registered_route_match_identifiers = (array) apply_filters(
            'FHEE__EventEspresso_core_services_route_RouteMatcherConfig__registered_route_match_identifiers',
            array(
            )
        );
        $this->registered_route_match_identifiers = array_merge(
            $this->registered_route_match_identifiers,
            $this->protected_route_match_identifiers
        );
        $this->addDefaultRouteMatcherConfigs();
    }


    /**
     * Adds default RouteMatchConfig objects to the collection.
     *
     * @throws InvalidEntityException
     */
    private function addDefaultRouteMatcherConfigs()
    {
        /** @noinspection PhpUnusedLocalVariableInspection */
        $request = $this->request;
        $this->route_matcher_collection->add(
            new RouteMatcherConfig(
                self::ROUTE_ANY,
                function () {
                    return true;
                }
            )
        );
        $this->route_matcher_collection->add(
            new RouteMatcherConfig(
                self::ROUTE_ADMIN_ANY,
                function (RequestInterface $request) {
                    return $request->isAdmin();
                }
            )
        );
        $this->route_matcher_collection->add(
            new RouteMatcherConfig(
                self::ROUTE_ADMIN_ANY_EE,
                function (RequestInterface $request) {
                    $matching_ee_admin_slugs = apply_filters(
                        'FHEE__EventEspresso_core_services_route_RouteMatcher__ee_admin_page_slugs'
                        . RouteMatcher::ROUTE_ADMIN_ANY_EE,
                        array(
                            'espresso_events',
                            'espresso_registrations',
                            'espresso_transactions',
                            'espresso_messages',
                            'pricing',
                            'espresso_registration_form',
                            'espresso_venues',
                            'espresso_general_settings',
                            'espresso_payment_settings',
                            'espresso_packages',
                            'espresso_maintenance_settings',
                            'espresso_support',
                            'espresso_about'
                        )
                    );
                    return $request->isAdmin()
                           && in_array(
                               $request->getRequestParam('page', 'non_match'),
                               $matching_ee_admin_slugs,
                               true
                           );
                }
            )
        );
        $this->route_matcher_collection->add(
            new RouteMatcherConfig(
                self::ROUTE_NONE,
                function () {
                    return false;
                }
            )
        );
    }


    /**
     * Allows client code to register a new route matcher config with the given properties.
     * Note: This validates the `$name` against the  list of registered_route_match_identifiers.  If a custom
     * RouteMatchConfig is being added then the
     * `FHEE__EventEspresso_core_services_route_RouteMatcherConfig__registered_route_match_identifiers` filter
     * should be used to register additional registered identifiers.
     *
     * @param string  $identifier
     * @param Closure $callback
     * @throws InvalidArgumentException
     */
    public function addRouteMatchConfig($identifier, Closure $callback)
    {
        $identifier = (string) $identifier;
        if (in_array($identifier, $this->protected_route_match_identifiers, true)) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'The %1$s is a protected identifier for core route matchers.  Please use a different identifier string for your route matcher configuration.',
                        'event_espresso'
                    ),
                    $identifier
                )
            );
        }
        $this->route_matcher_collection->add(
            new RouteMatcherConfig(
                $identifier,
                $callback
            )
        );
    }


    /**
     * @param $route_matcher_identifier
     * @return bool
     * @throws InvalidArgumentException
     */
    public function isOnRoute($route_matcher_identifier)
    {
        $route_matcher_identifier = (string) $route_matcher_identifier;
        if (! $this->isValidRouteMatcherConfigIdentifier($route_matcher_identifier)) {
            throw new InvalidArgumentException(
                sprintf(
                    esc_html__(
                        'The provided %1$s string for a %2$s identifier is not registered.',
                        'event_espresso'
                    ),
                    $route_matcher_identifier,
                    '\EventEspresso\core\services\route\RouteMatcherConfig'
                )
            );
        }
        if ($this->route_matcher_collection->has($route_matcher_identifier)) {
            return $this->route_matcher_collection->get($route_matcher_identifier)->onRoute($this->request);
        }
    }


    /**
     * Validates whether the provided identifier for a route matcher config is registered or not.
     * @param $route_matcher_identifier
     * @return bool
     */
    private function isValidRouteMatcherConfigIdentifier($route_matcher_identifier)
    {
        return in_array($route_matcher_identifier, $this->registered_route_match_identifiers, true);
    }
}
