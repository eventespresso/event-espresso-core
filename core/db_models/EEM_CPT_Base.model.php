<?php
define('EE_Event_Category_Taxonomy', 'espresso_event_category');



/**
 * EEM_CPT_Base
 * For shared functionality between models internally implemented
 * as Custom Post Types. Subclass of EEM_Soft_Delete_Base, meaning that when you 'delete' one of these model objects
 * we actually default ot just trashing it. (It works differently than EEM_Soft_Delete under the hood,because there's a
 * post status field instead of a soft-delete flag, but the functionality is the same) Note: if you add a new subclass
 * of EEM_CPT_Base, you should add it as a relation on EEM_Term_Taxonomy and EEM_Term_Relationship
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Mike Nelson
 */
abstract class EEM_CPT_Base extends EEM_Soft_Delete_Base
{

    /**
     * @var string post_status_publish - the wp post status for published cpts
     */
    const post_status_publish = 'publish';

    /**
     * @var string post_status_future - the wp post status for scheduled cpts
     */
    const post_status_future = 'future';

    /**
     * @var string post_status_draft - the wp post status for draft cpts
     */
    const post_status_draft = 'draft';

    /**
     * @var string post_status_pending - the wp post status for pending cpts
     */
    const post_status_pending = 'pending';

    /**
     * @var string post_status_private - the wp post status for private cpts
     */
    const post_status_private = 'private';

    /**
     * @var string post_status_trashed - the wp post status for trashed cpts
     */
    const post_status_trashed = 'trash';

    /**
     * This is an array of custom statuses for the given CPT model (modified by children)
     * format:
     * array(
     *        'status_name' => array(
     *            'label' => __('Status Name', 'event_espresso'),
     *            'public' => TRUE //whether a public status or not.
     *        )
     * )
     *
     * @var array
     */
    protected $_custom_stati = array();



    /**
     * Adds a relationship to Term_Taxonomy for each CPT_Base
     *
     * @param string $timezone
     * @throws \EE_Error
     */
    protected function __construct($timezone = null)
    {
        //adds a relationship to Term_Taxonomy for all these models. For this to work
        //Term_Relationship must have a relation to each model subclassing EE_CPT_Base explicitly
        //eg, in EEM_Term_Relationship, inside the _model_relations array, there must be an entry
        //with key equalling the subclassing model's model name (eg 'Event' or 'Venue'), and the value
        //must also be new EE_HABTM_Relation('Term_Relationship');
        $this->_model_relations['Term_Taxonomy'] = new EE_HABTM_Relation('Term_Relationship');
        $primary_table_name = null;
        //add  the common _status field to all CPT primary tables.
        foreach ($this->_tables as $alias => $table_obj) {
            if ($table_obj instanceof EE_Primary_Table) {
                $primary_table_name = $alias;
            }
        }
        //set default wp post statuses if child has not already set.
        if ( ! isset($this->_fields[$primary_table_name]['status'])) {
            $this->_fields[$primary_table_name]['status'] = new EE_WP_Post_Status_Field('post_status',
                __("Event Status", "event_espresso"), false, 'draft');
        }
        if ( ! isset($this->_fields[$primary_table_name]['to_ping'])) {
            $this->_fields[$primary_table_name]['to_ping'] = new EE_DB_Only_Text_Field('to_ping',
                __('To Ping', 'event_espresso'), false, '');
        }
        if ( ! isset($this->_fields[$primary_table_name]['pinged'])) {
            $this->_fields[$primary_table_name]['pinged'] = new EE_DB_Only_Text_Field('pinged',
                __('Pinged', 'event_espresso'), false, '');
        }
        if ( ! isset($this->_fields[$primary_table_name]['comment_status'])) {
            $this->_fields[$primary_table_name]['comment_status'] = new EE_Plain_Text_Field('comment_status',
                __('Comment Status', 'event_espresso'), false, 'open');
        }
        if ( ! isset($this->_fields[$primary_table_name]['ping_status'])) {
            $this->_fields[$primary_table_name]['ping_status'] = new EE_Plain_Text_Field('ping_status',
                __('Ping Status', 'event_espresso'), false, 'open');
        }
        if ( ! isset($this->_fields[$primary_table_name]['post_content_filtered'])) {
            $this->_fields[$primary_table_name]['post_content_filtered'] = new EE_DB_Only_Text_Field('post_content_filtered',
                __('Post Content Filtered', 'event_espresso'), false, '');
        }
        if ( ! isset($this->_model_relations['Post_Meta'])) {
            //don't block deletes though because we want to maintain the current behaviour
            $this->_model_relations['Post_Meta'] = new EE_Has_Many_Relation(false);
        }
        if ( ! $this->_minimum_where_conditions_strategy instanceof EE_Default_Where_Conditions) {
            //nothing was set during child constructor, so set default
            $this->_minimum_where_conditions_strategy = new EE_CPT_Minimum_Where_Conditions($this->post_type());
        }
        if ( ! $this->_default_where_conditions_strategy instanceof EE_Default_Where_Conditions) {
            //nothing was set during child constructor, so set default
            //it's ok for child classes to specify this, but generally this is more DRY
            $this->_default_where_conditions_strategy = new EE_CPT_Where_Conditions($this->post_type());
        }
        parent::__construct($timezone);
    }



