<?php

/**
 * EE_Extra_Meta class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Answer.class.php
 * @author                Mike Nelson
 */
class EE_Extra_Meta extends EE_Base_Class
{

    /**
     * @param array $props_n_values
     * @return EE_Extra_Meta|mixed
     */
    public static function new_instance($props_n_values = array())
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object ? $has_object : new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Extra_Meta
     */
    public static function new_instance_from_db($props_n_values = array())
    {
        return new self($props_n_values, true);
    }


    /**
     * Gets FK_ID
     *
     * @return int
     */
    public function FK_ID()
    {
        return $this->get('FK_ID');
    }


    /**
     * Sets FK_ID
     *
     * @param int $FK_ID
     * @return boolean
     */
    public function set_FK_ID($FK_ID)
    {
        $this->set('FK_ID', $FK_ID);
    }


    /**
     * Gets model
     *
     * @return string
     */
    public function model()
    {
        return $this->get('EXM_model');
    }


    /**
     * Sets model
     *
     * @param string $model
     * @return boolean
     */
    public function set_model($model)
    {
        $this->set('EXM_model', $model);
    }


    /**
     * Gets key
     *
     * @return string
     */
    public function key()
    {
        return $this->get('EXM_key');
    }


    /**
     * Sets key
     *
     * @param string $key
     * @return boolean
     */
    public function set_key($key)
    {
        $this->set('EXM_key', $key);
    }


    /**
     * Gets value
     *
     * @return string
     */
    public function value()
    {
        return $this->get('EXM_value');
    }


    /**
     * Sets value
     *
     * @param string $value
     * @return boolean
     */
    public function set_value($value)
    {
        $this->set('EXM_value', $value);
    }
}
