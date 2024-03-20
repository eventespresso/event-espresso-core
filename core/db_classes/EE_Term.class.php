<?php

/**
 * EE_Term class
 *
 * @package     Event Espresso
 * @subpackage  includes/classes/EE_Term.class.php
 * @author      Mike Nelson
 */
class EE_Term extends EE_Base_Class
{
    public array $post_type = [];


    /**
     * Sets some dynamic defaults
     *
     * @param array  $fieldValues
     * @param bool   $bydb
     * @param string $timezone
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function __construct($fieldValues = [], $bydb = false, $timezone = '')
    {
        if (! isset($fieldValues['slug'])) {
            $fieldValues['slug'] = $fieldValues['name'];
        }
        parent::__construct($fieldValues, $bydb, $timezone);
    }


    /**
     * @param array $props_n_values
     * @return EE_Term|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance(array $props_n_values = []): ?EE_Term
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object ?: new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Term|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db(array $props_n_values = []): ?EE_Term
    {
        return new self($props_n_values, true);
    }


    /**
     * Gets name
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function name(): string
    {
        return (string) $this->get('name');
    }


    /**
     * Sets name
     *
     * @param string $name
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_name(string $name)
    {
        $this->set('name', $name);
    }


    /**
     * Gets slug
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function slug(): string
    {
        return (string) $this->get('slug');
    }


    /**
     * Sets slug
     *
     * @param string $slug
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_slug(string $slug)
    {
        $this->set('slug', $slug);
    }
}
