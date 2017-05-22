<?php
use EventEspresso\core\entities\interfaces\HasSchemaInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * Class EE_Model_Relation_Base
 * Model Relation classes are for defining relationships between models, and facilitating JOINs
 * between them during querying. They require knowing at least the model names of the two models
 * they join, and require each to have proper Private and Foreign key fields setup. (HABTM are different)
 * Once those two models are setup correctly, and the relation object has the names of each, it can
 * magically figure out what tables must be joined on what fields during querying.
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson
 */
abstract class EE_Model_Relation_Base implements HasSchemaInterface
{
    /**
     * The model name of which this relation is a component (ie, the model that called new EE_Model_Relation_Base)
     *
     * @var string eg Event, Question_Group, Registration
     */
    private $_this_model_name;
    /**
     * The model name pointed to by this relation (ie, the model we want to establish a relationship to)
     *
     * @var string eg Event, Question_Group, Registration
     */
    private $_other_model_name;

    /**
     * this is typically used when calling the relation models to make sure they inherit any set timezone from the
     * initiating model.
     *
     * @var string
     */
    protected $_timezone;

    /**
     * If you try to delete "this_model", and there are related "other_models",
     * and this isn't null, then abandon the deletion and add this warning.
     * This effectively makes it impossible to delete "this_model" while there are
     * related "other_models" along this relation.
     *
     * @var string (internationalized)
     */
    protected $_blocking_delete_error_message;

    protected $_blocking_delete = false;

    /**
     * Object representing the relationship between two models. This knows how to join the models,
     * get related models across the relation, and add-and-remove the relationships.
     *
     * @param boolean $block_deletes                 if there are related models across this relation, block (prevent
     *                                               and add an error) the deletion of this model
     * @param string  $blocking_delete_error_message a customized error message on blocking deletes instead of the
     *                                               default
     */
    public function __construct($block_deletes, $blocking_delete_error_message)
    {
        $this->_blocking_delete               = $block_deletes;
        $this->_blocking_delete_error_message = $blocking_delete_error_message;
    }


    /**
     * @param $this_model_name
     * @param $other_model_name
     * @throws EE_Error
     */
    public function _construct_finalize_set_models($this_model_name, $other_model_name)
    {
        $this->_this_model_name  = $this_model_name;
        $this->_other_model_name = $other_model_name;
        if (is_string($this->_blocking_delete)) {
            throw new EE_Error(sprintf(__("When instantiating the relation of type %s from %s to %s, the \$block_deletes argument should be a boolean, not a string (%s)",
                "event_espresso"),
                get_class($this), $this_model_name, $other_model_name, $this->_blocking_delete));
        }
    }


    /**
     * Gets the model where this relation is defined.
     *
     * @return EEM_Base
     */
    public function get_this_model()
    {
        return $this->_get_model($this->_this_model_name);
    }


    /**
     * Gets the model which this relation establishes the relation TO (ie,
     * this relation object was defined on get_this_model(), get_other_model() is the other one)
     *
     * @return EEM_Base
     */
    public function get_other_model()
    {
        return $this->_get_model($this->_other_model_name);
    }


    /**
     * Internally used by get_this_model() and get_other_model()
     *
     * @param string $model_name like Event, Question_Group, etc. omit the EEM_
     * @return EEM_Base
     */
    protected function _get_model($model_name)
    {
        $modelInstance = EE_Registry::instance()->load_model($model_name);
        $modelInstance->set_timezone($this->_timezone);
        return $modelInstance;
    }


    /**
     * entirely possible that relations may be called from a model and we need to make sure those relations have their
     * timezone set correctly.
     *
     * @param string $timezone timezone to set.
     */
    public function set_timezone($timezone)
    {
        if ($timezone !== null) {
            $this->_timezone = $timezone;
        }
    }


