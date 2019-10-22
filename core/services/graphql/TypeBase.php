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

use EE_Error;
use EEM_Base;
use EE_Base_Class;
use EventEspresso\core\domain\services\graphql\fields\GraphQLField;
use EventEspresso\core\domain\services\graphql\resolvers\FieldResolver;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use GraphQL\Error\UserError;
use InvalidArgumentException;
use ReflectionException;
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
     * @var GraphQLField[] $fields
     */
    protected $fields = [];

    /**
     * @var array $graphql_to_model_map
     */
    protected $graphql_to_model_map = [];

    /**
     * @var FieldResolver $field_resolver
     */
    protected $field_resolver;

    /**
     * @var bool $is_custom_post_type
     */
    protected $is_custom_post_type = false;

    /**
     * TypeBase constructor.
     */
    public function __construct()
    {
        $this->setFields($this->getFields());
        $this->field_resolver = new FieldResolver(
            $this->model,
            $this->getFieldsForResolver()
        );
    }


    /**
     * @return GraphQLField[]
     * @since $VID:$
     */
    abstract protected function getFields();


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
     * @return GraphQLField[]
     * @since $VID:$
     */
    public function fields()
    {
        return (array) $this->fields;
    }


    /**
     * @param GraphQLField[] $fields
     */
    protected function setFields(array $fields)
    {
        foreach ($fields as $field) {
            if ($field instanceof GraphQLField) {
                $this->fields[] = $field;
            }
        }
    }


    /**
     * Creates a key map for internal resolver.
     * @return array
     * @since $VID:$
     */
    public function getFieldsForResolver()
    {
        $fields = [];
        foreach ($this->fields() as $field) {
            if ($field->useForOutput()) {
                $fields[$field->name()] = $field;
            }
        }
        return $fields;
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
    public function parseInfiniteValue($value)
    {
        $value = trim($value);
        return $value === null
               || $value === ''
               || $value === '&infin;'
               || $value === 'INF'
               || $value === INF
               || $value === EE_INF
               || is_infinite((float) $value)
            ? -1
            : $value;
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
        if ($source instanceof EE_Base_Class) {
            return $source;
        }
        return $source instanceof Post ? $this->model->get_one_by_ID($source->ID) : null;
    }


    /**
     * @param mixed       $source  The source that's passed down the GraphQL queries
     * @param array       $args    The inputArgs on the field
     * @param AppContext  $context The AppContext passed down the GraphQL tree
     * @param ResolveInfo $info    The ResolveInfo passed down the GraphQL tree
     * @return string
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws UnexpectedEntityException
     * @throws UserError
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function resolveField($source, $args, AppContext $context, ResolveInfo $info)
    {
        $source = $this->getModel($source);
        if ($source instanceof EE_Base_Class) {
            return $this->field_resolver->resolve($source, $args, $context, $info);
        }
        return null;
    }


    /**
     * @param array       $input   The mutation input.
     * @param AppContext  $context The AppContext passed down the GraphQL tree.
     * @param ResolveInfo $info    The ResolveInfo passed down the GraphQL tree.
     * @return mixed
     * @throws UserError
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function mutateAndGetPayload($input, AppContext $context, ResolveInfo $info) {

    }
}