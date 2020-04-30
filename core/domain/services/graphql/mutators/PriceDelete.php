<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Price;
use EEM_Price;
use EE_Error;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;
use Exception;
use EventEspresso\core\domain\services\graphql\types\Price;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class PriceDelete extends EntityMutator
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
         * Deletes an entity.
         *
         * @param array       $input   The input for the mutation
         * @param AppContext  $context The AppContext passed down to all resolvers
         * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
         * @return array
         */
        return static function ($input, AppContext $context, ResolveInfo $info) use ($model, $type) {
            try {
                /** @var EE_Price $entity */
                $entity = EntityMutator::getEntityFromInputData($model, $input);

                // Delete the entity
                if (! empty($input['deletePermanently'])) {
                    $result = PriceDelete::deletePriceAndRelations($entity);
                } else {
                    // trash the price
                    $result = $entity->delete();
                }
                EntityMutator::validateResults($result);
            } catch (Exception $exception) {
                EntityMutator::handleExceptions(
                    $exception,
                    esc_html__(
                        'The price could not be deleted because of the following error(s)',
                        'event_espresso'
                    )
                );
            }

            return [
                'deleted' => $entity,
            ];
        };
    }

    /**
     * Deletes a price permanently along with its relations.
     *
     * @param EE_Price $entity
     * @return bool | int
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     */
    public static function deletePriceAndRelations($entity)
    {
        // Remove relation with ticket
        $entity->_remove_relations('Ticket');
        // Now delete the price permanently
        $result = $entity->delete_permanently();

        return $result;
    }
}
