<?php
/**
 * Like WP_FilesystemMockFS, but adds permissions support
 */
define( 'WP_Filesystem_MockFS_default_perms' , '0777' ); 
define( 'WP_Filesystem_MockFS_default_owner' , 'wp-owner' ); 
define( 'WP_Filesystem_MockFS_default_group' , 'wp-group' ); 
class WP_Filesystem_MockEEFS extends WP_Filesystem_Base {
	private $cwd;

	// Holds a array of objects which contain an array of objects, etc.
	public $fs = null;

	// Holds a array of /path/to/file.php and /path/to/dir/ map to an object in $fs above
	// a fast more efficient way of determining if a path exists, and access to that node
	private $fs_map = array();
	
	private $_current_system_user_name; 
	private $_system_users = array();

	public $verbose = false; // Enable to debug WP_Filesystem_Base::find_folder() / etc.
	public $errors = array();
	public $method = 'MockFS';

	function __construct() {}

	function connect() {
		return true;
	}

	// Copy of core's function, but accepts a path.
	function abspath( $path = false ) {
		if ( ! $path )
			$path = ABSPATH;
		$folder = $this->find_folder( $path );

		// Perhaps the FTP folder is rooted at the WordPress install, Check for wp-includes folder in root, Could have some false positives, but rare.
		if ( ! $folder && $this->is_dir('/wp-includes') )
			$folder = '/';
		return $folder;
	}

	// Mock FS specific functions:

	/**
	 * Sets initial filesystem environment and/or clears the current environment.
	 * Can also be passed the initial filesystem to be setup which is passed to self::setfs()
	 */
	function init( $paths = '', $home_dir = '/' ) {
		$this->fs = new MockFS_Directory_Node( '/' );
		$this->fs_map = array(
			'/' => $this->fs,
		);
		$this->cache = array(); // Used by find_folder() and friends
		$this->cwd = isset( $this->fs_map[ $home_dir ] ) ? $this->fs_map[ $home_dir ] : '/';
		$this->setfs( $paths );
		$this->add_system_user( WP_Filesystem_MockFS_default_owner ); 
	}

	/**
	 * "Bulk Loads" a filesystem into the internal virtual filesystem
	 */
	function setfs( $paths ) {
		if ( ! is_array($paths) )
			$paths = explode( "\n", $paths );

		$paths = array_filter( array_map( 'trim', $paths ) );

		foreach ( $paths as $path ) {
			// Allow for comments
			if ( '#' == $path[0] )
				continue;

			// Directories
			if ( '/' == $path[ strlen($path) -1 ] )
				$this->mkdir( $path );
			else // Files (with dummy content for now)
				$this->put_contents( $path, 'This is a test file' );
		}

	}

	/**
	 * Locates a filesystem "node"
	 * @return MockFS_Node 
	 */
	private function locate_node( $path ) {
		if( isset( $this->fs_map[ $path ] ) ) {
			return $this->fs_map[ $path ];
		} elseif( isset( $this->fs_map[ $path . '/' ] ) ){
			return $this->fs_map[ $path . '/' ];
		}
		return false;
	}

	/**
	 * Locates a filesystem node for the parent of the given item
	 */
	private function locate_parent_node( $path ) {
		$dirname = str_replace( '\\', '/', dirname( $path ) );
		return $this->locate_node( trailingslashit( $dirname ) );
	}

	// Here starteth the WP_Filesystem functions.

	function mkdir( $path, $chmod = false, $chown = false, $chgrp = false ) { 
		$path = trailingslashit( $path );
		//if the directory already exists, leave it alone 
		if( $this->is_dir( $path ) ){ 
			return FALSE; 
		} 

		$parent_node = $this->locate_parent_node( $path );
		if ( ! $parent_node ) {
			$dirname = str_replace( '\\', '/', dirname( $path ) );
			if( $dirname == '/' ){ 
				return FALSE; 
			}
			$this->mkdir( $dirname );
			$parent_node = $this->locate_parent_node( $path );
			if ( ! $parent_node )
				return false;
		}

		$node = new MockFS_Directory_Node( $path, $chmod, $chown, $chgrp ); 

		$parent_node->children[ $node->name ] = $node;
		$this->fs_map[ $path ] = $node;

		return true;
	}

