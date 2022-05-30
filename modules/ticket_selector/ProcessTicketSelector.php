<?php

namespace EventEspresso\modules\ticket_selector;

use EE_Cart;
use EE_Core_Config;
use EE_Error;
use EE_Session;
use EE_Ticket;
use EEH_Event_View;
use EEM_Ticket;
use EventEspresso\core\domain\services\factories\CartFactory;
use EEH_URL;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use Exception;
use InvalidArgumentException;
use ReflectionException;

// phpcs:disable WordPress.WP.I18n.UnorderedPlaceholdersSingle
// phpcs:disable WordPress.WP.I18n.UnorderedPlaceholdersPlural

/**
 * Class ProcessTicketSelector
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
class ProcessTicketSelector
{
    /**
     * @var EE_Cart $cart
     */
    private $cart;

    /**
     * @var EE_Core_Config $core_config
     */
    private $core_config;

    /**
     * @var RequestInterface $request
     */
    private $request;

    /**
     * @var EE_Session $session
     */
    private $session;

    /**
     * @var EEM_Ticket $ticket_model
     */
    private $ticket_model;

    /**
     * @var TicketDatetimeAvailabilityTracker $tracker
     */
    private $tracker;


    /**
     * ProcessTicketSelector constructor.
     * NOTE: PLZ use the Loader to instantiate this class if need be
     * so that all dependencies get injected correctly (which will happen automatically)
     * Null values for parameters are only for backwards compatibility but will be removed later on.
     *
     * @param EE_Core_Config                    $core_config
     * @param RequestInterface                           $request
     * @param EE_Session                        $session
     * @param EEM_Ticket                        $ticket_model
     * @param TicketDatetimeAvailabilityTracker $tracker
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function __construct(
        EE_Core_Config $core_config = null,
        RequestInterface $request = null,
        EE_Session $session = null,
        EEM_Ticket $ticket_model = null,
        TicketDatetimeAvailabilityTracker $tracker = null
    ) {
        $loader = LoaderFactory::getLoader();
        $this->core_config = $core_config instanceof EE_Core_Config
            ? $core_config
            : $loader->getShared('EE_Core_Config');
        $this->request = $request instanceof RequestInterface
            ? $request
            : $loader->getShared('EventEspresso\core\services\request\Request');
        $this->session = $session instanceof EE_Session
            ? $session
            : $loader->getShared('EE_Session');
        $this->ticket_model = $ticket_model instanceof EEM_Ticket
            ? $ticket_model
            : $loader->getShared('EEM_Ticket');
        $this->tracker = $tracker instanceof TicketDatetimeAvailabilityTracker
            ? $tracker
            : $loader->getShared('EventEspresso\modules\ticket_selector\TicketDatetimeAvailabilityTracker');
    }


    /**
     * cancelTicketSelections
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function cancelTicketSelections()
    {
        // check nonce
        if (! $this->processTicketSelectorNonce()) {
            return false;
        }
        $this->session->clear_session(__CLASS__, __FUNCTION__);
        if ($this->request->requestParamIsSet('event_id')) {
            EEH_URL::safeRedirectAndExit(
                EEH_Event_View::event_link_url(
                    $this->request->getRequestParam('event_id', 0, 'int')
                )
            );
        }
        EEH_URL::safeRedirectAndExit(
            site_url('/' . $this->core_config->event_cpt_slug . '/')
        );
        return true;
    }


    /**
     * processTicketSelectorNonce
     *
     * @return bool
     */
    private function processTicketSelectorNonce()
    {
        if (
            ! $this->request->isAdmin()
            && (
                ! $this->request->requestParamIsSet('cancel_ticket_selections_nonce')
                || ! wp_verify_nonce(
                    $this->request->getRequestParam('cancel_ticket_selections_nonce'),
                    'cancel_ticket_selections'
                )
            )
        ) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'We\'re sorry but your request failed to pass a security check.%sPlease click the back button on your browser and try again.',
                        'event_espresso'
                    ),
                    '<br/>'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        return true;
    }


    /**
     * process_ticket_selections
     *
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function processTicketSelections()
    {
        do_action('EED_Ticket_Selector__process_ticket_selections__before');
        if ($this->request->isBot()) {
            EEH_URL::safeRedirectAndExit(
                apply_filters(
                    'FHEE__EE_Ticket_Selector__process_ticket_selections__bot_redirect_url',
                    site_url()
                )
            );
        }
        // we should really only have 1 registration in the works now
        // (ie, no MER) so unless otherwise requested, clear the session
        if (apply_filters('FHEE__EE_Ticket_Selector__process_ticket_selections__clear_session', true)) {
            $this->session->clear_session(__CLASS__, __FUNCTION__);
        }
        // validate/sanitize/filter data
        $id = null;
        $valid = [];
        try {
            $post_data_validator = new ProcessTicketSelectorPostData($this->request);
            $id = $post_data_validator->getEventId();
            $valid               = apply_filters(
                'FHEE__EED_Ticket_Selector__process_ticket_selections__valid_post_data',
                $post_data_validator->validatePostData()
            );
        } catch (Exception $exception) {
            EE_Error::add_error($exception->getMessage(), __FILE__, __FUNCTION__, __LINE__);
        }
        // check total tickets ordered vs max number of attendees that can register
        if (! empty($valid) && $valid['total_tickets'] > $valid['max_atndz']) {
            $this->maxAttendeesViolation($valid);
        } else {
            // all data appears to be valid
            if ($this->processSuccessfulCart($this->addTicketsToCart($valid))) {
                return true;
            }
        }
        // die(); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< KILL BEFORE REDIRECT
        // at this point, just return if registration is being made from admin
        if ($this->request->isAdmin() || $this->request->isFrontAjax()) {
            return false;
        }
        if (! empty($valid['return_url'])) {
            EEH_URL::safeRedirectAndExit($valid['return_url']);
        }
        // do we have an event id?
        if ($id) {
            EEH_URL::safeRedirectAndExit(get_permalink($id));
        }
        echo EE_Error::get_notices(); // already escaped
        return false;
    }


    /**
     * @param array $valid
     */
    private function maxAttendeesViolation(array $valid)
    {
        // ordering too many tickets !!!
        $total_tickets_string = esc_html(
            _n(
                'You have attempted to purchase %s ticket.',
                'You have attempted to purchase %s tickets.',
                $valid['total_tickets'],
                'event_espresso'
            )
        );
        $limit_error_1 = sprintf($total_tickets_string, $valid['total_tickets']);
        // dev only message
        $max_attendees_string = esc_html(
            _n(
                'The registration limit for this event is %s ticket per registration, therefore the total number of tickets you may purchase at a time can not exceed %s.',
                'The registration limit for this event is %s tickets per registration, therefore the total number of tickets you may purchase at a time can not exceed %s.',
                $valid['max_atndz'],
                'event_espresso'
            )
        );
        $limit_error_2 = sprintf($max_attendees_string, $valid['max_atndz'], $valid['max_atndz']);
        EE_Error::add_error($limit_error_1 . '<br/>' . $limit_error_2, __FILE__, __FUNCTION__, __LINE__);
    }


    /**
     * @param array $valid
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function addTicketsToCart(array $valid)
    {
        $tickets_added = 0;
        $tickets_selected = false;
        if (! empty($valid['ticket-selections']) && $valid['total_tickets'] > 0) {
            // load cart using factory because we don't want to do so until actually needed
            $this->cart = CartFactory::getCart();
            // if the user is an admin that can edit registrations,
            // then we'll also allow them to add any tickets, even if they are expired
            $current_user_is_admin = current_user_can('ee_edit_registrations');
            // cycle thru the number of data rows sent from the event listing
            foreach ($valid['ticket-selections'] as $ticket_id => $qty) {
                if ($qty) {
                    // YES we have a ticket quantity
                    $tickets_selected = true;
                    $valid_ticket     = false;
                    // get ticket via the ticket id we put in the form
                    $ticket = $this->ticket_model->get_one_by_ID($ticket_id);
                    if ($ticket instanceof EE_Ticket && ($ticket->is_on_sale() || $current_user_is_admin)) {
                        $valid_ticket  = true;
                        $tickets_added += $this->addTicketToCart($ticket, $qty);
                    }
                    if ($valid_ticket !== true) {
                        // nothing added to cart retrieved
                        EE_Error::add_error(
                            sprintf(
                                esc_html__(
                                    'A valid ticket could not be retrieved for the event.%sPlease click the back button on your browser and try again.',
                                    'event_espresso'
                                ),
                                '<br/>'
                            ),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                    }
                    if (EE_Error::has_error()) {
                        break;
                    }
                }
            }
        }
        do_action(
            'AHEE__EE_Ticket_Selector__process_ticket_selections__after_tickets_added_to_cart',
            $this->cart,
            $this
        );
        if (! apply_filters('FHEE__EED_Ticket_Selector__process_ticket_selections__tckts_slctd', $tickets_selected)) {
            // no ticket quantities were selected
            EE_Error::add_error(
                esc_html__('You need to select a ticket quantity before you can proceed.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return $tickets_added;
    }


    /**
     * adds a ticket to the cart
     *
     * @param EE_Ticket $ticket
     * @param int       $qty
     * @return bool TRUE on success, FALSE on fail
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    private function addTicketToCart(EE_Ticket $ticket, $qty = 1)
    {
        // get the number of spaces left for this datetime ticket
        $available_spaces = $this->tracker->ticketDatetimeAvailability($ticket);
        // compare available spaces against the number of tickets being purchased
        if ($available_spaces >= $qty) {
            // allow addons to prevent a ticket from being added to cart
            if (
                ! apply_filters(
                    'FHEE__EE_Ticket_Selector___add_ticket_to_cart__allow_add_to_cart',
                    true,
                    $ticket,
                    $qty,
                    $available_spaces
                )
            ) {
                return false;
            }
            $qty = absint(apply_filters('FHEE__EE_Ticket_Selector___add_ticket_to_cart__ticket_qty', $qty, $ticket));
            // add event to cart
            if ($this->cart->add_ticket_to_cart($ticket, $qty)) {
                $this->tracker->recalculateTicketDatetimeAvailability($ticket, $qty);
                return true;
            }
            return false;
        }
        $this->tracker->processAvailabilityError($ticket, $qty, $this->cart->all_ticket_quantity_count());
        return false;
    }


    /**
     * @param $tickets_added
     * @return bool
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    private function processSuccessfulCart($tickets_added)
    {
        // exit('KILL REDIRECT BEFORE CART UPDATE'); // <<<<<<<<<<<<<<<<< KILL REDIRECT HERE BEFORE CART UPDATE
        if (apply_filters('FHEE__EED_Ticket_Selector__process_ticket_selections__success', $tickets_added)) {
            // make sure cart is loaded
            if (! $this->cart instanceof EE_Cart) {
                $this->cart = CartFactory::getCart();
            }
            do_action(
                'FHEE__EE_Ticket_Selector__process_ticket_selections__before_redirecting_to_checkout',
                $this->cart,
                $this
            );
            $this->cart->recalculate_all_cart_totals();
            $this->cart->save_cart(false);
            // exit('KILL REDIRECT AFTER CART UPDATE'); // <<<<<<<<  OR HERE TO KILL REDIRECT AFTER CART UPDATE
            // just return TRUE for registrations being made from admin
            if ($this->request->isAdmin() || $this->request->isFrontAjax()) {
                return true;
            }
            EEH_URL::safeRedirectAndExit(
                apply_filters(
                    'FHEE__EE_Ticket_Selector__process_ticket_selections__success_redirect_url',
                    $this->core_config->reg_page_url()
                )
            );
        }
        if (! EE_Error::has_error() && ! EE_Error::has_error(true, 'attention')) {
            // nothing added to cart
            EE_Error::add_attention(
                esc_html__('No tickets were added for the event', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        return false;
    }
}
