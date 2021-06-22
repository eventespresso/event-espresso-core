<?php

/**
 * Class EE_Form_Section
 * Model Fields:
 *      FSC_ID int
 *      FSC_UUID string
 *      FSC_appliesTo string
 *      FSC_belongsTo string
 *      FSC_htmlClass string
 *      FSC_order int
 *      FSC_relation string
 *      FSC_status string
 *      FSC_wpUser int
 *
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EE_Form_Section extends EE_Base_Class
{

    /**
     * @param array $props_n_values
     * @return EE_Form_Section
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance(array $props_n_values = []): EE_Form_Section
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object
            ?: new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Form_Section
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db(array $props_n_values = []): EE_Form_Section
    {
        return new self($props_n_values);
    }


    /**
     * Form Section UUID (universally unique identifier)
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function UUID(): string
    {
        return $this->get('FSC_UUID');
    }


    /**
     * @param string $UUID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setUUID(string $UUID)
    {
        $this->set('FSC_UUID', $UUID);
    }


    /**
     * Form user types that this form section should be presented to.
     * Values correspond to the EEM_Form_Section::APPLIES_TO_* constants.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function appliesTo(): string
    {
        return $this->get('FSC_appliesTo');
    }


    /**
     * @param string $user_type
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setAppliesTo(string $user_type)
    {
        $this->set('FSC_appliesTo', $user_type);
    }


    /**
     * UUID or ID of related entity this form section belongs to.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function belongsTo(): string
    {
        return $this->get('FSC_belongsTo');
    }


    /**
     * @param string $relation_UUID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setBelongsTo(string $relation_UUID)
    {
        $this->set('FSC_belongsTo', $relation_UUID);
    }


    /**
     * HTML classes to be applied to this form section's container.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function htmlClass(): string
    {
        return $this->get('FSC_htmlClass');
    }


    /**
     * @param string $html_class
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setHtmlClass(string $html_class)
    {
        $this->set('FSC_htmlClass', $html_class);
    }


    /**
     * Order in which form section appears in a form.
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function order(): int
    {
        return $this->get('FSC_order');
    }


    /**
     * @param int $order
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setOrder(int $order)
    {
        $this->set('FSC_order', $order);
    }


    /**
     * Related model type.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function relation(): string
    {
        return $this->get('FSC_relation');
    }


    /**
     * @param string $relation
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setRelation(string $relation)
    {
        $this->set('FSC_relation', $relation);
    }


    /**
     * Whether form section is active, archived, trashed, or used as a default on new forms.
     * Values correspond to the EEM_Form_Section::STATUS_* constants.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function status(): string
    {
        return $this->get('FSC_status');
    }


    /**
     * Whether form section is active, archived, trashed, or used as a default on new forms.
     * Values correspond to the EEM_Form_Section::STATUS_* constants.
     *
     * @param string $status
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setStatus(string $status)
    {
        $this->set('FSC_status', $status);
    }


    /**
     * returns the id the wordpress user who created this question
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function wp_user(): int
    {
        return $this->get('FSC_wpUser');
    }


    /**
     * @param int $wp_user
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setWpUser(int $wp_user)
    {
        $this->set('FSC_wpUser', $wp_user);
    }
}
