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
 *                  Registration_Form_Admin_Page
 *                  This contains the logic for setting up the Custom Forms related pages.  Any methods without phpdoc
 *                  comments have inline docs with parent class. NOTE:  TODO: This is a straight conversion from the
 *                  legacy 3.1 questions and question groups related pages.  It is NOT optimized and will need
 *                  modification to fully use the new system (and also will need adjusted when Questions and Questions
 *                  groups model is implemented)
 * @package         Registration_Form_Admin_Page
 * @subpackage      includes/core/admin/Registration_Form_Admin_Page.core.php
 * @author          Darren Ethier
 *                  ------------------------------------------------------------------------
 */
class Registration_Form_Admin_Page extends EE_Admin_Page
{

    /**
     * _question
     * holds the specific question object for the question details screen
     *
     * @var EE_Question $_question
     */
    protected $_question;

    /**
     * _question_group
     * holds the specific question group object for the question group details screen
     *
     * @var EE_Question_Group $_question_group
     */
    protected $_question_group;

    /**
     *_question_model EEM_Question model instance (for queries)
     *
     * @var EEM_Question $_question_model ;
     */
    protected $_question_model;

    /**
     * _question_group_model EEM_Question_group instance (for queries)
     *
     * @var EEM_Question_Group $_question_group_model
     */
    protected $_question_group_model;


    /**
     * @Constructor
     * @param bool $routing indicate whether we want to just load the object and handle routing or just load the object.
     * @access public
     */
    public function __construct($routing = true)
    {
        require_once(EE_MODELS . 'EEM_Question.model.php');
        require_once(EE_MODELS . 'EEM_Question_Group.model.php');
        $this->_question_model       = EEM_Question::instance();
        $this->_question_group_model = EEM_Question_Group::instance();
        parent::__construct($routing);
    }


    protected function _init_page_props()
    {
        $this->page_slug        = REGISTRATION_FORM_PG_SLUG;
        $this->page_label       = esc_html__('Registration Form', 'event_espresso');
        $this->_admin_base_url  = REGISTRATION_FORM_ADMIN_URL;
        $this->_admin_base_path = REGISTRATION_FORM_ADMIN;
    }


    protected function _ajax_hooks()
    {
    }


    protected function _define_page_props()
    {
        $this->_admin_page_title = esc_html__('Registration Form', 'event_espresso');
        $this->_labels           = array(
            'buttons' => array(
                'edit_question' => esc_html__('Edit Question', 'event_espresso'),
            ),
        );
    }


    /**
     *_set_page_routes
     */
    protected function _set_page_routes()
    {
        $qst_id             = ! empty($this->_req_data['QST_ID']) ? $this->_req_data['QST_ID'] : 0;
        $this->_page_routes = array(
            'default' => array(
                'func'       => '_questions_overview_list_table',
                'capability' => 'ee_read_questions',
            ),

            'edit_question' => array(
                'func'       => '_edit_question',
                'capability' => 'ee_edit_question',
                'obj_id'     => $qst_id,
                'args'       => array('edit'),
            ),

            'question_groups' => array(
                'func'       => '_questions_groups_preview',
                'capability' => 'ee_read_question_groups',
            ),

            'update_question' => array(
                'func'       => '_insert_or_update_question',
                'args'       => array('new_question' => false),
                'capability' => 'ee_edit_question',
                'obj_id'     => $qst_id,
                'noheader'   => true,
            ),
        );
    }


