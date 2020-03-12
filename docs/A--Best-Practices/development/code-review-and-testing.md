# Code Reviews && Testing

### Code Reviews

The Event Espresso development process includes a code review step where a branch with changes is passed to another dev, who then examines the commits made in that branch in order to comment on those changes.

Things the reviewer might be looking for, includes, but is not limited to the following:

#### Code Review Checklist

 * [ ] Code follows [EE Code standards and Best Practices](https://github.com/eventespresso/event-espresso-core/tree/master/docs/A--Best-Practices) with special attention to the use of:
      * [ ] dependencies are injected
      * [ ] avoids use of static and global 
      * [ ] suitable type hinting and consistent use of data types
      * [ ] uses type safe comparisons
      * [ ] use of ` esc_html__() ` or similar for translations
      * [ ] follows PSR formatting guidelines
      * [ ] all classes, methods and functions are properly documented via phpdocs
      * [ ] class constants instead of hardcoded strings used for keys and identifiers
      * [ ] check for uses of `do_action()` that pass an array of objects as the first parameter and suggest `do_action_ref_array()` instead
      * [ ] check for use of functions from non-default PHP extensions
      * [ ] check for use of [deprecated PHP functions](https://github.com/php/php-src/blob/php-7.2.0RC4/UPGRADING#L166)
 * [ ] Code is free of syntax errors
 * [ ] Code does not appear to introduce any backwards incompatibilities
 * [ ] Unit tests have been written (where and if applicable)


### Quality Assurance Testing

After a pull request has passed code review as well as any associated automated testing such as unit and/or integration testing, linting, etc, a branch will then be passed to the Event Espresso support tEEm for additional Quality Assurance testing.

The support staff performing the testing need to verify that the changes in the branch work as expected and also
 that they do not introduce any regressions or other new problems. To do this properly, the author of the pull
  request is required to include the following when submitting their code for testing:
  
  * a description of the changes made and any areas of the existing codebase that are affected
  * a set of detailed testing instructions for the support staff to follow
  * any code snippets required to simulate external operations and/or trigger code execution
  
It is preferred that you write testing notes in the initial pull request so that the code reviewer can better
 understand what areas of the codebase are affected, which may help them think of any potential gotchas that may not
  have been considered.
  
  > "Oh I see you refactored the 620C Repulsorlift engine on the pod racer... did you remember to check for sand? It's coarse and rough and irritating and it gets everywhere!"

Here's a simple example of what some testing instructions might look like:

  > #### Testing Notes
  > 
  > - [ ] view transaction reports on a fresh site
  > - [ ] click links in message editor preview
  > - [ ] do a migration
  > - [ ] use the Event Espresso Maintenance > Reset page to reset something
  > - [ ] edit an event, but don't save and hit the back button to view the warning