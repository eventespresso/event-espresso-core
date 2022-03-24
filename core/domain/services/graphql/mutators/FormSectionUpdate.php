<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Error;
use EE_Form_Section;
use EEM_Form_Section;
use EventEspresso\core\domain\services\graphql\data\mutations\FormSectionMutation;
use GraphQL\Type\Definition\ResolveInfo;
use ReflectionException;
use WPGraphQL\AppContext;
use Exception;

class FormSectionUpdate extends EntityMutator
{
    /**
     * Defines the mutation data modification closure.
     *
     * @param EEM_Form_Section $model
     * @return callable
     */
    public static function mutateAndGetPayload(EEM_Form_Section $model)
    {
        /**
         * Updates an entity.
         *
         * @param array       $input   The input for the mutation
         * @param AppContext  $context The AppContext passed down to all resolvers
         * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
         * @return array
         * @throws EE_Error
         * @throws ReflectionException
         */
        return static function (array $input, AppContext $context, ResolveInfo $info) use ($model): array {
            try {
                /** @var EE_Form_Section $entity */
                $entity = EntityMutator::getEntityFromInputData($model, $input);

                $args = FormSectionMutation::prepareFields($input);

                // Update the entity
                $entity->save($args);

                do_action(
                    'AHEE__EventEspresso_core_domain_services_graphql_mutators_form_section_update',
                    $entity,
                    $input
                );
            } catch (Exception $exception) {
                EntityMutator::handleExceptions(
                    $exception,
                    esc_html__(
                        'The form section could not be updated because of the following error(s)',
                        'event_espresso'
                    )
                );
            }

            return [
                'id' => $entity->UUID(),
            ];
        };
    }
}