    protected function _set_page_config()
    {
        $this->_page_config = array(
            'default' => array(
                'nav'           => array(
                    'label' => esc_html__('Questions', 'event_espresso'),
                    'order' => 10,
                ),
                'list_table'    => 'Registration_Form_Questions_Admin_List_Table',
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'help_tabs'     => array(
                    'registration_form_questions_overview_help_tab'                           => array(
                        'title'    => esc_html__('Questions Overview', 'event_espresso'),
                        'filename' => 'registration_form_questions_overview',
                    ),
                    'registration_form_questions_overview_table_column_headings_help_tab'     => array(
                        'title'    => esc_html__('Questions Overview Table Column Headings', 'event_espresso'),
                        'filename' => 'registration_form_questions_overview_table_column_headings',
                    ),
                    'registration_form_questions_overview_views_bulk_actions_search_help_tab' => array(
                        'title'    => esc_html__('Question Overview Views & Bulk Actions & Search', 'event_espresso'),
                        'filename' => 'registration_form_questions_overview_views_bulk_actions_search',
                    ),
                ),
                'help_tour'     => array('Registration_Form_Questions_Overview_Help_Tour'),
                'require_nonce' => false,
                'qtips'         => array(
                    'EE_Registration_Form_Tips',
                )/**/
            ),

            'question_groups' => array(
                'nav'           => array(
                    'label' => esc_html__('Question Groups', 'event_espresso'),
                    'order' => 20,
                ),
                'metaboxes'     => $this->_default_espresso_metaboxes,
                'help_tabs'     => array(
                    'registration_form_question_groups_help_tab' => array(
                        'title'    => esc_html__('Question Groups', 'event_espresso'),
                        'filename' => 'registration_form_question_groups',
                    ),
                ),
                'help_tour'     => array('Registration_Form_Question_Groups_Help_Tour'),
                'require_nonce' => false,
            ),

            'edit_question' => array(
                'nav'           => array(
                    'label'      => esc_html__('Edit Question', 'event_espresso'),
                    'order'      => 15,
                    'persistent' => false,
                    'url'        => isset($this->_req_data['question_id']) ? add_query_arg(array('question_id' => $this->_req_data['question_id']),
                        $this->_current_page_view_url) : $this->_admin_base_url,
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                'help_tabs'     => array(
                    'registration_form_edit_question_group_help_tab' => array(
                        'title'    => esc_html__('Edit Question', 'event_espresso'),
                        'filename' => 'registration_form_edit_question',
                    ),
                ),
                'help_tour'     => array('Registration_Form_Edit_Question_Help_Tour'),
                'require_nonce' => false,
            ),
        );
    }


    protected function _add_screen_options()
    {
        //todo
    }

    protected function _add_screen_options_default()
    {
        $page_title              = $this->_admin_page_title;
        $this->_admin_page_title = esc_html__('Questions', 'event_espresso');
        $this->_per_page_screen_option();
        $this->_admin_page_title = $page_title;
    }

    protected function _add_screen_options_question_groups()
    {
        $page_title              = $this->_admin_page_title;
        $this->_admin_page_title = esc_html__('Question Groups', 'event_espresso');
        $this->_per_page_screen_option();
        $this->_admin_page_title = $page_title;
    }

    //none of the below group are currently used for Event Categories
    protected function _add_feature_pointers()
    {
    }

    public function load_scripts_styles()
    {
        wp_register_style('espresso_registration',
            REGISTRATION_FORM_ASSETS_URL . 'espresso_registration_form_admin.css', array(), EVENT_ESPRESSO_VERSION);
        wp_enqueue_style('espresso_registration');
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


    public function load_scripts_styles_default()
    {
    }


    public function load_scripts_styles_add_question()
    {
        $this->load_scripts_styles_forms();
        wp_register_script('espresso_registration_form_single',
            REGISTRATION_FORM_ASSETS_URL . 'espresso_registration_form_admin.js', array('jquery-ui-sortable'),
            EVENT_ESPRESSO_VERSION, true);
        wp_enqueue_script('espresso_registration_form_single');
    }

    public function load_scripts_styles_edit_question()
    {
        $this->load_scripts_styles_forms();
        wp_register_script('espresso_registration_form_single',
            REGISTRATION_FORM_ASSETS_URL . 'espresso_registration_form_admin.js', array('jquery-ui-sortable'),
            EVENT_ESPRESSO_VERSION, true);
        wp_enqueue_script('espresso_registration_form_single');
    }


    public function recaptcha_info_help_tab()
    {
        $template = REGISTRATION_FORM_TEMPLATE_PATH . 'recaptcha_info_help_tab.template.php';
        EEH_Template::display_template($template, array());
    }


    public function load_scripts_styles_forms()
    {
        //styles
        wp_enqueue_style('espresso-ui-theme');
        //scripts
        wp_enqueue_script('ee_admin_js');
    }


    protected function _set_list_table_views_default()
    {
        $this->_views = array(
            'all' => array(
                'slug'  => 'all',
                'label' => esc_html__('View All Questions', 'event_espresso'),
                'count' => 0,
//				'bulk_action' => array(
//					'trash_questions' => esc_html__('Trash', 'event_espresso'),
//					)
            ),
        );

        if (EE_Registry::instance()->CAP->current_user_can('ee_delete_questions',
            'espresso_registration_form_trash_questions')
        ) {
            $this->_views['trash'] = array(
                'slug'  => 'trash',
                'label' => esc_html__('Trash', 'event_espresso'),
                'count' => 0,
//				'bulk_action' => array(
//					'delete_questions' => esc_html__('Delete Permanently', 'event_espresso'),
//					'restore_questions' => esc_html__('Restore', 'event_espresso'),
            );
        }
    }

    /**
     * This just previews the question groups tab that comes in caffeinated.
     *
     * @return string html
     */
    protected function _questions_groups_preview()
    {
        $this->_admin_page_title              = esc_html__('Question Groups (Preview)', 'event_espresso');
        $this->_template_args['preview_img']  = '<img src="' . REGISTRATION_FORM_ASSETS_URL . 'caf_reg_form_preview.jpg" alt="' . esc_attr__('Preview Question Groups Overview List Table screenshot',
                'event_espresso') . '" />';
        $this->_template_args['preview_text'] = '<strong>' . esc_html__('Question Groups is a feature that is only available in the premium version of Event Espresso 4 which is available with a support license purchase on EventEspresso.com. With the Question Groups feature you are able to create new question groups, edit existing question groups, and create and edit new questions and add them to question groups.',
                'event_espresso') . '</strong>';
        $this->display_admin_caf_preview_page('question_groups_tab');
    }


    /**
     * Extracts the question field's values from the POST request to update or insert them
     *
     * @param \EEM_Base $model
     * @return array where each key is the name of a model's field/db column, and each value is its value.
     */
    protected function _set_column_values_for(EEM_Base $model)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $set_column_values = array();

        //some initial checks for proper values.
        //if QST_admin_only, then no matter what QST_required is we disable.
        if (! empty($this->_req_data['QST_admin_only'])) {
            $this->_req_data['QST_required'] = 0;
        }
        foreach ($model->field_settings() as $fieldName => $settings) {
            // basically if QSG_identifier is empty or not set
            if ($fieldName === 'QSG_identifier' && (isset($this->_req_data['QSG_identifier']) && empty($this->_req_data['QSG_identifier']))) {
                $QSG_name                      = isset($this->_req_data['QSG_name']) ? $this->_req_data['QSG_name'] : '';
                $set_column_values[$fieldName] = sanitize_title($QSG_name) . '-' . uniqid('', true);
//				dd($set_column_values);
            } //if the admin label is blank, use a slug version of the question text
            else if ($fieldName === 'QST_admin_label' && (isset($this->_req_data['QST_admin_label']) && empty($this->_req_data['QST_admin_label']))) {
                $QST_text                      = isset($this->_req_data['QST_display_text']) ? $this->_req_data['QST_display_text'] : '';
                $set_column_values[$fieldName] = sanitize_title(wp_trim_words($QST_text, 10));
            } else if ($fieldName === 'QST_admin_only' && (! isset($this->_req_data['QST_admin_only']))) {
                $set_column_values[$fieldName] = 0;
            } else if ($fieldName === 'QST_max') {
                $qst_system = EEM_Question::instance()->get_var(
                    array(
                        array(
                            'QST_ID' => isset($this->_req_data['QST_ID']) ? $this->_req_data['QST_ID'] : 0,
                        ),
                    ),
                    'QST_system');
                $max_max    = EEM_Question::instance()->absolute_max_for_system_question($qst_system);
                if (empty($this->_req_data['QST_max']) ||
                    $this->_req_data['QST_max'] > $max_max
                ) {
                    $set_column_values[$fieldName] = $max_max;
                }
            }


            //only add a property to the array if it's not null (otherwise the model should just use the default value)
            if (
                ! isset($set_column_values[$fieldName]) &&
                isset($this->_req_data[$fieldName])
            ) {
                $set_column_values[$fieldName] = $this->_req_data[$fieldName];
            }

        }
        return $set_column_values;//validation fo this data to be performed by the model before insertion.
    }


    /**
     *_questions_overview_list_table
     */
    protected function _questions_overview_list_table()
    {
        $this->_search_btn_label = esc_html__('Questions', 'event_espresso');
        $this->display_admin_list_table_page_with_sidebar();
    }


    /**
     * _edit_question
     */
    protected function _edit_question()
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $ID = isset($this->_req_data['QST_ID']) && ! empty($this->_req_data['QST_ID']) ? absint($this->_req_data['QST_ID']) : false;

        switch ($this->_req_action) {
            case 'add_question' :
                $this->_admin_page_title = esc_html__('Add Question', 'event_espresso');
                break;
            case 'edit_question' :
                $this->_admin_page_title = esc_html__('Edit Question', 'event_espresso');
                break;
            default :
                $this->_admin_page_title = ucwords(str_replace('_', ' ', $this->_req_action));
        }

        // add PRC_ID to title if editing
        $this->_admin_page_title = $ID ? $this->_admin_page_title . ' # ' . $ID : $this->_admin_page_title;
        if ($ID) {
            $question                 = $this->_question_model->get_one_by_ID($ID);
            $additional_hidden_fields = array('QST_ID' => array('type' => 'hidden', 'value' => $ID));
            $this->_set_add_edit_form_tags('update_question', $additional_hidden_fields);
        } else {
            $question = EE_Question::new_instance();
            $question->set_order_to_latest();
            $this->_set_add_edit_form_tags('insert_question');
        }
        if( $question->system_ID() === EEM_Attendee::system_question_phone ){
            $question_types = array_intersect_key(
                EEM_Question::instance()->allowed_question_types(),
                array_flip(
                    array(
                        EEM_Question::QST_type_text,
                        EEM_Question::QST_type_us_phone
                    )
                )
            );
        } else {
            $question_types = $question->has_answers() ? $this->_question_model->question_types_in_same_category($question->type()) : $this->_question_model->allowed_question_types();
        }
        $this->_template_args['QST_ID']                     = $ID;
        $this->_template_args['question']                   = $question;
        $this->_template_args['question_types']             = $question_types;
        $this->_template_args['max_max']                    = EEM_Question::instance()->absolute_max_for_system_question(
            $question->system_ID()
        );
        $this->_template_args['question_type_descriptions'] = $this->_get_question_type_descriptions();
        $this->_set_publish_post_box_vars('id', $ID);
        $this->_template_args['admin_page_content'] = EEH_Template::display_template(
            REGISTRATION_FORM_TEMPLATE_PATH . 'questions_main_meta_box.template.php',
            $this->_template_args, true
        );

        // the details template wrapper
        $this->display_admin_page_with_sidebar();
    }


