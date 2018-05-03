<?php

namespace EventEspresso\core\domain\services\admin\privacy\policy;

use EEH_Template;
use EventEspresso\core\services\privacy\policy\PrivacyPolicyInterface;

defined('EVENT_ESPRESSO_VERSION') || exit('No direct script access allowed');



/**
 * Class PrivacyPolicy
 * Class describes the Event Espresso core plugin's privacy policy.
 *
 * @package        Event Espresso
 * @author         Mike Nelson
 * @since          $VID:$
 */
class PrivacyPolicy implements PrivacyPolicyInterface
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
// End of file PrivacyPolicy.php
// Location: EventEspresso\core\domain\services\admin\privacy\policy\PrivacyPolicy.php