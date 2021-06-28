<?php

namespace EventEspresso\core\domain\services\graphql\data\mutations;

use EventEspresso\core\services\form\meta\Attributes;
use EventEspresso\core\services\form\meta\FormLabel;
use EventEspresso\core\services\form\meta\HelpText;
use EventEspresso\core\services\form\meta\InputOptions;
use EventEspresso\core\services\form\meta\Required;
use GraphQLRelay\Relay;

/**
 * Class FormElementMutation
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class FormElementMutation
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
            $args['FIN_UUID'] = sanitize_text_field($input['id']);
        }

        if (isset($input['adminOnly'])) {
            $args['FIN_adminOnly'] = (bool) $input['adminOnly'];
        }

        if (isset($input['attributes'])) {
            $args['FIN_attributes'] = Attributes::fromJson(sanitize_text_field($input['attributes']))->toJson();
        }

        if (isset($input['belongsTo'])) {
            $args['FSC_UUID'] = sanitize_text_field($input['belongsTo']);
        }

        if (isset($input['helpText'])) {
            $args['FIN_helpText'] = HelpText::fromJson(sanitize_text_field($input['helpText']))->toJson();
        }

        if (isset($input['label'])) {
            $args['FIN_label'] = FormLabel::fromJson(sanitize_text_field($input['label']))->toJson();
        }

        if (isset($input['mapsTo'])) {
            $args['FIN_mapsTo'] = sanitize_text_field($input['mapsTo']);
        }

        if (isset($input['options'])) {
            $args['FIN_options'] = InputOptions::fromJson(sanitize_text_field($input['options']))->toJson();
        }

        // order can be 0
        if (array_key_exists('order', $input)) {
            $args['FIN_order'] = absint($input['order']);
        }

        if (isset($input['required'])) {
            $args['FIN_required'] = Required::fromJson(sanitize_text_field($input['required']))->toJson();
        }

        if (isset($input['status'])) {
            $args['FIN_status'] = sanitize_text_field($input['status']);
        }

        if (isset($input['type'])) {
            $args['FIN_type'] = sanitize_text_field($input['type']);
        }

        if (! empty($input['wpUser'])) {
            $parts = Relay::fromGlobalId(sanitize_text_field($input['wpUser']));
            $args['FIN_wpUser'] = ! empty($parts['id']) ? $parts['id'] : null;
        }

        return apply_filters(
            'FHEE__EventEspresso_core_domain_services_graphql_data_mutations__form_element_args',
            $args,
            $input
        );
    }
}