	function put_contents( $path, $contents = '', $mode = null ) {
		if ( ! $this->is_dir( dirname( $path ) ) )
			$this->mkdir( dirname( $path ), $mode ); 
 
		//if the file already exists, just change its contents 
		$new_file = $this->locate_node( $path ); 
		if( $new_file ){ 
			if( ! $new_file instanceof MockFS_File_Node ){ 
				return FALSE; 
			}else{ 
				$new_file->contents = $contents; 
			} 
			//if they specified what permissions to set, set them 
			if( $mode != NULL ){ 
				$new_file->perms = $mode; 
			}
			return true;
		}else{ 
			$parent = $this->locate_parent_node( $path ); 
			if( ! $parent ){ 
				return FALSE; 
			} 
			$new_file = new MockFS_File_Node( $path, $contents, $mode ); 
			$parent->children[ $new_file->name ] = $new_file;
			$this->fs_map[ $path ] = $new_file;
			return true;
		} 
	}

	function get_contents( $file ) {
		if ( ! $this->is_file( $file ) )
			return false;
		return $this->fs_map[ $file ]->contents;
	}

	function cwd() {
		return $this->cwd->path;
	}

	function chdir( $path ) {
		if ( ! isset( $this->fs_map[ $path ] ) )
			return false;

		$this->cwd = $this->fs_map[ $path ];
		return true;
	}

	function exists( $path ) {
		return isset( $this->fs_map[ $path ] ) || isset( $this->fs_map[ trailingslashit( $path ) ] );
	}

	function is_file( $file ) {
		return isset( $this->fs_map[ $file ] ) && $this->fs_map[ $file ]->is_file();
	}

	function is_dir( $path ) {
		$path = trailingslashit( $path );

		return isset( $this->fs_map[ $path ] ) && $this->fs_map[ $path ]->is_dir();
	}

	function dirlist( $path = '.', $include_hidden = true, $recursive = false ) {
		$path = trailingslashit( $path );
		if ( empty( $path ) || '.' == $path )
			$path = $this->cwd();

		if ( ! $this->exists( $path ) )
			return false;

		$limit_file = false;
		if ( $this->is_file( $path ) ) {
			$limit_file = $this->locate_node( $path )->name;
			$path = dirname( $path ) . '/';
		}

		$ret = array();
		foreach ( $this->fs_map[ $path ]->children as $entry ) {
			if ( '.' == $entry->name || '..' == $entry->name )
				continue;

			if ( ! $include_hidden && '.' == $entry->name )
				continue;

			if ( $limit_file && $entry->name != $limit_file )
				continue;

			$struc = array();
			$struc['name'] = $entry->name;
			$struc['type'] = $entry->type;

			if ( 'd' == $struc['type'] ) {
				if ( $recursive )
					$struc['files'] = $this->dirlist( trailingslashit( $path ) . trailingslashit( $struc['name'] ), $include_hidden, $recursive );
				else
					$struc['files'] = array();
			}

			$ret[ $entry->name ] = $struc;
		}
		return $ret;
	}
	/**
         * Changes the permissions
         * @param string $file path to file/folder
         * @param string $mode
         * @param boolean $recursive
         * @return boolean success
         */
        public function chmod( $file, $mode = false, $recursive = false ) {
                $node = $this->locate_node( $file );
                if( ! $node instanceof MockFS_Node ){
                        return FALSE;
                }
                $node->perms = $mode;
                if( $node instanceof MockFS_Directory_Node && $recursive ){
                        foreach( $node->children as $child_node ){
                                $this->chmod( $child_node->path, $mode, $recursive );
                        }
                }
                return TRUE;
        }
        /**
         * CHanges the owner
         * @param string $file
         * @param string $owner name of owner
         * @param type $recursive
         */
        public function chown( $file, $owner, $recursive = false ) {
                $node = $this->locate_node( $file );
                if( ! $node instanceof MockFS_Node || ! $this->is_writable( $file ) ){
                        return FALSE;
                }
                $node->owner = $owner;
                if( $node instanceof MockFS_Directory_Node && $recursive ){
                        foreach( $node->children as $child_node ){
                                $this->chown( $child_node->path, $owner, $recursive );
                        }
                }
                return TRUE;
        }
        /**
         * Sets the group name
         * @param string $file
         * @param string $group
         * @param boolean $recursive
         * @return boolean success
         */
        public function chgrp( $file, $group, $recursive = false ) {
                $node = $this->locate_node( $file );
                if( ! $node instanceof MockFS_Node || ! $this->is_writable( $file ) ){
                        return FALSE;
                }
                $node->group = $group;
                if( $node instanceof MockFS_Directory_Node && $recursive ){
                        foreach( $node->children as $child_node ){
                                $this->chgrp( $child_node->path, $group, $recursive );
                        }
                }
                return TRUE;
        }

