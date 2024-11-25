<?php

/**
 * EE_Question_Option class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Answer.class.php
 * @author                Mike Nelson
 * @method EE_Question get_first_related($relation, $query_params = [])
 */
class EE_Question_Option extends EE_Soft_Delete_Base_Class implements EEI_Duplicatable
{
    /**
     * Question Option Opt Group Name
     *
     * @var string
     */
    protected string $_QSO_opt_group = '';


    /**
     * @param array  $props_n_values          incoming values
     * @param string $timezone                incoming timezone (if not set the timezone set for the website will be
     *                                        used.)
     * @param array  $date_formats            incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Question_Option
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance($props_n_values = [], $timezone = '', $date_formats = [])
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ?: new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values  incoming values from the database
     * @param string $timezone        incoming timezone as set by the model.  If not set the timezone for
     *                                the website will be used.
     * @return EE_Question_Option
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db($props_n_values = [], $timezone = '')
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * Sets the option's key value
     *
     * @param string $value
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_value(string $value)
    {
        $this->set('QSO_value', $value);
    }


    /**
     * Sets the option's Display Text
     *
     * @param string $text
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_desc(string $text)
    {
        $this->set('QSO_desc', $text);
    }


    /**
     * Sets the order for this option
     *
     * @param int $order
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_order(int $order)
    {
        $this->set('QSO_order', $order);
    }


    /**
     * Sets the ID of the related question
     *
     * @param int $question_ID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_question_ID(int $question_ID)
    {
        $this->set('QST_ID', $question_ID);
    }


    /**
     * Sets the option's opt_group
     *
     * @param string $text
     */
    public function set_opt_group(string $text)
    {
        $this->_QSO_opt_group = $text;
    }


    /**
     * Gets the option's key value
     *
     * @return int|float|string|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function value()
    {
        return $this->get('QSO_value');
    }


    /**
     * Gets the option's display text
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function desc(): string
    {
        return (string) $this->get('QSO_desc');
    }


    /**
     * Returns whether this option has been deleted or not
     *
     * @return boolean
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function deleted(): bool
    {
        return (bool) $this->get('QSO_deleted');
    }


    /**
     * Returns the order or the Question Option
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function order(): int
    {
        return (int) $this->get('QSO_option');
    }


    /**
     * Gets the related question's ID
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function question_ID(): int
    {
        return (int) $this->get('QST_ID');
    }


    /**
     * Returns the question related to this question option
     *
     * @return EE_Question
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function question(): EE_Question
    {
        return $this->get_first_related('Question');
    }


    /**
     * Gets the option's opt_group
     *
     * @return string
     */
    public function opt_group(): string
    {
        return $this->_QSO_opt_group;
    }


    /**
     * Duplicates this question option. By default the new question option will be for the same question,
     * but that can be overriden by setting the 'QST_ID' option
     *
     * @param array $options {
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function duplicate($options = [])
    {
        $new_question_option = clone $this;
        $new_question_option->set('QSO_ID', null);
        if (
            array_key_exists(
                'QST_ID',
                $options
            )
        ) {// use array_key_exists instead of isset because NULL might be a valid value
            $new_question_option->set_question_ID($options['QST_ID']);
        }
        $new_question_option->save();
    }


    /**
     * Gets the QSO_system value
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function system(): string
    {
        return (string) $this->get('QSO_system');
    }


    /**
     * Sets QSO_system
     *
     * @param string $QSO_system
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_system(string $QSO_system)
    {
        $this->set('QSO_system', $QSO_system);
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function isDefault(): bool
    {
        return (bool) $this->get('QSO_default');
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setIsDefault(bool $is_default)
    {
        $this->set('QSO_default', $is_default);
    }
}
