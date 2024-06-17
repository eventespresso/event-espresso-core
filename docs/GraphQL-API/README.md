# Event Espresso GraphQL API

Event Espresso GraphQL API is based on [WP GraphQL](https://github.com/wp-graphql). Please visit WP GraphQL [docs](https://www.wpgraphql.com/docs/introduction) to get started. You can also use any _GraphiQL_ explorer to browse the API schema. Unless `wp-config.php` constant `GRAPHQL_DEBUG` is set to `true` admin interface for [WP GraphQL](https://github.com/wp-graphql) will remain hidden in the backend (`/wp-admin/`) including [GraphiQL IDE](https://www.wpgraphql.com/docs/wp-graphiql).

## Examples

-   Query
    -   [Attendee](./query/attendee.md)
    -   [Event](./query/event.md)
    -   [Event Relations](./query/eventRelations.md)
    -   [Datetime](./query/datetime.md)
    -   [Ticket](./query/ticket.md)
    -   [Price](./query/price.md)
    -   [PriceType](./query/priceType.md)
    -   [FormSection](./query/formSection.md)
    -   [FormElement](./query/formSection.md)
-   Mutations
    -   [Datetime](./mutations/datetime.md)
    -   [Ticket](./mutations/ticket.md)
    -   [Price](./mutations/price.md)
    -   [Common](./mutations/common.md)
    -   [Bulk update](./mutations/bulk-update.md)
