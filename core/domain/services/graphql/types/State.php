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

use EEM_State;
use EventEspresso\core\services\graphql\TypeBase;

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
        $this->setGraphQLToModelMap([
            'id'           => 'ID',
            'abbreviation' => 'abbrev',
            'name'         => 'name' ,
            'isActive'     => 'active',
        ]);
        $this->setFields($this->getFields());
    }


    /**
     * @return array
     * @since $VID:$
     */
    public static function getFieldDefinitions()
    {
        return [
            'id'           => [
                'type'        => [
                    'non_null' => 'Int',
                ],
                'description' => __( 'State ID', 'event_espresso' ),
            ],
            'abbreviation' => [
                'type'        => 'String',
                'description' => __( 'State Abbreviation', 'event_espresso' ),
            ],
            'name'         => [
                'type'        => 'String',
                'description' => __('State Name', 'event_espresso'),
            ],
            'isActive'     => [
                'type'        => 'Boolean',
                'description' => __('State Active Flag', 'event_espresso'),
            ],
            'country'      => [
                'type'        => 'Country',
                'description' => __('Country for the state', 'event_espresso'),
            ],
        ];
    }
}