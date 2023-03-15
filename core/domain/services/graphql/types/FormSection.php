<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Form_Section;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\domain\services\graphql\mutators\FormSectionCreate;
use EventEspresso\core\domain\services\graphql\mutators\FormSectionDelete;
use EventEspresso\core\domain\services\graphql\mutators\FormSectionUpdate;
use Exception;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class FormSection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Manzoor Wani
 * @since   5.0.0.p
 * @property EEM_Form_Section $model
 */
class FormSection extends TypeBase
{
    /**
     * FormSection constructor.
     *
     * @param EEM_Form_Section $form_section_model
     */
    public function __construct(EEM_Form_Section $form_section_model)
    {
        $this->setName($this->namespace . 'FormSection');
        $this->setDescription(__('A form section', 'event_espresso'));
        $this->setIsCustomPostType(false);

        parent::__construct($form_section_model);
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
                'appliesTo',
                $this->namespace . 'FormSectionAppliesToEnum',
                'appliesTo',
                esc_html__('Form user type that this form section should be presented to.', 'event_espresso')
            ),
            new GraphQLField(
                'attributes',
                'String',
                'attributes',
                esc_html__(
                    'JSON string of HTML attributes, such as class, to be applied to this form section\'s container.',
                    'event_espresso'
                ),
                [$this, 'toJson']
            ),
            new GraphQLField(
                'belongsTo',
                'String',
                'belongsTo',
                esc_html__('UUID or ID of related entity this form section belongs to.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isActive',
                'Boolean',
                'isActive',
                esc_html__('Flag indicating whether the section is active.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isArchived',
                'Boolean',
                'isArchived',
                esc_html__('Flag indicating whether the section is archived.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isDefault',
                'Boolean',
                'isDefault',
                esc_html__('Flag indicating whether the section is a default one.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isShared',
                'Boolean',
                'isShared',
                esc_html__('Flag indicating whether the section is a shared one.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isTrashed',
                'Boolean',
                'isTrashed',
                esc_html__('Flag indicating whether the section is trashed.', 'event_espresso')
            ),
            new GraphQLField(
                'label',
                'String',
                'label',
                esc_html__(
                    'JSON string of properties pertaining to a form section\'s label.',
                    'event_espresso'
                ),
                [$this, 'toJson']
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                esc_html__('Order in which form section appears in a form.', 'event_espresso')
            ),
            new GraphQLField(
                'status',
                $this->namespace . 'FormStatusEnum',
                'status',
                esc_html__(
                    'Whether form section is active, archived, shared, trashed, or used as a default on new forms.',
                    'event_espresso'
                )
            ),
            new GraphQLOutputField(
                'wpUser',
                'User',
                null,
                esc_html__('WP User that created this form section.', 'event_espresso')
            ),
            new GraphQLInputField(
                'wpUser',
                'ID',
                null,
                esc_html__('ID of the WP User that created the form section.', 'event_espresso')
            ),
        ];

        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_types__form_section_fields',
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
     * @since 5.0.0.p
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
                'mutateAndGetPayload' => FormSectionUpdate::mutateAndGetPayload($this->model),
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
                'mutateAndGetPayload' => FormSectionDelete::mutateAndGetPayload($this->model),
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
                'mutateAndGetPayload' => FormSectionCreate::mutateAndGetPayload($this->model),
            ]
        );
    }
}
