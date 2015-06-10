<?php

namespace EventEspresso\Tests\Mocks\Core;

use EventEspresso\Core\EE_Psr4Autoloader;

if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }



class EE_Psr4Autoloader_Mock extends EE_Psr4Autoloader {

	protected $files = array();



	public function setFiles( array $files ) {
		$this->files = $files;
	}



	protected function requireFile( $file ) {
		return in_array( $file, $this->files );
	}

}
// End of file EE_Psr4Autoloader_Mock.php
// Location: /tests/mocks/core/EE_Psr4Autoloader_Mock.php