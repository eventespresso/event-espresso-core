<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}
do_action('AHEE_log', __FILE__, ' FILE LOADED', '');



/**
 * Event Espresso
 * Event Registration and Management Plugin for WordPress
 * @ package            Event Espresso
 * @ author                Seth Shoultes
 * @ copyright        (c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license            http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link                    http://www.eventespresso.com
 * @ version            4.0
 * ------------------------------------------------------------------------
 * EE_Base_Class class
 *
 * @package                   Event Espresso
 * @subpackage                includes/classes/EE_Base_Class.class.php
 * @author                    Michael Nelson
 *                            ------------------------------------------------------------------------
 */
abstract class EE_Base_Class
{

    /**
     * This is an array of the original properties and values provided during construction
     * of this model object. (keys are model field names, values are their values).
     * This list is important to remember so that when we are merging data from the db, we know
     * which values to override and which to not override.
     *
     * @var array
     */
    protected $_props_n_values_provided_in_constructor;

    /**
     * Timezone
     * This gets set by the "set_timezone()" method so that we know what timezone incoming strings|timestamps are in.
     * This can also be used before a get to set what timezone you want strings coming out of the object to be in.  NOT
     * all EE_Base_Class child classes use this property but any that use a EE_Datetime_Field data type will have
     * access to it.
     *
     * @var string
     */
    protected $_timezone;



    /**
     * date format
     * pattern or format for displaying dates
     *
     * @var string $_dt_frmt
     */
    protected $_dt_frmt;



    /**
     * time format
     * pattern or format for displaying time
     *
     * @var string $_tm_frmt
     */
    protected $_tm_frmt;



    /**
     * This property is for holding a cached array of object properties indexed by property name as the key.
     * The purpose of this is for setting a cache on properties that may have calculated values after a
     * prepare_for_get.  That way the cache can be checked first and the calculated property returned instead of having
     * to recalculate. Used by _set_cached_property() and _get_cached_property() methods.
     *
     * @var array
     */
    protected $_cached_properties = array();

    /**
     * An array containing keys of the related model, and values are either an array of related mode objects or a
     * single
     * related model object. see the model's _model_relations. The keys should match those specified. And if the
     * relation is of type EE_Belongs_To (or one of its children), then there should only be ONE related model object,
     * all others have an array)
     *
     * @var array
     */
    protected $_model_relations = array();

    /**
     * Array where keys are field names (see the model's _fields property) and values are their values. To see what
     * their types should be, look at what that field object returns on its prepare_for_get and prepare_for_set methods)
     *
     * @var array
     */
    protected $_fields = array();

    /**
     * @var boolean indicating whether or not this model object is intended to ever be saved
     * For example, we might create model objects intended to only be used for the duration
     * of this request and to be thrown away, and if they were accidentally saved
     * it would be a bug.
     */
    protected $_allow_persist = true;



    /**
     * basic constructor for Event Espresso classes, performs any necessary initialization, and verifies it's children
     * play nice
     *
     * @param array   $fieldValues                             where each key is a field (ie, array key in the 2nd
     *                                                         layer of the model's _fields array, (eg, EVT_ID,
     *                                                         TXN_amount, QST_name, etc) and values are their values
     * @param boolean $bydb                                    a flag for setting if the class is instantiated by the
     *                                                         corresponding db model or not.
     * @param string  $timezone                                indicate what timezone you want any datetime fields to
     *                                                         be in when instantiating a EE_Base_Class object.
     * @param array   $date_formats                            An array of date formats to set on construct where first
     *                                                         value is the date_format and second value is the time
     *                                                         format.
     * @throws EE_Error
     */
    protected function __construct($fieldValues = array(), $bydb = false, $timezone = '', $date_formats = array())
    {
        $className = get_class($this);
        do_action("AHEE__{$className}__construct", $this, $fieldValues);
        $model = $this->get_model();
        $model_fields = $model->field_settings(false);
        // ensure $fieldValues is an array
        $fieldValues = is_array($fieldValues) ? $fieldValues : array($fieldValues);
        // EEH_Debug_Tools::printr( $fieldValues, '$fieldValues  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
        // verify client code has not passed any invalid field names
        foreach ($fieldValues as $field_name => $field_value) {
            if ( ! isset($model_fields[$field_name])) {
                throw new EE_Error(sprintf(__("Invalid field (%s) passed to constructor of %s. Allowed fields are :%s",
                    "event_espresso"), $field_name, get_class($this), implode(", ", array_keys($model_fields))));
            }
        }
        // EEH_Debug_Tools::printr( $model_fields, '$model_fields  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
        $this->_timezone = EEH_DTT_Helper::get_valid_timezone_string($timezone);
        if ( ! empty($date_formats) && is_array($date_formats)) {
            list($this->_dt_frmt, $this->_tm_frmt) = $date_formats;
        } else {
            //set default formats for date and time
            $this->_dt_frmt = (string)get_option('date_format', 'Y-m-d');
            $this->_tm_frmt = (string)get_option('time_format', 'g:i a');
        }
        //if db model is instantiating
        if ($bydb) {
            //client code has indicated these field values are from the database
            foreach ($model_fields as $fieldName => $field) {
                $this->set_from_db($fieldName, isset($fieldValues[$fieldName]) ? $fieldValues[$fieldName] : null);
            }
        } else {
            //we're constructing a brand
            //new instance of the model object. Generally, this means we'll need to do more field validation
            foreach ($model_fields as $fieldName => $field) {
                $this->set($fieldName, isset($fieldValues[$fieldName]) ? $fieldValues[$fieldName] : null, true);
            }
        }
        //remember what values were passed to this constructor
        $this->_props_n_values_provided_in_constructor = $fieldValues;
        //remember in entity mapper
        if ( ! $bydb && $model->has_primary_key_field() && $this->ID()) {
            $model->add_to_entity_map($this);
        }
        //setup all the relations
        foreach ($this->get_model()->relation_settings() as $relation_name => $relation_obj) {
            if ($relation_obj instanceof EE_Belongs_To_Relation) {
                $this->_model_relations[$relation_name] = null;
            } else {
                $this->_model_relations[$relation_name] = array();
            }
        }
        /**
         * Action done at the end of each model object construction
         *
         * @param EE_Base_Class $this the model object just created
         */
        do_action('AHEE__EE_Base_Class__construct__finished', $this);
    }



    /**
     * Gets whether or not this model object is allowed to persist/be saved to the database.
     *
     * @return boolean
     */
    public function allow_persist()
    {
        return $this->_allow_persist;
    }



    /**
     * Sets whether or not this model object should be allowed to be saved to the DB.
     * Normally once this is set to FALSE you wouldn't set it back to TRUE, unless
     * you got new information that somehow made you change your mind.
     *
     * @param boolean $allow_persist
     * @return boolean
     */
    public function set_allow_persist($allow_persist)
    {
        return $this->_allow_persist = $allow_persist;
    }



    /**
     * Gets the field's original value when this object was constructed during this request.
     * This can be helpful when determining if a model object has changed or not
     *
     * @param string $field_name
     * @return mixed|null
     * @throws \EE_Error
     */
    public function get_original($field_name)
    {
        if (isset($this->_props_n_values_provided_in_constructor[$field_name])
            && $field_settings = $this->get_model()->field_settings_for($field_name)
        ) {
            return $field_settings->prepare_for_get($this->_props_n_values_provided_in_constructor[$field_name]);
        } else {
            return null;
        }
    }



    /**
     * @param EE_Base_Class $obj
     * @return string
     */
    public function get_class($obj)
    {
        return get_class($obj);
    }



    /**
     * Overrides parent because parent expects old models.
     * This also doesn't do any validation, and won't work for serialized arrays
     *
     * @param    string $field_name
     * @param    mixed  $field_value
     * @param bool      $use_default
     * @throws \EE_Error
     */
    public function set($field_name, $field_value, $use_default = false)
    {
        $field_obj = $this->get_model()->field_settings_for($field_name);
        if ($field_obj instanceof EE_Model_Field_Base) {
            //			if ( method_exists( $field_obj, 'set_timezone' )) {
            if ($field_obj instanceof EE_Datetime_Field) {
                $field_obj->set_timezone($this->_timezone);
                $field_obj->set_date_format($this->_dt_frmt);
                $field_obj->set_time_format($this->_tm_frmt);
            }
            $holder_of_value = $field_obj->prepare_for_set($field_value);
            //should the value be null?
            if (($field_value === null || $holder_of_value === null || $holder_of_value === '') && $use_default) {
                $this->_fields[$field_name] = $field_obj->get_default_value();
                /**
                 * To save having to refactor all the models, if a default value is used for a
                 * EE_Datetime_Field, and that value is not null nor is it a DateTime
                 * object.  Then let's do a set again to ensure that it becomes a DateTime
                 * object.
                 *
                 * @since 4.6.10+
                 */
                if (
                    $field_obj instanceof EE_Datetime_Field
                    && $this->_fields[$field_name] !== null
                    && ! $this->_fields[$field_name] instanceof DateTime
                ) {
                    empty($this->_fields[$field_name])
                        ? $this->set($field_name, time())
                        : $this->set($field_name, $this->_fields[$field_name]);
                }
            } else {
                $this->_fields[$field_name] = $holder_of_value;
            }
            //if we're not in the constructor...
            //now check if what we set was a primary key
            if (
                //note: props_n_values_provided_in_constructor is only set at the END of the constructor
                $this->_props_n_values_provided_in_constructor
                && $field_value
                && $field_name === self::_get_primary_key_name(get_class($this))
            ) {
                //if so, we want all this object's fields to be filled either with
                //what we've explicitly set on this model
                //or what we have in the db
                // echo "setting primary key!";
                $fields_on_model = self::_get_model(get_class($this))->field_settings();
                $obj_in_db = self::_get_model(get_class($this))->get_one_by_ID($field_value);
                foreach ($fields_on_model as $field_obj) {
                    if ( ! array_key_exists($field_obj->get_name(), $this->_props_n_values_provided_in_constructor)
                         && $field_obj->get_name() !== $field_name
                    ) {
                        $this->set($field_obj->get_name(), $obj_in_db->get($field_obj->get_name()));
                    }
                }
                //oh this model object has an ID? well make sure its in the entity mapper
                $this->get_model()->add_to_entity_map($this);
            }
            //let's unset any cache for this field_name from the $_cached_properties property.
            $this->_clear_cached_property($field_name);
        } else {
            throw new EE_Error(sprintf(__("A valid EE_Model_Field_Base could not be found for the given field name: %s",
                "event_espresso"), $field_name));
        }
    }



    /**
     * This sets the field value on the db column if it exists for the given $column_name or
     * saves it to EE_Extra_Meta if the given $column_name does not match a db column.
     *
     * @see EE_message::get_column_value for related documentation on the necessity of this method.
     * @param string $field_name  Must be the exact column name.
     * @param mixed  $field_value The value to set.
     * @return int|bool @see EE_Base_Class::update_extra_meta() for return docs.
     * @throws \EE_Error
     */
    public function set_field_or_extra_meta($field_name, $field_value)
    {
        if ($this->get_model()->has_field($field_name)) {
            $this->set($field_name, $field_value);
            return true;
        } else {
            //ensure this object is saved first so that extra meta can be properly related.
            $this->save();
            return $this->update_extra_meta($field_name, $field_value);
        }
    }