    /**
     * @param        $other_table
     * @param        $other_table_alias
     * @param        $other_table_column
     * @param        $this_table_alias
     * @param        $this_table_join_column
     * @param string $extra_join_sql
     * @return string
     */
    protected function _left_join(
        $other_table,
        $other_table_alias,
        $other_table_column,
        $this_table_alias,
        $this_table_join_column,
        $extra_join_sql = ''
    ) {
        return " LEFT JOIN " . $other_table . " AS " . $other_table_alias . " ON " . $other_table_alias . "." . $other_table_column . "=" . $this_table_alias . "." . $this_table_join_column . ($extra_join_sql ? " AND $extra_join_sql" : '');
    }


    /**
     * Gets all the model objects of type of other model related to $model_object,
     * according to this relation. This is the same code for EE_HABTM_Relation and EE_Has_Many_Relation.
     * For both of those child classes, $model_object must be saved so that it has an ID before querying,
     * otherwise an error will be thrown. Note: by default we disable default_where_conditions
     * EE_Belongs_To_Relation doesn't need to be saved before querying.
     *
     * @param EE_Base_Class|int $model_object_or_id                      or the primary key of this model
     * @param array             $query_params                            like EEM_Base::get_all's $query_params
     * @param boolean           $values_already_prepared_by_model_object @deprecated since 4.8.1
     * @return EE_Base_Class[]
     * @throws \EE_Error
     */
    public function get_all_related(
        $model_object_or_id,
        $query_params = array(),
        $values_already_prepared_by_model_object = false
    ) {
        if ($values_already_prepared_by_model_object !== false) {
            EE_Error::doing_it_wrong('EE_Model_Relation_Base::get_all_related',
                __('The argument $values_already_prepared_by_model_object is no longer used.', 'event_espresso'),
                '4.8.1');
        }
        $query_params                                      = $this->_disable_default_where_conditions_on_query_param($query_params);
        $query_param_where_this_model_pk                   = $this->get_this_model()->get_this_model_name()
                                                             . "."
                                                             . $this->get_this_model()->get_primary_key_field()->get_name();
        $model_object_id                                   = $this->_get_model_object_id($model_object_or_id);
        $query_params[0][$query_param_where_this_model_pk] = $model_object_id;
        return $this->get_other_model()->get_all($query_params);
    }


    /**
     * Alters the $query_params to disable default where conditions, unless otherwise specified
     *
     * @param string $query_params
     * @return array
     */
    protected function _disable_default_where_conditions_on_query_param($query_params)
    {
        if (! isset($query_params['default_where_conditions'])) {
            $query_params['default_where_conditions'] = 'none';
        }
        return $query_params;
    }


    /**
     * Deletes the related model objects which meet the query parameters. If no
     * parameters are specified, then all related model objects will be deleted.
     * Note: If the related model is extends EEM_Soft_Delete_Base, then the related
     * model objects will only be soft-deleted.
     *
     * @param EE_Base_Class|int|string $model_object_or_id
     * @param array                    $query_params
     * @return int of how many related models got deleted
     * @throws \EE_Error
     */
    public function delete_all_related($model_object_or_id, $query_params = array())
    {
        //for each thing we would delete,
        $related_model_objects = $this->get_all_related($model_object_or_id, $query_params);
        //determine if it's blocked by anything else before it can be deleted
        $deleted_count = 0;
        foreach ($related_model_objects as $related_model_object) {
            $delete_is_blocked = $this->get_other_model()->delete_is_blocked_by_related_models($related_model_object,
                $model_object_or_id);
            /* @var $model_object_or_id EE_Base_Class */
            if (! $delete_is_blocked) {
                $this->remove_relation_to($model_object_or_id, $related_model_object);
                $related_model_object->delete();
                $deleted_count++;
            }
        }
        return $deleted_count;
    }


