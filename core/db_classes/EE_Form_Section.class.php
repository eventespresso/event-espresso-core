<?php

use EndyJasmi\Cuid;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\form\meta\Attributes;
use EventEspresso\core\services\form\meta\FormLabel;
use EventEspresso\core\services\form\meta\FormStatus;

/**
 * Class EE_Form_Section
 *
 * Model Fields:
 *  FSC_UUID         string
 *  FSC_appliesTo    string
 *  FSC_attributes   JSON string
 *  FSC_belongsTo    string
 *  FSC_label        JSON string
 *  FSC_order        int
 *  FSC_status       string    ex: 'archived'
 *  FSC_wpUser       int
 *
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EE_Form_Section extends EE_Base_Class
{

    /**
     * @var Attributes
     */
    private $attributes;

    /**
     * @var EE_Form_Element[]
     */
    private $form_elements = [];

    /**
     * @var FormLabel
     */
    private $label;



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
        if (! Cuid::isCuid($UUID)) {
            throw new InvalidArgumentException(
                sprintf(
                    /* translators: 1: UUID value, 2: UUID generator function. */
                    esc_html__(
                        'The supplied UUID "%1$s" is invalid or missing. Please use %2$s to generate a valid one.',
                        'event_espresso'
                    ),
                    $UUID,
                    "`Cuid::cuid()`"
                )
            );
        }
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
     * JSON string of HTML attributes, such as class, to be applied to this form section\'s container.
     *
     * @return Attributes
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function attributes(): ?Attributes
    {
        if (! $this->attributes instanceof Attributes) {
            $this->attributes = Attributes::fromJson($this->get('FSC_attributes'));
        }
        return $this->attributes;
    }


    /**
     * @param Attributes $attributes
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setAttributes(Attributes $attributes)
    {
        // set local object
        $this->attributes = $attributes;
        // then pass to model as an array which will get converted to JSON by the model field
        $this->set('FSC_attributes', $attributes->toArray());
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
     * @return EE_Form_Element[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function formElements(): array
    {
        return $this->form_elements ?: $this->getFormElements();
    }


    /**
     * @return EE_Form_Element[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function getFormElements(): array
    {
        $form_elements = $this->get_many_related('Form_Element', ['order_by' => ['FIN_order' => 'ASC']]);
        foreach ($form_elements as $form_element) {
            if ($form_element instanceof EE_Form_Element) {
                $this->form_elements[ $form_element->UUID() ] = $form_element;
            }
        }
        return $this->form_elements;
    }


    /**
     * @param EE_Form_Element[] $form_elements
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setFormElements(array $form_elements): void
    {
        foreach ($form_elements as $form_element) {
            if ($form_element instanceof EE_Form_Element) {
                $this->_add_relation_to($form_element->UUID(), 'Form_Element');
                $this->form_elements[ $form_element->UUID() ] = $form_element;
            }
        }
    }


    /**
     * @param EE_Form_Element[] $all_form_elements
     * @return EE_Form_Element[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function filterFormElements(array $all_form_elements): array
    {
        return array_filter($all_form_elements, $this->formElementFilter());
    }


    /**
     * returns a closure that can be used to filter form elements for this form section
     * usage:
     *  $filter = EEM_Form_Element::formElementFilter();
     *  $filtered_form_elements = array_filter( $all_form_elements, $filter );
     *
     * @return Closure
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function formElementFilter(): Closure
    {
        $FSC_UUID = strtolower($this->UUID());
        return function ($form_element) use ($FSC_UUID) {
            return $form_element instanceof EE_Form_Element && strtolower($form_element->belongsTo()) === $FSC_UUID;
        };
    }


    /**
     * returns a FormLabel object for managing form section labels, ie: the form section heading
     *
     * @return FormLabel
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function label(): ?FormLabel
    {
        if (! $this->label instanceof FormLabel) {
            $this->label = FormLabel::fromJson($this->get('FSC_label'));
        }
        return $this->label;
    }


    /**
     * @param FormLabel $label
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setLabel(FormLabel $label)
    {
        // set local object
        $this->label = $label;
        // then pass to model as an array which will get converted to JSON by the model field
        $this->set('FSC_label', $label->toJson());
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
     * combination of public label and UUID slug for use in identifiers
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function slug(): ?string
    {
        $label = sanitize_title($this->label()->publicLabel());
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
     * @param array $set_cols_n_values
     * @return bool|int|string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function save($set_cols_n_values = [])
    {
        // make sure internal versions for all composite objects are updated
        $this->set('FSC_attributes', $this->attributes()->toArray());
        $this->set('FSC_label', $this->label()->toArray());
        return parent::save($set_cols_n_values);
    }

    /**
     * Whether the section is active.
     *
     * @return boolean  TRUE if is active, FALSE if not.
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function isActive(): bool
    {
        return $this->status() === FormStatus::ACTIVE;
    }

    /**
     * Whether the section is archived.
     *
     * @return boolean  TRUE if is archived, FALSE if not.
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function isArchived(): bool
    {
        return $this->status() === FormStatus::ARCHIVED;
    }

    /**
     * Whether the section is a default one.
     *
     * @return boolean  TRUE if is default, FALSE if not.
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function isDefault(): bool
    {
        return $this->status() === FormStatus::DEFAULT;
    }

    /**
     * Whether the section is a shared one.
     *
     * @return boolean  TRUE if is shared, FALSE if not.
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function isShared(): bool
    {
        return $this->status() === FormStatus::SHARED;
    }

    /**
     * Whether the section is trashed.
     *
     * @return boolean  TRUE if is trashed, FALSE if not.
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public function isTrashed(): bool
    {
        return $this->status() === FormStatus::TRASHED;
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function isTopLevelFormSection(): bool
    {
        return empty($this->belongsTo());
    }
}
