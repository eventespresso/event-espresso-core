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
 *      FSC_status string
 *      FSC_wpUser int
 *
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EE_Form_Section extends EE_Base_Class
{

    /**
     * @var EE_Form_Input[]
     */
    private $form_inputs = [];



    /**
     * @param array $props_n_values
     * @return EE_Form_Section
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance(array $props_n_values = []): EE_Form_Section
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object ?: new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Form_Section
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db(array $props_n_values = []): EE_Form_Section
    {
        return new self($props_n_values, true);
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
     * last 8 characters of the UUID
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function uuidSlug(): string
    {
        return substr($this->UUID(), -8);
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
     * Form user types that this form section should be presented to.
     * Values correspond to the EEM_Form_Section::APPLIES_TO_* constants.
     *
     * @param EE_Registration|string $registrant
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function appliesToRegistrant($registrant): bool
    {
        switch ($this->appliesTo()) {
            case EEM_Form_Section::APPLIES_TO_PRIMARY:
                return $registrant instanceof EE_Registration && $registrant->is_primary_registrant();
            case EEM_Form_Section::APPLIES_TO_PURCHASER:
                return $registrant === 'purchaser';
            case EEM_Form_Section::APPLIES_TO_REGISTRANTS:
                return $registrant instanceof EE_Registration && ! $registrant->is_primary_registrant();
            case EEM_Form_Section::APPLIES_TO_ALL:
            default:
                return true;
        }
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
    public function belongsTo(): ?string
    {
        return $this->get('FSC_belongsTo');
    }


    /**
     * @param string $parent_UUID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setBelongsTo(string $parent_UUID)
    {
        $this->set('FSC_belongsTo', $parent_UUID);
    }


    /**
     * HTML classes to be applied to this form section's container.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function htmlClass(): ?string
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
     * Form Section label displayed on public forms as a heading
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function publicLabel(): ?string
    {
        return $this->get('FSC_publicLabel');
    }


    /**
     * @param string $public_label
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setPublicLabel(string $public_label)
    {
        $this->set('FSC_publicLabel', $public_label);
    }


    /**
     * Form Section label displayed on public forms as a heading
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function showLabel(): ?bool
    {
        return $this->get('FSC_showLabel');
    }


    /**
     * @param bool $show_label
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setShowLabel(bool $show_label)
    {
        $this->set('FSC_showLabel', $show_label);
    }


    /**
     * combination of public label and UUID slug for use in identifiers
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function slug(): ?string
    {
        $label = sanitize_title($this->publicLabel());
        return "{$label}-{$this->uuidSlug()}";
    }


    /**
     * Whether form section is active, archived, trashed, or used as a default on new forms.
     * Values correspond to the EEM_Form_Section::STATUS_* constants.
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function status(): ?string
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


    /**
     * @return EE_Form_Input[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function formInputs(): array
    {
        return $this->form_inputs ?: $this->getFormInputs();
    }


    /**
     * @return EE_Form_Input[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function getFormInputs(): array
    {
        $form_inputs = $this->get_many_related('Form_Input', ['order_by' => ['FIN_order' => 'ASC']]);
        foreach ($form_inputs as $form_input) {
            if ($form_input instanceof EE_Form_Input) {
                $this->form_inputs[ $form_input->UUID()] = $form_input;
            }
        }
        return $this->form_inputs;
    }


    /**
     * @param EE_Form_Input[] $form_inputs
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setFormInputs(array $form_inputs): void
    {
        foreach ($form_inputs as $form_input) {
            if ($form_input instanceof EE_Form_Input) {
                $this->form_inputs[ $form_input->UUID()] = $form_input;
            }
        }
    }


    /**
     * @param EE_Form_Input[] $all_form_inputs
     * @return EE_Form_Input[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function filterFormInputs(array $all_form_inputs): array
    {
        return array_filter($all_form_inputs, $this->formInputFilter());
    }


    /**
     * returns a closure that can be used to filter form inputs for this form section
     * usage:
     *  $filter = EEM_Form_Input::formInputFilter();
     *  $filtered_form_inputs = array_filter( $all_form_inputs, $filter );
     *
     * @return Closure
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function formInputFilter(): Closure
    {
        $FSC_UUID = strtolower($this->UUID());
        return function ($form_input) use ($FSC_UUID) {
            return $form_input instanceof EE_Form_Input && strtolower($form_input->belongsTo()) === $FSC_UUID;
        };
    }
}
