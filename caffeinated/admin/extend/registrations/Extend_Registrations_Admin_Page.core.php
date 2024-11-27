<?php

use EventEspresso\core\domain\services\assets\EspressoLegacyAdminAssetManager;
use EventEspresso\core\domain\services\registration\RegStatus;
use EventEspresso\core\exceptions\EntityNotFoundException;
use EventEspresso\core\services\request\DataType;
use EventEspresso\ui\browser\checkins\entities\CheckinStatusDashicon;

/**
 * Extend_Registrations_Admin_Page
 * This is the Registrations Caffeinated admin page.
 *
 * @package        Extend_Registrations_Admin_Page
 * @subpackage     caffeinated/admin/extend/registrations/Extend_Registrations_Admin_Page.core.php
 * @author         Darren Ethier
 */
class Extend_Registrations_Admin_Page extends Registrations_Admin_Page
{
    /**
     * This is used to hold the reports template data which is setup early in the request.
     *
     * @type array
     */
    protected array $_reports_template_data = [];


    /**
     * Extend_Registrations_Admin_Page constructor.
     *
     * @param bool $routing
     * @throws ReflectionException
     */
    public function __construct($routing = true)
    {
        parent::__construct($routing);
        if (! defined('REG_CAF_TEMPLATE_PATH')) {
            define('REG_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'registrations/templates/');
            define('REG_CAF_ASSETS', EE_CORE_CAF_ADMIN_EXTEND . 'registrations/assets/');
            define('REG_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'registrations/assets/');
        }
    }


    protected function _set_page_config()
    {
        parent::_set_page_config();

        $this->_admin_base_path                           = EE_CORE_CAF_ADMIN_EXTEND . 'registrations';
        $reg_id                                           =
            ! empty($this->_req_data['_REG_ID']) && ! is_array($this->_req_data['_REG_ID'])
                ? $this->_req_data['_REG_ID']
                : 0;
        $new_page_routes                                  = [
            'reports'                      => [
                'func'       => [$this, '_registration_reports'],
                'capability' => 'ee_read_registrations',
            ],
            'registration_checkins'        => [
                'func'       => [$this, '_registration_checkin_list_table'],
                'capability' => 'ee_read_checkins',
            ],
            'newsletter_selected_send'     => [
                'func'       => [$this, '_newsletter_selected_send'],
                'noheader'   => true,
                'capability' => 'ee_send_message',
            ],
            'delete_checkin_rows'          => [
                'func'       => [$this, '_delete_checkin_rows'],
                'noheader'   => true,
                'capability' => 'ee_delete_checkins',
            ],
            'delete_checkin_row'           => [
                'func'       => [$this, '_delete_checkin_row'],
                'noheader'   => true,
                'capability' => 'ee_delete_checkin',
                'obj_id'     => $reg_id,
            ],
            'toggle_checkin_status'        => [
                'func'       => [$this, '_toggle_checkin_status'],
                'noheader'   => true,
                'capability' => 'ee_edit_checkin',
                'obj_id'     => $reg_id,
            ],
            'toggle_checkin_status_bulk'   => [
                'func'       => [$this, '_toggle_checkin_status'],
                'noheader'   => true,
                'capability' => 'ee_edit_checkins',
            ],
            'event_registrations'          => [
                'func'       => [$this, '_event_registrations_list_table'],
                'capability' => 'ee_read_checkins',
            ],
            'registrations_checkin_report' => [
                'func'       => [$this, '_registrations_checkin_report'],
                'noheader'   => true,
                'capability' => 'ee_read_registrations',
            ],
        ];
        $this->_page_routes                               = array_merge($this->_page_routes, $new_page_routes);
        $new_page_config                                  = [
            'reports'               => [
                'nav'           => [
                    'label' => esc_html__('Reports', 'event_espresso'),
                    'icon'  => 'dashicons-chart-bar',
                    'order' => 30,
                ],
                'help_tabs'     => [
                    'registrations_reports_help_tab' => [
                        'title'    => esc_html__('Registration Reports', 'event_espresso'),
                        'filename' => 'registrations_reports',
                    ],
                ],
                'require_nonce' => false,
            ],
            'event_registrations'   => [
                'nav'           => [
                    'label'      => esc_html__('Event Check-In', 'event_espresso'),
                    'icon'       => 'dashicons-yes-alt',
                    'order'      => 10,
                    'persistent' => true,
                ],
                'help_tabs'     => [
                    'registrations_event_checkin_help_tab'                       => [
                        'title'    => esc_html__('Registrations Event Check-In', 'event_espresso'),
                        'filename' => 'registrations_event_checkin',
                    ],
                    'registrations_event_checkin_table_column_headings_help_tab' => [
                        'title'    => esc_html__('Event Check-In Table Column Headings', 'event_espresso'),
                        'filename' => 'registrations_event_checkin_table_column_headings',
                    ],
                    'registrations_event_checkin_filters_help_tab'               => [
                        'title'    => esc_html__('Event Check-In Filters', 'event_espresso'),
                        'filename' => 'registrations_event_checkin_filters',
                    ],
                    'registrations_event_checkin_views_help_tab'                 => [
                        'title'    => esc_html__('Event Check-In Views', 'event_espresso'),
                        'filename' => 'registrations_event_checkin_views',
                    ],
                    'registrations_event_checkin_other_help_tab'                 => [
                        'title'    => esc_html__('Event Check-In Other', 'event_espresso'),
                        'filename' => 'registrations_event_checkin_other',
                    ],
                ],
                'list_table'    => 'EE_Event_Registrations_List_Table',
                'metaboxes'     => [],
                'require_nonce' => false,
            ],
            'registration_checkins' => [
                'nav'           => [
                    'label'      => esc_html__('Check-In Records', 'event_espresso'),
                    'icon'       => 'dashicons-list-view',
                    'order'      => 15,
                    'persistent' => false,
                    'url'        => '',
                ],
                'list_table'    => 'EE_Registration_CheckIn_List_Table',
                'metaboxes'     => [],
                'require_nonce' => false,
            ],
        ];
        $this->_page_config                               = array_merge($this->_page_config, $new_page_config);
        $this->_page_config['contact_list']['list_table'] = 'Extend_EE_Attendee_Contact_List_Table';
        $this->_page_config['default']['list_table']      = 'Extend_EE_Registrations_List_Table';
    }


    /**
     * Ajax hooks for all routes in this page.
     */
    protected function _ajax_hooks()
    {
        parent::_ajax_hooks();
        add_action('wp_ajax_get_newsletter_form_content', [$this, 'get_newsletter_form_content']);
        add_action('wp_ajax_toggle_checkin_status', [$this, 'toggle_checkin_status']);
    }


    /**
     * Global scripts for all routes in this page.
     *
     * @throws EE_Error
     * *@throws ReflectionException
     */
    public function load_scripts_styles()
    {
        parent::load_scripts_styles();
        // if newsletter message type is active then let's add filter and load js for it.
        if (EEH_MSG_Template::is_mt_active('newsletter')) {
            wp_enqueue_style(
                'ee_message_shortcodes',
                EE_MSG_ASSETS_URL . 'ee_message_shortcodes.css',
                [EspressoLegacyAdminAssetManager::CSS_HANDLE_EE_ADMIN],
                EVENT_ESPRESSO_VERSION
            );
            // enqueue newsletter js
            wp_enqueue_script(
                'ee-newsletter-trigger',
                REG_CAF_ASSETS_URL . 'ee-newsletter-trigger.js',
                ['ee-dialog'],
                EVENT_ESPRESSO_VERSION,
                true
            );
            // hook in buttons for newsletter message type trigger.
            add_action(
                'AHEE__EE_Admin_List_Table__extra_tablenav__after_bottom_buttons',
                [$this, 'add_newsletter_action_buttons']
            );
        }
    }


    /**
     * Scripts and styles for just the reports route.
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function load_scripts_styles_reports()
    {
        wp_register_script(
            'ee-reg-reports-js',
            REG_CAF_ASSETS_URL . 'ee-registration-admin-reports.js',
            ['google-charts'],
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_enqueue_script('ee-reg-reports-js');
        $this->_registration_reports_js_setup();
    }


    /**
     * Register screen options for event_registrations route.
     */
    protected function _add_screen_options_event_registrations()
    {
        $this->_per_page_screen_option();
    }


    /**
     * Register screen options for registration_checkins route
     */
    protected function _add_screen_options_registration_checkins()
    {
        $page_title              = $this->_admin_page_title;
        $this->_admin_page_title = esc_html__('Check-In Records', 'event_espresso');
        $this->_per_page_screen_option();
        $this->_admin_page_title = $page_title;
    }


    /**
     * Set views property for event_registrations route.
     */
    protected function _set_list_table_views_event_registrations()
    {
        $DTT_ID = $this->request->getRequestParam('DTT_ID', 0, DataType::INTEGER);
        $this->_views = [
            'all' => [
                'slug'        => 'all',
                'label'       => esc_html__('All', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => $DTT_ID
                    ? ['toggle_checkin_status_bulk' => esc_html__('Toggle Check-In', 'event_espresso')]
                    : [],
            ],
        ];
    }


    /**
     * Set views property for registration_checkins route.
     */
    protected function _set_list_table_views_registration_checkins()
    {
        $this->_views = [
            'all' => [
                'slug'        => 'all',
                'label'       => esc_html__('All', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => ['delete_checkin_rows' => esc_html__('Delete Check-In Rows', 'event_espresso')],
            ],
        ];
    }


    /**
     * callback for ajax action.
     *
     * @return void (JSON)
     * @throws EE_Error
     * @throws ReflectionException
     * @since 4.3.0
     */
    public function get_newsletter_form_content()
    {
        if (! $this->capabilities->current_user_can('ee_read_messages', __FUNCTION__)) {
            wp_die(esc_html__('You do not have the required privileges to perform this action', 'event_espresso'));
        }
        // do a nonce check because we're not coming in from a normal route here.
        $nonce     = isset($this->_req_data['get_newsletter_form_content_nonce'])
            ? sanitize_text_field($this->_req_data['get_newsletter_form_content_nonce'])
            : '';
        $nonce_ref = 'get_newsletter_form_content_nonce';
        $this->_verify_nonce($nonce, $nonce_ref);
        // let's get the mtp for the incoming MTP_ ID
        if (! isset($this->_req_data['GRP_ID'])) {
            EE_Error::add_error(
                esc_html__(
                    'There must be something broken with the js or html structure because the required data for getting a message template group is not present (need an GRP_ID).',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $this->_template_args['success'] = false;
            $this->_template_args['error']   = true;
            $this->_return_json();
        }
        $MTPG = EEM_Message_Template_Group::instance()->get_one_by_ID($this->_req_data['GRP_ID']);
        if (! $MTPG instanceof EE_Message_Template_Group) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'The GRP_ID given (%d) does not appear to have a corresponding row in the database.',
                        'event_espresso'
                    ),
                    $this->_req_data['GRP_ID']
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $this->_template_args['success'] = false;
            $this->_template_args['error']   = true;
            $this->_return_json();
        }
        $MTPs            = $MTPG->context_templates();
        $MTPs            = $MTPs['attendee'];
        $template_fields = [];
        /** @var EE_Message_Template $MTP */
        foreach ($MTPs as $MTP) {
            $field = $MTP->get('MTP_template_field');
            if ($field === 'content') {
                $content = $MTP->get('MTP_content');
                if (! empty($content['newsletter_content'])) {
                    $template_fields['newsletter_content'] = $content['newsletter_content'];
                }
                continue;
            }
            $template_fields[ $MTP->get('MTP_template_field') ] = $MTP->get('MTP_content');
        }
        $this->_template_args['success'] = true;
        $this->_template_args['error']   = false;
        $this->_template_args['data']    = [
            'batch_message_from'    => $template_fields['from'] ?? '',
            'batch_message_subject' => $template_fields['subject'] ?? '',
            'batch_message_content' => $template_fields['newsletter_content'] ?? '',
        ];
        $this->_return_json();
    }


    /**
     * callback for AHEE__EE_Admin_List_Table__extra_tablenav__after_bottom_buttons action
     *
     * @param EE_Admin_List_Table $list_table
     * @return void
     * @since 4.3.0
     */
    public function add_newsletter_action_buttons(EE_Admin_List_Table $list_table)
    {
        if (
            ! EE_Registry::instance()->CAP->current_user_can(
                'ee_send_message',
                'espresso_registrations_newsletter_selected_send'
            )
        ) {
            return;
        }
        $routes_to_add_to = [
            'contact_list',
            'event_registrations',
            'default',
        ];
        if ($this->_current_page === 'espresso_registrations' && in_array($this->_req_action, $routes_to_add_to)) {
            if (
                ($this->_req_action === 'event_registrations' && empty($this->_req_data['event_id']))
                || (isset($this->_req_data['status']) && $this->_req_data['status'] === 'trash')
            ) {
                echo '';
            } else {
                $button_text = sprintf(
                    esc_html__('Send Batch Message (%s selected)', 'event_espresso'),
                    '<span class="send-selected-newsletter-count">0</span>'
                );
                echo '<button id="selected-batch-send-trigger" class="button button--secondary">'
                    . '<span class="dashicons dashicons-email "></span>'
                    . $button_text
                    . '</button>';
                add_action('admin_footer', [$this, 'newsletter_send_form_skeleton']);
            }
        }
    }


    /**
     * @throws DomainException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function newsletter_send_form_skeleton()
    {
        $list_table = $this->_list_table_object;
        $codes      = [];
        // need to templates for the newsletter message type for the template selector.
        $values[] = ['text' => esc_html__('Select Template to Use', 'event_espresso'), 'id' => 0];
        $mtps     = EEM_Message_Template_Group::instance()->get_all(
            [['MTP_message_type' => 'newsletter', 'MTP_messenger' => 'email']]
        );
        foreach ($mtps as $mtp) {
            $name     = $mtp->name();
            $values[] = [
                'text' => empty($name) ? esc_html__('Global', 'event_espresso') : $name,
                'id'   => $mtp->ID(),
            ];
        }
        // need to get a list of shortcodes that are available for the newsletter message type.
        $shortcodes = EEH_MSG_Template::get_shortcodes(
            'newsletter',
            'email',
            [],
            'attendee'
        );

        foreach ($shortcodes as $field => $shortcode_array) {
            $available_shortcodes = [];
            foreach ($shortcode_array as $shortcode => $shortcode_details) {
                $field_id               = $field === '[NEWSLETTER_CONTENT]'
                    ? 'content'
                    : strtolower($field);
                $field_id               = "batch-message-$field_id";
                $available_shortcodes[] = '
                <span class="js-shortcode-selection"
                      data-value="' . $shortcode . '"
                      data-linked-input-id="' . $field_id . '"
                >' . $shortcode . '</span>';
            }
            $codes[ $field ] = '<ul><li>' . implode('</li><li>', $available_shortcodes) . '</li></ul>';
        }

        EEH_Template::display_template(
            REG_CAF_TEMPLATE_PATH . 'newsletter-send-form.template.php',
            [
                'form_action'       => admin_url('admin.php?page=espresso_registrations'),
                'form_route'        => 'newsletter_selected_send',
                'form_nonce_name'   => 'newsletter_selected_send_nonce',
                'form_nonce'        => wp_create_nonce('newsletter_selected_send_nonce'),
                'redirect_back_to'  => $this->_req_action,
                'ajax_nonce'        => wp_create_nonce('get_newsletter_form_content_nonce'),
                'template_selector' => EEH_Form_Fields::select_input('newsletter_mtp_selected', $values),
                'shortcodes'        => $codes,
                'id_type'           => $list_table instanceof EE_Attendee_Contact_List_Table ? 'contact'
                    : 'registration',
            ]
        );
    }


    /**
     * Handles sending selected registrations/contacts a newsletter.
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     * @since  4.3.0
     */
    protected function _newsletter_selected_send()
    {
        $success = true;
        // first we need to make sure we have a GRP_ID so we know what template we're sending and updating!
        if (empty($this->_req_data['newsletter_mtp_selected'])) {
            EE_Error::add_error(
                esc_html__(
                    'In order to send a message, a Message Template GRP_ID is needed. It was not provided so messages were not sent.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $success = false;
        }
        if ($success) {
            // update Message template in case there are any changes
            $Message_Template_Group = EEM_Message_Template_Group::instance()->get_one_by_ID(
                $this->_req_data['newsletter_mtp_selected']
            );
            $Message_Templates      = $Message_Template_Group instanceof EE_Message_Template_Group
                ? $Message_Template_Group->context_templates()
                : [];
            if (empty($Message_Templates)) {
                EE_Error::add_error(
                    esc_html__(
                        'Unable to retrieve message template fields from the db. Messages not sent.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
            // let's just update the specific fields
            foreach ($Message_Templates['attendee'] as $Message_Template) {
                if ($Message_Template instanceof EE_Message_Template) {
                    $field   = $Message_Template->get('MTP_template_field');
                    $content = $Message_Template->get('MTP_content');
                    switch ($field) {
                        case 'from':
                            $new_content = ! empty($this->_req_data['batch_message']['from'])
                                ? $this->_req_data['batch_message']['from']
                                : $content;
                            break;
                        case 'subject':
                            $new_content = ! empty($this->_req_data['batch_message']['subject'])
                                ? $this->_req_data['batch_message']['subject']
                                : $content;
                            break;
                        case 'content':
                            $new_content                       = $content;
                            $new_content['newsletter_content'] = ! empty($this->_req_data['batch_message']['content'])
                                ? $this->_req_data['batch_message']['content']
                                : $content['newsletter_content'];
                            break;
                        default:
                            // continue the foreach loop, we don't want to set $new_content nor save.
                            continue 2;
                    }
                    $Message_Template->set('MTP_content', $new_content);
                    $Message_Template->save();
                }
            }
            // great fields are updated!  now let's make sure we just have contact objects (EE_Attendee).
            $id_type = ! empty($this->_req_data['batch_message']['id_type'])
                ? $this->_req_data['batch_message']['id_type']
                : 'registration';
            // id_type will affect how we assemble the ids.
            $ids                                 = ! empty($this->_req_data['batch_message']['ids'])
                ? json_decode(stripslashes($this->_req_data['batch_message']['ids']))
                : [];
            $registrations_used_for_contact_data = [];
            // using switch because eventually we'll have other contexts that will be used for generating messages.
            switch ($id_type) {
                case 'registration':
                    $registrations_used_for_contact_data = EEM_Registration::instance()->get_all(
                        [
                            [
                                'REG_ID' => ['IN', $ids],
                            ],
                        ]
                    );
                    break;
                case 'contact':
                    $registrations_used_for_contact_data = EEM_Registration::instance()
                                                                           ->get_latest_registration_for_each_of_given_contacts(
                                                                               $ids
                                                                           );
                    break;
            }
            do_action_ref_array(
                'AHEE__Extend_Registrations_Admin_Page___newsletter_selected_send__with_registrations',
                [
                    $registrations_used_for_contact_data,
                    $Message_Template_Group->ID(),
                ]
            );
            // kept for backward compat, internally we no longer use this action.
            // @deprecated 4.8.36.rc.002
            $contacts = $id_type === 'registration'
                ? EEM_Attendee::instance()->get_array_of_contacts_from_reg_ids($ids)
                : EEM_Attendee::instance()->get_all([['ATT_ID' => ['in', $ids]]]);
            do_action_ref_array(
                'AHEE__Extend_Registrations_Admin_Page___newsletter_selected_send',
                [
                    $contacts,
                    $Message_Template_Group->ID(),
                ]
            );
        }
        $query_args = [
            'action' => ! empty($this->_req_data['redirect_back_to'])
                ? $this->_req_data['redirect_back_to']
                : 'default',
        ];
        $this->_redirect_after_action(false, '', '', $query_args, true);
    }


    /**
     * This is called when javascript is being enqueued to setup the various data needed for the reports js.
     * Also $this->{$_reports_template_data} property is set for later usage by the _registration_reports method.
     *
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _registration_reports_js_setup()
    {
        $this->_reports_template_data['admin_reports'][] = $this->_registrations_per_day_report();
        $this->_reports_template_data['admin_reports'][] = $this->_registrations_per_event_report();
    }


    /**
     * generates Business Reports regarding Registrations
     *
     * @return void
     * @throws DomainException
     * @throws EE_Error
     */
    protected function _registration_reports()
    {
        $template_path                              = EE_ADMIN_TEMPLATE . 'admin_reports.template.php';
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            $template_path,
            $this->_reports_template_data,
            true
        );
        // the final template wrapper
        $this->display_admin_page_with_no_sidebar();
    }


    /**
     * Generates Business Report showing total registrations per day.
     *
     * @param string $period The period (acceptable by PHP Datetime constructor) for which the report is generated.
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     * @throws Exception
     * @throws Exception
     */
    private function _registrations_per_day_report(string $period = '-1 month'): string
    {
        $report_ID = 'reg-admin-registrations-per-day-report-dv';
        $results   = EEM_Registration::instance()->get_registrations_per_day_and_per_status_report($period);
        $regs      = [];
        $subtitle  = '';
        if ($results) {
            $column_titles = [];
            $tracker       = 0;
            foreach ($results as $result) {
                $report_column_values = [];
                foreach ($result as $property_name => $property_value) {
                    $property_value         = $property_name === 'Registration_REG_date' ? $property_value
                        : (int) $property_value;
                    $report_column_values[] = $property_value;
                    if ($tracker === 0) {
                        if ($property_name === 'Registration_REG_date') {
                            $column_titles[] = esc_html__(
                                'Date (only days with registrations are shown)',
                                'event_espresso'
                            );
                        } else {
                            $column_titles[] = EEH_Template::pretty_status($property_name, false, 'sentence');
                        }
                    }
                }
                $tracker++;
                $regs[] = $report_column_values;
            }
            // make sure the column_titles is pushed to the beginning of the array
            array_unshift($regs, $column_titles);
            // setup the date range.
            $DateTimeZone   = new DateTimeZone(EEH_DTT_Helper::get_timezone());
            $beginning_date = new DateTime("now " . $period, $DateTimeZone);
            $ending_date    = new DateTime("now", $DateTimeZone);
            $subtitle       = sprintf(
                wp_strip_all_tags(
                    _x('For the period: %1$s to %2$s', 'Used to give date range', 'event_espresso')
                ),
                $beginning_date->format('Y-m-d'),
                $ending_date->format('Y-m-d')
            );
        }
        $report_title  = wp_strip_all_tags(__('Total Registrations per Day', 'event_espresso'));
        $report_params = [
            'title'     => $report_title,
            'subtitle'  => $subtitle,
            'id'        => $report_ID,
            'regs'      => $regs,
            'noResults' => empty($regs),
            'noRegsMsg' => sprintf(
                wp_strip_all_tags(
                    __(
                        '%sThere are currently no registration records in the last month for this report.%s',
                        'event_espresso'
                    )
                ),
                '<h2>' . $report_title . '</h2><p>',
                '</p>'
            ),
        ];
        wp_localize_script('ee-reg-reports-js', 'regPerDay', $report_params);
        return $report_ID;
    }


    /**
     * Generates Business Report showing total registrations per event.
     *
     * @param string $period The period (acceptable by PHP Datetime constructor) for which the report is generated.
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     * @throws Exception
     * @throws Exception
     * @throws Exception
     */
    private function _registrations_per_event_report(string $period = '-1 month'): string
    {
        $report_ID = 'reg-admin-registrations-per-event-report-dv';
        $results   = EEM_Registration::instance()->get_registrations_per_event_and_per_status_report($period);
        $regs      = [];
        $subtitle  = '';
        if ($results) {
            $column_titles = [];
            $tracker       = 0;
            foreach ($results as $result) {
                $report_column_values = [];
                foreach ($result as $property_name => $property_value) {
                    $property_value         = $property_name === 'Registration_Event' ? wp_trim_words(
                        $property_value,
                        4,
                        '...'
                    ) : (int) $property_value;
                    $report_column_values[] = $property_value;
                    if ($tracker === 0) {
                        if ($property_name === 'Registration_Event') {
                            $column_titles[] = esc_html__('Event', 'event_espresso');
                        } else {
                            $column_titles[] = EEH_Template::pretty_status($property_name, false, 'sentence');
                        }
                    }
                }
                $tracker++;
                $regs[] = $report_column_values;
            }
            // make sure the column_titles is pushed to the beginning of the array
            array_unshift($regs, $column_titles);
            // setup the date range.
            $DateTimeZone   = new DateTimeZone(EEH_DTT_Helper::get_timezone());
            $beginning_date = new DateTime("now " . $period, $DateTimeZone);
            $ending_date    = new DateTime("now", $DateTimeZone);
            $subtitle       = sprintf(
                wp_strip_all_tags(
                    _x('For the period: %1$s to %2$s', 'Used to give date range', 'event_espresso')
                ),
                $beginning_date->format('Y-m-d'),
                $ending_date->format('Y-m-d')
            );
        }
        $report_title  = wp_strip_all_tags(__('Total Registrations per Event', 'event_espresso'));
        $report_params = [
            'title'     => $report_title,
            'subtitle'  => $subtitle,
            'id'        => $report_ID,
            'regs'      => $regs,
            'noResults' => empty($regs),
            'noRegsMsg' => sprintf(
                wp_strip_all_tags(
                    __(
                        '%sThere are currently no registration records in the last month for this report.%s',
                        'event_espresso'
                    )
                ),
                '<h2>' . $report_title . '</h2><p>',
                '</p>'
            ),
        ];
        wp_localize_script('ee-reg-reports-js', 'regPerEvent', $report_params);
        return $report_ID;
    }


    /**
     * generates HTML for the Registration Check-in list table (showing all Check-ins for a specific registration)
     *
     * @return void
     * @throws EE_Error
     * @throws EntityNotFoundException
     * @throws ReflectionException
     */
    protected function _registration_checkin_list_table()
    {
        $REG_ID = $this->request->getRequestParam('_REG_ID', 0, DataType::INTEGER);
        /** @var EE_Registration $registration */
        $registration = EEM_Registration::instance()->get_one_by_ID($REG_ID);
        if (! $registration instanceof EE_Registration) {
            throw new EE_Error(
                sprintf(
                    esc_html__('An error occurred. There is no registration with ID (%d)', 'event_espresso'),
                    $REG_ID
                )
            );
        }
        $attendee                                 = $registration->attendee();
        $this->_admin_page_title                  .= $this->get_action_link_or_button(
            'new_registration',
            'add-registrant',
            ['event_id' => $registration->event_ID()],
            'add-new-h2'
        );
        $checked_in                               = new CheckinStatusDashicon(EE_Checkin::status_checked_in);
        $checked_out                              = new CheckinStatusDashicon(EE_Checkin::status_checked_out);
        $legend_items                             = [
            'checkin'  => [
                'class' => $checked_in->cssClasses(),
                'desc'  => $checked_in->legendLabel(),
            ],
            'checkout' => [
                'class' => $checked_out->cssClasses(),
                'desc'  => $checked_out->legendLabel(),
            ],
        ];
        $this->_template_args['after_list_table'] = $this->_display_legend($legend_items);

        $DTT_ID         = $this->request->getRequestParam('DTT_ID', 0, DataType::INTEGER);
        $datetime       = EEM_Datetime::instance()->get_one_by_ID($DTT_ID);
        $datetime_label = '';
        if ($datetime instanceof EE_Datetime) {
            $datetime_label = $datetime->get_dtt_display_name(true);
            $datetime_label .= ! empty($datetime_label)
                ? ' (' . $datetime->get_dtt_display_name() . ')'
                : $datetime->get_dtt_display_name();
        }
        $datetime_link                                    = ! $DTT_ID
            ? EE_Admin_Page::add_query_args_and_nonce(
                [
                    'action'   => 'event_registrations',
                    'event_id' => $registration->event_ID(),
                    'DTT_ID'   => $DTT_ID,
                ],
                $this->_admin_base_url
            )
            : '';
        $datetime_link                                    = ! empty($datetime_link)
            ? '<a href="' . $datetime_link . '">'
            . '<span id="checkin-dtt">'
            . $datetime_label
            . '</span></a>'
            : $datetime_label;
        $attendee_name                                    = $attendee instanceof EE_Attendee
            ? $attendee->full_name()
            : '';
        $attendee_link                                    = $attendee instanceof EE_Attendee
            ? $attendee->get_admin_details_link()
            : '';
        $attendee_link                                    = ! empty($attendee_link)
            ? '<a href="' . $attendee->get_admin_details_link() . '"'
            . ' aria-label="' . esc_html__('Click for attendee details', 'event_espresso') . '">'
            . '<span id="checkin-attendee-name">'
            . $attendee_name
            . '</span></a>'
            : '';
        $event_link                                       = $registration->event() instanceof EE_Event
            ? $registration->event()->get_admin_details_link()
            : '';
        $event_link                                       = ! empty($event_link)
            ? '<a href="' . $event_link . '"'
            . ' aria-label="' . esc_html__('Click here to edit event.', 'event_espresso') . '">'
            . '<span id="checkin-event-name">'
            . $registration->event_name()
            . '</span>'
            . '</a>'
            : '';
        $this->_template_args['before_list_table']        = $REG_ID && $DTT_ID
            ? '<h2>' . sprintf(
                esc_html__('Displaying check in records for %1$s for %2$s at the event, %3$s', 'event_espresso'),
                $attendee_link,
                $datetime_link,
                $event_link
            ) . '</h2>'
            : '';
        $this->_template_args['list_table_hidden_fields'] = $REG_ID
            ? '<input type="hidden" name="_REG_ID" value="' . $REG_ID . '">'
            : '';
        $this->_template_args['list_table_hidden_fields'] .= $DTT_ID
            ? '<input type="hidden" name="DTT_ID" value="' . $DTT_ID . '">'
            : '';
        $this->display_admin_list_table_page_with_no_sidebar();
    }


    /**
     * toggle the Check-in status for the given registration (coming from ajax)
     *
     * @return void (JSON)
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function toggle_checkin_status()
    {
        if (! $this->capabilities->current_user_can('ee_edit_checkins', __FUNCTION__)) {
            wp_die(esc_html__('You do not have the required privileges to perform this action', 'event_espresso'));
        }
        // first make sure we have the necessary data
        if (! isset($this->_req_data['_regid'])) {
            EE_Error::add_error(
                esc_html__(
                    'There must be something broken with the html structure because the required data for toggling the Check-in status is not being sent via ajax',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $this->_template_args['success'] = false;
            $this->_template_args['error']   = true;
            $this->_return_json();
        }
        // do a nonce check because we're not coming in from a normal route here.
        $nonce     = isset($this->_req_data['checkinnonce']) ? sanitize_text_field($this->_req_data['checkinnonce'])
            : '';
        $nonce_ref = 'checkin_nonce';
        $this->_verify_nonce($nonce, $nonce_ref);
        // beautiful! Made it this far so let's get the status.
        $new_status = new CheckinStatusDashicon($this->_toggle_checkin_status());
        // setup new class to return via ajax
        $this->_template_args['admin_page_content'] = 'clickable trigger-checkin ' . $new_status->cssClasses();
        $this->_template_args['success']            = true;
        $this->_return_json();
    }


    /**
     * handles toggling the checkin status for the registration,
     *
     * @return int|void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _toggle_checkin_status()
    {
        $DTT_ID = $this->request->getRequestParam('DTT_ID', 0, DataType::INTEGER);
        $DTT_ID = $this->request->getRequestParam('dttid', $DTT_ID, DataType::INTEGER);
        $DTT_ID = $this->request->getRequestParam('datetime_id', $DTT_ID, DataType::INTEGER);
        $_REG_ID = $this->request->getRequestParam('_regid', 0, DataType::INTEGER);
        $checkboxes = $this->request->getRequestParam('checkbox', [], DataType::INTEGER, true);

        $new_status = false;
        // bulk action check in toggle
        if (! empty($checkboxes)) {
            foreach ($checkboxes as $REG_ID) {
                $new_status = $this->_toggle_checkin($REG_ID, $DTT_ID);
            }
        } elseif ($_REG_ID) {
            $new_status = $this->_toggle_checkin($_REG_ID, $DTT_ID);
        } else {
            EE_Error::add_error(
                esc_html__('Missing some required data to toggle the Check-in', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        if (defined('DOING_AJAX') && DOING_AJAX) {
            return $new_status;
        }
        $EVT_ID = $this->request->getRequestParam('EVT_ID', 0, DataType::INTEGER);
        $EVT_ID = $this->request->getRequestParam('event_id', $EVT_ID, DataType::INTEGER);
        $redirect_args = [
            'action' => 'event_registrations',
            'EVT_ID' => $EVT_ID,
            'DTT_ID' => $DTT_ID,
        ];
        $this->_redirect_after_action(false, '', '', $redirect_args, true);
    }


    /**
     * This is toggles a single Check-in for the given registration and datetime.
     *
     * @param int $REG_ID The registration we're toggling
     * @param int $DTT_ID The datetime we're toggling
     * @return bool|int   the chk_in status toggled to OR false if nothing got changed.
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function _toggle_checkin(int $REG_ID, int $DTT_ID)
    {
        /** @var EE_Registration $REG */
        $REG        = EEM_Registration::instance()->get_one_by_ID($REG_ID);
        if (! $REG instanceof EE_Registration) {
            EE_Error::add_error(
                sprintf(
                    esc_html__('There is no registration with ID (%d)', 'event_espresso'),
                    $REG_ID
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        $new_status = $REG->toggle_checkin_status($DTT_ID);
        if ($new_status !== false) {
            EE_Error::add_success($REG->get_checkin_msg($DTT_ID));
        } else {
            EE_Error::add_error($REG->get_checkin_msg($DTT_ID, true), __FILE__, __FUNCTION__, __LINE__);
            $new_status = false;
        }
        return $new_status;
    }


    /**
     * Takes care of deleting multiple EE_Checkin table rows
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _delete_checkin_rows()
    {
        $query_args = [
            'action'  => 'registration_checkins',
            'DTT_ID'  => $this->_req_data['DTT_ID'] ?? 0,
            '_REG_ID' => $this->_req_data['_REG_ID'] ?? 0,
        ];
        $errors     = 0;
        if (! empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
            $checkboxes = $this->_req_data['checkbox'];
            foreach (array_keys($checkboxes) as $CHK_ID) {
                if (! EEM_Checkin::instance()->delete_by_ID($CHK_ID)) {
                    $errors++;
                }
            }
        } else {
            EE_Error::add_error(
                esc_html__(
                    'So, something went wrong with the bulk delete because there was no data received for instructions on WHAT to delete!',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $this->_redirect_after_action(false, '', '', $query_args, true);
        }
        if ($errors > 0) {
            EE_Error::add_error(
                sprintf(
                    esc_html__('There were %d records that did not delete successfully', 'event_espresso'),
                    $errors
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        } else {
            EE_Error::add_success(esc_html__('Records were successfully deleted', 'event_espresso'));
        }
        $this->_redirect_after_action(false, '', '', $query_args, true);
    }


    /**
     * Deletes a single EE_Checkin row
     *
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _delete_checkin_row()
    {
        $query_args = [
            'action'  => 'registration_checkins',
            'DTT_ID'  => $this->_req_data['DTT_ID'] ?? 0,
            '_REG_ID' => $this->_req_data['_REG_ID'] ?? 0,
        ];
        if (! empty($this->_req_data['CHK_ID'])) {
            if (! EEM_Checkin::instance()->delete_by_ID($this->_req_data['CHK_ID'])) {
                EE_Error::add_error(
                    esc_html__('Something went wrong and this check-in record was not deleted', 'event_espresso'),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            } else {
                EE_Error::add_success(esc_html__('Check-In record successfully deleted', 'event_espresso'));
            }
        } else {
            EE_Error::add_error(
                esc_html__(
                    'In order to delete a Check-in record, there must be a Check-In ID available. There is not. It is not your fault, there is just a gremlin living in the code',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        $this->_redirect_after_action(false, '', '', $query_args, true);
    }


    /**
     * @return void
     * @throws EE_Error
     */
    protected function _event_registrations_list_table()
    {
        $EVT_ID                  = $this->request->getRequestParam('EVT_ID', 0, DataType::INTEGER);
        $this->_admin_page_title .= $EVT_ID
            ? $this->get_action_link_or_button(
                'new_registration',
                'add-registrant',
                ['event_id' => $EVT_ID],
                'add-new-h2'
            )
            : '';

        $this->_template_args['before_list_table'] = $this->generateListTableHeaderText();
        $this->_template_args['after_list_table']  = $this->generateListTableLegend();

        $this->display_admin_list_table_page_with_no_sidebar();
    }


    /**
     * @return string
     * @since 5.0.24.p
     */
    private function generateListTableHeaderText(): string
    {
        $header_text                  = '';
        $admin_page_header_decorators = [
            'EventEspresso\core\domain\services\admin\registrations\list_table\page_header\AttendeeFilterHeader',
            'EventEspresso\core\domain\services\admin\registrations\list_table\page_header\EventFilterHeader',
            'EventEspresso\core\domain\services\admin\registrations\list_table\page_header\DateFilterHeader',
            'EventEspresso\core\domain\services\admin\registrations\list_table\page_header\TicketFilterHeader',
        ];
        foreach ($admin_page_header_decorators as $admin_page_header_decorator) {
            $filter_header_decorator = $this->loader->getNew($admin_page_header_decorator);
            $header_text             = $filter_header_decorator->getHeaderText($header_text);
        }
        $header_text .= '
            <div class="description ee-status-outline ee-status-bg--info ee-status-outline--fit-content">
                <strong>' . esc_html__(
            'In this view, the check-in status represents the latest check-in record for the registration in that row.',
            'event_espresso'
        ) . '</strong>
            </div>';
        return $header_text;
    }


    /**
     * @return string
     * @throws EE_Error
     * @since 5.0.24.p
     */
    private function generateListTableLegend(): string
    {
        $checked_in      = new CheckinStatusDashicon(EE_Checkin::status_checked_in);
        $checked_out     = new CheckinStatusDashicon(EE_Checkin::status_checked_out);
        $checked_never   = new CheckinStatusDashicon(EE_Checkin::status_checked_never);
        $checkin_invalid = new CheckinStatusDashicon(EE_Checkin::status_invalid);

        $legend_items = [
            'star-icon'        => [
                'class' => 'dashicons dashicons-star-filled gold-icon',
                'desc'  => esc_html__('This Registrant is the Primary Registrant', 'event_espresso'),
            ],
            'checkin'          => [
                'class' => $checked_in->cssClasses(),
                'desc'  => $checked_in->legendLabel(),
            ],
            'checkout'         => [
                'class' => $checked_out->cssClasses(),
                'desc'  => $checked_out->legendLabel(),
            ],
            'nocheckinrecord'  => [
                'class' => $checked_never->cssClasses(),
                'desc'  => $checked_never->legendLabel(),
            ],
            'canNotCheckin'    => [
                'class' => $checkin_invalid->cssClasses(),
                'desc'  => $checkin_invalid->legendLabel(),
            ],
            'approved_status'  => [
                'class' => 'ee-status-legend ee-status-bg--' . RegStatus::APPROVED,
                'desc'  => EEH_Template::pretty_status(RegStatus::APPROVED, false, 'sentence'),
            ],
            'cancelled_status' => [
                'class' => 'ee-status-legend ee-status-bg--' . RegStatus::CANCELLED,
                'desc'  => EEH_Template::pretty_status(RegStatus::CANCELLED, false, 'sentence'),
            ],
            'declined_status'  => [
                'class' => 'ee-status-legend ee-status-bg--' . RegStatus::DECLINED,
                'desc'  => EEH_Template::pretty_status(RegStatus::DECLINED, false, 'sentence'),
            ],
            'not_approved'     => [
                'class' => 'ee-status-legend ee-status-bg--' . RegStatus::AWAITING_REVIEW,
                'desc'  => EEH_Template::pretty_status(RegStatus::AWAITING_REVIEW, false, 'sentence'),
            ],
            'pending_status'   => [
                'class' => 'ee-status-legend ee-status-bg--' . RegStatus::PENDING_PAYMENT,
                'desc'  => EEH_Template::pretty_status(RegStatus::PENDING_PAYMENT, false, 'sentence'),
            ],
            'wait_list'        => [
                'class' => 'ee-status-legend ee-status-bg--' . RegStatus::WAIT_LIST,
                'desc'  => EEH_Template::pretty_status(RegStatus::WAIT_LIST, false, 'sentence'),
            ],
        ];
        return $this->_display_legend($legend_items);
    }


    /**
     * Download the registrations check-in report (same as the normal registration report, but with different where
     * conditions)
     *
     * @return void ends the request by a redirect or download
     */
    public function _registrations_checkin_report()
    {
        $this->_registrations_report_base('_get_checkin_query_params_from_request');
    }


    /**
     * Gets the query params from the request, plus adds a where condition for the registration status,
     * because on the checkin page we only ever want to see approved and pending-approval registrations
     *
     * @param array $query_params
     * @param int   $per_page
     * @param bool  $count
     * @return array
     * @throws EE_Error
     */
    protected function _get_checkin_query_params_from_request(
        array $query_params,
        int $per_page = 10,
        bool $count = false
    ): array {
        $query_params = $this->_get_registration_query_parameters($query_params, $per_page, $count);
        // unlike the regular registrations list table,
        $status_ids_array          = apply_filters(
            'FHEE__Extend_Registrations_Admin_Page__get_event_attendees__status_ids_array',
            [RegStatus::PENDING_PAYMENT, RegStatus::APPROVED]
        );
        $query_params[0]['STS_ID'] = ['IN', $status_ids_array];
        return $query_params;
    }


    /**
     * Gets registrations for an event
     *
     * @param int    $per_page
     * @param bool   $count whether to return count or data.
     * @param bool   $trash
     * @param string $orderby
     * @return EE_Registration[]|int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_event_attendees(
        int $per_page = 10,
        bool $count = false,
        bool $trash = false,
        string $orderby = 'ATT_fname'
    ) {
        // set some defaults, these will get overridden if included in the actual request parameters
        $defaults = [
            'orderby' => $orderby,
            'order'   => 'ASC',
        ];
        if ($trash) {
            $defaults['status'] = 'trash';
        }
        $query_params = $this->_get_checkin_query_params_from_request($defaults, $per_page, $count);

        /**
         * Override the default groupby added by EEM_Base so that sorts with multiple order bys work as expected
         *
         * @link https://events.codebasehq.com/projects/event-espresso/tickets/10093
         * @see  https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
         *                             or if you have the development copy of EE you can view this at the path:
         *                             /docs/G--Model-System/model-query-params.md
         */
        $query_params['group_by'] = '';

        return $count
            ? EEM_Registration::instance()->count($query_params)
            /** @type EE_Registration[] */
            : EEM_Registration::instance()->get_all($query_params);
    }
}
