<?php

/**
 * EE_Answer class
 *
 * @package     Event Espresso
 * @subpackage  includes/classes/EE_Answer.class.php
 * @author      Mike Nelson
 */
class EE_Answer extends EE_Base_Class
{

    /**
     * @param array $props_n_values
     * @return EE_Answer
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance($props_n_values = [])
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object ? $has_object : new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Answer
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db($props_n_values = [])
    {
        return new self($props_n_values, true);
    }


    /**
     * Set Question ID
     *
     * @param int $QST_ID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_question($QST_ID = 0)
    {
        $this->set('QST_ID', $QST_ID);
    }


    /**
     * Set Registration ID
     *
     * @param int $REG_ID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_registration($REG_ID = 0)
    {
        $this->set('REG_ID', $REG_ID);
    }


    /**
     * Set Answer value
     *
     * @param mixed $ANS_value
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_value($ANS_value = '')
    {
        $this->set('ANS_value', $ANS_value);
    }


    /**
     * get Attendee First Name
     *
     * @return        int
     * @throws EE_Error
     */
    public function registration_ID()
    {
        return $this->get('REG_ID');
    }


    /**
     * get Attendee Last Name
     *
     * @return        int
     * @throws EE_Error
     */
    public function question_ID()
    {
        return $this->get('QST_ID');
    }


    /**
     * get Attendee Address
     *
     * @return        string
     * @throws EE_Error
     */
    public function value()
    {
        return $this->get('ANS_value');
    }


    /**
     * Gets a pretty form of the value (mostly applies to answers that have multiple answers)
     *
     * @param null $schema
     * @return string
     * @throws EE_Error
     */
    public function pretty_value($schema = null)
    {
        return $this->get_pretty('ANS_value', $schema);
    }


    /**
     * Echoes out a pretty value (even for multi-choice options)
     *
     * @param string $schema
     * @throws EE_Error
     */
    public function e_value($schema = null)
    {
        $this->e('ANS_value', $schema);
    }


    /**
     * Gets the related EE_Question to this EE_Answer
     *
     * @return EE_Base_Class|EE_Question
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function question()
    {
        return $this->get_first_related('Question');
    }


    /**
     * Gets the related EE_Registration to this EE_Answer
     *
     * @return EE_Base_Class|EE_Registration
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function registration()
    {
        return $this->get_first_related('Registration');
    }
}
