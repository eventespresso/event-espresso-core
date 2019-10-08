<?php
/**
 *     Event Espresso
 *     Manage events, sell states, and receive payments from your WordPress website.
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

namespace EventEspresso\core\domain\services\graphql\types;

use EE_Base_Class;
use EE_State;
use EE_Error;
use EEM_State;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\graphql\TypeBase;
use GraphQL\Deferred;
use GraphQL\Error\UserError;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class State
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class State extends TypeBase
{

    /**
     * State constructor.
     *
     * @param EEM_State $state_model
     */
    public function __construct(EEM_State $state_model)
    {
        $this->model = $state_model;
        $this->setName('State');
        $this->setDescription(__('A state', 'event_espresso'));
        $this->setIsCustomPostType(false);
        $this->setFields([
            'id' => [
                'type'        => [
                    'non_null' => 'Int',
                ],
                'description' => __( 'State ID', 'event_espresso' ),
                'resolve'     => function (EEM_State $state) {
                    return $this->resolveField($state, 'ID');
                },
            ],
            'abbreviation' => [
                'type'        => 'String',
                'description' => __( 'State Abbreviation', 'event_espresso' ),
                'resolve'     => function (EEM_State $state) {
                    return $this->resolveField($state, 'abbrev' );
                },
            ],
            'name'  => [
                'type'        => 'String',
                'description' => __('State Name', 'event_espresso'),
                'resolve'     => function (EEM_State $state) {
                    return $this->resolveField($state, 'name' );
                },
            ],
            'isActive'  => [
                'type'        => 'Boolean',
                'description' => __('State Active Flag', 'event_espresso'),
                'resolve'     => function (EEM_State $state) {
                    return $this->resolveField($state, 'active' );
                },
            ],
        ] );
    }


    /**
     * @param EE_State $state
     * @param mixed $field
     * @return string
     * @since $VID:$
     */
    public function resolveField(EE_State $state, $field)
    {
        return $state instanceof EE_State ? $state->{$field}() : null;
    }
}