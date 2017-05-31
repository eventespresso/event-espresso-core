<?php
if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('NO direct script access allowed');
}

/**
 * Event Espresso
 * Event Registration and Management Plugin for Wordpress
 *
 * @package         Event Espresso
 * @author          Seth Shoultes
 * @copyright    (c)2009-2012 Event Espresso All Rights Reserved.
 * @license         http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link            http://www.eventespresso.com
 * @version         4.0
 *                  ------------------------------------------------------------------------
 *                  Extend_Registration_Form_Admin_Page
 *                  This is the caffeinated version of the Registration Form admin pages.
 * @package         Extend_Registration_Form_Admin_Page
 * @subpackage      caffeinated/admin/extend/Extend_Registration_Form_Admin_Page.core.php
 * @author          Darren Ethier
 *                  ------------------------------------------------------------------------
 */
class Extend_Registration_Form_Admin_Page extends Registration_Form_Admin_Page
{


    /**
     * @Constructor
     * @param bool $routing indicate whether we want to just load the object and handle routing or just load the object.
     * @access public
     */
    public function __construct($routing = true)
    {
        define('REGISTRATION_FORM_CAF_ADMIN', EE_CORE_CAF_ADMIN_EXTEND . 'registration_form' . DS);
        define('REGISTRATION_FORM_CAF_ASSETS_PATH', REGISTRATION_FORM_CAF_ADMIN . 'assets' . DS);
        define('REGISTRATION_FORM_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'registration_form/assets/');
        define('REGISTRATION_FORM_CAF_TEMPLATE_PATH', REGISTRATION_FORM_CAF_ADMIN . 'templates' . DS);
        define('REGISTRATION_FORM_CAF_TEMPLATE_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'registration_form/templates/');
        parent::__construct($routing);
    }


    protected function _extend_page_config()
    {
        $this->_admin_base_path = REGISTRATION_FORM_CAF_ADMIN;
        $qst_id = ! empty($this->_req_data['QST_ID']) && ! is_array($this->_req_data['QST_ID']) ? $this->_req_data['QST_ID'] : 0;
        $qsg_id = ! empty($this->_req_data['QSG_ID']) && ! is_array($this->_req_data['QSG_ID']) ? $this->_req_data['QSG_ID'] : 0;

        $new_page_routes    = array(
            'question_groups'    => array(
                'func'       => '_question_groups_overview_list_table',
                'capability' => 'ee_read_question_groups',
            ),
            'add_question'       => array(
                'func'       => '_edit_question',
                'capability' => 'ee_edit_questions',
            ),
            'insert_question'    => array(
                'func'       => '_insert_or_update_question',
                'args'       => array('new_question' => true),
                'capability' => 'ee_edit_questions',
                'noheader'   => true,
            ),
            'duplicate_question' => array(
                'func'       => '_duplicate_question',
                'capability' => 'ee_edit_questions',
                'noheader'   => true,
            ),
            'trash_question'     => array(
                'func'       => '_trash_question',
                'capability' => 'ee_delete_question',
                'obj_id'     => $qst_id,
                'noheader'   => true,
            ),

            'restore_question' => array(
                'func'       => '_trash_or_restore_questions',
                'capability' => 'ee_delete_question',
                'obj_id'     => $qst_id,
                'args'       => array('trash' => false),
                'noheader'   => true,
            ),

            'delete_question' => array(
                'func'       => '_delete_question',
                'capability' => 'ee_delete_question',
                'obj_id'     => $qst_id,
                'noheader'   => true,
            ),

            'trash_questions' => array(
                'func'       => '_trash_or_restore_questions',
                'capability' => 'ee_delete_questions',
                'args'       => array('trash' => true),
                'noheader'   => true,
            ),

            'restore_questions' => array(
                'func'       => '_trash_or_restore_questions',
                'capability' => 'ee_delete_questions',
                'args'       => array('trash' => false),
                'noheader'   => true,
            ),

            'delete_questions' => array(
                'func'       => '_delete_questions',
                'args'       => array(),
                'capability' => 'ee_delete_questions',
                'noheader'   => true,
            ),

            'add_question_group' => array(
                'func'       => '_edit_question_group',
                'capability' => 'ee_edit_question_groups',
            ),

            'edit_question_group' => array(
                'func'       => '_edit_question_group',
                'capability' => 'ee_edit_question_group',
                'obj_id'     => $qsg_id,
                'args'       => array('edit'),
            ),

            'delete_question_groups' => array(
                'func'       => '_delete_question_groups',
                'capability' => 'ee_delete_question_groups',
                'noheader'   => true,
            ),

            'delete_question_group' => array(
                'func'       => '_delete_question_groups',
                'capability' => 'ee_delete_question_group',
                'obj_id'     => $qsg_id,
                'noheader'   => true,
            ),

            'trash_question_group' => array(
                'func'       => '_trash_or_restore_question_groups',
                'args'       => array('trash' => true),
                'capability' => 'ee_delete_question_group',
                'obj_id'     => $qsg_id,
                'noheader'   => true,
            ),

            'restore_question_group' => array(
                'func'       => '_trash_or_restore_question_groups',
                'args'       => array('trash' => false),
                'capability' => 'ee_delete_question_group',
                'obj_id'     => $qsg_id,
                'noheader'   => true,
            ),

            'insert_question_group' => array(
                'func'       => '_insert_or_update_question_group',
                'args'       => array('new_question_group' => true),
                'capability' => 'ee_edit_question_groups',
                'noheader'   => true,
            ),

            'update_question_group' => array(
                'func'       => '_insert_or_update_question_group',
                'args'       => array('new_question_group' => false),
                'capability' => 'ee_edit_question_group',
                'obj_id'     => $qsg_id,
                'noheader'   => true,
            ),

            'trash_question_groups' => array(
                'func'       => '_trash_or_restore_question_groups',
                'args'       => array('trash' => true),
                'capability' => 'ee_delete_question_groups',
                'noheader'   => array('trash' => false),
            ),

            'restore_question_groups' => array(
                'func'       => '_trash_or_restore_question_groups',
                'args'       => array('trash' => false),
                'capability' => 'ee_delete_question_groups',
                'noheader'   => true,
            ),


            'espresso_update_question_group_order' => array(
                'func'       => 'update_question_group_order',
                'capability' => 'ee_edit_question_groups',
                'noheader'   => true,
            ),

            'view_reg_form_settings' => array(
                'func'       => '_reg_form_settings',
                'capability' => 'manage_options',
            ),

            'update_reg_form_settings' => array(
                'func'       => '_update_reg_form_settings',
                'capability' => 'manage_options',
                'noheader'   => true,
            ),
        );
        $this->_page_routes = array_merge($this->_page_routes, $new_page_routes);

        $new_page_config    = array(

            'question_groups' => array(
                'nav'           => array(
                    'label' => esc_html__('Question Groups', 'event_espresso'),
                    'order' => 20,
                ),
                'list_table'    => 'Registration_Form_Question_Groups_Admin_List_Table',
                'help_tabs'     => array(
                    'registration_form_question_groups_help_tab'                           => array(
                        'title'    => esc_html__('Question Groups', 'event_espresso'),
                        'filename' => 'registration_form_question_groups',
                    ),
                    'registration_form_question_groups_table_column_headings_help_tab'     => array(
                        'title'    => esc_html__('Question Groups Table Column Headings', 'event_espresso'),
                        'filename' => 'registration_form_question_groups_table_column_headings',
                    ),
                    'registration_form_question_groups_views_bulk_actions_search_help_tab' => array(
                        'title'    => esc_html__('Question Groups Views & Bulk Actions & Search', 'event_espresso'),
                        'filename' => 'registration_form_question_groups_views_bulk_actions_search',
                    ),
                ),
                'help_tour'     => array('Registration_Form_Question_Groups_Help_Tour'),
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'require_nonce' => false,
                'qtips'         => array(
                    'EE_Registration_Form_Tips',
                ),
            ),

            'add_question' => array(
                'nav'           => array(
                    'label'      => esc_html__('Add Question', 'event_espresso'),
                    'order'      => 5,
                    'persistent' => false,
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'help_tabs'     => array(
                    'registration_form_add_question_help_tab' => array(
                        'title'    => esc_html__('Add Question', 'event_espresso'),
                        'filename' => 'registration_form_add_question',
                    ),
                ),
                'help_tour'     => array('Registration_Form_Add_Question_Help_Tour'),
                'require_nonce' => false,
            ),

            'add_question_group' => array(
                'nav'           => array(
                    'label'      => esc_html__('Add Question Group', 'event_espresso'),
                    'order'      => 5,
                    'persistent' => false,
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'help_tabs'     => array(
                    'registration_form_add_question_group_help_tab' => array(
                        'title'    => esc_html__('Add Question Group', 'event_espresso'),
                        'filename' => 'registration_form_add_question_group',
                    ),
                ),
                'help_tour'     => array('Registration_Form_Add_Question_Group_Help_Tour'),
                'require_nonce' => false,
            ),

            'edit_question_group' => array(
                'nav'           => array(
                    'label'      => esc_html__('Edit Question Group', 'event_espresso'),
                    'order'      => 5,
                    'persistent' => false,
                    'url'        => isset($this->_req_data['question_group_id']) ? add_query_arg(array('question_group_id' => $this->_req_data['question_group_id']),
                        $this->_current_page_view_url) : $this->_admin_base_url,
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'help_tabs'     => array(
                    'registration_form_edit_question_group_help_tab' => array(
                        'title'    => esc_html__('Edit Question Group', 'event_espresso'),
                        'filename' => 'registration_form_edit_question_group',
                    ),
                ),
                'help_tour'     => array('Registration_Form_Edit_Question_Group_Help_Tour'),
                'require_nonce' => false,
            ),

            'view_reg_form_settings' => array(
                'nav'           => array(
                    'label' => esc_html__('Reg Form Settings', 'event_espresso'),
                    'order' => 40,
                ),
                'labels'        => array(
                    'publishbox' => esc_html__('Update Settings', 'event_espresso'),
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'help_tabs'     => array(
                    'registration_form_reg_form_settings_help_tab' => array(
                        'title'    => esc_html__('Registration Form Settings', 'event_espresso'),
                        'filename' => 'registration_form_reg_form_settings',
                    ),
                ),
                'help_tour'     => array('Registration_Form_Settings_Help_Tour'),
                'require_nonce' => false,
            ),

        );
        $this->_page_config = array_merge($this->_page_config, $new_page_config);

        //change the list table we're going to use so it's the NEW list table!
        $this->_page_config['default']['list_table'] = 'Extend_Registration_Form_Questions_Admin_List_Table';


        //additional labels
        $new_labels               = array(
            'add_question'          => esc_html__('Add New Question', 'event_espresso'),
            'delete_question'       => esc_html__('Delete Question', 'event_espresso'),
            'add_question_group'    => esc_html__('Add New Question Group', 'event_espresso'),
            'edit_question_group'   => esc_html__('Edit Question Group', 'event_espresso'),
            'delete_question_group' => esc_html__('Delete Question Group', 'event_espresso'),
        );
        $this->_labels['buttons'] = array_merge($this->_labels['buttons'], $new_labels);

    }


    protected function _ajax_hooks()
    {
        add_action('wp_ajax_espresso_update_question_group_order', array($this, 'update_question_group_order'));
    }


    public function load_scripts_styles_question_groups()
    {
        wp_enqueue_script('espresso_ajax_table_sorting');
    }


    public function load_scripts_styles_add_question_group()
    {
        $this->load_scripts_styles_forms();
        $this->load_sortable_question_script();
    }

    public function load_scripts_styles_edit_question_group()
    {
        $this->load_scripts_styles_forms();
        $this->load_sortable_question_script();
    }


    /**
     * registers and enqueues script for questions
     *
     * @return void
     */
    public function load_sortable_question_script()
    {
        wp_register_script('ee-question-sortable', REGISTRATION_FORM_CAF_ASSETS_URL . 'ee_question_order.js',
            array('jquery-ui-sortable'), EVENT_ESPRESSO_VERSION, true);
        wp_enqueue_script('ee-question-sortable');
    }


    protected function _set_list_table_views_default()
    {
        $this->_views = array(
            'all' => array(
                'slug'        => 'all',
                'label'       => esc_html__('View All Questions', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'trash_questions' => esc_html__('Trash', 'event_espresso'),
                ),
            ),
        );

        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_questions',
            'espresso_registration_form_trash_questions')
        ) {
            $this->_views['trash'] = array(
                'slug'        => 'trash',
                'label'       => esc_html__('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'delete_questions'  => esc_html__('Delete Permanently', 'event_espresso'),
                    'restore_questions' => esc_html__('Restore', 'event_espresso'),
                ),
            );
        }
    }


    protected function _set_list_table_views_question_groups()
    {
        $this->_views = array(
            'all' => array(
                'slug'        => 'all',
                'label'       => esc_html__('All', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'trash_question_groups' => esc_html__('Trash', 'event_espresso'),
                ),
            ),
        );

        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_question_groups',
            'espresso_registration_form_trash_question_groups')
        ) {
            $this->_views['trash'] = array(
                'slug'        => 'trash',
                'label'       => esc_html__('Trash', 'event_espresso'),
                'count'       => 0,
                'bulk_action' => array(
                    'delete_question_groups'  => esc_html__('Delete Permanently', 'event_espresso'),
                    'restore_question_groups' => esc_html__('Restore', 'event_espresso'),
                ),
            );
        }
    }


    protected function _questions_overview_list_table()
    {
        $this->_admin_page_title .= ' ' . $this->get_action_link_or_button(
                'add_question',
                'add_question',
                array(),
                'add-new-h2'
            );
        parent::_questions_overview_list_table();
    }


    protected function _question_groups_overview_list_table()
    {
        $this->_search_btn_label = esc_html__('Question Groups', 'event_espresso');
        $this->_admin_page_title .= ' ' . $this->get_action_link_or_button(
                'add_question_group',
                'add_question_group',
                array(),
                'add-new-h2'
            );
        $this->display_admin_list_table_page_with_sidebar();
    }


    protected function _delete_question()
    {
        $success = $this->_delete_items($this->_question_model);
        $this->_redirect_after_action(
            $success,
            $this->_question_model->item_name($success),
            'deleted',
            array('action' => 'default', 'status' => 'all')
        );
    }


    protected function _delete_questions()
    {
        $success = $this->_delete_items($this->_question_model);
        $this->_redirect_after_action(
            $success,
            $this->_question_model->item_name($success),
            'deleted permanently',
            array('action' => 'default', 'status' => 'trash')
        );
    }


    /**
     * Performs the deletion of a single or multiple questions or question groups.
     *
     * @param EEM_Soft_Delete_Base $model
     * @return int number of items deleted permanently
     */
    private function _delete_items(EEM_Soft_Delete_Base $model)
    {
        $success = 0;
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        if (! empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
            // if array has more than one element than success message should be plural
            $success = count($this->_req_data['checkbox']) > 1 ? 2 : 1;
            // cycle thru bulk action checkboxes
            while (list($ID, $value) = each($this->_req_data['checkbox'])) {
                if (! $this->_delete_item($ID, $model)) {
                    $success = 0;
                }
            }

        } elseif (! empty($this->_req_data['QSG_ID'])) {
            $success = $this->_delete_item($this->_req_data['QSG_ID'], $model);

        } elseif (! empty($this->_req_data['QST_ID'])) {
            $success = $this->_delete_item($this->_req_data['QST_ID'], $model);
        } else {
            EE_Error::add_error(sprintf(esc_html__("No Questions or Question Groups were selected for deleting. This error usually shows when you've attempted to delete via bulk action but there were no selections.",
                "event_espresso")), __FILE__, __FUNCTION__, __LINE__);
        }
        return $success;
    }

    /**
     * Deletes the specified question (and its associated question options) or question group
     *
     * @param int                  $id
     * @param EEM_Soft_Delete_Base $model
     * @return boolean
     */
    protected function _delete_item($id, $model)
    {
        if ($model instanceof EEM_Question) {
            EEM_Question_Option::instance()->delete_permanently(array(array('QST_ID' => absint($id))));
        }
        return $model->delete_permanently_by_ID(absint($id));
    }


    /******************************    QUESTION GROUPS    ******************************/


    protected function _edit_question_group($type = 'add')
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $ID = isset($this->_req_data['QSG_ID']) && ! empty($this->_req_data['QSG_ID']) ? absint($this->_req_data['QSG_ID']) : false;

        switch ($this->_req_action) {
            case 'add_question_group' :
                $this->_admin_page_title = esc_html__('Add Question Group', 'event_espresso');
                break;
            case 'edit_question_group' :
                $this->_admin_page_title = esc_html__('Edit Question Group', 'event_espresso');
                break;
            default :
                $this->_admin_page_title = ucwords(str_replace('_', ' ', $this->_req_action));
        }
        // add ID to title if editing
        $this->_admin_page_title = $ID ? $this->_admin_page_title . ' # ' . $ID : $this->_admin_page_title;
        if ($ID) {
            /** @var EE_Question_Group $questionGroup */
            $questionGroup            = $this->_question_group_model->get_one_by_ID($ID);
            $additional_hidden_fields = array('QSG_ID' => array('type' => 'hidden', 'value' => $ID));
            $this->_set_add_edit_form_tags('update_question_group', $additional_hidden_fields);
        } else {
            /** @var EE_Question_Group $questionGroup */
            $questionGroup = EEM_Question_Group::instance()->create_default_object();
            $questionGroup->set_order_to_latest();
            $this->_set_add_edit_form_tags('insert_question_group');
        }
        $this->_template_args['values']         = $this->_yes_no_values;
        $this->_template_args['all_questions']  = $questionGroup->questions_in_and_not_in_group();
        $this->_template_args['QSG_ID']         = $ID ? $ID : true;
        $this->_template_args['question_group'] = $questionGroup;

        $redirect_URL = add_query_arg(array('action' => 'question_groups'), $this->_admin_base_url);
        $this->_set_publish_post_box_vars('id', $ID, false, $redirect_URL);
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(REGISTRATION_FORM_CAF_TEMPLATE_PATH . 'question_groups_main_meta_box.template.php',
            $this->_template_args, true);

        // the details template wrapper
        $this->display_admin_page_with_sidebar();
    }


    protected function _delete_question_groups()
    {
        $success = $this->_delete_items($this->_question_group_model);
        $this->_redirect_after_action($success, $this->_question_group_model->item_name($success),
            'deleted permanently', array('action' => 'question_groups', 'status' => 'trash'));
    }


    /**
     * @param bool $new_question_group
     */
    protected function _insert_or_update_question_group($new_question_group = true)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $set_column_values = $this->_set_column_values_for($this->_question_group_model);
        if ($new_question_group) {
            $QSG_ID  = $this->_question_group_model->insert($set_column_values);
            $success = $QSG_ID ? 1 : 0;
        } else {
            $QSG_ID = absint($this->_req_data['QSG_ID']);
            unset($set_column_values['QSG_ID']);
            $success = $this->_question_group_model->update($set_column_values, array(array('QSG_ID' => $QSG_ID)));
        }
        $phone_question_id = EEM_Question::instance()->get_Question_ID_from_system_string(EEM_Attendee::system_question_phone);
        // update the existing related questions
        // BUT FIRST...  delete the phone question from the Question_Group_Question if it is being added to this question group (therefore removed from the existing group)
        if (isset($this->_req_data['questions'], $this->_req_data['questions'][$phone_question_id])) {
            // delete where QST ID = system phone question ID and Question Group ID is NOT this group
            EEM_Question_Group_Question::instance()->delete(array(
                array(
                    'QST_ID' => $phone_question_id,
                    'QSG_ID' => array('!=', $QSG_ID),
                ),
            ));
        }
        /** @type EE_Question_Group $question_group */
        $question_group = $this->_question_group_model->get_one_by_ID($QSG_ID);
        $questions      = $question_group->questions();
        // make sure system phone question is added to list of questions for this group
        if (! isset($questions[$phone_question_id])) {
            $questions[$phone_question_id] = EEM_Question::instance()->get_one_by_ID($phone_question_id);
        }

        foreach ($questions as $question_ID => $question) {
            // first we always check for order.
            if (! empty($this->_req_data['question_orders'][$question_ID])) {
                //update question order
                $question_group->update_question_order($question_ID, $this->_req_data['question_orders'][$question_ID]);
            }

            // then we always check if adding or removing.
            if (isset($this->_req_data['questions'], $this->_req_data['questions'][$question_ID])) {
                $question_group->add_question($question_ID);
            } else {
                // not found, remove it (but only if not a system question for the personal group with the exception of lname system question - we allow removal of it)
                if (
                in_array(
                    $question->system_ID(),
                    EEM_Question::instance()->required_system_questions_in_system_question_group($question_group->system_group())
                )
                ) {
                    continue;
                } else {
                    $question_group->remove_question($question_ID);
                }
            }
        }
        // save new related questions
        if (isset($this->_req_data['questions'])) {
            foreach ($this->_req_data['questions'] as $QST_ID) {
                $question_group->add_question($QST_ID);
                if (isset($this->_req_data['question_orders'][$QST_ID])) {
                    $question_group->update_question_order($QST_ID, $this->_req_data['question_orders'][$QST_ID]);
                }
            }
        }

        if ($success !== false) {
            $msg = $new_question_group ? sprintf(esc_html__('The %s has been created', 'event_espresso'),
                $this->_question_group_model->item_name()) : sprintf(esc_html__('The %s has been updated',
                'event_espresso'), $this->_question_group_model->item_name());
            EE_Error::add_success($msg);
        }
        $this->_redirect_after_action(false, '', '', array('action' => 'edit_question_group', 'QSG_ID' => $QSG_ID),
            true);

    }