    /**
     * @return string
     */
    protected function _get_question_type_descriptions()
    {
        EE_Registry::instance()->load_helper('HTML');
        $descriptions               = '';
        $question_type_descriptions = EEM_Question::instance()->question_descriptions();
        foreach ($question_type_descriptions as $type => $question_type_description) {
            if ($type == 'HTML_TEXTAREA') {
                $html = new EE_Simple_HTML_Validation_Strategy();
                $question_type_description .= sprintf(
                    esc_html__('%1$s(allowed tags: %2$s)', 'event_espresso'),
                    '<br/>',
                    $html->get_list_of_allowed_tags()
                );
            }
            $descriptions .= EEH_HTML::p(
                $question_type_description,
                'question_type_description-' . $type,
                'question_type_description description',
                'display:none;'
            );
        }
        return $descriptions;
    }


    /**
     * @param bool|true $new_question
     * @throws \EE_Error
     */
    protected function _insert_or_update_question($new_question = true)
    {
        do_action('AHEE_log', __FILE__, __FUNCTION__, '');
        $set_column_values = $this->_set_column_values_for($this->_question_model);
        if ($new_question) {
            $ID          = $this->_question_model->insert($set_column_values);
            $success     = $ID ? true : false;
            $action_desc = 'added';
        } else {
            $ID     = absint($this->_req_data['QST_ID']);
            $pk     = $this->_question_model->primary_key_name();
            $wheres = array($pk => $ID);
            unset($set_column_values[$pk]);
            $success     = $this->_question_model->update($set_column_values, array($wheres));
            $action_desc = 'updated';
        }

        if ($ID) {
            //save the related options
            //trash removed options, save old ones
            //get list of all options
            /** @type EE_Question $question */
            $question = $this->_question_model->get_one_by_ID($ID);
            $options  = $question->options();
            if (! empty($options)) {
                foreach ($options as $option_ID => $option) {
                    $option_req_index = $this->_get_option_req_data_index($option_ID);
                    if ($option_req_index !== false) {
                        $option->save($this->_req_data['question_options'][$option_req_index]);
                    } else {
                        //not found, remove it
                        $option->delete();
                    }
                }
            }
            //save new related options
            foreach ($this->_req_data['question_options'] as $index => $option_req_data) {
                //skip $index that is from our sample
                if ( $index === 'xxcountxx' ) {
                    continue;
                }
                //note we allow saving blank options.
                if (empty($option_req_data['QSO_ID'])
                ) {//no ID! save it!
                    $new_option = EE_Question_Option::new_instance(array(
                        'QSO_value' => $option_req_data['QSO_value'],
                        'QSO_desc'  => $option_req_data['QSO_desc'],
                        'QSO_order' => $option_req_data['QSO_order'],
                        'QST_ID'    => $question->ID(),
                    ));
                    $new_option->save();
                }
            }
        }
        $query_args = array('action' => 'edit_question', 'QST_ID' => $ID);
        if ($success !== false) {
            $msg = $new_question ? sprintf(esc_html__('The %s has been created', 'event_espresso'),
                $this->_question_model->item_name()) : sprintf(esc_html__('The %s has been updated', 'event_espresso'),
                $this->_question_model->item_name());
            EE_Error::add_success($msg);
        }

        $this->_redirect_after_action(false, '', $action_desc, $query_args, true);
    }


