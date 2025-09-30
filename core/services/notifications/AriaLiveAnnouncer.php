<?php

namespace EventEspresso\core\services\notifications;

/**
 * AriaLiveAnnouncer
 *
 * @package     Event Espresso
 * @subpackage  EventEspresso\core\services\notifications
 * @author      Brent Christensen
 * @since       5.0.47
 */
class AriaLiveAnnouncer
{

    public static function setHooks() {
        add_action('wp_footer', [AriaLiveAnnouncer::class, 'ariaLiveRegion'], 9999);
    }


    public static function ariaLiveRegion()
    {
        echo '
        <div id="espresso-aria-live-region"
             class="screen-reader-text"
             aria-live="polite"
             aria-atomic="true"
        ></div>';
    }

}