    /**
     * duplicates a question and all its question options and redirects to the new question.
     */
    public function _duplicate_question()
    {
        $question_ID = (int)$this->_req_data['QST_ID'];
        $question    = EEM_Question::instance()->get_one_by_ID($question_ID);
        if ($question instanceof EE_Question) {
            $new_question = $question->duplicate();
            if ($new_question instanceof EE_Question) {
                $this->_redirect_after_action(true, esc_html__('Question', 'event_espresso'),
                    esc_html__('Duplicated', 'event_espresso'),
                    array('action' => 'edit_question', 'QST_ID' => $new_question->ID()), true);
            } else {
                global $wpdb;
                EE_Error::add_error(sprintf(esc_html__('Could not duplicate question with ID %1$d because: %2$s',
                    'event_espresso'), $question_ID, $wpdb->last_error), __FILE__, __FUNCTION__, __LINE__);
                $this->_redirect_after_action(false, '', '', array('action' => 'default'), false);
            }
        } else {
            EE_Error::add_error(sprintf(esc_html__('Could not duplicate question with ID %d because it didn\'t exist!',
                'event_espresso'), $question_ID), __FILE__, __FUNCTION__, __LINE__);
            $this->_redirect_after_action(false, '', '', array('action' => 'default'), false);
        }
    }


