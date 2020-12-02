<?php

namespace EventEspresso\core\domain\services\database;

use EE_Base_Class;
use EE_Datetime;
use EE_Error;
use EEM_Base;
use EEM_Datetime;

class DatetimeModelQueryHelper
{

    /**
     * @var EEM_Datetime $model
     */
    private $model;


    /**
     * DatetimeModelQueryHelper constructor.
     *
     * @param EEM_Datetime $model
     */
    public function __construct(EEM_Datetime $model)
    {
        $this->model = $model;
    }


    /**
     * @return bool|int
     * @since   $VID:$
     */
    public function prepModelForQuery()
    {
        $prev_data_prep_value = $this->model->get_assumption_concerning_values_already_prepared_by_model_object();
        $this->model->assume_values_already_prepared_by_model_object(EEM_Base::prepared_for_use_in_db);
        return $prev_data_prep_value;
    }


    /**
     * @param array    $query_params
     * @param bool|int $prev_data_prep_value
     * @return EE_Base_Class[]|EE_Datetime[]
     * @throws EE_Error
     * @since   $VID:$
     */
    public function getDatetimesAndRestoreModel(array $query_params, $prev_data_prep_value)
    {
        $result = $this->model->get_all($query_params);
        $this->model->assume_values_already_prepared_by_model_object($prev_data_prep_value);
        return $result;
    }


    /**
     * @param array  $query_params
     * @param int    $limit
     * @param string $order_by
     * @param string $order
     * @return array
     * @since   $VID:$
     */
    public function addDefaultQueryParams(array $query_params, $limit = 0, $order_by = 'DTT_EVT_start', $order = 'ASC')
    {
        $query_params = $this->addOrderByQueryParams($query_params, $order_by, $order);
        $query_params = $this->addLimitQueryParams($query_params, $limit);
        return $query_params;
    }


    /**
     * @param array  $query_params
     * @param string $default_where_conditions
     * @return array
     * @since   $VID:$
     */
    public function addDefaultWhereConditions(
        array $query_params,
        $default_where_conditions = EEM_Base::default_where_conditions_none
    ) {
        $query_params['default_where_conditions'] = $default_where_conditions;
        return $query_params;
    }


    /**
     * @param array $where_params
     * @param bool  $include_deleted
     * @param bool  $include_expired
     * @return array
     * @since   $VID:$
     */
    public function addDefaultWhereParams(array $where_params, bool $include_deleted = true, bool $include_expired = true)
    {
        $where_params = $this->addExpiredWhereParams($where_params, $include_expired);
        $where_params = $this->addDeletedWhereParams($where_params, $include_deleted);
        return $where_params;
    }


    /**
     * @param array  $where_params
     * @param string $date_field
     * @param string $comparison the date field's expected comparison against NOW
     *                           so upcoming dates should have a start date in the future (> NOW)
     *                           active dates should have a start date in the past (< NOW) but a future end date (> NOW)
     *                           active AND upcoming dates should both have an end date in the future (> NOW)
     * @return array
     * @throws EE_Error
     * @since $VID:$
     */
    public function addWhereParamsForDateField(array $where_params, string $date_field, string $comparison)
    {
        // sanitize the following parameters to the only acceptable values
        $date_field = $date_field === 'DTT_EVT_start' ? 'DTT_EVT_start' : 'DTT_EVT_end';
        $comparison = $comparison === '>' ? '>' : '<';
        // if already have where params for DTT_EVT_start or DTT_EVT_end then append ****** to these condition's key
        if (isset($where_params["Datetime.{$date_field}"])) {
            $where_params["Datetime.{$date_field}******"] = $where_params["Datetime.{$date_field}"];
        }
        $where_params["Datetime.{$date_field}"] = [
            $comparison,
            EEM_Datetime::instance()->current_time_for_query($date_field),
        ];
        return $where_params;
    }


    /**
     * @param array $where_params
     * @param bool  $include_deleted
     * @return array
     * @since   $VID:$
     */
    public function addDeletedWhereParams(array $where_params, bool $include_deleted = true)
    {
        $deleted                     = $include_deleted ? [true, false] : [false];
        $where_params['DTT_deleted'] = ['IN', $deleted];
        return $where_params;
    }


    /**
     * @param array $where_params
     * @param bool  $include_expired
     * @return array
     * @since   $VID:$
     */
    public function addExpiredWhereParams(array $where_params, bool $include_expired = true)
    {
        if (! $include_expired) {
            $where_params['DTT_EVT_end'] = ['>=', current_time('mysql', true)];
        }
        return $where_params;
    }


    /**
     * @param array $query_params
     * @param int   $limit
     * @return array
     * @since   $VID:$
     */
    public function addLimitQueryParams(array $query_params, $limit = 0)
    {
        if ($limit) {
            $query_params['limit'] = $limit;
        }
        return $query_params;
    }


    /**
     * @param array  $query_params
     * @param string $order_by
     * @param string $order
     * @return array
     * @since   $VID:$
     */
    public function addOrderByQueryParams(array $query_params, $order_by = 'DTT_EVT_start', $order = 'ASC')
    {
        $order                    = $order === 'ASC' ? 'ASC' : 'DESC';
        $valid_order_columns      = ['DTT_ID', 'DTT_EVT_start', 'DTT_EVT_end', 'DTT_order'];
        $order_by                 = in_array($order_by, $valid_order_columns, true) ? $order_by : 'DTT_EVT_start';
        $query_params['order_by'] = [$order_by => $order];
        return $query_params;
    }

}