    /**
     * Upon saving a question, there should be an array of 'question_options'. This array is index numerically, but not
     * by ID
     * (this is done because new question options don't have an ID, but we may want to add multiple simultaneously).
     * So, this function gets the index in that request data array called question_options. Returns FALSE if not found.
     *
     * @param int $ID of the question option to find
     * @return int index in question_options array if successful, FALSE if unsuccessful
     */
    protected function _get_option_req_data_index($ID)
    {
        $req_data_for_question_options = $this->_req_data['question_options'];
        foreach ($req_data_for_question_options as $num => $option_data) {
            if (array_key_exists('QSO_ID', $option_data) && (int)$option_data['QSO_ID'] === $ID) {
                return $num;
            }
        }
        return false;
    }




    /***********/
    /* QUERIES */
    /**
     * For internal use in getting all the query parameters
     * (because it's pretty well the same between question, question groups,
     * and for both when searching for trashed and untrashed ones)
     *
     * @param EEM_Base $model either EEM_Question or EEM_Question_Group
     * @param int      $per_page
     * @param int      $current_page
     * @return array lik EEM_Base::get_all's $query_params parameter
     */
    protected function get_query_params($model, $per_page = 10, $current_page = 10)
    {
        $query_params             = array();
        $offset                   = ($current_page - 1) * $per_page;
        $query_params['limit']    = array($offset, $per_page);
        $order                    = (isset($this->_req_data['order']) && ! empty($this->_req_data['order'])) ? $this->_req_data['order'] : 'ASC';
        $orderby_field            = $model instanceof EEM_Question ? 'QST_ID' : 'QSG_order';
        $field_to_order_by        = empty($this->_req_data['orderby']) ? $orderby_field : $this->_req_data['orderby'];
        $query_params['order_by'] = array($field_to_order_by => $order);
        $search_string            = array_key_exists('s', $this->_req_data) ? $this->_req_data['s'] : null;
        if (! empty($search_string)) {
            if ($model instanceof EEM_Question_Group) {
                $query_params[0] = array(
                    'OR' => array(
                        'QSG_name' => array('LIKE', "%$search_string%"),
                        'QSG_desc' => array('LIKE', "%$search_string%"),
                    ),
                );
            } else {
                $query_params[0] = array(
                    'QST_display_text' => array('LIKE', "%$search_string%"),
                );
            }
        }

        //capability checks (just leaving this commented out for reference because it illustrates some complicated query params that could be useful when fully implemented)
        /*if ( $model instanceof EEM_Question_Group ) {
            if ( ! EE_Registry::instance()->CAP->current_user_can( 'edit_others_question_groups', 'espresso_registration_form_edit_question_group' ) ) {
                $query_params[0] = array(
                    'AND' => array(
                        'OR' => array(
                            'QSG_system' => array( '>', 0 ),
                            'AND' => array(
                                'QSG_system' => array( '<', 1 ),
                                'QSG_wp_user' => get_current_user_id()
                                )
                            )
                        )
                    );
            }
        } else {
            if ( ! EE_Registry::instance()->CAP->current_user_can( 'edit_others_questions', 'espresso_registration_form_edit_question' ) ) {
                $query_params[0] = array(
                    'AND' => array(
                        'OR' => array(
                            'QST_system' => array( '!=', '' ),
                            'AND' => array(
                                'QST_system' => '',
                                'QST_wp_user' => get_current_user_id()
                                )
                            )
                        )
                    );
            }
        }/**/

        return $query_params;

    }