    /**
     * @param bool $trash
     */
    protected function _trash_or_restore_question_groups($trash = true)
    {
        $this->_trash_or_restore_items($this->_question_group_model, $trash);
    }


    /**
     *_trash_question
     */
    protected function _trash_question()
    {
        $success    = $this->_question_model->delete_by_ID((int)$this->_req_data['QST_ID']);
        $query_args = array('action' => 'default', 'status' => 'all');
        $this->_redirect_after_action($success, $this->_question_model->item_name($success), 'trashed', $query_args);
    }


    /**
     * @param bool $trash
     */
    protected function _trash_or_restore_questions($trash = true)
    {
        $this->_trash_or_restore_items($this->_question_model, $trash);
    }


    /**
     * Internally used to delete or restore items, using the request data. Meant to be
     * flexible between question or question groups
     *
     * @param EEM_Soft_Delete_Base $model
     * @param boolean              $trash whether to trash or restore
     */
    private function _trash_or_restore_items(EEM_Soft_Delete_Base $model, $trash = true)
    {

        do_action('AHEE_log', __FILE__, __FUNCTION__, '');

        $success = 1;
        //Checkboxes
        //echo "trash $trash";
        //var_dump($this->_req_data['checkbox']);die;
        if (isset($this->_req_data['checkbox'])) {
            if (! empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
                // if array has more than one element than success message should be plural
                $success = count($this->_req_data['checkbox']) > 1 ? 2 : 1;
                // cycle thru bulk action checkboxes
                while (list($ID, $value) = each($this->_req_data['checkbox'])) {
                    if (! $model->delete_or_restore_by_ID($trash, absint($ID))) {
                        $success = 0;
                    }
                }

            } else {
                // grab single id and delete
                $ID = absint($this->_req_data['checkbox']);
                if (! $model->delete_or_restore_by_ID($trash, $ID)) {
                    $success = 0;
                }
            }

        } else {
            // delete via trash link
            // grab single id and delete
            $ID = absint($this->_req_data[$model->primary_key_name()]);
            if (! $model->delete_or_restore_by_ID($trash, $ID)) {
                $success = 0;
            }

        }


        $action = $model instanceof EEM_Question ? 'default' : 'question_groups';//strtolower( $model->item_name(2) );
        //echo "action :$action";
        //$action = 'questions' ? 'default' : $action;
        if ($trash) {
            $action_desc = 'trashed';
            $status      = 'trash';
        } else {
            $action_desc = 'restored';
            $status      = 'all';
        }
        $this->_redirect_after_action($success, $model->item_name($success), $action_desc,
            array('action' => $action, 'status' => $status));
    }


