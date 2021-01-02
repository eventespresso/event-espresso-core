<?php

namespace EventEspresso\Tests\Mocks\Core;

use EventEspresso\core\Psr4Autoloader;

class Psr4AutoloaderMock extends Psr4Autoloader
{

    protected $files = [];


    public function setFiles(array $files)
    {
        $this->files = $files;
    }


    protected function requireFile(string $file): bool
    {
        return in_array($file, $this->files);
    }

}
