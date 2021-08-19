<?php

/**
 * Class EE_CPT_Base
 * Base class for all models which are really custom post types, as there is much functionality they share
 *
 * @package     Event Espresso
 * @subpackage  core
 * @author      Michael Nelson
 * @since       EE4
 */
abstract class EE_CPT_Base extends EE_Soft_Delete_Base_Class
{

    /**
     * This is a property for holding cached feature images on CPT objects.
     * Cache's are set on the first "feature_image()" method call.
     * Each key in the array corresponds to the requested size.
     *
     * @var array
     */
    protected $_feature_image = [];

    /**
     * @var WP_Post the WP_Post that corresponds with this CPT model object
     */
    protected $_wp_post;


    abstract public function wp_user();


    /**
     * Adds to the specified event category. If it category doesn't exist, creates it.
     *
     * @param string      $category_name
     * @param string|null $category_description    optional
     * @param int|null    $parent_term_taxonomy_id optional
     * @return EE_Term_Taxonomy
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function add_event_category(
        string $category_name,
        string $category_description = '',
        int $parent_term_taxonomy_id = 0
    ): EE_Term_Taxonomy {
        return $this->get_model()->add_event_category(
            $this,
            $category_name,
            $category_description,
            $parent_term_taxonomy_id
        );
    }


    /**
     * Removes the event category by specified name from being related ot this event
     *
     * @param string $category_name
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function remove_event_category(string $category_name): bool
    {
        return $this->get_model()->remove_event_category($this, $category_name);
    }


    /**
     * Removes the relation to the specified term taxonomy, and maintains the
     * data integrity of the term taxonomy provided
     *
     * @param EE_Term_Taxonomy $term_taxonomy
     * @return EE_Base_Class the relation was removed from
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function remove_relation_to_term_taxonomy(EE_Term_Taxonomy $term_taxonomy): ?EE_Base_Class
    {
        if (! $term_taxonomy) {
            EE_Error::add_error(
                sprintf(
                    esc_html__(
                        "No Term_Taxonomy provided which to remove from model object of type %s and id %d",
                        "event_espresso"
                    ),
                    get_class($this),
                    $this->ID()
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return null;
        }
        $term_taxonomy->set_count($term_taxonomy->count() - 1);
        $term_taxonomy->save();
        return $this->_remove_relation_to($term_taxonomy, 'Term_Taxonomy');
    }


    /**
     * The main purpose of this method is to return the post type for the model object
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function post_type(): string
    {
        return $this->get_model()->post_type();
    }


    /**
     * The main purpose of this method is to return the parent for the model object
     *
     * @return int
     * @throws EE_Error
     */
    public function parent(): int
    {
        return $this->get('parent');
    }


    /**
     * return the _status property
     *
     * @return string
     * @throws EE_Error
     */
    public function status(): string
    {
        return $this->get('status');
    }


    /**
     * @param string $status
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_status(string $status)
    {
        $this->set('status', $status);
    }


    /**
     * See _get_feature_image. Returns the HTML to display a featured image
     *
     * @param string       $size
     * @param string|array $attr
     * @return string of html
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function feature_image(string $size = 'thumbnail', $attr = ''): string
    {
        return $this->_get_feature_image($size, $attr);
    }


    /**
     * This calls the equivalent model method for retrieving the feature image
     * which in turn is a wrapper for WordPress' get_the_post_thumbnail() function.
     *
     * @link   http://codex.wordpress.org/Function_Reference/get_the_post_thumbnail
     * @access protected
     * @param string|array $size (optional) Image size. Defaults to 'post-thumbnail' but can also be a 2-item array
     *                           representing width and height in pixels (i.e. array(32,32) ).
     * @param string|array $attr Optional. Query string or array of attributes.
     * @return string HTML image element
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_feature_image($size, $attr): string
    {
        // first let's see if we already have the _feature_image property set
        // AND if it has a cached element on it FOR the given size
        $attr_key                           = is_array($attr)
            ? implode('_', $attr)
            : $attr;
        $cache_key                          = is_array($size)
            ? implode('_', $size) . $attr_key
            : $size . $attr_key;
        $this->_feature_image[ $cache_key ] = $this->_feature_image[ $cache_key ]
                                              ?? $this->get_model()->get_feature_image($this->ID(), $size, $attr);
        return $this->_feature_image[ $cache_key ];
    }


    /**
     * This uses the wp "wp_get_attachment_image_src()" function to return the feature image for the current class
     * using the given size params.
     *
     * @param string|array $size  can either be a string: 'thumbnail', 'medium', 'large', 'full' OR 2-item array
     *                            representing width and height in pixels eg. array(32,32).
     * @return string|boolean          the url of the image or false if not found
     * @throws EE_Error
     */
    public function feature_image_url($size = 'thumbnail')
    {
        $attachment = wp_get_attachment_image_src(get_post_thumbnail_id($this->ID()), $size);
        return ! empty($attachment)
            ? $attachment[0]
            : false;
    }


