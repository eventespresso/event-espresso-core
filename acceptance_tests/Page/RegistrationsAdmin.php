<?php
namespace Page;

/**
 * RegistrationsAdmin
 * Selectors/References to elements in the Registrations admin pages.
 *
 * @package Page
 * @author  Darren Ethier
 * @since   1.0.0
 */
class RegistrationsAdmin extends CoreAdmin
{
    /**
     * @var string
     */
    const REGISTRATION_STATUS_NOT_APPROVED = 'RNA';


    /**
     * @var string
     */
    const REGISTRATION_STATUS_APPROVED = 'RAP';


    /**
     * @var string
     */
    const REGISTRATION_STATUS_PENDING_PAYMENT = 'RPP';
}