    /**
     * @param            $per_page
     * @param int        $current_page
     * @param bool|false $count
     * @return \EE_Soft_Delete_Base_Class[]|int
     */
    public function get_trashed_questions($per_page, $current_page = 1, $count = false)
    {
        $query_params = $this->get_query_params(EEM_Question::instance(), $per_page, $current_page);

        if ($count) {
            //note: this a subclass of EEM_Soft_Delete_Base, so this is actually only getting non-trashed items
            $where   = isset($query_params[0]) ? array($query_params[0]) : array();
            $results = $this->_question_model->count_deleted($where);
        } else {
            //note: this a subclass of EEM_Soft_Delete_Base, so this is actually only getting non-trashed items
            $results = $this->_question_model->get_all_deleted($query_params);
        }
        return $results;
    }


    /**
     * @param            $per_page
     * @param int        $current_page
     * @param bool|false $count
     * @return \EE_Soft_Delete_Base_Class[]
     */
    public function get_question_groups($per_page, $current_page = 1, $count = false)
    {
        $questionGroupModel = EEM_Question_Group::instance();
        $query_params       = $this->get_query_params($questionGroupModel, $per_page, $current_page);
        if ($count) {
            $where   = isset($query_params[0]) ? array($query_params[0]) : array();
            $results = $questionGroupModel->count($where);
        } else {
            $results = $questionGroupModel->get_all($query_params);
        }
        return $results;
    }


