<?php

/**
 *
 * Class EE_Checkout
 *
 * Description
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 4.5.0
 *
 */
class EE_Checkout
{
    /**
     *    whether current request originated from the EE admin
     *
     * @type bool
     */
    public $admin_request = false;

    /**
     * whether returning to edit attendee information or to retry a payment
     *
     * @type bool
     */
    public $revisit = false;

    /**
     * whether the primary registrant is returning to edit attendee information or to retry a payment
     *
     * @type bool
     */
    public $primary_revisit = false;

    /**
     * is registration allowed to progress or halted for some reason such as failing to pass recaptcha?
     *
     * @type bool
     */
    public $continue_reg = true;

    /**
     * redirect to thank you page ?
     *
     * @type bool
     */
    public $redirect = false;

    /**
     * generate the reg form or not ?
     *
     * @type bool
     */
    public $generate_reg_form = true;

    /**
     * process a reg form submission or not ?
     *
     * @type bool
     */
    public $process_form_submission = false;

    /**
     * tracks whether the TXN status modified during this checkout
     *
     * @type bool
     */
    public $txn_status_updated = false;

    /**
     * only triggered to true after absolutely everything has finished.
     *
     * @type bool
     */
    protected $exit_spco = false;

    /**
     * tracks whether any of the TXN's Registrations statuses modified during this checkout
     * indexed by registration ID
     *
     * @type array
     */
    protected $reg_status_updated = array();

    /**
     * timestamp when redirected from Ticket Selector to the checkout
     *
     * @type int
     */
    public $uts = 0;

    /**
     * total number of tickets that were in the cart
     *
     * @type int
     */
    public $total_ticket_count = 0;

    /**
     * corresponds loosely to EE_Transaction::remaining()
     * but can be modified by SPCO
     *
     * @type float
     */
    public $amount_owing = 0;

    /**
     * the reg step slug from the incoming request
     *
     * @type string
     */
    public $step = '';

    /**
     * the reg step slug for a step being edited
     *
     * @type string
     */
    public $edit_step = '';

    /**
     * the action being performed on the current step
     *
     * @type string
     */
    public $action = '';

    /**
     * reg_url_link for a previously saved registration
     *
     * @type string
     */
    public $reg_url_link = '';

    /**
     * string slug for the payment method that was selected during the payment options step
     *
     * @type string
     */
    public $selected_method_of_payment = '';

    /**
     * base url for the site's registration checkout page - additional url params will be added to this
     *
     * @type string
     */
    public $reg_page_base_url = '';

    /**
     * base url for the site's registration cancelled page - additional url params will be added to this
     *
     * @type string
     */
    public $cancel_page_url = '';

    /**
     * base url for the site's thank you page - additional url params will be added to this
     *
     * @type string
     */
    public $thank_you_page_url = '';

    /**
     * base url for any redirects - additional url params will be added to this
     *
     * @type string
     */
    public $redirect_url = '';

    /**
     * form of POST data for use with off-site gateways
     *
     * @type string
     */
    public $redirect_form = '';

    /**
     * array of query where params to use when retrieving cached registrations from $this->checkout->transaction
     *
     * @type array
     */
    public $reg_cache_where_params = array();

    /**
     * a class for managing and creating the JSON encoded array of data that gets passed back to the client during AJAX
     * requests
     *
     * @type EE_SPCO_JSON_Response
     */
    public $json_response;

    /**
     * where we are going next in the reg process
     *
     * @type EE_SPCO_Reg_Step
     */
    public $next_step;

    /**
     * where we are in the reg process
     *
     * @type EE_SPCO_Reg_Step
     */
    public $current_step;

    /**
     *    $_cart - the current cart object
     *
     * @var EE_CART
     */
    public $cart;

    /**
     *    $_transaction - the current transaction object
     *
     * @var EE_Transaction
     */
    public $transaction;

    /**
     *    the related attendee object for the primary registrant
     *
     * @type EE_Attendee
     */
    public $primary_attendee_obj;

    /**
     *    $payment_method - the payment method object for the selected method of payment
     *
     * @type EE_Payment_Method
     */
    public $payment_method;

    /**
     *    $payment - if a payment was successfully made during the reg process,
     *    then here it is !!!
     *
     * @type EE_Payment
     */
    public $payment;

    /**
     *    if a payment method was selected that uses an on-site gateway, then this is the billing form
     *
     * @type EE_Billing_Info_Form | EE_Billing_Attendee_Info_Form
     */
    public $billing_form;

    /**
     *    the entire registration form composed of ALL of the subsections generated by the various reg steps
     *
     * @type EE_Form_Section_Proper
     */
    public $registration_form;