    /**
     * Deletes the related model objects which meet the query parameters. If no
     * parameters are specified, then all related model objects will be deleted.
     * Note: If the related model is extends EEM_Soft_Delete_Base, then the related
     * model objects will only be soft-deleted.
     *
     * @param EE_Base_Class|int|string $model_object_or_id
     * @param array                    $query_params
     * @return int of how many related models got deleted
     * @throws \EE_Error
     */
    public function delete_related_permanently($model_object_or_id, $query_params = array())
    {
        //for each thing we would delete,
        $related_model_objects = $this->get_all_related($model_object_or_id, $query_params);
        //determine if it's blocked by anything else before it can be deleted
        $deleted_count = 0;
        foreach ($related_model_objects as $related_model_object) {
            $delete_is_blocked = $this->get_other_model()->delete_is_blocked_by_related_models($related_model_object,
                $model_object_or_id);
            /* @var $model_object_or_id EE_Base_Class */
            if ($related_model_object instanceof EE_Soft_Delete_Base_Class) {
                $this->remove_relation_to($model_object_or_id, $related_model_object);
                $deleted_count++;
                if (! $delete_is_blocked) {
                    $related_model_object->delete_permanently();
                } else {
                    //delete is blocked
                    //brent and darren, in this case, wanted to just soft delete it then
                    $related_model_object->delete();
                }
            } else {
                //its not a soft-deletable thing anyways. do the normal logic.
                if (! $delete_is_blocked) {
                    $this->remove_relation_to($model_object_or_id, $related_model_object);
                    $related_model_object->delete();
                    $deleted_count++;
                }
            }
        }
        return $deleted_count;
    }


    /**
     * this just returns a model_object_id for incoming item that could be an object or id.
     *
     * @param  EE_Base_Class|int $model_object_or_id model object or the primary key of this model
     * @throws EE_Error
     * @return int
     */
    protected function _get_model_object_id($model_object_or_id)
    {
        $model_object_id = $model_object_or_id;
        if ($model_object_or_id instanceof EE_Base_Class) {
            $model_object_id = $model_object_or_id->ID();
        }
        if (! $model_object_id) {
            throw new EE_Error(sprintf(__("Sorry, we cant get the related %s model objects to %s model object before it has an ID. You can solve that by just saving it before trying to get its related model objects",
                "event_espresso"), $this->get_other_model()->get_this_model_name(),
                $this->get_this_model()->get_this_model_name()));
        }
        return $model_object_id;
    }


    /**
     * Gets the SQL string for performing the join between this model and the other model.
     *
     * @param string $model_relation_chain like 'Event.Event_Venue.Venue'
     * @return string of SQL, eg "LEFT JOIN table_name AS table_alias ON this_model_primary_table.pk =
     *                other_model_primary_table.fk" etc
     */
    abstract public function get_join_statement($model_relation_chain);


    /**
     * Adds a relationships between the two model objects provided. Each type of relationship handles this differently
     * (EE_Belongs_To is a slight exception, it should more accurately be called set_relation_to(...), as this
     * relationship only allows this model to be related to a single other model of this type)
     *
     * @param       $this_obj_or_id
     * @param       $other_obj_or_id
     * @param array $extra_join_model_fields_n_values
     * @return \EE_Base_Class the EE_Base_Class which was added as a relation. (Convenient if you only pass an ID for
     *                        $other_obj_or_id)
     */
    abstract public function add_relation_to(
        $this_obj_or_id,
        $other_obj_or_id,
        $extra_join_model_fields_n_values = array()
    );


    /**
     * Similar to 'add_relation_to(...)', performs the opposite action of removing the relationship between the two
     * model objects
     *
     * @param       $this_obj_or_id
     * @param       $other_obj_or_id
     * @param array $where_query
     * @return bool
     */
    abstract public function remove_relation_to($this_obj_or_id, $other_obj_or_id, $where_query = array());


