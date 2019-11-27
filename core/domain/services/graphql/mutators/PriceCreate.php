<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EEM_Price;
use EE_Price;
use EventEspresso\core\domain\services\graphql\types\Price;
use EventEspresso\core\domain\services\graphql\data\mutations\PriceMutation;

use EE_Error;
use InvalidArgumentException;
use ReflectionException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use GraphQL\Error\UserError;

class PriceCreate
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
         * @throws UserError
         * @throws ReflectionException
         * @throws InvalidArgumentException
         * @throws InvalidInterfaceException
         * @throws InvalidDataTypeException
         * @throws EE_Error
         */
        return static function ($input, AppContext $context, ResolveInfo $info) use ($model, $type) {

            /**
             * Stop now if a user isn't allowed to create an entity.
             */
            if (! current_user_can('ee_edit_events')) {
                // translators: the %1$s is the name of the object being mutated
                throw new UserError(
                    sprintf(esc_html__('Sorry, you are not allowed to create %1$s', 'event_espresso'), $type->name())
                );
            }

            $args = PriceMutation::prepareFields($input);

            if (empty($args['PRT_ID'])) {
                // translators: the placeholder is the name of the field.
                throw new UserError(
                    sprintf(esc_html__('A valid %1$s must be passed.', 'event_espresso'), 'priceType')
                );
            }

            $entity = EE_Price::new_instance($args);
            $id = $entity->save();

            if (empty($id)) {
                throw new UserError(esc_html__('The object failed to create but no error was provided', 'event_espresso'));
            }

            return [
                'id' => $id,
            ];
        };
    }
}
