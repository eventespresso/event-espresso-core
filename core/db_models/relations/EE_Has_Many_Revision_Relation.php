<?php
require_once(EE_MODELS . 'relations/EE_Has_Many_Relation.php');


/**
 * Class EE_Has_Many_Revision_Relation
 * In this relation, the OTHER model has the foreign key pointing to this model
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Michael Nelson
 */
class EE_Has_Many_Revision_Relation extends EE_Has_Many_Relation
{


    /**
     * The Foreign key on the model that acts as the PRIMARY KEY used in special autosave handling where we query for
     * autosaves (or the Foreign key on other models in relations pointing to this models primary key which is this
     * value).  The _primary_cpt_field is what is equivalent to the post_id field on a cpt join.
     *
     * @var string
     */
    private $_primary_cpt_field;


    /**
     * This is what field serves as the "parent" column that is linked with whatever the main model's calling this
     * relation has as a primary key.  In other words EEM_Event has 'Datetime' => new
     * EE_Has_Many_Revision_Relation('EVT_ID', 'DTT_parent').  That means that in the EEM_Datetime model the
     * 'DTT_Parent' field is related to the 'DTT_ID' primary key field (in the same model) because 'DTT_ID' is the
     * primary key in the other model (EEM_Datetime).
     *
     * @var string
     */
    private $_parent_pk_relation_field;


    /**
     * Object representing the relationship between two models. Has_Many_Relations are where the OTHER model has the
     * foreign key this model. IE, there can be many other model objects related to one of this model's objects (but
     * NOT through a JOIN table, which is the case for EE_HABTM_Relations). This knows how to join the models, get
     * related models across the relation, and add-and-remove the relationships.
     *
     * @param string  $primary_cpt_field             See property description for details
     * @param string  $parent_pk_relation_field      This is the field that is "connected" to the $primary_cpt_field.
     *                                               See property desc for details.
     * @param boolean $block_deletes                 For this type of relation, we block by default. If there are
     *                                               related models across this relation, block (prevent and add an
     *                                               error) the deletion of this model
     * @param string  $blocking_delete_error_message a customized error message on blocking deletes instead of the
     *                                               default
     */
    public function __construct(
        $primary_cpt_field,
        $parent_pk_relation_field,
        $block_deletes = true,
        $blocking_delete_error_message = null
    ) {
        $this->_primary_cpt_field        = $primary_cpt_field;
        $this->_parent_pk_relation_field = $parent_pk_relation_field;
        parent::__construct($block_deletes, $blocking_delete_error_message);
    }


    /**
     * Sets the other model object's foreign key to this model object's primary key. Feel free to do this manually if
     * you like.
     *
     * @param EE_Base_Class|int $this_obj_or_id
     * @param EE_Base_Class|int $other_obj_or_id
     * @param array             $extra_join_model_fields_n_values
     * @return \EE_Base_Class
     * @throws \EE_Error
     */
    public function add_relation_to($this_obj_or_id, $other_obj_or_id, $extra_join_model_fields_n_values = array())
    {
        $this_model_obj  = $this->get_this_model()->ensure_is_obj($this_obj_or_id, true);
        $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id);

        //handle possible revisions
        $other_model_obj = $this->_check_for_revision($this_model_obj, $other_model_obj);