    /**
     * @param      $per_page
     * @param int  $current_page
     * @param bool $count
     * @return \EE_Soft_Delete_Base_Class[]|int
     */
    public function get_trashed_question_groups($per_page, $current_page = 1, $count = false)
    {
        $questionGroupModel = EEM_Question_Group::instance();
        $query_params       = $this->get_query_params($questionGroupModel, $per_page, $current_page);
        if ($count) {
            $where                 = isset($query_params[0]) ? array($query_params[0]) : array();
            $query_params['limit'] = null;
            $results               = $questionGroupModel->count_deleted($where);
        } else {
            $results = $questionGroupModel->get_all_deleted($query_params);
        }
        return $results;
    }


    /**
     * method for performing updates to question order
     *
     * @return array results array
     */
    public function update_question_group_order()
    {

        $success = esc_html__('Question group order was updated successfully.', 'event_espresso');

        // grab our row IDs
        $row_ids = isset($this->_req_data['row_ids']) && ! empty($this->_req_data['row_ids'])
            ? explode(',', rtrim($this->_req_data['row_ids'], ','))
            : array();

        $perpage = ! empty($this->_req_data['perpage'])
            ? (int)$this->_req_data['perpage']
            : null;
        $curpage = ! empty($this->_req_data['curpage'])
            ? (int)$this->_req_data['curpage']
            : null;

        if (! empty($row_ids)) {
            //figure out where we start the row_id count at for the current page.
            $qsgcount = empty($curpage) ? 0 : ($curpage - 1) * $perpage;

            $row_count = count($row_ids);
            for ($i = 0; $i < $row_count; $i++) {
                //Update the questions when re-ordering
                $updated = EEM_Question_Group::instance()->update(
                    array('QSG_order' => $qsgcount),
                    array(array('QSG_ID' => $row_ids[$i]))
                );
                if ($updated === false) {
                    $success = false;
                }
                $qsgcount++;
            }
        } else {
            $success = false;
        }

        $errors = ! $success
            ? esc_html__('An error occurred. The question group order was not updated.', 'event_espresso')
            : false;

        echo wp_json_encode(array('return_data' => false, 'success' => $success, 'errors' => $errors));
        die();

    }