        /**
         *
         * @param type $file
         * @return string | false on error
         */
        function owner( $file ) {
                $node = $this->locate_node( $file );
                if( ! $node instanceof MockFS_Node || ! $this->is_writable( $file ) ){
                        return FALSE;
                }else{
                        return $node->owner();
                }
        }

        /**
         *
         * @param type $file
         * @return string | false on error
         */
        function group( $file ) {
                $node = $this->locate_node( $file );
                if( ! $node instanceof MockFS_Node ){
                        return FALSE;
                }else{
                        return $node->group();
                }
        }

        /**
         * Gets the permissions on the file
         * @return string | false on error
         */
        public function getchmod( $file ){
                $node = $this->locate_node( $file );
                if( ! $node instanceof MockFS_Node ){
                        return FALSE;
                }else{
                        return $node->perms();
                }
        }

        /**
         * Users to swithch to
         * @param string $new_username
         * @return boolean success
         */
        public function change_current_system_user( $new_username ){
                if( isset( $this->_system_users[ $new_username ] ) ){
                        $this->_current_system_user_name = $new_username;
                }else{
                        return FALSE;
                }
        }
        /**
         * Gets the current mock FS system user, or FALSE if none has been set
         * @return MockFS_System_User
         */
        public function get_current_system_user(){
                if( isset( $this->_system_users[ $this->_current_system_user_name ] ) ){
                        return $this->_system_users[ $this->_current_system_user_name ];
                }else{
                        return FALSE;
                }
        }

        /**
         * Adds the specified user. Returns that new user obejct or FALSE
         * @param string $username
         * @param string $groupname
         * @return boolean|\MockFS_System_User
         */
        function add_system_user( $username, $groupname = NULL ){
                if( isset( $this->_system_users[ $username ] ) ){
                        return FALSE;
                }
                if( ! $groupname ){
                        $groupname = WP_Filesystem_MockFS_default_group;
                }
                $user = new MockFS_System_User( $username, $groupname );
                $this->_current_system_user_name = $user->username;
                $this->_system_users[ $user->username ] = $user;
                return $user;
        }

