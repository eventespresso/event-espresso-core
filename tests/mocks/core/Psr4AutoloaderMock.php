<?php

namespace EventEspresso\Tests\Mocks\Core;

use EventEspresso\Core\Psr4Autoloader;

if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }



class Psr4AutoloaderMock extends Psr4Autoloader {

	protected $files = array();



	public function setFiles( array $files ) {
		$this->files = $files;
	}



	protected function requireFile( $file ) {
		return in_array( $file, $this->files );
	}

}
// End of file Psr4AutoloaderMock.php
// Location: /tests/mocks/core/Psr4AutoloaderMock.php