    /***************************************        REGISTRATION SETTINGS        ***************************************/


    /**
     * _reg_form_settings
     *
     * @throws \EE_Error
     */
    protected function _reg_form_settings()
    {
        $this->_template_args['values'] = $this->_yes_no_values;
        add_action(
            'AHEE__Extend_Registration_Form_Admin_Page___reg_form_settings_template',
            array($this, 'email_validation_settings_form'),
            2
        );
        $this->_template_args = (array)apply_filters(
            'FHEE__Extend_Registration_Form_Admin_Page___reg_form_settings___template_args',
            $this->_template_args
        );
        $this->_set_add_edit_form_tags('update_reg_form_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            REGISTRATION_FORM_CAF_TEMPLATE_PATH . 'reg_form_settings.template.php',
            $this->_template_args,
            true
        );
        $this->display_admin_page_with_sidebar();
    }


    /**
     * _update_reg_form_settings
     */
    protected function _update_reg_form_settings()
    {
        EE_Registry::instance()->CFG->registration = $this->update_email_validation_settings_form(
            EE_Registry::instance()->CFG->registration
        );
        EE_Registry::instance()->CFG->registration = apply_filters(
            'FHEE__Extend_Registration_Form_Admin_Page___update_reg_form_settings__CFG_registration',
            EE_Registry::instance()->CFG->registration
        );
        $success                                   = $this->_update_espresso_configuration(
            esc_html__('Registration Form Options', 'event_espresso'),
            EE_Registry::instance()->CFG,
            __FILE__, __FUNCTION__, __LINE__
        );
        $this->_redirect_after_action($success, esc_html__('Registration Form Options', 'event_espresso'), 'updated',
            array('action' => 'view_reg_form_settings'));
    }


