<?php
/**
 *     Event Espresso
 *     Manage events, sell tickets, and receive payments from your WordPress website.
 *     Copyright (c) 2008-2019 Event Espresso  All Rights Reserved.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

namespace EventEspresso\core\services\graphql;

use EventEspresso\core\services\collections\CollectionDetailsException;
use EventEspresso\core\services\collections\CollectionLoaderException;

/**
 * Class TypesManager
 * Loads and registers custom GraphQL Types and Fields
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
class TypesManager
{

    /**
     * @var TypeCollection|TypeInterface[] $types
     */
    private $types;


    /**
     * TypesManager constructor.
     *
     * @param TypeCollection|TypeInterface[] $types
     */
    public function __construct(TypeCollection $types)
    {
        $this->types = $types;
    }


    /**
     * @throws CollectionDetailsException
     * @throws CollectionLoaderException
     * @since $VID:$
     */
    public function init()
    {
        $this->types->loadTypes();
        add_action('graphql_register_types', [$this, 'configureTypes'], 10);
    }


    public function configureTypes()
    {
        // loop through the collection of types and register their fields
        foreach ($this->types as $type) {
            if ($type->isCustomPostType()) {
                $this->extendCustomPostType($type);
            } else {
                $this->registerType($type);
            }
        }
    }


    public function extendCustomPostType($type)
    {
        $typeName = $type->name();

        foreach ($type->fields() as $field) {

            $fieldName = $field->name();

            $config = $field->toArray();

            if ($field->useForInput()) {
                // Register input fields for existing mutations.
                register_graphql_field('Update' . $typeName . 'Input', $fieldName, $config);
                register_graphql_field('Create' . $typeName . 'Input', $fieldName, $config);
            }

            if ($field->useForOutput()) {
                $config['resolve'] = [$type, 'resolveField'];
                // Register fields for queries.
                register_graphql_field($typeName, $fieldName, $config);
            }
        }
    }


    public function registerType($type)
    {
        $outputFields = [];
        $inputFields = [];

        foreach ($type->fields() as $field) {

            $fieldName = $field->name();

            $config = $field->toArray();

            if ($field->useForInput()) {
                $inputFields[$fieldName] = $config;
            }

            if ($field->useForOutput()) {
                $config['resolve'] = [$type, 'resolveField'];
                $outputFields[$fieldName] = $config;
            }
        }

        $typeName = $type->name();

        if (! empty($outputFields)) {
            // Register the object type.
            register_graphql_object_type(
                $typeName,
                [
                    'description' => $type->description(),
                    'fields'      => $outputFields,
                ]
            );
        }

        /* register_graphql_mutation(
			'create' . $typeName,
			[
				'inputFields'         => $inputFields,
				'outputFields'        => $outputFields,
				'mutateAndGetPayload' => [$type, 'mutateAndGetPayload'],
			]
		);

        register_graphql_mutation(
			'update' . $typeName,
			[
				'inputFields'         => $inputFields,
				'outputFields'        => $outputFields,
				'mutateAndGetPayload' => [$type, 'mutateAndGetPayload'],
			]
		); */
    }
}