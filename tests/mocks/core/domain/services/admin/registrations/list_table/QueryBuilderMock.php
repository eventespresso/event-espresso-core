<?php

namespace EventEspresso\tests\mocks\core\domain\services\admin\registrations\list_table;

use EE_Error;
use EventEspresso\core\domain\services\admin\registrations\list_table\QueryBuilder;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;

/**
 * Class QueryBuilder
 * Sets up the query parameters for the registrations admin page list table query
 *
 * @package EventEspresso\core\domain\services\admin\registrations
 * @author  Brent Christensen
 * @since   $VID:$
 */
class QueryBuilderMock extends QueryBuilder
{

    /**
     * @return array
     */
    public function getWhereParams()
    {
        return $this->where_params;
    }

    /**
     * @return string
     */
    public function getView()
    {
        return $this->view;
    }

    /**
     * Sets up the where conditions for the registrations query.
     *
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function getWhereClause()
    {
        return parent::getWhereClause();
    }


    /**
     * This will add ATT_ID to the provided $this->where_clause array for EE model query parameters.
     */
    public function addAttendeeIdToWhereConditions()
    {
        parent::addAttendeeIdToWhereConditions();
    }


    /**
     * This will add EVT_ID to the provided $this->where_clause array for EE model query parameters.
     */
    public function addEventIdToWhereConditions()
    {
        parent::addEventIdToWhereConditions();
    }


    /**
     * Adds category ID if it exists in the request to the where conditions for the registrations query.
     */
    public function addCategoryIdToWhereConditions()
    {
        parent::addCategoryIdToWhereConditions();
    }


    /**
     * Adds the datetime ID if it exists in the request to the where conditions for the registrations query.
     */
    public function addDatetimeIdToWhereConditions()
    {
        parent::addDatetimeIdToWhereConditions();
    }


    /**
     * Adds the ticket ID if it exists in the request to the where conditions for the registrations query.
     */
    public function AddTicketIdToWhereConditions()
    {
        parent::AddTicketIdToWhereConditions();
    }


    /**
     * Adds the correct registration status to the where conditions for the registrations query.
     * If filtering by registration status, then we show registrations matching that status.
     * If not filtering by specified status, then we show all registrations excluding incomplete registrations
     * UNLESS viewing trashed registrations.
     */
    public function addRegistrationStatusToWhereConditions()
    {
        parent::addRegistrationStatusToWhereConditions();
    }


    /**
     * Adds any provided date restraints to the where conditions for the registrations query.
     *
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function addDateToWhereConditions()
    {
        parent::addDateToWhereConditions();
    }


    /**
     * Adds any provided search restraints to the where conditions for the registrations query
     */
    public function addSearchToWhereConditions()
    {
        parent::addSearchToWhereConditions();
    }


    /**
     * Sets up the orderby for the registrations query.
     *
     * @return array
     */
    public function getOrderbyClause()
    {
        return parent::getOrderbyClause();
    }


    /**
     * Sets up the limit for the registrations query.
     *
     * @param $per_page
     * @return array
     */
    public function getLimitClause($per_page)
    {
        return parent::getLimitClause($per_page);
    }
}