    /**
     * email_validation_settings_form
     *
     * @access    public
     * @return    void
     * @throws \EE_Error
     */
    public function email_validation_settings_form()
    {
        echo $this->_email_validation_settings_form()->get_html();
    }


    /**
     * _email_validation_settings_form
     *
     * @access protected
     * @return EE_Form_Section_Proper
     * @throws \EE_Error
     */
    protected function _email_validation_settings_form()
    {
        return new EE_Form_Section_Proper(
            array(
                'name'            => 'email_validation_settings',
                'html_id'         => 'email_validation_settings',
                'layout_strategy' => new EE_Admin_Two_Column_Layout(),
                'subsections'     => array(
                    'email_validation_hdr'   => new EE_Form_Section_HTML(
                        EEH_HTML::h2(esc_html__('Email Validation Settings', 'event_espresso'))
                    ),
                    'email_validation_level' => new EE_Select_Input(
                        array(
                            'basic'      => esc_html__('Basic', 'event_espresso'),
                            'wp_default' => esc_html__('WordPress Default', 'event_espresso'),
                            'i18n'       => esc_html__('International', 'event_espresso'),
                            'i18n_dns'   => esc_html__('International + DNS Check', 'event_espresso'),
                        ),
                        array(
                            'html_label_text' => esc_html__('Email Validation Level', 'event_espresso')
                                                 . EEH_Template::get_help_tab_link('email_validation_info'),
                            'html_help_text'  => esc_html__('These levels range from basic validation ( ie: text@text.text ) to more advanced checks against international email addresses (ie: üñîçøðé@example.com ) with additional MX and A record checks to confirm the domain actually exists. More information on on each level can be found within the help section.',
                                'event_espresso'),
                            'default'         => isset(EE_Registry::instance()->CFG->registration->email_validation_level)
                                ? EE_Registry::instance()->CFG->registration->email_validation_level
                                : 'wp_default',
                            'required'        => false,
                        )
                    ),
                ),
            )
        );
    }


