<?php

namespace EventEspresso\core\domain\services\graphql\resolvers;

use EE_Attendee;
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
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\services\graphql\resolvers\ResolverBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use Exception;
use InvalidArgumentException;
use ReflectionException;
use WPGraphQL\Data\DataSource;
use GraphQL\Deferred;
use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQLRelay\Relay;
use WPGraphQL\AppContext;

/**
 * Class FieldResolver
 * Field resolver for a GraphQL type
 *
 * @package EventEspresso\core\domain\services\graphql\resolvers
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class FieldResolver extends ResolverBase
{

    /**
     * @var mixed $model
     */
    protected $model;

    /**
     * @var array $fields .
     */
    protected $fields;


    /**
     * FieldResolver constructor.
     *
     * @param mixed $model  The model instance.
     * @param array $fields The fields registered for the type.
     */
    public function __construct($model, array $fields)
    {
        $this->model = $model;
        $this->fields = $fields;
    }


    /**
     * @param mixed       $source  The source that's passed down the GraphQL queries
     * @param array       $args    The inputArgs on the field
     * @param AppContext  $context The AppContext passed down the GraphQL tree
     * @param ResolveInfo $info    The ResolveInfo passed down the GraphQL tree
     * @return string
     * @throws EE_Error
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws UserError
     * @throws UnexpectedEntityException
     * @since $VID:$
     */
    public function resolve($source, array $args, AppContext $context, ResolveInfo $info)
    {
        $fieldName = $info->fieldName;
        $field = isset($this->fields[ $fieldName ]) ? $this->fields[ $fieldName ] : null;
        // Field should exist in teh registered fields
        if ($field instanceof GraphQLField) {
            // check if the field should be resolved.
            if (! $field->shouldResolve()) {
                return null;
            }
            // Give priority to the internal resolver.
            if ($field->hasInternalResolver()) {
                return $field->resolve($source, $args, $context, $info);
            }
            if (! ($source instanceof EE_Base_Class)) {
                return null;
            }
            // Check if the field has a key mapped to model.
            if (! empty($field->key())) {
                $value = $source->{$field->key()}();
                return $field->mayBeFormatValue($value, $source);
            }
            switch ($fieldName) {
                case 'id': // the global ID
                    return $this->resolveId($source);
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
     * Resolve the global ID
     *
     * @param mixed     $source
     * @return string|null
     * @throws Exception
     * @since $VID:$
     */
    public function resolveId($source)
    {
        $ID = $source instanceof EE_Base_Class ? $source->ID() : 0;

        return $ID ? Relay::toGlobalId($this->model->item_name(), $ID) : null;
    }


    /**
     * @param mixed     $source
     * @param           $args
     * @param           $context
     * @return Deferred|null
     * @throws Exception
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
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws UserError
     * @throws UnexpectedEntityException
     * @since $VID:$
     */
    public function resolveEvent($source, $args, $context)
    {
        switch (true) {
            case $source instanceof EE_Datetime:
                $event = $source->event();
                break;
            case $source instanceof EE_Venue:
            case $source instanceof EE_Ticket:
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
     * @return EE_Base_Class|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @since $VID:$
     */
    public function resolveState($source)
    {
        switch (true) {
            case $source instanceof EE_Attendee:
            case $source instanceof EE_Venue:
                $state_id = $source->state_ID();
                break;
            default:
                $state_id = null;
                break;
        }
        return $state_id
            ? EEM_State::instance()->get_one_by_ID($state_id)
            : null;
    }


    /**
     * @param mixed $source The source instance.
     * @return EE_Base_Class|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
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

        return $country_iso
            ? EEM_Country::instance()->get_one_by_ID($country_iso)
            : null;
    }
}
