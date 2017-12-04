<?php

namespace EventEspresso\core\services\notices;

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Class Notice
 * DTO for temporarily holding notification information until it can be processed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.53.rc
 */
interface NoticeInterface
{

    /**
     * @return string
     */
    public function type();


    /**
     * @return string
     */
    public function message();


    /**
     * @return bool
     */
    public function isDismissible();


    /**
     * @return bool
     */
    public function isPersistent();


    /**
     * @return string
     */
    public function getIdentifier();


    /**
     * Fluent setter for setting the file/function/line properties.
     * @param $file
     * @param $function
     * @param $line
     * @return NoticeInterface
     */
    public function setFileFunctionLine($file, $function, $line);


    /**
     * Fluent setter for setting whether the notice should be dismissible or not.
     * @param bool $dismissible
     * @return NoticeInterface
     */
    public function setDismissible($dismissible = true);


    /**
     * Fluent setter for setting what RouteMatchConfig should be used for determining if the notice applies to that
     * route.
     * @param string $route_match_config_identifier
     * @return NoticeInterface
     */
    public function setRouteMatchConfigIdentifier($route_match_config_identifier);


    /**
     * Returns what was set as the RouteMatchConfigIdentifier string attached to this notice.
     *
     * @return string
     */
    public function getRouteMatchConfigIdentifier();


    /**
     * Whether this notice has been set for ignoring any internal dismissed flags set.
     * @return bool
     */
    public function dismissedOverridden();


    /**
     * Fluent setter for overriding the internal dismissed flag.  This applies when the dismissed item is persisted to
     * the db.
     *
     * @param bool $override_dismissed
     * @return NoticeInterface
     */
    public function overrideDismissed($override_dismissed);


    /**
     * Return whether the notice has been dismissed.
     * @return bool
     */
    public function isDismissed();


    /**
     * Fluent setter for setting whether the notice was dismissed by the user.
     * @param $dismissed
     * @return NoticeInterface
     */
    public function setDismissed($dismissed);


    /**
     * Fluent setter for flagging the notice as a persistent notice (a notice that persists across all defined routes
     * until dismissed.
     * @return NoticeInterface
     */
    public function setPersistent();



    /**
     * @return string
     */
    public function file();


    /**
     * @return string
     */
    public function func();


    /**
     * @return string
     */
    public function line();


    /**
     * Returns whether the notice has been automatically processed in the request yet or not.
     * @return bool
     */
    public function isProcessed();


    /**
     * Fluent setter for flagging that the notice has been processed.
     * @return NoticeInterface
     */
    public function setProcessed();


    /**
     * Fluent setter for setting the capability and capability context.
     *
     * @param string $capability
     * @param string $capability_context
     * @return NoticeInterface
     */
    public function setCapabilityRequired($capability, $capability_context);


    /**
     * Fluent setter used to set that the notice should be purged from any persistence (mostly for Persistent notices)
     *
     * @param bool $purge
     * @return NoticeInterface
     */
    public function setPurge($purge);


    /**
     * Return whether to purge this notice or not.
     * @return bool
     */
    public function purge();


    /**
     * Return the notice properties as an array of key/value pairs where the key is the property name and the value is
     * the value on the property.
     * @return array
     */
    public function toArray();


    /**
     * Fluent setter for setting the notice to display on the next request.
     * @param $show
     * @return NoticeInterface
     */
    public function setShowOnNextRequest($show);


    /**
     * Whether the notice should show on the next request or not.
     * @return bool
     */
    public function showOnNextRequest();
}
