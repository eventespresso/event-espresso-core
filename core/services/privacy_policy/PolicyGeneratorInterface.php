<?php

namespace EventEspresso\core\services\privacy_policy;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class PolicyGeneratorInterface
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
interface PolicyGeneratorInterface
{

    /**
     * Returns the translated name to display in this privacy policy's section's title
     * @return string
     */
    public function getName();



    /**
     * Returns the suggested privacy policy content for this plugin. May contain HTML
     * @return string
     */
    public function getContent();


}
// End of file PolicyGeneratorInterface.php
// Location: EventEspresso\core\domain\services\admin/PolicyGeneratorInterface.php