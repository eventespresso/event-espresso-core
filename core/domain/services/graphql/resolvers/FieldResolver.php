<?php

namespace EventEspresso\core\domain\services\graphql\resolvers;

use EE_Attendee;
use EE_Base_Class;
use EE_Event;
use EE_Venue;
use EE_Datetime;
use EE_Ticket;
use EE_State;
use EEM_Base;
use EEM_State;
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
     * @var EEM_Base $model
     */
    protected $model;

    /**
     * @var array $fields .
     */
    protected $fields;


    /**
     * FieldResolver constructor.
     *
     * @param EEM_Base|null $model  The model instance.
     * @param array         $fields The fields registered for the type.
     */
    public function __construct(EEM_Base $model = null, array $fields = [])
    {
        $this->model  = $model;
        $this->fields = $fields;
    }


    /**
     * @param mixed       $source  The source that's passed down the GraphQL queries
     * @param array       $args    The inputArgs on the field
     * @param AppContext  $context The AppContext passed down the GraphQL tree
     * @param ResolveInfo $info    The ResolveInfo passed down the GraphQL tree
     * @return EE_Base_Class|Deferred|string
     * @throws EE_Error
     * @throws Exception
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws UserError
     * @throws UnexpectedEntityException
     */
    public function resolve($source, array $args, AppContext $context, ResolveInfo $info)
    {
        $fieldName = $info->fieldName;
        $field     = $this->fields[ $fieldName ] ?? null;
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
                case 'cacheId':
                    return $this->resolveCacheId($source);
                case 'parent':
                    return $this->resolveParent($source);
                case 'event':
                    return $this->resolveEvent($source, $args, $context);
                case 'wpUser':
                case 'manager':
                    return $this->resolveWpUser($source, $args, $context);
                case 'userId':
                    return $this->resolveUserId($source, $args, $context);
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
     * @param mixed $source
     * @return string|null
     * @throws Exception
     */
    public function resolveId($source): ?string
    {
        if (! $source instanceof EE_Base_Class) {
            return null;
        }
        // If the model has a UUID method
        if (method_exists($source, 'UUID') && is_callable([$source, 'UUID'])) {
            return $source->UUID();
        }

        return Relay::toGlobalId($this->model->item_name(), $source->ID());
    }


    /**
     * Resolve the cache ID
     *
     * @param mixed $source
     * @return string
     */
    public function resolveCacheId($source): string
    {
        $model_name = $this->model->item_name();
        $ID         = $source->ID();
        // Since cacheId does not need to be globally unique
        // $uniqid is sufficient, still adding the model name and ID
        // may be we need/use them in future.
        return uniqid("{$model_name}:{$ID}:", true);
    }


    /**
     * @param mixed     $source
     * @param           $args
     * @param           $context
     * @return Deferred|null
     * @throws Exception
     */
    public function resolveWpUser($source, $args, $context): ?Deferred
    {
        $user_id = $source->wp_user();
        return $user_id
            ? $context->get_loader('user')->load_deferred($user_id)
            : null;
    }


    /**
     * @param mixed     $source
     * @param           $args
     * @param           $context
     * @return string|null
     * @throws Exception
     */
    public function resolveUserId($source, $args, $context): ?string
    {
        $user_id = $source->wp_user();
        return $user_id
            ? Relay::toGlobalId('user', $user_id)
            : null;
    }


    /**
     * @param mixed $source
     * @return EE_Base_Class|null
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     */
    public function resolveParent($source): ?EE_Base_Class
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
     */
    public function resolveEvent($source, $args, $context): ?Deferred
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
            ? $context->get_loader('post')->load_deferred($event->ID())
            : null;
    }


    /**
     * @param mixed $source The source instance.
     * @return EE_Base_Class|null
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function resolveState($source): ?EE_Base_Class
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
     * @throws ReflectionException
     */
    public function resolveCountry($source): ?EE_Base_Class
    {
        switch (true) {
            case $source instanceof EE_State:
                $country_iso = $source->country_iso();
                break;
            case $source instanceof EE_Attendee:
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
