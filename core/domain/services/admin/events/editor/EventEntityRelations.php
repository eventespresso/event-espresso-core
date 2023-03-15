<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EE_Error;

/**
 * Class EventEditorRelationalData
 * Retrieves relational data for entities used in the Event Editor such as dates and tickets
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Manzoor Wani
 * @since   5.0.0.p
 */
class EventEntityRelations extends EventEditorData
{
    /**
     * @param array $data
     */
    private $data;

    /**
     * @param int $eventId
     * @return array
     * @throws EE_Error
     * @since 5.0.0.p
     */
    public function getData(int $eventId): array
    {
        $this->data = [
            'datetimes' => [],
            'tickets'   => [],
            'prices'    => [],
        ];

        $datetimeIds = $this->processDatetimes($eventId);
        $ticketIds = $this->processTickets($datetimeIds);
        $this->processPrices($ticketIds);

        return $this->data;
    }


    /**
     * @param int $eventId
     * @return array
     * @throws EE_Error
     * @since 5.0.0.p
     */
    private function processDatetimes(int $eventId): array
    {
        $related_models = [
            'tickets' => $this->ticket_model,
        ];
        // Get the IDs of event datetimes.
        // SELECT Datetime.DTT_ID FROM wp_esp_datetime AS Datetime WHERE Datetime.EVT_ID = ##
        $datetimeIds = $this->datetime_model->get_col([
            [ 'EVT_ID' => $eventId ],
            'default_where_conditions' => 'minimum',
        ]);
        foreach ($datetimeIds as $datetimeId) {
            $GID = $this->utilities->convertToGlobalId($this->datetime_model->item_name(), $datetimeId);
            foreach ($related_models as $key => $model) {
                // Get the IDs of related entities for the datetime ID.
                // SELECT Ticket.TKT_ID FROM wp_esp_ticket AS Ticket
                // LEFT JOIN wp_esp_datetime_ticket AS Datetime_Ticket ON Datetime_Ticket.TKT_ID=Ticket.TKT_ID
                // LEFT JOIN wp_esp_datetime AS Datetime ON Datetime.DTT_ID=Datetime_Ticket.DTT_ID
                // WHERE Datetime.DTT_ID = ##
                $Ids = $model->get_col([
                    [ 'Datetime.DTT_ID' => $datetimeId ],
                    'default_where_conditions' => 'minimum',
                ]);
                $this->data['datetimes'][ $GID ][ $key ] = ! empty($Ids)
                    ? $this->utilities->convertToGlobalId($model->item_name(), $Ids)
                    : [];
            }
        }
        return is_array($datetimeIds) ? $datetimeIds : [];
    }


    /**
     * @param array $datetimeIds
     * @return array
     * @throws EE_Error
     * @since 5.0.0.p
     */
    private function processTickets(array $datetimeIds): array
    {
        $related_models = [
            'datetimes' => $this->datetime_model,
            'prices'    => $this->price_model,
        ];
        // Get the IDs of all datetime tickets.
        $ticketIds = $this->ticket_model->get_col([
            [
                'OR' => [
                    'Datetime.DTT_ID' => ['IN', $datetimeIds],
                    'TKT_is_default' => 1,
                ]
            ],
            'default_where_conditions' => 'minimum',
        ]);
        foreach ($ticketIds as $ticketId) {
            $GID = $this->utilities->convertToGlobalId($this->ticket_model->item_name(), $ticketId);

            foreach ($related_models as $key => $model) {
                // Get the IDs of related entities for the ticket ID.
                $Ids = $model->get_col([
                    [ 'Ticket.TKT_ID' => $ticketId ],
                    'default_where_conditions' => 'minimum',
                ]);
                $this->data['tickets'][ $GID ][ $key ] = ! empty($Ids)
                    ? $this->utilities->convertToGlobalId($model->item_name(), $Ids)
                    : [];
            }
        }
        return is_array($ticketIds) ? $ticketIds : [];
    }


    /**
     * @param array $ticketIds
     * @throws EE_Error
     * @since 5.0.0.p
     */
    private function processPrices(array $ticketIds)
    {
        $related_models = [
            'tickets'    => $this->ticket_model,
            'priceTypes' => $this->price_type_model,
        ];
        // Get the IDs of all ticket prices and default prices
        $priceIds = $this->price_model->get_col([
            [
                'OR' => [
                    // either the price is related to any of these tickets
                    'Ticket.TKT_ID' => ['IN', $ticketIds],
                    // or it's a default price and not trashed
                    'AND' => [
                        'PRC_deleted'    => 0,
                        'PRC_is_default' => 1,
                    ],
                ],
            ],
            'group_by'                 => 'PRC_ID',
            'default_where_conditions' => 'minimum',
        ]);
        foreach ($priceIds as $priceId) {
            $GID = $this->utilities->convertToGlobalId($this->price_model->item_name(), $priceId);

            foreach ($related_models as $key => $model) {
                // Get the IDs of related entities for the price ID.
                $Ids = $model->get_col([
                    [ 'Price.PRC_ID' => $priceId ],
                    'default_where_conditions' => 'minimum',
                ]);
                $this->data['prices'][ $GID ][ $key ] = ! empty($Ids)
                    ? $this->utilities->convertToGlobalId($model->item_name(), $Ids)
                    : [];
            }
        }
    }
}
