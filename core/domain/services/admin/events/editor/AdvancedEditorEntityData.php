<?php
/**
 *     Event Espresso
 *     Manage events, sell tickets, and receive payments from your WordPress website.
 *     Copyright (c) 2008-2019 Event Espresso  All Rights Reserved.
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

namespace EventEspresso\core\domain\services\admin\events\editor;

use EE_Admin_Config;
use EE_Error;
use EEM_Datetime;
use EEM_Event;
use EEM_Price;
use EEM_Price_Type;
use EEM_Ticket;
use EventEspresso\core\domain\services\assets\EspressoEditorAssetManager;
use EventEspresso\core\domain\services\converters\RestApiSpoofer;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\ModelConfigurationException;
use EventEspresso\core\exceptions\RestPasswordIncorrectException;
use EventEspresso\core\exceptions\RestPasswordRequiredException;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\libraries\rest_api\RestException;
use InvalidArgumentException;
use ReflectionException;
use WP_Post;

/**
 * Class AdvancedEditorEntityData
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
class AdvancedEditorEntityData
{

    /**
     * @var RestApiSpoofer
     */
    protected $spoofer;

    /**
     * @var EE_Admin_Config
     */
    protected $admin_config;

    /**
     * @var EEM_Datetime $datetime_model
     */
    protected $datetime_model;

    /**
     * @var EEM_Event $event_model
     */
    protected $event_model;

    /**
     * @var EEM_Price $price_model
     */
    protected $price_model;

    /**
     * @var EEM_Price_Type $price_type_model
     */
    protected $price_type_model;

    /**
     * @var EEM_Ticket $ticket_model
     */
    protected $ticket_model;


    /**
     * AdvancedEditorAdminForm constructor.
     *
     * @param RestApiSpoofer $spoofer
     * @param EE_Admin_Config $admin_config
     * @param EEM_Datetime $datetime_model
     * @param EEM_Event $event_model
     * @param EEM_Price $price_model
     * @param EEM_Price_Type $price_type_model
     * @param EEM_Ticket $ticket_model
     */
    public function __construct(
        RestApiSpoofer $spoofer,
        EE_Admin_Config $admin_config,
        EEM_Datetime $datetime_model,
        EEM_Event $event_model,
        EEM_Price $price_model,
        EEM_Price_Type $price_type_model,
        EEM_Ticket $ticket_model
    ) {
        $this->admin_config = $admin_config;
        $this->spoofer = $spoofer;
        $this->datetime_model = $datetime_model;
        $this->event_model = $event_model;
        $this->price_model = $price_model;
        $this->price_type_model = $price_type_model;
        $this->ticket_model = $ticket_model;
        add_action('admin_enqueue_scripts', [$this, 'loadScriptsStyles']);
    }


    /**
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ModelConfigurationException
     * @throws ReflectionException
     * @throws RestException
     * @throws RestPasswordIncorrectException
     * @throws RestPasswordRequiredException
     * @throws UnexpectedEntityException
     * @since $VID:$
     */
    public function loadScriptsStyles()
    {
        if ($this->admin_config->useAdvancedEditor()) {
            global $post;
            $eventId = isset($_REQUEST['post']) ? absint($_REQUEST['post']) : 0;
            $eventId = $eventId === 0 && $post instanceof WP_Post ? $post->ID : $eventId;
            if ($eventId) {
                $data = $this->getAllEventData($eventId);
                $data = wp_json_encode($data);
                add_action(
                    'admin_footer',
                    static function () use ($data) {
                        wp_add_inline_script(
                            EspressoEditorAssetManager::JS_HANDLE_EDITOR,
                            "var eeEditorEventData={$data}",
                            'before'
                        );
                    }
                );
            }
        }
    }


    /**
     * @param int $eventId
     * @return array
     * @throws EE_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ModelConfigurationException
     * @throws RestPasswordIncorrectException
     * @throws RestPasswordRequiredException
     * @throws UnexpectedEntityException
     * @throws RestException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    protected function getAllEventData($eventId)
    {
        $event = $this->spoofer->getApiResults(
            $this->event_model,
            [['EVT_ID' => $eventId]]
        );
        $event = is_array($event) && $event[0] && $event[0]['EVT_ID'] ? $event[0] : null;
        if ( ! $event ) {
            return [];
        }
        $eventDates = $this->spoofer->getApiResults(
            $this->datetime_model,
            [['EVT_ID' => $eventId]]
        );
        $eventDateTickets = [];
        foreach ($eventDates as $eventDate) {
            if (isset($eventDate['DTT_ID']) && $eventDate['DTT_ID']) {
                $DTT_ID = $eventDate['DTT_ID'];
                $eventDateTickets[ $DTT_ID ] = $this->spoofer->getApiResults(
                    $this->ticket_model,
                    [['Datetime.DTT_ID' => $DTT_ID]]
                );
            }
        }
        $ticketPrices = [];
        foreach ($eventDateTickets as $tickets) {
            if (is_array($tickets)){
                foreach ($tickets as $ticket) {
                    if (isset($ticket['TKT_ID']) && $ticket['TKT_ID']) {
                        $TKT_ID = $ticket['TKT_ID'];
                        $ticketPrices[ $TKT_ID ] = $this->spoofer->getApiResults(
                            $this->price_model,
                            [['Ticket.TKT_ID' => $TKT_ID]]
                        );
                    }
                }
            }
        }
        $price_types = $this->spoofer->getApiResults(
            $this->price_type_model,
            [['PRT_deleted' => false]]
        );
        return [
            'event'            => $event,
            'eventDates'       => $eventDates,
            'eventDateTickets' => $eventDateTickets,
            'ticketPrices'     => $ticketPrices,
            'price_types'      => $price_types,
        ];
    }
}