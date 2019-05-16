<?php

namespace EventEspresso\core\services\request\files;

/**
 * Class FileSubmissionInterface
 *
 * Data concerning a file that was submitted via an HTML form.
 *
 * @package     Event Espresso
 * @author         Mike Nelson
 * @since         4.9.80.p
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
     * Should just return the filename.
     * @since 4.9.80.p
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
