<?php

/**
 * Class EE_Form_Input
 * Model Fields:
 *      FIN_ID 
 *      FIN_UUID
 *      FIN_adminLabel
 *      FIN_adminOnly
 *      FIN_belongsTo
 *      FIN_helpClass
 *      FIN_helpText
 *      FIN_htmlClass
 *      FIN_max
 *      FIN_min
 *      FIN_order
 *      FIN_placeholder
 *      FIN_publicLabel
 *      FIN_required
 *      FIN_requiredText
 *      FIN_status
 *      FIN_type
 *      FIN_wpUser
 *
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EE_Form_Input extends EE_Base_Class
{

    /**
     * @param array $props_n_values
     * @return EE_Form_Input
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance(array $props_n_values = []): EE_Form_Input
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object
            ?: new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Form_Input
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db(array $props_n_values = []): EE_Form_Input
    {
        return new self($props_n_values);
    }


    /**
     * Form Input UUID (universally unique identifier)
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function UUID(): string
    {
        return $this->get('FIN_UUID');
    }


    /**
     * @param string $UUID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setUUID(string $UUID)
    {
        $this->set('FIN_UUID', $UUID);
    }


    /**
     * Input label displayed in the admin to help differentiate input from others
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function adminLabel(): string
    {
        return $this->get('FIN_adminLabel');
    }


    /**
     * @param string $admin_label
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setAdminLabel(string $admin_label)
    {
        $this->set('FIN_adminLabel', $admin_label);
    }


    /**
     * Whether or not input is only displayed in the admin. If false, input will appear in public forms
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function adminOnly(): bool
    {
        return $this->get('FIN_adminOnly');
    }


    /**
     * @param bool $admin_only
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setAdminOnly(bool $admin_only)
    {
        $this->set('FIN_adminOnly', $admin_only);
    }


    /**
     * UUID of parent form section this form input belongs to.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function belongsTo(): string
    {
        return $this->get('FIN_belongsTo');
    }


    /**
     * @param string $relation_UUID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setBelongsTo(string $relation_UUID)
    {
        $this->set('FIN_belongsTo', $relation_UUID);
    }


    /**
     * Custom HTML classes to be applied to this form input's help text.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function helpClass(): string
    {
        return $this->get('FIN_helpClass');
    }


    /**
     * @param string $help_class
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setHelpClass(string $help_class)
    {
        $this->set('FIN_helpClass', $help_class);
    }


    /**
     * Additional text displayed alongside a form input to assist users with completing the form.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function helpText(): string
    {
        return $this->get('FIN_helpText');
    }


    /**
     * @param string $help_text
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setHelpText(string $help_text)
    {
        $this->set('FIN_helpText', $help_text);
    }


    /**
     * HTML classes to be applied to this form input's container.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function htmlClass(): string
    {
        return $this->get('FIN_htmlClass');
    }


    /**
     * HTML classes to be applied to this form input's container.
     *
     * @param string $html_class
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setHtmlClass(string $html_class)
    {
        $this->set('FIN_htmlClass', $html_class);
    }


    /**
     * Maximum numeric value or maximum characters allowed for form input answer.
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function max(): int
    {
        return $this->get('FIN_max');
    }


    /**
     * @param int $max
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setMax(int $max)
    {
        $this->set('FIN_max', $max);
    }



    /**
     * Minimum numeric value or minimum characters allowed for form input answer.
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function min(): int
    {
        return $this->get('FIN_min');
    }


    /**
     * @param int $min
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setMin(int $min)
    {
        $this->set('FIN_min', $min);
    }



    /**
     * Order in which form input appears in a form.
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function order(): int
    {
        return $this->get('FIN_order');
    }


    /**
     * Order in which form input appears in a form.
     *
     * @param int $order
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setOrder(int $order)
    {
        $this->set('FIN_order', $order);
    }


    /**
     * Example text displayed within an input to assist users with completing the form.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function placeholder(): string
    {
        return $this->get('FIN_placeholder');
    }


    /**
     * @param string $placeholder
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setPlaceholder(string $placeholder)
    {
        $this->set('FIN_placeholder', $placeholder);
    }


    /**
     * Input label displayed on public forms, ie: the actual question text.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function publicLabel(): string
    {
        return $this->get('FIN_publicLabel');
    }


    /**
     * @param string $publicLabel
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setPublicLabel(string $publicLabel)
    {
        $this->set('FIN_publicLabel', $publicLabel);
    }


    /**
     * Whether or not the input must be supplied with a value in order to complete the form.
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function required(): bool
    {
        return $this->get('FIN_required');
    }


    /**
     * @param bool $required
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setRequired(bool $required)
    {
        $this->set('FIN_required', $required);
    }


    /**
     * Custom validation text displayed alongside a required form input to assist users with completing the form.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function requiredText(): string
    {
        return $this->get('FIN_requiredText');
    }


    /**
     * @param string $requiredText
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setRequiredText(string $requiredText)
    {
        $this->set('FIN_requiredText', $requiredText);
    }


    /**
     * Whether form input is active, archived, trashed, or used as a default on new forms.
     * Values correspond to the EEM_Form_Input::STATUS_* constants.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function status(): string
    {
        return $this->get('FIN_status');
    }


    /**
     * Whether form input is active, archived, trashed, or used as a default on new forms.
     * Values correspond to the EEM_Form_Input::STATUS_* constants.
     *
     * @param string $status
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setStatus(string $status)
    {
        $this->set('FIN_status', $status);
    }


    /**
     * Form input type.
     * Values correspond to the EventEspresso\core\domain\entities\form\Input::TYPE_* constants.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function type(): string
    {
        return $this->get('FIN_type');
    }


    /**
     * @param string $type
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setType(string $type)
    {
        $this->set('FIN_type', $type);
    }


    /**
     * ID of the WP User that created this form input.
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function wpUser(): int
    {
        return $this->get('FIN_wpUser');
    }


    /**
     * returns the id the wordpress user who created this question
     *
     * @param int $wp_user
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setWpUser(int $wp_user)
    {
        $this->set('FIN_wpUser', $wp_user);
    }
}
