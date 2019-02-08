This checklist is for testing the `EventAttendees` block.

## General Testing Considerations
- watch for errors in the browser javascript console.
- try testing cross browsers. 
- try testing across various themes
- watch for any weird ui/ux behaviour and report it.  "Weird" is a admittedly a subjective thing and this is a vague consideration.  Basically this means if you see behaviour that seems glitchy or gives a bad experience, report it. 
- The testing notes focus mostly on just a single `EventAttendees` block being added to content, you will want to try adding multiple blocks as well.
- This block should work for any WordPress post type (post, pages, other cpts) that supports the Block Editor. So verify that it works in various post type editors as well.
- This block should work for the Event  Espresso CPT editors _once they support the block editor._

* [ ] Verify that the Event Attendees block appears in the "Event Espresso" category of the Add block picker menu tool.
* Add an `EventAttendees` block to your content
* [ ] Verify that you see a placeholder in your content with "To get started, select what event you want to show attendees from in the block settings"
* [ ] Verify when you preview the post at this point, there is no rendered content for the block.
* [ ] Go ahead and select the block and play with various settings to change the contents of the block.  Verify that the block content shows expected results.
* [ ] for each variation you try in the previous step, ensure that the frontend for the post displays the content the same as how it appears in the editor.
* [ ] In particular, ensure the "Display on Archives" feature works as expected for viewing block content on the frontend in an archive view.