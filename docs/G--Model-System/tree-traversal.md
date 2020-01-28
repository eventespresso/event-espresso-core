# Model Object Tree Traversal
Event Espresso model objects (representing database rows) can depend on other model objects through their foreign keys.
Those model objects can in turn depend on others. This can make a fairly wide tree of dependencies. This articles documents
some classes that help traversing that tree, whose first application is performing "cascading deletions" (instead of just
deleting a single model object, also recursively delete all its dependent model objects.)

First off, discovering all the model objects that depend on a particular model object can take quite a few database queries,
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
* Finds all the model related model objects across that relation (eg when called on the `RelationNode` for `Registration`, 
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
