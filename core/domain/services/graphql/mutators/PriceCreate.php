<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EE_Price;
use EEM_Price;
use EventEspresso\core\domain\services\graphql\types\Price;
use EventEspresso\core\domain\services\graphql\data\mutations\PriceMutation;
use Exception;
use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class PriceCreate extends EntityMutator
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
         * Creates an entity.
         *
         * @param array       $input   The input for the mutation
         * @param AppContext  $context The AppContext passed down to all resolvers
         * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
         * @return array
         */
        return static function ($input, AppContext $context, ResolveInfo $info) use ($model, $type) {
            try {
                EntityMutator::checkPermissions($model);

                $args = PriceMutation::prepareFields($input);

                if (empty($args['PRT_ID'])) {
                    // translators: the placeholder is the name of the field.
                    throw new UserError(
                        sprintf(esc_html__('A valid %1$s must be passed.', 'event_espresso'), 'priceType')
                    );
                }

                $entity = EE_Price::new_instance($args);
                $id = $entity->save();
                EntityMutator::validateResults($id);
            } catch (Exception $exception) {
                return EntityMutator::handleExceptions(
                    $exception,
                    esc_html__(
                        'The price could not be created because of the following error(s)',
                        'event_espresso'
                    )
                );
            }

            return [
                'id' => $id,
            ];
        };
    }
}