    /**
     * Removes ALL relation instances for this relation obj
     *
     * @param EE_Base_Class|int $this_obj_or_id
     * @param array             $where_query_param like EEM_Base::get_all's $query_params[0] (where conditions)
     * @return EE_Base_Class[]
     * @throws \EE_Error
     */
    public function remove_relations($this_obj_or_id, $where_query_param = array())
    {
        $related_things = $this->get_all_related($this_obj_or_id, array($where_query_param));
        $objs_removed   = array();
        foreach ($related_things as $related_thing) {
            $objs_removed[] = $this->remove_relation_to($this_obj_or_id, $related_thing);
        }
        return $objs_removed;
    }


    /**
     * If you aren't allowed to delete this model when there are related models across this
     * relation object, return true. Otherwise, if you can delete this model even though
     * related objects exist, returns false.
     *
     * @return boolean
     */
    public function block_delete_if_related_models_exist()
    {
        return $this->_blocking_delete;
    }


    /**
     * Gets the error message to show
     *
     * @return string
     */
    public function get_deletion_error_message()
    {
        if ($this->_blocking_delete_error_message) {
            return $this->_blocking_delete_error_message;
        } else {
//			return sprintf(__('Cannot delete %1$s when there are related %2$s', "event_espresso"),$this->get_this_model()->item_name(2),$this->get_other_model()->item_name(2));
            return sprintf(
                __('This %1$s is currently linked to one or more %2$s records. If this %1$s is incorrect, then please remove it from all %3$s before attempting to delete it.',
                    "event_espresso"),
                $this->get_this_model()->item_name(1),
                $this->get_other_model()->item_name(1),
                $this->get_other_model()->item_name(2)
            );
        }
    }

    /**
     * Returns whatever is set as the nicename for the object.
     *
     * @return string
     */
    public function getSchemaDescription()
    {
        $description = $this instanceof EE_Belongs_To_Relation
            ? esc_html__('The related %1$s entity to the %2$s.', 'event_espresso')
            : esc_html__('The related %1$s entities to the %2$s.', 'event_espresso');
        return sprintf(
            $description,
            $this->get_other_model()->get_this_model_name(),
            $this->get_this_model()->get_this_model_name()
        );
    }

    /**
     * Returns whatever is set as the $_schema_type property for the object.
     * Note: this will automatically add 'null' to the schema if the object is_nullable()
     *
     * @return string|array
     */
    public function getSchemaType()
    {
        return $this instanceof EE_Belongs_To_Relation ? 'object' : 'array';
    }

    /**
     * This is usually present when the $_schema_type property is 'object'.  Any child classes will need to override
     * this method and return the properties for the schema.
     * The reason this is not a property on the class is because there may be filters set on the values for the property
     * that won't be exposed on construct.  For example enum type schemas may have the enum values filtered.
     *
     * @return array
     */
    public function getSchemaProperties()
    {
        return array();
    }

    /**
     * If a child class has enum values, they should override this method and provide a simple array
     * of the enum values.
     * The reason this is not a property on the class is because there may be filterable enum values that
     * are set on the instantiated object that could be filtered after construct.
     *
     * @return array
     */
    public function getSchemaEnum()
    {
        return array();
    }

    /**
     * This returns the value of the $_schema_format property on the object.
     *
     * @return string
     */
    public function getSchemaFormat()
    {
        return array();
    }

    /**
     * This returns the value of the $_schema_readonly property on the object.
     *
     * @return bool
     */
    public function getSchemaReadonly()
    {
        return true;
    }

    /**
     * This returns elements used to represent this field in the json schema.
     *
     * @link http://json-schema.org/
     * @return array
     */
    public function getSchema()
    {
        $schema = array(
            'description' => $this->getSchemaDescription(),
            'type' => $this->getSchemaType(),
            'relation' => true,
            'relation_type' => get_class($this),
            'readonly' => $this->getSchemaReadonly()
        );

        if ($this instanceof EE_HABTM_Relation) {
            $schema['joining_model_name'] = $this->get_join_model()->get_this_model_name();
        }

        if ($this->getSchemaType() === 'array') {
            $schema['items'] = array(
                'type' => 'object'
            );
        }

        return $schema;
    }
}
