<?php
namespace EventEspresso\core\domain\services\graphql\mutators;

use EEM_Datetime;
use EventEspresso\core\domain\services\graphql\types\Datetime;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use GraphQL\Error\UserError;

class DatetimeUpdate {

	/**
	 * Defines the mutation data modification closure.
	 *
     * @param EEM_Datetime $model
     * @param Datetime $type
	 * @return callable
	 */
	public static function mutateAndGetPayload(EEM_Datetime $model, Datetime $type)
	{
		return function ($input, AppContext $context, ResolveInfo $info) use ($model, $type)
		{

			/**
			 * If there's no existing post, throw an exception
			 */
			if (empty($input['id']) || empty($model->get_one_by_ID($input['id']))) {
				// translators: the placeholder is the name of the type of post being updated
				throw new UserError( sprintf( __( 'No %1$s could be found to update', 'event_espresso' ), $type->name() ) );
			}
			
			// Validate the $input fields
			// Update the entity

			return [
				'id' => $input['id'],
			];
		};
	}
}
