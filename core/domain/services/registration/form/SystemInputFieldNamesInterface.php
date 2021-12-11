<?php

namespace EventEspresso\core\domain\services\registration\form;

interface SystemInputFieldNamesInterface
{
    const FIRST_NAME    = 'first-name';

    const LAST_NAME     = 'last-name';

    const EMAIL         = 'email';

    const EMAIL_CONFIRM = 'email-confirmation';

    const ADDRESS       = 'address';

    const ADDRESS_2     = 'address-2';

    const CITY          = 'city';

    const STATE         = 'state';

    const COUNTRY       = 'country';

    const POSTAL_CODE   = 'postal-code';

    const PHONE         = 'phone';


    /**
     * @param string $field
     * @return string
     */
    public function getInputName(string $field): string;
}