    /**
     * This is a method for restoring this_obj using details from the given $revision_id
     *
     * @param int   $revision_id       ID of the revision we're getting data from
     * @param array $related_obj_names if included this will be used to restore for related obj
     *                                 if not included then we just do restore on the meta.
     *                                 We will accept an array of related_obj_names for restoration here.
     * @param array $where_query       You can optionally include an array of key=>value pairs
     *                                 that allow you to further constrict the relation to being added.
     *                                 However, keep in mind that the columns (keys) given
     *                                 must match a column on the JOIN table and currently
     *                                 only the HABTM models accept these additional conditions.
     *                                 Also remember that if an exact match isn't found for these extra cols/val pairs,
     *                                 then a NEW row is created in the join table.
     *                                 This array is INDEXED by RELATED OBJ NAME (so it corresponds with the obj_names
     *                                 sent);
     * @return void
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function restore_revision(int $revision_id, array $related_obj_names = [], array $where_query = [])
    {
        // get revision object
        $revision_obj = $this->get_model()->get_one_by_ID($revision_id);
        if ($revision_obj instanceof EE_CPT_Base) {
            // no related_obj_name so we assume we're saving a revision on this object.
            if (empty($related_obj_names)) {
                $fields = $this->get_model()->get_meta_table_fields();
                foreach ($fields as $field) {
                    $this->set($field, $revision_obj->get($field));
                }
                $this->save();
            }
            foreach ($related_obj_names as $related_name) {
                // related_obj_name so we're saving a revision on an object related to this object
                // do we have $where_query params for this related object?  If we do then we include that.
                $cols_n_values         = $where_query[ $related_name ] ?? [];
                $where_params          = ! empty($cols_n_values)
                    ? [$cols_n_values]
                    : [];
                $related_objs          = $this->get_many_related($related_name, $where_params);
                $revision_related_objs = $revision_obj->get_many_related($related_name, $where_params);
                // load helper
                // remove related objs from this object that are not in revision
                // array_diff *should* work cause I think objects are indexed by ID?
                $related_to_remove = EEH_Array::object_array_diff($related_objs, $revision_related_objs);
                foreach ($related_to_remove as $rr) {
                    $this->_remove_relation_to($rr, $related_name, $cols_n_values);
                }
                // add all related objs attached to revision to this object
                foreach ($revision_related_objs as $r_obj) {
                    $this->_add_relation_to($r_obj, $related_name, $cols_n_values);
                }
            }
        }
    }


    /**
     * Wrapper for get_post_meta, http://codex.wordpress.org/Function_Reference/get_post_meta
     * If only $id is set:
     *  it will return all meta values in an associative array.
     * If $single is set to false, or left blank:
     *  the function returns an array containing all values of the specified key.
     * If $single is set to true:
     *  the function returns the first value of the specified key (not in an array)
     *
     * @param string $meta_key
     * @param bool   $single
     * @return mixed
     * @throws EE_Error
     */
    public function get_post_meta(string $meta_key = '', bool $single = false)
    {
        return get_post_meta($this->ID(), $meta_key, $single);
    }


