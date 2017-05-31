<?php
if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}



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
    protected $_reports_template_data = array();



    /**
     * Extend_Registrations_Admin_Page constructor.
     *
     * @param bool $routing
     */
    public function __construct($routing = true)
    {
        parent::__construct($routing);
        if ( ! defined('REG_CAF_TEMPLATE_PATH')) {
            define('REG_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'registrations/templates/');
            define('REG_CAF_ASSETS', EE_CORE_CAF_ADMIN_EXTEND . 'registrations/assets/');
            define('REG_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'registrations/assets/');
        }
    }



    protected function _extend_page_config()
    {
        $this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'registrations';
        $reg_id = ! empty($this->_req_data['_REG_ID']) && ! is_array($this->_req_data['_REG_ID'])
            ? $this->_req_data['_REG_ID']
            : 0;
        // $att_id = ! empty( $this->_req_data['ATT_ID'] ) ? ! is_array( $this->_req_data['ATT_ID'] ) : 0;
        // $att_id = ! empty( $this->_req_data['post'] ) && ! is_array( $this->_req_data['post'] )
        // 	? $this->_req_data['post'] : $att_id;
        $new_page_routes = array(
            'reports'                  => array(
                'func'       => '_registration_reports',
                'capability' => 'ee_read_registrations',
            ),
            'registration_checkins'    => array(
                'func'       => '_registration_checkin_list_table',
                'capability' => 'ee_read_checkins',
            ),
            'newsletter_selected_send' => array(
                'func'       => '_newsletter_selected_send',
                'noheader'   => true,
                'capability' => 'ee_send_message',
            ),
            'delete_checkin_rows'      => array(
                'func'       => '_delete_checkin_rows',
                'noheader'   => true,
                'capability' => 'ee_delete_checkins',
            ),
            'delete_checkin_row'       => array(
                'func'       => '_delete_checkin_row',
                'noheader'   => true,
                'capability' => 'ee_delete_checkin',
                'obj_id'     => $reg_id,
            ),
            'toggle_checkin_status'    => array(
                'func'       => '_toggle_checkin_status',
                'noheader'   => true,
                'capability' => 'ee_edit_checkin',
                'obj_id'     => $reg_id,
            ),
            'event_registrations'      => array(
                'func'       => '_event_registrations_list_table',
                'capability' => 'ee_read_checkins',
            ),
            'registrations_checkin_report' => array(
                'func'       => '_registrations_checkin_report',
                'noheader'   => true,
                'capability' => 'ee_read_registrations',
            ),
        );
        $this->_page_routes = array_merge($this->_page_routes, $new_page_routes);
        $new_page_config = array(
            'reports'               => array(
                'nav'           => array(
                    'label' => __('Reports', 'event_espresso'),
                    'order' => 30,
                ),
                'help_tabs'     => array(
                    'registrations_reports_help_tab' => array(
                        'title'    => __('Registration Reports', 'event_espresso'),
                        'filename' => 'registrations_reports',
                    ),
                ),
                /*'help_tour' => array( 'Registration_Reports_Help_Tour' ),*/
                'require_nonce' => false,
            ),
            'event_registrations'   => array(
                'nav'           => array(
                    'label'      => __('Event Check-In', 'event_espresso'),
                    'order'      => 10,
                    'persistent' => true,
                ),
                'help_tabs'     => array(
                    'registrations_event_checkin_help_tab'                       => array(
                        'title'    => __('Registrations Event Check-In', 'event_espresso'),
                        'filename' => 'registrations_event_checkin',
                    ),
                    'registrations_event_checkin_table_column_headings_help_tab' => array(
                        'title'    => __('Event Check-In Table Column Headings', 'event_espresso'),
                        'filename' => 'registrations_event_checkin_table_column_headings',
                    ),
                    'registrations_event_checkin_filters_help_tab'               => array(
                        'title'    => __('Event Check-In Filters', 'event_espresso'),
                        'filename' => 'registrations_event_checkin_filters',
                    ),
                    'registrations_event_checkin_views_help_tab'                 => array(
                        'title'    => __('Event Check-In Views', 'event_espresso'),
                        'filename' => 'registrations_event_checkin_views',
                    ),
                    'registrations_event_checkin_other_help_tab'                 => array(
                        'title'    => __('Event Check-In Other', 'event_espresso'),
                        'filename' => 'registrations_event_checkin_other',
                    ),
                ),
                'help_tour'     => array('Event_Checkin_Help_Tour'),
                'qtips'         => array('Registration_List_Table_Tips'),
                'list_table'    => 'EE_Event_Registrations_List_Table',
                'metaboxes'     => array(),
                'require_nonce' => false,
            ),
            'registration_checkins' => array(
                'nav'           => array(
                    'label'      => __('Check-In Records', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                ),
                'list_table'    => 'EE_Registration_CheckIn_List_Table',
                //'help_tour' => array( 'Checkin_Toggle_View_Help_Tour' ),
                'metaboxes'     => array(),
                'require_nonce' => false,
            ),
        );
        $this->_page_config = array_merge($this->_page_config, $new_page_config);
        $this->_page_config['contact_list']['list_table'] = 'Extend_EE_Attendee_Contact_List_Table';
        $this->_page_config['default']['list_table'] = 'Extend_EE_Registrations_List_Table';
    }



    protected function _ajax_hooks()
    {
        parent::_ajax_hooks();
        add_action('wp_ajax_get_newsletter_form_content', array($this, 'get_newsletter_form_content'));
    }



    public function load_scripts_styles()
    {
        parent::load_scripts_styles();
        //if newsletter message type is active then let's add filter and load js for it.
        if (EEH_MSG_Template::is_mt_active('newsletter')) {
            //enqueue newsletter js
            wp_enqueue_script(
                'ee-newsletter-trigger',
                REG_CAF_ASSETS_URL . 'ee-newsletter-trigger.js',
                array('ee-dialog'),
                EVENT_ESPRESSO_VERSION,
                true
            );
            wp_enqueue_style(
                'ee-newsletter-trigger-css',
                REG_CAF_ASSETS_URL . 'ee-newsletter-trigger.css',
                array(),
                EVENT_ESPRESSO_VERSION
            );
            //hook in buttons for newsletter message type trigger.
            add_action(
                'AHEE__EE_Admin_List_Table__extra_tablenav__after_bottom_buttons',
                array($this, 'add_newsletter_action_buttons'),
                10
            );
        }
    }



    public function load_scripts_styles_reports()
    {
        wp_register_script(
            'ee-reg-reports-js',
            REG_CAF_ASSETS_URL . 'ee-registration-admin-reports.js',
            array('google-charts'),
            EVENT_ESPRESSO_VERSION,
            true
        );
        wp_enqueue_script('ee-reg-reports-js');
        $this->_registration_reports_js_setup();
    }



    protected function _add_screen_options_event_registrations()
    {
        $this->_per_page_screen_option();
    }



    protected function _add_screen_options_registration_checkins()
    {
        $page_title = $this->_admin_page_title;
        $this->_admin_page_title = __('Check-In Records', 'event_espresso');
        $this->_per_page_screen_option();
        $this->_admin_page_title = $page_title;
    }



    protected function _set_list_table_views_event_registrations()
    {
        $this->_views = array(
            'all' => array(
                'slug'        => 'all',
                'label'       => __('All', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => ! isset($this->_req_data['event_id'])
                    ? array()
                    : array(
                        'toggle_checkin_status' => __('Toggle Check-In', 'event_espresso'),
                        //'trash_registrations' => __('Trash Registrations', 'event_espresso')
                    ),
            ),
        );
    }



    protected function _set_list_table_views_registration_checkins()
    {
        $this->_views = array(
            'all' => array(
                'slug'        => 'all',
                'label'       => __('All', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array('delete_checkin_rows' => __('Delete Check-In Rows', 'event_espresso')),
            ),
        );
    }



    /**
     * callback for ajax action.
     *
     * @since 4.3.0
     * @return void (JSON)
     * @throws \EE_Error
     */
    public function get_newsletter_form_content()
    {
        //do a nonce check cause we're not coming in from an normal route here.
        $nonce = isset($this->_req_data['get_newsletter_form_content_nonce']) ? sanitize_text_field(
            $this->_req_data['get_newsletter_form_content_nonce']
        ) : '';
        $nonce_ref = 'get_newsletter_form_content_nonce';
        $this->_verify_nonce($nonce, $nonce_ref);
        //let's get the mtp for the incoming MTP_ ID
        if ( ! isset($this->_req_data['GRP_ID'])) {
            EE_Error::add_error(
                __(
                    'There must be something broken with the js or html structure because the required data for getting a message template group is not present (need an GRP_ID).',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $this->_template_args['success'] = false;
            $this->_template_args['error'] = true;
            $this->_return_json();
        }
        $MTPG = EEM_Message_Template_Group::instance()->get_one_by_ID($this->_req_data['GRP_ID']);
        if ( ! $MTPG instanceof EE_Message_Template_Group) {
            EE_Error::add_error(
                sprintf(
                    __(
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
            $this->_template_args['error'] = true;
            $this->_return_json();
        }
        $MTPs = $MTPG->context_templates();
        $MTPs = $MTPs['attendee'];
        $template_fields = array();
        /** @var EE_Message_Template $MTP */
        foreach ($MTPs as $MTP) {
            $field = $MTP->get('MTP_template_field');
            if ($field === 'content') {
                $content = $MTP->get('MTP_content');
                if ( ! empty($content['newsletter_content'])) {
                    $template_fields['newsletter_content'] = $content['newsletter_content'];
                }
                continue;
            }
            $template_fields[$MTP->get('MTP_template_field')] = $MTP->get('MTP_content');
        }
        $this->_template_args['success'] = true;
        $this->_template_args['error'] = false;
        $this->_template_args['data'] = array(
            'batch_message_from'    => isset($template_fields['from'])
                ? $template_fields['from']
                : '',
            'batch_message_subject' => isset($template_fields['subject'])
                ? $template_fields['subject']
                : '',
            'batch_message_content' => isset($template_fields['newsletter_content'])
                ? $template_fields['newsletter_content']
                : '',
        );
        $this->_return_json();
    }



    /**
     * callback for AHEE__EE_Admin_List_Table__extra_tablenav__after_bottom_buttons action
     *
     * @since 4.3.0
     * @param EE_Admin_List_Table $list_table
     * @return void
     */
    public function add_newsletter_action_buttons(EE_Admin_List_Table $list_table)
    {
        if ( ! EE_Registry::instance()->CAP->current_user_can(
            'ee_send_message',
            'espresso_registrations_newsletter_selected_send'
        )
        ) {
            return;
        }
        $routes_to_add_to = array(
            'contact_list',
            'event_registrations',
            'default',
        );
        if ($this->_current_page === 'espresso_registrations' && in_array($this->_req_action, $routes_to_add_to)) {
            if (($this->_req_action === 'event_registrations' && empty($this->_req_data['event_id']))
                || (isset($this->_req_data['status']) && $this->_req_data['status'] === 'trash')
            ) {
                echo '';
            } else {
                $button_text = sprintf(
                    __('Send Batch Message (%s selected)', 'event_espresso'),
                    '<span class="send-selected-newsletter-count">0</span>'
                );
                echo '<button id="selected-batch-send-trigger" class="button secondary-button"><span class="dashicons dashicons-email "></span>'
                     . $button_text
                     . '</button>';
                add_action('admin_footer', array($this, 'newsletter_send_form_skeleton'));
            }
        }
    }



    public function newsletter_send_form_skeleton()
    {
        $list_table = $this->_list_table_object;
        $codes = array();
        //need to templates for the newsletter message type for the template selector.
        $values[] = array('text' => __('Select Template to Use', 'event_espresso'), 'id' => 0);
        $mtps = EEM_Message_Template_Group::instance()->get_all(
            array(array('MTP_message_type' => 'newsletter', 'MTP_messenger' => 'email'))
        );
        foreach ($mtps as $mtp) {
            $name = $mtp->name();
            $values[] = array(
                'text' => empty($name) ? __('Global', 'event_espresso') : $name,
                'id'   => $mtp->ID(),
            );
        }
        //need to get a list of shortcodes that are available for the newsletter message type.
        $shortcodes = EEH_MSG_Template::get_shortcodes('newsletter', 'email', array(), 'attendee', false);
        foreach ($shortcodes as $field => $shortcode_array) {
            $codes[$field] = implode(', ', array_keys($shortcode_array));
        }
        $shortcodes = $codes;
        $form_template = REG_CAF_TEMPLATE_PATH . 'newsletter-send-form.template.php';
        $form_template_args = array(
            'form_action'       => admin_url('admin.php?page=espresso_registrations'),
            'form_route'        => 'newsletter_selected_send',
            'form_nonce_name'   => 'newsletter_selected_send_nonce',
            'form_nonce'        => wp_create_nonce('newsletter_selected_send_nonce'),
            'redirect_back_to'  => $this->_req_action,
            'ajax_nonce'        => wp_create_nonce('get_newsletter_form_content_nonce'),
            'template_selector' => EEH_Form_Fields::select_input('newsletter_mtp_selected', $values),
            'shortcodes'        => $shortcodes,
            'id_type'           => $list_table instanceof EE_Attendee_Contact_List_Table ? 'contact' : 'registration',
        );
        EEH_Template::display_template($form_template, $form_template_args);
    }



    /**
     * Handles sending selected registrations/contacts a newsletter.
     *
     * @since  4.3.0
     * @return void
     * @throws \EE_Error
     */
    protected function _newsletter_selected_send()
    {
        $success = true;
        //first we need to make sure we have a GRP_ID so we know what template we're sending and updating!
        if (empty($this->_req_data['newsletter_mtp_selected'])) {
            EE_Error::add_error(
                __(
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
            //update Message template in case there are any changes
            $Message_Template_Group = EEM_Message_Template_Group::instance()->get_one_by_ID(
                $this->_req_data['newsletter_mtp_selected']
            );
            $Message_Templates = $Message_Template_Group instanceof EE_Message_Template_Group
                ? $Message_Template_Group->context_templates()
                : array();
            if (empty($Message_Templates)) {
                EE_Error::add_error(
                    __(
                        'Unable to retrieve message template fields from the db. Messages not sent.',
                        'event_espresso'
                    ),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            }
            //let's just update the specific fields
            foreach ($Message_Templates['attendee'] as $Message_Template) {
                if ($Message_Template instanceof EE_Message_Template) {
                    $field = $Message_Template->get('MTP_template_field');
                    $content = $Message_Template->get('MTP_content');
                    $new_content = $content;
                    switch ($field) {
                        case 'from' :
                            $new_content = ! empty($this->_req_data['batch_message']['from'])
                                ? $this->_req_data['batch_message']['from']
                                : $content;
                            break;
                        case 'subject' :
                            $new_content = ! empty($this->_req_data['batch_message']['subject'])
                                ? $this->_req_data['batch_message']['subject']
                                : $content;
                            break;
                        case 'content' :
                            $new_content = $content;
                            $new_content['newsletter_content'] = ! empty($this->_req_data['batch_message']['content'])
                                ? $this->_req_data['batch_message']['content']
                                : $content['newsletter_content'];
                            break;
                        default :
                            //continue the foreach loop, we don't want to set $new_content nor save.
                            continue 2;
                    }
                    $Message_Template->set('MTP_content', $new_content);
                    $Message_Template->save();
                }
            }
            //great fields are updated!  now let's make sure we just have contact objects (EE_Attendee).
            $id_type = ! empty($this->_req_data['batch_message']['id_type'])
                ? $this->_req_data['batch_message']['id_type']
                : 'registration';
            //id_type will affect how we assemble the ids.
            $ids = ! empty($this->_req_data['batch_message']['ids'])
                ? json_decode(stripslashes($this->_req_data['batch_message']['ids']))
                : array();
            $registrations_used_for_contact_data = array();
            //using switch because eventually we'll have other contexts that will be used for generating messages.
            switch ($id_type) {
                case 'registration' :
                    $registrations_used_for_contact_data = EEM_Registration::instance()->get_all(
                        array(
                            array(
                                'REG_ID' => array('IN', $ids),
                            ),
                        )
                    );
                    break;
                case 'contact' :
                    $registrations_used_for_contact_data = EEM_Registration::instance()
                                                                           ->get_latest_registration_for_each_of_given_contacts($ids);
                    break;
            }
            do_action(
                'AHEE__Extend_Registrations_Admin_Page___newsletter_selected_send__with_registrations',
                $registrations_used_for_contact_data,
                $Message_Template_Group->ID()
            );
            //kept for backward compat, internally we no longer use this action.
            //@deprecated 4.8.36.rc.002
            $contacts = $id_type === 'registration'
                ? EEM_Attendee::instance()->get_array_of_contacts_from_reg_ids($ids)
                : EEM_Attendee::instance()->get_all(array(array('ATT_ID' => array('in', $ids))));
            do_action(
                'AHEE__Extend_Registrations_Admin_Page___newsletter_selected_send',
                $contacts,
                $Message_Template_Group->ID()
            );
        }
        $query_args = array(
            'action' => ! empty($this->_req_data['redirect_back_to'])
                ? $this->_req_data['redirect_back_to']
                : 'default',
        );
        $this->_redirect_after_action(false, '', '', $query_args, true);
    }



    /**
     * This is called when javascript is being enqueued to setup the various data needed for the reports js.
     * Also $this->{$_reports_template_data} property is set for later usage by the _registration_reports method.
     */
    protected function _registration_reports_js_setup()
    {
        $this->_reports_template_data['admin_reports'][] = $this->_registrations_per_day_report();
        $this->_reports_template_data['admin_reports'][] = $this->_registrations_per_event_report();
    }



    /**
     *        generates Business Reports regarding Registrations
     *
     * @access protected
     * @return void
     */
    protected function _registration_reports()
    {
        $template_path = EE_ADMIN_TEMPLATE . 'admin_reports.template.php';
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
     */
    private function _registrations_per_day_report($period = '-1 month')
    {
        $report_ID = 'reg-admin-registrations-per-day-report-dv';
        $results = EEM_Registration::instance()->get_registrations_per_day_and_per_status_report($period);
        $results = (array)$results;
        $regs = array();
        $subtitle = '';
        if ($results) {
            $column_titles = array();
            $tracker = 0;
            foreach ($results as $result) {
                $report_column_values = array();
                foreach ($result as $property_name => $property_value) {
                    $property_value = $property_name === 'Registration_REG_date' ? $property_value
                        : (int)$property_value;
                    $report_column_values[] = $property_value;
                    if ($tracker === 0) {
                        if ($property_name === 'Registration_REG_date') {
                            $column_titles[] = __('Date (only days with registrations are shown)', 'event_espresso');
                        } else {
                            $column_titles[] = EEH_Template::pretty_status($property_name, false, 'sentence');
                        }
                    }
                }
                $tracker++;
                $regs[] = $report_column_values;
            }
            //make sure the column_titles is pushed to the beginning of the array
            array_unshift($regs, $column_titles);
            //setup the date range.
            $DateTimeZone = new DateTimeZone(EEH_DTT_Helper::get_timezone());
            $beginning_date = new DateTime("now " . $period, $DateTimeZone);
            $ending_date = new DateTime("now", $DateTimeZone);
            $subtitle = sprintf(
                _x('For the period: %1$s to %2$s', 'Used to give date range', 'event_espresso'),
                $beginning_date->format('Y-m-d'),
                $ending_date->format('Y-m-d')
            );
        }
        $report_title = __('Total Registrations per Day', 'event_espresso');
        $report_params = array(
            'title'     => $report_title,
            'subtitle'  => $subtitle,
            'id'        => $report_ID,
            'regs'      => $regs,
            'noResults' => empty($regs),
            'noRegsMsg' => sprintf(
                __(
                    '%sThere are currently no registration records in the last month for this report.%s',
                    'event_espresso'
                ),
                '<h2>' . $report_title . '</h2><p>',
                '</p>'
            ),
        );
        wp_localize_script('ee-reg-reports-js', 'regPerDay', $report_params);
        return $report_ID;
    }



    /**
     * Generates Business Report showing total registrations per event.
     *
     * @param string $period The period (acceptable by PHP Datetime constructor) for which the report is generated.
     * @return string
     */
    private function _registrations_per_event_report($period = '-1 month')
    {
        $report_ID = 'reg-admin-registrations-per-event-report-dv';
        $results = EEM_Registration::instance()->get_registrations_per_event_and_per_status_report($period);
        $results = (array)$results;
        $regs = array();
        $subtitle = '';
        if ($results) {
            $column_titles = array();
            $tracker = 0;
            foreach ($results as $result) {
                $report_column_values = array();
                foreach ($result as $property_name => $property_value) {
                    $property_value = $property_name === 'Registration_Event' ? wp_trim_words(
                        $property_value,
                        4,
                        '...'
                    ) : (int)$property_value;
                    $report_column_values[] = $property_value;
                    if ($tracker === 0) {
                        if ($property_name === 'Registration_Event') {
                            $column_titles[] = __('Event', 'event_espresso');
                        } else {
                            $column_titles[] = EEH_Template::pretty_status($property_name, false, 'sentence');
                        }
                    }
                }
                $tracker++;
                $regs[] = $report_column_values;
            }
            //make sure the column_titles is pushed to the beginning of the array
            array_unshift($regs, $column_titles);
            //setup the date range.
            $DateTimeZone = new DateTimeZone(EEH_DTT_Helper::get_timezone());
            $beginning_date = new DateTime("now " . $period, $DateTimeZone);
            $ending_date = new DateTime("now", $DateTimeZone);
            $subtitle = sprintf(
                _x('For the period: %1$s to %2$s', 'Used to give date range', 'event_espresso'),
                $beginning_date->format('Y-m-d'),
                $ending_date->format('Y-m-d')
            );
        }
        $report_title = __('Total Registrations per Event', 'event_espresso');
        $report_params = array(
            'title'     => $report_title,
            'subtitle'  => $subtitle,
            'id'        => $report_ID,
            'regs'      => $regs,
            'noResults' => empty($regs),
            'noRegsMsg' => sprintf(
                __(
                    '%sThere are currently no registration records in the last month for this report.%s',
                    'event_espresso'
                ),
                '<h2>' . $report_title . '</h2><p>',
                '</p>'
            ),
        );
        wp_localize_script('ee-reg-reports-js', 'regPerEvent', $report_params);
        return $report_ID;
    }



    /**
     * generates HTML for the Registration Check-in list table (showing all Check-ins for a specific registration)
     *
     * @access protected
     * @return void
     * @throws \EE_Error
     */
    protected function _registration_checkin_list_table()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $reg_id = isset($this->_req_data['_REGID']) ? $this->_req_data['_REGID'] : null;
        /** @var EE_Registration $reg */
        $reg = EEM_Registration::instance()->get_one_by_ID($reg_id);
        $this->_admin_page_title .= $this->get_action_link_or_button(
            'new_registration',
            'add-registrant',
            array('event_id' => $reg->event_ID()),
            'add-new-h2'
        );
        $legend_items = array(
            'checkin'  => array(
                'class' => 'ee-icon ee-icon-check-in',
                'desc'  => __('This indicates the attendee has been checked in', 'event_espresso'),
            ),
            'checkout' => array(
                'class' => 'ee-icon ee-icon-check-out',
                'desc'  => __('This indicates the attendee has been checked out', 'event_espresso'),
            ),
        );
        $this->_template_args['after_list_table'] = $this->_display_legend($legend_items);
        $dtt_id = isset($this->_req_data['DTT_ID']) ? $this->_req_data['DTT_ID'] : null;
        $go_back_url = ! empty($reg_id) ? EE_Admin_Page::add_query_args_and_nonce(
            array(
                'action'   => 'event_registrations',
                'event_id' => EEM_Registration::instance()->get_one_by_ID($reg_id)->get_first_related('Event')->ID(),
                'DTT_ID'   => $dtt_id,
            ),
            $this->_admin_base_url
        ) : '';
        $this->_template_args['before_list_table'] = ! empty($reg_id) && ! empty($dtt_id)
            ? '<h2>' . sprintf(
                __("%s's check in records for %s at the event, %s", 'event_espresso'),
                '<span id="checkin-attendee-name">'
                . EEM_Registration::instance()
                                  ->get_one_by_ID($reg_id)
                                  ->get_first_related('Attendee')
                                  ->full_name() . '</span>',
                '<span id="checkin-dtt"><a href="' . $go_back_url . '">'
                . EEM_Datetime::instance()
                              ->get_one_by_ID($dtt_id)
                              ->start_date_and_time() . ' - '
                . EEM_Datetime::instance()
                              ->get_one_by_ID($dtt_id)
                              ->end_date_and_time() . '</a></span>',
                '<span id="checkin-event-name">'
                . EEM_Datetime::instance()
                              ->get_one_by_ID($dtt_id)
                              ->get_first_related('Event')
                              ->get('EVT_name') . '</span>'
            ) . '</h2>'
            : '';
        $this->_template_args['list_table_hidden_fields'] = ! empty($reg_id)
            ? '<input type="hidden" name="_REGID" value="' . $reg_id . '">' : '';
        $this->_template_args['list_table_hidden_fields'] .= ! empty($dtt_id)
            ? '<input type="hidden" name="DTT_ID" value="' . $dtt_id . '">' : '';
        $this->display_admin_list_table_page_with_no_sidebar();
    }



    /**
     * toggle the Check-in status for the given registration (coming from ajax)
     *
     * @return void (JSON)
     */
    public function toggle_checkin_status()
    {
        //first make sure we have the necessary data
        if ( ! isset($this->_req_data['_regid'])) {
            EE_Error::add_error(
                __(
                    'There must be something broken with the html structure because the required data for toggling the Check-in status is not being sent via ajax',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            $this->_template_args['success'] = false;
            $this->_template_args['error'] = true;
            $this->_return_json();
        };
        //do a nonce check cause we're not coming in from an normal route here.
        $nonce = isset($this->_req_data['checkinnonce']) ? sanitize_text_field($this->_req_data['checkinnonce'])
            : '';
        $nonce_ref = 'checkin_nonce';
        $this->_verify_nonce($nonce, $nonce_ref);
        //beautiful! Made it this far so let's get the status.
        $new_status = $this->_toggle_checkin_status();
        //setup new class to return via ajax
        $this->_template_args['admin_page_content'] = 'clickable trigger-checkin checkin-icons checkedin-status-'
                                                      . $new_status;
        $this->_template_args['success'] = true;
        $this->_return_json();
    }



    /**
     * handles toggling the checkin status for the registration,
     *
     * @access protected
     * @return int|void
     */
    protected function _toggle_checkin_status()
    {
        //first let's get the query args out of the way for the redirect
        $query_args = array(
            'action'   => 'event_registrations',
            'event_id' => isset($this->_req_data['event_id']) ? $this->_req_data['event_id'] : null,
            'DTT_ID'   => isset($this->_req_data['DTT_ID']) ? $this->_req_data['DTT_ID'] : null,
        );
        $new_status = false;
        // bulk action check in toggle
        if ( ! empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
            // cycle thru checkboxes
            while (list($REG_ID, $value) = each($this->_req_data['checkbox'])) {
                $DTT_ID = isset($this->_req_data['DTT_ID']) ? $this->_req_data['DTT_ID'] : null;
                $new_status = $this->_toggle_checkin($REG_ID, $DTT_ID);
            }
        } elseif (isset($this->_req_data['_regid'])) {
            //coming from ajax request
            $DTT_ID = isset($this->_req_data['dttid']) ? $this->_req_data['dttid'] : null;
            $query_args['DTT_ID'] = $DTT_ID;
            $new_status = $this->_toggle_checkin($this->_req_data['_regid'], $DTT_ID);
        } else {
            EE_Error::add_error(
                __('Missing some required data to toggle the Check-in', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        }
        if (defined('DOING_AJAX')) {
            return $new_status;
        }
        $this->_redirect_after_action(false, '', '', $query_args, true);
    }



    /**
     * This is toggles a single Check-in for the given registration and datetime.
     *
     * @param  int $REG_ID The registration we're toggling
     * @param  int $DTT_ID The datetime we're toggling
     * @return int            The new status toggled to.
     * @throws \EE_Error
     */
    private function _toggle_checkin($REG_ID, $DTT_ID)
    {
        /** @var EE_Registration $REG */
        $REG = EEM_Registration::instance()->get_one_by_ID($REG_ID);
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
     * @access protected
     * @return void
     * @throws \EE_Error
     */
    protected function _delete_checkin_rows()
    {
        $query_args = array(
            'action' => 'registration_checkins',
            'DTT_ID' => isset($this->_req_data['DTT_ID']) ? $this->_req_data['DTT_ID'] : 0,
            '_REGID' => isset($this->_req_data['_REGID']) ? $this->_req_data['_REGID'] : 0,
        );
        $errors = 0;
        if ( ! empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
            while (list($CHK_ID, $value) = each($this->_req_data['checkbox'])) {
                if ( ! EEM_Checkin::instance()->delete_by_ID($CHK_ID)) {
                    $errors++;
                }
            }
        } else {
            EE_Error::add_error(
                __(
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
                sprintf(__('There were %d records that did not delete successfully', 'event_espresso'), $errors),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
        } else {
            EE_Error::add_success(__('Records were successfully deleted', 'event_espresso'));
        }
        $this->_redirect_after_action(false, '', '', $query_args, true);
    }



    /**
     * Deletes a single EE_Checkin row
     *
     * @return void
     * @throws \EE_Error
     */
    protected function _delete_checkin_row()
    {
        $query_args = array(
            'action' => 'registration_checkins',
            'DTT_ID' => isset($this->_req_data['DTT_ID']) ? $this->_req_data['DTT_ID'] : 0,
            '_REGID' => isset($this->_req_data['_REGID']) ? $this->_req_data['_REGID'] : 0,
        );
        if ( ! empty($this->_req_data['CHK_ID'])) {
            if ( ! EEM_Checkin::instance()->delete_by_ID($this->_req_data['CHK_ID'])) {
                EE_Error::add_error(
                    __('Something went wrong and this check-in record was not deleted', 'event_espresso'),
                    __FILE__,
                    __FUNCTION__,
                    __LINE__
                );
            } else {
                EE_Error::add_success(__('Check-In record successfully deleted', 'event_espresso'));
            }
        } else {
            EE_Error::add_error(
                __(
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
     *        generates HTML for the Event Registrations List Table
     *
     * @access protected
     * @return void
     * @throws \EE_Error
     */
    protected function _event_registrations_list_table()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $this->_admin_page_title .= isset($this->_req_data['event_id'])
            ? $this->get_action_link_or_button(
                'new_registration',
                'add-registrant',
                array('event_id' => $this->_req_data['event_id']),
                'add-new-h2',
                '',
                false
            )
            : '';
        $legend_items = array(
            'star-icon'        => array(
                'class' => 'dashicons dashicons-star-filled lt-blue-icon ee-icon-size-8',
                'desc'  => __('This Registrant is the Primary Registrant', 'event_espresso'),
            ),
            'checkin'          => array(
                'class' => 'ee-icon ee-icon-check-in',
                'desc'  => __('This Registrant has been Checked In', 'event_espresso'),
            ),
            'checkout'         => array(
                'class' => 'ee-icon ee-icon-check-out',
                'desc'  => __('This Registrant has been Checked Out', 'event_espresso'),
            ),
            'nocheckinrecord'  => array(
                'class' => 'dashicons dashicons-no',
                'desc'  => __('No Check-in Record has been Created for this Registrant', 'event_espresso'),
            ),
            'view_details'     => array(
                'class' => 'dashicons dashicons-search',
                'desc'  => __('View All Check-in Records for this Registrant', 'event_espresso'),
            ),
            'approved_status'  => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_approved,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'sentence'),
            ),
            'cancelled_status' => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_cancelled,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_cancelled, false, 'sentence'),
            ),
            'declined_status'  => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_declined,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_declined, false, 'sentence'),
            ),
            'not_approved'     => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_not_approved,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_not_approved, false, 'sentence'),
            ),
            'pending_status'   => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_pending_payment,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'sentence'),
            ),
            'wait_list'        => array(
                'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_wait_list,
                'desc'  => EEH_Template::pretty_status(EEM_Registration::status_id_wait_list, false, 'sentence'),
            ),
        );
        $this->_template_args['after_list_table'] = $this->_display_legend($legend_items);
        $event_id = isset($this->_req_data['event_id']) ? $this->_req_data['event_id'] : null;
        $this->_template_args['before_list_table'] = ! empty($event_id)
            ? '<h2>' . sprintf(
                __('Viewing Registrations for Event: %s', 'event_espresso'),
                EEM_Event::instance()->get_one_by_ID($event_id)->get('EVT_name')
            ) . '</h2>'
            : '';
        //need to get the number of datetimes on the event and set default datetime_id if there is only one datetime on the event.
        /** @var EE_Event $event */
        $event = EEM_Event::instance()->get_one_by_ID($event_id);
        $DTT_ID = ! empty($this->_req_data['DTT_ID']) ? absint($this->_req_data['DTT_ID']) : 0;
        $datetime = null;
        if ($event instanceof EE_Event) {
            $datetimes_on_event = $event->datetimes();
            if (count($datetimes_on_event) === 1) {
                $datetime = reset($datetimes_on_event);
            }
        }
        $datetime = $datetime instanceof EE_Datetime ? $datetime : EEM_Datetime::instance()->get_one_by_ID($DTT_ID);
        if ($datetime instanceof EE_Datetime && $this->_template_args['before_list_table'] !== '') {
            $this->_template_args['before_list_table'] = substr($this->_template_args['before_list_table'], 0, -5);
            $this->_template_args['before_list_table'] .= ' &nbsp;<span class="drk-grey-text">';
            $this->_template_args['before_list_table'] .= '<span class="dashicons dashicons-calendar"></span>';
            $this->_template_args['before_list_table'] .= $datetime->name();
            $this->_template_args['before_list_table'] .= ' ( ' . $datetime->date_and_time_range() . ' )';
            $this->_template_args['before_list_table'] .= '</span></h2>';
        }
        //if no datetime, then we're on the initial view, so let's give some helpful instructions on what the status column
        //represents
        if ( ! $datetime instanceof EE_Datetime) {
            $this->_template_args['before_list_table'] .= '<br><p class="description">'
                                                          . __('In this view, the check-in status represents the latest check-in record for the registration in that row.',
                    'event_espresso')
                                                          . '</p>';
        }
        $this->display_admin_list_table_page_with_no_sidebar();
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
     * @param array     $request
     * @param int  $per_page
     * @param bool $count
     * @return array
     */
    protected function _get_checkin_query_params_from_request(
        $request,
        $per_page = 10,
        $count = false
    ) {
        $query_params = $this->_get_registration_query_parameters($request, $per_page, $count);
        //unlike the regular registrations list table,
        $status_ids_array = apply_filters(
            'FHEE__Extend_Registrations_Admin_Page__get_event_attendees__status_ids_array',
            array(EEM_Registration::status_id_pending_payment, EEM_Registration::status_id_approved)
        );
        $query_params[0]['STS_ID'] = array('IN', $status_ids_array);
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
     * @throws \EE_Error
     */
    public function get_event_attendees($per_page = 10, $count = false, $trash = false, $orderby = 'ATT_fname')
    {
        //normalize some request params that get setup by the parent `get_registrations` method.
        $request = $this->_req_data;
        $request['orderby'] = ! empty($this->_req_data['orderby']) ? $this->_req_data['orderby'] : $orderby;
        $request['order'] =  ! empty($this->_req_data['order']) ? $this->_req_data['order'] : 'ASC';
        if($trash){
            $request['status'] = 'trash';
        }
        $query_params = $this->_get_checkin_query_params_from_request( $request, $per_page, $count );
        /**
         * Override the default groupby added by EEM_Base so that sorts with multiple order bys work as expected
         * @link https://events.codebasehq.com/projects/event-espresso/tickets/10093
         * @see EEM_Base::get_all()
         */
        $query_params['group_by'] = '';

        return $count
            ? EEM_Registration::instance()->count($query_params)
            /** @type EE_Registration[] */
            : EEM_Registration::instance()->get_all($query_params);
    }

} //end class Registrations Admin Page
