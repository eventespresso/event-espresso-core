<?php

namespace EventEspresso\tests\mocks\core\services\encryption;

use EventEspresso\core\services\encryption\EncryptionKeyManager;
use Exception;

class EncryptionKeyManagerMock extends EncryptionKeyManager
{

    /**
     * creates a new cryptographically secure encryption key
     *
     * @return string
     * @throws Exception
     */
    public function generateStrongEncryptionKey()
    {
        return parent::generateStrongEncryptionKey();
    }


    /**
     * creates a new encryption key that should not be trusted to be cryptographically secure
     *
     * @return string
     * @throws Exception
     */
    public function generateWeakEncryptionKey()
    {
        return parent::generateWeakEncryptionKey();
    }


    /**
     * retrieves encryption keys from db
     *
     * @return array
     * @throws Exception
     */
    public function retrieveEncryptionKeys()
    {
        return parent::retrieveEncryptionKeys();
    }


    /**
     * saves encryption keys from db
     *
     * @return bool
     */
    public function saveEncryptionKeys($initialize = false)
    {
        return parent::saveEncryptionKeys($initialize);
    }
}
