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
     * @param bool $throw_exceptions
     */
    public function setThrowExceptions($throw_exceptions);

    /**
     * @return bool
     */
    public function getThrowExceptions();

    /**
     * Converts NoticesContainerInterface objects into other format
     *
     * @param NoticesContainerInterface $notices
     * @return
     */
    public function process(NoticesContainerInterface $notices);

    /**
     * @return void;
     */
    public function clearNotices();


}