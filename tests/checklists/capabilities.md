This is for testing the capability system within EE.

## Stage One of testing: Ensure existing routes/actions work with administrator role.

* [ ] Test Event Admin Pages and routes
* [ ] Test Registrations Pages and routes
* [ ] Test Transactions Pages and routes
* [ ] Test Messages Pages and routes
* [ ] Test Pricing Pages and routes
* [ ] Test Registration Form Pages and routes.
* [ ] Test Venues pages and routes
* [ ] Test General Settings pages and routes
* [ ] Test Payment Methods pages and routes
* [ ] Test Help & Support pages and routes.
* [ ] Test Maintenance pages and routes (and test reset capabilities button).
* [ ] Test about pages and routes.

## Stage Two of testing: Ensure existing routes/actions work with Event Administrator role.
 
The expectation is that the Event Administrator role has all ee_capabilities *except* those related to payment methods. The role also has the following wp core capabilities:
    * 'read',
    * 'read_private_pages',
    * 'read_private_posts',
    * 'edit_users',
    * 'edit_posts',
    * 'edit_pages',
    * 'edit_published_posts',
    * 'edit_published_pages',
    * 'edit_private_pages',
    * 'edit_private_posts',
    * 'edit_others_posts',
    * 'edit_others_pages',
    * 'publish_posts',
    * 'publish_pages',
    * 'delete_posts',
    * 'delete_pages',
    * 'delete_private_pages',
    * 'delete_private_posts',
    * 'delete_published_pages',
    * 'delete_published_posts',
    * 'delete_others_posts',
    * 'delete_others_pages',
    * 'manage_categories',
    * 'manage_links',
    * 'moderate_comments',
    * 'unfiltered_html',
    * 'upload_files',
    * 'export',
    * 'import',
    * 'list_users',
    * 'level_1'

So when testing with the above role that's why you should expect.

* [ ] Verify that Event Administrator role has expected capabilities.

## Stage Three of Testing

In this stage, verify that the following add-ons when activated successfully add their capabilities to the Administrator and Event Administrator roles:

* [ ] People Add-on adds its cap.
* [ ] Barcode Scanner add-on adds its caps. 
* [ ] Promotions add-on adds its caps.

Also test that when adding a custom payment method add-on, its capability gets added.  For this test just testing one payment add-on such as Stripe should be sufficient.  Remember that only the Administrator role gets the payment method caps.

* [ ] Verify payment method add-on capability gets added when it is installed for the first time.

## Stage Four of Testing

### Testing Prep: 

- [The EE Capability spreadsheet][1] - This describes all the capabilities and the behaviour you can expect.  Each sheet in the file is for a major capability subset.  Use this when testing specific systems.
- Remember that not only are "routes" protected by capabilities, but also the associated buttons/actions for those routes.  So for instance, the create_new route for events is protected by the "edit_events" capability.  That means that not only should a user without that capability not be able to access the create new event editor but any buttons/links to that should not be visible either.

**Third Party Roles and Capabilities Plugin(s) to test with:**

- http://wordpress.org/plugins/capability-manager-enhanced/ for a quick start guide see: http://www.wpbeginner.com/plugins/how-to-add-or-remove-capabilities-to-user-roles-in-wordpress/

- https://wordpress.org/plugins/members/ Quick overview: http://justintadlock.com/archives/2009/09/17/members-wordpress-plugin

- also recommended to help quickly switch between accounts: http://wordpress.org/plugins/user-switching/

### To Test:
(using your choice of roles and capabilities plugin)

**Testing all capabilities with custom role**

* [ ] Create a Custom role and add ONLY the EE capabilities to it. 
* [ ] Create a user and assign that role to them.  Then log in as that user.
* [ ] Test every aspect of the EE_Admin with that user and verify things work as expected.

**Testing some capabilities with custom role**

* [ ] Create another custom role and pick single subsystem of EE to add capabilities to that role for (i.e. events).
* [ ] Assign that role to a user, and login as that user.
* [ ] Verify that the user is ONLY able to do the things they have capabilities for.

**Testing the "meta" capabilities**

* [ ] Repeat a custom role setup for a capability subset that includes meta capabilities.  For instance include `ee_read_others_events` but not `ee_read_private_events`, or add all the *read capabilities but none of the *edit meta capabilities.
* [ ] Assign that role to a user, and login as that user.
* [ ] Test that the capabilities work for that user as expected considering they don't have the required filtered capabilities for certain actions.

  [1]: https://docs.google.com/a/eventespresso.com/spreadsheet/ccc?key=0Al0RhqTD8pDfdEhtcFhLdW9rTFdPOWtrODh3d1QyN1E&usp=drive_web#gid=4

## Stage Five of testing
  
  This test is to verify that once the user edits capabilities on a role (i.e. removing capabilities that get added by default), on a version update, those capabilities do NOT get re-added.
  
  * On the Event Administrator Role, remove a couple ee core capabilities and remove the people add-on capabilities.
  * Manually bump the version of EE core higher and do the same for the people add-on.
  * [ ] After reloading the admin, verify that there were no changes to the capabilities from before the version change for the Event Administrator role.
  * [ ] Do the same for a payment method add-on (such as stripe) (but this would have to be done on the Administrator role)

## Stage Six of testing
  
  This is to test the reset capabilities tool.  After Stage Five testing, the Event Administrator role and the Administrator role (payment method cap) should have caps missing.  We want to test restoring the missing caps using the reset capabilities tool.  This tool is found in the Maintenance Admin Reset/Delete Data tab.
   
   * [ ] Verify that after clicking the reset capabilities button, the capabilities manually removed in Stage 5 are restored.