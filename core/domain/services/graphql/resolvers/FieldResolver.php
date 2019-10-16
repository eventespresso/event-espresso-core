<?php

namespace EventEspresso\core\domain\services\graphql\resolvers;

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
use EventEspresso\core\services\graphql\ResolverBase;
use InvalidArgumentException;
use ReflectionException;
use InvalidArgumentException;
use ReflectionException;

use WPGraphQL\Data\DataSource;
use GraphQL\Deferred;
use GraphQL\Error\UserError;
use WPGraphQL\Model\Post;
use GraphQL\Type\Definition\ResolveInfo;
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
     * @var array $graphql_to_model_map.
     */
    protected $graphql_to_model_map;


    /**
     * FieldResolver constructor.
     *
	 * @param mixed   $model                The model instance.
     * @param array   $graphql_to_model_map The GQL to model map for the fields.
     */
    public function __construct($model, array $graphql_to_model_map )
    {
		$this->model                = $model;
		$this->graphql_to_model_map = $graphql_to_model_map;
    }

    /**
     * @param mixed       $source     The source that's passed down the GraphQL queries
     * @param array       $args       The inputArgs on the field
     * @param AppContext  $context    The AppContext passed down the GraphQL tree
     * @param ResolveInfo $info       The ResolveInfo passed down the GraphQL tree
     * @return string
     * @since $VID:$
     */
    public function resolve($source, $args, AppContext $context, ResolveInfo $info)
    {
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