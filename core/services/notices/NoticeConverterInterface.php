<?php

namespace EventEspresso\core\services\notices;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class NoticeConverter
 * Converts notifications in a NoticesContainerInterface container into another format such as EE_Error notifications
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
interface NoticeConverterInterface
{

    /**
     * @return NoticesContainerInterface
     */
    public function getNotices();



    /**
     * @return bool
     */
    public function getThrowExceptions();



    /**
     * Converts NoticesContainerInterface objects into other format
     */
    public function process();
}