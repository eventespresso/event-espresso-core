<?php
require_once(EE_MODELS . 'fields/EE_Enum_Text_Field.php');

class EE_WP_Post_Status_Field extends EE_Enum_Text_Field
{

    protected $_wp_post_stati;


    /**
     * constructor
     *
     * @param string  $table_column       column on table
     * @param string  $nicename           nice name for column(field)
     * @param bool    $nullable           is this field nullable
     * @param string  $default_value      default status
     * @param array   $new_stati          If additional stati are to be used other than the default WP statuses then
     *                                    they can be registered via this property.  The format of the array should be
     *                                    as follows: array(
     *                                    'status_reference' => array(
     *                                    'label' => __('Status Reference Label', 'event_espresso')
     *                                    'public' => true, //'Whether posts of this status should be shown on the
     *                                    frontend of the site'
     *                                    'exclude_from_search' => false, //'Whether posts of this status should be
     *                                    excluded from wp searches'
     *                                    'show_in_admin_all_list' => true, //whether posts of this status are included
     *                                    in queries for the admin "all" view in list table views.
     *                                    'show_in_admin_status_list' => true, //Show in the list of statuses with post
     *                                    counts at the top of the admin list tables (i.e. Status Reference(2) )
     *                                    'label_count' => _n_noop( 'Status Reference <span class="count">(%s)</span>',
     *                                    'Status References <span class="count">(%s)</span>' ), //the text to display
     *                                    on the admin screen( or you won't see your status count ).
     *                                    )
     *                                    )
     * @link http://codex.wordpress.org/Function_Reference/register_post_status for more info
     * @param boolean $store_in_db_as_int By default, enums are stored as STRINGS in the DB. However, if this var is
     *                                    set to true, it will be stored as an INT
     */
    function __construct($table_column, $nicename, $nullable, $default_value, $new_stati = array())
    {
        $this->_register_new_stati($new_stati);
        $this->_set_allowed_enum_values();
        parent::__construct($table_column, $nicename, $nullable, $default_value, $this->_allowed_enum_values);
    }


    /**
     * This registers any new statuses sent via the $new_stati array on construct
     *
     * @access protected
     * @param  array $new_stati statuses
     * @return void
     */
    protected function _register_new_stati($new_stati)
    {

        foreach ((array)$new_stati as $status_key => $status_args) {
            $args = array(
                'label'                     => isset($status_args['label']) ? $status_args['label'] : $status_key,
                'public'                    => isset($status_args['public']) && is_bool($status_args['public']) ? $status_args['public'] : true,
                'exclude_from_search'       => isset($status_args['exclude_from_search']) && is_bool($status_args['exclude_from_search']) ? $status_args['exclude_from_search'] : false,
                'show_in_admin_all_list'    => isset($status_args['show_in_admin_all_list']) && is_bool($status_args['show_in_admin_all_list']) ? $status_args['show_in_admin_all_list'] : false,
                'show_in_admin_status_list' => isset($status_args['show_in_admin_status_list']) && is_bool($status_args['show_in_admin_status_list']) ? $status_args['show_in_admin_status_list'] : true,
                'label_count'               => isset($status_args['label_count']) ? $status_args['label_count'] : '',
            );
            register_post_status($status_key, $status_args);
        }

    }


    /**
     * This sets the _allowed_enum_values property using the $wp_post_stati array
     *
     * @access protected
     * @regurn void
     */
    protected function _set_allowed_enum_values()
    {
        //first let's get the post_statuses
        global $wp_post_statuses;
        $this->_wp_post_stati = $wp_post_statuses;

        foreach ($this->_wp_post_stati as $post_status => $args_object) {
            $this->_allowed_enum_values[$post_status] = $args_object->label;
        }

    }

    /**
     * Before calling parent, first double-checks our list of acceptable post
     * types is up-to-date
     *
     * @param string $value_inputted_for_field_on_model_object
     * @return string
     */
    public function prepare_for_set($value_inputted_for_field_on_model_object)
    {
        $this->_set_allowed_enum_values();
        return parent::prepare_for_set($value_inputted_for_field_on_model_object);
    }



    //helper methods for getting various $wp_post_statuses stuff.

    /**
     * This just returns the status object for the given status
     *
     * @access public
     * @see    wp_register_post_status in wp-includes/post.php for a list of properties of the status object
     * @param  string $status What status object you want
     * @return std_object         the status object or FALSE if it doesn't exist.
     */
    public function get_status_object($status)
    {
        return isset($this->_wp_post_stati[$status]) ? $this->_wp_post_stati[$status] : false;
    }
}