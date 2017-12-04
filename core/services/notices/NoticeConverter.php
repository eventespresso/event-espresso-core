<?php

namespace EventEspresso\core\services\notices;

use EventEspresso\core\domain\services\capabilities\RequiresCapCheckInterface;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\route\RouteMatcher;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class NoticeConverter
 * Converts notifications in a NoticesContainerInterface container into another format such as EE_Error notifications
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.53.rc
 */
abstract class NoticeConverter implements NoticeConverterInterface
{

    /**
     * @var NoticesContainerInterface $notices
     */
    private $notices;



    /**
     * @var RouteMatcher
     */
    private $route_matcher;


    /**
     * @var string
     */
    private $route_match_identifier;


    /**
     * NoticeConverter constructor.
     *
     * @param NoticesContainerInterface $notices
     * @param RouteMatcher              $route_matcher
     * @param string                    $route_match_identifier
     */
    public function __construct(
        NoticesContainerInterface $notices,
        RouteMatcher $route_matcher,
        $route_match_identifier = RouteMatcher::ROUTE_NONE
    ) {
        $this->setNotices($notices);
        $this->setRouteMatcher($route_matcher);
        $this->setRouteMatchIdentifier($route_match_identifier);
    }


    /**
     * @param NoticesContainerInterface $notices
     */
    private function setNotices(NoticesContainerInterface $notices)
    {
        $this->notices = $notices;
    }


    /**
     * @param RouteMatcher $route_matcher
     */
    private function setRouteMatcher(RouteMatcher $route_matcher)
    {
        $this->route_matcher = $route_matcher;
    }


    private function setRouteMatchIdentifier($route_match_identifier)
    {
        $this->route_match_identifier = (string) $route_match_identifier;
    }


    /**
     * Default identifier for all converters.
     *
     * Any converter that should be automatically loaded on a specific route should override this and return whatever
     * route matcher matches the route it should load on.
     *
     * @return string
     */
    private function getRouteMatcherIdentifier()
    {
        return RouteMatcher::ROUTE_NONE;
    }


    /**
     * @return NoticesContainerInterface
     */
    protected function getNotices()
    {
        return $this->notices;
    }


    /**
     * @return RouteMatcher
     */
    protected function getRouteMatcher()
    {
        return $this->route_matcher;
    }


    /**
     * Return whether the converter should be the default used for processing notices
     * on the provided request.
     *
     * @return bool
     * @throws InvalidArgumentException
     */
    public function useForRequest()
    {
        return $this->getRouteMatcher()->isOnRoute($this->getRouteMatcherIdentifier());
    }


    /**
     * This converter does not automatically execute on a request. So no hook is set.
     * @return void
     */
    public function setHookForRequest()
    {
        //defaults to doing nothing, Child classes should override.
        return;
    }


    /**
     * Simply does a cap check on the provided notice to determine whether it can be used or not.
     *
     * @param NoticeInterface $notice
     * @return bool
     */
    protected function canUseByCapability($notice)
    {
        // if notice implements RequiresCapCheckInterface then let's check the capability, otherwise its
        // viewable by anyone.
        return $notice instanceof RequiresCapCheckInterface
            ? current_user_can(
                $notice->getCapCheck()->capability(),
                $notice->getCapCheck()->ID()
            )
            : true;
    }
}
