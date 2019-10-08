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

use EE_Enum_Text_Field;
use EE_Model_Field_Base;
use EE_Post_Content_Field;
use EE_WP_User_Field;
use EEM_Base;

/**
 * Class TypeBase
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class TypeBase implements TypeInterface
{

    /**
     * @var EEM_Base $model
     */
    protected $model;

    /**
     * @var string $name
     */
    protected $name = '';

    /**
     * @var string $description
     */
    protected $description = '';

    /**
     * @var array $fields
     */
    protected $fields = [];

    /**
     * @var bool $is_custom_post_type
     */
    protected $is_custom_post_type = false;


    /**
     * @return string
     */
    public function name()
    {
        return $this->name;
    }


    /**
     * @param string $name
     */
    protected function setName($name)
    {
        $this->name = $name;
    }


    /**
     * @return string
     */
    public function description()
    {
        return $this->description;
    }


    /**
     * @param string $description
     */
    protected function setDescription($description)
    {
        $this->description = $description;
    }


    /**
     * @return array
     * @since $VID:$
     */
    public function fields()
    {
        return $this->fields;
    }


    /**
     * @param array $fields
     */
    protected function setFields(array $fields)
    {
        $this->fields = $fields;
    }


    /**
     * @return bool
     */
    public function isCustomPostType()
    {
        return $this->is_custom_post_type;
    }


    /**
     * @param bool $is_custom_post_type
     */
    protected function setIsCustomPostType($is_custom_post_type)
    {
        $this->is_custom_post_type = filter_var($is_custom_post_type, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @param int $value
     * @return int
     * @since $VID:$
     */
    protected function parseInfiniteValue($value)
    {
        return $value === EE_INF || is_infinite($value) ? -1 : $value;
    }


    /**
     * @param EE_Model_Field_Base $field
     * @return string
     * @since $VID:$
     */
    protected function parseFieldType(EE_Model_Field_Base $field)
    {
        $schema_type = $field->getSchemaType();
        $schema_type = is_array($schema_type) ? array_shift($schema_type) : $schema_type;
        switch ($schema_type) {
            case 'boolean';
                return 'Boolean';
            case 'date-time';
            case 'string';
                return 'String';
            case 'integer';
                if ($field instanceof EE_WP_User_Field) {
                    return 'User';
                }
                return 'Int';
            case 'number';
                return 'Float';
            case 'object';
                if ($field instanceof EE_Post_Content_Field) {
                    return 'String';
                }
                if ($field instanceof EE_Enum_Text_Field) {
                    return 'String';
                }
                return 'object';
        }
    }

}