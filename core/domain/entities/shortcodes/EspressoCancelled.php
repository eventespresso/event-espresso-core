<?php

namespace EventEspresso\core\domain\entities\shortcodes;

use EE_Cart;
use EE_Registration;
use EE_Registry;
use EE_Transaction;
use EventEspresso\core\services\shortcodes\EspressoShortcode;

/**
 * Class EspressoCancelled
 * generates content for the ESPRESSO_CANCELLED shortcode
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.26
 */
class EspressoCancelled extends EspressoShortcode
{


    /**
     * the actual shortcode tag that gets registered with WordPress
     *
     * @return string
     */
    public function getTag()
    {
        return 'ESPRESSO_CANCELLED';
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
        $this->shortcodeHasBeenInitialized();
    }


    /**
     * callback that runs when the shortcode is encountered in post content.
     * IMPORTANT !!!
     * remember that shortcode content should be RETURNED and NOT echoed out
     *
     * @param array $attributes
     * @return string
     * @throws \EE_Error
     */
    public function processShortcode($attributes = array())
    {
        $transaction = EE_Registry::instance()->SSN->get_session_data('transaction');
        if ($transaction instanceof EE_Transaction) {
            do_action('AHEE__EES_Espresso_Cancelled__process_shortcode__transaction', $transaction);
            $registrations = $transaction->registrations();
            foreach ($registrations as $registration) {
                if ($registration instanceof EE_Registration) {
                    do_action('AHEE__EES_Espresso_Cancelled__process_shortcode__registration', $registration);
                }
            }
        }
        do_action('AHEE__EES_Espresso_Cancelled__process_shortcode__clear_session');
        // remove all unwanted records from the db
        if (EE_Registry::instance()->CART instanceof EE_Cart) {
            EE_Registry::instance()->CART->delete_cart();
        }
        // phpcs:disable WordPress.WP.I18n.UnorderedPlaceholdersText
        EE_Registry::instance()->SSN->clear_session(__CLASS__, __FUNCTION__);
        return sprintf(
            __(
                '%sAll unsaved registration information entered during this session has been deleted.%s',
                'event_espresso'
            ),
            '<p class="ee-registrations-cancelled-pg ee-attention">',
            '</p>'
        );
        // phpcs:enable
    }
}
