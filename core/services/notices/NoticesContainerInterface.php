<?php

namespace EventEspresso\core\services\notices;

defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * NoticesContainerInterface
 * Container for holding multiple Notice objects until they can be processed
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
interface NoticesContainerInterface
{

    /**
     * For adding a generic notice type.
     * @param $type
     * @param $identifier
     * @param $message
     * @return Notice
     */
    public function addNotice($type, $identifier, $message);

    /**
     * @param string $identifier
     * @param string $message
     * @return Notice
     */
    public function addInformation($identifier, $message);


    /**
     * @param string $identifier
     * @param string $message
     * @return Notice
     */
    public function addAttention($identifier, $message);



    /**
     * @param string $identifier
     * @param string $message
     * @return Notice
     */
    public function addError($identifier, $message);



    /**
     * @param string $identifier
     * @param string $message
     * @return Notice
     */
    public function addSuccess($identifier, $message);


    /**
     * @param $type
     * @return bool
     */
    public function hasForType($type);

    /**
     * @return boolean
     */
    public function hasInformation();



    /**
     * @return boolean
     */
    public function hasAttention();



    /**
     * @return boolean
     */
    public function hasError();



    /**
     * @return boolean
     */
    public function hasSuccess();


    /**
     * @param $type
     * @return int
     */
    public function countForType($type);

    /**
     * @return int
     */
    public function countInformation();



    /**
     * @return int
     */
    public function countAttention();



    /**
     * @return int
     */
    public function countError();



    /**
     * @return int
     */
    public function countSuccess();


    /**
     * @param $type
     * @return NoticeInterface[]
     */
    public function getNoticesForType($type);


    /**
     * @return NoticeInterface[]
     */
    public function getInformation();



    /**
     * @return NoticeInterface[]
     */
    public function getAttention();



    /**
     * @return NoticeInterface[]
     */
    public function getError();



    /**
     * @return NoticeInterface[]
     */
    public function getSuccess();


    /**
     * Returns all persistent notices stored in the container.
     *
     * @param NoticeInterface[] $notices Optionally can only get the persistent notices from the provided array of
     *                                   NoticeInterface objects
     * @return NoticeInterface[]
     */
    public function getPersistentNotices(array $notices = array());



    /**
     * Returns the specific notice matching the given identifier
     *
     * @param string $identifier
     * @return NoticeInterface
     */
    public function getNotice($identifier);


    /**
     * Returns all notices flagged for showing on the next request stored in the container.
     *
     * @param array NoticeInterface $notices Optionally will get the notices flagged for showing on the next request
     *                                       from the provided array of NoticeInterface objects.
     * @return NoticeInterface[]
     */
    public function getNoticesShownOnNextRequest(array $notices = array());


    /**
     * Runs the given converter on all the notices in the container.  If its a converter that returns the processed
     * notices, this will return them (i.e. jsonified notices).
     *
     * @param string $notice_converter_identifier
     * @param NoticeInterface[]  $notices  Optionally a specific provided array of notices can be converted.  If not
     *                                     provided then all unprocessed notices in the container will be processed by
     *                                     the converter.
     * @return NoticeInterface[]|void
     */
    public function convertNotices($notice_converter_identifier, array $notices = array());
}
