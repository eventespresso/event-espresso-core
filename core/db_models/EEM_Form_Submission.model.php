<?php

use EventEspresso\core\services\request\RequestInterface;

/**
 * Class EEM_Form_Submission
 *
 * @method EE_Form_Submission get_one($query_params = [])
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EEM_Form_Submission extends EEM_Base
{
    /**
     * @var EEM_Form_Submission
     */
    protected static $_instance;

    /**
     * @var RequestInterface
     */
    private $request;


    protected function __construct($timezone = null)
    {
        $this->singular_item = esc_html__('Form Submission', 'event_espresso');
        $this->plural_item   = esc_html__('Form Submissions', 'event_espresso');

        $this->_tables          = [
            'Form_Submission' => new EE_Primary_Table('esp_form_submission', 'FSB_UUID'),
        ];
        $this->_fields          = [
            'Form_Submission' => [
                'FSB_UUID'      => new EE_Primary_Key_String_Field(
                    'FSB_UUID',
                    esc_html__('Form Submission UUID (universally unique identifier)', 'event_espresso')
                ),
                'FSC_UUID'      => new EE_Foreign_Key_String_Field(
                    'FSC_UUID',
                    esc_html__('Form Section UUID (universally unique identifier)', 'event_espresso'),
                    false,
                    '',
                    'Form_Section'
                ),
                'TXN_ID'        => new EE_Foreign_Key_Int_Field(
                    'TXN_ID',
                    esc_html__('Transaction ID', 'event_espresso'),
                    false,
                    0,
                    'Transaction'
                ),
                'FSB_data'      => new EE_JSON_Field(
                    'FSB_data',
                    esc_html__('Serialized form submission data', 'event_espresso'),
                    true,
                    null
                ),
                'FSB_submitted' => new EE_Datetime_Field(
                    'FSB_submitted',
                    esc_html__('Form submission timestamp', 'event_espresso'),
                    false,
                    EE_Datetime_Field::now,
                    $timezone
                ),
            ],
        ];
        $this->_model_relations = [
            'Form_Section' => new EE_Belongs_To_Relation(),
            'Transaction'  => new EE_Belongs_To_Relation(),
        ];
        parent::__construct($timezone);
        $this->request = $this->getLoader()->getShared('EventEspresso\core\services\request\RequestInterface');
    }


    /**
     * adds all default where conditions unless the current request originates from the admin
     *
     * @param array $query_params
     * @return array
     */
    private function addDefaultWhereConditions(array $query_params): array
    {
        // might need to add a way to identify GQL requests for admin domains
        $query_params['default_where_conditions'] = $this->request->isAdmin() || $this->request->isAdminAjax()
            ? EEM_Base::default_where_conditions_none
            : EEM_Base::default_where_conditions_all;
        return $query_params;
    }


    /**
     * form sections should always be sorted in ascending order via the FSC_order field
     *
     * @param array $query_params
     * @return array
     */
    private function addOrderByQueryParams(array $query_params): array
    {
        $query_params['order_by'] = ['FSB_submitted' => 'ASC'];
        return $query_params;
    }


    /**
     * @param EE_Event $event
     * @return EE_Form_Submission[]|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getAllFormSubmissionsForEvent(EE_Event $event): ?array
    {
        $query_params = [['FSC_UUID' => $event->registrationFormUuid()]];
        $query_params = $this->addDefaultWhereConditions($query_params);
        $query_params = $this->addOrderByQueryParams($query_params);
        return $this->get_all($query_params);
    }


    /**
     * @param EE_Transaction $transaction
     * @return EE_Form_Submission|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getFormSubmissionForTransaction(EE_Transaction $transaction): ?EE_Form_Submission
    {
        $query_params = [['TXN_ID' => $transaction->ID()]];
        $query_params = $this->addDefaultWhereConditions($query_params);
        return $this->get_one($query_params);
    }
}