    /**
     * Wrapper for update_post_meta, http://codex.wordpress.org/Function_Reference/update_post_meta
     * Returns meta_id if the meta doesn't exist,
     * otherwise returns true on success and false on failure.
     * NOTE: If the meta_value passed to this function is the same
     * as the value that is already in the database, this function returns false.
     *
     * @param string $meta_key
     * @param mixed  $meta_value
     * @param mixed  $prev_value
     * @return bool|int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function update_post_meta(string $meta_key, $meta_value, $prev_value = null)
    {
        if (! $this->ID()) {
            $this->save();
        }
        return update_post_meta($this->ID(), $meta_key, $meta_value, $prev_value);
    }


    /**
     * Wrapper for add_post_meta, http://codex.wordpress.org/Function_Reference/add_post_meta
     *
     * @param string $meta_key
     * @param mixed $meta_value
     * @param bool  $unique     If postmeta for this $meta_key already exists,
     *                          whether to add an additional item or not
     * @return boolean          Boolean true, except if the $unique argument was set to true
     *                          and a custom field with the given key already exists,
     *                          in which case false is returned.
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function add_post_meta(string $meta_key, $meta_value, bool $unique = false): bool
    {
        if ($this->ID()) {
            $this->save();
        }
        return add_post_meta($this->ID(), $meta_key, $meta_value, $unique);
    }


    /**
     * Wrapper for delete_post_meta, http://codex.wordpress.org/Function_Reference/delete_post_meta
     *
     * @param string $meta_key
     * @param mixed $meta_value
     * @return boolean False for failure. True for success.
     * @throws EE_Error
     */
    public function delete_post_meta(string $meta_key, $meta_value = ''): bool
    {
        if (! $this->ID()) {
            // there is obviously no postmeta for this if it's not saved
            // so let's just report this as a success
            return true;
        }
        return delete_post_meta($this->ID(), $meta_key, $meta_value);
    }


    /**
     * Gets the URL for viewing this event on the front-end
     *
     * @return string
     * @throws EE_Error
     */
    public function get_permalink(): string
    {
        return get_permalink($this->ID());
    }


    /**
     * Gets all the term-taxonomies for this CPT
     *
     * @param array $query_params
     * @return EE_Term_Taxonomy[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function term_taxonomies(array $query_params = []): array
    {
        return $this->get_many_related('Term_Taxonomy', $query_params);
    }


    /**
     * @return string[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_custom_post_statuses(): array
    {
        return $this->get_model()->get_custom_post_statuses();
    }


    /**
     * @return string[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_post_statuses(): array
    {
        return $this->get_model()->get_status_array();
    }


    /**
     * When fetching a new value for a post field that uses the global $post for rendering,
     * set the global $post temporarily to be this model object; and afterwards restore it
     *
     * @param string      $field_name
     * @param bool        $pretty
     * @param string|null $extra_cache_ref
     * @return mixed
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function _get_fresh_property(string $field_name, bool $pretty = false, string $extra_cache_ref = '')
    {
        global $post;

        if (
            $pretty
            && (
                ! ($post instanceof WP_Post && $post->ID)
                || absint($post->ID) !== $this->ID()
            )
            && $this->get_model()->field_settings_for($field_name) instanceof EE_Post_Content_Field
        ) {
            $old_post     = $post;
            $post         = $this->wp_post();
            $return_value = parent::_get_fresh_property($field_name, $pretty, $extra_cache_ref);
            $post         = $old_post;
        } else {
            $return_value = parent::_get_fresh_property($field_name, $pretty, $extra_cache_ref);
        }
        return $return_value;
    }


    /**
     * Returns the WP post associated with this CPT model object.
     * If this CPT is saved, fetches it from the DB.
     * Otherwise, create an unsaved WP_POst object. Caches the post internally.
     *
     * @return WP_Post
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function wp_post(): WP_Post
    {
        global $wpdb;
        if (! $this->_wp_post instanceof WP_Post) {
            if ($this->ID()) {
                $this->_wp_post = get_post($this->ID());
            } else {
                $simulated_db_result = new stdClass();
                $field_settings      = $this->get_model()->field_settings(true);
                foreach ($field_settings as $field_name => $field_obj) {
                    if (
                        $this->get_model()->get_table_obj_by_alias($field_obj->get_table_alias())
                             ->get_table_name() === $wpdb->posts
                    ) {
                        $column = $field_obj->get_table_column();

                        if ($field_obj instanceof EE_Datetime_Field) {
                            $value_on_model_obj = $this->get_DateTime_object($field_name);
                        } elseif ($field_obj->is_db_only_field()) {
                            $value_on_model_obj = $field_obj->get_default_value();
                        } else {
                            $value_on_model_obj = $this->get_raw($field_name);
                        }
                        $simulated_db_result->{$column} = $field_obj->prepare_for_use_in_db($value_on_model_obj);
                    }
                }
                $this->_wp_post = new WP_Post($simulated_db_result);
            }
            // and let's make retrieving the EE CPT object easy too
            $classname = get_class($this);
            if (! isset($this->_wp_post->{$classname})) {
                $this->_wp_post->{$classname} = $this;
            }
        }
        return $this->_wp_post;
    }


    /**
     * Don't serialize the WP Post. That's just duplicate data and we want to avoid recursion
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __sleep()
    {
        $properties_to_serialize = parent::__sleep();
        return array_diff($properties_to_serialize, ['_wp_post']);
    }
}
