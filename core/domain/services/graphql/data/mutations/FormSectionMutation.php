<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

use EventEspresso\core\services\form\meta\Attributes;
use EventEspresso\core\services\form\meta\FormLabel;
use GraphQLRelay\Relay;

/**
 * Class FormSectionMutation
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class FormSectionMutation
{
    /**
     * Maps the GraphQL input to a format that the model functions can use
     *
     * @param array $input Data coming from the GraphQL mutation query input
     * @return array
     */
    public static function prepareFields(array $input): array
    {
        $args = [];

        if (isset($input['id'])) {
            $args['FSC_UUID'] = sanitize_text_field($input['id']);
        }

        if (isset($input['appliesTo'])) {
            $args['FSC_appliesTo'] = sanitize_text_field($input['appliesTo']);
        }

        if (isset($input['attributes'])) {
            $args['FSC_attributes'] = Attributes::fromJson(sanitize_text_field($input['attributes']))->toJson();
        }

        if (isset($input['belongsTo'])) {
            $args['FSC_belongsTo'] = sanitize_text_field($input['belongsTo']);
        }

        if (isset($input['label'])) {
            $args['FSC_label'] = FormLabel::fromJson(sanitize_text_field($input['label']))->toJson();
        }

        // order can be 0
        if (array_key_exists('order', $input)) {
            $args['FSC_order'] = absint($input['order']);
        }

        if (isset($input['status'])) {
            $args['FSC_status'] = sanitize_text_field($input['status']);
        }

        if (! empty($input['wpUser'])) {
            $parts = Relay::fromGlobalId(sanitize_text_field($input['wpUser']));
            $args['FSC_wpUser'] = ! empty($parts['id']) ? $parts['id'] : null;
        }

        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_data_mutations__form_section_args',
            $args,
            $input
        );
    }
}
