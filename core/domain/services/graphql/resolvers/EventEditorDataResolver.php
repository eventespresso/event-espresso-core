<?php

namespace EventEspresso\core\domain\services\graphql\resolvers;

use EE_Error;
use EEM_Datetime;
use EventEspresso\core\domain\services\converters\spoofers\RestApiSpoofer;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\ModelConfigurationException;
use EventEspresso\core\exceptions\RestPasswordIncorrectException;
use EventEspresso\core\exceptions\RestPasswordRequiredException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\libraries\rest_api\RestException;
use EventEspresso\core\services\graphql\ResolverBase;
use GraphQL\Type\Definition\ResolveInfo;
use InvalidArgumentException;
use ReflectionException;
use WPGraphQL\AppContext;
use WPGraphQL\Model\Post;


/**
 * Class EventEditorEntities
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\resolvers
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EventEditorDataResolver extends ResolverBase
{

    /**
     * @var EEM_Datetime $datetime_model
     */
    protected $datetime_model;

    /**
     * @var RestApiSpoofer $converter
     */
    protected $spoofer;


    /**
     * EventEditorEntities constructor.
     *
     * @param EEM_Datetime   $datetime_model
     * @param RestApiSpoofer $spoofer
     */
    public function __construct(EEM_Datetime $datetime_model, RestApiSpoofer $spoofer)
    {
        $this->datetime_model = $datetime_model;
        $this->spoofer = $spoofer;
    }


    /**
     * @return string
     * @since $VID:$
     */
    public function query()
    {
        return 'Event';
    }


    /**
     * @return string
     * @since $VID:$
     */
    public function field()
    {
        return 'eventDates';
    }


    /**
     * @return string
     * @since $VID:$
     */
    public function type()
    {
        return 'String';
    }


    /**
     * @param Post        $post
     * @param array       $args
     * @param AppContext  $context
     * @param ResolveInfo $info
     * @return string
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws ModelConfigurationException
     * @throws RestPasswordIncorrectException
     * @throws RestPasswordRequiredException
     * @throws UnexpectedEntityException
     * @throws RestException
     * @since $VID:$
     */
    public function resolve($post, array $args, AppContext $context, ResolveInfo $info)
    {
        return $post instanceof Post
            ? wp_json_encode($this->spoofer->getApiResults(
                $this->datetime_model,
                [['EVT_ID' => $post->ID]]
            ))
            : '[]';
    }
}