    /**
     * This retrieves the value of the db column set on this class or if that's not present
     * it will attempt to retrieve from extra_meta if found.
     * Example Usage:
     * Via EE_Message child class:
     * Due to the dynamic nature of the EE_messages system, EE_messengers will always have a "to",
     * "from", "subject", and "content" field (as represented in the EE_Message schema), however they may
     * also have additional main fields specific to the messenger.  The system accommodates those extra
     * fields through the EE_Extra_Meta table.  This method allows for EE_messengers to retrieve the
     * value for those extra fields dynamically via the EE_message object.
     *
     * @param  string $field_name expecting the fully qualified field name.
     * @return mixed|null  value for the field if found.  null if not found.
     * @throws \EE_Error
     */
    public function get_field_or_extra_meta($field_name)
    {
        if ($this->get_model()->has_field($field_name)) {
            $column_value = $this->get($field_name);
        } else {
            //This isn't a column in the main table, let's see if it is in the extra meta.
            $column_value = $this->get_extra_meta($field_name, true, null);
        }
        return $column_value;
    }



    /**
     * See $_timezone property for description of what the timezone property is for.  This SETS the timezone internally
     * for being able to reference what timezone we are running conversions on when converting TO the internal timezone
     * (UTC Unix Timestamp) for the object OR when converting FROM the internal timezone (UTC Unix Timestamp). This is
     * available to all child classes that may be using the EE_Datetime_Field for a field data type.
     *
     * @access public
     * @param string $timezone A valid timezone string as described by @link http://www.php.net/manual/en/timezones.php
     * @return void
     * @throws \EE_Error
     */
    public function set_timezone($timezone = '')
    {
        $this->_timezone = EEH_DTT_Helper::get_valid_timezone_string($timezone);
        //make sure we clear all cached properties because they won't be relevant now
        $this->_clear_cached_properties();
        //make sure we update field settings and the date for all EE_Datetime_Fields
        $model_fields = $this->get_model()->field_settings(false);
        foreach ($model_fields as $field_name => $field_obj) {
            if ($field_obj instanceof EE_Datetime_Field) {
                $field_obj->set_timezone($this->_timezone);
                if (isset($this->_fields[$field_name]) && $this->_fields[$field_name] instanceof DateTime) {
                    $this->_fields[$field_name]->setTimezone(new DateTimeZone($this->_timezone));
                }
            }
        }
    }



    /**
     * This just returns whatever is set for the current timezone.
     *
     * @access public
     * @return string timezone string
     */
    public function get_timezone()
    {
        return $this->_timezone;
    }



    /**
     * This sets the internal date format to what is sent in to be used as the new default for the class
     * internally instead of wp set date format options
     *
     * @since 4.6
     * @param string $format should be a format recognizable by PHP date() functions.
     */
    public function set_date_format($format)
    {
        $this->_dt_frmt = $format;
        //clear cached_properties because they won't be relevant now.
        $this->_clear_cached_properties();
    }



    /**
     * This sets the internal time format string to what is sent in to be used as the new default for the
     * class internally instead of wp set time format options.
     *
     * @since 4.6
     * @param string $format should be a format recognizable by PHP date() functions.
     */
    public function set_time_format($format)
    {
        $this->_tm_frmt = $format;
        //clear cached_properties because they won't be relevant now.
        $this->_clear_cached_properties();
    }



    /**
     * This returns the current internal set format for the date and time formats.
     *
     * @param bool $full           if true (default), then return the full format.  Otherwise will return an array
     *                             where the first value is the date format and the second value is the time format.
     * @return mixed string|array
     */
    public function get_format($full = true)
    {
        return $full ? $this->_dt_frmt . ' ' . $this->_tm_frmt : array($this->_dt_frmt, $this->_tm_frmt);
    }



    /**
     * cache
     * stores the passed model object on the current model object.
     * In certain circumstances, we can use this cached model object instead of querying for another one entirely.
     *
     * @param string        $relationName    one of the keys in the _model_relations array on the model. Eg
     *                                       'Registration' associated with this model object
     * @param EE_Base_Class $object_to_cache that has a relation to this model object. (Eg, if this is a Transaction,
     *                                       that could be a payment or a registration)
     * @param null          $cache_id        a string or number that will be used as the key for any Belongs_To_Many
     *                                       items which will be stored in an array on this object
     * @throws EE_Error
     * @return mixed    index into cache, or just TRUE if the relation is of type Belongs_To (because there's only one
     *                  related thing, no array)
     */
    public function cache($relationName = '', $object_to_cache = null, $cache_id = null)
    {
        // its entirely possible that there IS no related object yet in which case there is nothing to cache.
        if ( ! $object_to_cache instanceof EE_Base_Class) {
            return false;
        }
        // also get "how" the object is related, or throw an error
        if ( ! $relationship_to_model = $this->get_model()->related_settings_for($relationName)) {
            throw new EE_Error(sprintf(__('There is no relationship to %s on a %s. Cannot cache it', 'event_espresso'),
                $relationName, get_class($this)));
        }
        // how many things are related ?
        if ($relationship_to_model instanceof EE_Belongs_To_Relation) {
            // if it's a "belongs to" relationship, then there's only one related model object  eg, if this is a registration, there's only 1 attendee for it
            // so for these model objects just set it to be cached
            $this->_model_relations[$relationName] = $object_to_cache;
            $return = true;
        } else {
            // otherwise, this is the "many" side of a one to many relationship, so we'll add the object to the array of related objects for that type.
            // eg: if this is an event, there are many registrations for that event, so we cache the registrations in an array
            if ( ! is_array($this->_model_relations[$relationName])) {
                // if for some reason, the cached item is a model object, then stick that in the array, otherwise start with an empty array
                $this->_model_relations[$relationName] = $this->_model_relations[$relationName] instanceof EE_Base_Class
                    ? array($this->_model_relations[$relationName]) : array();
            }
            // first check for a cache_id which is normally empty
            if ( ! empty($cache_id)) {
                // if the cache_id exists, then it means we are purposely trying to cache this with a known key that can then be used to retrieve the object later on
                $this->_model_relations[$relationName][$cache_id] = $object_to_cache;
                $return = $cache_id;
            } elseif ($object_to_cache->ID()) {
                // OR the cached object originally came from the db, so let's just use it's PK for an ID
                $this->_model_relations[$relationName][$object_to_cache->ID()] = $object_to_cache;
                $return = $object_to_cache->ID();
            } else {
                // OR it's a new object with no ID, so just throw it in the array with an auto-incremented ID
                $this->_model_relations[$relationName][] = $object_to_cache;
                // move the internal pointer to the end of the array
                end($this->_model_relations[$relationName]);
                // and grab the key so that we can return it
                $return = key($this->_model_relations[$relationName]);
            }
        }
        return $return;
    }



    /**
     * For adding an item to the cached_properties property.
     *
     * @access protected
     * @param string      $fieldname the property item the corresponding value is for.
     * @param mixed       $value     The value we are caching.
     * @param string|null $cache_type
     * @return void
     * @throws \EE_Error
     */
    protected function _set_cached_property($fieldname, $value, $cache_type = null)
    {
        //first make sure this property exists
        $this->get_model()->field_settings_for($fieldname);
        $cache_type = empty($cache_type) ? 'standard' : $cache_type;
        $this->_cached_properties[$fieldname][$cache_type] = $value;
    }



    /**
     * This returns the value cached property if it exists OR the actual property value if the cache doesn't exist.
     * This also SETS the cache if we return the actual property!
     *
     * @param string $fieldname        the name of the property we're trying to retrieve
     * @param bool   $pretty
     * @param string $extra_cache_ref  This allows the user to specify an extra cache ref for the given property
     *                                 (in cases where the same property may be used for different outputs
     *                                 - i.e. datetime, money etc.)
     *                                 It can also accept certain pre-defined "schema" strings
     *                                 to define how to output the property.
     *                                 see the field's prepare_for_pretty_echoing for what strings can be used
     * @return mixed                   whatever the value for the property is we're retrieving
     * @throws \EE_Error
     */
    protected function _get_cached_property($fieldname, $pretty = false, $extra_cache_ref = null)
    {
        //verify the field exists
        $this->get_model()->field_settings_for($fieldname);
        $cache_type = $pretty ? 'pretty' : 'standard';
        $cache_type .= ! empty($extra_cache_ref) ? '_' . $extra_cache_ref : '';
        if (isset($this->_cached_properties[$fieldname][$cache_type])) {
            return $this->_cached_properties[$fieldname][$cache_type];
        }
        $field_obj = $this->get_model()->field_settings_for($fieldname);
        if ($field_obj instanceof EE_Model_Field_Base) {
            // If this is an EE_Datetime_Field we need to make sure timezone, formats, and output are correct
            if ($field_obj instanceof EE_Datetime_Field) {
                $this->_prepare_datetime_field($field_obj, $pretty, $extra_cache_ref);
            }
            if ( ! isset($this->_fields[$fieldname])) {
                $this->_fields[$fieldname] = null;
            }
            $value = $pretty
                ? $field_obj->prepare_for_pretty_echoing($this->_fields[$fieldname], $extra_cache_ref)
                : $field_obj->prepare_for_get($this->_fields[$fieldname]);
            $this->_set_cached_property($fieldname, $value, $cache_type);
            return $value;
        }
        return null;
    }



    /**
     * set timezone, formats, and output for EE_Datetime_Field objects
     *
     * @param \EE_Datetime_Field $datetime_field
     * @param bool               $pretty
     * @param null $date_or_time
     * @return void
     * @throws \EE_Error
     */
    protected function _prepare_datetime_field(
        EE_Datetime_Field $datetime_field,
        $pretty = false,
        $date_or_time = null
    ) {
        $datetime_field->set_timezone($this->_timezone);
        $datetime_field->set_date_format($this->_dt_frmt, $pretty);
        $datetime_field->set_time_format($this->_tm_frmt, $pretty);
        //set the output returned
        switch ($date_or_time) {
            case 'D' :
                $datetime_field->set_date_time_output('date');
                break;
            case 'T' :
                $datetime_field->set_date_time_output('time');
                break;
            default :
                $datetime_field->set_date_time_output();
        }
    }



    /**
     * This just takes care of clearing out the cached_properties
     *
     * @return void
     */
    protected function _clear_cached_properties()
    {
        $this->_cached_properties = array();
    }



    /**
     * This just clears out ONE property if it exists in the cache
     *
     * @param  string $property_name the property to remove if it exists (from the _cached_properties array)
     * @return void
     */
    protected function _clear_cached_property($property_name)
    {
        if (isset($this->_cached_properties[$property_name])) {
            unset($this->_cached_properties[$property_name]);
        }
    }



    /**
     * Ensures that this related thing is a model object.
     *
     * @param mixed  $object_or_id EE_base_Class/int/string either a related model object, or its ID
     * @param string $model_name   name of the related thing, eg 'Attendee',
     * @return EE_Base_Class
     * @throws \EE_Error
     */
    protected function ensure_related_thing_is_model_obj($object_or_id, $model_name)
    {
        $other_model_instance = self::_get_model_instance_with_name(
            self::_get_model_classname($model_name),
            $this->_timezone
        );
        return $other_model_instance->ensure_is_obj($object_or_id);
    }



