## What goes in the "hooks" folder?

The "caffeinated/hooks" folder is where we add any classes that serve as namespaces for utilizing the WordPress action/filter hooks system to add functionality to existing core EE_Admin pages **OR** new caffeinated EE_Admin Pages.

Here's how it works:

### 1. Create a file in this directory for any hooks you want to implement.

Some important things about the naming structure of this file.  It can be any name you want, HOWEVER:

* the file MUST end with the following suffix:  ".class.php"
* the name of the file must correspond with a defined class within the file that is named the same.  Example "events_wordpress_hooks.class.php" must contain a class named "events_wordpress_hooks";


### 2. The hook class must ONLY be for implemnenting add_filters() and add_actions.

Keep in mind that all the classes in this special directory are loaded/instantiated early by the EE_Admin_Page_load controller.  So the ONLY thing that should be happening in this class is the registering of hooks and their callables.  

That's it!