    /**
     * array of EE_SPCO_Reg_Step objects
     *
     * @type EE_SPCO_Reg_Step[]
     */
    public $reg_steps = array();

    /**
     * array of EE_Payment_Method objects
     *
     * @type EE_Payment_Method[]
     */
    public $available_payment_methods = array();


    /**
     *    class constructor
     *
     * @access    public
     */
    public function __construct()
    {
        $this->reg_page_base_url = EE_Registry::instance()->CFG->core->reg_page_url();
        $this->thank_you_page_url = EE_Registry::instance()->CFG->core->thank_you_page_url();
        $this->cancel_page_url = EE_Registry::instance()->CFG->core->cancel_page_url();
        $this->continue_reg = apply_filters('FHEE__EE_Checkout___construct___continue_reg', true);

        $this->admin_request = is_admin() && ! EED_Single_Page_Checkout::getRequest()->isAjax();
        $this->reg_cache_where_params = array(
            0          => array('REG_deleted' => false),
            'order_by' => array('REG_count' => 'ASC'),
        );
    }


    /**
     * returns true if ANY reg status was updated during checkout
     *
     * @return boolean
     */
    public function any_reg_status_updated()
    {
        foreach ($this->reg_status_updated as $reg_status) {
            if ($reg_status) {
                return true;
            }
        }
        return false;
    }


    /**
     * @param $REG_ID
     * @return boolean
     */
    public function reg_status_updated($REG_ID)
    {
        return isset($this->reg_status_updated[ $REG_ID ]) ? $this->reg_status_updated[ $REG_ID ] : false;
    }


