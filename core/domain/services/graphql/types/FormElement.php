<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Form_Element;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\domain\services\graphql\mutators\FormElementCreate;
use EventEspresso\core\domain\services\graphql\mutators\FormElementDelete;
use EventEspresso\core\domain\services\graphql\mutators\FormElementUpdate;
use Exception;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class FormElement
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Manzoor Wani
 * @since   $VID:$
 * @property EEM_Form_Element $model
 */
class FormElement extends TypeBase
{

    /**
     * FormElement constructor.
     *
     * @param EEM_Form_Element $form_element_model
     */
    public function __construct(EEM_Form_Element $form_element_model)
    {
        $this->setName($this->namespace . 'FormElement');
        $this->setDescription(__('A form element', 'event_espresso'));
        $this->setIsCustomPostType(false);

        parent::__construct($form_element_model);
    }


    /**
     * @return GraphQLFieldInterface[]
     */
    public function getFields(): array
    {
        $fields = [
            new GraphQLField(
                'id',
                ['non_null' => 'ID'],
                null,
                esc_html__('The globally unique ID for the object.', 'event_espresso')
            ),
            new GraphQLField(
                'adminLabel',
                'String',
                'adminLabel',
                esc_html__(
                    'Form Element label displayed in the admin to help differentiate it from others.',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'adminOnly',
                'Boolean',
                'adminOnly',
                esc_html__(
                    'Whether or not the element is only displayed in the admin. If false, input will appear in public forms',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'belongsTo',
                'String',
                'belongsTo',
                esc_html__('UUID of parent form section this form element belongs to.', 'event_espresso')
            ),
            new GraphQLField(
                'helpClass',
                'String',
                'helpClass',
                esc_html__("Custom HTML classes to be applied to this form element's help text.", 'event_espresso')
            ),
            new GraphQLField(
                'helpText',
                'String',
                'helpText',
                esc_html__(
                    'Additional text displayed alongside a form element to assist users with completing the form.',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'htmlClass',
                'String',
                'htmlClass',
                esc_html__("HTML classes to be applied to this form element's container.", 'event_espresso')
            ),
            new GraphQLField(
                'mapsTo',
                'String',
                'mapsTo',
                esc_html__("Model and Fields name that this input maps to; ex: Attendee.email", 'event_espresso')
            ),
            new GraphQLField(
                'max',
                'Int',
                'max',
                esc_html__(
                    "Maximum numeric value or maximum characters allowed for form input answer.",
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'min',
                'Int',
                'min',
                esc_html__(
                    "Minimum numeric value or minimum characters allowed for form input answer.",
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'options',
                'String',
                'options',
                esc_html__(
                    "JSON string of options for ENUM type inputs like checkboxes, radio buttons, select inputs, etc.",
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                esc_html__('Order in which form element appears in a form.', 'event_espresso')
            ),
            new GraphQLField(
                'placeholder',
                'String',
                'placeholder',
                esc_html__(
                    "Example text displayed within an input to assist users with completing the form.",
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'publicLabel',
                'String',
                'publicLabel',
                esc_html__('Element label displayed on public forms, ie: the actual question text.', 'event_espresso')
            ),
            new GraphQLField(
                'required',
                'Boolean',
                'required',
                esc_html__(
                    'Whether or not the input must be supplied with a value in order to complete the form.',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'requiredText',
                'String',
                'requiredText',
                esc_html__(
                    'Custom validation text displayed alongside a required form input to assist users with completing the form.',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'status',
                $this->namespace . 'FormSectionStatusEnum',
                'status',
                esc_html__(
                    'Whether form input is active, archived, trashed, or used as a default on new forms.',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'type',
                'String',
                'type',
                esc_html__('Form input type.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'wpUser',
                'User',
                null,
                esc_html__('WP User that created this form element.', 'event_espresso')
            ),
            new GraphQLInputField(
                'wpUser',
                'Int',
                null,
                esc_html__('ID of the WP User that created the form element.', 'event_espresso')
            ),
        ];

        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_types__form_element_fields',
            $fields,
            $this->name,
            $this->model
        );
    }


    /**
     * @param array $inputFields The mutation input fields.
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws Exception
     * @since $VID:$
     */
    public function registerMutations(array $inputFields)
    {
        // Register mutation to update an entity.
        register_graphql_mutation(
            'update' . $this->name(),
            [
                'inputFields'         => $inputFields,
                'outputFields'        => [
                    lcfirst($this->name()) => [
                        'type'    => $this->name(),
                        'resolve' => [$this, 'resolveFromPayload'],
                    ],
                ],
                'mutateAndGetPayload' => FormElementUpdate::mutateAndGetPayload($this->model),
            ]
        );
        // Register mutation to delete an entity.
        register_graphql_mutation(
            'delete' . $this->name(),
            [
                'inputFields'         => [
                    'id' => $inputFields['id'],
                ],
                'outputFields'        => [
                    lcfirst($this->name()) => [
                        'type'        => $this->name(),
                        'description' => esc_html__('The object before it was deleted', 'event_espresso'),
                        'resolve'     => static function ($payload) {
                            $deleted = (object) $payload['deleted'];

                            return ! empty($deleted) ? $deleted : null;
                        },
                    ],
                ],
                'mutateAndGetPayload' => FormElementDelete::mutateAndGetPayload($this->model),
            ]
        );

        // Register mutation to update an entity.
        register_graphql_mutation(
            'create' . $this->name(),
            [
                'inputFields'         => $inputFields,
                'outputFields'        => [
                    lcfirst($this->name()) => [
                        'type'    => $this->name(),
                        'resolve' => [$this, 'resolveFromPayload'],
                    ],
                ],
                'mutateAndGetPayload' => FormElementCreate::mutateAndGetPayload($this->model),
            ]
        );
    }
}
