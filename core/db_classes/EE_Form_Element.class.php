<?php

use EventEspresso\core\services\form\meta\Attributes;
use EventEspresso\core\services\form\meta\FormLabel;
use EventEspresso\core\services\form\meta\HelpText;
use EventEspresso\core\services\form\meta\InputOptions;
use EventEspresso\core\services\form\meta\Required;

/**
 * Class EE_Form_Element
 *
 * Model Fields:
 *  FIN_UUID         string
 *  FSC_UUID         string    UUID of parent form section
 *  FIN_adminOnly    bool
 *  FIN_attributes   JSON string
 *  FIN_helpText     JSON string
 *  FIN_label        JSON string
 *  FIN_mapsTo       string
 *  FIN_options      JSON string
 *  FIN_order        int
 *  FIN_required     JSON string
 *  FIN_status       string    ex: 'archived'
 *  FIN_wpUser       int
 *
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EE_Form_Element extends EE_Base_Class
{

    /**
     * @var Attributes
     */
    private $attributes;

    /**
     * @var FormLabel
     */
    private $label;

    /**
     * @var HelpText
     */
    private $helpText;

    /**
     * @var InputOptions
     */
    private $options;

    /**
     * @var Required
     */
    private $required;


    /**
     * @param array $props_n_values
     * @return EE_Form_Element
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance(array $props_n_values = []): EE_Form_Element
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__);
        return $has_object ?: new self($props_n_values);
    }


    /**
     * @param array $props_n_values
     * @return EE_Form_Element
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db(array $props_n_values = []): EE_Form_Element
    {
        return new self($props_n_values);
    }


    /**
     * Form Element UUID (universally unique identifier)
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
     * Whether or not input is only displayed in the admin. If false, input will appear in public forms
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function adminOnly(): ?bool
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
     * JSON string of HTML attributes such as class, max, min, placeholder, type, etc.
     *
     * @return Attributes
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function attributes(): ?Attributes
    {
        if (! $this->attributes instanceof Attributes) {
            $this->attributes = Attributes::fromJson($this->get('FIN_attributes'));
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
        $this->set('FIN_attributes', $attributes->toArray());
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
        return $this->get('FSC_UUID');
    }


    /**
     * @param string $relation_UUID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setBelongsTo(string $relation_UUID)
    {
        $this->set('FSC_UUID', $relation_UUID);
    }


    /**
     * returns a HelpText object for managing input help text
     *
     * @return HelpText
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function helpText(): ?HelpText
    {
        if (! $this->helpText instanceof HelpText) {
            $this->helpText = HelpText::fromJson($this->get('FIN_helpText'));
        }
        return $this->helpText;
    }


    /**
     * @param HelpText $helpText
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setHelpText(HelpText $helpText)
    {
        // set local object
        $this->helpText = $helpText;
        // then pass to model as an array which will get converted to JSON by the model field
        $this->set('FIN_helpText', $helpText->toArray());
    }


    /**
     * returns a FormLabel object for managing input labels
     *
     * @return FormLabel
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function label(): ?FormLabel
    {
        if (! $this->label instanceof FormLabel) {
            $this->label = FormLabel::fromJson($this->get('FIN_label'));
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
        $this->set('FIN_label', $label->toArray());
    }


    /**
     * Model and Fields name that this input maps to; ex: Attendee.email
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function mapsTo():? string
    {
        return $this->get('FIN_mapsTo');
    }


    /**
     * @param string $model ex: Attendee
     * @param string $field ex: email
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setMapsTo(string $model, string $field)
    {
        $model_name = strpos($model, 'EEM_') !== 0 ? "EEM_$model" : $model;
        if (! class_exists($model_name) ) {
            throw new DomainException(
              sprintf(
                  esc_html__(
                      'The %1$s model does not exist or can not be located. Please verify the spelling and whether it is loaded.',
                      'event_espresso'
                  ),
                  $model_name
              )
            );
        }
        $this->set('FIN_mapsTo', "{$model}.{$field}");
    }


    /**
     * Options for ENUM type inputs like checkboxes, radio buttons, select inputs, etc
     *
     * @return InputOptions
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function options(): ?InputOptions
    {
        if (! $this->options instanceof InputOptions) {
            $this->options = InputOptions::fromJson($this->get('FIN_options'));
        }
        return $this->options;
    }


    /**
     * @param InputOptions $options
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setOptions(InputOptions $options)
    {
        // set local object
        $this->options = $options;
        // then pass to model as an array which will get converted to JSON by the model field
        $this->set('FIN_options', $options->toArray());
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
    public function placeholder():? string
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
     * Whether or not the input must be supplied with a value in order to complete the form.
     *
     * @return Required
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function required(): ?Required
    {
        if (! $this->required instanceof Required) {
            $this->required = Required::fromJson($this->get('FIN_required'));
        }
        return $this->required;
    }


    /**
     * @param Required $required
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function setRequired(Required $required)
    {
        // set local object
        $this->required = $required;
        // then pass to model as an array which will get converted to JSON by the model field
        $this->set('FIN_required', $required->toArray());
    }


    /**
     * version of public label for use in identifiers
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function slug(): ?string
    {
        return sanitize_title($this->label()->publicLabel());
    }


    /**
     * Whether form input is active, archived, trashed, or used as a default on new forms.
     * Values correspond to the EEM_Form_Element::STATUS_* constants.
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
     * Values correspond to the EEM_Form_Element::STATUS_* constants.
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
    public function type(): ?string
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
    public function wp_user(): int
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


    /**
     * @param array $set_cols_n_values
     * @return bool|int|string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function save($set_cols_n_values = [])
    {
        // make sure internal versions for all composite objects are updated
        $this->set('FIN_attributes', $this->attributes()->toArray());
        $this->set('FIN_helpText', $this->helpText()->toArray());
        $this->set('FIN_label', $this->label()->toArray());
        $this->set('FIN_options', $this->options()->toArray());
        $this->set('FIN_required', $this->required()->toArray());
        return parent::save($set_cols_n_values);
    }
}
