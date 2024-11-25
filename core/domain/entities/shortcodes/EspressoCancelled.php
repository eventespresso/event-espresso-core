<?php

namespace EventEspresso\core\domain\entities\shortcodes;

use EE_Cart;
use EE_Error;
use EE_Registration;
use EE_Session;
use EE_Transaction;
use EEM_Registration;
use EventEspresso\core\domain\services\registration\CancelRegistrationForm;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\shortcodes\EspressoShortcode;
use ReflectionException;
use Exception;

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
    private ?RequestInterface $request = null;


    public function request(): RequestInterface
    {
        if (! $this->request instanceof RequestInterface) {
            $this->request = LoaderFactory::getShared(RequestInterface::class);
        }
        return $this->request;
    }



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
     * @param array|string $attributes
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function processShortcode($attributes = array())
    {
        $reg_url_link = $this->request()->getRequestParam('e_reg_url_link', '');
        if (! $reg_url_link) {
            return $this->clearCartAndCancelAllRegistrations();
        }
        $registration = EEM_Registration::instance()->get_registration_for_reg_url_link($reg_url_link);
        if (! $registration instanceof EE_Registration) {
            return sprintf(
                esc_html__(
                    '%1$sCould not find registration for the REG URL link: %2$s',
                    'event_espresso'
                ),
                '<p class="ee-registrations-cancelled-pg ee-attention">',
                $reg_url_link . '</p>'
            );
        }
        $confirmation_code = $this->request()->getRequestParam('confirmation_code', '');
        $confirmation_code = strtoupper((string) $confirmation_code);
        if (! $confirmation_code) {
            return $this->cancelRegistrationConfirmationForm($registration);
        }
        return $this->cancelRegistration($registration, $confirmation_code);
    }


    /**
     * @param EE_Registration $registration
     * @return string
     * @throws EE_Error
     * @since 5.0.30.p
     */
    private function cancelRegistrationConfirmationForm(EE_Registration $registration): string
    {
        $form  = new CancelRegistrationForm($registration);
        return $form->display();
    }


    /**
     * @param EE_Registration $registration
     * @param string          $confirmation_code
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.30.p
     */
    private function cancelRegistration(EE_Registration $registration, string $confirmation_code): string
    {
        if ($confirmation_code !== $registration->cancelRegistrationConfirmationCode()) {
            return sprintf(
                esc_html__(
                    '%1$sThe confirmation code provided does not match the confirmation code for this registration!%2$s',
                    'event_espresso'
                ),
                '<p class="ee-registrations-cancelled-pg ee-attention">',
                $registration->reg_url_link() . '</p>'
            );
        }

        try {
            $form   = new CancelRegistrationForm($registration);
            return $form->process($this->request->postParams());
        } catch (Exception $exception) {
            return sprintf(
                esc_html__(
                    '%1$sThe following error occurred and the one or more registrations could not be cancelled:%2$s',
                    'event_espresso'
                ),
                '<p class="ee-registrations-cancelled-pg ee-attention">',
                '<br>' . $exception->getMessage() . '</p>'
            );
        }
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @since 5.0.30.p
     */
    private function clearCartAndCancelAllRegistrations(): string
    {
        $session = LoaderFactory::getShared(EE_Session::class);
        if (! $session instanceof EE_Session) {
            return '';
        }
        $transaction = $session->get_session_data('transaction');
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
        if ($session->cart() instanceof EE_Cart) {
            $session->cart()->delete_cart();
        }
        $session->clear_session(__CLASS__, __FUNCTION__);
        // phpcs:disable WordPress.WP.I18n.UnorderedPlaceholdersText
        return sprintf(
            esc_html__(
                '%sAll unsaved registration information entered during this session has been deleted.%s',
                'event_espresso'
            ),
            '<p class="ee-registrations-cancelled-pg ee-attention">',
            '</p>'
        );
        // phpcs:enable
    }
}