        //if is array, then we've already done the add_relation so let's get out
        if (is_array($other_model_obj)) {
            return $other_model_obj[0];
        }
        //find the field on the other model which is a foreign key to this model
        $fk_field_on_other_model = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());
        //set that field on the other model to this model's ID
        $other_model_obj->set($fk_field_on_other_model->get_name(), $this_model_obj->ID());
        $other_model_obj->save();
        return $other_model_obj;
    }


    /**
     * Sets the other model object's foreign key to its default, instead of pointing to this model object
     *
     * @param EE_Base_Class|int $this_obj_or_id
     * @param EE_Base_Class|int $other_obj_or_id
     * @param array             $where_query
     * @return \EE_Base_Class
     * @throws \EE_Error
     */
    public function remove_relation_to($this_obj_or_id, $other_obj_or_id, $where_query = array())
    {
        $this_model_obj  = $this->get_this_model()->ensure_is_obj($this_obj_or_id);
        $other_model_obj = $this->get_other_model()->ensure_is_obj($other_obj_or_id);
        //handle possible revisions
        $other_model_obj = $this->_check_for_revision($this_model_obj, $other_model_obj, true);


        //if is array, then we've already done the add_relation so let's get out
        if (is_array($other_model_obj)) {
            return $other_model_obj[0];
        }

        //find the field on the other model which is a foreign key to this model
        $fk_field_on_other_model = $this->get_other_model()->get_foreign_key_to($this->get_this_model()->get_this_model_name());


        //set that field on the other model to this model's ID
        if ($this->_blocking_delete) {
            $other_model_obj->set($fk_field_on_other_model->get_name(), null, true);
            $other_model_obj->save();
        } else {
            $other_model_obj->delete();
            $other_model_obj->set($fk_field_on_other_model->get_name(), null, true);
            return $other_model_obj;
        }
        return $other_model_obj;
    }


    /**
     * This is identical to EE_Model_Relation->get_all_related() except we're going handle special autosave conditions
     * in here.
     *
     * @param  EE_Base_Class|int $model_object_or_id
     * @param  array             $query_params                            like EEM_Base::get_all's $query_params
     * @param  boolean           $values_already_prepared_by_model_object @deprecated since 4.8.1
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

        //if this is an autosave then we're going to get things differently
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return $this->_do_autosave_get_all($model_object_or_id, $query_params);
        }

        return parent::get_all_related($model_object_or_id, $query_params);
    }


    /**
     * If we're in the midst of an autosave then we're going to do things a bit differently than the usual
     * get_all_related (commenting within).  For description of params see the get_all_related() comments
     *
     * @access protected
     * @param      $model_object_or_id
     * @param      $query_params
     * @param bool $deprecated
     * @return \EE_Base_Class[]
     * @throws \EE_Error
     */
    protected function _do_autosave_get_all($model_object_or_id, $query_params, $deprecated = false)
    {

        //first we check if the post_id for the incoming query is for an autosave.  If it isn't that's what we want!
        $model_object_id = $this->_get_model_object_id($model_object_or_id);

        $autosave  = wp_get_post_autosave($model_object_id);
        $id_to_use = $autosave ? $autosave->ID : $model_object_id;

        $autosave_relations = parent::get_all_related($id_to_use, $query_params);
        $parent_ids         = $parents = array();
        $return_objs        = array();

        //k this is where things differ because NOW what we're going to do is get the PARENTS for the get all related (and we'll also start setting up the return_objs array containing related that DON'T have parent ids, for those that DON'T have parents to merge with our returned objects);
        foreach ($autosave_relations as $a_r) {
            $pid = $a_r->parent();
            if (! empty($pid)) {
                $parent_ids[] = $pid;
            } else {
                $return_objs[] = $a_r;
            }
        }

        //we have to make sure we also include the ORIGINAL values
        $originals = parent::get_all_related($model_object_or_id, $query_params);

        //merge $originals with $return_objs
        if ($originals) {
            $return_objs = array_merge($originals, $return_objs);
        }

        //now we setup the query to get all the parents
        if (! empty($parent_ids)) {
            $query_param_where_this_model_pk                  = $this->get_this_model()->get_this_model_name() . "." . $this->get_this_model()->get_primary_key_field()->get_name();
            $query_param[0][$query_param_where_this_model_pk] = array('IN', $parent_ids);
            $parents                                          = $this->get_other_model()->get_all($query_params);
        }

        //var_dump($parents);


        //now merge parents with our current $return_objs and send back
        return array_merge($parents, $return_objs);
    }


    /**
     * Basically this method gets called to verify if the incoming object needs to be manipulated somewhat because it
     * is a revision save.  If so, then we change things before sending back.  We also do verifications when this IS
     * NOT an revision because we always need to make sure that the autosave/revision has parent recorded (which is
     * sometime delayed if the object is created/saved first by the autosave)
     *
     * @param  EE_Base_Class $this_obj
     * @param  EE_Base_Class $other_obj
     * @param  boolean       $remove_relation Indicates whether we're doing a remove_relation or add_relation.
     * @return EE_Base_Class. ($other_obj);
     * @throws \EE_Error
     */
    protected function _check_for_revision($this_obj, $other_obj, $remove_relation = false)
    {
        $pk_on_related_model = $this->get_other_model()->get_primary_key_field()->get_name();
        //now we need to determine if we're in a WP revision save cause if we are we need to do some special handling
        if ($this_obj->post_type() === 'revision') {
            //first if $other_obj fk = this_obj pk then we know that this is a pk object, let's make sure there is a matching set for the autosave if there is then we save over it, if there isn't then we need to create a new one.
            $parent_evt_id = $this_obj->parent();
            /*var_dump($parent_evt_id);
            var_dump($this_obj);
            var_dump($other_obj);/**/

            if (! empty($parent_evt_id) && $parent_evt_id == $other_obj->get($this->_primary_cpt_field)) {
                //let's do query on this objects model to see if the incoming pk value on the obj matches any parents in this objects table.
                $has_parent_obj = $this->get_other_model()->get_one(array(
                    array(
                        $this->_parent_pk_relation_field => $other_obj->ID(),
                        $this->_primary_cpt_field        => $this_obj->ID(),
                    ),
                ));

                if ($has_parent_obj) {
                    //this makes sure the update on the current obj happens to the revision's row NOT the parent row.

                    $other_obj->set($this->_parent_pk_relation_field, $other_obj->ID());
                    $other_obj->set($pk_on_related_model, $has_parent_obj->ID());
                    $other_obj->set($this->_primary_cpt_field, $this_obj->ID());

                    if (! $remove_relation) {
                        $other_obj->save();
                        return array($other_obj);
                    } elseif ($remove_relation && ! $this->_blocking_delete) {
                        $other_obj->delete();
                        $other_obj->set($this->_parent_pk_relation_field, null, true);
                        return array($other_obj);
                    }

                } else {
                    $other_obj->set($this->_parent_pk_relation_field, $other_obj->ID());
                    $other_obj->set($this->_primary_cpt_field, $this_obj->ID());
                    $other_obj->set($pk_on_related_model, null,
                        true); //ensure we create a new row for the autosave with parent id the same as the incoming ID.
                    $other_obj->save(); //make sure we insert.
                    return array($other_obj);
                }
            }

            //var_dump('what makes it here');
            //var_dump($other_obj);
            //the next possible condition is that the incoming other_model obj has a NULL pk which means it just gets saved (which in turn creates it)

            //the last possible condition on a revision is that the incoming other_model object has a fk that == $this_obj pk which means we just return the $other obj and let it save as normal so we see the return at the bottom of this method.

        } else {

            //we only need to do the below IF this is not a remove relation
            if (! $remove_relation) {
                //okay this is is a normal update/save/remove so, let's make sure the other object is not a revision of the current object.
                //the other object will likely NOT have the correct fk on it (which is the primary_cpt_field_mame) so we must retrieve from the db to get that first.
                $existing_other_obj    = $this->get_other_model()->get_one_by_ID($other_obj->ID());
                $potential_revision_id = is_object($existing_other_obj) ? $existing_other_obj->get($this->_primary_cpt_field) : null;

                if ($parent_this_obj_id = wp_is_post_revision($potential_revision_id)) {
                    //yes the OTHER object is linked to the revision of the parent, not the parent itself. That means we need to make the other_object an attachment of this_obj and then duplicate other_obj for the revision.
                    $other_obj->set($this->_primary_cpt_field, $this_obj->ID());
                    $other_obj->save();

                    //now create a new other_obj and fill with details from existing object
                    $new_obj = $other_obj;
                    $new_obj->set($this->_primary_cpt_field, $potential_revision_id);
                    $new_obj->set($this->_parent_pk_relation_field, $other_obj->ID());
                    $new_obj->set($pk_on_related_model, null);
                    $new_obj->save();
                    return array($new_obj);
                }

            }
        }

        return $other_obj;
    }

}