    /**
     * update_email_validation_settings_form
     *
     * @access    public
     * @param \EE_Registration_Config $EE_Registration_Config
     * @return \EE_Registration_Config
     */
    public function update_email_validation_settings_form(EE_Registration_Config $EE_Registration_Config)
    {
        $prev_email_validation_level = $EE_Registration_Config->email_validation_level;
        try {
            $email_validation_settings_form = $this->_email_validation_settings_form();
            // if not displaying a form, then check for form submission
            if ($email_validation_settings_form->was_submitted()) {
                // capture form data
                $email_validation_settings_form->receive_form_submission();
                // validate form data
                if ($email_validation_settings_form->is_valid()) {
                    // grab validated data from form
                    $valid_data = $email_validation_settings_form->valid_data();
                    if (isset($valid_data['email_validation_level'])) {
                        $email_validation_level = $valid_data['email_validation_level'];
                        // now if they want to use international email addresses
                        if ($email_validation_level === 'i18n' || $email_validation_level === 'i18n_dns') {
                            // in case we need to reset their email validation level,
                            // make sure that the previous value wasn't already set to one of the i18n options.
                            if ($prev_email_validation_level === 'i18n' || $prev_email_validation_level === 'i18n_dns') {
                                // if so, then reset it back to "basic" since that is the only other option that,
                                // despite offering poor validation, supports i18n email addresses
                                $prev_email_validation_level = 'basic';
                            }
                            // confirm our i18n email validation will work on the server
                            if (! $this->_verify_pcre_support($EE_Registration_Config, $email_validation_level)) {
                                // or reset email validation level to previous value
                                $email_validation_level = $prev_email_validation_level;
                            }
                        }
                        $EE_Registration_Config->email_validation_level = $email_validation_level;
                    } else {
                        EE_Error::add_error(
                            esc_html__(
                                'Invalid or missing Email Validation settings. Please refresh the form and try again.',
                                'event_espresso'
                            ),
                            __FILE__, __FUNCTION__, __LINE__
                        );
                    }
                } else {
                    if ($email_validation_settings_form->submission_error_message() !== '') {
                        EE_Error::add_error(
                            $email_validation_settings_form->submission_error_message(),
                            __FILE__, __FUNCTION__, __LINE__
                        );
                    }
                }
            }
        } catch (EE_Error $e) {
            $e->get_error();
        }
        return $EE_Registration_Config;
    }


    /**
     * confirms that the server's PHP version has the PCRE module enabled,
     * and that the PCRE version works with our i18n email validation
     *
     * @param \EE_Registration_Config $EE_Registration_Config
     * @param string                  $email_validation_level
     * @return bool
     */
    private function _verify_pcre_support(EE_Registration_Config $EE_Registration_Config, $email_validation_level)
    {
        // first check that PCRE is enabled
        if (! defined('PREG_BAD_UTF8_ERROR')) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        'We\'re sorry, but it appears that your server\'s version of PHP was not compiled with PCRE unicode support.%1$sPlease contact your hosting company and ask them whether the PCRE compiled with your version of PHP on your server can be been built with the "--enable-unicode-properties" and "--enable-utf8" configuration switches to enable more complex regex expressions.%1$sIf they are unable, or unwilling to do so, then your server will not support international email addresses using UTF-8 unicode characters. This means you will either have to lower your email validation level to "Basic" or "WordPress Default", or switch to a hosting company that has/can enable PCRE unicode support on the server.',
                        'event_espresso'
                    ),
                    '<br />'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        } else {
            // PCRE support is enabled, but let's still
            // perform a test to see if the server will support it.
            // but first, save the updated validation level to the config,
            // so that the validation strategy picks it up.
            // this will get bumped back down if it doesn't work
            $EE_Registration_Config->email_validation_level = $email_validation_level;
            try {
                $email_validator    = new EE_Email_Validation_Strategy();
                $i18n_email_address = apply_filters(
                    'FHEE__Extend_Registration_Form_Admin_Page__update_email_validation_settings_form__i18n_email_address',
                    'jägerjürgen@deutschland.com'
                );
                $email_validator->validate($i18n_email_address);
            } catch (Exception $e) {
                EE_Error::add_error(
                    sprintf(
                        esc_html__(
                            'We\'re sorry, but it appears that your server\'s configuration will not support the "International" or "International + DNS Check" email validation levels.%1$sTo correct this issue, please consult with your hosting company regarding your server\'s PCRE settings.%1$sIt is recommended that your PHP version be configured to use PCRE 8.10 or newer.%1$sMore information regarding PCRE versions and installation can be found here: %2$s',
                            'event_espresso'
                        ),
                        '<br />',
                        '<a href="http://php.net/manual/en/pcre.installation.php" target="_blank">http://php.net/manual/en/pcre.installation.php</a>'
                    ),
                    __FILE__, __FUNCTION__, __LINE__
                );
                return false;
            }
        }
        return true;
    }


}
