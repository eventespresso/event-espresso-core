<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Form_Element;
use EEM_Form_Element;
use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class FormElementDelete extends EntityMutator
{

    /**
     * Defines the mutation data modification closure.
     *
     * @param EEM_Form_Element $model
     * @return callable
     */
    public static function mutateAndGetPayload(EEM_Form_Element $model)
    {
        /**
         * Deletes an entity.
         *
         * @param array       $input   The input for the mutation
         * @param AppContext  $context The AppContext passed down to all resolvers
         * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
         * @return array
         */
        return static function (array $input, AppContext $context, ResolveInfo $info) use ($model): array {
            try {
                /** @var EE_Form_Element $entity */
                $entity = EntityMutator::getEntityFromInputData($model, $input);

                $result = $entity->delete();
                EntityMutator::validateResults($result);

                do_action(
                    'AHEE__EventEspresso_core_domain_services_graphql_mutators_form_element_delete',
                    $entity,
                    $input
                );
            } catch (Exception $exception) {
                EntityMutator::handleExceptions(
                    $exception,
                    esc_html__(
                        'The form element could not be deleted because of the following error(s)',
                        'event_espresso'
                    )
                );
            }

            return [
                'deleted' => $entity,
            ];
        };
    }
}
