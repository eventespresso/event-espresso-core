<?php

namespace EventEspresso\core\services\privacy\erasure;

/**
 * Class PersonalDataEraserInterface
 * Interfacing for classes that define a private data eraser (see https://core.trac.wordpress.org/ticket/43602).
 * When a request to erase an email address' data, WordPress invokes the erasers, and the PersonalDataEraserManager
 * will take care of registering this class' erase method as a private data eraser.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          4.9.62.p
 */
interface PersonalDataEraserInterface
{

    /**
     * Gets a translated string name for the data eraser
     *
     * @return string
     */
    public function name();


    /**
     * Erases a "page" of personal user data
     *
     * @return array {
     * @type boolean $items_removed  whether items were removed successfully or not
     * @type boolean $items_retained whether any items were skipped or not
     * @type array   $messages       values are messages to show
     * @type boolean $done           whether this eraser is done or has more pages
     *               }
     */
    public function erase($email_address, $page = 1);
}
// End of file PersonalDataEraserInterface.php
// Location: EventEspresso\core\domain\services\admin/PersonalDataEraserInterface.php
