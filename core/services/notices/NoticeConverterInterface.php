<?php

namespace EventEspresso\core\services\notices;

use EventEspresso\core\services\request\RequestInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class NoticeConverter
 * Converts notifications in a NoticesContainerInterface container into another format such as EE_Error notifications
 * Notice converters are added to a stack and then a default will be set for the given request for handling any
 * automatic output of notices.  However client code can retrieve a specific notice converter to use for its own use if
 * necessary.
 *
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.53.rc
 */
interface NoticeConverterInterface
{

    /**
     * Converts NoticeInterface objects into other format and returns the converted notices in a collection.
     *
     * @param NoticeInterface[]         $notices
     * @param bool                      $throw_exceptions  Whether or not to throw exceptions.
     * @return mixed|void
     */
    public function process(array $notices = array(), $throw_exceptions = false);


    /**
     * Return whether the converter should be the default used for processing notices
     * on the provided request.
     * @return bool
     */
    public function useForRequest();


    /**
     * This is the hook should be the hook the converter is set on if it wins as the default for the request.
     * @return void
     */
    public function setHookForRequest();



    /**
     * Should return whether the notice can be used or not.
     * @param NoticeInterface $notice
     * @return bool
     */
    public function useNotice(NoticeInterface $notice);
}
