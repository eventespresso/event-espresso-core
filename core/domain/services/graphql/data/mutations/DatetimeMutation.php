<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

/**
 * Class DatetimeMutation
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class DatetimeMutation
{

    /**
     * Maps the GraphQL input to a format that the model functions can use
     *
     * @param array $input Data coming from the GraphQL mutation query input
     * @return array
     */
    public static function prepare_fields(array $input)
    {

        $args = [];

        if (! empty($input['event'])) {
            $args['EVT_ID'] = absint($input['event']);
        }

        if (! empty($input['name'])) {
            $args['DTT_name'] = sanitize_text_field($input['name']);
        }

        if (! empty($input['description'])) {
            $args['DTT_description'] = sanitize_text_field($input['description']);
        }

        // Likewise the other fields...

        return $args;
    }
}
