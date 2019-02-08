<?php

namespace EventEspresso\core\domain\services\contexts;

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
     * true if the current request involves some form of activation
     *
     * @return bool
     */
    public function isActivation();


    /**
     * @param $is_activation
     * @return bool
     */
    public function setIsActivation($is_activation);


    /**
     * true if the current request is for the admin and is not being made via AJAX
     *
     * @return bool
     */
    public function isAdmin();


    /**
     * true if the current request is for the admin AND is being made via AJAX
     * and the ajax request contains the request parameter "ee_admin_ajax"
     *
     * @return bool
     */
    public function isAdminAjax();


    /**
     * true if the current request is being made via AJAX... any AJAX
     *
     * @return bool
     */
    public function isAjax();


    /**
     * true if the current request is for the EE REST API
     *
     * @return bool
     */
    public function isApi();


    /**
     * true if the current request is from the command line
     *
     * @return bool
     */
    public function isCli();


    /**
     * true if the current request is for a WP_Cron
     *
     * @return bool
     */
    public function isCron();


    /**
     * true if the current request is for either the EE admin or EE frontend AND is being made via AJAX
     *
     * @return bool
     */
    public function isEeAjax();


    /**
     * true if the current request is for a feed (ie: RSS)
     *
     * @return bool
     */
    public function isFeed();


    /**
     * true if the current request is for the frontend and is not being made via AJAX
     *
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
     * true if the current request is being made via AJAX but is NOT for EE related logic
     *
     * @return bool
     */
    public function isOtherAjax();


    /**
     * true if the current request is for the WP REST API
     *
     * @return bool
     */
    public function isWordPressApi();


    /**
     * true if the current request is being made via AJAX for the WP Heartbeat
     *
     * @return bool
     */
    public function isWordPressHeartbeat();


    /**
     * true if the current request is a loopback sent from WP core to test for errors
     *
     * @return bool
     */
    public function isWordPressScrape();


    /**
     * @return string
     */
    public function slug();
}
