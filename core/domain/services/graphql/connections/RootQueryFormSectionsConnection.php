<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Form_Section;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AbstractConnectionResolver;
use EventEspresso\core\domain\services\graphql\connection_resolvers\FormSectionConnectionResolver;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use Exception;

/**
 * Class RootQueryFormSectionsConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class RootQueryFormSectionsConnection extends AbstractRootQueryConnection
{


    /**
     * FormSectionConnection constructor.
     *
     * @param EEM_Form_Section               $model
     */
    public function __construct(EEM_Form_Section $model)
    {
        parent::__construct($model);
    }


    /**
     * @return array
     */
    public function config(): array
    {
        return [
            'fromType'           => 'RootQuery',
            'toType'             => $this->namespace . 'FormSection',
            'fromFieldName'      => lcfirst($this->namespace) . 'FormSections',
            'connectionTypeName' => "{$this->namespace}RootQueryFormSectionsConnection",
            'connectionArgs'     => $this->get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return FormSectionConnectionResolver
     * @throws Exception
     */
    public function getConnectionResolver($entity, $args, $context, $info): AbstractConnectionResolver
    {
        return new FormSectionConnectionResolver($entity, $args, $context, $info);
    }

    /**
     * Given an optional array of args, this returns the args to be used in the connection
     *
     * @param array $args The args to modify the defaults
     * @return array
     */
    // phpcs:ignore PSR1.Methods.CamelCapsMethodName.NotCamelCaps
    public function get_connection_args(array $args = []): array
    {
        $newArgs = [
            'appliesTo' => [
                'type'        => ['list_of' => $this->namespace . 'FormSectionAppliesToEnum'],
                'description' => esc_html__(
                    'Form user types to get the form sections for.',
                    'event_espresso'
                ),
            ],
            'belongsTo' => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__(
                    'Related entity IDs to get the form sections for.',
                    'event_espresso'
                ),
            ],
            'status' => [
                'type'        => ['list_of' => $this->namespace . 'FormSectionStatusEnum'],
                'description' => esc_html__(
                    'Filter the form sections by status.',
                    'event_espresso'
                ),
            ],
        ];

        $newArgs = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connections__form_section_args',
            $newArgs,
            $args
        );
        return array_merge(
            $newArgs,
            $args
        );
    }
}
