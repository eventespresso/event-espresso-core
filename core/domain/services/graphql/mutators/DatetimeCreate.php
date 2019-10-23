<?php
namespace EventEspresso\core\domain\services\graphql\mutators;

use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\types\Datetime;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

class DatetimeCreate {

	/**
	 * Defines the mutation data modification closure.
	 *
     * @param EEM_Datetime $model
     * @param Datetime $type
	 * @return callable
	 */
	public static function mutateAndGetPayload(EEM_Datetime $model, Datetime $type)
	{
		return function ( $input, AppContext $context, ResolveInfo $info ) use ($model, $type)
		{
			
			// Validate the $input fields
			// Create an entity
			// Get the ID of the newly created entity.
			// Return the ID below
			$id = 0;

			return [
				'id' => $id,
			];
		};
	}
}
