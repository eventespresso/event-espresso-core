<?php

use EventEspresso\core\domain\services\messages\MessageTemplateManager;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use EventEspresso\core\services\request\sanitizers\AllowedTags;

/**
 * espresso_events_Messages_Hooks_Extend
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 *
 * @package        espresso_events_Messages_Hooks_Extend
 * @subpackage     caffeinated/admin/extend/messages/espresso_events_Messages_Hooks_Extend.class.php
 * @author         Darren Ethier
 */
class espresso_events_Messages_Hooks_Extend extends espresso_events_Messages_Hooks
{
    /**
     * espresso_events_Messages_Hooks_Extend constructor.
     *
     * @param EE_Admin_Page $admin_page
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct(EE_Admin_Page $admin_page)
    {
        /**
         * Add cap restriction ... metaboxes should not show if user does not have the ability to edit_custom_messages
         */
        if (
            ! EE_Registry::instance()->CAP->current_user_can(
                'ee_edit_messages',
                'messages_events_editor_metabox'
            )
        ) {
            return;
        }
        add_filter(
            'FHEE__Events_Admin_Page___insert_update_cpt_item__event_update_callbacks',
            [$this, 'caf_updates']
        );
        add_action(
            'AHEE__Extend_Events_Admin_Page___duplicate_event__after',
            [$this, 'duplicate_custom_message_settings'],
            10,
            2
        );
        parent::__construct($admin_page);
    }


    /**
     * extending the properties set in espresso_events_Messages_Hooks
     *
     * @access protected
     * @return void
     */
    protected function _extend_properties()
    {
        define('EE_MSGS_EXTEND_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'messages/assets/');
        $this->_ajax_func = ['ee_msgs_create_new_custom' => 'create_new_custom'];
        $this->_metaboxes = [
            0 => [
                'page_route' => ['edit', 'create_new'],
                'func'       => 'messages_metabox',
                'label'      => esc_html__('Notifications', 'event_espresso'),
                'priority'   => 'high',
            ],
        ];

        // see explanation for layout in EE_Admin_Hooks
        $this->_scripts_styles = [
            'registers' => [
                'events_msg_admin'     => [
                    'url'     => EE_MSGS_EXTEND_ASSETS_URL . 'events_messages_admin.js',
                    'depends' => ['ee-dialog', 'ee-parse-uri', 'ee-serialize-full-array'],
                ],
                'events_msg_admin_css' => [
                    'url'  => EE_MSGS_EXTEND_ASSETS_URL . 'ee_msg_events_admin.css',
                    'type' => 'css',
                ],
            ],
            'enqueues'  => [
                'events_msg_admin'     => ['edit', 'create_new'],
                'events_msg_admin_css' => ['edit', 'create_new'],
            ],
        ];
    }


    public function caf_updates($update_callbacks)
    {
        $update_callbacks[] = [$this, 'attach_evt_message_templates'];
        return $update_callbacks;
    }


    /**
     * Handles attaching Message Templates to the Event on save.
     *
     * @param EE_Event $event EE event object
     * @param array    $data  The request data from the form
     * @return bool success or fail
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function attach_evt_message_templates(EE_Event $event, array $data): bool
    {
        $success = true;
        if (isset($data['event_message_templates_relation'])) {
            // first get all existing relations on the Event for message types.
            $existing_templates = EEM_Event_Message_Template::instance()->messageTemplateGroupIDsForEvent($event);
            $current_templates  = $data['event_message_templates_relation'];
            // new templates are those in the $current_templates array that don't exist in $existing_templates
            $templates_to_add = array_diff($current_templates, $existing_templates);
            foreach ($templates_to_add as $template_ID) {
                $template_to_add = EEM_Message_Template_Group::instance()->get_one_by_ID($template_ID);
                if (! $template_to_add instanceof EE_Base_Class) {
                    continue;
                }
                $added_template = $event->_add_relation_to($template_to_add, 'Message_Template_Group');
                // toggle success to false if we don't get back a template group object
                $success = $added_template instanceof EE_Message_Template_Group ? $success : false;
            }
            // templates to remove are those in the $existing_templates array that don't exist in $current_templates
            $templates_to_remove = array_diff($existing_templates, $current_templates);
            foreach ($templates_to_remove as $template_ID) {
                $template_to_remove = EEM_Message_Template_Group::instance()->get_one_by_ID($template_ID);
                if (! $template_to_remove instanceof EE_Base_Class) {
                    continue;
                }
                $removed_template = $event->_remove_relation_to($template_to_remove, 'Message_Template_Group');
                // toggle success to false if we don't get back a template group object
                $success = $removed_template instanceof EE_Message_Template_Group ? $success : false;
            }
        }
        return $success;
    }


    /**
     * @param $event
     * @param $callback_args
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function messages_metabox($event, $callback_args)
    {
        // convert 'evt_id' to 'EVT_ID'
        $EVT_ID = $this->request->getRequestParam('EVT_ID', 0, 'int');
        $EVT_ID = $this->request->getRequestParam('post', $EVT_ID, 'int');
        $EVT_ID = $this->request->getRequestParam('evt_id', $EVT_ID, 'int');
        $this->request->setRequestParam('EVT_ID', $EVT_ID);

        // get the active messengers (b/c messenger objects have the active message templates)
        /** @type EE_Message_Resource_Manager $message_resource_manager */
        $message_resource_manager = EE_Registry::instance()->load_lib('Message_Resource_Manager');
        $active_messengers        = $message_resource_manager->active_messengers();
        $tabs                     = [];

        // empty messengers?
        // Note message types will always have at least one available because every messenger has a default message type
        // associated with it (payment) if no other message types are selected.
        if (empty($active_messengers)) {
            $msg_activate_url = EE_Admin_Page::add_query_args_and_nonce(
                ['action' => 'settings'],
                EE_MSG_ADMIN_URL
            );
            $error_msg        = sprintf(
                esc_html__(
                    'There are no active messengers. So no notifications will go out for %1$sany%2$s events.  You will want to %3$sActivate a Messenger%4$s.',
                    'event_espresso'
                ),
                '<strong>',
                '</strong>',
                '<a href="' . esc_url_raw($msg_activate_url) . '">',
                '</a>'
            );
            $error_content    = '<div class="error"><p>' . $error_msg . '</p></div>';
            $internal_content = '<div id="messages-error"><p>' . $error_msg . '</p></div>';

            echo wp_kses($error_content, AllowedTags::getAllowedTags());
            echo wp_kses($internal_content, AllowedTags::getAllowedTags());
            return '';
        }

        // get content for active messengers
        foreach ($active_messengers as $name => $messenger) {
            // first check if there are any active message types for this messenger.
            $active_mts = $message_resource_manager->get_active_message_types_for_messenger($name);
            if (empty($active_mts)) {
                continue;
            }

            $tab_content = $messenger->get_messenger_admin_page_content(
                'events',
                'edit',
                ['event' => $EVT_ID]
            );

            if (! empty($tab_content)) {
                $tabs[ $name ] = $tab_content;
            }
        }

        // we want this to be tabbed content so let's use the EEH_Tabbed_Content::display helper.
        $tabbed_content = EEH_Tabbed_Content::display($tabs);
        if ($tabbed_content instanceof WP_Error) {
            $tabbed_content = $tabbed_content->get_error_message();
        }

        $notices = '
        <div id="espresso-ajax-loading" class="ajax-loader-grey">
            <span class="ee-spinner ee-spin"></span>
            <span class="hidden">' . esc_html__('loading...', 'event_espresso') . '</span>
        </div>
        <div class="ee-notices"></div>';

        if (defined('DOING_AJAX')) {
            return $tabbed_content;
        }

        do_action('AHEE__espresso_events_Messages_Hooks_Extend__messages_metabox__before_content');
        echo wp_kses(
            $notices . '<div class="messages-tabs-content">' . $tabbed_content . '</div>',
            AllowedTags::getWithFormTags()
        );
        do_action('AHEE__espresso_events_Messages_Hooks_Extend__messages_metabox__after_content');
        return '';
    }


    /**
     * Ajax callback for ee_msgs_create_new_custom ajax request.
     * Takes incoming GRP_ID and name and description values from ajax request
     * to create a new custom template based off of the incoming GRP_ID.
     *
     * @access public
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function create_new_custom()
    {
        if (! EE_Registry::instance()->CAP->current_user_can('ee_edit_messages', 'create_new_custom_ajax')) {
            wp_die(esc_html__('You don\'t have privileges to do this action', 'event_espresso'));
        }

        /** @var RequestInterface $request */
        $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
        $new_template = [];

        // let's clean up the request data a bit for downstream usage of name and description.
        $templateName = $this->request->getRequestParam('custom_template_args[MTP_name]', '');
        if (! $templateName) {
            EE_Error::add_error(
                esc_html__(
                    'Please provide a template name when creating a new message template.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        } else {
            $request->setRequestParam('templateName', $templateName);
            $templateDescription = $this->request->getRequestParam('custom_template_args[MTP_description]', '');
            $request->setRequestParam('templateDescription', $templateDescription);

            /** @var MessageTemplateManager $message_template_manager */
            $message_template_manager = LoaderFactory::getShared(MessageTemplateManager::class);
            $new_template = $message_template_manager->generateNewTemplates();
        }

        if ($templateName && $new_template) {
            EE_Error::overwrite_success();
            EE_Error::add_success(
                esc_html__(
                    'The new template has been created and automatically selected for this event. You can edit the new template by clicking the edit button. Note before this template is assigned to this event, the event must be saved.',
                    'event_espresso'
                )
            );
        }
        $this->returnJson(
            '',
            [
                'grpID'        => $new_template['GRP_ID'] ?? 0,
                'templateName' => $templateName,
                'success'      => (bool) $new_template,
                'close'        => true,
            ],
        );
    }


    public function create_new_admin_footer()
    {
        $this->edit_admin_footer();
    }


    /**
     * This is the dynamic method for this class
     * that will end up hooking into the 'admin_footer' hook on the 'edit_event' route in the events page.
     *
     * @return void
     * @throws DomainException
     */
    public function edit_admin_footer()
    {
        EEH_Template::display_template(
            EE_CORE_CAF_ADMIN_EXTEND . 'messages/templates/create_custom_template_form.template.php'
        );
    }


    /**
     * Callback for AHEE__Extend_Events_Admin_Page___duplicate_event__after hook used to ensure new events duplicate
     * the assigned custom message templates.
     *
     * @param EE_Event $new_event
     * @param EE_Event $original_event
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function duplicate_custom_message_settings(EE_Event $new_event, EE_Event $original_event)
    {
        $message_template_groups = $original_event->get_many_related('Message_Template_Group');
        foreach ($message_template_groups as $message_template_group) {
            $new_event->_add_relation_to($message_template_group, 'Message_Template_Group');
        }
        // save new event
        $new_event->save();
    }
}
