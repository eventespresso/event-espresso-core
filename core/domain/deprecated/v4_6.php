<?php

/**
 * This function can be used to simplify generating a DIW notice for a deprecated action or filter
 *
 * @param string $deprecated_filter
 * @param string $replacement
 * @param string $replacement_location
 * @param string $version_deprecated
 * @param string $version_applies
 * @param string $action_or_filter
 */
function deprecated_espresso_action_or_filter_doing_it_wrong(
    $deprecated_filter,
    $replacement,
    $replacement_location,
    $version_deprecated,
    $version_applies,
    $action_or_filter = 'action'
) {
    $action_or_filter = $action_or_filter === 'action'
        ? esc_html__('action', 'event_espresso')
        : esc_html__('filter', 'event_espresso');
    EE_Error::doing_it_wrong(
        $deprecated_filter,
        sprintf(
            esc_html__(
                'This %1$s is deprecated.  It *may* work as an attempt to build in backwards compatibility.  However, it is recommended to use the following new %1$s: %4$s"%2$s" found in "%3$s"',
                'event_espresso'
            ),
            $action_or_filter,
            $replacement,
            $replacement_location,
            '<br />'
        ),
        $version_deprecated,
        $version_applies
    );
}

/**
 * ee_deprecated__registration_checkout__button_text
 *
 * @param string $submit_button_text
 * @param EE_Checkout $checkout
 * @return string
 */
function ee_deprecated__registration_checkout__button_text($submit_button_text, EE_Checkout $checkout)
{
    // list of old filters
    $deprecated_filters = [
        'update_registration_details' => true,
        'process_payment'             => true,
        'finalize_registration'       => true,
        'and_proceed_to_payment'      => true,
        'proceed_to'                  => true,
    ];
    // loop thru and call doing_it_wrong() or remove any that aren't being used
    foreach ($deprecated_filters as $deprecated_filter => $on) {
        // was this filter called ?
        if (has_action('FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__' . $deprecated_filter)) {
            // only display doing_it_wrong() notice to Event Admins during non-AJAX requests
            if (
                EE_Registry::instance()->CAP->current_user_can(
                    'ee_read_ee',
                    'hide_doing_it_wrong_for_deprecated_SPCO_filter'
                )
                && ! defined('DOING_AJAX')
            ) {
                EE_Error::doing_it_wrong(
                    'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__' . $deprecated_filter,
                    sprintf(
                        esc_html__(
                            'The %1$s filter is deprecated.  It *may* work as an attempt to build in backwards compatibility.  However, it is recommended to use the following new filter: %2$s"%3$s" found in "%4$s"',
                            'event_espresso'
                        ),
                        'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__' . $deprecated_filter,
                        '<br />',
                        'FHEE__EE_SPCO_Reg_Step__set_submit_button_text___submit_button_text',
                        '/modules/single_page_checkout/inc/EE_SPCO_Reg_Step.class.php'
                    ),
                    '4.6.10'
                );
            }
        } else {
            unset($deprecated_filters[ $deprecated_filter ]);
        }
    }
    if (! empty($deprecated_filters)) {
        if (
            $checkout->current_step->slug() == 'attendee_information'
            && $checkout->revisit
            && isset($deprecated_filters['update_registration_details'])
        ) {
            $submit_button_text = apply_filters(
                'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__update_registration_details',
                $submit_button_text
            );
        } elseif (
            $checkout->current_step->slug() == 'payment_options'
            && $checkout->revisit
            && isset($deprecated_filters['process_payment'])
        ) {
            $submit_button_text = apply_filters(
                'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__process_payment',
                $submit_button_text
            );
        } elseif (
            $checkout->next_step instanceof EE_SPCO_Reg_Step
            && $checkout->next_step->slug() == 'finalize_registration'
            && isset($deprecated_filters['finalize_registration'])
        ) {
            $submit_button_text = apply_filters(
                'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__finalize_registration',
                $submit_button_text
            );
        }
        if ($checkout->next_step instanceof EE_SPCO_Reg_Step) {
            if (
                $checkout->payment_required()
                && $checkout->next_step->slug() == 'payment_options'
                && isset($deprecated_filters['and_proceed_to_payment'])
            ) {
                $submit_button_text .= apply_filters(
                    'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__and_proceed_to_payment',
                    $submit_button_text
                );
            }
            if (
                $checkout->next_step->slug() != 'finalize_registration'
                && ! $checkout->revisit
                && isset($deprecated_filters['proceed_to'])
            ) {
                $submit_button_text = apply_filters(
                    'FHEE__EED_Single_Page_Checkout__registration_checkout__button_text__proceed_to',
                    $submit_button_text
                ) . $checkout->next_step->name();
            }
        }
    }
    return $submit_button_text;
}

add_filter(
    'FHEE__EE_SPCO_Reg_Step__set_submit_button_text___submit_button_text',
    'ee_deprecated__registration_checkout__button_text',
    10,
    2
);

/**
 * ee_deprecated_finalize_transaction
 *
 * @param EE_Checkout $checkout
 * @param boolean     $status_updates
 */
