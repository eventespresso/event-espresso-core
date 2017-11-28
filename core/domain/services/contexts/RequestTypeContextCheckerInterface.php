<?php
namespace EventEspresso\core\domain\services\contexts;

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * RequestTypeContextCheckerInterface
 * Service class that provides useful methods for evaluating the current request type
 *
 * @package EventEspresso\core\domain\services\contexts
 * @author  Brent Christensen
 * @since   4.9.53
 */
interface RequestTypeContextCheckerInterface
{

    /**
     * @return bool
     */
    public function isActivation();


    /**
     * @param $is_activation
     * @return bool
     */
    public function setIsActivation($is_activation);


    /**
     * @return bool
     */
    public function isAdmin();


    /**
     * @return bool
     */
    public function isAdminAjax();


    /**
     * @return bool
     */
    public function isApi();


    /**
     * @return bool
     */
    public function isCli();


    /**
     * @return bool
     */
    public function isCron();


    /**
     * @return bool
     */
    public function isEeAjax();


    /**
     * @return bool
     */
    public function isFeed();


    /**
     * @return bool
     */
    public function isFrontend();


    /**
     * @return bool
     */
    public function isFrontAjax();


    /**
     * @return bool
     */
    public function isIframe();


    /**
     * @return bool
     */
    public function isOtherAjax();


    /**
     * @return string
     */
    public function slug();
}
