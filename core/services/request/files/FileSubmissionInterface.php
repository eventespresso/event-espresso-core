<?php

namespace EventEspresso\core\services\request\files;

/**
 * Class FileSubmissionInterface
 *
 * Description
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         $VID:$
 *
 */
interface FileSubmissionInterface
{

    /**
     * @return string
     */
    public function getName();

    /**
     * @return string
     */
    public function getType();

    /**
     * @return int
     */
    public function getSize();

    /**
     * @return string
     */
    public function getTmpFile();

    /**
     * @since $VID:$
     * @return string
     */
    public function __toString();

    /**
     * @return string
     */
    public function getErrorCode();
}
// End of file FileSubmissionInterface.php
// Location: EventEspresso\core\services\request\files/FileSubmissionInterface.php
