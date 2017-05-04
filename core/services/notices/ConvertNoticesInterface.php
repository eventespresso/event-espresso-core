<?php

namespace EventEspresso\core\services\notices;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class ConvertNotices
 * Converts notifications in a NoticesInterface container into another format such as EE_Error notifications
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
interface ConvertNoticesInterface
{

    /**
     * @return NoticesInterface
     */
    public function getNotices();



    /**
     * @return bool
     */
    public function getThrowExceptions();



    /**
     * Converts NoticesInterface objects into other format
     */
    public function process();
}