function ee_deprecated_finalize_transaction(EE_Checkout $checkout, $status_updates)
{
    $action_ref = null;
    $action_ref = has_action('AHEE__EE_Transaction__finalize__new_transaction')
        ? 'AHEE__EE_Transaction__finalize__new_transaction' : $action_ref;
    $action_ref = has_action('AHEE__EE_Transaction__finalize__all_transaction')
        ? 'AHEE__EE_Transaction__finalize__all_transaction' : $action_ref;
    if ($action_ref) {
        EE_Error::doing_it_wrong(
            $action_ref,
            sprintf(
                esc_html__(
                    'This action is deprecated.  It *may* work as an attempt to build in backwards compatibility.  However, it is recommended to use one of the following new actions: %1$s"%3$s" found in "%2$s" %1$s"%4$s" found in "%2$s" %1$s"%5$s" found in "%2$s" %1$s"%6$s" found in "%2$s"',
                    'event_espresso'
                ),
                '<br />',
                '/core/business/EE_Transaction_Processor.class.php',
                'AHEE__EE_Transaction_Processor__finalize',
                'AHEE__EE_Transaction_Processor__manually_update_registration_statuses',
                'AHEE__EE_Transaction_Processor__toggle_registration_statuses_for_default_approved_events',
                'AHEE__EE_Transaction_Processor__toggle_registration_statuses_if_no_monies_owing'
            ),
            '4.6.0'
        );
        switch ($action_ref) {
            case 'AHEE__EE_Transaction__finalize__new_transaction':
                do_action(
                    'AHEE__EE_Transaction__finalize__new_transaction',
                    $checkout->transaction,
                    $checkout->admin_request
                );
                break;
            case 'AHEE__EE_Transaction__finalize__all_transaction':
                do_action(
                    'AHEE__EE_Transaction__finalize__new_transaction',
                    $checkout->transaction,
                    array('new_reg' => ! $checkout->revisit, 'to_approved' => $status_updates),
                    $checkout->admin_request
                );
                break;
        }
    }
}

add_action(
    'AHEE__EE_SPCO_Reg_Step_Finalize_Registration__process_reg_step__completed',
    'ee_deprecated_finalize_transaction',
    10,
    2
);

/**
 * ee_deprecated_finalize_registration
 *
 * @param EE_Registration $registration
 */
function ee_deprecated_finalize_registration(EE_Registration $registration)
{
    $action_ref = has_action('AHEE__EE_Registration__finalize__update_and_new_reg')
        ? 'AHEE__EE_Registration__finalize__update_and_new_reg' : null;
    if ($action_ref) {
        EE_Error::doing_it_wrong(
            $action_ref,
            sprintf(
                esc_html__(
                    'This action is deprecated.  It *may* work as an attempt to build in backwards compatibility.  However, it is recommended to use the following new action: %1$s"%3$s" found in "%2$s"',
                    'event_espresso'
                ),
                '<br />',
                '/core/business/EE_Registration_Processor.class.php',
                'AHEE__EE_Registration_Processor__trigger_registration_update_notifications'
            ),
            '4.6.0'
        );
        do_action(
            'AHEE__EE_Registration__finalize__update_and_new_reg',
            $registration,
            (is_admin() && ! (defined('DOING_AJAX') && DOING_AJAX))
        );
    }
}

add_action(
    'AHEE__EE_Registration_Processor__trigger_registration_update_notifications',
    'ee_deprecated_finalize_registration',
    10,
    1
);

/**
 * Called after EED_Module::set_hooks() and EED_Module::set_admin_hooks() was called.
 * Checks if any deprecated hooks were hooked-into and provide doing_it_wrong messages appropriately.
 */
function ee_deprecated_hooks()
{
    /**
     * @var          $hooks       array where keys are hook names, and their values are array{
     * @type string  $version     when deprecated
     * @type string  $alternative saying what to use instead
     * @type boolean $still_works whether or not the hook still works
     *        }
     */
    $hooks = array(
        'AHEE__EE_System___do_setup_validations' => array(
            'version'     => '4.6.0',
            'alternative' => esc_html__(
                'Instead use "AHEE__EEH_Activation__validate_messages_system" which is called after validating messages (done on every new install, upgrade, reactivation, and downgrade)',
                'event_espresso'
            ),
            'still_works' => false,
        ),
    );
    foreach ($hooks as $name => $deprecation_info) {
        if (has_action($name)) {
            EE_Error::doing_it_wrong(
                $name,
                sprintf(
                    esc_html__('This filter is deprecated. %1$s%2$s', 'event_espresso'),
                    $deprecation_info['still_works'] ? esc_html__(
                        'It *may* work as an attempt to build in backwards compatibility.',
                        'event_espresso'
                    ) : esc_html__('It has been completely removed.', 'event_espresso'),
                    isset($deprecation_info['alternative'])
                        ? $deprecation_info['alternative']
                        : esc_html__(
                            'Please read the current EE4 documentation further or contact Support.',
                            'event_espresso'
                        )
                ),
                isset($deprecation_info['version']) ? $deprecation_info['version'] : esc_html__('recently', 'event_espresso')
            );
        }
    }
}

add_action('AHEE__EE_System__set_hooks_for_shortcodes_modules_and_addons', 'ee_deprecated_hooks');
