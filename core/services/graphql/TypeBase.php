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
use EE_Base_Class;
use EE_Event;
use EE_Venue;
use EE_Datetime;
use EE_Ticket;
use EE_State;
use EEM_State;
use EE_Country;
use EEM_Country;
use EE_Error;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\graphql\TypeBase;
use GraphQL\Deferred;
use GraphQL\Error\UserError;
use InvalidArgumentException;
use ReflectionException;

use WPGraphQL\Data\DataSource;
use WPGraphQL\Model\Post;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

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
     * @var array $fields
     */
    protected $graphql_to_model_map = [];

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
     * @param array $map
     */
    protected function setGraphQLToModelMap(array $map)
    {
        $this->graphql_to_model_map = $map;
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
     * @return array
     * @since $VID:$
     */
    public function getFields()
    {
        $fields = static::getFieldDefinitions();
        foreach ($fields as $field => &$args) {
            $args['resolve'] = [$this, 'resolveField'];
        }
        return $fields;
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


    /**
     * @param mixed $source
     * @return EE_Base_Class|null
     * @since $VID:$
     */
    private function getModel($source)
    {
        // If it comes from a custom connection
        // where the $source is already instantiated.
        if (is_subclass_of($source, 'EE_Base_Class')) {
            return $source;
        }

        $id = $source instanceof Post ? $source->ID : 0;

        if ($id) {
            return $this->model->get_one_by_ID($id);
        }
        return null;
    }

    /**
     * @param mixed       $source     The source that's passed down the GraphQL queries
     * @param array       $args       The inputArgs on the field
     * @param AppContext  $context    The AppContext passed down the GraphQL tree
     * @param ResolveInfo $info       The ResolveInfo passed down the GraphQL tree
     * @return string
     * @since $VID:$
     */
    public function resolveField($source, $args, AppContext $context, ResolveInfo $info)
    {
        $source = $this->getModel($source);
        if (is_subclass_of($source, 'EE_Base_Class')) {

            $fieldName = $info->fieldName;

            if (isset($this->graphql_to_model_map[$fieldName])) {
                return $source->{$this->graphql_to_model_map[$fieldName]}();
            }

            switch ($fieldName) {
                case 'capacity': // Datetime, Venue
                    if ($source instanceof EE_Venue) {
                        return $this->parseInfiniteValue($source->capacity());
                    } elseif ($source instanceof EE_Datetime) {
                        return $this->parseInfiniteValue($source->reg_limit());
                    }
                    break;
                case 'max': // Ticket
                    return $this->parseInfiniteValue($source->max());
                case 'quantity': // Ticket
                    return $this->parseInfiniteValue($source->qty());
                case 'uses': // Ticket
                    return $this->parseInfiniteValue($source->uses());
                case 'parent':
                    return $this->resolveParent($source);
                case 'event':
                    return $this->resolveEvent($source, $args, $context);
                case 'wpUser':
                    return $this->resolveWpUser($source, $args, $context);
                case 'state': // Venue
                    return $this->resolveState($source);
                case 'country': // State, Venue
                    return $this->resolveCountry($source);
            }
        }
        return null;
    }


    /**
     * @param mixed     $source
     * @param           $args
     * @param           $context
     * @return Deferred|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws UserError
     * @since $VID:$
     */
    public function resolveWpUser($source, $args, $context)
    {
        $user_id = $source->wp_user();
        return $user_id
            ? DataSource::resolve_user($user_id, $context)
            : null;
    }


    /**
     * @param mixed $source
     * @return EE_Base_Class|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolveParent($source)
    {
        return $this->model->get_one_by_ID($source->parent());
    }


    /**
     * @param mixed       $source
     * @param             $args
     * @param             $context
     * @return Deferred|null
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UserError
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolveEvent($source, $args, $context)
    {
        switch (true) {
            case $source instanceof EE_Datetime:
                $event = $source->event();
                break;
            case $source instanceof EE_Venue:
                $event = $source->get_related_event();
                break;
            default:
                $event = null;
                break;
        }
        return $event instanceof EE_Event
            ? DataSource::resolve_post_object($event->ID(), $context)
            : null;
    }


    /**
     * @param mixed $source The source instance.
     * @return int
     * @since $VID:$
     */
    public function resolveState($source)
    {
        switch (true) {
            case $source instanceof EE_Venue:
                $state_id = $source->state_ID();
                break;
            default:
                $state_id = null;
                break;
        }

        if ($state_id) {
            return EEM_State::instance()->get_one_by_ID($state_id);
        }
        return null;
    }


    /**
     * @param mixed $source The source instance.
     * @return int
     * @since $VID:$
     */
    public function resolveCountry($source)
    {
        switch (true) {
            case $source instanceof EE_State:
                $country_iso = $source->country_iso();
                break;
            case $source instanceof EE_Venue:
                $country_iso = $source->country_ID();
                break;
            default:
                $country_iso = null;
                break;
        }

        if ($country_iso) {
            return EEM_Country::instance()->get_one_by_ID($country_iso);
        }
        return null;
    }

}