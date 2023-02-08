<?php

/**
 * Checks if the filters which were removed as part of
 * https://events.codebasehq.com/projects/event-espresso/tickets/9165 are in use. If so, issues a doing_it_wrong AND an
 * error (because the doing_it_wrong messages were somehow hidden in the UI)
 *
 * @return boolean
 */
function ee_deprecated_using_old_registration_admin_custom_questions_form_hooks()
{
    $in_use = has_filter('FHEE__Registrations_Admin_Page___update_attendee_registration_form__qstns')
    || has_action(
        'AHEE__Registrations_Admin_Page___save_attendee_registration_form__after_reg_and_attendee_save'
    );
    if ($in_use) {
        $msg = esc_html__(
            'We detected you are using the filter FHEE__Registrations_Admin_Page___update_attendee_registration_form__qstns or AHEE__Registrations_Admin_Page___save_attendee_registration_form__after_reg_and_attendee_save.'
            . 'Both of these have been deprecated and should not be used anymore. You should instead use FHEE__EE_Form_Section_Proper___construct__options_array to customize the contents of the form,'
            . 'use FHEE__EE_Form_Section_Proper__receive_form_submission__req_data to customize the submission data, or AHEE__EE_Form_Section_Proper__receive_form_submission__end '
            . 'to add other actions after a form submission has been received.',
            'event_espresso'
        );
        EE_Error::doing_it_wrong(
            __CLASS__ . '::' . __FUNCTION__,
            $msg,
            '4.8.32.rc.000'
        );
        // it seems the doing_it_wrong messages get output during some hidden html tags, so add an error to make sure this gets noticed
        if (is_admin() && ! defined('DOING_AJAX')) {
            EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
        }
    }
    return $in_use;
}

add_action(
    'AHEE__Registrations_Admin_Page___registration_details_metabox__start',
    'ee_deprecated_using_old_registration_admin_custom_questions_form_hooks'
);

/**
 * @param EE_Admin_Page $admin_page
 * @return void
 * @throws EE_Error
 * @throws ReflectionException
 * @deprecated 4.8.32.rc.000 because it has issues on
 *             https://events.codebasehq.com/projects/event-espresso/tickets/9165 it is preferred to instead use
 *             _update_attendee_registration_form_new() which also better handles form validation. Exits
 */
function ee_deprecated_update_attendee_registration_form_old($admin_page)
{
    // check if the old hooks are in use. If not, do the default
    if (
        ! ee_deprecated_using_old_registration_admin_custom_questions_form_hooks()
        || ! $admin_page instanceof EE_Admin_Page
    ) {
        return;
    }
    $req_data = $admin_page->get_request_data();
    $qstns = isset($req_data['qstn']) ? $req_data['qstn'] : false;
    $REG_ID = isset($req_data['_REG_ID']) ? absint($req_data['_REG_ID']) : false;
    $qstns = apply_filters('FHEE__Registrations_Admin_Page___update_attendee_registration_form__qstns', $qstns);
    if (! $REG_ID || ! $qstns) {
        EE_Error::add_error(
            esc_html__('An error occurred. No registration ID and/or registration questions were received.', 'event_espresso'),
            __FILE__,
            __FUNCTION__,
            __LINE__
        );
    }
    $success = true;

    // allow others to get in on this awesome fun   :D
    do_action(
        'AHEE__Registrations_Admin_Page___save_attendee_registration_form__after_reg_and_attendee_save',
        $REG_ID,
        $qstns
    );
    // loop thru questions... FINALLY!!!

    foreach ($qstns as $QST_ID => $qstn) {
        // if $qstn isn't an array then it doesn't already have an answer, so let's create the answer
        if (! is_array($qstn)) {
            $set_values = [
                'QST_ID'    => $QST_ID,
                'REG_ID'    => $REG_ID,
                'ANS_value' => $qstn,
            ];
            $success    = EEM_Answer::instance()->insert($set_values);
            continue;
        }

        foreach ($qstn as $ANS_ID => $ANS_value) {
            // get answer
            $query_params = array(
                0 => array(
                    'ANS_ID' => $ANS_ID,
                    'REG_ID' => $REG_ID,
                    'QST_ID' => $QST_ID,
                ),
            );
            $answer = EEM_Answer::instance()->get_one($query_params);
            // this MAY be an array but NOT have an answer because its multi select.  If so then we need to create the answer
            if (! $answer instanceof EE_Answer) {
                $set_values = array(
                    'QST_ID'    => $QST_ID,
                    'REG_ID'    => $REG_ID,
                    'ANS_value' => $qstn,
                );
                $success = EEM_Answer::instance()->insert($set_values);
                continue 2;
            }

            $answer->set('ANS_value', $ANS_value);
            $success = $answer->save();
        }
    }
    $what = esc_html__('Registration Form', 'event_espresso');
    $route = $REG_ID ? array('action' => 'view_registration', '_REG_ID' => $REG_ID) : array('action' => 'default');
    $admin_page->redirect_after_action($success, $what, esc_html__('updated', 'event_espresso'), $route);
    exit;
}

add_action(
    'AHEE__Registrations_Admin_Page___update_attendee_registration_form__start',
    'ee_deprecated_update_attendee_registration_form_old',
    10,
    1
);

/**
 * Render the registration admin page's custom questions area in the old fashion
 * and firing the old hooks. When this method is removed, we can probably also
 * remove the deprecated methods form_before_question_group, form_after_question_group,
 * form_form_field_label_wrap and form_form_field_input__wrap in Registrations_Admin_Page
 *
 * @param boolean         $do_default_action
 * @param EE_Admin_Page   $admin_page
 * @param EE_Registration $registration
 * @return bool
 * @throws EE_Error
 * @throws ReflectionException
 */
function ee_deprecated_reg_questions_meta_box_old($do_default_action, $admin_page, $registration)
{
    // check if the old hooks are in use. If not, do the default
    if (
        ! ee_deprecated_using_old_registration_admin_custom_questions_form_hooks()
        || ! $admin_page instanceof EE_Admin_Page
    ) {
        return $do_default_action;
    }
    add_filter(
        'FHEE__EEH_Form_Fields__generate_question_groups_html__before_question_group_questions',
        array($admin_page, 'form_before_question_group'),
        10,
        1
    );
    add_filter(
        'FHEE__EEH_Form_Fields__generate_question_groups_html__after_question_group_questions',
        array($admin_page, 'form_after_question_group'),
        10,
        1
    );
    add_filter('FHEE__EEH_Form_Fields__label_html', array($admin_page, 'form_form_field_label_wrap'), 10, 1);
    add_filter('FHEE__EEH_Form_Fields__input_html', array($admin_page, 'form_form_field_input__wrap'), 10, 1);

    $question_groups = EEM_Event::instance()->assemble_array_of_groups_questions_and_options(
        $registration,
        $registration->get(
            'EVT_ID'
        )
    );

    EE_Registry::instance()->load_helper('Form_Fields');
    $template_args = array(
        'att_questions'             => EEH_Form_Fields::generate_question_groups_html($question_groups),
        'reg_questions_form_action' => 'edit_registration',
        'REG_ID'                    => $registration->ID(),
    );
    $template_path = REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_reg_questions.template.php';
    echo EEH_Template::display_template($template_path, $template_args, true);
    // indicate that we should not do the default admin page code
    return false;
}

add_action(
    'FHEE__Registrations_Admin_Page___reg_questions_meta_box__do_default',
    'ee_deprecated_reg_questions_meta_box_old',
    10,
    3
);