    /**
     * Forgets the cached model of the given relation Name. So the next time we request it,
     * we will fetch it again from the database. (Handy if you know it's changed somehow).
     * If a specific object is supplied, and the relationship to it is either a HasMany or HABTM,
     * then only remove that one object from our cached array. Otherwise, clear the entire list
     *
     * @param string $relationName                         one of the keys in the _model_relations array on the model.
     *                                                     Eg 'Registration'
     * @param mixed  $object_to_remove_or_index_into_array or an index into the array of cached things, or NULL
     *                                                     if you intend to use $clear_all = TRUE, or the relation only
     *                                                     has 1 object anyways (ie, it's a BelongsToRelation)
     * @param bool   $clear_all                            This flags clearing the entire cache relation property if
     *                                                     this is HasMany or HABTM.
     * @throws EE_Error
     * @return EE_Base_Class | boolean from which was cleared from the cache, or true if we requested to remove a
     *                       relation from all
     */
    public function clear_cache($relationName, $object_to_remove_or_index_into_array = null, $clear_all = false)
    {
        $relationship_to_model = $this->get_model()->related_settings_for($relationName);
        $index_in_cache = '';
        if ( ! $relationship_to_model) {
            throw new EE_Error(
                sprintf(
                    __("There is no relationship to %s on a %s. Cannot clear that cache", 'event_espresso'),
                    $relationName,
                    get_class($this)
                )
            );
        }
        if ($clear_all) {
            $obj_removed = true;
            $this->_model_relations[$relationName] = null;
        } elseif ($relationship_to_model instanceof EE_Belongs_To_Relation) {
            $obj_removed = $this->_model_relations[$relationName];
            $this->_model_relations[$relationName] = null;
        } else {
            if ($object_to_remove_or_index_into_array instanceof EE_Base_Class
                && $object_to_remove_or_index_into_array->ID()
            ) {
                $index_in_cache = $object_to_remove_or_index_into_array->ID();
                if (is_array($this->_model_relations[$relationName])
                    && ! isset($this->_model_relations[$relationName][$index_in_cache])
                ) {
                    $index_found_at = null;
                    //find this object in the array even though it has a different key
                    foreach ($this->_model_relations[$relationName] as $index => $obj) {
                        if (
                            $obj instanceof EE_Base_Class
                            && (
                                $obj == $object_to_remove_or_index_into_array
                                || $obj->ID() === $object_to_remove_or_index_into_array->ID()
                            )
                        ) {
                            $index_found_at = $index;
                            break;
                        }
                    }
                    if ($index_found_at) {
                        $index_in_cache = $index_found_at;
                    } else {
                        //it wasn't found. huh. well obviously it doesn't need to be removed from teh cache
                        //if it wasn't in it to begin with. So we're done
                        return $object_to_remove_or_index_into_array;
                    }
                }
            } elseif ($object_to_remove_or_index_into_array instanceof EE_Base_Class) {
                //so they provided a model object, but it's not yet saved to the DB... so let's go hunting for it!
                foreach ($this->get_all_from_cache($relationName) as $index => $potentially_obj_we_want) {
                    if ($potentially_obj_we_want == $object_to_remove_or_index_into_array) {
                        $index_in_cache = $index;
                    }
                }
            } else {
                $index_in_cache = $object_to_remove_or_index_into_array;
            }
            //supposedly we've found it. But it could just be that the client code
            //provided a bad index/object
            if (
            isset(
                $this->_model_relations[$relationName],
                $this->_model_relations[$relationName][$index_in_cache]
            )
            ) {
                $obj_removed = $this->_model_relations[$relationName][$index_in_cache];
                unset($this->_model_relations[$relationName][$index_in_cache]);
            } else {
                //that thing was never cached anyways.
                $obj_removed = null;
            }
        }
        return $obj_removed;
    }



    /**
     * update_cache_after_object_save
     * Allows a cached item to have it's cache ID (within the array of cached items) reset using the new ID it has
     * obtained after being saved to the db
     *
     * @param string         $relationName       - the type of object that is cached
     * @param \EE_Base_Class $newly_saved_object - the newly saved object to be re-cached
     * @param string         $current_cache_id   - the ID that was used when originally caching the object
     * @return boolean TRUE on success, FALSE on fail
     * @throws \EE_Error
     */
    public function update_cache_after_object_save(
        $relationName,
        EE_Base_Class $newly_saved_object,
        $current_cache_id = ''
    ) {
        // verify that incoming object is of the correct type
        $obj_class = 'EE_' . $relationName;
        if ($newly_saved_object instanceof $obj_class) {
            /* @type EE_Base_Class $newly_saved_object */
            // now get the type of relation
            $relationship_to_model = $this->get_model()->related_settings_for($relationName);
            // if this is a 1:1 relationship
            if ($relationship_to_model instanceof EE_Belongs_To_Relation) {
                // then just replace the cached object with the newly saved object
                $this->_model_relations[$relationName] = $newly_saved_object;
                return true;
                // or if it's some kind of sordid feral polyamorous relationship...
            } elseif (is_array($this->_model_relations[$relationName])
                      && isset($this->_model_relations[$relationName][$current_cache_id])
            ) {
                // then remove the current cached item
                unset($this->_model_relations[$relationName][$current_cache_id]);
                // and cache the newly saved object using it's new ID
                $this->_model_relations[$relationName][$newly_saved_object->ID()] = $newly_saved_object;
                return true;
            }
        }
        return false;
    }



    /**
     * Fetches a single EE_Base_Class on that relation. (If the relation is of type
     * BelongsTo, it will only ever have 1 object. However, other relations could have an array of objects)
     *
     * @param string $relationName
     * @return EE_Base_Class
     */
    public function get_one_from_cache($relationName)
    {
        $cached_array_or_object = isset($this->_model_relations[$relationName]) ? $this->_model_relations[$relationName]
            : null;
        if (is_array($cached_array_or_object)) {
            return array_shift($cached_array_or_object);
        } else {
            return $cached_array_or_object;
        }
    }



    /**
     * Fetches a single EE_Base_Class on that relation. (If the relation is of type
     * BelongsTo, it will only ever have 1 object. However, other relations could have an array of objects)
     *
     * @param string $relationName
     * @throws \EE_Error
     * @return EE_Base_Class[] NOT necessarily indexed by primary keys
     */
    public function get_all_from_cache($relationName)
    {
        $objects = isset($this->_model_relations[$relationName]) ? $this->_model_relations[$relationName] : array();
        // if the result is not an array, but exists, make it an array
        $objects = is_array($objects) ? $objects : array($objects);
        //bugfix for https://events.codebasehq.com/projects/event-espresso/tickets/7143
        //basically, if this model object was stored in the session, and these cached model objects
        //already have IDs, let's make sure they're in their model's entity mapper
        //otherwise we will have duplicates next time we call
        // EE_Registry::instance()->load_model( $relationName )->get_one_by_ID( $result->ID() );
        $model = EE_Registry::instance()->load_model($relationName);
        foreach ($objects as $model_object) {
            if ($model instanceof EEM_Base && $model_object instanceof EE_Base_Class) {
                //ensure its in the map if it has an ID; otherwise it will be added to the map when its saved
                if ($model_object->ID()) {
                    $model->add_to_entity_map($model_object);
                }
            } else {
                throw new EE_Error(
                    sprintf(
                        __(
                            'Error retrieving related model objects. Either $1%s is not a model or $2%s is not a model object',
                            'event_espresso'
                        ),
                        $relationName,
                        gettype($model_object)
                    )
                );
            }
        }
        return $objects;
    }



    /**
     * Returns the next x number of EE_Base_Class objects in sequence from this object as found in the database
     * matching the given query conditions.
     *
     * @param null  $field_to_order_by  What field is being used as the reference point.
     * @param int   $limit              How many objects to return.
     * @param array $query_params       Any additional conditions on the query.
     * @param null  $columns_to_select  If left null, then an array of EE_Base_Class objects is returned, otherwise
     *                                  you can indicate just the columns you want returned
     * @return array|EE_Base_Class[]
     * @throws \EE_Error
     */
    public function next_x($field_to_order_by = null, $limit = 1, $query_params = array(), $columns_to_select = null)
    {
        $field = empty($field_to_order_by) && $this->get_model()->has_primary_key_field()
            ? $this->get_model()->get_primary_key_field()->get_name()
            : $field_to_order_by;
        $current_value = ! empty($field) ? $this->get($field) : null;
        if (empty($field) || empty($current_value)) {
            return array();
        }
        return $this->get_model()->next_x($current_value, $field, $limit, $query_params, $columns_to_select);
    }



    /**
     * Returns the previous x number of EE_Base_Class objects in sequence from this object as found in the database
     * matching the given query conditions.
     *
     * @param null  $field_to_order_by  What field is being used as the reference point.
     * @param int   $limit              How many objects to return.
     * @param array $query_params       Any additional conditions on the query.
     * @param null  $columns_to_select  If left null, then an array of EE_Base_Class objects is returned, otherwise
     *                                  you can indicate just the columns you want returned
     * @return array|EE_Base_Class[]
     * @throws \EE_Error
     */
    public function previous_x(
        $field_to_order_by = null,
        $limit = 1,
        $query_params = array(),
        $columns_to_select = null
    ) {
        $field = empty($field_to_order_by) && $this->get_model()->has_primary_key_field()
            ? $this->get_model()->get_primary_key_field()->get_name()
            : $field_to_order_by;
        $current_value = ! empty($field) ? $this->get($field) : null;
        if (empty($field) || empty($current_value)) {
            return array();
        }
        return $this->get_model()->previous_x($current_value, $field, $limit, $query_params, $columns_to_select);
    }



    /**
     * Returns the next EE_Base_Class object in sequence from this object as found in the database
     * matching the given query conditions.
     *
     * @param null  $field_to_order_by  What field is being used as the reference point.
     * @param array $query_params       Any additional conditions on the query.
     * @param null  $columns_to_select  If left null, then an array of EE_Base_Class objects is returned, otherwise
     *                                  you can indicate just the columns you want returned
     * @return array|EE_Base_Class
     * @throws \EE_Error
     */
    public function next($field_to_order_by = null, $query_params = array(), $columns_to_select = null)
    {
        $field = empty($field_to_order_by) && $this->get_model()->has_primary_key_field()
            ? $this->get_model()->get_primary_key_field()->get_name()
            : $field_to_order_by;
        $current_value = ! empty($field) ? $this->get($field) : null;
        if (empty($field) || empty($current_value)) {
            return array();
        }
        return $this->get_model()->next($current_value, $field, $query_params, $columns_to_select);
    }



    /**
     * Returns the previous EE_Base_Class object in sequence from this object as found in the database
     * matching the given query conditions.
     *
     * @param null  $field_to_order_by  What field is being used as the reference point.
     * @param array $query_params       Any additional conditions on the query.
     * @param null  $columns_to_select  If left null, then an EE_Base_Class object is returned, otherwise
     *                                  you can indicate just the column you want returned
     * @return array|EE_Base_Class
     * @throws \EE_Error
     */
    public function previous($field_to_order_by = null, $query_params = array(), $columns_to_select = null)
    {
        $field = empty($field_to_order_by) && $this->get_model()->has_primary_key_field()
            ? $this->get_model()->get_primary_key_field()->get_name()
            : $field_to_order_by;
        $current_value = ! empty($field) ? $this->get($field) : null;
        if (empty($field) || empty($current_value)) {
            return array();
        }
        return $this->get_model()->previous($current_value, $field, $query_params, $columns_to_select);
    }



    /**
     * Overrides parent because parent expects old models.
     * This also doesn't do any validation, and won't work for serialized arrays
     *
     * @param string $field_name
     * @param mixed  $field_value_from_db
     * @throws \EE_Error
     */
    public function set_from_db($field_name, $field_value_from_db)
    {
        $field_obj = $this->get_model()->field_settings_for($field_name);
        if ($field_obj instanceof EE_Model_Field_Base) {
            //you would think the DB has no NULLs for non-null label fields right? wrong!
            //eg, a CPT model object could have an entry in the posts table, but no
            //entry in the meta table. Meaning that all its columns in the meta table
            //are null! yikes! so when we find one like that, use defaults for its meta columns
            if ($field_value_from_db === null) {
                if ($field_obj->is_nullable()) {
                    //if the field allows nulls, then let it be null
                    $field_value = null;
                } else {
                    $field_value = $field_obj->get_default_value();
                }
            } else {
                $field_value = $field_obj->prepare_for_set_from_db($field_value_from_db);
            }
            $this->_fields[$field_name] = $field_value;
            $this->_clear_cached_property($field_name);
        }
    }



