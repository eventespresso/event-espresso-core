<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EE_Datetime;
use EE_Error;
use EE_Event;
use EE_Form_Section;
use EEM_Base;
use EEM_Datetime;
use EEM_Event;
use EEM_Price;
use EEM_Price_Type;
use EEM_Ticket;
use EventEspresso\core\domain\services\admin\entities\DefaultDatetimes;
use EventEspresso\core\domain\services\admin\entities\DefaultFormSections;
use EventEspresso\core\domain\services\graphql\Utilities;
use EventEspresso\core\exceptions\InvalidEntityException;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class NewEventDefaultEntities
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
class NewEventDefaultEntities extends EventEditorData
{
    /**
     * @var DefaultDatetimes
     */
    protected $default_datetimes;

    /**
     * @var   DefaultFormSections
     */
    protected $default_form_sections;


    /**
     * NewEventDefaultEntities constructor.
     *
     * @param DefaultDatetimes $default_datetimes
     * @param DefaultFormSections $default_form_sections
     * @param EEM_Datetime     $datetime_model
     * @param EEM_Event        $event_model
     * @param EEM_Price        $price_model
     * @param EEM_Price_Type   $price_type_model
     * @param EEM_Ticket       $ticket_model
     * @param Utilities        $utilities
     */
    public function __construct(
        DefaultDatetimes $default_datetimes,
        DefaultFormSections $default_form_sections,
        EEM_Datetime $datetime_model,
        EEM_Event $event_model,
        EEM_Price $price_model,
        EEM_Price_Type $price_type_model,
        EEM_Ticket $ticket_model,
        Utilities $utilities
    ) {
        $this->default_datetimes = $default_datetimes;
        $this->default_form_sections = $default_form_sections;
        parent::__construct(
            $datetime_model,
            $event_model,
            $price_model,
            $price_type_model,
            $ticket_model,
            $utilities
        );
    }


    /**
     * @param int $eventId
     * @return EE_Datetime[]
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidEntityException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function getData(int $eventId): array
    {
        $EVT_ID = absint($eventId);
        if ($EVT_ID < 1) {
            throw new InvalidArgumentException(
                esc_html__(
                    'A missing or invalid event ID was received.',
                    'event_espresso'
                )
            );
        }
        $event = $this->event_model->get_one_by_ID($EVT_ID);
        if (! $event instanceof EE_Event) {
            throw new InvalidEntityException($event, 'EE_Event');
        }
        $new_event = isset($_REQUEST['action']) && $_REQUEST['action'] === 'create_new';
        return [
            'datetimes'     => $this->createDefaultDatetimes($event, $new_event),
            'form_sections' => $this->createDefaultFormSections($event, $new_event)
        ];
    }


    /**
     * @param EE_Event $event
     * @param bool     $new_event
     * @return EE_Datetime[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function createDefaultDatetimes(EE_Event $event, bool $new_event): array
    {
        $datetime_count = $this->datetime_model->count(
            [
                [
                    'EVT_ID'      => $event->ID(),
                    'DTT_deleted' => ['IN', [true, false]],
                ],
                'default_where_conditions' => EEM_Base::default_where_conditions_none,
            ],
            'EVT_ID'
        );
        return $new_event || $datetime_count === 0
            ? $this->default_datetimes->create($event)
            : [];
    }


    /**
     * @param EE_Event $event
     * @param bool     $new_event
     * @return EE_Form_Section[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function createDefaultFormSections(EE_Event $event, bool $new_event): array
    {
        $reg_form_UUID = $event->registrationFormUuid();
        // if it's a new event and defaults have not been created yet, OR if there is no reg form at all...
        return ($new_event && ! $reg_form_UUID) ||  ! $reg_form_UUID
            ? $this->default_form_sections->create($event)
            : [];
    }
}
