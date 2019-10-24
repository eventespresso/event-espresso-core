<?php
namespace EventEspresso\core\domain\services\graphql\mutators;

use EEM_Datetime;
use EE_Datetime;
use EventEspresso\core\domain\services\graphql\types\Datetime;
use EventEspresso\core\domain\services\graphql\data\mutations\DatetimeMutation;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use GraphQL\Error\UserError;

class DatetimeCreate
{

	/**
	 * Defines the mutation data modification closure.
	 *
     * @param EEM_Datetime $model
     * @param Datetime $type
	 * @return callable
	 */
	public static function mutateAndGetPayload(EEM_Datetime $model, Datetime $type)
	{
		return static function ($input, AppContext $context, ResolveInfo $info) use ($model, $type)
		{

			/**
			 * Stop now if a user isn't allowed to create a datetime.
			 */
			if (! current_user_can('ee_edit_events')) {
				// translators: the %1$s is the name of the object being mutated
				throw new UserError(sprintf(__('Sorry, you are not allowed to create %1$s', 'event_espresso' ), $type->name()));
			}

			$args = DatetimeMutation::prepare_fields($input, $mutation_name);

			$entity = EE_Datetime::new_instance($args);
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
