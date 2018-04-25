<?php

namespace EventEspresso\core\domain\services\admin\privacy_policy;

use EEH_Template;
use EventEspresso\core\services\privacy_policy\PolicyGeneratorInterface;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class Core
 * Description
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class PolicyGenerator implements PolicyGeneratorInterface
{

    /**
     * Returns the name of the plugin and will be shown in the privacy policy's postbox header
     * @return string
     */
    public function getName()
    {
        return esc_html__('Event Espresso', 'event_espresso');
    }



    /**
     * Gets the HTML for the privacy policy. May be dynamic
     * @return string
     */
    public function getContent()
    {
        return (string)EEH_Template::display_template(
            __DIR__ . '/privacy_policy.template.php',
            array(),
            true
        );
    }



}
// End of file Core.php
// Location: EventEspresso\core\domain\services\admin/Core.php