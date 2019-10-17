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
        add_action('graphql_register_types', [$this, 'registerTypes'], 10);
    }


    public function registerTypes()
    {
        // loop through the collection of types and register their fields
        foreach ($this->types as $type) {
            $fields = $type->getFieldsForGQL();
            /** @var TypeInterface $type */
            if ($type->isCustomPostType()) {
                foreach ($fields as $field => $config) {
                    register_graphql_field($type->name(), $field, $config);
                }
            } else {
                register_graphql_object_type(
                    $type->name(),
                    [
                        'description' => $type->description(),
                        'fields' => $fields,
                    ]
                );
            }
        }
    }
}