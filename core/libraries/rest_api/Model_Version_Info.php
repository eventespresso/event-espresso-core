<?php
namespace EventEspresso\core\libraries\rest_api;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Model_Version_Info
 * Class for things that bridge the gap between API resources and PHP models describing
 * the underlying data.
 * This should really be the only place in the API that is directly aware of models,
 * everywhere should go through here to learn about the models and interact with them.
 * This is done so the API can serve request`s for a previous version from data
 * from the current version of core
 *
 * @package            Event Espresso
 * @subpackage         eea-rest-api
 * @author             Mike Nelson
 */
class Model_Version_Info
{

    /**
     * Constant used in the $_model_changes array to indicate that a model
     * was completely new in this version
     */
    const model_added = 'model_added_in_this_version';

    /**
     * Top-level keys are versions (major and minor version numbers, eg "4.6")
     * next-level keys are model names (eg "Event") that underwent some change in that version
     * and the value is either Model_Version_Info::model_added (indicating the model is completely NEW in this version),
     * or it's an array where the values are model field names,
     * or API resource properties (ie, non-model fields that appear in REST API results)
     * If a version is missing then we don't know anything about what changes it introduced from the previous version
     *
     * @var array
     */
    protected $_model_changes = array();

    /**
     * top-level keys are version numbers,
     * next-level keys are model CLASSNAMES (even parent classnames),
     * and next-level keys are extra resource properties to attach to those models' resources,
     * and next-level key-value pairs, where the keys are:
     * 'raw', 'type', 'nullable', 'table_alias', 'table_column',  'always_available'
     *
     * @var array
     */
    protected $_resource_changes = array();

    /**
     * @var string indicating what version of the API was requested
     * (eg although core might be at version 4.8.11, they may have sent a request
     * for 4.6)
     */
    protected $_requested_version = null;

    /**
     * Keys are model names, values are their classnames.
     * We cache this so we only need to calculate this once per request
     *
     * @var array
     */
    protected $_cached_models_for_requested_version = null;

    /**
     * @var array
     */
    protected $_cached_model_changes_between_requested_version_and_current = null;

    /**
     * @var array
     */
    protected $_cached_resource_changes_between_requested_version_and_current = null;

    /**
     * 2d array where top-level keys are model names, 2nd-level keys are field names
     * and values are the actual field objects
     *
     * @var array
     */
    protected $_cached_fields_on_models = array();



    /**
     * Model_Version_Info constructor.
     *
     * @param string $requested_version
     */
    public function __construct($requested_version)
    {
        $this->_requested_version = $requested_version;
        $this->_model_changes = array(
            '4.8.29' => array(
                //first version where the REST API is in EE core, so no need
                //to specify how its different from the previous
            ),
        );
        //setup data for "extra" fields added onto resources which don't actually exist on models
        $this->_resource_changes = apply_filters(
            'FHEE__Model_Version_Info___construct__extra_resource_properties_for_models',
            array()
        );
        $defaults = array(
            'raw'              => false,
            'type'             => 'N/A',
            'nullable'         => true,
            'table_alias'      => 'N/A',
            'table_column'     => 'N/A',
            'always_available' => true,
        );
        foreach ($this->_resource_changes as $version => $model_classnames) {
            foreach ($model_classnames as $model_classname => $extra_fields) {
                foreach ($extra_fields as $fieldname => $field_data) {
                    $this->_resource_changes[$model_classname][$fieldname]['name'] = $fieldname;
                    foreach ($defaults as $attribute => $default_value) {
                        if (! isset($this->_resource_changes[$model_classname][$fieldname][$attribute])) {
                            $this->_resource_changes[$model_classname][$fieldname][$attribute] = $default_value;
                        }
                    }
                }
            }
        }
    }



    /**
     * Returns a slice of Model_Version_Info::model_changes()'s array
     * indicating exactly what changes happened between the current core version,
     * and the version requested
     *
     * @return array
     */
    public function model_changes_between_requested_version_and_current()
    {
        if ($this->_cached_model_changes_between_requested_version_and_current === null) {
            $model_changes = array();
            foreach ($this->model_changes() as $version => $models_changed_in_version) {
                if ($version <= \EED_Core_Rest_Api::core_version() && $version > $this->requested_version()) {
                    $model_changes[$version] = $models_changed_in_version;
                }
            }
            $this->_cached_model_changes_between_requested_version_and_current = $model_changes;
        }
        return $this->_cached_model_changes_between_requested_version_and_current;
    }



    /**
     * Returns a slice of Model_Version_Info::model_changes()'s array
     * indicating exactly what changes happened between the current core version,
     * and the version requested
     *
     * @return array
     */
    public function resource_changes_between_requested_version_and_current()
    {
        if ($this->_cached_resource_changes_between_requested_version_and_current === null) {
            $resource_changes = array();
            foreach ($this->resource_changes() as $version => $model_classnames) {
                if ($version <= \EED_Core_Rest_Api::core_version() && $version > $this->requested_version()) {
                    $resource_changes[$version] = $model_classnames;
                }
            }
            $this->_cached_resource_changes_between_requested_version_and_current = $resource_changes;
        }
        return $this->_cached_resource_changes_between_requested_version_and_current;
    }



    /**
     * If a request was sent to 'wp-json/ee/v4.7/events' this would be '4.7'
     *
     * @return string like '4.6'
     */
    public function requested_version()
    {
        return $this->_requested_version;
    }



    /**
     * Returns an array describing how the models have changed in each version of core
     * that supports the API (starting at 4.6)
     * Top-level keys are versions (major and minor version numbers, eg "4.6")
     * next-level keys are model names (eg "Event") that underwent some change in that version
     * and the value is either NULL (indicating the model is completely NEW in this version),
     * or it's an array where fields are value names.
     * If a version is missing then we don't know anything about what changes it introduced from the previous version
     *
     * @return array
     */
    public function model_changes()
    {
        return $this->_model_changes;
    }



    /**
     * Takes into account the requested version, and the current version, and
     * what changed between the two, and tries to return.
     * Analogous to EE_Registry::instance()->non_abstract_db_models
     *
     * @return array keys are model names, values are their classname
     */
    public function models_for_requested_version()
    {
        if ($this->_cached_models_for_requested_version === null) {
            $all_models_in_current_version = \EE_Registry::instance()->non_abstract_db_models;
            foreach ($this->model_changes_between_requested_version_and_current() as $version => $models_changed) {
                foreach ($models_changed as $model_name => $new_indicator_or_fields_added) {
                    if ($new_indicator_or_fields_added === Model_Version_Info::model_added) {
                        unset($all_models_in_current_version[$model_name]);
                    }
                }
            }
            $this->_cached_models_for_requested_version = apply_filters(
                'FHEE__EventEspresso_core_libraries_rest_api__models_for_requested_version',
                $all_models_in_current_version,
                $this
            );
        }
        return $this->_cached_models_for_requested_version;
    }



    /**
     * Determines if this is a valid model name in the requested version.
     * Similar to EE_Registry::instance()->is_model_name(), but takes the requested
     * version's models into account
     *
     * @param string $model_name eg 'Event'
     * @return boolean
     */
    public function is_model_name_in_this_version($model_name)
    {
        $model_names = $this->models_for_requested_version();
        if (isset($model_names[$model_name])) {
            return true;
        } else {
            return false;
        }
    }



    /**
     * Wrapper for EE_Registry::instance()->load_model(), but takes the requested
     * version's models into account
     *
     * @param string $model_name
     * @return \EEM_Base
     * @throws \EE_Error
     */
    public function load_model($model_name)
    {
        if ($this->is_model_name_in_this_version($model_name)) {
            return \EE_Registry::instance()->load_model($model_name);
        } else {
            throw new \EE_Error(
                sprintf(
                    __(
                        'Cannot load model "%1$s" because it does not exist in version %2$s of Event Espresso',
                        'event_espresso'
                    ),
                    $model_name,
                    $this->requested_version()
                )
            );
        }
    }



    /**
     * Gets all the fields that should exist on this model right now
     *
     * @param \EEM_Base $model
     * @return array|\EE_Model_Field_Base[]
     */
    public function fields_on_model_in_this_version($model)
    {
        if (! isset($this->_cached_fields_on_models[$model->get_this_model_name()])) {
            //get all model changes between the requested version and current core version
            $changes = $this->model_changes_between_requested_version_and_current();
            //fetch all fields currently on this model
            $current_fields = $model->field_settings();
            //remove all fields that have been added since
            foreach ($changes as $version => $changes_in_version) {
                if (
                    isset($changes_in_version[$model->get_this_model_name()])
                    && $changes_in_version[$model->get_this_model_name()] !== Model_Version_Info::model_added
                ) {
                    $current_fields = array_diff_key(
                        $current_fields,
                        array_flip($changes_in_version[$model->get_this_model_name()])
                    );
                }
            }
            $this->_cached_fields_on_models = $current_fields;
        }
        return $this->_cached_fields_on_models;
    }



    /**
     * Determines if $object is of one of the classes of $classes. Similar to
     * in_array(), except this checks if $object is a subclass of the classnames provided
     * in $classnames
     *
     * @param object $object
     * @param array  $classnames
     * @return boolean
     */
    public function is_subclass_of_one($object, $classnames)
    {
        foreach ($classnames as $classname) {
            if (is_a($object, $classname)) {
                return true;
            }
        }
        return false;
    }



    /**
     * Returns the list of model field classes that that the API basically ignores
     *
     * @return array
     */
    public function fields_ignored()
    {
        return apply_filters(
            'FHEE__Controller_Model_Read_fields_ignored',
            array('EE_Foreign_Key_Field_Base', 'EE_Any_Foreign_Model_Name_Field')
        );
    }



    /**
     * If this field one that should be ignored by the API?
     *
     * @param EE_Model_Field_Base
     * @return boolean
     */
    public function field_is_ignored($field_obj)
    {
        return $this->is_subclass_of_one($field_obj, $this->fields_ignored());
    }



    /**
     * Returns the list of model field classes that have a "raw" and non-raw formats.
     * Normally the "raw" versions are only accessible to those who can edit them.
     *
     * @return array an array of EE_Model_Field_Base child classnames
     */
    public function fields_that_have_rendered_format()
    {
        return apply_filters(
            'FHEE__Controller_Model_Read__fields_raw',
            array('EE_Post_Content_Field', 'EE_Full_HTML_Field')
        );
    }



    /**
     * If this field one that has a raw format
     *
     * @param EE_Model_Field_Base
     * @return boolean
     */
    public function field_has_rendered_format($field_obj)
    {
        return $this->is_subclass_of_one($field_obj, $this->fields_that_have_rendered_format());
    }



    /**
     * Returns the list of model field classes that have a "_pretty" and non-pretty versions.
     * The pretty version of the field is NOT queryable or editable, but requires no extra permissions
     * to view
     *
     * @return array an array of EE_Model_Field_Base child classnames
     */
    public function fields_that_have_pretty_format()
    {
        return apply_filters(
            'FHEE__Controller_Model_Read__fields_pretty',
            array('EE_Enum_Integer_Field', 'EE_Enum_Text_Field', 'EE_Money_Field')
        );
    }



    /**
     * If this field one that has a pretty equivalent
     *
     * @param EE_Model_Field_Base
     * @return boolean
     */
    public function field_has_pretty_format($field_obj)
    {
        return $this->is_subclass_of_one($field_obj, $this->fields_that_have_pretty_format());
    }



    /**
     * Returns an array describing what extra API resource properties have been added through the versions
     *
     * @return array @see $this->_extra_resource_properties_for_models
     */
    public function resource_changes()
    {
        return $this->_resource_changes;
    }



    /**
     * Returns an array where keys are extra resource properties in this version of the API,
     * and values are key-value pairs describing the new properties. @see Model_Version::_resource_changes
     *
     * @param \EEM_Base $model
     * @return array
     */
    public function extra_resource_properties_for_model($model)
    {
        $extra_properties = array();
        foreach ($this->resource_changes_between_requested_version_and_current() as $version => $model_classnames) {
            foreach ($model_classnames as $model_classname => $properties_added_in_this_version) {
                if (is_subclass_of($model, $model_classname)) {
                    $extra_properties = array_merge($extra_properties, $properties_added_in_this_version);
                }
            }
        }
        return $extra_properties;
    }



    /**
     * Gets all the related models for the specified model. It's good to use this
     * in case this model didn't exist for this version or something
     *
     * @param \EEM_Base $model
     * @return \EE_Model_Relation_Base[]
     */
    public function relation_settings(\EEM_Base $model)
    {
        $relations = array();
        foreach ($model->relation_settings() as $relation_name => $relation_obj) {
            if ($this->is_model_name_in_this_version($relation_name)) {
                $relations[$relation_name] = $relation_obj;
            }
        }
        //filter the results, but use the old filter name
        return apply_filters(
            'FHEE__Read__create_entity_from_wpdb_result__related_models_to_include',
            $relations,
            $model
        );
    }

}

// End of file Model_Version_Info.php