<?php

namespace EventEspresso\core\domain\services\graphql\mutators;

use EEM_Datetime;
use EEM_Ticket;
use EEM_Price;
use EE_Error;
use Exception;
use InvalidArgumentException;
use ReflectionException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use GraphQL\Error\UserError;

class BulkEntityDelete extends EntityMutator
{
    /**
     * Defines the mutation data modification closure.
     *
     * @return callable
     */
    public static function mutateAndGetPayload()
    {
        /**
         * Updates an entity.
         *
         * @param array       $input   The input for the mutation
         * @param AppContext  $context The AppContext passed down to all resolvers
         * @param ResolveInfo $info    The ResolveInfo passed down to all resolvers
         * @return array
         * @throws UserError
         * @throws ReflectionException
         * @throws InvalidArgumentException
         * @throws InvalidInterfaceException
         * @throws InvalidDataTypeException
         * @throws EE_Error
         */
        return static function (array $input, AppContext $context, ResolveInfo $info): array {
            /**
             * Stop now if a user isn't allowed to delete.
             */
            if (! current_user_can('ee_delete_events')) {
                throw new UserError(
                    esc_html__('Sorry, you do not have the required permissions to delete entities', 'event_espresso')
                );
            }

            $details = EntityReorder::prepareEntityDetailsFromInput($input);

            $deletePermanently = ! empty($input['deletePermanently']);

            $deletionMethod = __NAMESPACE__;
            // if it's for datetimes.
            if ($details['entityType'] === EEM_Datetime::instance()->item_name()) {
                $deletionMethod .= '\DatetimeDelete::' . ($deletePermanently ? 'deleteDatetimeAndRelations' : 'trashDatetimeAndRelations');
            } elseif ($details['entityType'] === EEM_Ticket::instance()->item_name()) {
                $deletionMethod .= '\TicketDelete::' . ($deletePermanently ? 'deleteTicketAndRelations' : 'trashTicket');
            } elseif ($details['entityType'] === EEM_Price::instance()->item_name()) {
                $deletionMethod .= '\PriceDelete::deletePriceAndRelations';
            } else {
                throw new UserError(
                    esc_html__(
                        'A valid data model could not be obtained. Did you supply a valid entity type?',
                        'event_espresso'
                    )
                );
            }

            $deleted = [];
            $failed  = [];

            foreach ($details['entity_db_ids'] as $key => $entityDbid) {
                $guid = $details['entityGuids'][ $key ];
                $entity = $details['entities'][ $entityDbid ];
                try {
                    $result = $deletionMethod($entity);
                    EntityMutator::validateResults($result);
                    // we are here it means the deletion was successful.
                    $deleted[] = $guid;
                } catch (Exception $e) {
                    // sorry mate, couldn't help you :(
                    $failed[] = $guid;
                }
            }

            return compact('deleted', 'failed');
        };
    }
}