    /**
     * @return array
     */
    public function public_event_stati()
    {
        // @see wp-includes/post.php
        return get_post_stati(array('public' => true));
    }



    /**
     * Searches for field on this model of type 'deleted_flag'. if it is found,
     * returns it's name. BUT That doesn't apply to CPTs. We should instead use post_status_field_name
     *
     * @return string
     * @throws EE_Error
     */
    public function deleted_field_name()
    {
        throw new EE_Error(sprintf(__("EEM_CPT_Base should nto call deleted_field_name! It should instead use post_status_field_name",
            "event_espresso")));
    }



    /**
     * Gets the field's name that sets the post status
     *
     * @return string
     * @throws EE_Error
     */
    public function post_status_field_name()
    {
        $field = $this->get_a_field_of_type('EE_WP_Post_Status_Field');
        if ($field) {
            return $field->get_name();
        } else {
            throw new EE_Error(sprintf(__('We are trying to find the post status flag field on %s, but none was found. Are you sure there is a field of type EE_Trashed_Flag_Field in %s constructor?',
                'event_espresso'), get_class($this), get_class($this)));
        }
    }



    /**
     * Alters the query params so that only trashed/soft-deleted items are considered
     *
     * @param array $query_params like EEM_Base::get_all's $query_params
     * @return array like EEM_Base::get_all's $query_params
     */
    protected function _alter_query_params_so_only_trashed_items_included($query_params)
    {
        $post_status_field_name = $this->post_status_field_name();
        $query_params[0][$post_status_field_name] = self::post_status_trashed;
        return $query_params;
    }



    /**
     * Alters the query params so each item's deleted status is ignored.
     *
     * @param array $query_params
     * @return array
     */
    protected function _alter_query_params_so_deleted_and_undeleted_items_included($query_params)
    {
        $query_params['default_where_conditions'] = 'minimum';
        return $query_params;
    }



    /**
     * Performs deletes or restores on items. Both soft-deleted and non-soft-deleted items considered.
     *
     * @param boolean $delete       true to indicate deletion, false to indicate restoration
     * @param array   $query_params like EEM_Base::get_all
     * @return boolean success
     */
    function delete_or_restore($delete = true, $query_params = array())
    {
        $post_status_field_name = $this->post_status_field_name();
        $query_params = $this->_alter_query_params_so_deleted_and_undeleted_items_included($query_params);
        $new_status = $delete ? self::post_status_trashed : 'draft';
        if ($this->update(array($post_status_field_name => $new_status), $query_params)) {
            return true;
        } else {
            return false;
        }
    }



    /**
     * meta_table
     * returns first EE_Secondary_Table table name
     *
     * @access public
     * @return string
     */
    public function meta_table()
    {
        $meta_table = $this->_get_other_tables();
        $meta_table = reset($meta_table);
        return $meta_table instanceof EE_Secondary_Table ? $meta_table->get_table_name() : null;
    }



    /**
     * This simply returns an array of the meta table fields (useful for when we just need to update those fields)
     *
     * @param  bool $all triggers whether we include DB_Only fields or JUST non DB_Only fields.  Defaults to false (no
     *                   db only fields)
     * @return array
     */
    public function get_meta_table_fields($all = false)
    {
        $all_fields = $fields_to_return = array();
        foreach ($this->_tables as $alias => $table_obj) {
            if ($table_obj instanceof EE_Secondary_Table) {
                $all_fields = array_merge($this->_get_fields_for_table($alias), $all_fields);
            }
        }
        if ( ! $all) {
            foreach ($all_fields as $name => $obj) {
                if ($obj instanceof EE_DB_Only_Field_Base) {
                    continue;
                }
                $fields_to_return[] = $name;
            }
        } else {
            $fields_to_return = array_keys($all_fields);
        }
        return $fields_to_return;
    }



