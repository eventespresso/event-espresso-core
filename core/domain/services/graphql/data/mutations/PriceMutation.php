<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

use GraphQLRelay\Relay;

/**
 * Class PriceMutation
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class PriceMutation
{

    /**
     * Maps the GraphQL input to a format that the model functions can use
     *
     * @param array $input Data coming from the GraphQL mutation query input
     * @return array
     */
    public static function prepareFields(array $input)
    {
        $args = [];

        if (! empty($input['priceType'])) {
            $parts = Relay::fromGlobalId(sanitize_text_field($input['priceType']));
            $args['PRT_ID'] = ! empty($parts['id']) ? absint($parts['id']) : 0;
        }

        if (! empty($input['name'])) {
            $args['PRC_name'] = sanitize_text_field($input['name']);
        }

        if (! empty($input['desc'])) {
            $args['PRC_desc'] = sanitize_text_field($input['desc']);
        }

        if (! empty($input['amount'])) {
            $args['PRC_amount'] = floatval($input['amount']);
        }

        if (array_key_exists('isDefault', $input)) {
            $args['PRC_is_default'] = (bool) $input['isDefault'];
        }

        if (array_key_exists('isTrashed', $input)) {
            $args['PRC_deleted'] = (bool) $input['isTrashed'];
        }

        if (! empty($input['overrides'])) {
            $args['PRC_overrides'] = intval($input['overrides']);
        }

        if (! empty($input['order'])) {
            $args['PRC_order'] = intval($input['order']);
        }

        if (! empty($input['parent'])) {
            $parts = Relay::fromGlobalId(sanitize_text_field($input['parent']));
            $args['PRC_parent'] = ! empty($parts['id']) ? absint($parts['id']) : 0;
        }

        return $args;
    }
}
