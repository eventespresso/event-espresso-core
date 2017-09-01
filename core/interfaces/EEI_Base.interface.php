<?php
defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Interface EEI_Base
 */
interface EEI_Base
{

    /**
     * gets the unique ID of the model object. If it hasn't been saved yet
     * to the database, this should be 0 or NULL
     */
    public function ID();



    /**
     * Returns an array where keys are field names and values are their values
     *
     * @return array
     */
    public function model_field_array();



    /**
     * Saves the thing to the database and returns success (or an ID)
     *
     * @return boolean success on insert; or int on update (ID of newly inserted thing)
     */
    public function save();



    /**
     * Similar to insert_post_meta, adds a record in the Extra_Meta model's table with the given key and value.
     * A $previous_value can be specified in case there are many meta rows with the same key
     *
     * @param string $meta_key
     * @param string $meta_value
     * @param string $previous_value
     * @return int records updated (or BOOLEAN if we actually ended up inserting the extra meta row)
     * NOTE: if the values haven't changed, returns 0
     */
    public function update_extra_meta($meta_key, $meta_value, $previous_value = null);



    /**
     * Adds a new extra meta record. If $unique is set to TRUE, we'll first double-check
     * no other extra meta for this model object have the same key. Returns TRUE if the
     * extra meta row was entered, false if not
     *
     * @param string  $meta_key
     * @param string  $meta_value
     * @param boolean $unique
     * @return boolean
     */
    public function add_extra_meta($meta_key, $meta_value, $unique = false);



    /**
     * Deletes all the extra meta rows for this record as specified by key. If $meta_value
     * is specified, only deletes extra meta records with that value.
     *
     * @param string $meta_key
     * @param string $meta_value
     * @return int number of extra meta rows deleted
     */
    public function delete_extra_meta($meta_key, $meta_value = null);



    /**
     * Gets the extra meta with the given meta key. If you specify "single" we just return 1, otherwise
     * an array of everything found. Requires that this model actually have a relation of type EE_Has_Many_Any_Relation.
     * You can specify $default is case you haven't found the extra meta
     *
     * @param string  $meta_key
     * @param boolean $single
     * @param mixed   $default if we don't find anything, what should we return?
     * @return mixed single value if $single; array if ! $single
     */
    public function get_extra_meta($meta_key, $single = false, $default = NULL);



    /**
     * Gets a pretty view of the field's value. $extra_cache_ref can specify different formats for this.
     * The $extra_cache_ref will be passed to the model field's prepare_for_pretty_echoing, so consult the field's class
     * to see what options are available.
     *
     * @param string $field_name
     * @param string $extra_cache_ref This allows the user to specify an extra cache ref for the given property
     *                                (in cases where the same property may be used for different outputs
     *                                - i.e. datetime, money etc.)
     * @return mixed
     * @throws \EE_Error
     */
    public function get_pretty($field_name, $extra_cache_ref);



}
// End of file EEI_Base.interface.php
// Location: core/interfaces/EEI_Base.interface.php