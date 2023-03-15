<?php

namespace EventEspresso\core\domain\services\graphql\connections;

use EEM_Form_Element;
use EventEspresso\core\domain\services\graphql\connection_resolvers\AbstractConnectionResolver;
use EventEspresso\core\domain\services\graphql\connection_resolvers\FormElementConnectionResolver;
use EventEspresso\core\domain\services\graphql\abstracts\AbstractRootQueryConnection;
use Exception;

/**
 * Class RootQueryFormElementsConnection
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\connections
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class RootQueryFormElementsConnection extends AbstractRootQueryConnection
{
    /**
     * FormElementConnection constructor.
     *
     * @param EEM_Form_Element $model
     */
    public function __construct(EEM_Form_Element $model)
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
            'toType'             => $this->namespace . 'FormElement',
            'fromFieldName'      => lcfirst($this->namespace) . 'FormElements',
            'connectionTypeName' => "{$this->namespace}RootQueryFormElementsConnection",
            'connectionArgs'     => $this->get_connection_args(),
            'resolve'            => [$this, 'resolveConnection'],
        ];
    }


    /**
     * @param $entity
     * @param $args
     * @param $context
     * @param $info
     * @return FormElementConnectionResolver
     * @throws Exception
     */
    public function getConnectionResolver($entity, $args, $context, $info): AbstractConnectionResolver
    {
        return new FormElementConnectionResolver($entity, $args, $context, $info);
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
            'belongsTo' => [
                'type'        => ['list_of' => 'ID'],
                'description' => esc_html__(
                    'Related entity IDs to get the form elements for.',
                    'event_espresso'
                ),
            ],
            'status' => [
                'type'        => ['list_of' => $this->namespace . 'FormSectionStatusEnum'],
                'description' => esc_html__(
                    'Filter the form elements by status.',
                    'event_espresso'
                ),
            ],
        ];

        $newArgs = apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_connections__form_element_args',
            $newArgs,
            $args
        );
        return array_merge(
            $newArgs,
            $args
        );
    }
}