    /**
     * Adds an event category with the specified name and description to the specified
     * $cpt_model_object. Intelligently adds a term if necessary, and adds a term_taxonomy if necessary,
     * and adds an entry in the term_relationship if necessary.
     *
     * @param EE_CPT_Base $cpt_model_object
     * @param string      $category_name (used to derive the term slug too)
     * @param string      $category_description
     * @param int         $parent_term_taxonomy_id
     * @return EE_Term_Taxonomy
     */
    function add_event_category(
        EE_CPT_Base $cpt_model_object,
        $category_name,
        $category_description = '',
        $parent_term_taxonomy_id = null
    ) {
        //create term
        require_once(EE_MODELS . 'EEM_Term.model.php');
        //first, check for a term by the same name or slug
        $category_slug = sanitize_title($category_name);
        $term = EEM_Term::instance()->get_one(array(
            array(
                'OR' => array(
                    'name' => $category_name,
                    'slug' => $category_slug,
                ),
            ),
        ));
        if ( ! $term) {
            $term = EE_Term::new_instance(array(
                'name' => $category_name,
                'slug' => $category_slug,
            ));
            $term->save();
        }
        //make sure there's a term-taxonomy entry too
        require_once(EE_MODELS . 'EEM_Term_Taxonomy.model.php');
        $term_taxonomy = EEM_Term_Taxonomy::instance()->get_one(array(
            array(
                'term_id'  => $term->ID(),
                'taxonomy' => EE_Event_Category_Taxonomy,
            ),
        ));
        /** @var $term_taxonomy EE_Term_Taxonomy */
        if ( ! $term_taxonomy) {
            $term_taxonomy = EE_Term_Taxonomy::new_instance(array(
                'term_id'     => $term->ID(),
                'taxonomy'    => EE_Event_Category_Taxonomy,
                'description' => $category_description,
                'count'       => 1,
                'parent'      => $parent_term_taxonomy_id,
            ));
            $term_taxonomy->save();
        } else {
            $term_taxonomy->set_count($term_taxonomy->count() + 1);
            $term_taxonomy->save();
        }
        return $this->add_relationship_to($cpt_model_object, $term_taxonomy, 'Term_Taxonomy');
    }



    /**
     * Removed the category specified by name as having a relation to this event.
     * Does not remove the term or term_taxonomy.
     *
     * @param EE_CPT_Base $cpt_model_object_event
     * @param string      $category_name name of the event category (term)
     * @return bool
     */
    function remove_event_category(EE_CPT_Base $cpt_model_object_event, $category_name)
    {
        //find the term_taxonomy by that name
        $term_taxonomy = $this->get_first_related($cpt_model_object_event, 'Term_Taxonomy',
            array(array('Term.name' => $category_name, 'taxonomy' => EE_Event_Category_Taxonomy)));
        /** @var $term_taxonomy EE_Term_Taxonomy */
        if ($term_taxonomy) {
            $term_taxonomy->set_count($term_taxonomy->count() - 1);
            $term_taxonomy->save();
        }
        return $this->remove_relationship_to($cpt_model_object_event, $term_taxonomy, 'Term_Taxonomy');
    }



    /**
     * This is a wrapper for the WordPress get_the_post_thumbnail() function that returns the feature image for the
     * given CPT ID.  It accepts the same params as what get_the_post_thumbnail() accepts.
     *
     * @link   http://codex.wordpress.org/Function_Reference/get_the_post_thumbnail
     * @access public
     * @param int          $id   the ID for the cpt we want the feature image for
     * @param string|array $size (optional) Image size. Defaults to 'post-thumbnail' but can also be a 2-item array
     *                           representing width and height in pixels (i.e. array(32,32) ).
     * @param string|array $attr Optional. Query string or array of attributes.
     * @return string HTML image element
     */
    public function get_feature_image($id, $size = 'thumbnail', $attr = '')
    {
        return get_the_post_thumbnail($id, $size, $attr);
    }



    /**
     * Just a handy way to get the list of post statuses currently registered with WP.
     *
     * @global array $wp_post_statuses set in wp core for storing all the post stati
     * @return array
     */
    public function get_post_statuses()
    {
        global $wp_post_statuses;
        $statuses = array();
        foreach ($wp_post_statuses as $post_status => $args_object) {
            $statuses[$post_status] = $args_object->label;
        }
        return $statuses;
    }



