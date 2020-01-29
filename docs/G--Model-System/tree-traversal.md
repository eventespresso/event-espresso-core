# Model Object Tree Traversal
Event Espresso model objects (representing database rows) can depend on other model objects through their foreign keys.
Those model objects can in turn depend on others. This can make a fairly wide tree of dependencies. This articles documents
some classes that help traversing that tree, whose first application is performing "cascading deletions" (instead of just
deleting a single model object, also recursively delete all its dependent model objects.)

Here's an example of a model object dependency tree.

```
Event 1 has dependents:
-Datetime 1 has dependents:
--Datetime Ticket 1
--Datetime Ticket 2
-Registration 1 has dependents:
--Answer 1
--Answer 2
--Registration_Payment 1
-Registration 2 has dependents:
--Answer 3
--Answer 4
--Registraiton_Payment 2
-Event Venue 1
-Event_Message_Template 1
-Event_Message_Template 2
-Event_Message_Template 3
-Event_Message_Template 4
-Event_Message_Template 5
-Event_Message_Template 6
-Event_Message_Template 7
-Event_Message_Template 8
-Event_Question_Group
-Term_Relationship 1
-Term_Relationship 2
-Term_Relationship 3

etc...
```
The situation gets worse considering add-ons may define other model objects which are also related.

As you might guess, discovering all the model objects that depend on a particular model object can take quite a few database queries,
so it's often best to perform these as part of a batch process.

These classes are in the namespace (and corresponding folder) `\EventEspresso\core\services\orm\tree_traversal\`

## ModelObjNode
This class wraps a single model object, and contains the logic for discovering its dependent model objects. It can do this
all at once, or across multiple method invocations. Eg

```php
// Given a transaction model object...
$t = EEM_Transaction::instance()->get_one();

// Create a ModelObjNode around it.
$transaction_node = new ModelObjNode($t->ID(), $t->get_model());

// Then request it discover 10 of its dependent model objects. If we wanted to get all of them at once, we could pass INF constant.
$transaction_node->visit(10);

// And see what they are (the returned array is indexed first by model name whose value is an array of IDs.)
$model_names_and_ids = $transaction_node->getIds();

// You can do whatever you want with them, like display them, or delete them. 
// Let's delete them.
foreach($model_names_and_ids as $model_name => $ids){
    $model = EE_Registry::instance()->load_model($model_name); 
    $model->delete_permanently(
        [
            [
                $model->primary_key_name() => ['IN', $ids]
            ]
        ],
        false // Don't block if there are dependent model objects. They're all on the chopping block!
    );
}
```

Also, `ModelObjNode`s are meant to be easily serializable, so the following code is fine:
```php
// Given a transaction model object...
$t = EEM_Transaction::instance()->get_one();

// Create a ModelObjNode around it.
$transaction_node = new ModelObjNode($t->ID(), $t->get_model());

// Then request it discover 10 of its dependent model objects. If we wanted to get all of them at once, we could pass INF constant.
$transaction_node->visit(10);

// Serialize the transaction node.
$t_serialized = serialize($transaction_node);

// Unserialize it.
$transaction_node_unserialized = unserialize($t_serialized);

// Keep using it to grab the next 10 rows (ie: 11-20).
// It will pick up where it left off exploring the tree
$transaction_node_unserialized->visit(10);
```

`ModelObjNode::visit()` identifies all the model object's dependent model objects.
`ModelObjNode::toArray()` returns an array representation of the tree of dependent model objects. This may be helpful in
visualizing the tree and in displaying it as a tree.
`ModelObjNode::getIds()` returns a 2D array, whose top-keys are the names of dependent model objects, and whose value is an array of their IDs.
Useful if you want to organize the tree by model type.

### A note about internal details of ModelObjNode::visit()
`ModelObjNode::visit()` internally does the following:

* Create a `RelationNode` for each of the model's `EE_Has_Many_Relation`s and the join models for `EE_HABTM_Relation`s
(eg on `EEM_Transaction`, it would make one for `Registration`, `Payment`, `Line_Item`, `Message`, `Extra_Meta`, etc)
* Call `visit()` on each of them, which
* Finds all of the model objects across that relation (eg when called on the `RelationNode` for `Registration`, 
it finds all the registrations related to the original transaction)
* For each of those related model objects, create a `ModelObjNode` and calls `visit()` on it (recurses)

So `RelationNode` is only expected to be used internally.

## NodeGroupDao

If there could be hundreds of dependent model objects, you'll probably need to call `ModelObjNode::visit()` multiple 
times across multiple HTTP requests. This requires saving state between requests.
The `ModelObjNode`s are designed to be quite small when serialized. 
`NodeGroupDao` helps with saving `ModelObjNode`s across multiple requests by saving state to the WordPress Options table.
It has methods for generating a unique code to be used in the option name, serializing a group of `ModelObjNode`s to the
database, fetching a group of serialized `ModelObjNode`s from the database, and deleting the group of nodes from the database.
E.g.,

```php 
$nodeGroupDao = LoaderFactory::getLoader()->getShared('\EventEspresso\core\services\orm\tree_traversal\NodeGroupDao');
$code = $nodeGroupDao->generateGroupCode();
$some_obj_to_traverse = [
    EEM_Event::instance()->get_one(),
    EEM_Venue::instance()->get_one()
];
// Store those ModelObjNodes to the DB.
$nodeGroupDao->persistModelObjNodesGroup($some_obj_to_traverse, $code);

```

Then, on a subsequent request, using the `$code` (which you can put in the session, querystring, etc) you can retrieve
those same `ModelObjNode`s and continue using them, like so:

```php
$nodeGroupDao = LoaderFactory::getLoader()->getShared('\EventEspresso\core\services\orm\tree_traversal\NodeGroupDao');
$some_obj_to_traverse = $nodeGroupDao->getModelObjNodesInGroup($code);

// And now you cn continue using the ModelObjNodes
foreach($some_obj_to_traverse as $model_obj_node){
    $model_obj_node->visit(100);
}
// And optionally store them again...
$nodeGroupDao->persistModelObjNodesGroup($some_obj_to_traverse, $code);
```

Or you could get the actual model object IDs later, and delete it.

```php
$nodeGroupDao = LoaderFactory::getLoader()->getShared('\EventEspresso\core\services\orm\tree_traversal\NodeGroupDao');
$models_and_ids = $nodeGroupDao->getModelsAndIdsFromGroup($code);

// Do whatever you want with those model objects, like deleting them.
foreach($models_and_ids as $model_name => $ids){
    $model = EE_Registry::instance()->load_model($model_name); 
    $model->delete_permanently(
        [
            [
                $model->primary_key_name() => ['IN', $ids]
            ]
        ],
        false // Don't block if there are dependent model objects. They're all on the chopping block!
    );
}

// And remove the option (which can be several MBs if it contains thousands of model objects.)
$nodeGroupDao->deleteModelObjNodesInGroup($code);
```


