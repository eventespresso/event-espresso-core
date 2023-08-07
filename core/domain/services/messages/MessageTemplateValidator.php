<?php

namespace EventEspresso\core\domain\services\messages;

use DomainException;
use EE_Error;
use EE_Messages_Validator;
use EventEspresso\core\services\loaders\LoaderInterface;

/**
 * validates form fields for message templates
 *
 * @since 5.0.8.p
 */
class MessageTemplateValidator
{
    private LoaderInterface $loader;


    /**
     * @param LoaderInterface $loader
     */
    public function __construct(LoaderInterface $loader)
    {
        $this->loader = $loader;
    }


    /**
     * @param string $messenger
     * @param string $message_type
     * @param string $context
     * @param array  $template_fields
     * @return bool
     * @throws DomainException
     */
    public function validateTemplateFields(
        string $messenger,
        string $message_type,
        string $context,
        array $template_fields
    ): bool {
        // first validate all fields!
        // this filter allows client code to add its own validation to the template fields as well.
        // returning an empty array means everything passed validation.
        // errors in validation should be represented in an array with the following shape:
        // array(
        //   'fieldname' => array(
        //          'msg' => 'error message'
        //          'value' => 'value for field producing error'
        // )
        $custom_validation = (array) apply_filters(
            'FHEE__Messages_Admin_Page___insert_or_update_message_template__validates',
            [],
            $template_fields,
            $context,
            $messenger,
            $message_type
        );

        $fields_to_validate = $this->prepFieldsToValidate($template_fields);
        $validator          = $this->loadValidator($messenger, $message_type, $context, $fields_to_validate);
        $system_validation  = $validator->validate();
        $system_validation  = ! is_array($system_validation) && $system_validation ? [] : $system_validation;
        $validation_errors  = array_merge($custom_validation, $system_validation);

        // if $validate returned error messages (i.e. is_array()) then we need to process them and setup an
        // appropriate response. HMM, dang this isn't correct, $validates will ALWAYS be an array.
        //  WE need to make sure there is no actual error messages in validates.
        if (empty($validation_errors)) {
            return true;
        }

        // add the transient so when the form loads we know which fields to highlight
        $this->addTransient($validation_errors);
        // setup notices
        foreach ($validation_errors as $error) {
            if (isset($error['msg'])) {
                EE_Error::add_error($error['msg'], __FILE__, __FUNCTION__, __LINE__);
            }
        }
        return false;
    }


    /**
     * This sends things to the validator for the given messenger and message type.
     *
     * @param array $message_template_fields  the incoming fields to check.
     *                                        Note this array is in the formatted fields from the form fields setup.
     *                                        So we need to reformat this into an array of expected field refs by the
     *                                        validator. Note also that this is not only the fields for the Message
     *                                        Template Group but ALSO for Message Template.
     * @throws DomainException
     */
    public function prepFieldsToValidate(array $message_template_fields): array
    {
        $fields_to_validate = [];
        // let's loop through all the fields and set them up in the right format
        foreach ($message_template_fields as $message_template_field) {
            // first let's figure out if the value['content'] in the current index is an array.
            //  If it is then this is special fields that are used in parsing special shortcodes (i.e. 'attendee_list').
            if (is_array($message_template_field['content'])) {
                $fields_to_validate[ $message_template_field['name'] ] = $message_template_field['content']['main'];
                // loop through the content and get the other fields.
                foreach ($message_template_field['content'] as $name => $value) {
                    if ($name !== 'main') {
                        $fields_to_validate[ $name ] = $value;
                    }
                }
                continue;
            }

            // okay if we're here then this is just a straight field=>$value arrangement
            $fields_to_validate[ $message_template_field['name'] ] = $message_template_field['content'];
        }
        return $fields_to_validate;
    }


    private function loadValidator(
        string $messenger,
        string $message_type,
        string $context,
        array $fields_to_validate
    ): ?EE_Messages_Validator {
        // now we've got the assembled_fields.
        // We need to setup the string for the appropriate validator class and call that.
        $messenger_ref = ucwords(str_replace('_', ' ', $messenger));
        $messenger_ref = str_replace(' ', '_', $messenger_ref);

        $message_type_ref = ucwords(str_replace('_', ' ', $message_type));
        $message_type_ref = str_replace(' ', '_', $message_type_ref);

        $classname = "EE_Messages_{$messenger_ref}_{$message_type_ref}_Validator";

        $msg[] = esc_html__('The Validator class was unable to load', 'event_espresso');
        if (! class_exists($classname)) {
            $msg[] = sprintf(
                esc_html__(
                    'The class name compiled was %s. Please check and make sure the spelling and case is correct for the class name and that there is an autoloader in place for this class',
                    'event_espresso'
                ),
                $classname
            );
            throw new DomainException(implode('. ', $msg));
        }

        $validator = $this->loader->getShared($classname, [$fields_to_validate, $context]);
        if (! $validator instanceof EE_Messages_Validator) {
            $msg[] = sprintf(
                esc_html__(
                    'Failed to instantiate %s.',
                    'event_espresso'
                ),
                $classname
            );
            throw new DomainException(implode('. ', $msg));
        }
        return $validator;
    }


    /**
     * This makes available the WP transient system for temporarily moving data between routes
     *
     * @param array $data the data that gets sent
     */
    private function addTransient(array $data): void
    {
        $user_id   = get_current_user_id();
        $transient = "rte_tx_edit_message_template_$user_id";
        $net_admin = is_multisite() && is_network_admin();
        // is there already a transient for this route?  If there is then let's ADD to that transient
        $existing = $net_admin ? get_site_transient($transient) : get_transient($transient);
        $data     = ! array_key_exists('notices', $data) ? ['notices' => $data] : $data;
        if ($existing) {
            $data = array_merge($data, (array) $existing);
        }
        if ($net_admin) {
            set_site_transient($transient, $data, 8);
        } else {
            set_transient($transient, $data, 8);
        }
    }
}
