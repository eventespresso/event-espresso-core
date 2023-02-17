<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Error;
use EE_Price;
use EEM_Price;
use EventEspresso\core\domain\services\graphql\types\Price;
use EventEspresso\core\domain\services\graphql\data\mutations\PriceMutation;
use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use ReflectionException;
use WPGraphQL\AppContext;

class PriceUpdate extends EntityMutator
{
    /**
     * Defines the mutation data modification closure.
     *
     * @param EEM_Price $model
     * @param Price     $type
     * @return callable
     */
    public static function mutateAndGetPayload(EEM_Price $model, Price $type)
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
        return static function (array $input, AppContext $context, ResolveInfo $info) use ($model, $type): array {
            try {
                /** @var EE_Price $entity */
                $entity = EntityMutator::getEntityFromInputData($model, $input);

                $args = PriceMutation::prepareFields($input);

                // Update the entity
                $entity->save($args);

                do_action('AHEE__EventEspresso_core_domain_services_graphql_mutators_price_update', $entity, $input);
            } catch (Exception $exception) {
                EntityMutator::handleExceptions(
                    $exception,
                    esc_html__(
                        'The price could not be updated because of the following error(s)',
                        'event_espresso'
                    )
                );
            }

            return [
                'id' => $entity->ID(),
            ];
        };
    }
}
