<?php
namespace EventEspresso\Tests\Mocks\Core;

use EventEspresso\core\Psr4Autoloader;

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