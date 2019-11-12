<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

/**
 * Class EventMutation
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class EventMutation
{

    /**
     * Maps the GraphQL input to a format that the model functions can use
     *
     * @param array  $input         Data coming from the GraphQL mutation query input
     * @param string $mutation_name Name of the mutation being performed
     * @return array
     */
    public static function prepare_fields(array $input, $mutation_name)
    {

        $args = [];

        if (! empty($input['name'])) {
            $args['EVT_name'] = sanitize_text_field($input['name']);
        }

        if (! empty($input['desc'])) {
            $args['EVT_desc'] = sanitize_text_field($input['desc']);
        }

        if (! empty($input['shortDesc'])) {
            $args['EVT_short_desc'] = sanitize_text_field($input['shortDesc']);
        }

        // Likewise the other fields...

        return $args;
    }
}