    /**
     * @param $REG_ID
     * @param $reg_status
     */
    public function set_reg_status_updated($REG_ID, $reg_status)
    {
        $this->reg_status_updated[ $REG_ID ] = filter_var($reg_status, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * exit_spco
     *
     * @return bool
     */
    public function exit_spco()
    {
        return $this->exit_spco;
    }


    /**
     * set_exit_spco
     * can ONLY be set by the  Finalize_Registration reg step
     */
    public function set_exit_spco()
    {
        if ($this->current_step instanceof EE_SPCO_Reg_Step_Finalize_Registration) {
            $this->exit_spco = true;
        }
    }


    /**
     *    reset_for_current_request
     *
     * @access    public
     * @return    void
     */
    public function reset_for_current_request()
    {
        $this->process_form_submission = false;
        $this->continue_reg = apply_filters('FHEE__EE_Checkout___construct___continue_reg', true);
        $this->admin_request = is_admin() && ! EED_Single_Page_Checkout::getRequest()->isFrontAjax();
        $this->continue_reg = true;
        $this->redirect = false;
        // don't reset the cached redirect form if we're about to be asked to display it !!!
        $action = EED_Single_Page_Checkout::getRequest()->getRequestParam('action', 'display_spco_reg_step');
        if ($action !== 'redirect_form') {
            $this->redirect_form = '';
        }
        $this->redirect_url = '';
        $this->json_response = new EE_SPCO_JSON_Response();
        EE_Form_Section_Proper::reset_js_localization();
    }


    /**
     *    add_reg_step
     *
     * @access    public
     * @param EE_SPCO_Reg_Step $reg_step_obj
     * @return    void
     */
    public function add_reg_step(EE_SPCO_Reg_Step $reg_step_obj)
    {
        $this->reg_steps[ $reg_step_obj->slug() ] = $reg_step_obj;
    }


    /**
     * skip_reg_step
     * if the current reg step does not need to run for some reason,
     * then this will advance SPCO to the next reg step,
     * and mark the skipped step as completed
     *
     * @access    public
     * @param string $reg_step_slug
     * @return    void
     * @throws \EE_Error
     */
    public function skip_reg_step($reg_step_slug = '')
    {
        $step_to_skip = $this->find_reg_step($reg_step_slug);
        if ($step_to_skip instanceof EE_SPCO_Reg_Step && $step_to_skip->is_current_step()) {
            $step_to_skip->set_is_current_step(false);
            $step_to_skip->set_completed();
            // advance to the next step
            $this->set_current_step($this->next_step->slug());
            // also reset the step param in the request in case any other code references that directly
            EED_Single_Page_Checkout::getRequest()->setRequestParam('step', $this->current_step->slug());
            // since we are skipping a step and setting the current step to be what was previously the next step,
            // we need to check that the next step is now correct, and not still set to the current step.
            if ($this->current_step->slug() === $this->next_step->slug()) {
                // correctly setup the next step
                $this->set_next_step();
            }
            $this->set_reg_step_initiated($this->current_step);
        }
    }


    /**
     *    remove_reg_step
     *
     * @access    public
     * @param string $reg_step_slug
     * @param bool   $reset whether to reset reg steps after removal
     * @throws EE_Error
     */
    public function remove_reg_step($reg_step_slug = '', $reset = true)
    {
        unset($this->reg_steps[ $reg_step_slug ]);
        if ($this->transaction instanceof EE_Transaction) {
            // now remove reg step from TXN and save
            $this->transaction->remove_reg_step($reg_step_slug);
            $this->transaction->save();
        }
        if ($reset) {
            $this->reset_reg_steps();
        }
    }


    /**
     *    set_reg_step_order
     *
     * @access    public
     * @param string $reg_step_slug
     * @param int    $order
     * @return    void
     */
    public function set_reg_step_order($reg_step_slug = '', $order = 100)
    {
        if (isset($this->reg_steps[ $reg_step_slug ])) {
            $this->reg_steps[ $reg_step_slug ]->set_order($order);
        }
    }


    /**
     *    set_current_step
     *
     * @access    public
     * @param string $current_step
     * @return    void
     */
    public function set_current_step($current_step)
    {
        // grab what step we're on
        $this->current_step = isset($this->reg_steps[ $current_step ])
            ? $this->reg_steps[ $current_step ]
            : reset(
                $this->reg_steps
            );
        // verify instance
        if ($this->current_step instanceof EE_SPCO_Reg_Step) {
            // we don't want to repeat completed steps if this is the first time through SPCO
            if ($this->continue_reg && ! $this->revisit && $this->current_step->completed()) {
                // so advance to the next step
                $this->set_next_step();
                if ($this->next_step instanceof EE_SPCO_Reg_Step) {
                    // and attempt to set it as the current step
                    $this->set_current_step($this->next_step->slug());
                }
                return;
            }
            $this->current_step->set_is_current_step(true);
        } else {
            EE_Error::add_error(
                esc_html__('The current step could not be set.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
    }


    /**
     *    set_next_step
     * advances the reg_steps array pointer and sets the next step, then reverses pointer back to the current step
     *
     * @access    public
     * @return    void
     */
    public function set_next_step()
    {
        // set pointer to start of array
        reset($this->reg_steps);
        // if there is more than one step
        if (count($this->reg_steps) > 1) {
            // advance to the current step and set pointer
            while (key($this->reg_steps) !== $this->current_step->slug() && key($this->reg_steps) !== '') {
                next($this->reg_steps);
            }
        }
        // advance one more spot ( if it exists )
        $this->next_step = next($this->reg_steps);
        // verify instance
        $this->next_step = $this->next_step instanceof EE_SPCO_Reg_Step ? $this->next_step : null;
        // then back to current step to reset
        prev($this->reg_steps);
    }


    /**
     *    get_next_reg_step
     *    this simply returns the next step from reg_steps array
     *
     * @access    public
     * @return    EE_SPCO_Reg_Step | null
     */
    public function get_next_reg_step()
    {
        $next = next($this->reg_steps);
        prev($this->reg_steps);
        return $next instanceof EE_SPCO_Reg_Step ? $next : null;
    }


    /**
     * get_prev_reg_step
     *    this simply returns the previous step from reg_steps array
     *
     * @access    public
     * @return    EE_SPCO_Reg_Step | null
     */
    public function get_prev_reg_step()
    {
        $prev = prev($this->reg_steps);
        next($this->reg_steps);
        return $prev instanceof EE_SPCO_Reg_Step ? $prev : null;
    }


    /**
     * sort_reg_steps
     *
     * @access public
     * @return void
     */
    public function sort_reg_steps()
    {
        $reg_step_sorting_callback = apply_filters(
            'FHEE__EE_Checkout__sort_reg_steps__reg_step_sorting_callback',
            'reg_step_sorting_callback'
        );
        uasort($this->reg_steps, array($this, $reg_step_sorting_callback));
    }


    /**
     * find_reg_step
     * finds a reg step by the given slug
     *
     * @access    public
     * @param string $reg_step_slug
     * @return EE_SPCO_Reg_Step|null
     */
    public function find_reg_step($reg_step_slug = '')
    {
        if (! empty($reg_step_slug)) {
            // copy reg step array
            $reg_steps = $this->reg_steps;
            // set pointer to start of array
            reset($reg_steps);
            // if there is more than one step
            if (count($reg_steps) > 1) {
                // advance to the current step and set pointer
                while (key($reg_steps) !== $reg_step_slug && key($reg_steps) !== '') {
                    next($reg_steps);
                }
                return current($reg_steps);
            }
        }
        return null;
    }


    /**
     * reg_step_sorting_callback
     *
     * @access public
     * @param EE_SPCO_Reg_Step $reg_step_A
     * @param EE_SPCO_Reg_Step $reg_step_B
     * @return int
     */
    public function reg_step_sorting_callback(EE_SPCO_Reg_Step $reg_step_A, EE_SPCO_Reg_Step $reg_step_B)
    {
        // send finalize_registration step to the end of the array
        if ($reg_step_A->slug() === 'finalize_registration') {
            return 1;
        } elseif ($reg_step_B->slug() === 'finalize_registration') {
            return -1;
        }
        if ($reg_step_A->order() === $reg_step_B->order()) {
            return 0;
        }
        return ($reg_step_A->order() > $reg_step_B->order()) ? 1 : -1;
    }


    /**
     * set_reg_step_initiated
     *
     * @access    public
     * @param    EE_SPCO_Reg_Step $reg_step
     * @throws \EE_Error
     */
    public function set_reg_step_initiated(EE_SPCO_Reg_Step $reg_step)
    {
        // call set_reg_step_initiated ???
        if (
// first time visiting SPCO ?
            ! $this->revisit
            && (
                // and displaying the reg step form for the first time ?
                $this->action === 'display_spco_reg_step'
                // or initializing the final step
                || $reg_step instanceof EE_SPCO_Reg_Step_Finalize_Registration
            )
        ) {
            // set the start time for this reg step
            if (! $this->transaction->set_reg_step_initiated($reg_step->slug())) {
                if (WP_DEBUG) {
                    EE_Error::add_error(
                        sprintf(
                            esc_html__('The "%1$s" registration step was not initialized properly.', 'event_espresso'),
                            $reg_step->name()
                        ),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
            }
        }
    }


    /**
     *    set_reg_step_JSON_info
     *
     * @access public
     * @return    void
     */
    public function set_reg_step_JSON_info()
    {
        EE_Registry::$i18n_js_strings['reg_steps'] = array();
        // pass basic reg step data to JS
        foreach ($this->reg_steps as $reg_step) {
            EE_Registry::$i18n_js_strings['reg_steps'][] = $reg_step->slug();
        }
        // reset reg step html
        // $this->json_response->set_reg_step_html('');
    }


    /**
     *    reset_reg_steps
     *
     * @access public
     * @return void
     */
    public function reset_reg_steps()
    {
        $this->sort_reg_steps();
        $this->set_current_step(EED_Single_Page_Checkout::getRequest()->getRequestParam('step'));
        $this->set_next_step();
        // the text that appears on the reg step form submit button
        $this->current_step->set_submit_button_text();
        $this->set_reg_step_JSON_info();
    }


    /**
     *    get_registration_time_limit
     *
     * @access    public
     * @return        string
     */
    public function get_registration_time_limit()
    {

        $registration_time_limit = (float) (EE_Registry::instance()->SSN->expiration() - time());
        $time_limit_format = $registration_time_limit > 60 * MINUTE_IN_SECONDS ? 'H:i:s' : 'i:s';
        $registration_time_limit = date($time_limit_format, $registration_time_limit);
        return apply_filters(
            'FHEE__EE_Checkout__get_registration_time_limit__registration_time_limit',
            $registration_time_limit
        );
    }


    /**
     * payment_required
     *
     * @return boolean
     */
    public function payment_required()
    {
        // if NOT:
        //     registration via admin
        //      completed TXN
        //      overpaid TXN
        //      free TXN(total = 0.00)
        //      then payment required is TRUE
        return ! ($this->admin_request
                  || $this->transaction->is_completed()
                  || $this->transaction->is_overpaid()
                  || $this->transaction->is_free()) ? true : false;
    }


    /**
     * get_cart_for_transaction
     *
     * @access public
     * @param EE_Transaction $transaction
     * @return EE_Cart
     */
    public function get_cart_for_transaction($transaction)
    {
        $session = EE_Registry::instance()->load_core('Session');
        $cart = $transaction instanceof EE_Transaction ? EE_Cart::get_cart_from_txn($transaction, $session) : null;
        // verify cart
        if (! $cart instanceof EE_Cart) {
            $cart = EE_Registry::instance()->load_core('Cart');
        }

        return $cart;
    }


    /**
     *    initialize_txn_reg_steps_array
     *
     * @access public
     * @return    array
     */
    public function initialize_txn_reg_steps_array()
    {
        $txn_reg_steps_array = array();
        foreach ($this->reg_steps as $reg_step) {
            $txn_reg_steps_array[ $reg_step->slug() ] = false;
        }
        return $txn_reg_steps_array;
    }


    /**
     *    update_txn_reg_steps_array
     *
     * @access public
     * @return    bool
     * @throws \EE_Error
     */
    public function update_txn_reg_steps_array()
    {
        $updated = false;
        foreach ($this->reg_steps as $reg_step) {
            if ($reg_step->completed()) {
                $updated = $this->transaction->set_reg_step_completed($reg_step->slug())
                    ? true
                    : $updated;
            }
        }
        if ($updated) {
            $this->transaction->save();
        }
        return $updated;
    }


    /**
     *    stash_transaction_and_checkout
     *
     * @access public
     * @return    void
     * @throws \EE_Error
     */
    public function stash_transaction_and_checkout()
    {
        if (! $this->revisit) {
            $this->update_txn_reg_steps_array();
        }
        $this->track_transaction_and_registration_status_updates();
        // save all data to the db, but suppress errors
        // $this->save_all_data( FALSE );
        // cache the checkout in the session
        EE_Registry::instance()->SSN->set_checkout($this);
    }


    /**
     *    track_transaction_and_registration_status_updates
     *    stores whether any updates were made to the TXN or it's related registrations
     *
     * @access public
     * @return void
     * @throws \EE_Error
     */
    public function track_transaction_and_registration_status_updates()
    {
        // verify the transaction
        if ($this->transaction instanceof EE_Transaction) {
            // has there been a TXN status change during this checkout?
            $this->txn_status_updated = $this->transaction->txn_status_updated();
            /** @type EE_Registration_Processor $registration_processor */
            $registration_processor = EE_Registry::instance()->load_class('Registration_Processor');
            // grab the saved registrations from the transaction
            foreach ($this->transaction->registrations($this->reg_cache_where_params) as $registration) {
                if ($registration_processor->reg_status_updated($registration->ID())) {
                    $this->set_reg_status_updated($registration->ID(), true);
                }
            }
        }
    }


    /**
     *    visit_allows_processing_of_this_registration
     *    determines if the current SPCO visit should allow the passed EE_Registration to be used in processing.
     *    one of the following conditions must be met:
     *        EITHER:    A) first time thru SPCO -> process ALL registrations ( NOT a revisit )
     *        OR :        B) primary registrant is editing info -> process ALL registrations ( primary_revisit )
     *        OR :        C) another registrant is editing info -> ONLY process their registration ( revisit AND their
     *        reg_url_link matches )
     *
     * @access public
     * @param    EE_Registration $registration
     * @return    bool
     * @throws \EE_Error
     */
    public function visit_allows_processing_of_this_registration(EE_Registration $registration)
    {
        return ! $this->revisit
               || $this->primary_revisit
               || (
                   $this->revisit && $this->reg_url_link === $registration->reg_url_link()
               )
            ? true
            : false;
    }


    /**
     *    _transaction_has_primary_registration
     *
     * @access        private
     * @return        bool
     */
    public function transaction_has_primary_registrant()
    {
        return $this->primary_attendee_obj instanceof EE_Attendee ? true : false;
    }


    /**
     *    save_all_data
     *    simply loops through the current transaction and saves all data for each registration
     *
     * @access public
     * @param bool $show_errors
     * @return bool
     * @throws \EE_Error
     */
    public function save_all_data($show_errors = true)
    {
        // verify the transaction
        if ($this->transaction instanceof EE_Transaction) {
            // save to ensure that TXN has ID
            $this->transaction->save();
            // grab the saved registrations from the transaction
            foreach ($this->transaction->registrations($this->reg_cache_where_params) as $registration) {
                $this->_save_registration($registration, $show_errors);
            }
        } else {
            if ($show_errors) {
                EE_Error::add_error(
                    esc_html__(
                        'A valid Transaction was not found when attempting to save your registration information.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
            return false;
        }
        return true;
    }


    /**
     * _save_registration_attendee
     *
     * @param    EE_Registration $registration
     * @param bool               $show_errors
     * @return void
     * @throws \EE_Error
     */
    private function _save_registration($registration, $show_errors = true)
    {
        // verify object
        if ($registration instanceof EE_Registration) {
            // should this registration be processed during this visit ?
            if ($this->visit_allows_processing_of_this_registration($registration)) {
                // set TXN ID
                if (! $registration->transaction_ID()) {
                    $registration->set_transaction_id($this->transaction->ID());
                }
                // verify and save the attendee
                $this->_save_registration_attendee($registration, $show_errors);
                // save answers to reg form questions
                $this->_save_registration_answers($registration, $show_errors);
                // save changes
                $registration->save();
                // update txn cache
                if (! $this->transaction->update_cache_after_object_save('Registration', $registration)) {
                    if ($show_errors) {
                        EE_Error::add_error(
                            esc_html__(
                                'The newly saved Registration object could not be cached on the Transaction.',
                                'event_espresso'
                            ),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                    }
                }
            }
        } else {
            if ($show_errors) {
                EE_Error::add_error(
                    esc_html__(
                        'An invalid Registration object was discovered when attempting to save your registration information.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }
    }


    /**
     * _save_registration_attendee
     *
     * @param    EE_Registration $registration
     * @param bool               $show_errors
     * @return void
     * @throws \EE_Error
     */
    private function _save_registration_attendee($registration, $show_errors = true)
    {
        if ($registration->attendee() instanceof EE_Attendee) {
            // save so that ATT has ID
            $registration->attendee()->save();
            if (! $registration->update_cache_after_object_save('Attendee', $registration->attendee())) {
                if ($show_errors) {
                    EE_Error::add_error(
                        esc_html__(
                            'The newly saved Attendee object could not be cached on the registration.',
                            'event_espresso'
                        ),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
            }
        } else {
            if ($show_errors) {
                EE_Error::add_error(
                    sprintf(
                        '%1$s||%1$s $attendee = %2$s',
                        esc_html__(
                            'Either no Attendee information was found, or an invalid Attendee object was discovered when attempting to save your registration information.',
                            'event_espresso'
                        ),
                        var_export($registration->attendee(), true)
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }
    }


    /**
     * _save_question_answers
     *
     * @param    EE_Registration $registration
     * @param bool               $show_errors
     * @return void
     * @throws \EE_Error
     */
    private function _save_registration_answers($registration, $show_errors = true)
    {
        // now save the answers
        foreach ($registration->answers() as $cache_key => $answer) {
            // verify object
            if ($answer instanceof EE_Answer) {
                $answer->set_registration($registration->ID());
                $answer->save();
                if (! $registration->update_cache_after_object_save('Answer', $answer, $cache_key)) {
                    if ($show_errors) {
                        EE_Error::add_error(
                            esc_html__(
                                'The newly saved Answer object could not be cached on the registration.',
                                'event_espresso'
                            ),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                    }
                }
            } else {
                if ($show_errors) {
                    EE_Error::add_error(
                        esc_html__(
                            'An invalid Answer object was discovered when attempting to save your registration information.',
                            'event_espresso'
                        ),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
            }
        }
    }


    /**
     *    refresh_all_entities
     *   will either refresh the entity map with objects form the db or from the checkout cache
     *
     * @access public
     * @param bool $from_db
     * @return bool
     * @throws \EE_Error
     */
    public function refresh_all_entities($from_db = false)
    {
        $this->current_step->setRequest(EED_Single_Page_Checkout::getRequest());
        $from_db = $this->current_step->is_final_step() || $this->action === 'process_gateway_response'
            ? true
            : $from_db;
        // $this->log(
        //     __CLASS__,
        //     __FUNCTION__,
        //     __LINE__,
        //     array('from_db' => $from_db)
        // );
        return $from_db ? $this->refresh_from_db() : $this->refresh_entity_map();
    }


    /**
     *  refresh_entity_map
     *  simply loops through the current transaction and updates each
     *  model's entity map using EEM_Base::refresh_entity_map_from_db()
     *
     * @access public
     * @return bool
     * @throws \EE_Error
     */
    protected function refresh_from_db()
    {
        // verify the transaction
        if ($this->transaction instanceof EE_Transaction && $this->transaction->ID()) {
            // pull fresh TXN data from the db
            $this->transaction = $this->transaction->get_model()->refresh_entity_map_from_db($this->transaction->ID());
            // update EE_Checkout's cached primary_attendee object
            $this->primary_attendee_obj = $this->_refresh_primary_attendee_obj_from_db($this->transaction);
            // update EE_Checkout's cached payment object
            $payment = $this->transaction->last_payment();
            $this->payment = $payment instanceof EE_Payment ? $payment : $this->payment;
            // update EE_Checkout's cached payment_method object
            $payment_method = $this->payment instanceof EE_Payment ? $this->payment->payment_method() : null;
            $this->payment_method = $payment_method instanceof EE_Payment_Method ? $payment_method
                : $this->payment_method;
            // now refresh the cart, based on the TXN
            $this->cart = $this->get_cart_for_transaction($this->transaction);
        } else {
            EE_Error::add_error(
                esc_html__(
                    'A valid Transaction was not found when attempting to update the model entity mapper.',
                    'event_espresso'
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
     * _refresh_primary_attendee_obj_from_db
     *
     * @param   EE_Transaction $transaction
     * @return  EE_Attendee | null
     * @throws \EE_Error
     */
    protected function _refresh_primary_attendee_obj_from_db(EE_Transaction $transaction)
    {

        $primary_attendee_obj = null;
        // grab the saved registrations from the transaction
        foreach ($transaction->registrations($this->reg_cache_where_params, true) as $registration) {
            // verify object
            if ($registration instanceof EE_Registration) {
                $attendee = $registration->attendee();
                // verify object && maybe cache primary_attendee_obj ?
                if ($attendee instanceof EE_Attendee && $registration->is_primary_registrant()) {
                    $primary_attendee_obj = $attendee;
                }
            } else {
                EE_Error::add_error(
                    esc_html__(
                        'An invalid Registration object was discovered when attempting to update the model entity mapper.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }
        return $primary_attendee_obj;
    }


    /**
     *  refresh_entity_map
     *  simply loops through the current transaction and updates
     *  each model's entity map using EEM_Base::refresh_entity_map_with()
     *
     * @access public
     * @return bool
     * @throws \EE_Error
     */
    protected function refresh_entity_map()
    {
        // verify the transaction
        if ($this->transaction instanceof EE_Transaction && $this->transaction->ID()) {
            // never cache payment info
            $this->transaction->clear_cache('Payment');
            // is the Payment Options Reg Step completed ?
            if ($this->transaction->reg_step_completed('payment_options')) {
                // then check for payments and update TXN accordingly
                /** @type EE_Transaction_Payments $transaction_payments */
                $transaction_payments = EE_Registry::instance()->load_class('Transaction_Payments');
                $transaction_payments->calculate_total_payments_and_update_status($this->transaction);
            }
            // grab the saved registrations from the transaction
            foreach ($this->transaction->registrations($this->reg_cache_where_params) as $reg_cache_ID => $registration) {
                $this->_refresh_registration($reg_cache_ID, $registration);
            }
            // make sure our cached TXN is added to the model entity mapper
            $this->transaction = $this->transaction->get_model()->refresh_entity_map_with(
                $this->transaction->ID(),
                $this->transaction
            );
        } else {
            EE_Error::add_error(
                esc_html__(
                    'A valid Transaction was not found when attempting to update the model entity mapper.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        // verify and update the cart because inaccurate totals are not so much fun
        if ($this->cart instanceof EE_Cart) {
            $grand_total = $this->cart->get_grand_total();
            if ($grand_total instanceof EE_Line_Item && $grand_total->ID()) {
                $grand_total->recalculate_total_including_taxes();
                $grand_total = $grand_total->get_model()->refresh_entity_map_with(
                    $this->cart->get_grand_total()->ID(),
                    $this->cart->get_grand_total()
                );
            }
            if ($grand_total instanceof EE_Line_Item) {
                $this->cart = EE_Cart::instance($grand_total);
            } else {
                EE_Error::add_error(
                    esc_html__(
                        'A valid Cart was not found when attempting to update the model entity mapper.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                return false;
            }
        }
        return true;
    }


    /**
     * _refresh_registration
     *
     * @param    string | int    $reg_cache_ID
     * @param    EE_Registration $registration
     * @return void
     * @throws \EE_Error
     */
    protected function _refresh_registration($reg_cache_ID, $registration)
    {

        // verify object
        if ($registration instanceof EE_Registration) {
            // update the entity mapper attendee
            $this->_refresh_registration_attendee($registration);
            // update the entity mapper answers for reg form questions
            $this->_refresh_registration_answers($registration);
            // make sure the cached registration is added to the model entity mapper
            $registration->get_model()->refresh_entity_map_with($reg_cache_ID, $registration);
        } else {
            EE_Error::add_error(
                esc_html__(
                    'An invalid Registration object was discovered when attempting to update the model entity mapper.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
    }


    /**
     * _save_registration_attendee
     *
     * @param    EE_Registration $registration
     * @return void
     * @throws \EE_Error
     */
    protected function _refresh_registration_attendee($registration)
    {

        $attendee = $registration->attendee();
        // verify object
        if ($attendee instanceof EE_Attendee && $attendee->ID()) {
            // make sure the cached attendee is added to the model entity mapper
            $registration->attendee()->get_model()->refresh_entity_map_with($attendee->ID(), $attendee);
            // maybe cache primary_attendee_obj ?
            if ($registration->is_primary_registrant()) {
                $this->primary_attendee_obj = $attendee;
            }
        }
    }


    /**
     * _refresh_registration_answers
     *
     * @param    EE_Registration $registration
     * @return void
     * @throws \EE_Error
     */
    protected function _refresh_registration_answers($registration)
    {

        // now update the answers
        foreach ($registration->answers() as $cache_key => $answer) {
            // verify object
            if ($answer instanceof EE_Answer) {
                if ($answer->ID()) {
                    // make sure the cached answer is added to the model entity mapper
                    $answer->get_model()->refresh_entity_map_with($answer->ID(), $answer);
                }
            } else {
                EE_Error::add_error(
                    esc_html__(
                        'An invalid Answer object was discovered when attempting to update the model entity mapper.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
        }
    }


    /**
     *    __sleep
     * to conserve db space, let's remove the reg_form and the EE_Checkout object from EE_SPCO_Reg_Step objects upon
     * serialization EE_Checkout will handle the reimplementation of itself upon waking, but we won't bother with the
     * reg form, because if needed, it will be regenerated anyways
     *
     * @return array
     * @throws \EE_Error
     */
    public function __sleep()
    {
        if ($this->primary_attendee_obj instanceof EE_Attendee && $this->primary_attendee_obj->ID()) {
            $this->primary_attendee_obj = $this->primary_attendee_obj->ID();
        }        // remove the reg form and the checkout
        if ($this->transaction instanceof EE_Transaction && $this->transaction->ID()) {
            $this->transaction = $this->transaction->ID();
        }        // remove the reg form and the checkout
        return array_diff(array_keys(get_object_vars($this)), array('billing_form', 'registration_form'));
    }


    /**
     *    __wakeup
     * to conserve db space, we are removing the EE_Checkout object from EE_SPCO_Reg_Step objects upon serialization
     * this will reinstate the EE_Checkout object on each EE_SPCO_Reg_Step object
     */
    public function __wakeup()
    {
        if (! $this->primary_attendee_obj instanceof EE_Attendee && absint($this->primary_attendee_obj) !== 0) {
            // $this->primary_attendee_obj is actually just an ID, so use it to get the object from the db
            $this->primary_attendee_obj = EEM_Attendee::instance()->get_one_by_ID($this->primary_attendee_obj);
        }
        if (! $this->transaction instanceof EE_Transaction && absint($this->transaction) !== 0) {
            // $this->transaction is actually just an ID, so use it to get the object from the db
            $this->transaction = EEM_Transaction::instance()->get_one_by_ID($this->transaction);
        }
        foreach ($this->reg_steps as $reg_step) {
            $reg_step->checkout = $this;
        }
    }


    /**
     * debug
     *
     * @param string $class
     * @param string $func
     * @param string $line
     * @param array  $info
     * @param bool   $display_request
     * @throws \EE_Error
     */
    public function log($class = '', $func = '', $line = '', $info = array(), $display_request = false)
    {
        $disabled = true;
        if (WP_DEBUG && ! $disabled) {
            $debug_data = get_option('EE_DEBUG_SPCO_' . EE_Session::instance()->id(), array());
            $default_data = array(
                $class                    => $func . '() : ' . $line,
                'request->step'           => $this->step,
                'request->action'         => $this->action,
                'current_step->slug'      => $this->current_step instanceof EE_SPCO_Reg_Step ?
                    $this->current_step->slug() : '',
                'current_step->completed' => $this->current_step instanceof EE_SPCO_Reg_Step ?
                    $this->current_step->completed() : '',
                'txn_status_updated'      => $this->transaction->txn_status_updated(),
                'reg_status_updated'      => $this->reg_status_updated,
                'reg_url_link'            => $this->reg_url_link,
            );
            if ($this->transaction instanceof EE_Transaction) {
                $default_data['TXN_status'] = $this->transaction->status_ID();
                $default_data['TXN_reg_steps'] = $this->transaction->reg_steps();
                foreach ($this->transaction->registrations($this->reg_cache_where_params) as $REG_ID => $registration) {
                    $default_data['registrations'][ $REG_ID ] = $registration->status_ID();
                }
                if ($this->transaction->ID()) {
                    $TXN_ID = 'EE_Transaction: ' . $this->transaction->ID();
                    // don't serialize objects
                    $info = $this->_strip_objects($info);
                    if (! isset($debug_data[ $TXN_ID ])) {
                        $debug_data[ $TXN_ID ] = array();
                    }
                    $debug_data[ $TXN_ID ][ microtime() ] = array_merge(
                        $default_data,
                        $info
                    );
                    update_option('EE_DEBUG_SPCO_' . EE_Session::instance()->id(), $debug_data);
                }
            }
        }
    }


    /**
     * _strip_objects
     *
     * @param array $info
     * @return array
     */
    public function _strip_objects($info = array())
    {
        foreach ((array) $info as $key => $value) {
            if (is_array($value)) {
                $info[ $key ] = $this->_strip_objects($value);
            } elseif (is_object($value)) {
                $object_class = get_class($value);
                $info[ $object_class ] = array();
                $info[ $object_class ]['ID'] = method_exists($value, 'ID') ? $value->ID() : 0;
                if (method_exists($value, 'status')) {
                    $info[ $object_class ]['status'] = $value->status();
                } elseif (method_exists($value, 'status_ID')) {
                    $info[ $object_class ]['status'] = $value->status_ID();
                }
                unset($info[ $key ]);
            }
        }
        return (array) $info;
    }
}
