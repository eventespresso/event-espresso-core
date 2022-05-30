<?php

/**
 * EE_Term_Taxonomy class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Term_Taxonomy.class.php
 * @author                Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_Term_Taxonomy extends EE_Base_Class
{
    /**
     * @param array $props_n_values
     * @return EE_Term_Taxonomy
     */
    public static function new_instance($props_n_values = array())
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object ? $has_object : new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Term_Taxonomy
     */
    public static function new_instance_from_db($props_n_values = array())
    {
        return new self($props_n_values, true);
    }


    /**
     * Gets taxonomy
     *
     * @return string
     */
    public function taxonomy()
    {
        return $this->get('taxonomy');
    }


    /**
     * Sets taxonomy
     *
     * @param string $taxonomy
     * @return boolean
     */
    public function set_taxonomy($taxonomy)
    {
        $this->set('taxonomy', $taxonomy);
    }


    /**
     * Gets term_count
     *
     * @return int
     */
    public function count()
    {
        return $this->get('term_count');
    }


    /**
     * Sets term_count
     *
     * @param int $term_count
     * @return boolean
     */
    public function set_count($term_count)
    {
        $this->set('term_count', $term_count);
    }


    /**
     * Gets the term for this term taxonomy
     *
     * @return EE_Term
     */
    public function term()
    {
        return $this->get_first_related('Term');
    }
}
