<?php

/**
 * EE_Status class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Status.class.php
 * @author                Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Status extends EE_Base_Class
{

    /**
     * @param array $props_n_values
     * @return EE_Status
     */
    public static function new_instance($props_n_values = array())
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object ? $has_object : new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Status
     */
    public static function new_instance_from_db($props_n_values = array())
    {
        return new self($props_n_values, true);
    }


    /**
     * Gets code
     *
     * @param bool   $plural
     * @param string $schema
     * @return string
     */
    public function code($plural = false, $schema = 'upper')
    {
        $id = $this->get('STS_ID');
        $code = EEM_Status::instance()->localized_status(array($id => $this->get('STS_code')), $plural, $schema);
        return $code[ $id ];
    }


    /**
     * Sets code
     *
     * @param string $code
     * @return boolean
     */
    public function set_code($code)
    {
        $this->set('STS_code', $code);
    }


    /**
     * Gets desc
     *
     * @return string
     */
    public function desc()
    {
        return $this->get('STS_desc');
    }


    /**
     * Sets desc
     *
     * @param string $desc
     * @return boolean
     */
    public function set_desc($desc)
    {
        $this->set('STS_desc', $desc);
    }


    /**
     * Gets type
     *
     * @return string
     */
    public function type()
    {
        return $this->get('STS_type');
    }


    /**
     * Sets type
     *
     * @param string $type
     * @return boolean
     */
    public function set_type($type)
    {
        $this->set('STS_type', $type);
    }


    /**
     * Gets can_edit
     *
     * @return boolean
     */
    public function can_edit()
    {
        return $this->get('STS_can_edit');
    }


    /**
     * Sets can_edit
     *
     * @param boolean $can_edit
     * @return boolean
     */
    public function set_can_edit($can_edit)
    {
        $this->set('STS_can_edit', $can_edit);
    }


    /**
     * Gets open
     *
     * @return boolean
     */
    public function open()
    {
        return $this->get('STS_open');
    }


    /**
     * Sets open
     *
     * @param boolean $open
     * @return boolean
     */
    public function set_open($open)
    {
        $this->set('STS_open', $open);
    }
}
