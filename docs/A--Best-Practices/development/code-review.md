# Code Reviews

The Event Espresso development process includes a code review step where a branch with changes is passed to another dev, who then examines the commits made in that branch in order to comment on those changes.

Things the reviewer might be looking for, includes, but is not limited to the following:

### Code Review Checklist

 * [ ] Code follows [EE Code standards and Best Practices](https://github.com/eventespresso/event-espresso-core/tree/master/docs/A--Best-Practices) with special attention to the use of:
      * [ ] dependencies are injected
      * [ ] avoids use of static and global 
      * [ ] suitable type hinting and consistent use of data types
      * [ ] uses type safe comparisons
      * [ ] use of ` esc_html__() ` or similar for translations
      * [ ] follows PSR formatting guidelines
      * [ ] all classes, methods and functions are properly documented via phpdocs
      * [ ] class constants instead of hardcoded strings used for keys and identifiers
 * [ ] Code is free of syntax errors
 * [ ] Code does not appear to introduce any backwards incompatibilities
 * [ ] Unit tests have been written (where and if applicable)
