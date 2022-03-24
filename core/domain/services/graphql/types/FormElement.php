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
                'adminOnly',
                'Boolean',
                'adminOnly',
                esc_html__(
                    'Whether or not the element is only displayed in the admin. If false, input will appear in public forms',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'attributes',
                'String',
                'attributes',
                esc_html__(
                    'JSON string of HTML attributes such as class, max, min, placeholder, type, etc.',
                    'event_espresso'
                ),
                [$this, 'toJson']
            ),
            new GraphQLField(
                'belongsTo',
                'String',
                'belongsTo',
                esc_html__('UUID of parent form section this form element belongs to.', 'event_espresso')
            ),
            new GraphQLField(
                'helpText',
                'String',
                'helpText',
                esc_html__(
                    "JSON string of properties pertaining to any help text required for an input.",
                    'event_espresso'
                ),
                [$this, 'toJson']
            ),
            new GraphQLField(
                'label',
                'String',
                'label',
                esc_html__(
                    'JSON string of properties pertaining to an element\'s label.',
                    'event_espresso'
                ),
                [$this, 'toJson']
            ),
            new GraphQLField(
                'mapsTo',
                'String',
                'mapsTo',
                esc_html__("Model and Fields name that this element maps to; ex: Attendee.email", 'event_espresso')
            ),
            new GraphQLField(
                'options',
                'String',
                'options',
                esc_html__(
                    "JSON string of options for ENUM type inputs like checkboxes, radio buttons, select inputs, etc.",
                    'event_espresso'
                ),
                [$this, 'toJson']
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                esc_html__('Order in which form element appears in a form.', 'event_espresso')
            ),
            new GraphQLField(
                'required',
                'String',
                'required',
                esc_html__(
                    "properties pertaining to an input\'s required status and the validation text to display.",
                    'event_espresso'
                ),
                [$this, 'toJson']
            ),
            new GraphQLField(
                'status',
                $this->namespace . 'FormStatusEnum',
                'status',
                esc_html__(
                    'Whether form element is active, archived, trashed, or used as a default on new forms.',
                    'event_espresso'
                )
            ),
            new GraphQLField(
                'type',
                $this->namespace . 'ElementTypeEnum',
                'type',
                esc_html__('Form element type.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'wpUser',
                'User',
                null,
                esc_html__('WP User that created this form element.', 'event_espresso')
            ),
            new GraphQLInputField(
                'wpUser',
                'ID',
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

        // Make element 'type' a required field for create mutations
        // Yes it's "['type']['type']" 😄 - First one the field name, second one the GQL field type
        $inputFields['type']['type'] = ['non_null' => $inputFields['type']['type']];

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