        function is_readable( $file ) {
                $user = $this->get_current_system_user();
                $file_node = $this->locate_node( $file );
                if( ! $file_node ){
                        return FALSE;
                }
                $perms =  intval( $file_node->perms(), 8 ) ;
                //owned by this user
                if( $file_node->owner() == $user->username ) {
                        if( $perms & 0400 ){
//                              echo "\r\n " . $user->username . " has permision to read " . $file_node->name . " because its perms are :" . $perms;
                                return TRUE;
                        }
                }
                //owned by this group?
                if( $file_node->group == $user->groupname ) {
                        if( $perms & 0040 ) {
//                              echo "\r\n " . $user->groupname . " has permision to read " . $file_node->name . " because its perms are :" . $perms;
                                return TRUE;
                        }
                }
                if( $perms & 0004){
//                      echo "\r\n anyone has permision to read " . $file_node->name . " because its perms are :" . $perms;
                        return TRUE;
                }else{
                        return FALSE;
                }
        }
        function is_writable( $file ) {
                $user = $this->get_current_system_user();
                $file_node = $this->locate_node( $file );
                if( ! $file_node ){
                        return FALSE;
                }
                $perms =  intval( $file_node->perms(), 8 ) ;
                //owned by this user
                if( $file_node->owner() == $user->username ) {
                        if( $perms & 0200 ){
//                              echo "\r\n " . $user->username . " has permision to read " . $file_node->name . " because its perms are :" . $perms;
                                return TRUE;
                        }
                }
                //owned by this group?
                if( $file_node->group == $user->groupname ) {
                        if( $perms & 0020 ) {
//                              echo "\r\n " . $user->groupname . " has permision to read " . $file_node->name . " because its perms are :" . $perms;
                                return TRUE;
                        }
                }
                if( $perms & 0002){
//                      echo "\r\n anyone has permision to read " . $file_node->name . " because its perms are :" . $perms;
                        return TRUE;
                }else{
                        return FALSE;
                }
        }
        /**
         *
         * @param type $path
         * @param type $time
         * @param type $atime
         * @return boolean
         */
        function touch( $path, $time = 0, $atime = 0 ) {
                if( ! $this->exists(  $path ) ){
                        $this->put_contents($path);
                        return TRUE;
                }else{
                        //if we kept track of when a file was last edited we would update it
                        return TRUE;
                }
        }



}

class MockFS_Node {
	public $name; // The "name" of the entry, does not include a slash (exception, root)
	public $type; // The type of the entry 'f' for file, 'd' for Directory
	public $path; // The full path to the entry.
	public $perms; //permissions associated with this file or folder
	public $owner; //the owner name of the file or folder
	public $group; //the group of this file or folder

	function __construct( $path, $chmod = NULL, $chown = NULL, $chgrp = NULL ) {
		$this->path = $path;
		$this->name = basename( $path );
	   if( ! $chmod ) {
			   $chmod = WP_Filesystem_MockFS_default_perms;
	   }
	   if( ! $chown ) {
			   $chown = WP_Filesystem_MockFS_default_owner;
	   }
	   if( ! $chgrp ) {
			   $chgrp = WP_Filesystem_MockFS_default_group;
	   }
	   $this->perms = $chmod;
	   $this->owner = $chown;
	   $this->group = $chgrp;
	}

	function is_file() {
		return $this->type == 'f';
	}

	function is_dir() {
		return $this->type == 'd';
	}
	/**
	*
	* @return string @see http://en.wikipedia.org/wiki/File_system_permissions#Numeric_notation
	*/
   function perms(){
		   return $this->perms;
   }
   function owner(){
		   return $this->owner;
   }
   function group(){
		   return $this->group;
   }
}

class MockFS_Directory_Node extends MockFS_Node {
	public $type = 'd';
	public $children = array(); // The child nodes of this directory
}

class MockFS_File_Node extends MockFS_Node {
	public $type = 'f';
	public $contents = ''; // The contents of the file

	function __construct( $path, $contents = '', $chmod = NULL, $chown = NULL, $chgrp = NULL  ) {
		parent::__construct( $path, $chmod, $chown, $chgrp );
		$this->contents = $contents;
	}
}

class MockFS_System_User{
        public $username;
        public $groupname;
        function __construct( $username, $groupname = NULL) {
                $this->username = $username;
                if( ! $groupname ){
                        $groupname = WP_Filesystem_MockFS_default_group;
                }
                $this->groupname = $groupname;
        }
}