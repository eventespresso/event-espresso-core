<?php
/**
 *     Event Espresso
 *     Manage events, sell states, and receive payments from your WordPress website.
 *     Copyright (c) 2008-2019 Event Espresso  All Rights Reserved.
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_State;
use EventEspresso\core\services\graphql\TypeBase;
use EventEspresso\core\domain\services\graphql\fields\GraphQLField;

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

        parent::__construct();
    }


    /**
     * @return GraphQLField[]
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLField(
                'id',
                'ID',
                ['non_null' => 'Int'],
                __('State ID', 'event_espresso')
            ),
            new GraphQLField(
                'abbreviation',
                'abbrev',
                'String',
                __('State Abbreviation', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'name',
                'String',
                __('State Name', 'event_espresso')
            ),
            new GraphQLField(
                'isActive',
                'active',
                'Boolean',
                __('State Active Flag', 'event_espresso')
            ),
            new GraphQLField(
                'country',
                'country',
                'Country',
                __('Country for the state', 'event_espresso')
            ),
        ];
    }
}