    /**
     * verifies that the specified field is of the correct type
     *
     * @param string $field_name
     * @param string $extra_cache_ref This allows the user to specify an extra cache ref for the given property
     *                                (in cases where the same property may be used for different outputs
     *                                - i.e. datetime, money etc.)
     * @return mixed
     * @throws \EE_Error
     */
    public function get($field_name, $extra_cache_ref = null)
    {
        return $this->_get_cached_property($field_name, false, $extra_cache_ref);
    }



    /**
     * This method simply returns the RAW unprocessed value for the given property in this class
     *
     * @param  string $field_name A valid fieldname
     * @return mixed              Whatever the raw value stored on the property is.
     * @throws EE_Error if fieldSettings is misconfigured or the field doesn't exist.
     */
    public function get_raw($field_name)
    {
        $field_settings = $this->get_model()->field_settings_for($field_name);
        return $field_settings instanceof EE_Datetime_Field && $this->_fields[$field_name] instanceof DateTime
            ? $this->_fields[$field_name]->format('U')
            : $this->_fields[$field_name];
    }



    /**
     * This is used to return the internal DateTime object used for a field that is a
     * EE_Datetime_Field.
     *
     * @param string $field_name               The field name retrieving the DateTime object.
     * @return mixed null | false | DateTime  If the requested field is NOT a EE_Datetime_Field then
     * @throws \EE_Error
     *                                         an error is set and false returned.  If the field IS an
     *                                         EE_Datetime_Field and but the field value is null, then
     *                                         just null is returned (because that indicates that likely
     *                                         this field is nullable).
     */
    public function get_DateTime_object($field_name)
    {
        $field_settings = $this->get_model()->field_settings_for($field_name);
        if ( ! $field_settings instanceof EE_Datetime_Field) {
            EE_Error::add_error(
                sprintf(
                    __(
                        'The field %s is not an EE_Datetime_Field field.  There is no DateTime object stored on this field type.',
                        'event_espresso'
                    ),
                    $field_name
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        return $this->_fields[$field_name];
    }



    /**
     * To be used in template to immediately echo out the value, and format it for output.
     * Eg, should call stripslashes and whatnot before echoing
     *
     * @param string $field_name      the name of the field as it appears in the DB
     * @param string $extra_cache_ref This allows the user to specify an extra cache ref for the given property
     *                                (in cases where the same property may be used for different outputs
     *                                - i.e. datetime, money etc.)
     * @return void
     * @throws \EE_Error
     */
    public function e($field_name, $extra_cache_ref = null)
    {
        echo $this->get_pretty($field_name, $extra_cache_ref);
    }



    /**
     * Exactly like e(), echoes out the field, but sets its schema to 'form_input', so that it
     * can be easily used as the value of form input.
     *
     * @param string $field_name
     * @return void
     * @throws \EE_Error
     */
    public function f($field_name)
    {
        $this->e($field_name, 'form_input');
    }



    /**
     * Gets a pretty view of the field's value. $extra_cache_ref can specify different formats for this.
     * The $extra_cache_ref will be passed to the model field's prepare_for_pretty_echoing, so consult the field's class
     * to see what options are available.
     * @param string $field_name
     * @param string $extra_cache_ref This allows the user to specify an extra cache ref for the given property
     *                                (in cases where the same property may be used for different outputs
     *                                - i.e. datetime, money etc.)
     * @return mixed
     * @throws \EE_Error
     */
    public function get_pretty($field_name, $extra_cache_ref = null)
    {
        return $this->_get_cached_property($field_name, true, $extra_cache_ref);
    }



    /**
     * This simply returns the datetime for the given field name
     * Note: this protected function is called by the wrapper get_date or get_time or get_datetime functions
     * (and the equivalent e_date, e_time, e_datetime).
     *
     * @access   protected
     * @param string   $field_name   Field on the instantiated EE_Base_Class child object
     * @param string   $dt_frmt      valid datetime format used for date
     *                               (if '' then we just use the default on the field,
     *                               if NULL we use the last-used format)
     * @param string   $tm_frmt      Same as above except this is for time format
     * @param string   $date_or_time if NULL then both are returned, otherwise "D" = only date and "T" = only time.
     * @param  boolean $echo         Whether the dtt is echoing using pretty echoing or just returned using vanilla get
     * @return string|bool|EE_Error string on success, FALSE on fail, or EE_Error Exception is thrown
     *                               if field is not a valid dtt field, or void if echoing
     * @throws \EE_Error
     */
    protected function _get_datetime($field_name, $dt_frmt = '', $tm_frmt = '', $date_or_time = '', $echo = false)
    {
        // clear cached property
        $this->_clear_cached_property($field_name);
        //reset format properties because they are used in get()
        $this->_dt_frmt = $dt_frmt !== '' ? $dt_frmt : $this->_dt_frmt;
        $this->_tm_frmt = $tm_frmt !== '' ? $tm_frmt : $this->_tm_frmt;
        if ($echo) {
            $this->e($field_name, $date_or_time);
            return '';
        }
        return $this->get($field_name, $date_or_time);
    }



    /**
     * below are wrapper functions for the various datetime outputs that can be obtained for JUST returning the date
     * portion of a datetime value. (note the only difference between get_ and e_ is one returns the value and the
     * other echoes the pretty value for dtt)
     *
     * @param  string $field_name name of model object datetime field holding the value
     * @param  string $format     format for the date returned (if NULL we use default in dt_frmt property)
     * @return string            datetime value formatted
     * @throws \EE_Error
     */
    public function get_date($field_name, $format = '')
    {
        return $this->_get_datetime($field_name, $format, null, 'D');
    }



    /**
     * @param      $field_name
     * @param string $format
     * @throws \EE_Error
     */
    public function e_date($field_name, $format = '')
    {
        $this->_get_datetime($field_name, $format, null, 'D', true);
    }



    /**
     * below are wrapper functions for the various datetime outputs that can be obtained for JUST returning the time
     * portion of a datetime value. (note the only difference between get_ and e_ is one returns the value and the
     * other echoes the pretty value for dtt)
     *
     * @param  string $field_name name of model object datetime field holding the value
     * @param  string $format     format for the time returned ( if NULL we use default in tm_frmt property)
     * @return string             datetime value formatted
     * @throws \EE_Error
     */
    public function get_time($field_name, $format = '')
    {
        return $this->_get_datetime($field_name, null, $format, 'T');
    }



    /**
     * @param      $field_name
     * @param string $format
     * @throws \EE_Error
     */
    public function e_time($field_name, $format = '')
    {
        $this->_get_datetime($field_name, null, $format, 'T', true);
    }



    /**
     * below are wrapper functions for the various datetime outputs that can be obtained for returning the date AND
     * time portion of a datetime value. (note the only difference between get_ and e_ is one returns the value and the
     * other echoes the pretty value for dtt)
     *
     * @param  string $field_name name of model object datetime field holding the value
     * @param  string $dt_frmt    format for the date returned (if NULL we use default in dt_frmt property)
     * @param  string $tm_frmt    format for the time returned (if NULL we use default in tm_frmt property)
     * @return string             datetime value formatted
     * @throws \EE_Error
     */
    public function get_datetime($field_name, $dt_frmt = '', $tm_frmt = '')
    {
        return $this->_get_datetime($field_name, $dt_frmt, $tm_frmt);
    }



    /**
     * @param string $field_name
     * @param string $dt_frmt
     * @param string $tm_frmt
     * @throws \EE_Error
     */
    public function e_datetime($field_name, $dt_frmt = '', $tm_frmt = '')
    {
        $this->_get_datetime($field_name, $dt_frmt, $tm_frmt, null, true);
    }



    /**
     * Get the i8ln value for a date using the WordPress @see date_i18n function.
     *
     * @param string $field_name The EE_Datetime_Field reference for the date being retrieved.
     * @param string $format     PHP valid date/time string format.  If none is provided then the internal set format
     *                           on the object will be used.
     * @return string Date and time string in set locale or false if no field exists for the given
     * @throws \EE_Error
     *                           field name.
     */
    public function get_i18n_datetime($field_name, $format = '')
    {
        $format = empty($format) ? $this->_dt_frmt . ' ' . $this->_tm_frmt : $format;
        return date_i18n(
            $format,
            EEH_DTT_Helper::get_timestamp_with_offset($this->get_raw($field_name), $this->_timezone)
        );
    }



    /**
     * This method validates whether the given field name is a valid field on the model object as well as it is of a
     * type EE_Datetime_Field.  On success there will be returned the field settings.  On fail an EE_Error exception is
     * thrown.
     *
     * @param  string $field_name The field name being checked
     * @throws EE_Error
     * @return EE_Datetime_Field
     */
    protected function _get_dtt_field_settings($field_name)
    {
        $field = $this->get_model()->field_settings_for($field_name);
        //check if field is dtt
        if ($field instanceof EE_Datetime_Field) {
            return $field;
        } else {
            throw new EE_Error(sprintf(__('The field name "%s" has been requested for the EE_Base_Class datetime functions and it is not a valid EE_Datetime_Field.  Please check the spelling of the field and make sure it has been setup as a EE_Datetime_Field in the %s model constructor',
                'event_espresso'), $field_name, self::_get_model_classname(get_class($this))));
        }
    }




    /**
     * NOTE ABOUT BELOW:
     * These convenience date and time setters are for setting date and time independently.  In other words you might
     * want to change the time on a datetime_field but leave the date the same (or vice versa). IF on the other hand
     * you want to set both date and time at the same time, you can just use the models default set($fieldname,$value)
     * method and make sure you send the entire datetime value for setting.
     */
    /**
     * sets the time on a datetime property
     *
     * @access protected
     * @param string|Datetime $time      a valid time string for php datetime functions (or DateTime object)
     * @param string          $fieldname the name of the field the time is being set on (must match a EE_Datetime_Field)
     * @throws \EE_Error
     */
    protected function _set_time_for($time, $fieldname)
    {
        $this->_set_date_time('T', $time, $fieldname);
    }



    /**
     * sets the date on a datetime property
     *
     * @access protected
     * @param string|DateTime $date      a valid date string for php datetime functions ( or DateTime object)
     * @param string          $fieldname the name of the field the date is being set on (must match a EE_Datetime_Field)
     * @throws \EE_Error
     */
    protected function _set_date_for($date, $fieldname)
    {
        $this->_set_date_time('D', $date, $fieldname);
    }



    /**
     * This takes care of setting a date or time independently on a given model object property. This method also
     * verifies that the given fieldname matches a model object property and is for a EE_Datetime_Field field
     *
     * @access protected
     * @param string          $what           "T" for time, 'B' for both, 'D' for Date.
     * @param string|DateTime $datetime_value A valid Date or Time string (or DateTime object)
     * @param string          $fieldname      the name of the field the date OR time is being set on (must match a
     *                                        EE_Datetime_Field property)
     * @throws \EE_Error
     */
    protected function _set_date_time($what = 'T', $datetime_value, $fieldname)
    {
        $field = $this->_get_dtt_field_settings($fieldname);
        $field->set_timezone($this->_timezone);
        $field->set_date_format($this->_dt_frmt);
        $field->set_time_format($this->_tm_frmt);
        switch ($what) {
            case 'T' :
                $this->_fields[$fieldname] = $field->prepare_for_set_with_new_time(
                    $datetime_value,
                    $this->_fields[$fieldname]
                );
                break;
            case 'D' :
                $this->_fields[$fieldname] = $field->prepare_for_set_with_new_date(
                    $datetime_value,
                    $this->_fields[$fieldname]
                );
                break;
            case 'B' :
                $this->_fields[$fieldname] = $field->prepare_for_set($datetime_value);
                break;
        }
        $this->_clear_cached_property($fieldname);
    }



    /**
     * This will return a timestamp for the website timezone but ONLY when the current website timezone is different
     * than the timezone set for the website. NOTE, this currently only works well with methods that return values.  If
     * you use it with methods that echo values the $_timestamp property may not get reset to its original value and
     * that could lead to some unexpected results!
     *
     * @access public
     * @param string               $field_name This is the name of the field on the object that contains the date/time
     *                                         value being returned.
     * @param string               $callback   must match a valid method in this class (defaults to get_datetime)
     * @param mixed (array|string) $args       This is the arguments that will be passed to the callback.
     * @param string               $prepend    You can include something to prepend on the timestamp
     * @param string               $append     You can include something to append on the timestamp
     * @throws EE_Error
     * @return string timestamp
     */
    public function display_in_my_timezone(
        $field_name,
        $callback = 'get_datetime',
        $args = null,
        $prepend = '',
        $append = ''
    ) {
        $timezone = EEH_DTT_Helper::get_timezone();
        if ($timezone === $this->_timezone) {
            return '';
        }
        $original_timezone = $this->_timezone;
        $this->set_timezone($timezone);
        $fn = (array)$field_name;
        $args = array_merge($fn, (array)$args);
        if ( ! method_exists($this, $callback)) {
            throw new EE_Error(
                sprintf(
                    __(
                        'The method named "%s" given as the callback param in "display_in_my_timezone" does not exist.  Please check your spelling',
                        'event_espresso'
                    ),
                    $callback
                )
            );
        }
        $args = (array)$args;
        $return = $prepend . call_user_func_array(array($this, $callback), $args) . $append;
        $this->set_timezone($original_timezone);
        return $return;
    }



    /**
     * Deletes this model object.
     * This calls the `EE_Base_Class::_delete` method.  Child classes wishing to change default behaviour should
     * override
     * `EE_Base_Class::_delete` NOT this class.
     *
     * @return boolean | int
     * @throws \EE_Error
     */
    public function delete()
    {
        /**
         * Called just before the `EE_Base_Class::_delete` method call.
         * Note: `EE_Base_Class::_delete` might be overridden by child classes so any client code hooking into these actions
         * should be aware that `_delete` may not always result in a permanent delete.  For example, `EE_Soft_Delete_Base_Class::_delete`
         * soft deletes (trash) the object and does not permanently delete it.
         *
         * @param EE_Base_Class $model_object about to be 'deleted'
         */
        do_action('AHEE__EE_Base_Class__delete__before', $this);
        $result = $this->_delete();
        /**
         * Called just after the `EE_Base_Class::_delete` method call.
         * Note: `EE_Base_Class::_delete` might be overridden by child classes so any client code hooking into these actions
         * should be aware that `_delete` may not always result in a permanent delete.  For example `EE_Soft_Base_Class::_delete`
         * soft deletes (trash) the object and does not permanently delete it.
         *
         * @param EE_Base_Class $model_object that was just 'deleted'
         * @param boolean       $result
         */
        do_action('AHEE__EE_Base_Class__delete__end', $this, $result);
        return $result;
    }



    /**
     * Calls the specific delete method for the instantiated class.
     * This method is called by the public `EE_Base_Class::delete` method.  Any child classes desiring to override
     * default functionality for "delete" (which is to call `permanently_delete`) should override this method NOT
     * `EE_Base_Class::delete`
     *
     * @return bool|int
     * @throws \EE_Error
     */
    protected function _delete()
    {
        return $this->delete_permanently();
    }



    /**
     * Deletes this model object permanently from db (but keep in mind related models my block the delete and return an
     * error)
     *
     * @return bool | int
     * @throws \EE_Error
     */
    public function delete_permanently()
    {
        /**
         * Called just before HARD deleting a model object
         *
         * @param EE_Base_Class $model_object about to be 'deleted'
         */
        do_action('AHEE__EE_Base_Class__delete_permanently__before', $this);
        $model = $this->get_model();
        $result = $model->delete_permanently_by_ID($this->ID());
        $this->refresh_cache_of_related_objects();
        /**
         * Called just after HARD deleting a model object
         *
         * @param EE_Base_Class $model_object that was just 'deleted'
         * @param boolean       $result
         */
        do_action('AHEE__EE_Base_Class__delete_permanently__end', $this, $result);
        return $result;
    }



    /**
     * When this model object is deleted, it may still be cached on related model objects. This clears the cache of
     * related model objects
     *
     * @throws \EE_Error
     */
    public function refresh_cache_of_related_objects()
    {
        foreach ($this->get_model()->relation_settings() as $relation_name => $relation_obj) {
            if ( ! empty($this->_model_relations[$relation_name])) {
                $related_objects = $this->_model_relations[$relation_name];
                if ($relation_obj instanceof EE_Belongs_To_Relation) {
                    //this relation only stores a single model object, not an array
                    //but let's make it consistent
                    $related_objects = array($related_objects);
                }
                foreach ($related_objects as $related_object) {
                    //only refresh their cache if they're in memory
                    if ($related_object instanceof EE_Base_Class) {
                        $related_object->clear_cache($this->get_model()->get_this_model_name(), $this);
                    }
                }
            }
        }
    }



    /**
     *        Saves this object to the database. An array may be supplied to set some values on this
     * object just before saving.
     *
     * @access public
     * @param array $set_cols_n_values keys are field names, values are their new values,
     *                                 if provided during the save() method (often client code will change the fields'
     *                                 values before calling save)
     * @throws \EE_Error
     * @return int , 1 on a successful update, the ID of the new entry on insert; 0 on failure or if the model object
     *                                 isn't allowed to persist (as determined by EE_Base_Class::allow_persist())
     */
    public function save($set_cols_n_values = array())
    {
        /**
         * Filters the fields we're about to save on the model object
         *
         * @param array         $set_cols_n_values
         * @param EE_Base_Class $model_object
         */
        $set_cols_n_values = (array)apply_filters('FHEE__EE_Base_Class__save__set_cols_n_values', $set_cols_n_values,
            $this);
        //set attributes as provided in $set_cols_n_values
        foreach ($set_cols_n_values as $column => $value) {
            $this->set($column, $value);
        }
        /**
         * Saving a model object.
         * Before we perform a save, this action is fired.
         *
         * @param EE_Base_Class $model_object the model object about to be saved.
         */
        do_action('AHEE__EE_Base_Class__save__begin', $this);
        if ( ! $this->allow_persist()) {
            return 0;
        }
        //now get current attribute values
        $save_cols_n_values = $this->_fields;
        //if the object already has an ID, update it. Otherwise, insert it
        //also: change the assumption about values passed to the model NOT being prepare dby the model object. They have been
        $old_assumption_concerning_value_preparation = $this->get_model()
                                                            ->get_assumption_concerning_values_already_prepared_by_model_object();
        $this->get_model()->assume_values_already_prepared_by_model_object(true);
        //does this model have an autoincrement PK?
        if ($this->get_model()->has_primary_key_field()) {
            if ($this->get_model()->get_primary_key_field()->is_auto_increment()) {
                //ok check if it's set, if so: update; if not, insert
                if ( ! empty($save_cols_n_values[self::_get_primary_key_name(get_class($this))])) {
                    $results = $this->get_model()->update_by_ID($save_cols_n_values, $this->ID());
                } else {
                    unset($save_cols_n_values[self::_get_primary_key_name(get_class($this))]);
                    $results = $this->get_model()->insert($save_cols_n_values);
                    if ($results) {
                        //if successful, set the primary key
                        //but don't use the normal SET method, because it will check if
                        //an item with the same ID exists in the mapper & db, then
                        //will find it in the db (because we just added it) and THAT object
                        //will get added to the mapper before we can add this one!
                        //but if we just avoid using the SET method, all that headache can be avoided
                        $pk_field_name = self::_get_primary_key_name(get_class($this));
                        $this->_fields[$pk_field_name] = $results;
                        $this->_clear_cached_property($pk_field_name);
                        $this->get_model()->add_to_entity_map($this);
                        $this->_update_cached_related_model_objs_fks();
                    }
                }
            } else {//PK is NOT auto-increment
                //so check if one like it already exists in the db
                if ($this->get_model()->exists_by_ID($this->ID())) {
                    if (WP_DEBUG && ! $this->in_entity_map()) {
                        throw new EE_Error(
                            sprintf(
                                __('Using a model object %1$s that is NOT in the entity map, can lead to unexpected errors. You should either: %4$s 1. Put it in the entity mapper by calling %2$s %4$s 2. Discard this model object and use what is in the entity mapper %4$s 3. Fetch from the database using %3$s',
                                    'event_espresso'),
                                get_class($this),
                                get_class($this->get_model()) . '::instance()->add_to_entity_map()',
                                get_class($this->get_model()) . '::instance()->get_one_by_ID()',
                                '<br />'
                            )
                        );
                    }
                    $results = $this->get_model()->update_by_ID($save_cols_n_values, $this->ID());
                } else {
                    $results = $this->get_model()->insert($save_cols_n_values);
                    $this->_update_cached_related_model_objs_fks();
                }
            }
        } else {//there is NO primary key
            $already_in_db = false;
            foreach ($this->get_model()->unique_indexes() as $index) {
                $uniqueness_where_params = array_intersect_key($save_cols_n_values, $index->fields());
                if ($this->get_model()->exists(array($uniqueness_where_params))) {
                    $already_in_db = true;
                }
            }
            if ($already_in_db) {
                $combined_pk_fields_n_values = array_intersect_key($save_cols_n_values,
                    $this->get_model()->get_combined_primary_key_fields());
                $results = $this->get_model()->update($save_cols_n_values, $combined_pk_fields_n_values);
            } else {
                $results = $this->get_model()->insert($save_cols_n_values);
            }
        }
        //restore the old assumption about values being prepared by the model object
        $this->get_model()
             ->assume_values_already_prepared_by_model_object($old_assumption_concerning_value_preparation);
        /**
         * After saving the model object this action is called
         *
         * @param EE_Base_Class $model_object which was just saved
         * @param boolean|int   $results      if it were updated, TRUE or FALSE; if it were newly inserted
         *                                    the new ID (or 0 if an error occurred and it wasn't updated)
         */
        do_action('AHEE__EE_Base_Class__save__end', $this, $results);
        return $results;
    }



    /**
     * Updates the foreign key on related models objects pointing to this to have this model object's ID
     * as their foreign key.  If the cached related model objects already exist in the db, saves them (so that the DB
     * is consistent) Especially useful in case we JUST added this model object ot the database and we want to let its
     * cached relations with foreign keys to it know about that change. Eg: we've created a transaction but haven't
     * saved it to the db. We also create a registration and don't save it to the DB, but we DO cache it on the
     * transaction. Now, when we save the transaction, the registration's TXN_ID will be automatically updated, whether
     * or not they exist in the DB (if they do, their DB records will be automatically updated)
     *
     * @return void
     * @throws \EE_Error
     */
    protected function _update_cached_related_model_objs_fks()
    {
        foreach ($this->get_model()->relation_settings() as $relation_name => $relation_obj) {
            if ($relation_obj instanceof EE_Has_Many_Relation) {
                foreach ($this->get_all_from_cache($relation_name) as $related_model_obj_in_cache) {
                    $fk_to_this = $related_model_obj_in_cache->get_model()->get_foreign_key_to(
                        $this->get_model()->get_this_model_name()
                    );
                    $related_model_obj_in_cache->set($fk_to_this->get_name(), $this->ID());
                    if ($related_model_obj_in_cache->ID()) {
                        $related_model_obj_in_cache->save();
                    }
                }
            }
        }
    }



    /**
     * Saves this model object and its NEW cached relations to the database.
     * (Meaning, for now, IT DOES NOT WORK if the cached items already exist in the DB.
     * In order for that to work, we would need to mark model objects as dirty/clean...
     * because otherwise, there's a potential for infinite looping of saving
     * Saves the cached related model objects, and ensures the relation between them
     * and this object and properly setup
     *
     * @return int ID of new model object on save; 0 on failure+
     * @throws \EE_Error
     */
    public function save_new_cached_related_model_objs()
    {
        //make sure this has been saved
        if ( ! $this->ID()) {
            $id = $this->save();
        } else {
            $id = $this->ID();
        }
        //now save all the NEW cached model objects  (ie they don't exist in the DB)
        foreach ($this->get_model()->relation_settings() as $relationName => $relationObj) {
            if ($this->_model_relations[$relationName]) {
                //is this a relation where we should expect just ONE related object (ie, EE_Belongs_To_relation)
                //or MANY related objects (ie, EE_HABTM_Relation or EE_Has_Many_Relation)?
                if ($relationObj instanceof EE_Belongs_To_Relation) {
                    //add a relation to that relation type (which saves the appropriate thing in the process)
                    //but ONLY if it DOES NOT exist in the DB
                    /* @var $related_model_obj EE_Base_Class */
                    $related_model_obj = $this->_model_relations[$relationName];
                    //					if( ! $related_model_obj->ID()){
                    $this->_add_relation_to($related_model_obj, $relationName);
                    $related_model_obj->save_new_cached_related_model_objs();
                    //					}
                } else {
                    foreach ($this->_model_relations[$relationName] as $related_model_obj) {
                        //add a relation to that relation type (which saves the appropriate thing in the process)
                        //but ONLY if it DOES NOT exist in the DB
                        //						if( ! $related_model_obj->ID()){
                        $this->_add_relation_to($related_model_obj, $relationName);
                        $related_model_obj->save_new_cached_related_model_objs();
                        //						}
                    }
                }
            }
        }
        return $id;
    }



    /**
     * for getting a model while instantiated.
     *
     * @return \EEM_Base | \EEM_CPT_Base
     */
    public function get_model()
    {
        $modelName = self::_get_model_classname(get_class($this));
        return self::_get_model_instance_with_name($modelName, $this->_timezone);
    }



    /**
     * @param $props_n_values
     * @param $classname
     * @return mixed bool|EE_Base_Class|EEM_CPT_Base
     * @throws \EE_Error
     */
    protected static function _get_object_from_entity_mapper($props_n_values, $classname)
    {
        //TODO: will not work for Term_Relationships because they have no PK!
        $primary_id_ref = self::_get_primary_key_name($classname);
        if (array_key_exists($primary_id_ref, $props_n_values) && ! empty($props_n_values[$primary_id_ref])) {
            $id = $props_n_values[$primary_id_ref];
            return self::_get_model($classname)->get_from_entity_map($id);
        }
        return false;
    }



    /**
     * This is called by child static "new_instance" method and we'll check to see if there is an existing db entry for
     * the primary key (if present in incoming values). If there is a key in the incoming array that matches the
     * primary key for the model AND it is not null, then we check the db. If there's a an object we return it.  If not
     * we return false.
     *
     * @param  array  $props_n_values   incoming array of properties and their values
     * @param  string $classname        the classname of the child class
     * @param null    $timezone
     * @param array   $date_formats     incoming date_formats in an array where the first value is the
     *                                  date_format and the second value is the time format
     * @return mixed (EE_Base_Class|bool)
     * @throws \EE_Error
     */
    protected static function _check_for_object($props_n_values, $classname, $timezone = null, $date_formats = array())
    {
        $existing = null;
        if (self::_get_model($classname)->has_primary_key_field()) {
            $primary_id_ref = self::_get_primary_key_name($classname);
            if (array_key_exists($primary_id_ref, $props_n_values)
                && ! empty($props_n_values[$primary_id_ref])
            ) {
                $existing = self::_get_model($classname, $timezone)->get_one_by_ID(
                    $props_n_values[$primary_id_ref]
                );
            }
        } elseif (self::_get_model($classname, $timezone)->has_all_combined_primary_key_fields($props_n_values)) {
            //no primary key on this model, but there's still a matching item in the DB
            $existing = self::_get_model($classname, $timezone)->get_one_by_ID(
                self::_get_model($classname, $timezone)->get_index_primary_key_string($props_n_values)
            );
        }
        if ($existing) {
            //set date formats if present before setting values
            if ( ! empty($date_formats) && is_array($date_formats)) {
                $existing->set_date_format($date_formats[0]);
                $existing->set_time_format($date_formats[1]);
            } else {
                //set default formats for date and time
                $existing->set_date_format(get_option('date_format'));
                $existing->set_time_format(get_option('time_format'));
            }
            foreach ($props_n_values as $property => $field_value) {
                $existing->set($property, $field_value);
            }
            return $existing;
        } else {
            return false;
        }
    }



    /**
     * Gets the EEM_*_Model for this class
     *
     * @access public now, as this is more convenient
     * @param      $classname
     * @param null $timezone
     * @throws EE_Error
     * @return EEM_Base
     */
    protected static function _get_model($classname, $timezone = null)
    {
        //find model for this class
        if ( ! $classname) {
            throw new EE_Error(
                sprintf(
                    __(
                        "What were you thinking calling _get_model(%s)?? You need to specify the class name",
                        "event_espresso"
                    ),
                    $classname
                )
            );
        }
        $modelName = self::_get_model_classname($classname);
        return self::_get_model_instance_with_name($modelName, $timezone);
    }



    /**
     * Gets the model instance (eg instance of EEM_Attendee) given its classname (eg EE_Attendee)
     *
     * @param string $model_classname
     * @param null   $timezone
     * @return EEM_Base
     */
    protected static function _get_model_instance_with_name($model_classname, $timezone = null)
    {
        $model_classname = str_replace('EEM_', '', $model_classname);
        $model = EE_Registry::instance()->load_model($model_classname);
        $model->set_timezone($timezone);
        return $model;
    }



    /**
     * If a model name is provided (eg Registration), gets the model classname for that model.
     * Also works if a model class's classname is provided (eg EE_Registration).
     *
     * @param null $model_name
     * @return string like EEM_Attendee
     */
    private static function _get_model_classname($model_name = null)
    {
        if (strpos($model_name, "EE_") === 0) {
            $model_classname = str_replace("EE_", "EEM_", $model_name);
        } else {
            $model_classname = "EEM_" . $model_name;
        }
        return $model_classname;
    }



    /**
     * returns the name of the primary key attribute
     *
     * @param null $classname
     * @throws EE_Error
     * @return string
     */
    protected static function _get_primary_key_name($classname = null)
    {
        if ( ! $classname) {
            throw new EE_Error(
                sprintf(
                    __("What were you thinking calling _get_primary_key_name(%s)", "event_espresso"),
                    $classname
                )
            );
        }
        return self::_get_model($classname)->get_primary_key_field()->get_name();
    }



    /**
     * Gets the value of the primary key.
     * If the object hasn't yet been saved, it should be whatever the model field's default was
     * (eg, if this were the EE_Event class, look at the primary key field on EEM_Event and see what its default value
     * is. Usually defaults for integer primary keys are 0; string primary keys are usually NULL).
     *
     * @return mixed, if the primary key is of type INT it'll be an int. Otherwise it could be a string
     * @throws \EE_Error
     */
    public function ID()
    {
        //now that we know the name of the variable, use a variable variable to get its value and return its
        if ($this->get_model()->has_primary_key_field()) {
            return $this->_fields[self::_get_primary_key_name(get_class($this))];
        } else {
            return $this->get_model()->get_index_primary_key_string($this->_fields);
        }
    }



    /**
     * Adds a relationship to the specified EE_Base_Class object, given the relationship's name. Eg, if the current
     * model is related to a group of events, the $relationName should be 'Event', and should be a key in the EE
     * Model's $_model_relations array. If this model object doesn't exist in the DB, just caches the related thing
     *
     * @param mixed  $otherObjectModelObjectOrID       EE_Base_Class or the ID of the other object
     * @param string $relationName                     eg 'Events','Question',etc.
     *                                                 an attendee to a group, you also want to specify which role they
     *                                                 will have in that group. So you would use this parameter to
     *                                                 specify array('role-column-name'=>'role-id')
     * @param array  $extra_join_model_fields_n_values You can optionally include an array of key=>value pairs that
     *                                                 allow you to further constrict the relation to being added.
     *                                                 However, keep in mind that the columns (keys) given must match a
     *                                                 column on the JOIN table and currently only the HABTM models
     *                                                 accept these additional conditions.  Also remember that if an
     *                                                 exact match isn't found for these extra cols/val pairs, then a
     *                                                 NEW row is created in the join table.
     * @param null   $cache_id
     * @throws EE_Error
     * @return EE_Base_Class the object the relation was added to
     */
    public function _add_relation_to(
        $otherObjectModelObjectOrID,
        $relationName,
        $extra_join_model_fields_n_values = array(),
        $cache_id = null
    ) {
        //if this thing exists in the DB, save the relation to the DB
        if ($this->ID()) {
            $otherObject = $this->get_model()
                                ->add_relationship_to($this, $otherObjectModelObjectOrID, $relationName,
                                    $extra_join_model_fields_n_values);
            //clear cache so future get_many_related and get_first_related() return new results.
            $this->clear_cache($relationName, $otherObject, true);
            if ($otherObject instanceof EE_Base_Class) {
                $otherObject->clear_cache($this->get_model()->get_this_model_name(), $this);
            }
        } else {
            //this thing doesn't exist in the DB,  so just cache it
            if ( ! $otherObjectModelObjectOrID instanceof EE_Base_Class) {
                throw new EE_Error(sprintf(
                    __('Before a model object is saved to the database, calls to _add_relation_to must be passed an actual object, not just an ID. You provided %s as the model object to a %s',
                        'event_espresso'),
                    $otherObjectModelObjectOrID,
                    get_class($this)
                ));
            } else {
                $otherObject = $otherObjectModelObjectOrID;
            }
            $this->cache($relationName, $otherObjectModelObjectOrID, $cache_id);
        }
        if ($otherObject instanceof EE_Base_Class) {
            //fix the reciprocal relation too
            if ($otherObject->ID()) {
                //its saved so assumed relations exist in the DB, so we can just
                //clear the cache so future queries use the updated info in the DB
                $otherObject->clear_cache($this->get_model()->get_this_model_name(), null, true);
            } else {
                //it's not saved, so it caches relations like this
                $otherObject->cache($this->get_model()->get_this_model_name(), $this);
            }
        }
        return $otherObject;
    }



    /**
     * Removes a relationship to the specified EE_Base_Class object, given the relationships' name. Eg, if the current
     * model is related to a group of events, the $relationName should be 'Events', and should be a key in the EE
     * Model's $_model_relations array. If this model object doesn't exist in the DB, just removes the related thing
     * from the cache
     *
     * @param mixed  $otherObjectModelObjectOrID
     *                EE_Base_Class or the ID of the other object, OR an array key into the cache if this isn't saved
     *                to the DB yet
     * @param string $relationName
     * @param array  $where_query
     *                You can optionally include an array of key=>value pairs that allow you to further constrict the
     *                relation to being added. However, keep in mind that the columns (keys) given must match a column
     *                on the JOIN table and currently only the HABTM models accept these additional conditions. Also
     *                remember that if an exact match isn't found for these extra cols/val pairs, then a NEW row is
     *                created in the join table.
     * @return EE_Base_Class the relation was removed from
     * @throws \EE_Error
     */
    public function _remove_relation_to($otherObjectModelObjectOrID, $relationName, $where_query = array())
    {
        if ($this->ID()) {
            //if this exists in the DB, save the relation change to the DB too
            $otherObject = $this->get_model()
                                ->remove_relationship_to($this, $otherObjectModelObjectOrID, $relationName,
                                    $where_query);
            $this->clear_cache($relationName, $otherObject);
        } else {
            //this doesn't exist in the DB, just remove it from the cache
            $otherObject = $this->clear_cache($relationName, $otherObjectModelObjectOrID);
        }
        if ($otherObject instanceof EE_Base_Class) {
            $otherObject->clear_cache($this->get_model()->get_this_model_name(), $this);
        }
        return $otherObject;
    }



    /**
     * Removes ALL the related things for the $relationName.
     *
     * @param string $relationName
     * @param array  $where_query_params like EEM_Base::get_all's $query_params[0] (where conditions)
     * @return EE_Base_Class
     * @throws \EE_Error
     */
    public function _remove_relations($relationName, $where_query_params = array())
    {
        if ($this->ID()) {
            //if this exists in the DB, save the relation change to the DB too
            $otherObjects = $this->get_model()->remove_relations($this, $relationName, $where_query_params);
            $this->clear_cache($relationName, null, true);
        } else {
            //this doesn't exist in the DB, just remove it from the cache
            $otherObjects = $this->clear_cache($relationName, null, true);
        }
        if (is_array($otherObjects)) {
            foreach ($otherObjects as $otherObject) {
                $otherObject->clear_cache($this->get_model()->get_this_model_name(), $this);
            }
        }
        return $otherObjects;
    }



    /**
     * Gets all the related model objects of the specified type. Eg, if the current class if
     * EE_Event, you could call $this->get_many_related('Registration') to get an array of all the
     * EE_Registration objects which related to this event. Note: by default, we remove the "default query params"
     * because we want to get even deleted items etc.
     *
     * @param string $relationName key in the model's _model_relations array
     * @param array  $query_params like EEM_Base::get_all
     * @return EE_Base_Class[] Results not necessarily indexed by IDs, because some results might not have primary keys
     * @throws \EE_Error
     *                             or might not be saved yet. Consider using EEM_Base::get_IDs() on these results if
     *                             you want IDs
     */
    public function get_many_related($relationName, $query_params = array())
    {
        if ($this->ID()) {
            //this exists in the DB, so get the related things from either the cache or the DB
            //if there are query parameters, forget about caching the related model objects.
            if ($query_params) {
                $related_model_objects = $this->get_model()->get_all_related($this, $relationName, $query_params);
            } else {
                //did we already cache the result of this query?
                $cached_results = $this->get_all_from_cache($relationName);
                if ( ! $cached_results) {
                    $related_model_objects = $this->get_model()->get_all_related($this, $relationName, $query_params);
                    //if no query parameters were passed, then we got all the related model objects
                    //for that relation. We can cache them then.
                    foreach ($related_model_objects as $related_model_object) {
                        $this->cache($relationName, $related_model_object);
                    }
                } else {
                    $related_model_objects = $cached_results;
                }
            }
        } else {
            //this doesn't exist in the DB, so just get the related things from the cache
            $related_model_objects = $this->get_all_from_cache($relationName);
        }
        return $related_model_objects;
    }



    /**
     * Instead of getting the related model objects, simply counts them. Ignores default_where_conditions by default,
     * unless otherwise specified in the $query_params
     *
     * @param string $relation_name  model_name like 'Event', or 'Registration'
     * @param array  $query_params   like EEM_Base::get_all's
     * @param string $field_to_count name of field to count by. By default, uses primary key
     * @param bool   $distinct       if we want to only count the distinct values for the column then you can trigger
     *                               that by the setting $distinct to TRUE;
     * @return int
     */
    public function count_related($relation_name, $query_params = array(), $field_to_count = null, $distinct = false)
    {
        return $this->get_model()->count_related($this, $relation_name, $query_params, $field_to_count, $distinct);
    }



    /**
     * Instead of getting the related model objects, simply sums up the values of the specified field.
     * Note: ignores default_where_conditions by default, unless otherwise specified in the $query_params
     *
     * @param string $relation_name model_name like 'Event', or 'Registration'
     * @param array  $query_params  like EEM_Base::get_all's
     * @param string $field_to_sum  name of field to count by.
     *                              By default, uses primary key (which doesn't make much sense, so you should probably
     *                              change it)
     * @return int
     */
    public function sum_related($relation_name, $query_params = array(), $field_to_sum = null)
    {
        return $this->get_model()->sum_related($this, $relation_name, $query_params, $field_to_sum);
    }



    /**
     * Gets the first (ie, one) related model object of the specified type.
     *
     * @param string $relationName key in the model's _model_relations array
     * @param array  $query_params like EEM_Base::get_all
     * @return EE_Base_Class (not an array, a single object)
     * @throws \EE_Error
     */
    public function get_first_related($relationName, $query_params = array())
    {
        if ($this->ID()) {//this exists in the DB, get from the cache OR the DB
            //if they've provided some query parameters, don't bother trying to cache the result
            //also make sure we're not caching the result of get_first_related
            //on a relation which should have an array of objects (because the cache might have an array of objects)
            if ($query_params
                || ! $this->get_model()->related_settings_for($relationName)
                     instanceof
                     EE_Belongs_To_Relation
            ) {
                $related_model_object = $this->get_model()->get_first_related($this, $relationName, $query_params);
            } else {
                //first, check if we've already cached the result of this query
                $cached_result = $this->get_one_from_cache($relationName);
                if ( ! $cached_result) {
                    $related_model_object = $this->get_model()->get_first_related($this, $relationName, $query_params);
                    $this->cache($relationName, $related_model_object);
                } else {
                    $related_model_object = $cached_result;
                }
            }
        } else {
            $related_model_object = null;
            //this doesn't exist in the Db, but maybe the relation is of type belongs to, and so the related thing might
            if ($this->get_model()->related_settings_for($relationName) instanceof EE_Belongs_To_Relation) {
                $related_model_object = $this->get_model()->get_first_related($this, $relationName, $query_params);
            }
            //this doesn't exist in the DB and apparently the thing it belongs to doesn't either, just get what's cached on this object
            if ( ! $related_model_object) {
                $related_model_object = $this->get_one_from_cache($relationName);
            }
        }
        return $related_model_object;
    }



    /**
     * Does a delete on all related objects of type $relationName and removes
     * the current model object's relation to them. If they can't be deleted (because
     * of blocking related model objects) does nothing. If the related model objects are
     * soft-deletable, they will be soft-deleted regardless of related blocking model objects.
     * If this model object doesn't exist yet in the DB, just removes its related things
     *
     * @param string $relationName
     * @param array  $query_params like EEM_Base::get_all's
     * @return int how many deleted
     * @throws \EE_Error
     */
    public function delete_related($relationName, $query_params = array())
    {
        if ($this->ID()) {
            $count = $this->get_model()->delete_related($this, $relationName, $query_params);
        } else {
            $count = count($this->get_all_from_cache($relationName));
            $this->clear_cache($relationName, null, true);
        }
        return $count;
    }



    /**
     * Does a hard delete (ie, removes the DB row) on all related objects of type $relationName and removes
     * the current model object's relation to them. If they can't be deleted (because
     * of blocking related model objects) just does a soft delete on it instead, if possible.
     * If the related thing isn't a soft-deletable model object, this function is identical
     * to delete_related(). If this model object doesn't exist in the DB, just remove its related things
     *
     * @param string $relationName
     * @param array  $query_params like EEM_Base::get_all's
     * @return int how many deleted (including those soft deleted)
     * @throws \EE_Error
     */
    public function delete_related_permanently($relationName, $query_params = array())
    {
        if ($this->ID()) {
            $count = $this->get_model()->delete_related_permanently($this, $relationName, $query_params);
        } else {
            $count = count($this->get_all_from_cache($relationName));
        }
        $this->clear_cache($relationName, null, true);
        return $count;
    }



    /**
     * is_set
     * Just a simple utility function children can use for checking if property exists
     *
     * @access  public
     * @param  string $field_name property to check
     * @return bool                              TRUE if existing,FALSE if not.
     */
    public function is_set($field_name)
    {
        return isset($this->_fields[$field_name]);
    }



    /**
     * Just a simple utility function children can use for checking if property (or properties) exists and throwing an
     * EE_Error exception if they don't
     *
     * @param  mixed (string|array) $properties properties to check
     * @throws EE_Error
     * @return bool                              TRUE if existing, throw EE_Error if not.
     */
    protected function _property_exists($properties)
    {
        foreach ((array)$properties as $property_name) {
            //first make sure this property exists
            if ( ! $this->_fields[$property_name]) {
                throw new EE_Error(
                    sprintf(
                        __(
                            'Trying to retrieve a non-existent property (%s).  Double check the spelling please',
                            'event_espresso'
                        ),
                        $property_name
                    )
                );
            }
        }
        return true;
    }



    /**
     * This simply returns an array of model fields for this object
     *
     * @return array
     * @throws \EE_Error
     */
    public function model_field_array()
    {
        $fields = $this->get_model()->field_settings(false);
        $properties = array();
        //remove prepended underscore
        foreach ($fields as $field_name => $settings) {
            $properties[$field_name] = $this->get($field_name);
        }
        return $properties;
    }



    /**
     * Very handy general function to allow for plugins to extend any child of EE_Base_Class.
     * If a method is called on a child of EE_Base_Class that doesn't exist, this function is called
     * (http://www.garfieldtech.com/blog/php-magic-call) and passed the method's name and arguments. Instead of
     * requiring a plugin to extend the EE_Base_Class (which works fine is there's only 1 plugin, but when will that
     * happen?) they can add a hook onto 'filters_hook_espresso__{className}__{methodName}' (eg,
     * filters_hook_espresso__EE_Answer__my_great_function) and accepts 2 arguments: the object on which the function
     * was called, and an array of the original arguments passed to the function. Whatever their callback function
     * returns will be returned by this function. Example: in functions.php (or in a plugin):
     * add_filter('FHEE__EE_Answer__my_callback','my_callback',10,3); function
     * my_callback($previousReturnValue,EE_Base_Class $object,$argsArray){
     * $returnString= "you called my_callback! and passed args:".implode(",",$argsArray);
     *        return $previousReturnValue.$returnString;
     * }
     * require('EE_Answer.class.php');
     * $answer= EE_Answer::new_instance(array('REG_ID' => 2,'QST_ID' => 3,'ANS_value' => The answer is 42'));
     * echo $answer->my_callback('monkeys',100);
     * //will output "you called my_callback! and passed args:monkeys,100"
     *
     * @param string $methodName name of method which was called on a child of EE_Base_Class, but which
     * @param array  $args       array of original arguments passed to the function
     * @throws EE_Error
     * @return mixed whatever the plugin which calls add_filter decides
     */
    public function __call($methodName, $args)
    {
        $className = get_class($this);
        $tagName = "FHEE__{$className}__{$methodName}";
        if ( ! has_filter($tagName)) {
            throw new EE_Error(
                sprintf(
                    __(
                        "Method %s on class %s does not exist! You can create one with the following code in functions.php or in a plugin: add_filter('%s','my_callback',10,3);function my_callback(\$previousReturnValue,EE_Base_Class \$object, \$argsArray){/*function body*/return \$whatever;}",
                        "event_espresso"
                    ),
                    $methodName,
                    $className,
                    $tagName
                )
            );
        }
        return apply_filters($tagName, null, $this, $args);
    }



    /**
     * Similar to insert_post_meta, adds a record in the Extra_Meta model's table with the given key and value.
     * A $previous_value can be specified in case there are many meta rows with the same key
     *
     * @param string $meta_key
     * @param string $meta_value
     * @param string $previous_value
     * @return int records updated (or BOOLEAN if we actually ended up inserting the extra meta row)
     * @throws \EE_Error
     * NOTE: if the values haven't changed, returns 0
     */
    public function update_extra_meta($meta_key, $meta_value, $previous_value = null)
    {
        $query_params = array(
            array(
                'EXM_key'  => $meta_key,
                'OBJ_ID'   => $this->ID(),
                'EXM_type' => $this->get_model()->get_this_model_name(),
            ),
        );
        if ($previous_value !== null) {
            $query_params[0]['EXM_value'] = $meta_value;
        }
        $existing_rows_like_that = EEM_Extra_Meta::instance()->get_all($query_params);
        if ( ! $existing_rows_like_that) {
            return $this->add_extra_meta($meta_key, $meta_value);
        } else {
            foreach ($existing_rows_like_that as $existing_row) {
                $existing_row->save(array('EXM_value' => $meta_value));
            }
            return count($existing_rows_like_that);
        }
    }



    /**
     * Adds a new extra meta record. If $unique is set to TRUE, we'll first double-check
     * no other extra meta for this model object have the same key. Returns TRUE if the
     * extra meta row was entered, false if not
     *
     * @param string  $meta_key
     * @param string  $meta_value
     * @param boolean $unique
     * @return boolean
     * @throws \EE_Error
     */
    public function add_extra_meta($meta_key, $meta_value, $unique = false)
    {
        if ($unique) {
            $existing_extra_meta = EEM_Extra_Meta::instance()->get_one(
                array(
                    array(
                        'EXM_key'  => $meta_key,
                        'OBJ_ID'   => $this->ID(),
                        'EXM_type' => $this->get_model()->get_this_model_name(),
                    ),
                )
            );
            if ($existing_extra_meta) {
                return false;
            }
        }
        $new_extra_meta = EE_Extra_Meta::new_instance(
            array(
                'EXM_key'   => $meta_key,
                'EXM_value' => $meta_value,
                'OBJ_ID'    => $this->ID(),
                'EXM_type'  => $this->get_model()->get_this_model_name(),
            )
        );
        $new_extra_meta->save();
        return true;
    }



    /**
     * Deletes all the extra meta rows for this record as specified by key. If $meta_value
     * is specified, only deletes extra meta records with that value.
     *
     * @param string $meta_key
     * @param string $meta_value
     * @return int number of extra meta rows deleted
     * @throws \EE_Error
     */
    public function delete_extra_meta($meta_key, $meta_value = null)
    {
        $query_params = array(
            array(
                'EXM_key'  => $meta_key,
                'OBJ_ID'   => $this->ID(),
                'EXM_type' => $this->get_model()->get_this_model_name(),
            ),
        );
        if ($meta_value !== null) {
            $query_params[0]['EXM_value'] = $meta_value;
        }
        return EEM_Extra_Meta::instance()->delete($query_params);
    }



    /**
     * Gets the extra meta with the given meta key. If you specify "single" we just return 1, otherwise
     * an array of everything found. Requires that this model actually have a relation of type EE_Has_Many_Any_Relation.
     * You can specify $default is case you haven't found the extra meta
     *
     * @param string  $meta_key
     * @param boolean $single
     * @param mixed   $default if we don't find anything, what should we return?
     * @return mixed single value if $single; array if ! $single
     * @throws \EE_Error
     */
    public function get_extra_meta($meta_key, $single = false, $default = null)
    {
        if ($single) {
            $result = $this->get_first_related('Extra_Meta', array(array('EXM_key' => $meta_key)));
            if ($result instanceof EE_Extra_Meta) {
                return $result->value();
            } else {
                return $default;
            }
        } else {
            $results = $this->get_many_related('Extra_Meta', array(array('EXM_key' => $meta_key)));
            if ($results) {
                $values = array();
                foreach ($results as $result) {
                    if ($result instanceof EE_Extra_Meta) {
                        $values[$result->ID()] = $result->value();
                    }
                }
                return $values;
            } else {
                return $default;
            }
        }
    }



    /**
     * Returns a simple array of all the extra meta associated with this model object.
     * If $one_of_each_key is true (Default), it will be an array of simple key-value pairs, keys being the
     * extra meta's key, and teh value being its value. However, if there are duplicate extra meta rows with
     * the same key, only one will be used. (eg array('foo'=>'bar','monkey'=>123))
     * If $one_of_each_key is false, it will return an array with the top-level keys being
     * the extra meta keys, but their values are also arrays, which have the extra-meta's ID as their sub-key, and
     * finally the extra meta's value as each sub-value. (eg
     * array('foo'=>array(1=>'bar',2=>'bill'),'monkey'=>array(3=>123)))
     *
     * @param boolean $one_of_each_key
     * @return array
     * @throws \EE_Error
     */
    public function all_extra_meta_array($one_of_each_key = true)
    {
        $return_array = array();
        if ($one_of_each_key) {
            $extra_meta_objs = $this->get_many_related('Extra_Meta', array('group_by' => 'EXM_key'));
            foreach ($extra_meta_objs as $extra_meta_obj) {
                if ($extra_meta_obj instanceof EE_Extra_Meta) {
                    $return_array[$extra_meta_obj->key()] = $extra_meta_obj->value();
                }
            }
        } else {
            $extra_meta_objs = $this->get_many_related('Extra_Meta');
            foreach ($extra_meta_objs as $extra_meta_obj) {
                if ($extra_meta_obj instanceof EE_Extra_Meta) {
                    if ( ! isset($return_array[$extra_meta_obj->key()])) {
                        $return_array[$extra_meta_obj->key()] = array();
                    }
                    $return_array[$extra_meta_obj->key()][$extra_meta_obj->ID()] = $extra_meta_obj->value();
                }
            }
        }
        return $return_array;
    }



    /**
     * Gets a pretty nice displayable nice for this model object. Often overridden
     *
     * @return string
     * @throws \EE_Error
     */
    public function name()
    {
        //find a field that's not a text field
        $field_we_can_use = $this->get_model()->get_a_field_of_type('EE_Text_Field_Base');
        if ($field_we_can_use) {
            return $this->get($field_we_can_use->get_name());
        } else {
            $first_few_properties = $this->model_field_array();
            $first_few_properties = array_slice($first_few_properties, 0, 3);
            $name_parts = array();
            foreach ($first_few_properties as $name => $value) {
                $name_parts[] = "$name:$value";
            }
            return implode(",", $name_parts);
        }
    }



    /**
     * in_entity_map
     * Checks if this model object has been proven to already be in the entity map
     *
     * @return boolean
     * @throws \EE_Error
     */
    public function in_entity_map()
    {
        if ($this->ID() && $this->get_model()->get_from_entity_map($this->ID()) === $this) {
            //well, if we looked, did we find it in the entity map?
            return true;
        } else {
            return false;
        }
    }



    /**
     * refresh_from_db
     * Makes sure the fields and values on this model object are in-sync with what's in the database.
     *
     * @throws EE_Error if this model object isn't in the entity mapper (because then you should
     * just use what's in the entity mapper and refresh it) and WP_DEBUG is TRUE
     */
    public function refresh_from_db()
    {
        if ($this->ID() && $this->in_entity_map()) {
            $this->get_model()->refresh_entity_map_from_db($this->ID());
        } else {
            //if it doesn't have ID, you shouldn't be asking to refresh it from teh database (because its not in the database)
            //if it has an ID but it's not in the map, and you're asking me to refresh it
            //that's kinda dangerous. You should just use what's in the entity map, or add this to the entity map if there's
            //absolutely nothing in it for this ID
            if (WP_DEBUG) {
                throw new EE_Error(
                    sprintf(
                        __('Trying to refresh a model object with ID "%1$s" that\'s not in the entity map? First off: you should put it in the entity map by calling %2$s. Second off, if you want what\'s in the database right now, you should just call %3$s yourself and discard this model object.',
                            'event_espresso'),
                        $this->ID(),
                        get_class($this->get_model()) . '::instance()->add_to_entity_map()',
                        get_class($this->get_model()) . '::instance()->refresh_entity_map()'
                    )
                );
            }
        }
    }



    /**
     * Because some other plugins, like Advanced Cron Manager, expect all objects to have this method
     * (probably a bad assumption they have made, oh well)
     *
     * @return string
     */
    public function __toString()
    {
        try {
            return sprintf('%s (%s)', $this->name(), $this->ID());
        } catch (Exception $e) {
            EE_Error::add_error($e->getMessage(), __FILE__, __FUNCTION__, __LINE__);
            return '';
        }
    }



    /**
     * Clear related model objects if they're already in the DB, because otherwise when we
     * UN-serialize this model object we'll need to be careful to add them to the entity map.
     * This means if we have made changes to those related model objects, and want to unserialize
     * the this model object on a subsequent request, changes to those related model objects will be lost.
     * Instead, those related model objects should be directly serialized and stored.
     * Eg, the following won't work:
     * $reg = EEM_Registration::instance()->get_one_by_ID( 123 );
     * $att = $reg->attendee();
     * $att->set( 'ATT_fname', 'Dirk' );
     * update_option( 'my_option', serialize( $reg ) );
     * //END REQUEST
     * //START NEXT REQUEST
     * $reg = get_option( 'my_option' );
     * $reg->attendee()->save();
     * And would need to be replace with:
     * $reg = EEM_Registration::instance()->get_one_by_ID( 123 );
     * $att = $reg->attendee();
     * $att->set( 'ATT_fname', 'Dirk' );
     * update_option( 'my_option', serialize( $reg ) );
     * //END REQUEST
     * //START NEXT REQUEST
     * $att = get_option( 'my_option' );
     * $att->save();
     *
     * @return array
     * @throws \EE_Error
     */
    public function __sleep()
    {
        foreach ($this->get_model()->relation_settings() as $relation_name => $relation_obj) {
            if ($relation_obj instanceof EE_Belongs_To_Relation) {
                $classname = 'EE_' . $this->get_model()->get_this_model_name();
                if (
                    $this->get_one_from_cache($relation_name) instanceof $classname
                    && $this->get_one_from_cache($relation_name)->ID()
                ) {
                    $this->clear_cache($relation_name, $this->get_one_from_cache($relation_name)->ID());
                }
            }
        }
        $this->_props_n_values_provided_in_constructor = array();
        return array_keys(get_object_vars($this));
    }



    /**
     * restore _props_n_values_provided_in_constructor
     * PLZ NOTE: this will reset the array to whatever fields values were present prior to serialization,
     * and therefore should NOT be used to determine if state change has occurred since initial construction.
     * At best, you would only be able to detect if state change has occurred during THIS request.
     */
    public function __wakeup()
    {
        $this->_props_n_values_provided_in_constructor = $this->_fields;
    }



}


