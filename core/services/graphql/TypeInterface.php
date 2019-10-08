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

/**
 * Interface TypeInterface
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface TypeInterface
{

    /**
     * @return string
     * @since $VID:$
     */
    public function name();

    /**
     * @return string
     * @since $VID:$
     */
    public function description();

    /**
     * @return array
     * @since $VID:$
     */
    public function fields();

    /**
     * @return bool
     * @since $VID:$
     */
    public function isCustomPostType();
}