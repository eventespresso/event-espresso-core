<?php
namespace EventEspresso\core\domain\entities\shortcodes;

use EE_Event;
use EE_Registry;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\services\shortcodes\EspressoShortcode;
use InvalidArgumentException;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EspressoTicketSelector
 * ESPRESSO_TICKET_SELECTOR shortcode
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class EspressoTicketSelector extends EspressoShortcode
{



    /**
     * the actual shortcode tag that gets registered with WordPress
     *
     * @return string
     */
    public function getTag()
    {
        return 'ESPRESSO_TICKET_SELECTOR';
    }



    /**
     * the time in seconds to cache the results of the processShortcode() method
     * 0 means the processShortcode() results will NOT be cached at all
     *
     * @return int
     */
    public function cacheExpiration()
    {
        return 0;
    }


    /**
     * a place for adding any initialization code that needs to run prior to wp_header().
     * this may be required for shortcodes that utilize a corresponding module,
     * and need to enqueue assets for that module
     *
     * @return void
     */
    public function initializeShortcode()
    {
        add_filter('FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', '__return_true');
        $this->shortcodeHasBeenInitialized();
    }



    /**
     * callback that runs when the shortcode is encountered in post content.
     * IMPORTANT !!!
     * remember that shortcode content should be RETURNED and NOT echoed out
     *
     * @param array $attributes
     * @return string
     * @throws InvalidArgumentException
     */
    public function processShortcode($attributes = array())
    {
        extract($attributes, EXTR_OVERWRITE);
        $event_id = isset($event_id) ? $event_id : 0;
        $event = EE_Registry::instance()->load_model('Event')->get_one_by_ID($event_id);
        if (! $event instanceof EE_Event) {
            new ExceptionStackTraceDisplay(
                new InvalidArgumentException(
                    sprintf(
                        esc_html__(
                            'A valid Event ID is required to use the "%1$s" shortcode.%4$sAn Event with an ID of "%2$s" could not be found.%4$sPlease verify that the shortcode added to this post\'s content includes an "%3$s" argument and that it\'s value corresponds to a valid Event ID.',
                            'event_espresso'
                        ),
                        $this->getTag(),
                        $event_id,
                        'event_id',
                        '<br />'
                    )
                )
            );
            return '';
        }
        ob_start();
        do_action('AHEE_event_details_before_post', $event_id);
        espresso_ticket_selector($event);
        do_action('AHEE_event_details_after_post');
        return ob_get_clean();
    }


}
// End of file EspressoTicketSelector.php
// Location: EventEspresso\core\domain\entities\shortcodes/EspressoTicketSelector.php