    /**
     * public method that can be used to retrieve the protected status array on the instantiated cpt model
     *
     * @return array array of statuses.
     */
    public function get_status_array()
    {
        $statuses = $this->get_post_statuses();
        //first the global filter
        $statuses = apply_filters('FHEE_EEM_CPT_Base__get_status_array', $statuses);
        //now the class specific filter
        $statuses = apply_filters('FHEE_EEM_' . get_class($this) . '__get_status_array', $statuses);
        return $statuses;
    }



    /**
     * this returns the post statuses that are NOT the default wordpress status
     *
     * @return array
     */
    public function get_custom_post_statuses()
    {
        $new_stati = array();
        foreach ($this->_custom_stati as $status => $props) {
            $new_stati[$status] = $props['label'];
        }
        return $new_stati;
    }



    /**
     * Creates a child of EE_CPT_Base given a WP_Post or array of wpdb results which
     * are a row from the posts table. If we're missing any fields required for the model,
     * we just fetch the entire entry from the DB (ie, if you want to use this to save DB queries,
     * make sure you are attaching all the model's fields onto the post)
     *
     * @param WP_Post|array $post
     * @return EE_Base_Class|EE_Soft_Delete_Base_Class
     */
    public function instantiate_class_from_post_object_orig($post)
    {
        $post = (array)$post;
        $has_all_necessary_fields_for_table = true;
        //check if the post has fields on the meta table already
        foreach ($this->_get_other_tables() as $table_obj) {
            $fields_for_that_table = $this->_get_fields_for_table($table_obj->get_table_alias());
            foreach ($fields_for_that_table as $field_obj) {
                if ( ! isset($post[$field_obj->get_table_column()])
                     && ! isset($post[$field_obj->get_qualified_column()])
                ) {
                    $has_all_necessary_fields_for_table = false;
                }
            }
        }
        //if we don't have all the fields we need, then just fetch the proper model from the DB
        if ( ! $has_all_necessary_fields_for_table) {
            return $this->get_one_by_ID($post['ID']);
        } else {
            return $this->instantiate_class_from_array_or_object($post);
        }
    }



    /**
     * @param null $post
     * @return EE_Base_Class|EE_Soft_Delete_Base_Class
     */
    public function instantiate_class_from_post_object($post = null)
    {
        if (empty($post)) {
            global $post;
        }
        $post = (array)$post;
        $tables_needing_to_be_queried = array();
        //check if the post has fields on the meta table already
        foreach ($this->get_tables() as $table_obj) {
            $fields_for_that_table = $this->_get_fields_for_table($table_obj->get_table_alias());
            foreach ($fields_for_that_table as $field_obj) {
                if ( ! isset($post[$field_obj->get_table_column()])
                     && ! isset($post[$field_obj->get_qualified_column()])
                ) {
                    $tables_needing_to_be_queried[$table_obj->get_table_alias()] = $table_obj;
                }
            }
        }
        //if we don't have all the fields we need, then just fetch the proper model from the DB
        if ($tables_needing_to_be_queried) {
            if (count($tables_needing_to_be_queried) == 1
                && reset($tables_needing_to_be_queried)
                   instanceof
                   EE_Secondary_Table
            ) {
                //so we're only missing data from a secondary table. Well that's not too hard to query for
                $table_to_query = reset($tables_needing_to_be_queried);
                $missing_data = $this->_do_wpdb_query('get_row', array(
                    'SELECT * FROM '
                    . $table_to_query->get_table_name()
                    . ' WHERE '
                    . $table_to_query->get_fk_on_table()
                    . ' = '
                    . $post['ID'],
                    ARRAY_A,
                ));
                if ( ! empty($missing_data)) {
                    $post = array_merge($post, $missing_data);
                }
            } else {
                return $this->get_one_by_ID($post['ID']);
            }
        }
        return $this->instantiate_class_from_array_or_object($post);
    }



    /**
     * Gets the post type associated with this
     *
     * @throws EE_Error
     * @return string
     */
    public function post_type()
    {
        $post_type_field = null;
        foreach ($this->field_settings(true) as $field_obj) {
            if ($field_obj instanceof EE_WP_Post_Type_Field) {
                $post_type_field = $field_obj;
                break;
            }
        }
        if ($post_type_field == null) {
            throw new EE_Error(sprintf(__("CPT Model %s should have a field of type EE_WP_Post_Type, but doesnt",
                "event_espresso"), get_class($this)));
        }
        return $post_type_field->get_default_value();
    }

}
