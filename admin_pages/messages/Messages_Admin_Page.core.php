<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 *
 * EE_Message_Admin_Page class
 *
 * for Admin setup of the message pages
 *
 * @package        Event Espresso
 * @subpackage     includes/core/message/EE_Message_Admin_Page.core.php
 * @author         Darren Ethier
 */
class Messages_Admin_Page extends EE_Admin_Page
{

    /**
     * @var EE_Message_Resource_Manager $_message_resource_manager
     */
    protected $_message_resource_manager;

    /**
     * @var string
     */
    protected $_active_message_type_name = '';

    /**
     * @var string
     */
    protected $_active_messenger_name = '';

    /**
     * @var EE_messenger $_active_messenger
     */
    protected $_active_messenger;

    protected $_activate_meta_box_type;

    protected $_current_message_meta_box;

    protected $_current_message_meta_box_object;

    protected $_context_switcher;

    protected $_shortcodes           = [];

    protected $_active_messengers    = [];

    protected $_active_message_types = [];

    /**
     * @var EE_Message_Template_Group $_message_template_group
     */
    protected $_message_template_group;

    protected $_m_mt_settings = [];


    /**
     * This is set via the _set_message_template_group method and holds whatever the template pack for the group is.
     * IF there is no group then it gets automatically set to the Default template pack.
     *
     * @since 4.5.0
     *
     * @var EE_Messages_Template_Pack
     */
    protected $_template_pack;


    /**
     * This is set via the _set_message_template_group method and holds whatever the template pack variation for the
     * group is.  If there is no group then it automatically gets set to default.
     *
     * @since 4.5.0
     *
     * @var string
     */
    protected $_variation;


