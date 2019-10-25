<?php
namespace EventEspresso\core\domain\services\graphql\mutators;

use EEM_Ticket;
use EE_Ticket;
use EventEspresso\core\domain\services\graphql\types\Ticket;
use EventEspresso\core\domain\services\graphql\data\mutations\TicketMutation;

use EE_Error;
use InvalidArgumentException;
use ReflectionException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use GraphQL\Error\UserError;

class TicketCreate
{

	/**
	 * Defines the mutation data modification closure.
	 *
     * @param EEM_Ticket $model
     * @param Ticket $type
	 * @return callable
	 */
	public static function mutateAndGetPayload(EEM_Ticket $model, Ticket $type)
	{
		/**
		 * Creates an entity.
		 *
		 * @param array         $input   The input for the mutation
		 * @param AppContext    $context The AppContext passed down to all resolvers
		 * @param ResolveInfo   $info    The ResolveInfo passed down to all resolvers
		 *
		 * @throws UserError
		 * @throws ReflectionException
		 * @throws InvalidArgumentException
		 * @throws InvalidInterfaceException
		 * @throws InvalidDataTypeException
		 * @throws EE_Error
		 */
		return static function ($input, AppContext $context, ResolveInfo $info) use ($model, $type)
		{

			/**
			 * Stop now if a user isn't allowed to create a datetime.
			 */
			if (! current_user_can('ee_edit_events')) {
				// translators: the %1$s is the name of the object being mutated
				throw new UserError(sprintf(__('Sorry, you are not allowed to create %1$s', 'event_espresso' ), $type->name()));
			}

			$args = TicketMutation::prepare_fields($input);

			$entity = EE_Ticket::new_instance($args);
			$id = $entity->save();

			if (empty($id)) {
				throw new UserError(__( 'The object failed to create but no error was provided', 'event_espresso'));
			}

			return [
				'id' => $id,
			];
		};
	}
}
