<?php

/**
 * EE_Term class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Term.class.php
 * @author                Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Term extends EE_Base_Class
{

    public $post_type;

    /**
     * Sets some dynamic defaults
     *
     * @param array  $fieldValues
     * @param bool   $bydb
     * @param string $timezone
     */
    protected function __construct($fieldValues = array(), $bydb = false, $timezone = '')
    {
        if (! isset($fieldValues['slug'])) {
            $fieldValues['slug'] = $fieldValues['name'];
        }
        parent::__construct($fieldValues, $bydb, $timezone);
    }


    /**
     * @param array $props_n_values
     * @return EE_Term|mixed
     */
    public static function new_instance($props_n_values = array())
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object ? $has_object : new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Term
     */
    public static function new_instance_from_db($props_n_values = array())
    {
        return new self($props_n_values, true);
    }


    /**
     * Gets name
     *
     * @return string
     */
    public function name()
    {
        return $this->get('name');
    }


    /**
     * Sets name
     *
     * @param string $name
     * @return boolean
     */
    public function set_name($name)
    {
        $this->set('name', $name);
    }


    /**
     * Gets slug
     *
     * @return string
     */
    public function slug()
    {
        return $this->get('slug');
    }


    /**
     * Sets slug
     *
     * @param string $slug
     * @return boolean
     */
    public function set_slug($slug)
    {
        $this->set('slug', $slug);
    }
}