    /**
     * @param bool $routing
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __construct($routing = true)
    {
        // make sure messages autoloader is running
        EED_Messages::set_autoloaders();
        parent::__construct($routing);
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _init_page_props()
    {
        $this->page_slug        = EE_MSG_PG_SLUG;
        $this->page_label       = esc_html__('Messages Settings', 'event_espresso');
        $this->_admin_base_url  = EE_MSG_ADMIN_URL;
        $this->_admin_base_path = EE_MSG_ADMIN;

        $this->_active_messenger_name    = $this->request->getRequestParam('messenger', '');
        $this->_active_message_type_name = $this->request->getRequestParam('message_type', '');

        $this->_load_message_resource_manager();
    }


    /**
     * loads messenger objects into the $_active_messengers property (so we can access the needed methods)
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    protected function _load_message_resource_manager()
    {
        $this->_message_resource_manager = EE_Registry::instance()->load_lib('Message_Resource_Manager');
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @deprecated 4.9.9.rc.014
     */
    public function get_messengers_for_list_table()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This method is no longer in use.  There is no replacement for it. The method was used to generate a set of values for use in creating a messenger filter dropdown which is now generated differently via %s',
                    'event_espresso'
                ),
                'Messages_Admin_Page::get_messengers_select_input()'
            ),
            '4.9.9.rc.014'
        );

        $m_values          = [];
        $active_messengers = EEM_Message::instance()->get_all(['group_by' => 'MSG_messenger']);
        // setup messengers for selects
        $i = 1;
        foreach ($active_messengers as $active_messenger) {
            if ($active_messenger instanceof EE_Message) {
                $m_values[ $i ]['id']   = $active_messenger->messenger();
                $m_values[ $i ]['text'] = ucwords($active_messenger->messenger_label());
                $i++;
            }
        }

        return $m_values;
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @deprecated 4.9.9.rc.014
     */
    public function get_message_types_for_list_table()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This method is no longer in use.  There is no replacement for it. The method was used to generate a set of values for use in creating a message type filter dropdown which is now generated differently via %s',
                    'event_espresso'
                ),
                'Messages_Admin_Page::get_message_types_select_input()'
            ),
            '4.9.9.rc.014'
        );

        $mt_values       = [];
        $active_messages = EEM_Message::instance()->get_all(['group_by' => 'MSG_message_type']);
        $i               = 1;
        foreach ($active_messages as $active_message) {
            if ($active_message instanceof EE_Message) {
                $mt_values[ $i ]['id']   = $active_message->message_type();
                $mt_values[ $i ]['text'] = ucwords($active_message->message_type_label());
                $i++;
            }
        }

        return $mt_values;
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @deprecated 4.9.9.rc.014
     */
    public function get_contexts_for_message_types_for_list_table()
    {
        EE_Error::doing_it_wrong(
            __METHOD__,
            sprintf(
                esc_html__(
                    'This method is no longer in use.  There is no replacement for it. The method was used to generate a set of values for use in creating a message type context filter dropdown which is now generated differently via %s',
                    'event_espresso'
                ),
                'Messages_Admin_Page::get_contexts_for_message_types_select_input()'
            ),
            '4.9.9.rc.014'
        );

        $contexts                = [];
        $active_message_contexts = EEM_Message::instance()->get_all(['group_by' => 'MSG_context']);
        foreach ($active_message_contexts as $active_message) {
            if ($active_message instanceof EE_Message) {
                $message_type = $active_message->message_type_object();
                if ($message_type instanceof EE_message_type) {
                    $message_type_contexts = $message_type->get_contexts();
                    foreach ($message_type_contexts as $context => $context_details) {
                        $contexts[ $context ] = $context_details['label'];
                    }
                }
            }
        }

        return $contexts;
    }


    /**
     * Generate select input with provided messenger options array.
     *
     * @param array $messenger_options Array of messengers indexed by messenger slug and values are the messenger
     *                                 labels.
     * @return string
     * @throws EE_Error
     */
    public function get_messengers_select_input($messenger_options)
    {
        // if empty or just one value then just return an empty string
        if (
            empty($messenger_options)
            || ! is_array($messenger_options)
            || count($messenger_options) === 1
        ) {
            return '';
        }
        // merge in default
        $messenger_options = array_merge(
            ['none_selected' => esc_html__('Show All Messengers', 'event_espresso')],
            $messenger_options
        );
        $input             = new EE_Select_Input(
            $messenger_options,
            [
                'html_name'  => 'ee_messenger_filter_by',
                'html_id'    => 'ee_messenger_filter_by',
                'html_class' => 'wide',
                'default'    => $this->request->getRequestParam('ee_messenger_filter_by', 'none_selected', 'title'),
            ]
        );

        return $input->get_html_for_input();
    }


    /**
     * Generate select input with provided message type options array.
     *
     * @param array $message_type_options Array of message types indexed by message type slug, and values are the
     *                                    message type labels
     * @return string
     * @throws EE_Error
     */
    public function get_message_types_select_input($message_type_options)
    {
        // if empty or count of options is 1 then just return an empty string
        if (
            empty($message_type_options)
            || ! is_array($message_type_options)
            || count($message_type_options) === 1
        ) {
            return '';
        }
        // merge in default
        $message_type_options = array_merge(
            ['none_selected' => esc_html__('Show All Message Types', 'event_espresso')],
            $message_type_options
        );
        $input                = new EE_Select_Input(
            $message_type_options,
            [
                'html_name'  => 'ee_message_type_filter_by',
                'html_id'    => 'ee_message_type_filter_by',
                'html_class' => 'wide',
                'default'    => $this->request->getRequestParam('ee_message_type_filter_by', 'none_selected', 'title'),
            ]
        );

        return $input->get_html_for_input();
    }


    /**
     * Generate select input with provide message type contexts array.
     *
     * @param array $context_options Array of message type contexts indexed by context slug, and values are the
     *                               context label.
     * @return string
     * @throws EE_Error
     */
    public function get_contexts_for_message_types_select_input($context_options)
    {
        // if empty or count of options is one then just return empty string
        if (
            empty($context_options)
            || ! is_array($context_options)
            || count($context_options) === 1
        ) {
            return '';
        }
        // merge in default
        $context_options = array_merge(
            ['none_selected' => esc_html__('Show all Contexts', 'event_espresso')],
            $context_options
        );
        $input           = new EE_Select_Input(
            $context_options,
            [
                'html_name'  => 'ee_context_filter_by',
                'html_id'    => 'ee_context_filter_by',
                'html_class' => 'wide',
                'default'    => $this->request->getRequestParam('ee_context_filter_by', 'none_selected', 'title'),
            ]
        );

        return $input->get_html_for_input();
    }


    protected function _ajax_hooks()
    {
        add_action('wp_ajax_activate_messenger', [$this, 'activate_messenger_toggle']);
        add_action('wp_ajax_activate_mt', [$this, 'activate_mt_toggle']);
        add_action('wp_ajax_ee_msgs_save_settings', [$this, 'save_settings']);
        add_action('wp_ajax_ee_msgs_update_mt_form', [$this, 'update_mt_form']);
        add_action('wp_ajax_switch_template_pack', [$this, 'switch_template_pack']);
        add_action('wp_ajax_toggle_context_template', [$this, 'toggle_context_template']);
    }


    protected function _define_page_props()
    {
        $this->_admin_page_title = $this->page_label;
        $this->_labels           = [
            'buttons'    => [
                'add'    => esc_html__('Add New Message Template', 'event_espresso'),
                'edit'   => esc_html__('Edit Message Template', 'event_espresso'),
                'delete' => esc_html__('Delete Message Template', 'event_espresso'),
            ],
            'publishbox' => esc_html__('Update Actions', 'event_espresso'),
        ];
    }


    /**
     *        an array for storing key => value pairs of request actions and their corresponding methods
     *
     * @access protected
     * @return void
     */
    protected function _set_page_routes()
    {
        $GRP_ID = $this->request->getRequestParam('GRP_ID', 0, 'int');
        $GRP_ID = $this->request->getRequestParam('id', $GRP_ID, 'int');
        $MSG_ID = $this->request->getRequestParam('MSG_ID', 0, 'int');

        $this->_page_routes = [
            'default'                          => [
                'func'       => '_message_queue_list_table',
                'capability' => 'ee_read_global_messages',
            ],
            'global_mtps'                      => [
                'func'       => '_ee_default_messages_overview_list_table',
                'capability' => 'ee_read_global_messages',
            ],
            'custom_mtps'                      => [
                'func'       => '_custom_mtps_preview',
                'capability' => 'ee_read_messages',
            ],
            'add_new_message_template'         => [
                'func'       => '_add_message_template',
                'capability' => 'ee_edit_messages',
                'noheader'   => true,
            ],
            'edit_message_template'            => [
                'func'       => '_edit_message_template',
                'capability' => 'ee_edit_message',
                'obj_id'     => $GRP_ID,
            ],
            'preview_message'                  => [
                'func'               => '_preview_message',
                'capability'         => 'ee_read_message',
                'obj_id'             => $GRP_ID,
                'noheader'           => true,
                'headers_sent_route' => 'display_preview_message',
            ],
            'display_preview_message'          => [
                'func'       => '_display_preview_message',
                'capability' => 'ee_read_message',
                'obj_id'     => $GRP_ID,
            ],
            'insert_message_template'          => [
                'func'       => '_insert_or_update_message_template',
                'capability' => 'ee_edit_messages',
                'args'       => ['new' => true],
                'noheader'   => true,
            ],
            'update_message_template'          => [
                'func'       => '_insert_or_update_message_template',
                'capability' => 'ee_edit_message',
                'obj_id'     => $GRP_ID,
                'args'       => ['new' => false],
                'noheader'   => true,
            ],
            'trash_message_template'           => [
                'func'       => '_trash_or_restore_message_template',
                'capability' => 'ee_delete_message',
                'obj_id'     => $GRP_ID,
                'args'       => ['trash' => true, 'all' => true],
                'noheader'   => true,
            ],
            'trash_message_template_context'   => [
                'func'       => '_trash_or_restore_message_template',
                'capability' => 'ee_delete_message',
                'obj_id'     => $GRP_ID,
                'args'       => ['trash' => true],
                'noheader'   => true,
            ],
            'restore_message_template'         => [
                'func'       => '_trash_or_restore_message_template',
                'capability' => 'ee_delete_message',
                'obj_id'     => $GRP_ID,
                'args'       => ['trash' => false, 'all' => true],
                'noheader'   => true,
            ],
            'restore_message_template_context' => [
                'func'       => '_trash_or_restore_message_template',
                'capability' => 'ee_delete_message',
                'obj_id'     => $GRP_ID,
                'args'       => ['trash' => false],
                'noheader'   => true,
            ],
            'delete_message_template'          => [
                'func'       => '_delete_message_template',
                'capability' => 'ee_delete_message',
                'obj_id'     => $GRP_ID,
                'noheader'   => true,
            ],
            'reset_to_default'                 => [
                'func'       => '_reset_to_default_template',
                'capability' => 'ee_edit_message',
                'obj_id'     => $GRP_ID,
                'noheader'   => true,
            ],
            'settings'                         => [
                'func'       => '_settings',
                'capability' => 'manage_options',
            ],
            'update_global_settings'           => [
                'func'       => '_update_global_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ],
            'generate_now'                     => [
                'func'       => '_generate_now',
                'capability' => 'ee_send_message',
                'noheader'   => true,
            ],
            'generate_and_send_now'            => [
                'func'       => '_generate_and_send_now',
                'capability' => 'ee_send_message',
                'noheader'   => true,
            ],
            'queue_for_resending'              => [
                'func'       => '_queue_for_resending',
                'capability' => 'ee_send_message',
                'noheader'   => true,
            ],
            'send_now'                         => [
                'func'       => '_send_now',
                'capability' => 'ee_send_message',
                'noheader'   => true,
            ],
            'delete_ee_message'                => [
                'func'       => '_delete_ee_messages',
                'capability' => 'ee_delete_messages',
                'noheader'   => true,
            ],
            'delete_ee_messages'               => [
                'func'       => '_delete_ee_messages',
                'capability' => 'ee_delete_messages',
                'noheader'   => true,
                'obj_id'     => $MSG_ID,
            ],
        ];
    }


    protected function _set_page_config()
    {
        $this->_page_config = [
            'default'                  => [
                'nav'           => [
                    'label' => esc_html__('Message Activity', 'event_espresso'),
                    'order' => 10,
                ],
                'list_table'    => 'EE_Message_List_Table',
                // 'qtips' => array( 'EE_Message_List_Table_Tips' ),
                'require_nonce' => false,
            ],
            'global_mtps'              => [
                'nav'           => [
                    'label' => esc_html__('Default Message Templates', 'event_espresso'),
                    'order' => 20,
                ],
                'list_table'    => 'Messages_Template_List_Table',
                'help_tabs'     => [
                    'messages_overview_help_tab'                                => [
                        'title'    => esc_html__('Messages Overview', 'event_espresso'),
                        'filename' => 'messages_overview',
                    ],
                    'messages_overview_messages_table_column_headings_help_tab' => [
                        'title'    => esc_html__('Messages Table Column Headings', 'event_espresso'),
                        'filename' => 'messages_overview_table_column_headings',
                    ],
                    'messages_overview_messages_filters_help_tab'               => [
                        'title'    => esc_html__('Message Filters', 'event_espresso'),
                        'filename' => 'messages_overview_filters',
                    ],
                    'messages_overview_messages_views_help_tab'                 => [
                        'title'    => esc_html__('Message Views', 'event_espresso'),
                        'filename' => 'messages_overview_views',
                    ],
                    'message_overview_message_types_help_tab'                   => [
                        'title'    => esc_html__('Message Types', 'event_espresso'),
                        'filename' => 'messages_overview_types',
                    ],
                    'messages_overview_messengers_help_tab'                     => [
                        'title'    => esc_html__('Messengers', 'event_espresso'),
                        'filename' => 'messages_overview_messengers',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array('Messages_Overview_Help_Tour'),
                'require_nonce' => false,
            ],
            'custom_mtps'              => [
                'nav'           => [
                    'label' => esc_html__('Custom Message Templates', 'event_espresso'),
                    'order' => 30,
                ],
                'help_tabs'     => [],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array(),
                'require_nonce' => false,
            ],
            'add_new_message_template' => [
                'nav'           => [
                    'label'      => esc_html__('Add New Message Templates', 'event_espresso'),
                    'order'      => 5,
                    'persistent' => false,
                ],
                'require_nonce' => false,
            ],
            'edit_message_template'    => [
                'labels'        => [
                    'buttons'    => [
                        'reset' => esc_html__('Reset Templates', 'event_espresso'),
                    ],
                    'publishbox' => esc_html__('Update Actions', 'event_espresso'),
                ],
                'nav'           => [
                    'label'      => esc_html__('Edit Message Templates', 'event_espresso'),
                    'order'      => 5,
                    'persistent' => false,
                    'url'        => '',
                ],
                'metaboxes'     => ['_publish_post_box', '_register_edit_meta_boxes'],
                'has_metaboxes' => true,
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array('Message_Templates_Edit_Help_Tour'),
                'help_tabs'     => [
                    'edit_message_template'            => [
                        'title'    => esc_html__('Message Template Editor', 'event_espresso'),
                        'callback' => 'edit_message_template_help_tab',
                    ],
                    'message_templates_help_tab'       => [
                        'title'    => esc_html__('Message Templates', 'event_espresso'),
                        'filename' => 'messages_templates',
                    ],
                    'message_template_shortcodes'      => [
                        'title'    => esc_html__('Message Shortcodes', 'event_espresso'),
                        'callback' => 'message_template_shortcodes_help_tab',
                    ],
                    'message_preview_help_tab'         => [
                        'title'    => esc_html__('Message Preview', 'event_espresso'),
                        'filename' => 'messages_preview',
                    ],
                    'messages_overview_other_help_tab' => [
                        'title'    => esc_html__('Messages Other', 'event_espresso'),
                        'filename' => 'messages_overview_other',
                    ],
                ],
                'require_nonce' => false,
            ],
            'display_preview_message'  => [
                'nav'           => [
                    'label'      => esc_html__('Message Preview', 'event_espresso'),
                    'order'      => 5,
                    'url'        => '',
                    'persistent' => false,
                ],
                'help_tabs'     => [
                    'preview_message' => [
                        'title'    => esc_html__('About Previews', 'event_espresso'),
                        'callback' => 'preview_message_help_tab',
                    ],
                ],
                'require_nonce' => false,
            ],
            'settings'                 => [
                'nav'           => [
                    'label' => esc_html__('Settings', 'event_espresso'),
                    'order' => 40,
                ],
                'metaboxes'     => ['_messages_settings_metaboxes'],
                'help_tabs'     => [
                    'messages_settings_help_tab'               => [
                        'title'    => esc_html__('Messages Settings', 'event_espresso'),
                        'filename' => 'messages_settings',
                    ],
                    'messages_settings_message_types_help_tab' => [
                        'title'    => esc_html__('Activating / Deactivating Message Types', 'event_espresso'),
                        'filename' => 'messages_settings_message_types',
                    ],
                    'messages_settings_messengers_help_tab'    => [
                        'title'    => esc_html__('Activating / Deactivating Messengers', 'event_espresso'),
                        'filename' => 'messages_settings_messengers',
                    ],
                ],
                // disabled temporarily. see: https://github.com/eventespresso/eventsmart.com-website/issues/836
                // 'help_tour'     => array('Messages_Settings_Help_Tour'),
                'require_nonce' => false,
            ],
        ];
    }


    protected function _add_screen_options()
    {
        // todo
    }


    protected function _add_screen_options_global_mtps()
    {
        /**
         * Note: the reason for the value swap here on $this->_admin_page_title is because $this->_per_page_screen_options
         * uses the $_admin_page_title property and we want different outputs in the different spots.
         */
        $page_title              = $this->_admin_page_title;
        $this->_admin_page_title = esc_html__('Global Message Templates', 'event_espresso');
        $this->_per_page_screen_option();
        $this->_admin_page_title = $page_title;
    }


    protected function _add_screen_options_default()
    {
        $this->_admin_page_title = esc_html__('Message Activity', 'event_espresso');
        $this->_per_page_screen_option();
    }


    // none of the below group are currently used for Messages
    protected function _add_feature_pointers()
    {
    }


    public function admin_init()
    {
    }


    public function admin_notices()
    {
    }


    public function admin_footer_scripts()
    {
    }


    public function messages_help_tab()
    {
        EEH_Template::display_template(EE_MSG_TEMPLATE_PATH . 'ee_msg_messages_help_tab.template.php');
    }


    public function messengers_help_tab()
    {
        EEH_Template::display_template(EE_MSG_TEMPLATE_PATH . 'ee_msg_messenger_help_tab.template.php');
    }


    public function message_types_help_tab()
    {
        EEH_Template::display_template(EE_MSG_TEMPLATE_PATH . 'ee_msg_message_type_help_tab.template.php');
    }


    public function messages_overview_help_tab()
    {
        EEH_Template::display_template(EE_MSG_TEMPLATE_PATH . 'ee_msg_overview_help_tab.template.php');
    }


    public function message_templates_help_tab()
    {
        EEH_Template::display_template(EE_MSG_TEMPLATE_PATH . 'ee_msg_message_templates_help_tab.template.php');
    }


    public function edit_message_template_help_tab()
    {
        $args['img1'] = '<img src="' . EE_MSG_ASSETS_URL . 'images/editor.png' . '" alt="'
                        . esc_attr__('Editor Title', 'event_espresso')
                        . '" />';
        $args['img2'] = '<img src="' . EE_MSG_ASSETS_URL . 'images/switch-context.png' . '" alt="'
                        . esc_attr__('Context Switcher and Preview', 'event_espresso')
                        . '" />';
        $args['img3'] = '<img class="left" src="' . EE_MSG_ASSETS_URL . 'images/form-fields.png' . '" alt="'
                        . esc_attr__('Message Template Form Fields', 'event_espresso')
                        . '" />';
        $args['img4'] = '<img class="right" src="' . EE_MSG_ASSETS_URL . 'images/shortcodes-metabox.png' . '" alt="'
                        . esc_attr__('Shortcodes Metabox', 'event_espresso')
                        . '" />';
        $args['img5'] = '<img class="right" src="' . EE_MSG_ASSETS_URL . 'images/publish-meta-box.png' . '" alt="'
                        . esc_attr__('Publish Metabox', 'event_espresso')
                        . '" />';
        EEH_Template::display_template(
            EE_MSG_TEMPLATE_PATH . 'ee_msg_messages_templates_editor_help_tab.template.php',
            $args
        );
    }


    /**
     * @throws ReflectionException
     * @throws EE_Error
     */
    public function message_template_shortcodes_help_tab()
    {
        $this->_set_shortcodes();
        $args['shortcodes'] = $this->_shortcodes;
        EEH_Template::display_template(
            EE_MSG_TEMPLATE_PATH . 'ee_msg_messages_shortcodes_help_tab.template.php',
            $args
        );
    }


    public function preview_message_help_tab()
    {
        EEH_Template::display_template(EE_MSG_TEMPLATE_PATH . 'ee_msg_preview_help_tab.template.php');
    }


    public function settings_help_tab()
    {
        $args['img1'] = '<img class="inline-text" src="' . EE_MSG_ASSETS_URL . 'images/email-tab-active.png'
                        . '" alt="' . esc_attr__('Active Email Tab', 'event_espresso') . '" />';
        $args['img2'] = '<img class="inline-text" src="' . EE_MSG_ASSETS_URL . 'images/email-tab-inactive.png'
                        . '" alt="' . esc_attr__('Inactive Email Tab', 'event_espresso') . '" />';
        $args['img3'] = '<div class="switch">'
                        . '<input class="ee-on-off-toggle ee-toggle-round-flat"'
                        . ' type="checkbox" checked="checked">'
                        . '<label for="ee-on-off-toggle-on"></label>'
                        . '</div>';
        $args['img4'] = '<div class="switch">'
                        . '<input class="ee-on-off-toggle ee-toggle-round-flat"'
                        . ' type="checkbox">'
                        . '<label for="ee-on-off-toggle-on"></label>'
                        . '</div>';
        EEH_Template::display_template(EE_MSG_TEMPLATE_PATH . 'ee_msg_messages_settings_help_tab.template.php', $args);
    }


    public function load_scripts_styles()
    {
        wp_register_style('espresso_ee_msg', EE_MSG_ASSETS_URL . 'ee_message_admin.css', EVENT_ESPRESSO_VERSION);
        wp_enqueue_style('espresso_ee_msg');

        wp_register_script(
            'ee-messages-settings',
            EE_MSG_ASSETS_URL . 'ee-messages-settings.js',
            ['jquery-ui-droppable', 'ee-serialize-full-array'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_register_script(
            'ee-msg-list-table-js',
            EE_MSG_ASSETS_URL . 'ee_message_admin_list_table.js',
            ['ee-dialog'],
            EVENT_ESPRESSO_VERSION
        );
    }


    public function load_scripts_styles_default()
    {
        wp_enqueue_script('ee-msg-list-table-js');
    }


    public function wp_editor_css($mce_css)
    {
        // if we're on the edit_message_template route
        if ($this->_req_action === 'edit_message_template' && $this->_active_messenger instanceof EE_messenger) {
            $message_type_name = $this->_active_message_type_name;

            // we're going to REPLACE the existing mce css
            // we need to get the css file location from the active messenger
            $mce_css = $this->_active_messenger->get_variation(
                $this->_template_pack,
                $message_type_name,
                true,
                'wpeditor',
                $this->_variation
            );
        }

        return $mce_css;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function load_scripts_styles_edit_message_template()
    {

        $this->_set_shortcodes();

        EE_Registry::$i18n_js_strings['confirm_default_reset']        = sprintf(
            esc_html__(
                'Are you sure you want to reset the %s %s message templates?  Remember continuing will reset the templates for all contexts in this messenger and message type group.',
                'event_espresso'
            ),
            $this->_message_template_group->messenger_obj()->label['singular'],
            $this->_message_template_group->message_type_obj()->label['singular']
        );
        EE_Registry::$i18n_js_strings['confirm_switch_template_pack'] = esc_html__(
            'Switching the template pack for a messages template will reset the content for the template so the new layout is loaded.  Any custom content in the existing template will be lost. Are you sure you wish to do this?',
            'event_espresso'
        );
        EE_Registry::$i18n_js_strings['server_error']                 = esc_html__(
            'An unknown error occurred on the server while attempting to process your request. Please refresh the page and try again or contact support.',
            'event_espresso'
        );

        wp_register_script(
            'ee_msgs_edit_js',
            EE_MSG_ASSETS_URL . 'ee_message_editor.js',
            ['jquery'],
            EVENT_ESPRESSO_VERSION
        );

        wp_enqueue_script('ee_admin_js');
        wp_enqueue_script('ee_msgs_edit_js');

        // add in special css for tiny_mce
        add_filter('mce_css', [$this, 'wp_editor_css']);
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function load_scripts_styles_display_preview_message()
    {
        $this->_set_message_template_group();
        if ($this->_active_messenger_name) {
            $this->_active_messenger = $this->_message_resource_manager->get_active_messenger(
                $this->_active_messenger_name
            );
        }

        wp_enqueue_style(
            'espresso_preview_css',
            $this->_active_messenger->get_variation(
                $this->_template_pack,
                $this->_active_message_type_name,
                true,
                'preview',
                $this->_variation
            )
        );
    }


    public function load_scripts_styles_settings()
    {
        wp_register_style(
            'ee-message-settings',
            EE_MSG_ASSETS_URL . 'ee_message_settings.css',
            [],
            EVENT_ESPRESSO_VERSION
        );
        wp_enqueue_style('ee-text-links');
        wp_enqueue_style('ee-message-settings');
        wp_enqueue_script('ee-messages-settings');
    }


    /**
     * set views array for List Table
     */
    public function _set_list_table_views_global_mtps()
    {
        $this->_views = [
            'in_use' => [
                'slug'  => 'in_use',
                'label' => esc_html__('In Use', 'event_espresso'),
                'count' => 0,
            ],
        ];
    }


    /**
     * Set views array for the Custom Template List Table
     */
    public function _set_list_table_views_custom_mtps()
    {
        $this->_set_list_table_views_global_mtps();
        $this->_views['in_use']['bulk_action'] = [
            'trash_message_template' => esc_html__('Move to Trash', 'event_espresso'),
        ];
    }


    /**
     * set views array for message queue list table
     *
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function _set_list_table_views_default()
    {
        EE_Registry::instance()->load_helper('Template');

        $common_bulk_actions = EE_Registry::instance()->CAP->current_user_can(
            'ee_send_message',
            'message_list_table_bulk_actions'
        )
            ? [
                'generate_now'          => esc_html__('Generate Now', 'event_espresso'),
                'generate_and_send_now' => esc_html__('Generate and Send Now', 'event_espresso'),
                'queue_for_resending'   => esc_html__('Queue for Resending', 'event_espresso'),
                'send_now'              => esc_html__('Send Now', 'event_espresso'),
            ]
            : [];

        $delete_bulk_action = EE_Registry::instance()->CAP->current_user_can(
            'ee_delete_messages',
            'message_list_table_bulk_actions'
        )
            ? ['delete_ee_messages' => esc_html__('Delete Messages', 'event_espresso')]
            : [];


        $this->_views = [
            'all' => [
                'slug'        => 'all',
                'label'       => esc_html__('All', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array_merge($common_bulk_actions, $delete_bulk_action),
            ],
        ];


        foreach (EEM_Message::instance()->all_statuses() as $status) {
            if ($status === EEM_Message::status_debug_only && ! EEM_Message::debug()) {
                continue;
            }
            $status_bulk_actions = $common_bulk_actions;
            // unset bulk actions not applying to status
            if (! empty($status_bulk_actions)) {
                switch ($status) {
                    case EEM_Message::status_idle:
                    case EEM_Message::status_resend:
                        $status_bulk_actions['send_now'] = $common_bulk_actions['send_now'];
                        break;

                    case EEM_Message::status_failed:
                    case EEM_Message::status_debug_only:
                    case EEM_Message::status_messenger_executing:
                        $status_bulk_actions = [];
                        break;

                    case EEM_Message::status_incomplete:
                        unset($status_bulk_actions['queue_for_resending'], $status_bulk_actions['send_now']);
                        break;

                    case EEM_Message::status_retry:
                    case EEM_Message::status_sent:
                        unset($status_bulk_actions['generate_now'], $status_bulk_actions['generate_and_send_now']);
                        break;
                }
            }

            // skip adding messenger executing status to views because it will be included with the Failed view.
            if ($status === EEM_Message::status_messenger_executing) {
                continue;
            }

            $this->_views[ strtolower($status) ] = [
                'slug'        => strtolower($status),
                'label'       => EEH_Template::pretty_status($status, false, 'sentence'),
                'count'       => 0,
                'bulk_action' => array_merge($status_bulk_actions, $delete_bulk_action),
            ];
        }
    }


    /**
     * @throws EE_Error
     */
    protected function _ee_default_messages_overview_list_table()
    {
        $this->_admin_page_title = esc_html__('Default Message Templates', 'event_espresso');
        $this->display_admin_list_table_page_with_no_sidebar();
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _message_queue_list_table()
    {
        $this->_search_btn_label                   = esc_html__('Message Activity', 'event_espresso');
        $this->_template_args['per_column']        = 6;
        $this->_template_args['after_list_table']  = $this->_display_legend($this->_message_legend_items());
        $this->_template_args['before_list_table'] = '<h3>'
                                                     . EEM_Message::instance()->get_pretty_label_for_results()
                                                     . '</h3>';
        $this->display_admin_list_table_page_with_no_sidebar();
    }


    /**
     * @throws EE_Error
     */
    protected function _message_legend_items()
    {

        $action_css_classes = EEH_MSG_Template::get_message_action_icons();
        $action_items       = [];

        foreach ($action_css_classes as $action_item => $action_details) {
            if ($action_item === 'see_notifications_for') {
                continue;
            }
            $action_items[ $action_item ] = [
                'class' => $action_details['css_class'],
                'desc'  => $action_details['label'],
            ];
        }

        /** @var array $status_items status legend setup */
        $status_items = [
            'sent_status'                => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Message::status_sent,
                'desc'  => EEH_Template::pretty_status(EEM_Message::status_sent, false, 'sentence'),
            ],
            'idle_status'                => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Message::status_idle,
                'desc'  => EEH_Template::pretty_status(EEM_Message::status_idle, false, 'sentence'),
            ],
            'failed_status'              => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Message::status_failed,
                'desc'  => EEH_Template::pretty_status(EEM_Message::status_failed, false, 'sentence'),
            ],
            'messenger_executing_status' => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Message::status_messenger_executing,
                'desc'  => EEH_Template::pretty_status(EEM_Message::status_messenger_executing, false, 'sentence'),
            ],
            'resend_status'              => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Message::status_resend,
                'desc'  => EEH_Template::pretty_status(EEM_Message::status_resend, false, 'sentence'),
            ],
            'incomplete_status'          => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Message::status_incomplete,
                'desc'  => EEH_Template::pretty_status(EEM_Message::status_incomplete, false, 'sentence'),
            ],
            'retry_status'               => [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Message::status_retry,
                'desc'  => EEH_Template::pretty_status(EEM_Message::status_retry, false, 'sentence'),
            ],
        ];
        if (EEM_Message::debug()) {
            $status_items['debug_only_status'] = [
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Message::status_debug_only,
                'desc'  => EEH_Template::pretty_status(EEM_Message::status_debug_only, false, 'sentence'),
            ];
        }

        return array_merge($action_items, $status_items);
    }


    /**
     * @throws EE_Error
     */
    protected function _custom_mtps_preview()
    {
        $this->_admin_page_title              = esc_html__('Custom Message Templates (Preview)', 'event_espresso');
        $this->_template_args['preview_img']  = '<img src="' . EE_MSG_ASSETS_URL . 'images/custom_mtps_preview.png"'
                                                . ' alt="' . esc_attr__(
                                                    'Preview Custom Message Templates screenshot',
                                                    'event_espresso'
                                                ) . '" />';
        $this->_template_args['preview_text'] = '<strong>'
                                                . esc_html__(
                                                    'Custom Message Templates is a feature that is only available in the premium version of Event Espresso 4 which is available with a support license purchase on EventEspresso.com. With the Custom Message Templates feature, you are able to create custom message templates and assign them on a per-event basis.',
                                                    'event_espresso'
                                                )
                                                . '</strong>';

        $this->display_admin_caf_preview_page('custom_message_types', false);
    }


    /**
     * get_message_templates
     * This gets all the message templates for listing on the overview list.
     *
     * @access public
     * @param int    $per_page the amount of templates groups to show per page
     * @param string $type     the current _view we're getting templates for
     * @param bool   $count    return count?
     * @param bool   $all      disregard any paging info (get all data);
     * @param bool   $global   whether to return just global (true) or custom templates (false)
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_message_templates(
        $per_page = 10,
        $type = 'in_use',
        $count = false,
        $all = false,
        $global = true
    ) {

        $MTP = EEM_Message_Template_Group::instance();

        $orderby = $this->request->getRequestParam('orderby', 'GRP_ID');
        $this->request->setRequestParam('orderby', $orderby);

        $order        = $this->request->getRequestParam('order', 'ASC');
        $current_page = $this->request->getRequestParam('paged', 1, 'int');
        $per_page     = $this->request->getRequestParam('perpage', $per_page, 'int');

        $offset = ($current_page - 1) * $per_page;
        $limit  = $all ? null : [$offset, $per_page];

        // options will match what is in the _views array property
        switch ($type) {
            case 'in_use':
                $templates = $MTP->get_all_active_message_templates($orderby, $order, $limit, $count, $global, true);
                break;
            default:
                $templates = $MTP->get_all_trashed_grouped_message_templates($orderby, $order, $limit, $count, $global);
        }

        return $templates;
    }


    /**
     * filters etc might need a list of installed message_types
     *
     * @return array an array of message type objects
     */
    public function get_installed_message_types()
    {
        $installed_message_types = $this->_message_resource_manager->installed_message_types();
        $installed               = [];

        foreach ($installed_message_types as $message_type) {
            $installed[ $message_type->name ] = $message_type;
        }

        return $installed;
    }


    /**
     * _add_message_template
     *
     * This is used when creating a custom template. All Custom Templates start based off another template.
     *
     * @param string $message_type
     * @param string $messenger
     * @param string $GRP_ID
     *
     * @throws EE_error
     * @throws ReflectionException
     */
    protected function _add_message_template($message_type = '', $messenger = '', $GRP_ID = '')
    {
        // set values override any request data
        $message_type = ! empty($message_type) ? $message_type : $this->_active_message_type_name;
        $messenger    = ! empty($messenger) ? $messenger : $this->_active_messenger_name;
        $GRP_ID       = ! empty($GRP_ID) ? $GRP_ID : $this->request->getRequestParam('GRP_ID', 0, 'int');

        // we need messenger and message type.  They should be coming from the event editor. If not here then return error
        if (empty($message_type) || empty($messenger)) {
            throw new EE_Error(
                esc_html__(
                    'Sorry, but we can\'t create new templates because we\'re missing the messenger or message type',
                    'event_espresso'
                )
            );
        }

        // we need the GRP_ID for the template being used as the base for the new template
        if (empty($GRP_ID)) {
            throw new EE_Error(
                esc_html__(
                    'In order to create a custom message template the GRP_ID of the template being used as a base is needed',
                    'event_espresso'
                )
            );
        }

        // let's just make sure the template gets generated!

        // we need to reassign some variables for what the insert is expecting
        $this->request->setRequestParam('MTP_messenger', $messenger);
        $this->request->setRequestParam('MTP_message_type', $message_type);
        $this->request->setRequestParam('GRP_ID', $GRP_ID);

        $this->_insert_or_update_message_template(true);
    }


    /**
     * public wrapper for the _add_message_template method
     *
     * @param string $message_type     message type slug
     * @param string $messenger        messenger slug
     * @param int    $GRP_ID           GRP_ID for the related message template group this new template will be based
     *                                 off of.
     * @throws EE_error
     * @throws ReflectionException
     */
    public function add_message_template($message_type, $messenger, $GRP_ID)
    {
        $this->_add_message_template($message_type, $messenger, $GRP_ID);
    }


    /**
     * _edit_message_template
     *
     * @access protected
     * @return void
     * @throws InvalidIdentifierException
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _edit_message_template()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $template_fields = '';
        $sidebar_fields  = '';
        // we filter the tinyMCE settings to remove the validation since message templates by their nature will not have
        // valid html in the templates.
        add_filter('tiny_mce_before_init', [$this, 'filter_tinymce_init'], 10, 2);

        $GRP_ID = $this->request->getRequestParam('id', 0, 'int');
        $EVT_ID = $this->request->getRequestParam('evt_id', 0, 'int');

        $this->_set_shortcodes(); // this also sets the _message_template property.
        $message_template_group = $this->_message_template_group;
        $c_label                = $message_template_group->context_label();
        $c_config               = $message_template_group->contexts_config();

        reset($c_config);
        $context = $this->request->getRequestParam('context', key($c_config));
        $context = strtolower($context);

        $action = empty($GRP_ID) ? 'insert_message_template' : 'update_message_template';

        $edit_message_template_form_url = add_query_arg(
            ['action' => $action, 'noheader' => true],
            EE_MSG_ADMIN_URL
        );

        // set active messenger for this view
        $this->_active_messenger         = $this->_message_resource_manager->get_active_messenger(
            $message_template_group->messenger()
        );
        $this->_active_message_type_name = $message_template_group->message_type();


        // Do we have any validation errors?
        $validators = $this->_get_transient();
        $v_fields   = ! empty($validators) ? array_keys($validators) : [];


        // we need to assemble the title from Various details
        $context_label = sprintf(
            esc_html__('(%s %s)', 'event_espresso'),
            $c_config[ $context ]['label'],
            ucwords($c_label['label'])
        );

        $title = sprintf(
            esc_html__(' %s %s Template %s', 'event_espresso'),
            ucwords($message_template_group->messenger_obj()->label['singular']),
            ucwords($message_template_group->message_type_obj()->label['singular']),
            $context_label
        );

        $this->_template_args['GRP_ID']           = $GRP_ID;
        $this->_template_args['message_template'] = $message_template_group;
        $this->_template_args['is_extra_fields']  = false;


        // let's get EEH_MSG_Template so we can get template form fields
        $template_field_structure = EEH_MSG_Template::get_fields(
            $message_template_group->messenger(),
            $message_template_group->message_type()
        );

        if (! $template_field_structure) {
            $template_field_structure = false;
            $template_fields          = esc_html__(
                'There was an error in assembling the fields for this display (you should see an error message)',
                'event_espresso'
            );
        }


        $message_templates = $message_template_group->context_templates();


        // if we have the extra key.. then we need to remove the content index from the template_field_structure as it
        // will get handled in the "extra" array.
        if (is_array($template_field_structure[ $context ]) && isset($template_field_structure[ $context ]['extra'])) {
            foreach ($template_field_structure[ $context ]['extra'] as $reference_field => $new_fields) {
                unset($template_field_structure[ $context ][ $reference_field ]);
            }
        }

        // let's loop through the template_field_structure and actually assemble the input fields!
        if (! empty($template_field_structure)) {
            foreach ($template_field_structure[ $context ] as $template_field => $field_setup_array) {
                // if this is an 'extra' template field then we need to remove any existing fields that are keyed up in
                // the extra array and reset them.
                if ($template_field === 'extra') {
                    $this->_template_args['is_extra_fields'] = true;
                    foreach ($field_setup_array as $reference_field => $new_fields_array) {
                        $message_template = $message_templates[ $context ][ $reference_field ];
                        $content          = $message_template instanceof EE_Message_Template
                            ? $message_template->get('MTP_content')
                            : '';
                        foreach ($new_fields_array as $extra_field => $extra_array) {
                            // let's verify if we need this extra field via the shortcodes parameter.
                            $continue = false;
                            if (isset($extra_array['shortcodes_required'])) {
                                foreach ((array) $extra_array['shortcodes_required'] as $shortcode) {
                                    if (! array_key_exists($shortcode, $this->_shortcodes)) {
                                        $continue = true;
                                    }
                                }
                                if ($continue) {
                                    continue;
                                }
                            }

                            $field_id                                  = $reference_field
                                                                         . '-'
                                                                         . $extra_field
                                                                         . '-content';
                            $template_form_fields[ $field_id ]         = $extra_array;
                            $template_form_fields[ $field_id ]['name'] = 'MTP_template_fields['
                                                                         . $reference_field
                                                                         . '][content]['
                                                                         . $extra_field . ']';
                            $css_class                                 = isset($extra_array['css_class'])
                                ? $extra_array['css_class']
                                : '';

                            $template_form_fields[ $field_id ]['css_class'] = ! empty($v_fields)
                                                                              && in_array($extra_field, $v_fields, true)
                                                                              && (
                                                                                  is_array($validators[ $extra_field ])
                                                                                  && isset($validators[ $extra_field ]['msg'])
                                                                              )
                                ? 'validate-error ' . $css_class
                                : $css_class;

                            $template_form_fields[ $field_id ]['value'] = ! empty($message_templates)
                                                                          && isset($content[ $extra_field ])
                                ? $content[ $extra_field ]
                                : '';

                            // do we have a validation error?  if we do then let's use that value instead
                            $template_form_fields[ $field_id ]['value'] = isset($validators[ $extra_field ])
                                ? $validators[ $extra_field ]['value']
                                : $template_form_fields[ $field_id ]['value'];


                            $template_form_fields[ $field_id ]['db-col'] = 'MTP_content';

                            // shortcode selector
                            $field_name_to_use                                   = $extra_field === 'main'
                                ? 'content'
                                : $extra_field;
                            $template_form_fields[ $field_id ]['append_content'] = $this->_get_shortcode_selector(
                                $field_name_to_use,
                                $field_id
                            );
                        }
                        $template_field_MTP_id           = $reference_field . '-MTP_ID';
                        $template_field_template_name_id = $reference_field . '-name';

                        $template_form_fields[ $template_field_MTP_id ] = [
                            'name'       => 'MTP_template_fields[' . $reference_field . '][MTP_ID]',
                            'label'      => null,
                            'input'      => 'hidden',
                            'type'       => 'int',
                            'required'   => false,
                            'validation' => false,
                            'value'      => ! empty($message_templates) ? $message_template->ID() : '',
                            'css_class'  => '',
                            'format'     => '%d',
                            'db-col'     => 'MTP_ID',
                        ];

                        $template_form_fields[ $template_field_template_name_id ] = [
                            'name'       => 'MTP_template_fields[' . $reference_field . '][name]',
                            'label'      => null,
                            'input'      => 'hidden',
                            'type'       => 'string',
                            'required'   => false,
                            'validation' => true,
                            'value'      => $reference_field,
                            'css_class'  => '',
                            'format'     => '%s',
                            'db-col'     => 'MTP_template_field',
                        ];
                    }
                    continue; // skip the next stuff, we got the necessary fields here for this dataset.
                } else {
                    $field_id                                   = $template_field . '-content';
                    $template_form_fields[ $field_id ]          = $field_setup_array;
                    $template_form_fields[ $field_id ]['name']  =
                        'MTP_template_fields[' . $template_field . '][content]';
                    $message_template                           =
                        isset($message_templates[ $context ][ $template_field ])
                            ? $message_templates[ $context ][ $template_field ]
                            : null;
                    $template_form_fields[ $field_id ]['value'] = ! empty($message_templates)
                                                                  && is_array($message_templates[ $context ])
                                                                  && $message_template instanceof EE_Message_Template
                        ? $message_template->get('MTP_content')
                        : '';

                    // do we have a validator error for this field?  if we do then we'll use that value instead
                    $template_form_fields[ $field_id ]['value'] = isset($validators[ $template_field ])
                        ? $validators[ $template_field ]['value']
                        : $template_form_fields[ $field_id ]['value'];


                    $template_form_fields[ $field_id ]['db-col']    = 'MTP_content';
                    $css_class                                      = isset($field_setup_array['css_class'])
                        ? $field_setup_array['css_class']
                        : '';
                    $template_form_fields[ $field_id ]['css_class'] = ! empty($v_fields)
                                                                      && in_array($template_field, $v_fields, true)
                                                                      && isset($validators[ $template_field ]['msg'])
                        ? 'validate-error ' . $css_class
                        : $css_class;

                    // shortcode selector
                    $template_form_fields[ $field_id ]['append_content'] = $this->_get_shortcode_selector(
                        $template_field,
                        $field_id
                    );
                }

                // k took care of content field(s) now let's take care of others.

                $template_field_MTP_id                 = $template_field . '-MTP_ID';
                $template_field_field_template_name_id = $template_field . '-name';

                // foreach template field there are actually two form fields created
                $template_form_fields[ $template_field_MTP_id ] = [
                    'name'       => 'MTP_template_fields[' . $template_field . '][MTP_ID]',
                    'label'      => null,
                    'input'      => 'hidden',
                    'type'       => 'int',
                    'required'   => false,
                    'validation' => true,
                    'value'      => $message_template instanceof EE_Message_Template ? $message_template->ID() : '',
                    'css_class'  => '',
                    'format'     => '%d',
                    'db-col'     => 'MTP_ID',
                ];

                $template_form_fields[ $template_field_field_template_name_id ] = [
                    'name'       => 'MTP_template_fields[' . $template_field . '][name]',
                    'label'      => null,
                    'input'      => 'hidden',
                    'type'       => 'string',
                    'required'   => false,
                    'validation' => true,
                    'value'      => $template_field,
                    'css_class'  => '',
                    'format'     => '%s',
                    'db-col'     => 'MTP_template_field',
                ];
            }

            // add other fields
            $template_form_fields['ee-msg-current-context'] = [
                'name'       => 'MTP_context',
                'label'      => null,
                'input'      => 'hidden',
                'type'       => 'string',
                'required'   => false,
                'validation' => true,
                'value'      => $context,
                'css_class'  => '',
                'format'     => '%s',
                'db-col'     => 'MTP_context',
            ];

            $template_form_fields['ee-msg-grp-id'] = [
                'name'       => 'GRP_ID',
                'label'      => null,
                'input'      => 'hidden',
                'type'       => 'int',
                'required'   => false,
                'validation' => true,
                'value'      => $GRP_ID,
                'css_class'  => '',
                'format'     => '%d',
                'db-col'     => 'GRP_ID',
            ];

            $template_form_fields['ee-msg-messenger'] = [
                'name'       => 'MTP_messenger',
                'label'      => null,
                'input'      => 'hidden',
                'type'       => 'string',
                'required'   => false,
                'validation' => true,
                'value'      => $message_template_group->messenger(),
                'css_class'  => '',
                'format'     => '%s',
                'db-col'     => 'MTP_messenger',
            ];

            $template_form_fields['ee-msg-message-type'] = [
                'name'       => 'MTP_message_type',
                'label'      => null,
                'input'      => 'hidden',
                'type'       => 'string',
                'required'   => false,
                'validation' => true,
                'value'      => $message_template_group->message_type(),
                'css_class'  => '',
                'format'     => '%s',
                'db-col'     => 'MTP_message_type',
            ];

            $sidebar_form_fields['ee-msg-is-global'] = [
                'name'       => 'MTP_is_global',
                'label'      => esc_html__('Global Template', 'event_espresso'),
                'input'      => 'hidden',
                'type'       => 'int',
                'required'   => false,
                'validation' => true,
                'value'      => $message_template_group->get('MTP_is_global'),
                'css_class'  => '',
                'format'     => '%d',
                'db-col'     => 'MTP_is_global',
            ];

            $sidebar_form_fields['ee-msg-is-override'] = [
                'name'       => 'MTP_is_override',
                'label'      => esc_html__('Override all custom', 'event_espresso'),
                'input'      => $message_template_group->is_global() ? 'checkbox' : 'hidden',
                'type'       => 'int',
                'required'   => false,
                'validation' => true,
                'value'      => $message_template_group->get('MTP_is_override'),
                'css_class'  => '',
                'format'     => '%d',
                'db-col'     => 'MTP_is_override',
            ];

            $sidebar_form_fields['ee-msg-is-active'] = [
                'name'       => 'MTP_is_active',
                'label'      => esc_html__('Active Template', 'event_espresso'),
                'input'      => 'hidden',
                'type'       => 'int',
                'required'   => false,
                'validation' => true,
                'value'      => $message_template_group->is_active(),
                'css_class'  => '',
                'format'     => '%d',
                'db-col'     => 'MTP_is_active',
            ];

            $sidebar_form_fields['ee-msg-deleted'] = [
                'name'       => 'MTP_deleted',
                'label'      => null,
                'input'      => 'hidden',
                'type'       => 'int',
                'required'   => false,
                'validation' => true,
                'value'      => $message_template_group->get('MTP_deleted'),
                'css_class'  => '',
                'format'     => '%d',
                'db-col'     => 'MTP_deleted',
            ];
            $sidebar_form_fields['ee-msg-author']  = [
                'name'       => 'MTP_user_id',
                'label'      => esc_html__('Author', 'event_espresso'),
                'input'      => 'hidden',
                'type'       => 'int',
                'required'   => false,
                'validation' => false,
                'value'      => $message_template_group->user(),
                'format'     => '%d',
                'db-col'     => 'MTP_user_id',
            ];

            $sidebar_form_fields['ee-msg-route'] = [
                'name'  => 'action',
                'input' => 'hidden',
                'type'  => 'string',
                'value' => $action,
            ];

            $sidebar_form_fields['ee-msg-id']        = [
                'name'  => 'id',
                'input' => 'hidden',
                'type'  => 'int',
                'value' => $GRP_ID,
            ];
            $sidebar_form_fields['ee-msg-evt-nonce'] = [
                'name'  => $action . '_nonce',
                'input' => 'hidden',
                'type'  => 'string',
                'value' => wp_create_nonce($action . '_nonce'),
            ];

            $template_switch = $this->request->getRequestParam('template_switch');
            if ($template_switch) {
                $sidebar_form_fields['ee-msg-template-switch'] = [
                    'name'  => 'template_switch',
                    'input' => 'hidden',
                    'type'  => 'int',
                    'value' => 1,
                ];
            }


            $template_fields = $this->_generate_admin_form_fields($template_form_fields);
            $sidebar_fields  = $this->_generate_admin_form_fields($sidebar_form_fields);
        } //end if ( !empty($template_field_structure) )

        // set extra content for publish box
        $this->_template_args['publish_box_extra_content'] = $sidebar_fields;
        $this->_set_publish_post_box_vars(
            'id',
            $GRP_ID,
            false,
            add_query_arg(
                ['action' => 'global_mtps'],
                $this->_admin_base_url
            )
        );

        // add preview button
        $preview_url    = parent::add_query_args_and_nonce(
            [
                'message_type' => $message_template_group->message_type(),
                'messenger'    => $message_template_group->messenger(),
                'context'      => $context,
                'GRP_ID'       => $GRP_ID,
                'evt_id'       => $EVT_ID,
                'action'       => 'preview_message',
            ],
            $this->_admin_base_url
        );
        $preview_button = '<a href="' . $preview_url . '" class="button-secondary messages-preview-button">'
                          . esc_html__('Preview', 'event_espresso')
                          . '</a>';


        // setup context switcher
        $context_switcher_args = [
            'page'    => 'espresso_messages',
            'action'  => 'edit_message_template',
            'id'      => $GRP_ID,
            'evt_id'  => $EVT_ID,
            'context' => $context,
            'extra'   => $preview_button,
        ];
        $this->_set_context_switcher($message_template_group, $context_switcher_args);


        // main box
        $this->_template_args['template_fields']                         = $template_fields;
        $this->_template_args['sidebar_box_id']                          = 'details';
        $this->_template_args['action']                                  = $action;
        $this->_template_args['context']                                 = $context;
        $this->_template_args['edit_message_template_form_url']          = $edit_message_template_form_url;
        $this->_template_args['learn_more_about_message_templates_link'] =
            $this->_learn_more_about_message_templates_link();


        $this->_template_args['before_admin_page_content'] = $this->add_context_switcher();
        $this->_template_args['before_admin_page_content'] .= $this->add_active_context_element(
            $message_template_group,
            $context,
            $context_label
        );
        $this->_template_args['before_admin_page_content'] .= $this->_add_form_element_before();
        $this->_template_args['after_admin_page_content']  = $this->_add_form_element_after();

        $this->_template_path = $this->_template_args['GRP_ID']
            ? EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_edit_meta_box.template.php'
            : EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_add_meta_box.template.php';

        // send along EE_Message_Template_Group object for further template use.
        $this->_template_args['MTP'] = $message_template_group;

        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            $this->_template_path,
            $this->_template_args,
            true
        );


        // finally, let's set the admin_page title
        $this->_admin_page_title = sprintf(esc_html__('Editing %s', 'event_espresso'), $title);


        // we need to take care of setting the shortcodes property for use elsewhere.
        $this->_set_shortcodes();


        // final template wrapper
        $this->display_admin_page_with_sidebar();
    }


    public function filter_tinymce_init($mceInit, $editor_id)
    {
        return $mceInit;
    }


    public function add_context_switcher()
    {
        return $this->_context_switcher;
    }


    /**
     * Adds the activation/deactivation toggle for the message template context.
     *
     * @param EE_Message_Template_Group $message_template_group
     * @param string                    $context
     * @param string                    $context_label
     * @return string
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidIdentifierException
     * @throws ReflectionException
     */
    protected function add_active_context_element(
        EE_Message_Template_Group $message_template_group,
        $context,
        $context_label
    ) {
        $template_args = [
            'context'                   => $context,
            'nonce'                     => wp_create_nonce('activate_' . $context . '_toggle_nonce'),
            'is_active'                 => $message_template_group->is_context_active($context),
            'on_off_action'             => $message_template_group->is_context_active($context)
                ? 'context-off'
                : 'context-on',
            'context_label'             => str_replace(['(', ')'], '', $context_label),
            'message_template_group_id' => $message_template_group->ID(),
        ];
        return EEH_Template::display_template(
            EE_MSG_TEMPLATE_PATH . 'ee_msg_editor_active_context_element.template.php',
            $template_args,
            true
        );
    }


    /**
     * Ajax callback for `toggle_context_template` ajax action.
     * Handles toggling the message context on or off.
     *
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     */
    public function toggle_context_template()
    {
        $success = true;
        // check for required data
        if (
            ! (
                $this->request->requestParamIsSet('message_template_group_id')
                && $this->request->requestParamIsSet('context')
                && $this->request->requestParamIsSet('status')
            )
        ) {
            EE_Error::add_error(
                esc_html__('Required data for doing this action is not available.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }

        $nonce   = $this->request->getRequestParam('toggle_context_nonce', '');
        $context = $this->request->getRequestParam('context', '');
        $status  = $this->request->getRequestParam('status', '');

        $this->_verify_nonce($nonce, "activate_{$context}_toggle_nonce");

        if ($status !== 'off' && $status !== 'on') {
            EE_Error::add_error(
                sprintf(
                    esc_html__('The given status (%s) is not valid. Must be "off" or "on"', 'event_espresso'),
                    $status
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }
        $message_template_group_id = $this->request->getRequestParam('message_template_group_id', 0, 'int');
        $message_template_group    = EEM_Message_Template_Group::instance()->get_one_by_ID($message_template_group_id);
        if (! $message_template_group instanceof EE_Message_Template_Group) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'Unable to change the active state because the given id "%1$d" does not match a valid "%2$s"',
                        'event_espresso'
                    ),
                    $message_template_group_id,
                    'EE_Message_Template_Group'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }
        if ($success) {
            $success = $status === 'off'
                ? $message_template_group->deactivate_context($context)
                : $message_template_group->activate_context($context);
        }
        $this->_template_args['success'] = $success;
        $this->_return_json();
    }


    public function _add_form_element_before()
    {
        return '<form method="post" action="'
               . $this->_template_args['edit_message_template_form_url']
               . '" id="ee-msg-edit-frm">';
    }


    public function _add_form_element_after()
    {
        return '</form>';
    }


    /**
     * This executes switching the template pack for a message template.
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since 4.5.0
     */
    public function switch_template_pack()
    {

        $GRP_ID        = $this->request->getRequestParam('GRP_ID', 0, 'int');
        $template_pack = $this->request->getRequestParam('template_pack', '');

        // verify we have needed values.
        if (empty($GRP_ID) || empty($template_pack)) {
            $this->_template_args['error'] = true;
            EE_Error::add_error(
                esc_html__('The required date for switching templates is not available.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        } else {
            // get template, set the new template_pack and then reset to default
            /** @var EE_Message_Template_Group $message_template_group */
            $message_template_group = EEM_Message_Template_Group::instance()->get_one_by_ID($GRP_ID);

            $message_template_group->set_template_pack_name($template_pack);
            $this->request->setRequestParam('msgr', $message_template_group->messenger());
            $this->request->setRequestParam('mt', $message_template_group->message_type());

            $query_args = $this->_reset_to_default_template();

            if (empty($query_args['id'])) {
                EE_Error::add_error(
                    esc_html__(
                        'Something went wrong with switching the template pack. Please try again or contact EE support',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                $this->_template_args['error'] = true;
            } else {
                $template_label       = $message_template_group->get_template_pack()->label;
                $template_pack_labels = $message_template_group->messenger_obj()->get_supports_labels();
                EE_Error::add_success(
                    sprintf(
                        esc_html__(
                            'This message template has been successfully switched to use the %1$s %2$s.  Please wait while the page reloads with your new template.',
                            'event_espresso'
                        ),
                        $template_label,
                        $template_pack_labels->template_pack
                    )
                );
                // generate the redirect url for js.
                $url = self::add_query_args_and_nonce($query_args, $this->_admin_base_url);

                $this->_template_args['data']['redirect_url'] = $url;
                $this->_template_args['success']              = true;
            }

            $this->_return_json();
        }
    }


    /**
     * This handles resetting the template for the given messenger/message_type so that users can start from scratch if
     * they want.
     *
     * @access protected
     * @return array|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _reset_to_default_template()
    {

        $templates    = [];
        $GRP_ID       = $this->request->getRequestParam('GRP_ID', 0, 'int');
        $messenger    = $this->request->getRequestParam('msgr');
        $message_type = $this->request->getRequestParam('mt');
        // we need to make sure we've got the info we need.
        if (! ($GRP_ID && $messenger && $message_type)) {
            EE_Error::add_error(
                esc_html__(
                    'In order to reset the template to its default we require the messenger, message type, and message template GRP_ID to know what is being reset.  At least one of these is missing.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }

        // all templates will be reset to whatever the defaults are
        // for the global template matching the messenger and message type.
        $success = ! empty($GRP_ID);

        if ($success) {
            // let's first determine if the incoming template is a global template,
            // if it isn't then we need to get the global template matching messenger and message type.
            // $MTPG = EEM_Message_Template_Group::instance()->get_one_by_ID( $GRP_ID );


            // note this is ONLY deleting the template fields (Message Template rows) NOT the message template group.
            $success = $this->_delete_mtp_permanently($GRP_ID, false);

            if ($success) {
                // if successfully deleted, lets generate the new ones.
                // Note. We set GLOBAL to true, because resets on ANY template
                // will use the related global template defaults for regeneration.
                // This means that if a custom template is reset it resets to whatever the related global template is.
                // HOWEVER, we DO keep the template pack and template variation set
                // for the current custom template when resetting.
                $templates = $this->_generate_new_templates($messenger, $message_type, $GRP_ID, true);
            }
        }

        // any error messages?
        if (! $success) {
            EE_Error::add_error(
                esc_html__(
                    'Something went wrong with deleting existing templates. Unable to reset to default',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }

        // all good, let's add a success message!
        if ($success && ! empty($templates)) {
            // the info for the template we generated is the first element in the returned array
            // $templates = $templates[0];
            EE_Error::overwrite_success();
            EE_Error::add_success(esc_html__('Templates have been reset to defaults.', 'event_espresso'));
        }


        $query_args = [
            'id'      => isset($templates[0]['GRP_ID']) ? $templates[0]['GRP_ID'] : null,
            'context' => isset($templates[0]['MTP_context']) ? $templates[0]['MTP_context'] : null,
            'action'  => isset($templates[0]['GRP_ID']) ? 'edit_message_template' : 'global_mtps',
        ];

        // if called via ajax then we return query args otherwise redirect
        if (defined('DOING_AJAX') && DOING_AJAX) {
            return $query_args;
        } else {
            $this->_redirect_after_action(false, '', '', $query_args, true);

            return null;
        }
    }


    /**
     * Retrieve and set the message preview for display.
     *
     * @param bool $send if TRUE then we are doing an actual TEST send with the results of the preview.
     * @return string
     * @throws ReflectionException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function _preview_message($send = false)
    {
        // first make sure we've got the necessary parameters
        $GRP_ID       = $this->request->getRequestParam('GRP_ID', 0, 'int');
        if (! ($GRP_ID && $this->_active_messenger_name && $this->_active_message_type_name)) {
            EE_Error::add_error(
                esc_html__('Missing necessary parameters for displaying preview', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }

        $context = $this->request->getRequestParam('context');
        // get the preview!
        $preview = EED_Messages::preview_message(
            $this->_active_message_type_name,
            $context,
            $this->_active_messenger_name,
            $send
        );

        if ($send) {
            return $preview;
        }

        // if we have an evt_id set on the request, use it.
        $EVT_ID = $this->request->getRequestParam('evt_id', 0, 'int');

        // let's add a button to go back to the edit view
        $query_args             = [
            'id'      => $GRP_ID,
            'evt_id'  => $EVT_ID,
            'context' => $context,
            'action'  => 'edit_message_template',
        ];
        $go_back_url            = parent::add_query_args_and_nonce($query_args, $this->_admin_base_url);
        $preview_button         = '<a href="'
                                  . $go_back_url
                                  . '" class="button-secondary messages-preview-go-back-button">'
                                  . esc_html__('Go Back to Edit', 'event_espresso')
                                  . '</a>';
        $message_types          = $this->get_installed_message_types();
        $active_messenger       = $this->_message_resource_manager->get_active_messenger($this->_active_messenger_name);
        $active_messenger_label = $active_messenger instanceof EE_messenger
            ? ucwords($active_messenger->label['singular'])
            : esc_html__('Unknown Messenger', 'event_espresso');
        // let's provide a helpful title for context
        $preview_title = sprintf(
            esc_html__('Viewing Preview for %s %s Message Template', 'event_espresso'),
            $active_messenger_label,
            ucwords($message_types[ $this->_active_message_type_name ]->label['singular'])
        );
        if (empty($preview)) {
            $this->noEventsErrorMessage();
        }
        // setup display of preview.
        $this->_admin_page_title                    = $preview_title;
        $this->_template_args['admin_page_title']   = $preview_title;
        $this->_template_args['admin_page_content'] = $preview_button . '<br />' . $preview;
        $this->_template_args['data']['force_json'] = true;

        return '';
    }


    /**
     * Used to set an error if there are no events available for generating a preview/test send.
     *
     * @param bool $test_send Whether the error should be generated for the context of a test send.
     */
    protected function noEventsErrorMessage($test_send = false)
    {
        $events_url = parent::add_query_args_and_nonce(
            [
                'action' => 'default',
                'page'   => 'espresso_events',
            ],
            admin_url('admin.php')
        );
        $message    = $test_send
            ? esc_html__(
                'A test message could not be sent for this message template because there are no events created yet. The preview system uses actual events for generating the test message. %1$sGo see your events%2$s!',
                'event_espresso'
            )
            : esc_html__(
                'There is no preview for this message template available because there are no events created yet. The preview system uses actual events for generating the preview. %1$sGo see your events%2$s!',
                'event_espresso'
            );

        EE_Error::add_attention(
            sprintf(
                $message,
                "<a href='{$events_url}'>",
                '</a>'
            )
        );
    }


    /**
     * The initial _preview_message is on a no headers route.  It will optionally call this if necessary otherwise it
     * gets called automatically.
     *
     * @return void
     * @throws EE_Error
     * @since 4.5.0
     *
     */
    protected function _display_preview_message()
    {
        $this->display_admin_page_with_no_sidebar();
    }


    /**
     * registers metaboxes that should show up on the "edit_message_template" page
     *
     * @access protected
     * @return void
     */
    protected function _register_edit_meta_boxes()
    {
        add_meta_box(
            'mtp_valid_shortcodes',
            esc_html__('Valid Shortcodes', 'event_espresso'),
            [$this, 'shortcode_meta_box'],
            $this->_current_screen->id,
            'side'
        );
        add_meta_box(
            'mtp_extra_actions',
            esc_html__('Extra Actions', 'event_espresso'),
            [$this, 'extra_actions_meta_box'],
            $this->_current_screen->id,
            'side',
            'high'
        );
        add_meta_box(
            'mtp_templates',
            esc_html__('Template Styles', 'event_espresso'),
            [$this, 'template_pack_meta_box'],
            $this->_current_screen->id,
            'side',
            'high'
        );
    }


    /**
     * metabox content for all template pack and variation selection.
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.5.0
     */
    public function template_pack_meta_box()
    {
        $this->_set_message_template_group();

        $tp_collection = EEH_MSG_Template::get_template_pack_collection();

        $tp_select_values = [];

        foreach ($tp_collection as $tp) {
            // only include template packs that support this messenger and message type!
            $supports = $tp->get_supports();
            if (
                ! isset($supports[ $this->_message_template_group->messenger() ])
                || ! in_array(
                    $this->_message_template_group->message_type(),
                    $supports[ $this->_message_template_group->messenger() ],
                    true
                )
            ) {
                // not supported
                continue;
            }

            $tp_select_values[] = [
                'text' => $tp->label,
                'id'   => $tp->dbref,
            ];
        }

        // if empty $tp_select_values then we make sure default is set because EVERY message type should be supported by
        // the default template pack.  This still allows for the odd template pack to override.
        if (empty($tp_select_values)) {
            $tp_select_values[] = [
                'text' => esc_html__('Default', 'event_espresso'),
                'id'   => 'default',
            ];
        }

        // setup variation select values for the currently selected template.
        $variations               = $this->_message_template_group->get_template_pack()->get_variations(
            $this->_message_template_group->messenger(),
            $this->_message_template_group->message_type()
        );
        $variations_select_values = [];
        foreach ($variations as $variation => $label) {
            $variations_select_values[] = [
                'text' => $label,
                'id'   => $variation,
            ];
        }

        $template_pack_labels = $this->_message_template_group->messenger_obj()->get_supports_labels();

        $template_args['template_packs_selector']        = EEH_Form_Fields::select_input(
            'MTP_template_pack',
            $tp_select_values,
            $this->_message_template_group->get_template_pack_name()
        );
        $template_args['variations_selector']            = EEH_Form_Fields::select_input(
            'MTP_template_variation',
            $variations_select_values,
            $this->_message_template_group->get_template_pack_variation()
        );
        $template_args['template_pack_label']            = $template_pack_labels->template_pack;
        $template_args['template_variation_label']       = $template_pack_labels->template_variation;
        $template_args['template_pack_description']      = $template_pack_labels->template_pack_description;
        $template_args['template_variation_description'] = $template_pack_labels->template_variation_description;

        $template = EE_MSG_TEMPLATE_PATH . 'template_pack_and_variations_metabox.template.php';

        EEH_Template::display_template($template, $template_args);
    }


    /**
     * This meta box holds any extra actions related to Message Templates
     * For now, this includes Resetting templates to defaults and sending a test email.
     *
     * @access  public
     * @return void
     * @throws EE_Error
     */
    public function extra_actions_meta_box()
    {
        $template_form_fields = [];

        $extra_args = [
            'msgr'   => $this->_message_template_group->messenger(),
            'mt'     => $this->_message_template_group->message_type(),
            'GRP_ID' => $this->_message_template_group->GRP_ID(),
        ];
        // first we need to see if there are any fields
        $fields = $this->_message_template_group->messenger_obj()->get_test_settings_fields();

        if (! empty($fields)) {
            // yup there be fields
            foreach ($fields as $field => $config) {
                $field_id = $this->_message_template_group->messenger() . '_' . $field;
                $existing = $this->_message_template_group->messenger_obj()->get_existing_test_settings();
                $default  = isset($config['default']) ? $config['default'] : '';
                $default  = isset($config['value']) ? $config['value'] : $default;

                // if type is hidden and the value is empty
                // something may have gone wrong so let's correct with the defaults
                $fix                = $config['input'] === 'hidden'
                                      && isset($existing[ $field ])
                                      && empty($existing[ $field ])
                    ? $default
                    : '';
                $existing[ $field ] = isset($existing[ $field ]) && empty($fix)
                    ? $existing[ $field ]
                    : $fix;

                $template_form_fields[ $field_id ] = [
                    'name'       => 'test_settings_fld[' . $field . ']',
                    'label'      => $config['label'],
                    'input'      => $config['input'],
                    'type'       => $config['type'],
                    'required'   => $config['required'],
                    'validation' => $config['validation'],
                    'value'      => isset($existing[ $field ]) ? $existing[ $field ] : $default,
                    'css_class'  => $config['css_class'],
                    'options'    => isset($config['options']) ? $config['options'] : [],
                    'default'    => $default,
                    'format'     => $config['format'],
                ];
            }
        }

        $test_settings_html = ! empty($template_form_fields)
            ? $this->_generate_admin_form_fields($template_form_fields, 'string', 'ee_tst_settings_flds')
            : '';

        // print out $test_settings_fields
        if (! empty($test_settings_html)) {
            $test_settings_html .= '<input type="submit" class="button-primary mtp-test-button alignright" ';
            $test_settings_html .= 'name="test_button" value="';
            $test_settings_html .= esc_html__('Test Send', 'event_espresso');
            $test_settings_html .= '" /><div style="clear:both"></div>';
        }

        // and button
        $test_settings_html .= '<p>';
        $test_settings_html .= esc_html__('Need to reset this message type and start over?', 'event_espresso');
        $test_settings_html .= '</p>';
        $test_settings_html .= '<div class="publishing-action alignright resetbutton">';
        $test_settings_html .= $this->get_action_link_or_button(
            'reset_to_default',
            'reset',
            $extra_args,
            'button-primary reset-default-button'
        );
        $test_settings_html .= '</div><div style="clear:both"></div>';
        echo $test_settings_html; // already escaped
    }


    /**
     * This returns the shortcode selector skeleton for a given context and field.
     *
     * @param string $field           The name of the field retrieving shortcodes for.
     * @param string $linked_input_id The css id of the input that the shortcodes get added to.
     * @return string
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since 4.9.rc.000
     */
    protected function _get_shortcode_selector($field, $linked_input_id)
    {
        $template_args = [
            'shortcodes'      => $this->_get_shortcodes([$field]),
            'fieldname'       => $field,
            'linked_input_id' => $linked_input_id,
        ];

        return EEH_Template::display_template(
            EE_MSG_TEMPLATE_PATH . 'shortcode_selector_skeleton.template.php',
            $template_args,
            true
        );
    }


    /**
     * This just takes care of returning the meta box content for shortcodes (only used on the edit message template
     * page)
     *
     * @access public
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function shortcode_meta_box()
    {
        $shortcodes = $this->_get_shortcodes([], false);
        // just make sure the shortcodes property is set
        // $messenger = $this->_message_template_group->messenger_obj();
        // now let's set the content depending on the status of the shortcodes array
        if (empty($shortcodes)) {
            echo '<p>' . esc_html__('There are no valid shortcodes available', 'event_espresso') . '</p>';
            return;
        }
        ?>
        <div style="float:right; margin-top:10px">
            <?php echo $this->_get_help_tab_link('message_template_shortcodes'); // already escaped
            ?>
        </div>
        <p class="small-text">
            <?php printf(
                esc_html__(
                    'You can view the shortcodes usable in your template by clicking the %s icon next to each field.',
                    'event_espresso'
                ),
                '<span class="dashicons dashicons-menu"></span>'
            ); ?>
        </p>
        <?php
    }


    /**
     * used to set the $_shortcodes property for when its needed elsewhere.
     *
     * @access protected
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _set_shortcodes()
    {

        // no need to run this if the property is already set
        if (! empty($this->_shortcodes)) {
            return;
        }

        $this->_shortcodes = $this->_get_shortcodes();
    }


    /**
     * gets all shortcodes for a given template group. (typically used by _set_shortcodes to set the $_shortcodes
     * property)
     *
     * @access  protected
     * @param array   $fields  include an array of specific field names that you want to be used to get the shortcodes
     *                         for. Defaults to all (for the given context)
     * @param boolean $merged  Whether to merge all the shortcodes into one list of unique shortcodes
     * @return array Shortcodes indexed by fieldname and the an array of shortcode/label pairs OR if merged is
     *                         true just an array of shortcode/label pairs.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _get_shortcodes($fields = [], $merged = true)
    {
        $this->_set_message_template_group();

        // we need the messenger and message template to retrieve the valid shortcodes array.
        $GRP_ID = $this->request->getRequestParam('id', 0, 'int');
        if (empty($GRP_ID)) {
            return [];
        }
        $context = $this->request->getRequestParam(
            'messenger',
            key($this->_message_template_group->contexts_config())
        );
        return $this->_message_template_group->get_shortcodes($context, $fields, $merged);
    }


    /**
     * This sets the _message_template property (containing the called message_template object)
     *
     * @access protected
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _set_message_template_group()
    {

        if (! empty($this->_message_template_group)) {
            return;
        } //get out if this is already set.

        $GRP_ID = $this->request->getRequestParam('GRP_ID', 0, 'int');
        $GRP_ID = $this->request->getRequestParam('id', $GRP_ID, 'int');

        // let's get the message templates
        $MTP = EEM_Message_Template_Group::instance();

        if (empty($GRP_ID)) {
            $this->_message_template_group = $MTP->create_default_object();
        } else {
            $this->_message_template_group = $MTP->get_one_by_ID($GRP_ID);
        }

        $this->_template_pack = $this->_message_template_group->get_template_pack();
        $this->_variation     = $this->_message_template_group->get_template_pack_variation();
    }


    /**
     * sets up a context switcher for edit forms
     *
     * @access  protected
     * @param EE_Message_Template_Group $template_group_object the template group object being displayed on the form
     * @param array                     $args                  various things the context switcher needs.
     * @throws EE_Error
     */
    protected function _set_context_switcher(EE_Message_Template_Group $template_group_object, $args)
    {
        $context_details = $template_group_object->contexts_config();
        $context_label   = $template_group_object->context_label();
        ob_start();
        ?>
        <div class="ee-msg-switcher-container">
            <form method="get" action="<?php echo esc_url_raw(EE_MSG_ADMIN_URL); ?>" id="ee-msg-context-switcher-frm">
                <?php
                foreach ($args as $name => $value) {
                    if ($name === 'context' || empty($value) || $name === 'extra') {
                        continue;
                    }
                    ?>
                    <input type="hidden"
                           name="<?php echo esc_attr($name); ?>"
                           value="<?php echo esc_attr($value); ?>"
                    />
                    <?php
                }
                // setup nonce_url
                wp_nonce_field($args['action'] . '_nonce', $args['action'] . '_nonce', false);
                $id = 'ee-' . sanitize_key($context_label['label']) . '-select';
                ?>
                <label for='<?php echo esc_attr($id); ?>' class='screen-reader-text'>
                    <?php esc_html_e('message context options', 'event_espresso'); ?>
                </label>
                <select id="<?php echo esc_attr($id); ?>" name="context">
                    <?php
                    $context_templates = $template_group_object->context_templates();
                    if (is_array($context_templates)) :
                        foreach ($context_templates as $context => $template_fields) :
                            $checked = ($context === $args['context']) ? 'selected="selected"' : '';
                            ?>
                            <option value="<?php echo esc_attr($context); ?>" <?php echo esc_attr($checked); ?>>
                                <?php echo $context_details[ $context ]['label']; // already escaped ?>
                            </option>
                        <?php endforeach;
                    endif; ?>
                </select>
                <?php $button_text = sprintf(
                    esc_html__('Switch %s', 'event_espresso'),
                    ucwords($context_label['label'])
                ); ?>
                <input class='button-secondary'
                       id="submit-msg-context-switcher-sbmt"
                       type="submit"
                       value="<?php echo esc_attr($button_text); ?>"
                />
            </form>
            <?php echo $args['extra']; // already escaped ?>
        </div> <!-- end .ee-msg-switcher-container -->
        <?php
        $this->_context_switcher = ob_get_clean();
    }


    /**
     * utility for sanitizing new values coming in.
     * Note: this is only used when updating a context.
     *
     * @access protected
     *
     * @param int $index This helps us know which template field to select from the request array.
     *
     * @return array
     */
    protected function _set_message_template_column_values($index)
    {
        return [
            'MTP_ID'             => $this->request->getRequestParam('MTP_ID', 0, 'int'),
            'GRP_ID'             => $this->request->getRequestParam('GRP_ID', 0, 'int'),
            'MTP_user_id'        => $this->request->getRequestParam('MTP_user_id', 0, 'int'),
            'MTP_messenger'      => strtolower($this->request->getRequestParam('MTP_messenger', '')),
            'MTP_message_type'   => strtolower($this->request->getRequestParam('MTP_message_type', '')),
            'MTP_template_field' => strtolower($this->request->getRequestParam('name', '')),
            'MTP_context'        => strtolower($this->request->getRequestParam('MTP_context', '')),
            'MTP_content'        => $this->request->getRequestParam(
                "MTP_template_fields[{$index}][content]",
                '',
                'string',
                true
            ),
            'MTP_is_global'      => $this->request->getRequestParam('MTP_is_global', 0, 'int'),
            'MTP_is_override'    => $this->request->getRequestParam('MTP_is_override', 0, 'int'),
            'MTP_deleted'        => $this->request->getRequestParam('MTP_deleted', 0, 'int'),
            'MTP_is_active'      => $this->request->getRequestParam('MTP_is_active', 0, 'int'),
        ];
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _insert_or_update_message_template($new = false)
    {

        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $success  = 0;
        $override = false;

        // setup notices description
        $messenger_slug = $this->request->getRequestParam('MTP_messenger', '');

        // need the message type and messenger objects to be able to use the labels for the notices
        $messenger_object = $this->_message_resource_manager->get_messenger($messenger_slug);
        $messenger_label  = $messenger_object instanceof EE_messenger
            ? ucwords($messenger_object->label['singular'])
            : '';

        $message_type_slug   = $this->request->getRequestParam('MTP_message_type', '');
        $message_type_object = $this->_message_resource_manager->get_message_type($message_type_slug);

        $message_type_label = $message_type_object instanceof EE_message_type
            ? ucwords($message_type_object->label['singular'])
            : '';

        $context_slug = $this->request->getRequestParam('MTP_context', '');
        $context      = ucwords(str_replace('_', ' ', $context_slug));

        $item_desc   = $messenger_label && $message_type_label
            ? $messenger_label . ' ' . $message_type_label . ' ' . $context . ' '
            : '';
        $item_desc   .= 'Message Template';
        $query_args  = [];
        $edit_array  = [];
        $action_desc = '';

        $GRP_ID = $this->request->getRequestParam('GRP_ID', 0, 'int');
        // if this is "new" then we need to generate the default contexts
        // for the selected messenger/message_type for user to edit.
        if ($new) {
            if ($edit_array = $this->_generate_new_templates($messenger_slug, $message_type_slug, $GRP_ID)) {
                if (empty($edit_array)) {
                    $success = 0;
                } else {
                    $success    = 1;
                    $edit_array = $edit_array[0];
                    $query_args = [
                        'id'      => $edit_array['GRP_ID'],
                        'context' => $edit_array['MTP_context'],
                        'action'  => 'edit_message_template',
                    ];
                }
            }
            $action_desc = 'created';
        } else {
            $MTPG = EEM_Message_Template_Group::instance();
            $MTP  = EEM_Message_Template::instance();


            // run update for each template field in displayed context
            $template_fields = $this->request->getRequestParam('MTP_template_fields');
            if (! $template_fields) {
                EE_Error::add_error(
                    esc_html__(
                        'There was a problem saving the template fields from the form because I didn\'t receive any actual template field data.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
                $success = 0;
            } else {
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
                    $context_slug,
                    $messenger_slug,
                    $message_type_slug
                );

                $system_validation = $MTPG->validate(
                    $template_fields,
                    $context_slug,
                    $messenger_slug,
                    $message_type_slug
                );

                $system_validation = ! is_array($system_validation) && $system_validation ? []
                    : $system_validation;
                $validates         = array_merge($custom_validation, $system_validation);

                // if $validate returned error messages (i.e. is_array()) then we need to process them and setup an
                // appropriate response. HMM, dang this isn't correct, $validates will ALWAYS be an array.
                //  WE need to make sure there is no actual error messages in validates.
                if (is_array($validates) && ! empty($validates)) {
                    // add the transient so when the form loads we know which fields to highlight
                    $this->_add_transient('edit_message_template', $validates);

                    $success = 0;

                    // setup notices
                    foreach ($validates as $error) {
                        if (isset($error['msg'])) {
                            EE_Error::add_error($error['msg'], __FILE__, __FUNCTION__, __LINE__);
                        }
                    }
                } else {
                    $set_column_values = [];
                    foreach ($template_fields as $template_field => $content) {
                        $set_column_values = $this->_set_message_template_column_values($template_field);

                        $where_cols_n_values = ['MTP_ID' => $content['MTP_ID']];
                        // if they aren't allowed to use all JS, restrict them to just posty-y tags
                        if (! current_user_can('unfiltered_html')) {
                            if (is_array($set_column_values['MTP_content'])) {
                                foreach ($set_column_values['MTP_content'] as $key => $value) {
                                    // remove slashes so wp_kses works properly (its wp_kses_stripslashes() function
                                    // only removes slashes from double-quotes, so attributes using single quotes always
                                    // appear invalid.) But currently the models expect slashed data, so after wp_kses
                                    // runs we need to re-slash the data. Sheesh. See
                                    // https://events.codebasehq.com/projects/event-espresso/tickets/11211#update-47321587
                                    $set_column_values['MTP_content'][ $key ] = addslashes(
                                        wp_kses(
                                            stripslashes($value),
                                            wp_kses_allowed_html('post')
                                        )
                                    );
                                }
                            } else {
                                $set_column_values['MTP_content'] = wp_kses(
                                    $set_column_values['MTP_content'],
                                    wp_kses_allowed_html('post')
                                );
                            }
                        }
                        $message_template_fields = [
                            'GRP_ID'             => $set_column_values['GRP_ID'],
                            'MTP_template_field' => $set_column_values['MTP_template_field'],
                            'MTP_context'        => $set_column_values['MTP_context'],
                            'MTP_content'        => $set_column_values['MTP_content'],
                        ];
                        if ($updated = $MTP->update($message_template_fields, [$where_cols_n_values])) {
                            if ($updated === false) {
                                EE_Error::add_error(
                                    sprintf(
                                        esc_html__('%s field was NOT updated for some reason', 'event_espresso'),
                                        $template_field
                                    ),
                                    __FILE__,
                                    __FUNCTION__,
                                    __LINE__
                                );
                            } else {
                                $success = 1;
                            }
                        } else {
                            // only do this logic if we don't have a MTP_ID for this field
                            if (empty($content['MTP_ID'])) {
                                // this has already been through the template field validator and sanitized, so it will be
                                // safe to insert this field.  Why insert?  This typically happens when we introduce a new
                                // message template field in a messenger/message type and existing users don't have the
                                // default setup for it.
                                // @link https://events.codebasehq.com/projects/event-espresso/tickets/9465
                                $updated = $MTP->insert($message_template_fields);
                                if (! $updated || is_wp_error($updated)) {
                                    EE_Error::add_error(
                                        sprintf(
                                            esc_html__('%s field could not be updated.', 'event_espresso'),
                                            $template_field
                                        ),
                                        __FILE__,
                                        __FUNCTION__,
                                        __LINE__
                                    );
                                    $success = 0;
                                } else {
                                    $success = 1;
                                }
                            }
                        }
                        $action_desc = 'updated';
                    }

                    // we can use the last set_column_values for the MTPG update (because its the same for all of these specific MTPs)
                    $mtpg_fields = [
                        'MTP_user_id'      => $set_column_values['MTP_user_id'],
                        'MTP_messenger'    => $set_column_values['MTP_messenger'],
                        'MTP_message_type' => $set_column_values['MTP_message_type'],
                        'MTP_is_global'    => $set_column_values['MTP_is_global'],
                        'MTP_is_override'  => $set_column_values['MTP_is_override'],
                        'MTP_deleted'      => $set_column_values['MTP_deleted'],
                        'MTP_is_active'    => $set_column_values['MTP_is_active'],
                        'MTP_name'         => $this->request->getRequestParam('ee_msg_non_global_fields[MTP_name]', ''),
                        'MTP_description'  => $this->request->getRequestParam(
                            'ee_msg_non_global_fields[MTP_description]',
                            ''
                        ),
                    ];

                    $mtpg_where = ['GRP_ID' => $set_column_values['GRP_ID']];
                    $updated    = $MTPG->update($mtpg_fields, [$mtpg_where]);

                    if ($updated === false) {
                        EE_Error::add_error(
                            sprintf(
                                esc_html__(
                                    'The Message Template Group (%d) was NOT updated for some reason',
                                    'event_espresso'
                                ),
                                $set_column_values['GRP_ID']
                            ),
                            __FILE__,
                            __FUNCTION__,
                            __LINE__
                        );
                    } else {
                        // k now we need to ensure the template_pack and template_variation fields are set.
                        $template_pack      = $this->request->getRequestParam('MTP_template_pack', 'default');
                        $template_variation = $this->request->getRequestParam('MTP_template_variation', 'default');

                        $mtpg_obj = $MTPG->get_one_by_ID($set_column_values['GRP_ID']);
                        if ($mtpg_obj instanceof EE_Message_Template_Group) {
                            $mtpg_obj->set_template_pack_name($template_pack);
                            $mtpg_obj->set_template_pack_variation($template_variation);
                        }
                        $success = 1;
                    }
                }
            }
        }

        // we return things differently if doing ajax
        if (defined('DOING_AJAX') && DOING_AJAX) {
            $this->_template_args['success'] = $success;
            $this->_template_args['error']   = ! $success;
            $this->_template_args['content'] = '';
            $this->_template_args['data']    = [
                'grpID'        => $edit_array['GRP_ID'],
                'templateName' => $edit_array['template_name'],
            ];
            if ($success) {
                EE_Error::overwrite_success();
                EE_Error::add_success(
                    esc_html__(
                        'The new template has been created and automatically selected for this event.  You can edit the new template by clicking the edit button.  Note before this template is assigned to this event, the event must be saved.',
                        'event_espresso'
                    )
                );
            }

            $this->_return_json();
        }


        // was a test send triggered?
        if ($this->request->getRequestParam('test_button', false, 'bool')) {
            EE_Error::overwrite_success();
            $this->_do_test_send($context_slug, $messenger_slug, $message_type_slug);
            $override = true;
        }

        if (empty($query_args)) {
            $query_args = [
                'id'      => $GRP_ID,
                'context' => $context_slug,
                'action'  => 'edit_message_template',
            ];
        }

        $this->_redirect_after_action($success, $item_desc, $action_desc, $query_args, $override);
    }


    /**
     * processes a test send request to do an actual messenger delivery test for the given message template being tested
     *
     * @param string $context      what context being tested
     * @param string $messenger    messenger being tested
     * @param string $message_type message type being tested
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _do_test_send($context, $messenger, $message_type)
    {
        // set things up for preview
        $this->request->setRequestParam('messenger', $messenger);
        $this->request->setRequestParam('message_type', $message_type);
        $this->request->setRequestParam('context', $context);
        $GRP_ID = $this->request->getRequestParam('GRP_ID', 0, 'int');
        $this->request->setRequestParam('GRP_ID', $GRP_ID);

        $active_messenger  = $this->_message_resource_manager->get_active_messenger($messenger);
        $test_settings_fld = $this->request->getRequestParam('test_settings_fld', [], 'string', true);

        // let's save any existing fields that might be required by the messenger
        if (
            ! empty($test_settings_fld)
            && $active_messenger instanceof EE_messenger
            && apply_filters(
                'FHEE__Messages_Admin_Page__do_test_send__set_existing_test_settings',
                true,
                $test_settings_fld,
                $active_messenger
            )
        ) {
            $active_messenger->set_existing_test_settings($test_settings_fld);
        }

        /**
         * Use filter to add additional controls on whether message can send or not
         */
        if (
            apply_filters(
                'FHEE__Messages_Admin_Page__do_test_send__can_send',
                true,
                $context,
                $this->request->requestParams(),
                $messenger,
                $message_type
            )
        ) {
            if (EEM_Event::instance()->count() > 0) {
                $success = $this->_preview_message(true);
                if ($success) {
                    EE_Error::add_success(esc_html__('Test message sent', 'event_espresso'));
                } else {
                    EE_Error::add_error(
                        esc_html__('The test message was not sent', 'event_espresso'),
                        __FILE__,
                        __FUNCTION__,
                        __LINE__
                    );
                }
            } else {
                $this->noEventsErrorMessage(true);
            }
        }
    }


    /**
     * _generate_new_templates
     * This will handle the messenger, message_type selection when "adding a new custom template" for an event and will
     * automatically create the defaults for the event.  The user would then be redirected to edit the default context
     * for the event.
     *
     *
     * @param string $messenger      the messenger we are generating templates for
     * @param array  $message_types  array of message types that the templates are generated for.
     * @param int    $GRP_ID         If this is a custom template being generated then a GRP_ID needs to be included to
     *                               indicate the message_template_group being used as the base.
     *
     * @param bool   $global
     *
     * @return array|bool array of data required for the redirect to the correct edit page or bool if
     *                               encountering problems.
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _generate_new_templates($messenger, $message_types, $GRP_ID = 0, $global = false)
    {

        // if no $message_types are given then that's okay... this may be a messenger that just adds shortcodes, so we
        // just don't generate any templates.
        if (empty($message_types)) {
            return true;
        }

        return EEH_MSG_Template::generate_new_templates($messenger, $message_types, $GRP_ID, $global);
    }


    /**
     * [_trash_or_restore_message_template]
     *
     * @param boolean $trash  whether to move an item to trash/restore (TRUE) or restore it (FALSE)
     * @param boolean $all    whether this is going to trash/restore all contexts within a template group (TRUE) OR just
     *                        an individual context (FALSE).
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _trash_or_restore_message_template($trash = true, $all = false)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $MTP = EEM_Message_Template_Group::instance();

        $success = 1;

        // incoming GRP_IDs
        if ($all) {
            // Checkboxes
            $checkboxes = $this->request->getRequestParam('checkbox', [], 'int', true);
            if (! empty($checkboxes)) {
                // if array has more than one element then success message should be plural.
                // todo: what about nonce?
                $success = count($checkboxes) > 1 ? 2 : 1;

                // cycle through checkboxes
                while (list($GRP_ID, $value) = each($checkboxes)) {
                    $trashed_or_restored = $trash ? $MTP->delete_by_ID($GRP_ID) : $MTP->restore_by_ID($GRP_ID);
                    if (! $trashed_or_restored) {
                        $success = 0;
                    }
                }
            } else {
                // grab single GRP_ID and handle
                $GRP_ID = $this->request->getRequestParam('id', 0, 'int');
                if (! empty($GRP_ID)) {
                    $trashed_or_restored = $trash ? $MTP->delete_by_ID($GRP_ID) : $MTP->restore_by_ID($GRP_ID);
                    if (! $trashed_or_restored) {
                        $success = 0;
                    }
                } else {
                    $success = 0;
                }
            }
        }

        $action_desc = $trash
            ? esc_html__('moved to the trash', 'event_espresso')
            : esc_html__('restored', 'event_espresso');

        $template_switch = $this->request->getRequestParam('template_switch', false, 'bool');
        $action_desc     = $template_switch ? esc_html__('switched', 'event_espresso') : $action_desc;

        $item_desc = $all ? _n(
            'Message Template Group',
            'Message Template Groups',
            $success,
            'event_espresso'
        ) : _n('Message Template Context', 'Message Template Contexts', $success, 'event_espresso');

        $item_desc = $template_switch
            ? _n('template', 'templates', $success, 'event_espresso')
            : $item_desc;

        $this->_redirect_after_action($success, $item_desc, $action_desc, []);
    }


    /**
     * [_delete_message_template]
     * NOTE: this handles not only the deletion of the groups but also all the templates belonging to that group.
     *
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    protected function _delete_message_template()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');

        // checkboxes
        $checkboxes = $this->request->getRequestParam('checkbox', [], 'int', true);
        if (! empty($checkboxes)) {
            // if array has more than one element then success message should be plural
            $success = count($checkboxes) > 1 ? 2 : 1;

            // cycle through bulk action checkboxes
            while (list($GRP_ID, $value) = each($checkboxes)) {
                $success = $this->_delete_mtp_permanently($GRP_ID) ? $success : false;
            }
        } else {
            // grab single grp_id and delete
            $GRP_ID  = $this->request->getRequestParam('id', 0, 'int');
            $success = $this->_delete_mtp_permanently($GRP_ID);
        }

        $this->_redirect_after_action($success, 'Message Templates', 'deleted', []);
    }


    /**
     * helper for permanently deleting a mtP group and all related message_templates
     *
     * @param int  $GRP_ID        The group being deleted
     * @param bool $include_group whether to delete the Message Template Group as well.
     * @return bool boolean to indicate the success of the deletes or not.
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws ReflectionException
     */
    private function _delete_mtp_permanently($GRP_ID, $include_group = true)
    {
        $success = true;
        $MTPG    = EEM_Message_Template_Group::instance();
        // first let's GET this group
        $MTG = $MTPG->get_one_by_ID($GRP_ID);
        // then delete permanently all the related Message Templates
        $deleted = $MTG->delete_related_permanently('Message_Template');

        if ($deleted === 0) {
            $success = false;
        }

        // now delete permanently this particular group

        if ($include_group && ! $MTG->delete_permanently()) {
            $success = false;
        }

        return $success;
    }


    /**
     *    _learn_more_about_message_templates_link
     *
     * @access protected
     * @return string
     */
    protected function _learn_more_about_message_templates_link()
    {
        return '<a class="hidden" style="margin:0 20px; cursor:pointer; font-size:12px;" >'
               . esc_html__('learn more about how message templates works', 'event_espresso')
               . '</a>';
    }


    /**
     * Used for setting up messenger/message type activation.  This loads up the initial view.  The rest is handled by
     * ajax and other routes.
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     */
    protected function _settings()
    {
        $this->_set_m_mt_settings();

        // let's setup the messenger tabs
        $this->_template_args['admin_page_header'] = EEH_Tabbed_Content::tab_text_links(
            $this->_m_mt_settings['messenger_tabs'],
            'messenger_links',
            '|',
            $this->request->getRequestParam('selected_messenger', 'email')
        );

        $this->_template_args['before_admin_page_content'] = '<div class="ui-widget ui-helper-clearfix">';
        $this->_template_args['after_admin_page_content']  = '</div><!-- end .ui-widget -->';

        $this->display_admin_page_with_sidebar();
    }


    /**
     * This sets the $_m_mt_settings property for when needed (used on the Messages settings page)
     *
     * @access protected
     * @return void
     * @throws DomainException
     */
    protected function _set_m_mt_settings()
    {
        // first if this is already set then lets get out no need to regenerate data.
        if (! empty($this->_m_mt_settings)) {
            return;
        }

        // get all installed messengers and message_types
        $messengers    = $this->_message_resource_manager->installed_messengers();
        $message_types = $this->_message_resource_manager->installed_message_types();


        // assemble the array for the _tab_text_links helper

        foreach ($messengers as $messenger) {
            $this->_m_mt_settings['messenger_tabs'][ $messenger->name ] = [
                'label' => ucwords($messenger->label['singular']),
                'class' => $this->_message_resource_manager->is_messenger_active($messenger->name)
                    ? 'messenger-active'
                    : '',
                'href'  => $messenger->name,
                'title' => esc_html__('Modify this Messenger', 'event_espresso'),
                'slug'  => $messenger->name,
                'obj'   => $messenger,
            ];


            $message_types_for_messenger = $messenger->get_valid_message_types();

            foreach ($message_types as $message_type) {
                // first we need to verify that this message type is valid with this messenger. Cause if it isn't then
                // it shouldn't show in either the inactive OR active metabox.
                if (! in_array($message_type->name, $message_types_for_messenger, true)) {
                    continue;
                }

                $a_or_i = $this->_message_resource_manager->is_message_type_active_for_messenger(
                    $messenger->name,
                    $message_type->name
                )
                    ? 'active'
                    : 'inactive';

                $this->_m_mt_settings['message_type_tabs'][ $messenger->name ][ $a_or_i ][ $message_type->name ] = [
                    'label'    => ucwords($message_type->label['singular']),
                    'class'    => 'message-type-' . $a_or_i,
                    'slug_id'  => $message_type->name . '-messagetype-' . $messenger->name,
                    'mt_nonce' => wp_create_nonce($message_type->name . '_nonce'),
                    'href'     => 'espresso_' . $message_type->name . '_message_type_settings',
                    'title'    => $a_or_i === 'active'
                        ? esc_html__('Drag this message type to the Inactive window to deactivate', 'event_espresso')
                        : esc_html__('Drag this message type to the messenger to activate', 'event_espresso'),
                    'content'  => $a_or_i === 'active'
                        ? $this->_message_type_settings_content($message_type, $messenger, true)
                        : $this->_message_type_settings_content($message_type, $messenger),
                    'slug'     => $message_type->name,
                    'active'   => $a_or_i === 'active',
                    'obj'      => $message_type,
                ];
            }
        }
    }


    /**
     * This just prepares the content for the message type settings
     *
     * @param EE_message_type $message_type The message type object
     * @param EE_messenger    $messenger    The messenger object
     * @param boolean         $active       Whether the message type is active or not
     * @return string html output for the content
     * @throws DomainException
     */
    protected function _message_type_settings_content($message_type, $messenger, $active = false)
    {
        // get message type fields
        $fields                                         = $message_type->get_admin_settings_fields();
        $settings_template_args['template_form_fields'] = '';

        if (! empty($fields) && $active) {
            $existing_settings = $message_type->get_existing_admin_settings($messenger->name);
            foreach ($fields as $fldname => $fldprops) {
                $field_id                         = $messenger->name . '-' . $message_type->name . '-' . $fldname;
                $template_form_field[ $field_id ] = [
                    'name'       => 'message_type_settings[' . $fldname . ']',
                    'label'      => $fldprops['label'],
                    'input'      => $fldprops['field_type'],
                    'type'       => $fldprops['value_type'],
                    'required'   => $fldprops['required'],
                    'validation' => $fldprops['validation'],
                    'value'      => isset($existing_settings[ $fldname ])
                        ? $existing_settings[ $fldname ]
                        : $fldprops['default'],
                    'options'    => isset($fldprops['options'])
                        ? $fldprops['options']
                        : [],
                    'default'    => isset($existing_settings[ $fldname ])
                        ? $existing_settings[ $fldname ]
                        : $fldprops['default'],
                    'css_class'  => 'no-drag',
                    'format'     => $fldprops['format'],
                ];
            }


            $settings_template_args['template_form_fields'] = ! empty($template_form_field)
                ? $this->_generate_admin_form_fields(
                    $template_form_field,
                    'string',
                    'ee_mt_activate_form'
                )
                : '';
        }

        $settings_template_args['description'] = $message_type->description;
        // we also need some hidden fields
        $hidden_fields = [
            'message_type_settings[messenger]' . $message_type->name    => [
                'type'  => 'hidden',
                'value' => $messenger->name,
            ],
            'message_type_settings[message_type]' . $message_type->name => [
                'type'  => 'hidden',
                'value' => $message_type->name,
            ],
            'type' . $message_type->name                                => [
                'type'  => 'hidden',
                'value' => 'message_type',
            ],
        ];

        $settings_template_args['hidden_fields'] = $this->_generate_admin_form_fields(
            $hidden_fields,
            'array'
        );
        $settings_template_args['show_form']     = empty($settings_template_args['template_form_fields'])
            ? ' hidden'
            : '';


        $template = EE_MSG_TEMPLATE_PATH . 'ee_msg_mt_settings_content.template.php';
        return EEH_Template::display_template($template, $settings_template_args, true);
    }


    /**
     * Generate all the metaboxes for the message types and register them for the messages settings page.
     *
     * @access protected
     * @return void
     * @throws DomainException
     */
    protected function _messages_settings_metaboxes()
    {
        $this->_set_m_mt_settings();
        $m_boxes         = $mt_boxes = [];
        $m_template_args = $mt_template_args = [];

        $selected_messenger = $this->request->getRequestParam('selected_messenger', 'email');

        if (isset($this->_m_mt_settings['messenger_tabs'])) {
            foreach ($this->_m_mt_settings['messenger_tabs'] as $messenger => $tab_array) {
                $is_messenger_active = $this->_message_resource_manager->is_messenger_active($messenger);
                $hide_on_message     = $is_messenger_active ? '' : 'hidden';
                $hide_off_message    = $is_messenger_active ? 'hidden' : '';

                // messenger meta boxes
                $active         = $selected_messenger === $messenger;
                $active_mt_tabs = isset($this->_m_mt_settings['message_type_tabs'][ $messenger ]['active'])
                    ? $this->_m_mt_settings['message_type_tabs'][ $messenger ]['active']
                    : '';

                $m_boxes[ $messenger . '_a_box' ] = sprintf(
                    esc_html__('%s Settings', 'event_espresso'),
                    $tab_array['label']
                );

                $m_template_args[ $messenger . '_a_box' ] = [
                    'active_message_types'   => ! empty($active_mt_tabs) ? $this->_get_mt_tabs($active_mt_tabs) : '',
                    'inactive_message_types' => isset(
                        $this->_m_mt_settings['message_type_tabs'][ $messenger ]['inactive']
                    )
                        ? $this->_get_mt_tabs($this->_m_mt_settings['message_type_tabs'][ $messenger ]['inactive'])
                        : '',
                    'content'                => $this->_get_messenger_box_content($tab_array['obj']),
                    'hidden'                 => $active ? '' : ' hidden',
                    'hide_on_message'        => $hide_on_message,
                    'messenger'              => $messenger,
                    'active'                 => $active,
                ];

                // message type meta boxes
                // (which is really just the inactive container for each messenger
                // showing inactive message types for that messenger)
                $mt_boxes[ $messenger . '_i_box' ]         = esc_html__('Inactive Message Types', 'event_espresso');
                $mt_template_args[ $messenger . '_i_box' ] = [
                    'active_message_types'   => ! empty($active_mt_tabs) ? $this->_get_mt_tabs($active_mt_tabs) : '',
                    'inactive_message_types' => isset(
                        $this->_m_mt_settings['message_type_tabs'][ $messenger ]['inactive']
                    )
                        ? $this->_get_mt_tabs($this->_m_mt_settings['message_type_tabs'][ $messenger ]['inactive'])
                        : '',
                    'hidden'                 => $active ? '' : ' hidden',
                    'hide_on_message'        => $hide_on_message,
                    'hide_off_message'       => $hide_off_message,
                    'messenger'              => $messenger,
                    'active'                 => $active,
                ];
            }
        }


        // register messenger metaboxes
        $m_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_messenger_mt_meta_box.template.php';
        foreach ($m_boxes as $box => $label) {
            $callback_args = ['template_path' => $m_template_path, 'template_args' => $m_template_args[ $box ]];
            $msgr          = str_replace('_a_box', '', $box);
            add_meta_box(
                'espresso_' . $msgr . '_settings',
                $label,
                function ($post, $metabox) {
                    EEH_Template::display_template(
                        $metabox['args']['template_path'],
                        $metabox['args']['template_args']
                    );
                },
                $this->_current_screen->id,
                'normal',
                'high',
                $callback_args
            );
        }

        // register message type metaboxes
        $mt_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_messenger_meta_box.template.php';
        foreach ($mt_boxes as $box => $label) {
            $callback_args = [
                'template_path' => $mt_template_path,
                'template_args' => $mt_template_args[ $box ],
            ];
            $mt            = str_replace('_i_box', '', $box);
            add_meta_box(
                'espresso_' . $mt . '_inactive_mts',
                $label,
                function ($post, $metabox) {
                    EEH_Template::display_template(
                        $metabox['args']['template_path'],
                        $metabox['args']['template_args']
                    );
                },
                $this->_current_screen->id,
                'side',
                'high',
                $callback_args
            );
        }

        // register metabox for global messages settings but only when on the main site.  On single site installs this
        // will always result in the metabox showing, on multisite installs the metabox will only show on the main site.
        if (is_main_site()) {
            add_meta_box(
                'espresso_global_message_settings',
                esc_html__('Global Message Settings', 'event_espresso'),
                [$this, 'global_messages_settings_metabox_content'],
                $this->_current_screen->id,
                'normal',
                'low',
                []
            );
        }
    }


    /**
     *  This generates the content for the global messages settings metabox.
     *
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function global_messages_settings_metabox_content()
    {
        $form = $this->_generate_global_settings_form();
        // already escaped
        echo $form->form_open(
            $this->add_query_args_and_nonce(['action' => 'update_global_settings'], EE_MSG_ADMIN_URL),
            'POST'
        );
        echo $form->get_html();
        echo $form->form_close();
    }


    /**
     * This generates and returns the form object for the global messages settings.
     *
     * @return EE_Form_Section_Proper
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _generate_global_settings_form()
    {
        /** @var EE_Network_Core_Config $network_config */
        $network_config = EE_Registry::instance()->NET_CFG->core;

        return new EE_Form_Section_Proper(
            [
                'name'            => 'global_messages_settings',
                'html_id'         => 'global_messages_settings',
                'html_class'      => 'form-table',
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__Messages_Admin_Page__global_messages_settings_metabox_content__form_subsections',
                    [
                        'do_messages_on_same_request' => new EE_Select_Input(
                            [
                                true  => esc_html__('On the same request', 'event_espresso'),
                                false => esc_html__('On a separate request', 'event_espresso'),
                            ],
                            [
                                'default'         => $network_config->do_messages_on_same_request,
                                'html_label_text' => esc_html__(
                                    'Generate and send all messages:',
                                    'event_espresso'
                                ),
                                'html_help_text'  => esc_html__(
                                    'By default the messages system uses a more efficient means of processing messages on separate requests and utilizes the wp-cron scheduling system.  This makes things execute faster for people registering for your events.  However, if the wp-cron system is disabled on your site and there is no alternative in place, then you can change this so messages are always executed on the same request.',
                                    'event_espresso'
                                ),
                            ]
                        ),
                        'delete_threshold'            => new EE_Select_Input(
                            [
                                0  => esc_html__('Forever', 'event_espresso'),
                                3  => esc_html__('3 Months', 'event_espresso'),
                                6  => esc_html__('6 Months', 'event_espresso'),
                                9  => esc_html__('9 Months', 'event_espresso'),
                                12 => esc_html__('12 Months', 'event_espresso'),
                                24 => esc_html__('24 Months', 'event_espresso'),
                                36 => esc_html__('36 Months', 'event_espresso'),
                            ],
                            [
                                'default'         => EE_Registry::instance()->CFG->messages->delete_threshold,
                                'html_label_text' => esc_html__('Cleanup of old messages:', 'event_espresso'),
                                'html_help_text'  => esc_html__(
                                    'You can control how long a record of processed messages is kept via this option.',
                                    'event_espresso'
                                ),
                            ]
                        ),
                        'update_settings'             => new EE_Submit_Input(
                            [
                                'default'         => esc_html__('Update', 'event_espresso'),
                                'html_label_text' => '&nbsp',
                            ]
                        ),
                    ]
                ),
            ]
        );
    }


    /**
     * This handles updating the global settings set on the admin page.
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    protected function _update_global_settings()
    {
        /** @var EE_Network_Core_Config $network_config */
        $network_config  = EE_Registry::instance()->NET_CFG->core;
        $messages_config = EE_Registry::instance()->CFG->messages;
        $form            = $this->_generate_global_settings_form();
        if ($form->was_submitted()) {
            $form->receive_form_submission();
            if ($form->is_valid()) {
                $valid_data = $form->valid_data();
                foreach ($valid_data as $property => $value) {
                    $setter = 'set_' . $property;
                    if (method_exists($network_config, $setter)) {
                        $network_config->{$setter}($value);
                    } elseif (
                        property_exists($network_config, $property)
                        && $network_config->{$property} !== $value
                    ) {
                        $network_config->{$property} = $value;
                    } elseif (
                        property_exists($messages_config, $property)
                        && $messages_config->{$property} !== $value
                    ) {
                        $messages_config->{$property} = $value;
                    }
                }
                // only update if the form submission was valid!
                EE_Registry::instance()->NET_CFG->update_config(true, false);
                EE_Registry::instance()->CFG->update_espresso_config();
                EE_Error::overwrite_success();
                EE_Error::add_success(esc_html__('Global message settings were updated', 'event_espresso'));
            }
        }
        $this->_redirect_after_action(0, '', '', ['action' => 'settings'], true);
    }


    /**
     * this prepares the messenger tabs that can be dragged in and out of messenger boxes to activate/deactivate
     *
     * @param array $tab_array This is an array of message type tab details used to generate the tabs
     * @return string html formatted tabs
     * @throws DomainException
     */
    protected function _get_mt_tabs($tab_array)
    {
        $tab_array = (array) $tab_array;
        $template  = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_mt_settings_tab_item.template.php';
        $tabs      = '';

        foreach ($tab_array as $tab) {
            $tabs .= EEH_Template::display_template($template, $tab, true);
        }

        return $tabs;
    }


    /**
     * This prepares the content of the messenger meta box admin settings
     *
     * @param EE_messenger $messenger The messenger we're setting up content for
     * @return string html formatted content
     * @throws DomainException
     */
    protected function _get_messenger_box_content(EE_messenger $messenger)
    {

        $fields                                         = $messenger->get_admin_settings_fields();
        $settings_template_args['template_form_fields'] = '';

        // is $messenger active?
        $settings_template_args['active'] = $this->_message_resource_manager->is_messenger_active($messenger->name);


        if (! empty($fields)) {
            $existing_settings = $messenger->get_existing_admin_settings();

            foreach ($fields as $fldname => $fldprops) {
                $field_id                         = $messenger->name . '-' . $fldname;
                $template_form_field[ $field_id ] = [
                    'name'       => 'messenger_settings[' . $field_id . ']',
                    'label'      => $fldprops['label'],
                    'input'      => $fldprops['field_type'],
                    'type'       => $fldprops['value_type'],
                    'required'   => $fldprops['required'],
                    'validation' => $fldprops['validation'],
                    'value'      => isset($existing_settings[ $field_id ])
                        ? $existing_settings[ $field_id ]
                        : $fldprops['default'],
                    'css_class'  => '',
                    'format'     => $fldprops['format'],
                ];
            }


            $settings_template_args['template_form_fields'] = ! empty($template_form_field)
                ? $this->_generate_admin_form_fields($template_form_field, 'string', 'ee_m_activate_form')
                : '';
        }

        // we also need some hidden fields
        $settings_template_args['hidden_fields'] = [
            'messenger_settings[messenger]' . $messenger->name => [
                'type'  => 'hidden',
                'value' => $messenger->name,
            ],
            'type' . $messenger->name                          => [
                'type'  => 'hidden',
                'value' => 'messenger',
            ],
        ];

        // make sure any active message types that are existing are included in the hidden fields
        if (isset($this->_m_mt_settings['message_type_tabs'][ $messenger->name ]['active'])) {
            foreach ($this->_m_mt_settings['message_type_tabs'][ $messenger->name ]['active'] as $mt => $values) {
                $settings_template_args['hidden_fields'][ 'messenger_settings[message_types][' . $mt . ']' ] = [
                    'type'  => 'hidden',
                    'value' => $mt,
                ];
            }
        }
        $settings_template_args['hidden_fields'] = $this->_generate_admin_form_fields(
            $settings_template_args['hidden_fields'],
            'array'
        );
        $active                                  =
            $this->_message_resource_manager->is_messenger_active($messenger->name);

        $settings_template_args['messenger']           = $messenger->name;
        $settings_template_args['description']         = $messenger->description;
        $settings_template_args['show_hide_edit_form'] = $active ? '' : ' hidden';


        $settings_template_args['show_hide_edit_form'] = $this->_message_resource_manager->is_messenger_active(
            $messenger->name
        )
            ? $settings_template_args['show_hide_edit_form']
            : ' hidden';

        $settings_template_args['show_hide_edit_form'] = empty($settings_template_args['template_form_fields'])
            ? ' hidden'
            : $settings_template_args['show_hide_edit_form'];


        $settings_template_args['on_off_action'] = $active ? 'messenger-off' : 'messenger-on';
        $settings_template_args['nonce']         = wp_create_nonce('activate_' . $messenger->name . '_toggle_nonce');
        $settings_template_args['on_off_status'] = $active;
        $template                                = EE_MSG_TEMPLATE_PATH . 'ee_msg_m_settings_content.template.php';
        return EEH_Template::display_template(
            $template,
            $settings_template_args,
            true
        );
    }


    /**
     * used by ajax on the messages settings page to activate|deactivate the messenger
     *
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function activate_messenger_toggle()
    {
        $success = true;
        $this->_prep_default_response_for_messenger_or_message_type_toggle();
        // let's check that we have required data

        if (! $this->_active_messenger_name) {
            EE_Error::add_error(
                esc_html__('Messenger name needed to toggle activation. None given', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }

        // do a nonce check here since we're not arriving via a normal route
        $nonce     = $this->request->getRequestParam('activate_nonce', '');
        $nonce_ref = "activate_{$this->_active_messenger_name}_toggle_nonce";

        $this->_verify_nonce($nonce, $nonce_ref);


        $status = $this->request->getRequestParam('status');
        if (! $status) {
            EE_Error::add_error(
                esc_html__(
                    'Messenger status needed to know whether activation or deactivation is happening. No status is given',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }

        // do check to verify we have a valid status.
        if ($status !== 'off' && $status !== 'on') {
            EE_Error::add_error(
                sprintf(
                    esc_html__('The given status (%s) is not valid. Must be "off" or "on"', 'event_espresso'),
                    $status
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }

        if ($success) {
            // made it here?  Stop dawdling then!!
            $success = $status === 'off'
                ? $this->_deactivate_messenger($this->_active_messenger_name)
                : $this->_activate_messenger($this->_active_messenger_name);
        }

        $this->_template_args['success'] = $success;

        // no special instructions so let's just do the json return (which should automatically do all the special stuff).
        $this->_return_json();
    }


    /**
     * used by ajax from the messages settings page to activate|deactivate a message type
     *
     * @throws DomainException
     * @throws EE_Error
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public function activate_mt_toggle()
    {
        $success = true;
        $this->_prep_default_response_for_messenger_or_message_type_toggle();

        // let's make sure we have the necessary data
        if (! $this->_active_message_type_name) {
            EE_Error::add_error(
                esc_html__('Message Type name needed to toggle activation. None given', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }

        if (! $this->_active_messenger_name) {
            EE_Error::add_error(
                esc_html__('Messenger name needed to toggle activation. None given', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }

        $status = $this->request->getRequestParam('status');
        if (! $status) {
            EE_Error::add_error(
                esc_html__(
                    'Messenger status needed to know whether activation or deactivation is happening. No status is given',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }


        // do check to verify we have a valid status.
        if ($status !== 'activate' && $status !== 'deactivate') {
            EE_Error::add_error(
                sprintf(
                    esc_html__('The given status (%s) is not valid. Must be "active" or "inactive"', 'event_espresso'),
                    $status
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }


        // do a nonce check here since we're not arriving via a normal route
        $nonce = $this->request->getRequestParam('mt_nonce', '');
        $this->_verify_nonce($nonce, "{$this->_active_message_type_name}_nonce");

        if ($success) {
            // made it here? um, what are you waiting for then?
            $success = $status === 'deactivate'
                ? $this->_deactivate_message_type_for_messenger(
                    $this->_active_messenger_name,
                    $this->_active_message_type_name
                )
                : $this->_activate_message_type_for_messenger(
                    $this->_active_messenger_name,
                    $this->_active_message_type_name
                );
        }

        $this->_template_args['success'] = $success;
        $this->_return_json();
    }


    /**
     * Takes care of processing activating a messenger and preparing the appropriate response.
     *
     * @param string $messenger_name The name of the messenger being activated
     * @return bool
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _activate_messenger($messenger_name)
    {
        $active_messenger          = $this->_message_resource_manager->get_messenger($messenger_name);
        $message_types_to_activate = $active_messenger instanceof EE_Messenger
            ? $active_messenger->get_default_message_types()
            : [];

        // ensure is active
        $this->_message_resource_manager->activate_messenger($active_messenger, $message_types_to_activate);

        // set response_data for reload
        foreach ($message_types_to_activate as $message_type_name) {
            $message_type = $this->_message_resource_manager->get_message_type($message_type_name);
            if (
                $this->_message_resource_manager->is_message_type_active_for_messenger(
                    $messenger_name,
                    $message_type_name
                )
                && $message_type instanceof EE_message_type
            ) {
                $this->_template_args['data']['active_mts'][] = $message_type_name;
                if ($message_type->get_admin_settings_fields()) {
                    $this->_template_args['data']['mt_reload'][] = $message_type_name;
                }
            }
        }

        // add success message for activating messenger
        return $this->_setup_response_message_for_activating_messenger_with_message_types($active_messenger);
    }


    /**
     * Takes care of processing deactivating a messenger and preparing the appropriate response.
     *
     * @param string $messenger_name The name of the messenger being activated
     * @return bool
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _deactivate_messenger($messenger_name)
    {
        $active_messenger = $this->_message_resource_manager->get_messenger($messenger_name);
        $this->_message_resource_manager->deactivate_messenger($messenger_name);

        return $this->_setup_response_message_for_deactivating_messenger_with_message_types($active_messenger);
    }


    /**
     * Takes care of processing activating a message type for a messenger and preparing the appropriate response.
     *
     * @param string $messenger_name    The name of the messenger the message type is being activated for.
     * @param string $message_type_name The name of the message type being activated for the messenger
     * @return bool
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _activate_message_type_for_messenger($messenger_name, $message_type_name)
    {
        $active_messenger         = $this->_message_resource_manager->get_messenger($messenger_name);
        $message_type_to_activate = $this->_message_resource_manager->get_message_type($message_type_name);

        // ensure is active
        $this->_message_resource_manager->activate_messenger($active_messenger, $message_type_name);

        // set response for load
        if (
            $this->_message_resource_manager->is_message_type_active_for_messenger(
                $messenger_name,
                $message_type_name
            )
        ) {
            $this->_template_args['data']['active_mts'][] = $message_type_name;
            if ($message_type_to_activate->get_admin_settings_fields()) {
                $this->_template_args['data']['mt_reload'][] = $message_type_name;
            }
        }

        return $this->_setup_response_message_for_activating_messenger_with_message_types(
            $active_messenger,
            $message_type_to_activate
        );
    }


    /**
     * Takes care of processing deactivating a message type for a messenger and preparing the appropriate response.
     *
     * @param string $messenger_name    The name of the messenger the message type is being deactivated for.
     * @param string $message_type_name The name of the message type being deactivated for the messenger
     * @return bool
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _deactivate_message_type_for_messenger($messenger_name, $message_type_name)
    {
        $active_messenger = $this->_message_resource_manager->get_messenger($messenger_name);
        /** @var EE_message_type $message_type_to_activate This will be present because it can't be toggled if it isn't */
        $message_type_to_deactivate = $this->_message_resource_manager->get_message_type($message_type_name);
        $this->_message_resource_manager->deactivate_message_type_for_messenger($message_type_name, $messenger_name);

        return $this->_setup_response_message_for_deactivating_messenger_with_message_types(
            $active_messenger,
            $message_type_to_deactivate
        );
    }


    /**
     * This just initializes the defaults for activating messenger and message type responses.
     */
    protected function _prep_default_response_for_messenger_or_message_type_toggle()
    {
        $this->_template_args['data']['active_mts'] = [];
        $this->_template_args['data']['mt_reload']  = [];
    }


    /**
     * Setup appropriate response for activating a messenger and/or message types
     *
     * @param EE_messenger         $messenger
     * @param EE_message_type|null $message_type
     * @return bool
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _setup_response_message_for_activating_messenger_with_message_types(
        $messenger,
        EE_Message_Type $message_type = null
    ) {
        // if $messenger isn't a valid messenger object then get out.
        if (! $messenger instanceof EE_Messenger) {
            EE_Error::add_error(
                esc_html__('The messenger being activated is not a valid messenger', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        // activated
        if ($this->_template_args['data']['active_mts']) {
            EE_Error::overwrite_success();
            // activated a message type with the messenger
            if ($message_type instanceof EE_message_type) {
                EE_Error::add_success(
                    sprintf(
                        esc_html__(
                            '%s message type has been successfully activated with the %s messenger',
                            'event_espresso'
                        ),
                        ucwords($message_type->label['singular']),
                        ucwords($messenger->label['singular'])
                    )
                );

                // if message type was invoice then let's make sure we activate the invoice payment method.
                if ($message_type->name === 'invoice') {
                    EE_Registry::instance()->load_lib('Payment_Method_Manager');
                    $pm = EE_Payment_Method_Manager::instance()->activate_a_payment_method_of_type('Invoice');
                    if ($pm instanceof EE_Payment_Method) {
                        EE_Error::add_attention(
                            esc_html__(
                                'Activating the invoice message type also automatically activates the invoice payment method.  If you do not wish the invoice payment method to be active, or to change its settings, visit the payment method admin page.',
                                'event_espresso'
                            )
                        );
                    }
                }
                // just toggles the entire messenger
            } else {
                EE_Error::add_success(
                    sprintf(
                        esc_html__('%s messenger has been successfully activated', 'event_espresso'),
                        ucwords($messenger->label['singular'])
                    )
                );
            }

            return true;

            // possible error condition. This will happen when our active_mts data is empty because it is validated for actual active
            // message types after the activation process.  However its possible some messengers don't HAVE any default_message_types
            // in which case we just give a success message for the messenger being successfully activated.
        } else {
            if (! $messenger->get_default_message_types()) {
                // messenger doesn't have any default message types so still a success.
                EE_Error::add_success(
                    sprintf(
                        esc_html__('%s messenger was successfully activated.', 'event_espresso'),
                        ucwords($messenger->label['singular'])
                    )
                );

                return true;
            } else {
                EE_Error::add_error(
                    $message_type instanceof EE_message_type
                        ? sprintf(
                            esc_html__(
                                '%s message type was not successfully activated with the %s messenger',
                                'event_espresso'
                            ),
                            ucwords($message_type->label['singular']),
                            ucwords($messenger->label['singular'])
                        )
                        : sprintf(
                            esc_html__('%s messenger was not successfully activated', 'event_espresso'),
                            ucwords($messenger->label['singular'])
                        ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );

                return false;
            }
        }
    }


    /**
     * This sets up the appropriate response for deactivating a messenger and/or message type.
     *
     * @param EE_messenger         $messenger
     * @param EE_message_type|null $message_type
     * @return bool
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    protected function _setup_response_message_for_deactivating_messenger_with_message_types(
        $messenger,
        EE_message_type $message_type = null
    ) {
        EE_Error::overwrite_success();

        // if $messenger isn't a valid messenger object then get out.
        if (! $messenger instanceof EE_Messenger) {
            EE_Error::add_error(
                esc_html__('The messenger being deactivated is not a valid messenger', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );

            return false;
        }

        if ($message_type instanceof EE_message_type) {
            $message_type_name = $message_type->name;
            EE_Error::add_success(
                sprintf(
                    esc_html__(
                        '%s message type has been successfully deactivated for the %s messenger.',
                        'event_espresso'
                    ),
                    ucwords($message_type->label['singular']),
                    ucwords($messenger->label['singular'])
                )
            );
        } else {
            $message_type_name = '';
            EE_Error::add_success(
                sprintf(
                    esc_html__('%s messenger has been successfully deactivated.', 'event_espresso'),
                    ucwords($messenger->label['singular'])
                )
            );
        }

        // if messenger was html or message type was invoice then let's make sure we deactivate invoice payment method.
        if ($messenger->name === 'html' || $message_type_name === 'invoice') {
            EE_Registry::instance()->load_lib('Payment_Method_Manager');
            $count_updated = EE_Payment_Method_Manager::instance()->deactivate_payment_method('invoice');
            if ($count_updated > 0) {
                $msg = $message_type_name === 'invoice'
                    ? esc_html__(
                        'Deactivating the invoice message type also automatically deactivates the invoice payment method. In order for invoices to be generated the invoice message type must be active. If you completed this action by mistake, simply reactivate the invoice message type and then visit the payment methods admin page to reactivate the invoice payment method.',
                        'event_espresso'
                    )
                    : esc_html__(
                        'Deactivating the html messenger also automatically deactivates the invoice payment method.  In order for invoices to be generated the html messenger must be be active.  If you completed this action by mistake, simply reactivate the html messenger, then visit the payment methods admin page to reactivate the invoice payment method.',
                        'event_espresso'
                    );
                EE_Error::add_attention($msg);
            }
        }

        return true;
    }


    /**
     * handles updating a message type form on messenger activation IF the message type has settings fields. (via ajax)
     *
     * @throws DomainException
     * @throws EE_Error
     * @throws EE_Error
     */
    public function update_mt_form()
    {
        if (! $this->_active_messenger_name || ! $this->_active_message_type_name) {
            EE_Error::add_error(
                esc_html__('Require message type or messenger to send an updated form', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $this->_return_json();
        }

        $message_types = $this->get_installed_message_types();
        $message_type  = $message_types[ $this->_active_message_type_name ];
        $messenger     = $this->_message_resource_manager->get_active_messenger($this->_active_messenger_name);
        $content       = $this->_message_type_settings_content($message_type, $messenger, true);

        $this->_template_args['success'] = true;
        $this->_template_args['content'] = $content;
        $this->_return_json();
    }


    /**
     * this handles saving the settings for a messenger or message type
     *
     * @throws EE_Error
     * @throws EE_Error
     */
    public function save_settings()
    {
        $type = $this->request->getRequestParam('type');
        if (! $type) {
            EE_Error::add_error(
                esc_html__(
                    'Cannot save settings because type is unknown (messenger settings or message type settings?)',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $this->_template_args['error'] = true;
            $this->_return_json();
        }


        if ($type === 'messenger') {
            // this should be an array.
            $settings  = $this->request->getRequestParam('messenger_settings', [], 'string', true);
            $messenger = $settings['messenger'];
            // remove messenger and message_types from settings array
            unset($settings['messenger'], $settings['message_types']);
            $this->_message_resource_manager->add_settings_for_messenger($messenger, $settings);
        } elseif ($type === 'message_type') {
            $settings     = $this->request->getRequestParam('message_type_settings', [], 'string', true);
            $messenger    = $settings['messenger'];
            $message_type = $settings['message_type'];
            // remove messenger and message_types from settings array
            unset($settings['messenger'], $settings['message_types']);
            $this->_message_resource_manager->add_settings_for_message_type($messenger, $message_type, $settings);
        }

        // okay we should have the data all setup.  Now we just update!
        $success = $this->_message_resource_manager->update_active_messengers_option();

        if ($success) {
            EE_Error::add_success(esc_html__('Settings updated', 'event_espresso'));
        } else {
            EE_Error::add_error(
                esc_html__('Settings did not get updated', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }

        $this->_template_args['success'] = $success;
        $this->_return_json();
    }




    /**  EE MESSAGE PROCESSING ACTIONS **/


    /**
     * This immediately generates any EE_Message ID's that are selected that are EEM_Message::status_incomplete
     * However, this does not send immediately, it just queues for sending.
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since 4.9.0
     */
    protected function _generate_now()
    {
        EED_Messages::generate_now($this->_get_msg_ids_from_request());
        $this->_redirect_after_action(false, '', '', [], true);
    }


    /**
     * This immediately generates AND sends any EE_Message's selected that are EEM_Message::status_incomplete or that
     * are EEM_Message::status_resend or EEM_Message::status_idle
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since 4.9.0
     */
    protected function _generate_and_send_now()
    {
        EED_Messages::generate_and_send_now($this->_get_msg_ids_from_request());
        $this->_redirect_after_action(false, '', '', [], true);
    }


    /**
     * This queues any EEM_Message::status_sent EE_Message ids in the request for resending.
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since 4.9.0
     */
    protected function _queue_for_resending()
    {
        EED_Messages::queue_for_resending($this->_get_msg_ids_from_request());
        $this->_redirect_after_action(false, '', '', [], true);
    }


    /**
     *  This sends immediately any EEM_Message::status_idle or EEM_Message::status_resend messages in the queue
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since 4.9.0
     */
    protected function _send_now()
    {
        EED_Messages::send_now($this->_get_msg_ids_from_request());
        $this->_redirect_after_action(false, '', '', [], true);
    }


    /**
     * Deletes EE_messages for IDs in the request.
     *
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @since 4.9.0
     */
    protected function _delete_ee_messages()
    {
        $MSG_IDs       = $this->_get_msg_ids_from_request();
        $deleted_count = 0;
        foreach ($MSG_IDs as $MSG_ID) {
            if (EEM_Message::instance()->delete_by_ID($MSG_ID)) {
                $deleted_count++;
            }
        }
        if ($deleted_count) {
            EE_Error::add_success(
                esc_html(
                    _n(
                        'Message successfully deleted',
                        'Messages successfully deleted',
                        $deleted_count,
                        'event_espresso'
                    )
                )
            );
        } else {
            EE_Error::add_error(
                _n('The message was not deleted.', 'The messages were not deleted', count($MSG_IDs), 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        $this->_redirect_after_action(false, '', '', [], true);
    }


    /**
     *  This looks for 'MSG_ID' key in the request and returns an array of MSG_ID's if present.
     *
     * @return array
     * @since 4.9.0
     */
    protected function _get_msg_ids_from_request()
    {
        $MSG_IDs = $this->request->getRequestParam('MSG_ID', [], 'string', true);
        if (empty($MSG_IDs)) {
            return [];
        }
        // if 'MSG_ID' was just a single ID (not an array)
        // then $MSG_IDs will be something like [123] so $MSG_IDs[0] should be 123
        // otherwise, $MSG_IDs was already an array where message IDs were used as the keys
        return count($MSG_IDs) === 1 && isset($MSG_IDs[0])
            ? $MSG_IDs
            : array_keys($MSG_IDs);
    }
}
