
# Developing Blocks for EE 
The following are documents realted to developing EE blocks.

| Document            |  Description                                                                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Asset Management    |  How assets are registered and enqueued for blocks.  Including where you should put css etc for your blocks to be used in various contexts such as editor or frontend. |
| Block API (js)                     |                                                                                                                  Creating your block in javascript                                                      |
| Block API (php)  |  Outlining how to create a new block php side in core and for add-ons.                                                                                                 |
| General Conventions |  Just a few conventions we have regarding registering blocks                   |                                                                                                                                                                        |
For conventions:

- use `event-espresso-blocks` and `ee-core-blocks` for all main containers for the blocks
- Only put in `edit.js` (the actual block component) things that are only for use in the editor context.  In other words extract things that are reusable outside of the editor context into components.
- To localize or not to localize `Error`?
- file organization
- Block naming.