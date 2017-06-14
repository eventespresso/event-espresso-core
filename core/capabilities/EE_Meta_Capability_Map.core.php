<?php
defined('EVENT_ESPRESSO_VERSION') || exit;


/**
 * Meta Capability Map class.
 * This children of this class are used to define capability mappings for capabilities that have further filtering
 * depending on context.
 *
 * @since      4.5.0
 * @package    Event Espresso
 * @subpackage core, capabilities
 * @author     Darren Ethier
 */
abstract class EE_Meta_Capability_Map
{

    public $meta_cap;

    /**
     * @var EEM_Base
     */
    protected $_model;

    protected $_model_name;

    public $published_cap = '';

    public $others_cap = '';

    public $private_cap = '';



    /**
     * constructor.
     * Receives the setup arguments for the map.
     *
     * @since                        4.5.0
     *
     * @param string $meta_cap   What meta capability is this mapping.
     * @param array  $map_values array {
     *                           //array of values that MUST match a count of 4.  It's okay to send an empty string for
     *                           capabilities that don't get mapped to.
     *
     * @type         $map_values [0] string A string representing the model name. Required.  String's
     *                               should always be used when Menu Maps are registered via the
     *                               plugin API as models are not allowed to be instantiated when
     *                               in maintenance mode 2 (migrations).
     * @type         $map_values [1] string represents the capability used for published. Optional.
     * @type         $map_values [2] string represents the capability used for "others". Optional.
     * @type         $map_values [3] string represents the capability used for private. Optional.
     *                               }
     * @throws EE_Error
     */
    public function __construct($meta_cap, $map_values)
    {
        $this->meta_cap = $meta_cap;
        //verify there are four args in the $map_values array;
        if (count($map_values) !== 4) {
            throw new EE_Error(
                sprintf(
                    __(
                        'Incoming $map_values array should have a count of four values in it.  This is what was given: %s',
                        'event_espresso'
                    ),
                    '<br>' . print_r($map_values, true)
                )
            );
        }
        //set properties
        $this->_model = null;
        $this->_model_name = $map_values[0];
        $this->published_cap = (string)$map_values[1];
        $this->others_cap = (string)$map_values[2];
        $this->private_cap = (string)$map_values[3];
    }



    /**
     * Makes it so this object stops filtering caps
     */
    public function remove_filters()
    {
        remove_filter('map_meta_cap', array($this, 'map_meta_caps'), 10);
    }



    /**
     * This method ensures that the $model property is converted from the model name string to a proper EEM_Base class
     *
     * @since 4.5.0
     * @throws EE_Error
     *
     * @return void
     */
    public function ensure_is_model()
    {
        //is it already instantiated?
        if ($this->_model instanceof EEM_Base) {
            return;
        }
        //ensure model name is string
        $this->_model_name = (string)$this->_model_name;
        //error proof if the name has EEM in it
        $this->_model_name = str_replace('EEM', '', $this->_model_name);
        $this->_model = EE_Registry::instance()->load_model($this->_model_name);
        if (! $this->_model instanceof EEM_Base) {
            throw new EE_Error(
                sprintf(
                    __(
                        'This string passed in to %s to represent a EEM_Base model class was not able to be used to instantiate the class.   Please ensure that the string is a match for the EEM_Base model name (not including the EEM_ part). This was given: %s',
                        'event_espresso'
                    ),
                    get_class($this),
                    $this->_model
                )
            );
        }
    }



    /**
     *
     * @see   EE_Meta_Capability_Map::_map_meta_caps() for docs on params.
     * @since 4.6.x
     *
     * @param $caps
     * @param $cap
     * @param $user_id
     * @param $args
     *
     * @return array
     */
    public function map_meta_caps($caps, $cap, $user_id, $args)
    {
        return $this->_map_meta_caps($caps, $cap, $user_id, $args);
    }



    /**
     * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a
     * "meta" for other caps ( i.e. ee_edit_event is a meta for ee_edit_others_events ) work as expected.
     *
     * @since 4.5.0
     * @see   wp-includes/capabilities.php
     *
     * @param array  $caps    actual users capabilities
     * @param string $cap     initial capability name that is being checked (the "map" key)
     * @param int    $user_id The user id
     * @param array  $args    Adds context to the cap. Typically the object ID.
     *
     * @return array   actual users capabilities
     */
    abstract protected function _map_meta_caps($caps, $cap, $user_id, $args);
}