    /**
     * @param int        $per_page
     * @param int        $current_page
     * @param bool|false $count
     * @return \EE_Soft_Delete_Base_Class[]|int
     */
    public function get_questions($per_page = 10, $current_page = 1, $count = false)
    {
        $QST          = EEM_Question::instance();
        $query_params = $this->get_query_params($QST, $per_page, $current_page);
        if ($count) {
            $where   = isset($query_params[0]) ? array($query_params[0]) : array();
            $results = $QST->count($where);
        } else {
            $results = $QST->get_all($query_params);
        }
        return $results;

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
        $where        = isset($query_params[0]) ? array($query_params[0]) : array();
        $questions    = $count ? EEM_Question::instance()->count_deleted($where) : EEM_Question::instance()->get_all_deleted($query_params);
        return $questions;
    }


    /**
     * @param            $per_page
     * @param int        $current_page
     * @param bool|false $count
     * @return \EE_Soft_Delete_Base_Class[]
     */
    public function get_question_groups($per_page, $current_page = 1, $count = false)
    {
        /** @type EEM_Question_Group $questionGroupModel */
        $questionGroupModel = EEM_Question_Group::instance();
        //note: this a subclass of EEM_Soft_Delete_Base, so this is actually only getting non-trashed items
        return $questionGroupModel->get_all(
            $this->get_query_params($questionGroupModel, $per_page, $current_page)
        );
    }


} //ends Registration_Form_Admin_Page class
