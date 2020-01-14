export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

/** Avatars are profile images for users. WordPress by default uses the Gravatar service to host and fetch avatars from. */
export type Avatar = {
	__typename?: 'Avatar';
	/**
	 * URL for the default image or a default type. Accepts &#039;404&#039; (return a
	 * 404 instead of a default image), &#039;retro&#039; (8bit),
	 * &#039;monsterid&#039; (monster), &#039;wavatar&#039; (cartoon face),
	 * &#039;indenticon&#039; (the &#039;quilt&#039;), &#039;mystery&#039;,
	 * &#039;mm&#039;, or &#039;mysteryman&#039; (The Oyster Man), &#039;blank&#039;
	 * (transparent GIF), or &#039;gravatar_default&#039; (the Gravatar logo).
	 */
	default?: Maybe<Scalars['String']>;
	/** HTML attributes to insert in the IMG element. Is not sanitized. */
	extraAttr?: Maybe<Scalars['String']>;
	/** Whether to always show the default image, never the Gravatar. */
	forceDefault?: Maybe<Scalars['Boolean']>;
	/** Whether the avatar was successfully found. */
	foundAvatar?: Maybe<Scalars['Boolean']>;
	/** Height of the avatar image. */
	height?: Maybe<Scalars['Int']>;
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/**
	 * What rating to display avatars up to. Accepts &#039;G&#039;, &#039;PG&#039;,
	 * &#039;R&#039;, &#039;X&#039;, and are judged in that order.
	 */
	rating?: Maybe<Scalars['String']>;
	/** Type of url scheme to use. Typically HTTP vs. HTTPS. */
	scheme?: Maybe<Scalars['String']>;
	/** The size of the avatar in pixels. A value of 96 will match a 96px x 96px gravatar image. */
	size?: Maybe<Scalars['Int']>;
	/** URL for the gravatar image source. */
	url?: Maybe<Scalars['String']>;
	/** Width of the avatar image. */
	width?: Maybe<Scalars['Int']>;
};

/**
 * What rating to display avatars up to. Accepts 'G', 'PG', 'R', 'X', and are
 * judged in that order. Default is the value of the 'avatar_rating' option
 */
export enum AvatarRatingEnum {
	G = 'G',
	Pg = 'PG',
	R = 'R',
	X = 'X',
}

/** The category type */
export type Category = Node & {
	__typename?: 'Category';
	/** The ancestors of the object */
	ancestors?: Maybe<Array<Maybe<Category>>>;
	/** The id field matches the WP_Post-&gt;ID field. */
	categoryId?: Maybe<Scalars['Int']>;
	/** Connection between the category type and the category type */
	children?: Maybe<CategoryToCategoryConnection>;
	/** The number of objects connected to the object */
	count?: Maybe<Scalars['Int']>;
	/** The description of the object */
	description?: Maybe<Scalars['String']>;
	/** The globally unique identifier for the category term object. */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** The link to the term */
	link?: Maybe<Scalars['String']>;
	/** The human friendly name of the object. */
	name?: Maybe<Scalars['String']>;
	/** The parent object */
	parent?: Maybe<Category>;
	/** Connection between the category type and the category type */
	posts?: Maybe<CategoryToPostConnection>;
	/** An alphanumeric identifier for the object unique to its type. */
	slug?: Maybe<Scalars['String']>;
	/** The name of the taxonomy this term belongs to */
	taxonomy?: Maybe<Taxonomy>;
	/** The ID of the term group that this term object belongs to */
	termGroupId?: Maybe<Scalars['Int']>;
	/** The taxonomy ID that the object is associated with */
	termTaxonomyId?: Maybe<Scalars['Int']>;
};

/** The category type */
export type CategoryChildrenArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<CategoryToCategoryConnectionWhereArgs>;
};

/** The category type */
export type CategoryPostsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<CategoryToPostConnectionWhereArgs>;
};

/** Connection between the category type and the category type */
export type CategoryToCategoryConnection = {
	__typename?: 'CategoryToCategoryConnection';
	/** Edges for the CategoryToCategoryConnection connection */
	edges?: Maybe<Array<Maybe<CategoryToCategoryConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Category>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	taxonomyInfo?: Maybe<Taxonomy>;
};

/** An edge in a connection */
export type CategoryToCategoryConnectionEdge = {
	__typename?: 'CategoryToCategoryConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Category>;
};

/** Arguments for filtering the CategoryToCategoryConnection connection */
export type CategoryToCategoryConnectionWhereArgs = {
	/** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
	cacheDomain?: Maybe<Scalars['String']>;
	/** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
	childOf?: Maybe<Scalars['Int']>;
	/**
	 * True to limit results to terms that have no children. This parameter has no
	 * effect on non-hierarchical taxonomies. Default false.
	 */
	childless?: Maybe<Scalars['Boolean']>;
	/** Retrieve terms where the description is LIKE the input value. Default empty. */
	descriptionLike?: Maybe<Scalars['String']>;
	/** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
	exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of term ids to exclude along with all of their descendant terms. If
	 * $include is non-empty, $exclude_tree is ignored. Default empty array.
	 */
	excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
	hideEmpty?: Maybe<Scalars['Boolean']>;
	/** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
	hierarchical?: Maybe<Scalars['Boolean']>;
	/** Array of term ids to include. Default empty array. */
	include?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of names to return term(s) for. Default empty. */
	name?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Retrieve terms where the name is LIKE the input value. Default empty. */
	nameLike?: Maybe<Scalars['String']>;
	/** Array of object IDs. Results will be limited to terms associated with these objects. */
	objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Field(s) to order terms by. Defaults to 'name'. */
	orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
	/** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
	padCounts?: Maybe<Scalars['Boolean']>;
	/** Parent term ID to retrieve direct-child terms of. Default empty. */
	parent?: Maybe<Scalars['Int']>;
	/** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
	search?: Maybe<Scalars['String']>;
	/**
	 * Default false. If true, only the items connected to the source item will be
	 * returned. If false, all items will be returned regardless of connection to the source
	 */
	shouldOnlyIncludeConnectedItems?: Maybe<Scalars['Boolean']>;
	/**
	 * Default false. If true, the connection will be output in a flat list instead
	 * of the hierarchical list. So child terms will be output in the same level as
	 * the parent terms
	 */
	shouldOutputInFlatList?: Maybe<Scalars['Boolean']>;
	/** Array of slugs to return term(s) for. Default empty. */
	slug?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Array of term taxonomy IDs, to match when querying terms. */
	termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to prime meta caches for matched terms. Default true. */
	updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the category type and the category type */
export type CategoryToPostConnection = {
	__typename?: 'CategoryToPostConnection';
	/** Edges for the CategoryToPostConnection connection */
	edges?: Maybe<Array<Maybe<CategoryToPostConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Post>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type CategoryToPostConnectionEdge = {
	__typename?: 'CategoryToPostConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Post>;
};

/** Arguments for filtering the CategoryToPostConnection connection */
export type CategoryToPostConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** A Comment object */
export type Comment = Node & {
	__typename?: 'Comment';
	/**
	 * User agent used to post the comment. This field is equivalent to
	 * WP_Comment-&gt;comment_agent and the value matching the
	 * &quot;comment_agent&quot; column in SQL.
	 */
	agent?: Maybe<Scalars['String']>;
	/**
	 * The approval status of the comment. This field is equivalent to
	 * WP_Comment-&gt;comment_approved and the value matching the
	 * &quot;comment_approved&quot; column in SQL.
	 */
	approved?: Maybe<Scalars['Boolean']>;
	/** The author of the comment */
	author?: Maybe<CommentAuthorUnion>;
	/**
	 * IP address for the author. This field is equivalent to
	 * WP_Comment-&gt;comment_author_IP and the value matching the
	 * &quot;comment_author_IP&quot; column in SQL.
	 */
	authorIp?: Maybe<Scalars['String']>;
	/** Connection between the Comment type and the Comment type */
	children?: Maybe<CommentToCommentConnection>;
	/** ID for the comment, unique among comments. */
	commentId?: Maybe<Scalars['Int']>;
	/** The object the comment was added to */
	commentedOn?: Maybe<PostObjectUnion>;
	/**
	 * Content of the comment. This field is equivalent to
	 * WP_Comment-&gt;comment_content and the value matching the
	 * &quot;comment_content&quot; column in SQL.
	 */
	content?: Maybe<Scalars['String']>;
	/**
	 * Date the comment was posted in local time. This field is equivalent to
	 * WP_Comment-&gt;date and the value matching the &quot;date&quot; column in SQL.
	 */
	date?: Maybe<Scalars['String']>;
	/**
	 * Date the comment was posted in GMT. This field is equivalent to
	 * WP_Comment-&gt;date_gmt and the value matching the &quot;date_gmt&quot; column in SQL.
	 */
	dateGmt?: Maybe<Scalars['String']>;
	/** The globally unique identifier for the comment object */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/**
	 * Karma value for the comment. This field is equivalent to
	 * WP_Comment-&gt;comment_karma and the value matching the
	 * &quot;comment_karma&quot; column in SQL.
	 */
	karma?: Maybe<Scalars['Int']>;
	/**
	 * Parent comment of current comment. This field is equivalent to the WP_Comment
	 * instance matching the WP_Comment-&gt;comment_parent ID.
	 */
	parent?: Maybe<Comment>;
	/**
	 * Type of comment. This field is equivalent to WP_Comment-&gt;comment_type and
	 * the value matching the &quot;comment_type&quot; column in SQL.
	 */
	type?: Maybe<Scalars['String']>;
};

/** A Comment object */
export type CommentChildrenArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<CommentToCommentConnectionWhereArgs>;
};

/** A Comment object */
export type CommentContentArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** A Comment Author object */
export type CommentAuthor = Node & {
	__typename?: 'CommentAuthor';
	/** The email for the comment author */
	email?: Maybe<Scalars['String']>;
	/** The globally unique identifier for the comment author object */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** The name for the comment author. */
	name?: Maybe<Scalars['String']>;
	/** The url the comment author. */
	url?: Maybe<Scalars['String']>;
};

export type CommentAuthorUnion = User | CommentAuthor;

/** Options for ordering the connection */
export enum CommentsConnectionOrderbyEnum {
	CommentAgent = 'COMMENT_AGENT',
	CommentApproved = 'COMMENT_APPROVED',
	CommentAuthor = 'COMMENT_AUTHOR',
	CommentAuthorEmail = 'COMMENT_AUTHOR_EMAIL',
	CommentAuthorIp = 'COMMENT_AUTHOR_IP',
	CommentAuthorUrl = 'COMMENT_AUTHOR_URL',
	CommentContent = 'COMMENT_CONTENT',
	CommentDate = 'COMMENT_DATE',
	CommentDateGmt = 'COMMENT_DATE_GMT',
	CommentId = 'COMMENT_ID',
	CommentIn = 'COMMENT_IN',
	CommentKarma = 'COMMENT_KARMA',
	CommentParent = 'COMMENT_PARENT',
	CommentPostId = 'COMMENT_POST_ID',
	CommentType = 'COMMENT_TYPE',
	UserId = 'USER_ID',
}

/** Connection between the Comment type and the Comment type */
export type CommentToCommentConnection = {
	__typename?: 'CommentToCommentConnection';
	/** Edges for the CommentToCommentConnection connection */
	edges?: Maybe<Array<Maybe<CommentToCommentConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Comment>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type CommentToCommentConnectionEdge = {
	__typename?: 'CommentToCommentConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Comment>;
};

/** Arguments for filtering the CommentToCommentConnection connection */
export type CommentToCommentConnectionWhereArgs = {
	/** Comment author email address. */
	authorEmail?: Maybe<Scalars['String']>;
	/** Array of author IDs to include comments for. */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to exclude comments for. */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Comment author URL. */
	authorUrl?: Maybe<Scalars['String']>;
	/** Array of comment IDs to include. */
	commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of IDs of users whose unapproved comments will be returned by the
	 * 							query regardless of status.
	 */
	commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Include comments of a given type. */
	commentType?: Maybe<Scalars['String']>;
	/** Include comments from a given array of comment types. */
	commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Exclude comments from a given array of comment types. */
	commentTypeNotIn?: Maybe<Scalars['String']>;
	/** Content object author ID to limit results by. */
	contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to retrieve comments for. */
	contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs *not* to retrieve comments for. */
	contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Limit results to those affiliated with a given content object
	 * 							ID.
	 */
	contentId?: Maybe<Scalars['ID']>;
	/**
	 * Array of content object IDs to include affiliated comments
	 * 							for.
	 */
	contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of content object IDs to exclude affiliated comments
	 * 							for.
	 */
	contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Content object name to retrieve affiliated comments for. */
	contentName?: Maybe<Scalars['String']>;
	/** Content Object parent ID to retrieve affiliated comments for. */
	contentParent?: Maybe<Scalars['Int']>;
	/**
	 * Array of content object statuses to retrieve affiliated comments for.
	 * 							Pass 'any' to match any value.
	 */
	contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
	/** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
	contentType?: Maybe<Array<Maybe<PostTypeEnum>>>;
	/**
	 * Array of IDs or email addresses of users whose unapproved comments will be
	 * returned by the query regardless of $status. Default empty
	 */
	includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Karma score to retrieve matching comments for. */
	karma?: Maybe<Scalars['Int']>;
	/** The cardinality of the order of the connection */
	order?: Maybe<OrderEnum>;
	/** Field to order the comments by. */
	orderby?: Maybe<CommentsConnectionOrderbyEnum>;
	/** Parent ID of comment to retrieve children of. */
	parent?: Maybe<Scalars['Int']>;
	/** Array of parent IDs of comments to retrieve children for. */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of parent IDs of comments *not* to retrieve children
	 * 							for.
	 */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Search term(s) to retrieve matching comments for. */
	search?: Maybe<Scalars['String']>;
	/** Comment status to limit results by. */
	status?: Maybe<Scalars['String']>;
	/** Include comments for a specific user ID. */
	userId?: Maybe<Scalars['ID']>;
};

export type ContentRevisionUnion = Post | Page;

/** Input for the createCategory mutation */
export type CreateCategoryInput = {
	/** The slug that the category will be an alias of */
	aliasOf?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/** The description of the category object */
	description?: Maybe<Scalars['String']>;
	/** The name of the category object to mutate */
	name: Scalars['String'];
	/** The ID of the category that should be set as the parent */
	parentId?: Maybe<Scalars['ID']>;
	/**
	 * If this argument exists then the slug will be checked to see if it is not an
	 * existing valid term. If that check succeeds (it is not a valid term), then it
	 * is added and the term id is given. If it fails, then a check is made to
	 * whether the taxonomy is hierarchical and the parent argument is not empty. If
	 * the second check succeeds, the term will be inserted and the term id will be
	 * given. If the slug argument is empty, then it will be calculated from the term name.
	 */
	slug?: Maybe<Scalars['String']>;
};

/** The payload for the createCategory mutation */
export type CreateCategoryPayload = {
	__typename?: 'CreateCategoryPayload';
	/** The created category */
	category?: Maybe<Category>;
	clientMutationId: Scalars['String'];
};

/** Input for the createComment mutation */
export type CreateCommentInput = {
	/** User agent used to post the comment. */
	agent?: Maybe<Scalars['String']>;
	/** The approval status of the comment. */
	approved?: Maybe<Scalars['String']>;
	/** The name of the comment's author. */
	author?: Maybe<Scalars['String']>;
	/** The email of the comment's author. */
	authorEmail?: Maybe<Scalars['String']>;
	/** IP address for the comment's author. */
	authorIp?: Maybe<Scalars['String']>;
	/** The url of the comment's author. */
	authorUrl?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/** The ID of the post object the comment belongs to. */
	commentOn?: Maybe<Scalars['Int']>;
	/** Content of the comment. */
	content?: Maybe<Scalars['String']>;
	/**
	 * The date of the object. Preferable to enter as year/month/day ( e.g.
	 * 01/31/2017 ) as it will rearrange date as fit if it is not specified.
	 * Incomplete dates may have unintended results for example, "2017" as the input
	 * will use current date with timestamp 20:17
	 */
	date?: Maybe<Scalars['String']>;
	/** Parent comment of current comment. */
	parent?: Maybe<Scalars['ID']>;
	/** Type of comment. */
	type?: Maybe<Scalars['String']>;
	/** The userID of the comment's author. */
	userId?: Maybe<Scalars['Int']>;
};

/** The payload for the createComment mutation */
export type CreateCommentPayload = {
	__typename?: 'CreateCommentPayload';
	clientMutationId: Scalars['String'];
	/** The comment that was created */
	comment?: Maybe<Comment>;
	/**
	 * Whether the mutation succeeded. If the comment is not approved, the server
	 * will not return the comment to a non authenticated user, but a success message
	 * can be returned if the create succeeded, and the client can optimistically add
	 * the comment to the client cache
	 */
	success?: Maybe<Scalars['Boolean']>;
};

/** Input for the createEspressoDatetime mutation */
export type CreateEspressoDatetimeInput = {
	/** Registration Limit for this time */
	capacity?: Maybe<Scalars['Int']>;
	clientMutationId: Scalars['String'];
	/** Description for Datetime */
	description?: Maybe<Scalars['String']>;
	/** End date and time of the Event */
	endDate?: Maybe<Scalars['String']>;
	/** Globally unique event ID of the datetime. */
	event?: Maybe<Scalars['ID']>;
	/** Event ID of the datetime. */
	eventId?: Maybe<Scalars['Int']>;
	/** Flag indicating datetime is active */
	isActive?: Maybe<Scalars['Boolean']>;
	/** Flag indicating datetime is expired or not */
	isExpired?: Maybe<Scalars['Boolean']>;
	/** Flag indicating datetime is primary one for event */
	isPrimary?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the tickets sold for this datetime, met or exceed the registration limit */
	isSoldOut?: Maybe<Scalars['Boolean']>;
	/** Whether the date is upcoming */
	isUpcoming?: Maybe<Scalars['Boolean']>;
	/** The length of the event (start to end time) in seconds */
	length?: Maybe<Scalars['Int']>;
	/** Datetime Name */
	name?: Maybe<Scalars['String']>;
	/** The order in which the Datetime is displayed */
	order?: Maybe<Scalars['Int']>;
	/** The parent datetime ID */
	parent?: Maybe<Scalars['ID']>;
	/** Quantity of tickets reserved, but not yet fully purchased */
	reserved?: Maybe<Scalars['Int']>;
	/** How many sales for this Datetime that have occurred */
	sold?: Maybe<Scalars['Int']>;
	/** Start date and time of the Event */
	startDate?: Maybe<Scalars['String']>;
	/** Globally unique IDs of the tickets related to the datetime. Ignored if empty. */
	tickets?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** The payload for the createEspressoDatetime mutation */
export type CreateEspressoDatetimePayload = {
	__typename?: 'CreateEspressoDatetimePayload';
	clientMutationId: Scalars['String'];
	espressoDatetime?: Maybe<EspressoDatetime>;
};

/** Input for the createEspressoEvent mutation */
export type CreateEspressoEventInput = {
	/** Limit of Additional Registrations on Same Transaction */
	additionalLimit?: Maybe<Scalars['String']>;
	/** Allow Overflow on Event */
	allowOverflow?: Maybe<Scalars['Boolean']>;
	/** The userId to assign as the author of the post */
	authorId?: Maybe<Scalars['ID']>;
	clientMutationId: Scalars['String'];
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** The comment status for the object */
	commentStatus?: Maybe<Scalars['String']>;
	/** The content of the object */
	content?: Maybe<Scalars['String']>;
	/** Date/Time Event Created */
	created?: Maybe<Scalars['String']>;
	/**
	 * The date of the object. Preferable to enter as year/month/day (e.g.
	 * 01/31/2017) as it will rearrange date as fit if it is not specified.
	 * Incomplete dates may have unintended results for example, "2017" as the input
	 * will use current date with timestamp 20:17
	 */
	date?: Maybe<Scalars['String']>;
	/** Event Description */
	desc?: Maybe<Scalars['String']>;
	/** Display Description Flag */
	displayDesc?: Maybe<Scalars['Boolean']>;
	/** Display Ticket Selector Flag */
	displayTicketSelector?: Maybe<Scalars['Boolean']>;
	/** Accept Donations? */
	donations?: Maybe<Scalars['Boolean']>;
	/** The excerpt of the object */
	excerpt?: Maybe<Scalars['String']>;
	/** URL of Event Page if hosted elsewhere */
	externalUrl?: Maybe<Scalars['String']>;
	/** Flag indicating event is active */
	isActive?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the event is marked as cancelled */
	isCancelled?: Maybe<Scalars['Boolean']>;
	/** Flag indicating event is expired or not */
	isExpired?: Maybe<Scalars['Boolean']>;
	/** Flag indicating event is inactive */
	isInactive?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the event is marked as postponed */
	isPostponed?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the tickets sold for the event, met or exceed the registration limit */
	isSoldOut?: Maybe<Scalars['Boolean']>;
	/** Whether the event is upcoming */
	isUpcoming?: Maybe<Scalars['Boolean']>;
	/** Member-Only Event Flag */
	memberOnly?: Maybe<Scalars['Boolean']>;
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/**
	 * If the post is an attachment or a media file, this field will carry the
	 * corresponding MIME type. This field is equivalent to the value of
	 * WP_Post->post_mime_type and the post_mime_type column in the "post_objects"
	 * database table.
	 */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Event Name */
	name?: Maybe<Scalars['String']>;
	/** Event Menu Order */
	order?: Maybe<Scalars['Int']>;
	/** The ID of the parent object */
	parentId?: Maybe<Scalars['ID']>;
	/** The password used to protect the content of the object */
	password?: Maybe<Scalars['String']>;
	/** Event Phone Number */
	phone?: Maybe<Scalars['String']>;
	/** The ping status for the object */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Event Short Description */
	shortDesc?: Maybe<Scalars['String']>;
	/** The slug of the object */
	slug?: Maybe<Scalars['String']>;
	/** The status of the object */
	status?: Maybe<PostStatusEnum>;
	/** Set connections between the EspressoEvent and tags */
	tags?: Maybe<EspressoEventTagsInput>;
	/** Timezone (name) for Event times */
	timezoneString?: Maybe<Scalars['String']>;
	/** The title of the post */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Event Visible Date */
	visibleOn?: Maybe<Scalars['String']>;
	/** Event Creator ID */
	wpUser?: Maybe<Scalars['Int']>;
};

/** The payload for the createEspressoEvent mutation */
export type CreateEspressoEventPayload = {
	__typename?: 'CreateEspressoEventPayload';
	espressoEvent?: Maybe<EspressoEvent>;
	clientMutationId: Scalars['String'];
};

/** Input for the createEspressoPrice mutation */
export type CreateEspressoPriceInput = {
	/** Price Amount */
	amount?: Maybe<Scalars['Float']>;
	clientMutationId: Scalars['String'];
	/** Price description */
	desc?: Maybe<Scalars['String']>;
	/** Flag indicating price is the default one. */
	isDefault?: Maybe<Scalars['Boolean']>;
	/** Price Name */
	name?: Maybe<Scalars['String']>;
	/** Order of Application of Price. */
	order?: Maybe<Scalars['Int']>;
	/** Price ID for a global Price that will be overridden by this Price. */
	overrides?: Maybe<Scalars['Int']>;
	/** The parent price ID */
	parent?: Maybe<Scalars['ID']>;
	/** The price type ID */
	priceType?: Maybe<Scalars['ID']>;
	/** Price Creator ID */
	wpUser?: Maybe<Scalars['Int']>;
};

/** The payload for the createEspressoPrice mutation */
export type CreateEspressoPricePayload = {
	__typename?: 'CreateEspressoPricePayload';
	clientMutationId: Scalars['String'];
	espressoPrice?: Maybe<EspressoPrice>;
};

/** Input for the createEspressoTicket mutation */
export type CreateEspressoTicketInput = {
	clientMutationId: Scalars['String'];
	/** Globally unique IDs of the datetimes related to the ticket. Ignored if empty. */
	datetimes?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Description of Ticket */
	description?: Maybe<Scalars['String']>;
	/** End date and time of the Ticket */
	endDate?: Maybe<Scalars['String']>;
	/** Flag indicating that this ticket is a default ticket */
	isDefault?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the ticket is free. */
	isFree?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether this ticket must be purchased with a transaction */
	isRequired?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether there is tax applied on this ticket */
	isTaxable?: Maybe<Scalars['Boolean']>;
	/** Maximum quantity of this ticket that can be purchased in one transaction */
	max?: Maybe<Scalars['Int']>;
	/** Minimum quantity of this ticket that must be purchased */
	min?: Maybe<Scalars['Int']>;
	/** Ticket Name */
	name?: Maybe<Scalars['String']>;
	/** The order in which the Datetime is displayed */
	order?: Maybe<Scalars['Int']>;
	/** The parent ticket ID */
	parent?: Maybe<Scalars['ID']>;
	/** Final calculated price for ticket */
	price?: Maybe<Scalars['Float']>;
	/** Globally unique IDs of the prices related to the ticket. Ignored if empty. */
	prices?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Quantity of this ticket that is available */
	quantity?: Maybe<Scalars['Int']>;
	/** Quantity of this ticket that is reserved, but not yet fully purchased */
	reserved?: Maybe<Scalars['Int']>;
	/**
	 * Flag indicating whether ticket calculations should run in reverse and
	 * calculate the base ticket price from the provided ticket total.
	 */
	reverseCalculate?: Maybe<Scalars['Boolean']>;
	/** How tickets are displayed in the ui */
	row?: Maybe<Scalars['Int']>;
	/** Number of this ticket sold */
	sold?: Maybe<Scalars['Int']>;
	/** Start date and time of the Ticket */
	startDate?: Maybe<Scalars['String']>;
	/** Number of datetimes this ticket can be used at */
	uses?: Maybe<Scalars['Int']>;
	/** Ticket Creator ID */
	wpUser?: Maybe<Scalars['Int']>;
};

/** The payload for the createEspressoTicket mutation */
export type CreateEspressoTicketPayload = {
	__typename?: 'CreateEspressoTicketPayload';
	clientMutationId: Scalars['String'];
	espressoTicket?: Maybe<EspressoTicket>;
};

/** Input for the createEspressoVenue mutation */
export type CreateEspressoVenueInput = {
	/** Venue Address line 1 */
	address?: Maybe<Scalars['String']>;
	/** Venue Address line 2 */
	address2?: Maybe<Scalars['String']>;
	/** The userId to assign as the author of the post */
	authorId?: Maybe<Scalars['ID']>;
	/** Venue Capacity */
	capacity?: Maybe<Scalars['Int']>;
	/** Venue City */
	city?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** The comment status for the object */
	commentStatus?: Maybe<Scalars['String']>;
	/** The content of the object */
	content?: Maybe<Scalars['String']>;
	/** Country ISO Code */
	country?: Maybe<Scalars['String']>;
	/** Date Venue Created */
	created?: Maybe<Scalars['String']>;
	/**
	 * The date of the object. Preferable to enter as year/month/day (e.g.
	 * 01/31/2017) as it will rearrange date as fit if it is not specified.
	 * Incomplete dates may have unintended results for example, "2017" as the input
	 * will use current date with timestamp 20:17
	 */
	date?: Maybe<Scalars['String']>;
	/** Venue Description */
	desc?: Maybe<Scalars['String']>;
	/** Show Google Map? */
	enableForGmap?: Maybe<Scalars['String']>;
	/** The excerpt of the object */
	excerpt?: Maybe<Scalars['String']>;
	/** Google Map Link */
	googleMapLink?: Maybe<Scalars['String']>;
	/** Venue Identifier */
	identifier?: Maybe<Scalars['String']>;
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/**
	 * If the post is an attachment or a media file, this field will carry the
	 * corresponding MIME type. This field is equivalent to the value of
	 * WP_Post->post_mime_type and the post_mime_type column in the "post_objects"
	 * database table.
	 */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Venue Name */
	name?: Maybe<Scalars['String']>;
	/** Venue order */
	order?: Maybe<Scalars['Int']>;
	/** The ID of the parent object */
	parentId?: Maybe<Scalars['ID']>;
	/** The password used to protect the content of the object */
	password?: Maybe<Scalars['String']>;
	/** Venue Phone */
	phone?: Maybe<Scalars['String']>;
	/** The ping status for the object */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Short Description of Venue */
	shortDesc?: Maybe<Scalars['String']>;
	/** The slug of the object */
	slug?: Maybe<Scalars['String']>;
	/** State ID */
	state?: Maybe<Scalars['Int']>;
	/** The status of the object */
	status?: Maybe<PostStatusEnum>;
	/** Set connections between the EspressoVenue and tags */
	tags?: Maybe<EspressoVenueTagsInput>;
	/** The title of the post */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Venue Website */
	url?: Maybe<Scalars['String']>;
	/** Call in Number */
	virtualPhone?: Maybe<Scalars['String']>;
	/** Virtual URL */
	virtualUrl?: Maybe<Scalars['String']>;
	/** Venue Creator ID */
	wpUser?: Maybe<Scalars['Int']>;
	/** Venue Zip/Postal Code */
	zip?: Maybe<Scalars['String']>;
};

/** The payload for the createEspressoVenue mutation */
export type CreateEspressoVenuePayload = {
	__typename?: 'CreateEspressoVenuePayload';
	espressoVenue?: Maybe<EspressoVenue>;
	clientMutationId: Scalars['String'];
};

/** Input for the createMediaItem mutation */
export type CreateMediaItemInput = {
	/** Alternative text to display when mediaItem is not displayed */
	altText?: Maybe<Scalars['String']>;
	/** The userId to assign as the author of the mediaItem */
	authorId?: Maybe<Scalars['ID']>;
	/** The caption for the mediaItem */
	caption?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/** The comment status for the mediaItem */
	commentStatus?: Maybe<Scalars['String']>;
	/** The date of the mediaItem */
	date?: Maybe<Scalars['String']>;
	/** The date (in GMT zone) of the mediaItem */
	dateGmt?: Maybe<Scalars['String']>;
	/** Description of the mediaItem */
	description?: Maybe<Scalars['String']>;
	/** The file name of the mediaItem */
	filePath?: Maybe<Scalars['String']>;
	/** The file type of the mediaItem */
	fileType?: Maybe<MimeTypeEnum>;
	/** The WordPress post ID or the graphQL postId of the parent object */
	parentId?: Maybe<Scalars['ID']>;
	/** The ping status for the mediaItem */
	pingStatus?: Maybe<Scalars['String']>;
	/** The slug of the mediaItem */
	slug?: Maybe<Scalars['String']>;
	/** The status of the mediaItem */
	status?: Maybe<MediaItemStatusEnum>;
	/** The title of the mediaItem */
	title?: Maybe<Scalars['String']>;
};

/** The payload for the createMediaItem mutation */
export type CreateMediaItemPayload = {
	__typename?: 'CreateMediaItemPayload';
	clientMutationId: Scalars['String'];
	mediaItem?: Maybe<MediaItem>;
};

/** Input for the createPage mutation */
export type CreatePageInput = {
	/** The userId to assign as the author of the post */
	authorId?: Maybe<Scalars['ID']>;
	clientMutationId: Scalars['String'];
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** The comment status for the object */
	commentStatus?: Maybe<Scalars['String']>;
	/** The content of the object */
	content?: Maybe<Scalars['String']>;
	/**
	 * The date of the object. Preferable to enter as year/month/day (e.g.
	 * 01/31/2017) as it will rearrange date as fit if it is not specified.
	 * Incomplete dates may have unintended results for example, "2017" as the input
	 * will use current date with timestamp 20:17
	 */
	date?: Maybe<Scalars['String']>;
	/** The excerpt of the object */
	excerpt?: Maybe<Scalars['String']>;
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/**
	 * If the post is an attachment or a media file, this field will carry the
	 * corresponding MIME type. This field is equivalent to the value of
	 * WP_Post->post_mime_type and the post_mime_type column in the "post_objects"
	 * database table.
	 */
	mimeType?: Maybe<MimeTypeEnum>;
	/** The ID of the parent object */
	parentId?: Maybe<Scalars['ID']>;
	/** The password used to protect the content of the object */
	password?: Maybe<Scalars['String']>;
	/** The ping status for the object */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** The slug of the object */
	slug?: Maybe<Scalars['String']>;
	/** The status of the object */
	status?: Maybe<PostStatusEnum>;
	/** The title of the post */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The payload for the createPage mutation */
export type CreatePagePayload = {
	__typename?: 'CreatePagePayload';
	clientMutationId: Scalars['String'];
	page?: Maybe<Page>;
};

/** Input for the createPost mutation */
export type CreatePostInput = {
	/** The userId to assign as the author of the post */
	authorId?: Maybe<Scalars['ID']>;
	/** Set connections between the post and categories */
	categories?: Maybe<PostCategoriesInput>;
	clientMutationId: Scalars['String'];
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** The comment status for the object */
	commentStatus?: Maybe<Scalars['String']>;
	/** The content of the object */
	content?: Maybe<Scalars['String']>;
	/**
	 * The date of the object. Preferable to enter as year/month/day (e.g.
	 * 01/31/2017) as it will rearrange date as fit if it is not specified.
	 * Incomplete dates may have unintended results for example, "2017" as the input
	 * will use current date with timestamp 20:17
	 */
	date?: Maybe<Scalars['String']>;
	/** The excerpt of the object */
	excerpt?: Maybe<Scalars['String']>;
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/**
	 * If the post is an attachment or a media file, this field will carry the
	 * corresponding MIME type. This field is equivalent to the value of
	 * WP_Post->post_mime_type and the post_mime_type column in the "post_objects"
	 * database table.
	 */
	mimeType?: Maybe<MimeTypeEnum>;
	/** The ID of the parent object */
	parentId?: Maybe<Scalars['ID']>;
	/** The password used to protect the content of the object */
	password?: Maybe<Scalars['String']>;
	/** The ping status for the object */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** The slug of the object */
	slug?: Maybe<Scalars['String']>;
	/** The status of the object */
	status?: Maybe<PostStatusEnum>;
	/** Set connections between the post and tags */
	tags?: Maybe<PostTagsInput>;
	/** The title of the post */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The payload for the createPost mutation */
export type CreatePostPayload = {
	__typename?: 'CreatePostPayload';
	clientMutationId: Scalars['String'];
	post?: Maybe<Post>;
};

/** Input for the createTag mutation */
export type CreateTagInput = {
	/** The slug that the post_tag will be an alias of */
	aliasOf?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/** The description of the post_tag object */
	description?: Maybe<Scalars['String']>;
	/** The name of the post_tag object to mutate */
	name: Scalars['String'];
	/**
	 * If this argument exists then the slug will be checked to see if it is not an
	 * existing valid term. If that check succeeds (it is not a valid term), then it
	 * is added and the term id is given. If it fails, then a check is made to
	 * whether the taxonomy is hierarchical and the parent argument is not empty. If
	 * the second check succeeds, the term will be inserted and the term id will be
	 * given. If the slug argument is empty, then it will be calculated from the term name.
	 */
	slug?: Maybe<Scalars['String']>;
};

/** The payload for the createTag mutation */
export type CreateTagPayload = {
	__typename?: 'CreateTagPayload';
	clientMutationId: Scalars['String'];
	/** The created post_tag */
	tag?: Maybe<Tag>;
};

/** Input for the createUser mutation */
export type CreateUserInput = {
	/** User's AOL IM account. */
	aim?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/** A string containing content about the user. */
	description?: Maybe<Scalars['String']>;
	/**
	 * A string that will be shown on the site. Defaults to user's username. It is
	 * likely that you will want to change this, for both appearance and security
	 * through obscurity (that is if you dont use and delete the default admin user).
	 */
	displayName?: Maybe<Scalars['String']>;
	/** A string containing the user's email address. */
	email?: Maybe<Scalars['String']>;
	/** 	The user's first name. */
	firstName?: Maybe<Scalars['String']>;
	/** User's Jabber account. */
	jabber?: Maybe<Scalars['String']>;
	/** The user's last name. */
	lastName?: Maybe<Scalars['String']>;
	/** User's locale. */
	locale?: Maybe<Scalars['String']>;
	/** A string that contains a URL-friendly name for the user. The default is the user's username. */
	nicename?: Maybe<Scalars['String']>;
	/** The user's nickname, defaults to the user's username. */
	nickname?: Maybe<Scalars['String']>;
	/** A string that contains the plain text password for the user. */
	password?: Maybe<Scalars['String']>;
	/** The date the user registered. Format is Y-m-d H:i:s. */
	registered?: Maybe<Scalars['String']>;
	/** A string for whether to enable the rich editor or not. False if not empty. */
	richEditing?: Maybe<Scalars['String']>;
	/** An array of roles to be assigned to the user. */
	roles?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** A string that contains the user's username for logging in. */
	username: Scalars['String'];
	/** A string containing the user's URL for the user's web site. */
	websiteUrl?: Maybe<Scalars['String']>;
	/** User's Yahoo IM account. */
	yim?: Maybe<Scalars['String']>;
};

/** The payload for the createUser mutation */
export type CreateUserPayload = {
	__typename?: 'CreateUserPayload';
	clientMutationId: Scalars['String'];
	user?: Maybe<User>;
};

/** Date values */
export type DateInput = {
	/** Day of the month (from 1 to 31) */
	day?: Maybe<Scalars['Int']>;
	/** Month number (from 1 to 12) */
	month?: Maybe<Scalars['Int']>;
	/** 4 digit year (e.g. 2017) */
	year?: Maybe<Scalars['Int']>;
};

/** Filter the connection based on input */
export type DateQueryInput = {
	after?: Maybe<DateInput>;
	before?: Maybe<DateInput>;
	/** Column to query against */
	column?: Maybe<PostObjectsConnectionDateColumnEnum>;
	/** For after/before, whether exact value should be matched or not */
	compare?: Maybe<Scalars['String']>;
	/** Day of the month (from 1 to 31) */
	day?: Maybe<Scalars['Int']>;
	/** Hour (from 0 to 23) */
	hour?: Maybe<Scalars['Int']>;
	/** For after/before, whether exact value should be matched or not */
	inclusive?: Maybe<Scalars['Boolean']>;
	/** Minute (from 0 to 59) */
	minute?: Maybe<Scalars['Int']>;
	/** Month number (from 1 to 12) */
	month?: Maybe<Scalars['Int']>;
	/** OR or AND, how the sub-arrays should be compared */
	relation?: Maybe<RelationEnum>;
	/** Second (0 to 59) */
	second?: Maybe<Scalars['Int']>;
	/** Week of the year (from 0 to 53) */
	week?: Maybe<Scalars['Int']>;
	/** 4 digit year (e.g. 2017) */
	year?: Maybe<Scalars['Int']>;
};

/** Input for the deleteCategory mutation */
export type DeleteCategoryInput = {
	clientMutationId: Scalars['String'];
	/** The ID of the category to delete */
	id: Scalars['ID'];
};

/** The payload for the deleteCategory mutation */
export type DeleteCategoryPayload = {
	__typename?: 'DeleteCategoryPayload';
	/** The deteted term object */
	category?: Maybe<Category>;
	clientMutationId: Scalars['String'];
	/** The ID of the deleted object */
	deletedId?: Maybe<Scalars['ID']>;
};

/** Input for the deleteComment mutation */
export type DeleteCommentInput = {
	clientMutationId: Scalars['String'];
	/** Whether the comment should be force deleted instead of being moved to the trash */
	forceDelete?: Maybe<Scalars['Boolean']>;
	/** The deleted comment ID */
	id: Scalars['ID'];
};

/** The payload for the deleteComment mutation */
export type DeleteCommentPayload = {
	__typename?: 'DeleteCommentPayload';
	clientMutationId: Scalars['String'];
	/** The deleted comment object */
	comment?: Maybe<Comment>;
	/** The deleted comment ID */
	deletedId?: Maybe<Scalars['ID']>;
};

/** Input for the deleteEspressoDatetime mutation */
export type DeleteEspressoDatetimeInput = {
	clientMutationId: Scalars['String'];
	/** Whether to delete the entity permanently. */
	deletePermanently?: Maybe<Scalars['Boolean']>;
	/** The globally unique ID for the object. */
	id: Scalars['ID'];
};

/** The payload for the deleteEspressoDatetime mutation */
export type DeleteEspressoDatetimePayload = {
	__typename?: 'DeleteEspressoDatetimePayload';
	clientMutationId: Scalars['String'];
	/** The object before it was deleted */
	espressoDatetime?: Maybe<EspressoDatetime>;
};

/** Input for the deleteEspressoEvent mutation */
export type DeleteEspressoEventInput = {
	clientMutationId: Scalars['String'];
	/** Whether the object should be force deleted instead of being moved to the trash */
	forceDelete?: Maybe<Scalars['Boolean']>;
	/** The ID of the EspressoEvent to delete */
	id: Scalars['ID'];
};

/** The payload for the deleteEspressoEvent mutation */
export type DeleteEspressoEventPayload = {
	__typename?: 'DeleteEspressoEventPayload';
	/** The object before it was deleted */
	espressoEvent?: Maybe<EspressoEvent>;
	clientMutationId: Scalars['String'];
	/** The ID of the deleted object */
	deletedId?: Maybe<Scalars['ID']>;
};

/** Input for the deleteEspressoPrice mutation */
export type DeleteEspressoPriceInput = {
	clientMutationId: Scalars['String'];
	/** Whether to delete the entity permanently. */
	deletePermanently?: Maybe<Scalars['Boolean']>;
	/** The globally unique ID for the object. */
	id: Scalars['ID'];
};

/** The payload for the deleteEspressoPrice mutation */
export type DeleteEspressoPricePayload = {
	__typename?: 'DeleteEspressoPricePayload';
	clientMutationId: Scalars['String'];
	/** The object before it was deleted */
	espressoPrice?: Maybe<EspressoPrice>;
};

/** Input for the deleteEspressoTicket mutation */
export type DeleteEspressoTicketInput = {
	clientMutationId: Scalars['String'];
	/** Whether to delete the entity permanently. */
	deletePermanently?: Maybe<Scalars['Boolean']>;
	/** The globally unique ID for the object. */
	id: Scalars['ID'];
};

/** The payload for the deleteEspressoTicket mutation */
export type DeleteEspressoTicketPayload = {
	__typename?: 'DeleteEspressoTicketPayload';
	clientMutationId: Scalars['String'];
	/** The object before it was deleted */
	espressoTicket?: Maybe<EspressoTicket>;
};

/** Input for the deleteEspressoVenue mutation */
export type DeleteEspressoVenueInput = {
	clientMutationId: Scalars['String'];
	/** Whether the object should be force deleted instead of being moved to the trash */
	forceDelete?: Maybe<Scalars['Boolean']>;
	/** The ID of the EspressoVenue to delete */
	id: Scalars['ID'];
};

/** The payload for the deleteEspressoVenue mutation */
export type DeleteEspressoVenuePayload = {
	__typename?: 'DeleteEspressoVenuePayload';
	/** The object before it was deleted */
	espressoVenue?: Maybe<EspressoVenue>;
	clientMutationId: Scalars['String'];
	/** The ID of the deleted object */
	deletedId?: Maybe<Scalars['ID']>;
};

/** Input for the deleteMediaItem mutation */
export type DeleteMediaItemInput = {
	clientMutationId: Scalars['String'];
	/** Whether the mediaItem should be force deleted instead of being moved to the trash */
	forceDelete?: Maybe<Scalars['Boolean']>;
	/** The ID of the mediaItem to delete */
	id: Scalars['ID'];
};

/** The payload for the deleteMediaItem mutation */
export type DeleteMediaItemPayload = {
	__typename?: 'DeleteMediaItemPayload';
	clientMutationId: Scalars['String'];
	/** The ID of the deleted mediaItem */
	deletedId?: Maybe<Scalars['ID']>;
	/** The mediaItem before it was deleted */
	mediaItem?: Maybe<MediaItem>;
};

/** Input for the deletePage mutation */
export type DeletePageInput = {
	clientMutationId: Scalars['String'];
	/** Whether the object should be force deleted instead of being moved to the trash */
	forceDelete?: Maybe<Scalars['Boolean']>;
	/** The ID of the page to delete */
	id: Scalars['ID'];
};

/** The payload for the deletePage mutation */
export type DeletePagePayload = {
	__typename?: 'DeletePagePayload';
	clientMutationId: Scalars['String'];
	/** The ID of the deleted object */
	deletedId?: Maybe<Scalars['ID']>;
	/** The object before it was deleted */
	page?: Maybe<Page>;
};

/** Input for the deletePost mutation */
export type DeletePostInput = {
	clientMutationId: Scalars['String'];
	/** Whether the object should be force deleted instead of being moved to the trash */
	forceDelete?: Maybe<Scalars['Boolean']>;
	/** The ID of the post to delete */
	id: Scalars['ID'];
};

/** The payload for the deletePost mutation */
export type DeletePostPayload = {
	__typename?: 'DeletePostPayload';
	clientMutationId: Scalars['String'];
	/** The ID of the deleted object */
	deletedId?: Maybe<Scalars['ID']>;
	/** The object before it was deleted */
	post?: Maybe<Post>;
};

/** Input for the deleteTag mutation */
export type DeleteTagInput = {
	clientMutationId: Scalars['String'];
	/** The ID of the tag to delete */
	id: Scalars['ID'];
};

/** The payload for the deleteTag mutation */
export type DeleteTagPayload = {
	__typename?: 'DeleteTagPayload';
	clientMutationId: Scalars['String'];
	/** The ID of the deleted object */
	deletedId?: Maybe<Scalars['ID']>;
	/** The deteted term object */
	tag?: Maybe<Tag>;
};

/** Input for the deleteUser mutation */
export type DeleteUserInput = {
	clientMutationId: Scalars['String'];
	/** The ID of the user you want to delete */
	id: Scalars['ID'];
	/** Reassign posts and links to new User ID. */
	reassignId?: Maybe<Scalars['ID']>;
};

/** The payload for the deleteUser mutation */
export type DeleteUserPayload = {
	__typename?: 'DeleteUserPayload';
	clientMutationId: Scalars['String'];
	/** The ID of the user that you just deleted */
	deletedId?: Maybe<Scalars['ID']>;
	/** The deleted user object */
	user?: Maybe<User>;
};

/** The discussion setting type */
export type DiscussionSettings = {
	__typename?: 'DiscussionSettings';
	/** Allow people to submit comments on new posts. */
	defaultCommentStatus?: Maybe<Scalars['String']>;
	/** Allow link notifications from other blogs (pingbacks and trackbacks) on new articles. */
	defaultPingStatus?: Maybe<Scalars['String']>;
};

/** Info on whether the object is locked by another user editing it */
export type EditLock = {
	__typename?: 'EditLock';
	/** The time when the object was last edited */
	editTime?: Maybe<Scalars['String']>;
	/** The user that most recently edited the object */
	user?: Maybe<User>;
};

/** A country */
export type EspressoCountry = {
	__typename?: 'EspressoCountry';
	/** Country ISO Code */
	ISO?: Maybe<Scalars['String']>;
	/** Country ISO3 Code */
	ISO3?: Maybe<Scalars['String']>;
	/** Country Currency Code */
	currencyCode?: Maybe<Scalars['String']>;
	/** Currency Decimal Mark */
	currencyDecimalMark?: Maybe<Scalars['String']>;
	/** Currency Decimal Places */
	currencyDecimalPlaces?: Maybe<Scalars['String']>;
	/** Currency Name Plural */
	currencyPlural?: Maybe<Scalars['String']>;
	/** Currency Sign */
	currencySign?: Maybe<Scalars['String']>;
	/** Currency Sign Before Number */
	currencySignBeforeNumber?: Maybe<Scalars['String']>;
	/** Currency Name Singular */
	currencySingular?: Maybe<Scalars['String']>;
	/** Currency Thousands Separator */
	currencyThousandsSeparator?: Maybe<Scalars['String']>;
	/** The globally unique ID for the object. */
	id: Scalars['ID'];
	/** Flag that indicates if the country should appear in dropdown select lists */
	isActive?: Maybe<Scalars['Boolean']>;
	/** Country Name */
	name?: Maybe<Scalars['String']>;
};

/** An event date */
export type EspressoDatetime = {
	__typename?: 'EspressoDatetime';
	/** Registration Limit for this time */
	capacity?: Maybe<Scalars['Int']>;
	/** The datetime ID. */
	dbId: Scalars['Int'];
	/** Description for Datetime */
	description?: Maybe<Scalars['String']>;
	/** End date and time of the Event */
	endDate?: Maybe<Scalars['String']>;
	/** Event of the datetime. */
	event?: Maybe<EspressoEvent>;
	/** The globally unique ID for the object. */
	id: Scalars['ID'];
	/** Flag indicating datetime is active */
	isActive?: Maybe<Scalars['Boolean']>;
	/** Flag indicating datetime is expired or not */
	isExpired?: Maybe<Scalars['Boolean']>;
	/** Flag indicating datetime is primary one for event */
	isPrimary?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the tickets sold for this datetime, met or exceed the registration limit */
	isSoldOut?: Maybe<Scalars['Boolean']>;
	/** Whether the date is upcoming */
	isUpcoming?: Maybe<Scalars['Boolean']>;
	/** The length of the event (start to end time) in seconds */
	length?: Maybe<Scalars['Int']>;
	/** Datetime Name */
	name?: Maybe<Scalars['String']>;
	/** The order in which the Datetime is displayed */
	order?: Maybe<Scalars['Int']>;
	/** The parent datetime of the current datetime */
	parent?: Maybe<EspressoDatetime>;
	/** Quantity of tickets reserved, but not yet fully purchased */
	reserved?: Maybe<Scalars['Int']>;
	/** How many sales for this Datetime that have occurred */
	sold?: Maybe<Scalars['Int']>;
	/** Start date and time of the Event */
	startDate?: Maybe<Scalars['String']>;
	/** Connection between the EspressoDatetime type and the EspressoDatetime type */
	tickets?: Maybe<EspressoDatetimeTicketsConnection>;
};

/** An event date */
export type EspressoDatetimeTicketsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<EspressoDatetimeTicketsConnectionWhereArgs>;
};

/** Connection between the EspressoDatetime type and the EspressoDatetime type */
export type EspressoDatetimeTicketsConnection = {
	__typename?: 'EspressoDatetimeTicketsConnection';
	/** Edges for the EspressoDatetimeTicketsConnection connection */
	edges?: Maybe<Array<Maybe<EspressoDatetimeTicketsConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoTicket>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type EspressoDatetimeTicketsConnectionEdge = {
	__typename?: 'EspressoDatetimeTicketsConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoTicket>;
};

/** Arguments for filtering the EspressoDatetimeTicketsConnection connection */
export type EspressoDatetimeTicketsConnectionWhereArgs = {
	/** Globally unique datetime ID to get the tickets for. */
	datetime?: Maybe<Scalars['ID']>;
	/** Datetime ID to get the tickets for. */
	datetimeId?: Maybe<Scalars['Int']>;
	/** Datetime IDs to get the tickets for. */
	datetimeIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Globally unique datetime IDs to get the tickets for. */
	datetimeIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What parameter to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The EspressoEvent type */
export type EspressoEvent = Node & {
	__typename?: 'EspressoEvent';
	/** The id field matches the WP_Post-&gt;ID field. */
	espressoEventId: Scalars['Int'];
	/** Limit of Additional Registrations on Same Transaction */
	additionalLimit?: Maybe<Scalars['String']>;
	/** Allow Overflow on Event */
	allowOverflow?: Maybe<Scalars['Boolean']>;
	/** Ancestors of the object */
	ancestors?: Maybe<Array<Maybe<PostObjectUnion>>>;
	/** The author field will return a queryable User type matching the post&#039;s author. */
	author?: Maybe<User>;
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** Whether the comments are open or closed for this particular post. */
	commentStatus?: Maybe<Scalars['String']>;
	/** Connection between the EspressoEvent type and the EspressoEvent type */
	comments?: Maybe<EspressoEventToCommentConnection>;
	/** The content of the post. */
	content?: Maybe<Scalars['String']>;
	/** Date/Time Event Created */
	created?: Maybe<Scalars['String']>;
	/** Post publishing date. */
	date?: Maybe<Scalars['String']>;
	/** The publishing date set in GMT. */
	dateGmt?: Maybe<Scalars['String']>;
	/** Connection between the EspressoEvent type and the EspressoEvent type */
	datetimes?: Maybe<EspressoEventDatetimesConnection>;
	/** The event ID. */
	dbId: Scalars['Int'];
	/** Event Description */
	desc?: Maybe<Scalars['String']>;
	/** The desired slug of the post */
	desiredSlug?: Maybe<Scalars['String']>;
	/** Display Description Flag */
	displayDesc?: Maybe<Scalars['Boolean']>;
	/** Display Ticket Selector Flag */
	displayTicketSelector?: Maybe<Scalars['Boolean']>;
	/** Accept Donations? */
	donations?: Maybe<Scalars['Boolean']>;
	/** The user that most recently edited the object */
	editLast?: Maybe<User>;
	/**
	 * If a user has edited the object within the past 15 seconds, this will return
	 * the user and the time they last edited. Null if the edit lock doesn&#039;t
	 * exist or is greater than 15 seconds
	 */
	editLock?: Maybe<EditLock>;
	/** The RSS enclosure for the object */
	enclosure?: Maybe<Scalars['String']>;
	/** The excerpt of the post. */
	excerpt?: Maybe<Scalars['String']>;
	/** URL of Event Page if hosted elsewhere */
	externalUrl?: Maybe<Scalars['String']>;
	/** The featured image for the object */
	featuredImage?: Maybe<MediaItem>;
	/**
	 * The global unique identifier for this post. This currently matches the value
	 * stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot;
	 * database table.
	 */
	guid?: Maybe<Scalars['String']>;
	/** The globally unique identifier of the espresso_events object. */
	id: Scalars['ID'];
	/** Flag indicating event is active */
	isActive?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the event is marked as cancelled */
	isCancelled?: Maybe<Scalars['Boolean']>;
	/** Flag indicating event is expired or not */
	isExpired?: Maybe<Scalars['Boolean']>;
	/** Flag indicating event is inactive */
	isInactive?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the event is marked as postponed */
	isPostponed?: Maybe<Scalars['Boolean']>;
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** Whether the object is a revision */
	isRevision?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the tickets sold for the event, met or exceed the registration limit */
	isSoldOut?: Maybe<Scalars['Boolean']>;
	/** Whether the event is upcoming */
	isUpcoming?: Maybe<Scalars['Boolean']>;
	/** The permalink of the post */
	link?: Maybe<Scalars['String']>;
	/** Member-Only Event Flag */
	memberOnly?: Maybe<Scalars['Boolean']>;
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/**
	 * The local modified time for a post. If a post was recently updated the
	 * modified field will change to match the corresponding time.
	 */
	modified?: Maybe<Scalars['String']>;
	/**
	 * The GMT modified time for a post. If a post was recently updated the modified
	 * field will change to match the corresponding time in GMT.
	 */
	modifiedGmt?: Maybe<Scalars['String']>;
	/** Event Name */
	name?: Maybe<Scalars['String']>;
	/** Event Menu Order */
	order?: Maybe<Scalars['Int']>;
	/** The parent of the object. The parent object can be of various types */
	parent?: Maybe<PostObjectUnion>;
	/** Event Phone Number */
	phone?: Maybe<Scalars['String']>;
	/** Whether the pings are open or closed for this particular post. */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Event Short Description */
	shortDesc?: Maybe<Scalars['String']>;
	/**
	 * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name
	 * field and the post_name column in the database for the
	 * &quot;post_objects&quot; table.
	 */
	slug?: Maybe<Scalars['String']>;
	/** The current status of the object */
	status?: Maybe<Scalars['String']>;
	/** Connection between the EspressoEvent type and the EspressoEvent type */
	tags?: Maybe<EspressoEventToTagConnection>;
	/** Terms connected to the EspressoEvent */
	termNames?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Terms connected to the EspressoEvent */
	termSlugs?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Terms connected to the EspressoEvent */
	terms?: Maybe<Array<Maybe<TermObjectUnion>>>;
	/** Timezone (name) for Event times */
	timezoneString?: Maybe<Scalars['String']>;
	/** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** URI path for the resource */
	uri?: Maybe<Scalars['String']>;
	/** Connection between the EspressoEvent type and the EspressoEvent type */
	venues?: Maybe<EspressoEventVenuesConnection>;
	/** Event Visible Date */
	visibleOn?: Maybe<Scalars['String']>;
	/** Event Creator */
	wpUser?: Maybe<User>;
};

/** The EspressoEvent type */
export type EspressoEventAncestorsArgs = {
	types?: Maybe<Array<Maybe<PostTypeEnum>>>;
};

/** The EspressoEvent type */
export type EspressoEventCommentsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<EspressoEventToCommentConnectionWhereArgs>;
};

/** The EspressoEvent type */
export type EspressoEventContentArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The EspressoEvent type */
export type EspressoEventDatetimesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<EspressoEventDatetimesConnectionWhereArgs>;
};

/** The EspressoEvent type */
export type EspressoEventExcerptArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The EspressoEvent type */
export type EspressoEventTagsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<EspressoEventToTagConnectionWhereArgs>;
};

/** The EspressoEvent type */
export type EspressoEventTermNamesArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The EspressoEvent type */
export type EspressoEventTermSlugsArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The EspressoEvent type */
export type EspressoEventTermsArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The EspressoEvent type */
export type EspressoEventTitleArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The EspressoEvent type */
export type EspressoEventVenuesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
};

/** Connection between the EspressoEvent type and the EspressoEvent type */
export type EspressoEventDatetimesConnection = {
	__typename?: 'EspressoEventDatetimesConnection';
	/** Edges for the EspressoEventDatetimesConnection connection */
	edges?: Maybe<Array<Maybe<EspressoEventDatetimesConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoDatetime>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type EspressoEventDatetimesConnectionEdge = {
	__typename?: 'EspressoEventDatetimesConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoDatetime>;
};

/** Arguments for filtering the EspressoEventDatetimesConnection connection */
export type EspressoEventDatetimesConnectionWhereArgs = {
	/** Datetimes which are active. */
	active?: Maybe<Scalars['Boolean']>;
	/** Globally unique event ID to get the datetimes for. */
	event?: Maybe<Scalars['ID']>;
	/** Event ID to get the datetimes for. */
	eventId?: Maybe<Scalars['Int']>;
	/** Event IDs to get the datetimes for. */
	eventIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Globally unique event IDs to get the datetimes for. */
	eventIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Datetimes which are expired. */
	expired?: Maybe<Scalars['Boolean']>;
	/** What parameter to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Globally unique ticket ID to get the datetimes for. */
	ticket?: Maybe<Scalars['ID']>;
	/** Ticket ID to get the datetimes for. */
	ticketId?: Maybe<Scalars['Int']>;
	/** Ticket IDs to get the datetimes for. */
	ticketIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Globally unique ticket IDs to get the datetimes for. */
	ticketIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Datetimes which are upcoming. */
	upcoming?: Maybe<Scalars['Boolean']>;
};

/** Set relationships between the EspressoEvent to tags */
export type EspressoEventTagsInput = {
	/**
	 * If true, this will append the tag to existing related tags. If false, this
	 * will replace existing relationships. Default true.
	 */
	append?: Maybe<Scalars['Boolean']>;
	nodes?: Maybe<Array<Maybe<EspressoEventTagsNodeInput>>>;
};

/**
 * List of tags to connect the EspressoEvent to. If an ID is set, it will be used
 * to create the connection. If not, it will look for a slug. If neither are valid
 * existing terms, and the site is configured to allow terms to be created during
 * post mutations, a term will be created using the Name if it exists in the input,
 * then fallback to the slug if it exists.
 */
export type EspressoEventTagsNodeInput = {
	/**
	 * The description of the tag. This field is used to set a description of the tag
	 * if a new one is created during the mutation.
	 */
	description?: Maybe<Scalars['String']>;
	/**
	 * The ID of the tag. If present, this will be used to connect to the
	 * EspressoEvent. If no existing tag exists with this ID, no connection will be made.
	 */
	id?: Maybe<Scalars['ID']>;
	/**
	 * The name of the tag. This field is used to create a new term, if term creation
	 * is enabled in nested mutations, and if one does not already exist with the
	 * provided slug or ID or if a slug or ID is not provided. If no name is included
	 * and a term is created, the creation will fallback to the slug field.
	 */
	name?: Maybe<Scalars['String']>;
	/**
	 * The slug of the tag. If no ID is present, this field will be used to make a
	 * connection. If no existing term exists with this slug, this field will be used
	 * as a fallback to the Name field when creating a new term to connect to, if
	 * term creation is enabled as a nested mutation.
	 */
	slug?: Maybe<Scalars['String']>;
};

/** Connection between the EspressoEvent type and the EspressoEvent type */
export type EspressoEventToCommentConnection = {
	__typename?: 'EspressoEventToCommentConnection';
	/** Edges for the EspressoEventToCommentConnection connection */
	edges?: Maybe<Array<Maybe<EspressoEventToCommentConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Comment>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type EspressoEventToCommentConnectionEdge = {
	__typename?: 'EspressoEventToCommentConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Comment>;
};

/** Arguments for filtering the EspressoEventToCommentConnection connection */
export type EspressoEventToCommentConnectionWhereArgs = {
	/** Comment author email address. */
	authorEmail?: Maybe<Scalars['String']>;
	/** Array of author IDs to include comments for. */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to exclude comments for. */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Comment author URL. */
	authorUrl?: Maybe<Scalars['String']>;
	/** Array of comment IDs to include. */
	commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of IDs of users whose unapproved comments will be returned by the
	 * 							query regardless of status.
	 */
	commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Include comments of a given type. */
	commentType?: Maybe<Scalars['String']>;
	/** Include comments from a given array of comment types. */
	commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Exclude comments from a given array of comment types. */
	commentTypeNotIn?: Maybe<Scalars['String']>;
	/** Content object author ID to limit results by. */
	contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to retrieve comments for. */
	contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs *not* to retrieve comments for. */
	contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Limit results to those affiliated with a given content object
	 * 							ID.
	 */
	contentId?: Maybe<Scalars['ID']>;
	/**
	 * Array of content object IDs to include affiliated comments
	 * 							for.
	 */
	contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of content object IDs to exclude affiliated comments
	 * 							for.
	 */
	contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Content object name to retrieve affiliated comments for. */
	contentName?: Maybe<Scalars['String']>;
	/** Content Object parent ID to retrieve affiliated comments for. */
	contentParent?: Maybe<Scalars['Int']>;
	/**
	 * Array of content object statuses to retrieve affiliated comments for.
	 * 							Pass 'any' to match any value.
	 */
	contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
	/** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
	contentType?: Maybe<Array<Maybe<PostTypeEnum>>>;
	/**
	 * Array of IDs or email addresses of users whose unapproved comments will be
	 * returned by the query regardless of $status. Default empty
	 */
	includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Karma score to retrieve matching comments for. */
	karma?: Maybe<Scalars['Int']>;
	/** The cardinality of the order of the connection */
	order?: Maybe<OrderEnum>;
	/** Field to order the comments by. */
	orderby?: Maybe<CommentsConnectionOrderbyEnum>;
	/** Parent ID of comment to retrieve children of. */
	parent?: Maybe<Scalars['Int']>;
	/** Array of parent IDs of comments to retrieve children for. */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of parent IDs of comments *not* to retrieve children
	 * 							for.
	 */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Search term(s) to retrieve matching comments for. */
	search?: Maybe<Scalars['String']>;
	/** Comment status to limit results by. */
	status?: Maybe<Scalars['String']>;
	/** Include comments for a specific user ID. */
	userId?: Maybe<Scalars['ID']>;
};

/** Connection between the EspressoEvent type and the EspressoEvent type */
export type EspressoEventToTagConnection = {
	__typename?: 'EspressoEventToTagConnection';
	/** Edges for the EspressoEventToTagConnection connection */
	edges?: Maybe<Array<Maybe<EspressoEventToTagConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Tag>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	taxonomyInfo?: Maybe<Taxonomy>;
};

/** An edge in a connection */
export type EspressoEventToTagConnectionEdge = {
	__typename?: 'EspressoEventToTagConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Tag>;
};

/** Arguments for filtering the EspressoEventToTagConnection connection */
export type EspressoEventToTagConnectionWhereArgs = {
	/** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
	cacheDomain?: Maybe<Scalars['String']>;
	/** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
	childOf?: Maybe<Scalars['Int']>;
	/**
	 * True to limit results to terms that have no children. This parameter has no
	 * effect on non-hierarchical taxonomies. Default false.
	 */
	childless?: Maybe<Scalars['Boolean']>;
	/** Retrieve terms where the description is LIKE the input value. Default empty. */
	descriptionLike?: Maybe<Scalars['String']>;
	/** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
	exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of term ids to exclude along with all of their descendant terms. If
	 * $include is non-empty, $exclude_tree is ignored. Default empty array.
	 */
	excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
	hideEmpty?: Maybe<Scalars['Boolean']>;
	/** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
	hierarchical?: Maybe<Scalars['Boolean']>;
	/** Array of term ids to include. Default empty array. */
	include?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of names to return term(s) for. Default empty. */
	name?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Retrieve terms where the name is LIKE the input value. Default empty. */
	nameLike?: Maybe<Scalars['String']>;
	/** Array of object IDs. Results will be limited to terms associated with these objects. */
	objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Field(s) to order terms by. Defaults to 'name'. */
	orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
	/** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
	padCounts?: Maybe<Scalars['Boolean']>;
	/** Parent term ID to retrieve direct-child terms of. Default empty. */
	parent?: Maybe<Scalars['Int']>;
	/** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
	search?: Maybe<Scalars['String']>;
	/**
	 * Default false. If true, only the items connected to the source item will be
	 * returned. If false, all items will be returned regardless of connection to the source
	 */
	shouldOnlyIncludeConnectedItems?: Maybe<Scalars['Boolean']>;
	/**
	 * Default false. If true, the connection will be output in a flat list instead
	 * of the hierarchical list. So child terms will be output in the same level as
	 * the parent terms
	 */
	shouldOutputInFlatList?: Maybe<Scalars['Boolean']>;
	/** Array of slugs to return term(s) for. Default empty. */
	slug?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Array of term taxonomy IDs, to match when querying terms. */
	termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to prime meta caches for matched terms. Default true. */
	updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the EspressoEvent type and the EspressoEvent type */
export type EspressoEventVenuesConnection = {
	__typename?: 'EspressoEventVenuesConnection';
	/** Edges for the EspressoEventVenuesConnection connection */
	edges?: Maybe<Array<Maybe<EspressoEventVenuesConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoVenue>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type EspressoEventVenuesConnectionEdge = {
	__typename?: 'EspressoEventVenuesConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoVenue>;
};

/** A price. */
export type EspressoPrice = {
	__typename?: 'EspressoPrice';
	/** Price Amount */
	amount?: Maybe<Scalars['Float']>;
	/** Price ID */
	dbId: Scalars['Int'];
	/** Price description */
	desc?: Maybe<Scalars['String']>;
	/** The globally unique ID for the object. */
	id: Scalars['ID'];
	/** Flag indicating price is a base price type. */
	isBasePrice?: Maybe<Scalars['Boolean']>;
	/** Flag indicating price is the default one. */
	isDefault?: Maybe<Scalars['Boolean']>;
	/** Flag indicating price has been trashed. */
	isDeleted?: Maybe<Scalars['Boolean']>;
	/** Flag indicating price is a discount. */
	isDiscount?: Maybe<Scalars['Boolean']>;
	/** Flag indicating price is a percentage. */
	isPercent?: Maybe<Scalars['Boolean']>;
	/** Flag indicating price is a tax. */
	isTax?: Maybe<Scalars['Boolean']>;
	/** Price Name */
	name?: Maybe<Scalars['String']>;
	/** Order of Application of Price. */
	order?: Maybe<Scalars['Int']>;
	/** Price ID for a global Price that will be overridden by this Price. */
	overrides?: Maybe<Scalars['Int']>;
	/** The parent price of the current price */
	parent?: Maybe<EspressoPrice>;
	/** The related price type object. */
	priceType?: Maybe<EspressoPriceType>;
	/** Order of Application of Price type. */
	priceTypeOrder?: Maybe<Scalars['Int']>;
	/** Price Creator */
	wpUser?: Maybe<User>;
};

/** Price Base type ID */
export enum EspressoPriceBaseTypeEnum {
	BasePrice = 'BASE_PRICE',
	Discount = 'DISCOUNT',
	Surcharge = 'SURCHARGE',
	Tax = 'TAX',
}

/** A price type. */
export type EspressoPriceType = {
	__typename?: 'EspressoPriceType';
	/** Price Base type */
	baseType?: Maybe<EspressoPriceBaseTypeEnum>;
	/** Price type ID */
	dbId: Scalars['Int'];
	/** The globally unique ID for the object. */
	id: Scalars['ID'];
	/** Flag indicating price type is a base price. */
	isBasePrice?: Maybe<Scalars['Boolean']>;
	/** Flag indicating price type has been trashed. */
	isDeleted?: Maybe<Scalars['Boolean']>;
	/** Flag indicating price type is a discount. */
	isDiscount?: Maybe<Scalars['Boolean']>;
	/** Flag indicating price type is a percentage. */
	isPercent?: Maybe<Scalars['Boolean']>;
	/** Flag indicating price is a tax. */
	isTax?: Maybe<Scalars['Boolean']>;
	/** Price type Name */
	name?: Maybe<Scalars['String']>;
	/** Order in which price should be applied. */
	order?: Maybe<Scalars['Int']>;
	/** Price Type Creator */
	wpUser?: Maybe<User>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type EspressoRootQueryDatetimesConnection = {
	__typename?: 'EspressoRootQueryDatetimesConnection';
	/** Edges for the EspressoRootQueryDatetimesConnection connection */
	edges?: Maybe<Array<Maybe<EspressoRootQueryDatetimesConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoDatetime>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type EspressoRootQueryDatetimesConnectionEdge = {
	__typename?: 'EspressoRootQueryDatetimesConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoDatetime>;
};

/** Arguments for filtering the EspressoRootQueryDatetimesConnection connection */
export type EspressoRootQueryDatetimesConnectionWhereArgs = {
	/** Datetimes which are active. */
	active?: Maybe<Scalars['Boolean']>;
	/** Globally unique event ID to get the datetimes for. */
	event?: Maybe<Scalars['ID']>;
	/** Event ID to get the datetimes for. */
	eventId?: Maybe<Scalars['Int']>;
	/** Event IDs to get the datetimes for. */
	eventIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Globally unique event IDs to get the datetimes for. */
	eventIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Datetimes which are expired. */
	expired?: Maybe<Scalars['Boolean']>;
	/** What parameter to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Globally unique ticket ID to get the datetimes for. */
	ticket?: Maybe<Scalars['ID']>;
	/** Ticket ID to get the datetimes for. */
	ticketId?: Maybe<Scalars['Int']>;
	/** Ticket IDs to get the datetimes for. */
	ticketIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Globally unique ticket IDs to get the datetimes for. */
	ticketIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Datetimes which are upcoming. */
	upcoming?: Maybe<Scalars['Boolean']>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type EspressoRootQueryPricesConnection = {
	__typename?: 'EspressoRootQueryPricesConnection';
	/** Edges for the EspressoRootQueryPricesConnection connection */
	edges?: Maybe<Array<Maybe<EspressoRootQueryPricesConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoPrice>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type EspressoRootQueryPricesConnectionEdge = {
	__typename?: 'EspressoRootQueryPricesConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoPrice>;
};

/** Arguments for filtering the EspressoRootQueryPricesConnection connection */
export type EspressoRootQueryPricesConnectionWhereArgs = {
	/** Price Base types. */
	priceBaseTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Globally unique price type ID to get the prices for. */
	priceType?: Maybe<Scalars['ID']>;
	/** Price type ID to get the prices for. */
	priceTypeId?: Maybe<Scalars['Int']>;
	/** Price type IDs to get the prices for. */
	priceTypeIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Globally unique price type IDs to get the prices for. */
	priceTypeIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Globally unique ticket ID to get the prices for. */
	ticket?: Maybe<Scalars['ID']>;
	/** Ticket ID to get the prices for. */
	ticketId?: Maybe<Scalars['Int']>;
	/** Ticket IDs to get the prices for. */
	ticketIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Globally unique ticket IDs to get the prices for. */
	ticketIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type EspressoRootQueryPriceTypesConnection = {
	__typename?: 'EspressoRootQueryPriceTypesConnection';
	/** Edges for the EspressoRootQueryPriceTypesConnection connection */
	edges?: Maybe<Array<Maybe<EspressoRootQueryPriceTypesConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoPriceType>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type EspressoRootQueryPriceTypesConnectionEdge = {
	__typename?: 'EspressoRootQueryPriceTypesConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoPriceType>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type EspressoRootQueryTicketsConnection = {
	__typename?: 'EspressoRootQueryTicketsConnection';
	/** Edges for the EspressoRootQueryTicketsConnection connection */
	edges?: Maybe<Array<Maybe<EspressoRootQueryTicketsConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoTicket>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type EspressoRootQueryTicketsConnectionEdge = {
	__typename?: 'EspressoRootQueryTicketsConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoTicket>;
};

/** Arguments for filtering the EspressoRootQueryTicketsConnection connection */
export type EspressoRootQueryTicketsConnectionWhereArgs = {
	/** Globally unique datetime ID to get the tickets for. */
	datetime?: Maybe<Scalars['ID']>;
	/** Datetime ID to get the tickets for. */
	datetimeId?: Maybe<Scalars['Int']>;
	/** Datetime IDs to get the tickets for. */
	datetimeIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Globally unique datetime IDs to get the tickets for. */
	datetimeIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What parameter to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** A state */
export type EspressoState = {
	__typename?: 'EspressoState';
	/** State Abbreviation */
	abbreviation?: Maybe<Scalars['String']>;
	/** Country for the state */
	country?: Maybe<EspressoCountry>;
	/** State ID */
	dbId: Scalars['Int'];
	/** The globally unique ID for the object. */
	id: Scalars['ID'];
	/** State Active Flag */
	isActive?: Maybe<Scalars['Boolean']>;
	/** State Name */
	name?: Maybe<Scalars['String']>;
};

/** A ticket for an event date */
export type EspressoTicket = {
	__typename?: 'EspressoTicket';
	/** Connection between the EspressoTicket type and the EspressoTicket type */
	datetimes?: Maybe<EspressoTicketDatetimesConnection>;
	/** Ticket ID */
	dbId: Scalars['Int'];
	/** Description of Ticket */
	description?: Maybe<Scalars['String']>;
	/** End date and time of the Ticket */
	endDate?: Maybe<Scalars['String']>;
	/** Event of the ticket. */
	event?: Maybe<EspressoEvent>;
	/** The globally unique ID for the object. */
	id: Scalars['ID'];
	/** Flag indicating that this ticket is a default ticket */
	isDefault?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the ticket is free. */
	isFree?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether this ticket must be purchased with a transaction */
	isRequired?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether there is tax applied on this ticket */
	isTaxable?: Maybe<Scalars['Boolean']>;
	/** Maximum quantity of this ticket that can be purchased in one transaction */
	max?: Maybe<Scalars['Int']>;
	/** Minimum quantity of this ticket that must be purchased */
	min?: Maybe<Scalars['Int']>;
	/** Ticket Name */
	name?: Maybe<Scalars['String']>;
	/** The order in which the Datetime is displayed */
	order?: Maybe<Scalars['Int']>;
	/** The parent ticket of the current ticket */
	parent?: Maybe<EspressoTicket>;
	/** Final calculated price for ticket */
	price?: Maybe<Scalars['Float']>;
	/** Connection between the EspressoTicket type and the EspressoTicket type */
	prices?: Maybe<EspressoTicketPricesConnection>;
	/** Quantity of this ticket that is available */
	quantity?: Maybe<Scalars['Int']>;
	/** Quantity of this ticket that is reserved, but not yet fully purchased */
	reserved?: Maybe<Scalars['Int']>;
	/**
	 * Flag indicating whether ticket calculations should run in reverse and
	 * calculate the base ticket price from the provided ticket total.
	 */
	reverseCalculate?: Maybe<Scalars['Boolean']>;
	/** How tickets are displayed in the ui */
	row?: Maybe<Scalars['Int']>;
	/** Number of this ticket sold */
	sold?: Maybe<Scalars['Int']>;
	/** Start date and time of the Ticket */
	startDate?: Maybe<Scalars['String']>;
	/** Number of datetimes this ticket can be used at */
	uses?: Maybe<Scalars['Int']>;
	/** Ticket Creator */
	wpUser?: Maybe<User>;
};

/** A ticket for an event date */
export type EspressoTicketDatetimesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<EspressoTicketDatetimesConnectionWhereArgs>;
};

/** A ticket for an event date */
export type EspressoTicketPricesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<EspressoTicketPricesConnectionWhereArgs>;
};

/** Connection between the EspressoTicket type and the EspressoTicket type */
export type EspressoTicketDatetimesConnection = {
	__typename?: 'EspressoTicketDatetimesConnection';
	/** Edges for the EspressoTicketDatetimesConnection connection */
	edges?: Maybe<Array<Maybe<EspressoTicketDatetimesConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoDatetime>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type EspressoTicketDatetimesConnectionEdge = {
	__typename?: 'EspressoTicketDatetimesConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoDatetime>;
};

/** Arguments for filtering the EspressoTicketDatetimesConnection connection */
export type EspressoTicketDatetimesConnectionWhereArgs = {
	/** Datetimes which are active. */
	active?: Maybe<Scalars['Boolean']>;
	/** Globally unique event ID to get the datetimes for. */
	event?: Maybe<Scalars['ID']>;
	/** Event ID to get the datetimes for. */
	eventId?: Maybe<Scalars['Int']>;
	/** Event IDs to get the datetimes for. */
	eventIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Globally unique event IDs to get the datetimes for. */
	eventIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Datetimes which are expired. */
	expired?: Maybe<Scalars['Boolean']>;
	/** What parameter to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Globally unique ticket ID to get the datetimes for. */
	ticket?: Maybe<Scalars['ID']>;
	/** Ticket ID to get the datetimes for. */
	ticketId?: Maybe<Scalars['Int']>;
	/** Ticket IDs to get the datetimes for. */
	ticketIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Globally unique ticket IDs to get the datetimes for. */
	ticketIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Datetimes which are upcoming. */
	upcoming?: Maybe<Scalars['Boolean']>;
};

/** Connection between the EspressoTicket type and the EspressoTicket type */
export type EspressoTicketPricesConnection = {
	__typename?: 'EspressoTicketPricesConnection';
	/** Edges for the EspressoTicketPricesConnection connection */
	edges?: Maybe<Array<Maybe<EspressoTicketPricesConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoPrice>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type EspressoTicketPricesConnectionEdge = {
	__typename?: 'EspressoTicketPricesConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoPrice>;
};

/** Arguments for filtering the EspressoTicketPricesConnection connection */
export type EspressoTicketPricesConnectionWhereArgs = {
	/** Price Base types. */
	priceBaseTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Globally unique price type ID to get the prices for. */
	priceType?: Maybe<Scalars['ID']>;
	/** Price type ID to get the prices for. */
	priceTypeId?: Maybe<Scalars['Int']>;
	/** Price type IDs to get the prices for. */
	priceTypeIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Globally unique price type IDs to get the prices for. */
	priceTypeIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Globally unique ticket ID to get the prices for. */
	ticket?: Maybe<Scalars['ID']>;
	/** Ticket ID to get the prices for. */
	ticketId?: Maybe<Scalars['Int']>;
	/** Ticket IDs to get the prices for. */
	ticketIdIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Globally unique ticket IDs to get the prices for. */
	ticketIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** The EspressoVenue type */
export type EspressoVenue = Node & {
	__typename?: 'EspressoVenue';
	/** The id field matches the WP_Post-&gt;ID field. */
	espressoVenueId: Scalars['Int'];
	/** Venue Address line 1 */
	address?: Maybe<Scalars['String']>;
	/** Venue Address line 2 */
	address2?: Maybe<Scalars['String']>;
	/** Ancestors of the object */
	ancestors?: Maybe<Array<Maybe<PostObjectUnion>>>;
	/** The author field will return a queryable User type matching the post&#039;s author. */
	author?: Maybe<User>;
	/** Venue Capacity */
	capacity?: Maybe<Scalars['Int']>;
	/** Venue City */
	city?: Maybe<Scalars['String']>;
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** Whether the comments are open or closed for this particular post. */
	commentStatus?: Maybe<Scalars['String']>;
	/** Connection between the EspressoVenue type and the EspressoVenue type */
	comments?: Maybe<EspressoVenueToCommentConnection>;
	/** The content of the post. */
	content?: Maybe<Scalars['String']>;
	/** Venue country */
	country?: Maybe<EspressoCountry>;
	/** Date Venue Created */
	created?: Maybe<Scalars['String']>;
	/** Post publishing date. */
	date?: Maybe<Scalars['String']>;
	/** The publishing date set in GMT. */
	dateGmt?: Maybe<Scalars['String']>;
	/** The venue ID. */
	dbId: Scalars['Int'];
	/** Venue Description */
	desc?: Maybe<Scalars['String']>;
	/** The desired slug of the post */
	desiredSlug?: Maybe<Scalars['String']>;
	/** The user that most recently edited the object */
	editLast?: Maybe<User>;
	/**
	 * If a user has edited the object within the past 15 seconds, this will return
	 * the user and the time they last edited. Null if the edit lock doesn&#039;t
	 * exist or is greater than 15 seconds
	 */
	editLock?: Maybe<EditLock>;
	/** Show Google Map? */
	enableForGmap?: Maybe<Scalars['String']>;
	/** The RSS enclosure for the object */
	enclosure?: Maybe<Scalars['String']>;
	/** The excerpt of the post. */
	excerpt?: Maybe<Scalars['String']>;
	/** The featured image for the object */
	featuredImage?: Maybe<MediaItem>;
	/** Google Map Link */
	googleMapLink?: Maybe<Scalars['String']>;
	/**
	 * The global unique identifier for this post. This currently matches the value
	 * stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot;
	 * database table.
	 */
	guid?: Maybe<Scalars['String']>;
	/** The globally unique identifier of the espresso_venues object. */
	id: Scalars['ID'];
	/** Venue Identifier */
	identifier?: Maybe<Scalars['String']>;
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** Whether the object is a revision */
	isRevision?: Maybe<Scalars['Boolean']>;
	/** The permalink of the post */
	link?: Maybe<Scalars['String']>;
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/**
	 * The local modified time for a post. If a post was recently updated the
	 * modified field will change to match the corresponding time.
	 */
	modified?: Maybe<Scalars['String']>;
	/**
	 * The GMT modified time for a post. If a post was recently updated the modified
	 * field will change to match the corresponding time in GMT.
	 */
	modifiedGmt?: Maybe<Scalars['String']>;
	/** Venue Name */
	name?: Maybe<Scalars['String']>;
	/** Venue order */
	order?: Maybe<Scalars['Int']>;
	/** The parent of the object. The parent object can be of various types */
	parent?: Maybe<PostObjectUnion>;
	/** Venue Phone */
	phone?: Maybe<Scalars['String']>;
	/** Whether the pings are open or closed for this particular post. */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Short Description of Venue */
	shortDesc?: Maybe<Scalars['String']>;
	/**
	 * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name
	 * field and the post_name column in the database for the
	 * &quot;post_objects&quot; table.
	 */
	slug?: Maybe<Scalars['String']>;
	/** Venue state */
	state?: Maybe<EspressoState>;
	/** The current status of the object */
	status?: Maybe<Scalars['String']>;
	/** Connection between the EspressoVenue type and the EspressoVenue type */
	tags?: Maybe<EspressoVenueToTagConnection>;
	/** Terms connected to the EspressoVenue */
	termNames?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Terms connected to the EspressoVenue */
	termSlugs?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Terms connected to the EspressoVenue */
	terms?: Maybe<Array<Maybe<TermObjectUnion>>>;
	/** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** URI path for the resource */
	uri?: Maybe<Scalars['String']>;
	/** Venue Website */
	url?: Maybe<Scalars['String']>;
	/** Call in Number */
	virtualPhone?: Maybe<Scalars['String']>;
	/** Virtual URL */
	virtualUrl?: Maybe<Scalars['String']>;
	/** Venue Creator */
	wpUser?: Maybe<User>;
	/** Venue Zip/Postal Code */
	zip?: Maybe<Scalars['String']>;
};

/** The EspressoVenue type */
export type EspressoVenueAncestorsArgs = {
	types?: Maybe<Array<Maybe<PostTypeEnum>>>;
};

/** The EspressoVenue type */
export type EspressoVenueCommentsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<EspressoVenueToCommentConnectionWhereArgs>;
};

/** The EspressoVenue type */
export type EspressoVenueContentArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The EspressoVenue type */
export type EspressoVenueExcerptArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The EspressoVenue type */
export type EspressoVenueTagsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<EspressoVenueToTagConnectionWhereArgs>;
};

/** The EspressoVenue type */
export type EspressoVenueTermNamesArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The EspressoVenue type */
export type EspressoVenueTermSlugsArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The EspressoVenue type */
export type EspressoVenueTermsArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The EspressoVenue type */
export type EspressoVenueTitleArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** Set relationships between the EspressoVenue to tags */
export type EspressoVenueTagsInput = {
	/**
	 * If true, this will append the tag to existing related tags. If false, this
	 * will replace existing relationships. Default true.
	 */
	append?: Maybe<Scalars['Boolean']>;
	nodes?: Maybe<Array<Maybe<EspressoVenueTagsNodeInput>>>;
};

/**
 * List of tags to connect the EspressoVenue to. If an ID is set, it will be used
 * to create the connection. If not, it will look for a slug. If neither are valid
 * existing terms, and the site is configured to allow terms to be created during
 * post mutations, a term will be created using the Name if it exists in the input,
 * then fallback to the slug if it exists.
 */
export type EspressoVenueTagsNodeInput = {
	/**
	 * The description of the tag. This field is used to set a description of the tag
	 * if a new one is created during the mutation.
	 */
	description?: Maybe<Scalars['String']>;
	/**
	 * The ID of the tag. If present, this will be used to connect to the
	 * EspressoVenue. If no existing tag exists with this ID, no connection will be made.
	 */
	id?: Maybe<Scalars['ID']>;
	/**
	 * The name of the tag. This field is used to create a new term, if term creation
	 * is enabled in nested mutations, and if one does not already exist with the
	 * provided slug or ID or if a slug or ID is not provided. If no name is included
	 * and a term is created, the creation will fallback to the slug field.
	 */
	name?: Maybe<Scalars['String']>;
	/**
	 * The slug of the tag. If no ID is present, this field will be used to make a
	 * connection. If no existing term exists with this slug, this field will be used
	 * as a fallback to the Name field when creating a new term to connect to, if
	 * term creation is enabled as a nested mutation.
	 */
	slug?: Maybe<Scalars['String']>;
};

/** Connection between the EspressoVenue type and the EspressoVenue type */
export type EspressoVenueToCommentConnection = {
	__typename?: 'EspressoVenueToCommentConnection';
	/** Edges for the EspressoVenueToCommentConnection connection */
	edges?: Maybe<Array<Maybe<EspressoVenueToCommentConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Comment>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type EspressoVenueToCommentConnectionEdge = {
	__typename?: 'EspressoVenueToCommentConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Comment>;
};

/** Arguments for filtering the EspressoVenueToCommentConnection connection */
export type EspressoVenueToCommentConnectionWhereArgs = {
	/** Comment author email address. */
	authorEmail?: Maybe<Scalars['String']>;
	/** Array of author IDs to include comments for. */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to exclude comments for. */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Comment author URL. */
	authorUrl?: Maybe<Scalars['String']>;
	/** Array of comment IDs to include. */
	commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of IDs of users whose unapproved comments will be returned by the
	 * 							query regardless of status.
	 */
	commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Include comments of a given type. */
	commentType?: Maybe<Scalars['String']>;
	/** Include comments from a given array of comment types. */
	commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Exclude comments from a given array of comment types. */
	commentTypeNotIn?: Maybe<Scalars['String']>;
	/** Content object author ID to limit results by. */
	contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to retrieve comments for. */
	contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs *not* to retrieve comments for. */
	contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Limit results to those affiliated with a given content object
	 * 							ID.
	 */
	contentId?: Maybe<Scalars['ID']>;
	/**
	 * Array of content object IDs to include affiliated comments
	 * 							for.
	 */
	contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of content object IDs to exclude affiliated comments
	 * 							for.
	 */
	contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Content object name to retrieve affiliated comments for. */
	contentName?: Maybe<Scalars['String']>;
	/** Content Object parent ID to retrieve affiliated comments for. */
	contentParent?: Maybe<Scalars['Int']>;
	/**
	 * Array of content object statuses to retrieve affiliated comments for.
	 * 							Pass 'any' to match any value.
	 */
	contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
	/** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
	contentType?: Maybe<Array<Maybe<PostTypeEnum>>>;
	/**
	 * Array of IDs or email addresses of users whose unapproved comments will be
	 * returned by the query regardless of $status. Default empty
	 */
	includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Karma score to retrieve matching comments for. */
	karma?: Maybe<Scalars['Int']>;
	/** The cardinality of the order of the connection */
	order?: Maybe<OrderEnum>;
	/** Field to order the comments by. */
	orderby?: Maybe<CommentsConnectionOrderbyEnum>;
	/** Parent ID of comment to retrieve children of. */
	parent?: Maybe<Scalars['Int']>;
	/** Array of parent IDs of comments to retrieve children for. */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of parent IDs of comments *not* to retrieve children
	 * 							for.
	 */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Search term(s) to retrieve matching comments for. */
	search?: Maybe<Scalars['String']>;
	/** Comment status to limit results by. */
	status?: Maybe<Scalars['String']>;
	/** Include comments for a specific user ID. */
	userId?: Maybe<Scalars['ID']>;
};

/** Connection between the EspressoVenue type and the EspressoVenue type */
export type EspressoVenueToTagConnection = {
	__typename?: 'EspressoVenueToTagConnection';
	/** Edges for the EspressoVenueToTagConnection connection */
	edges?: Maybe<Array<Maybe<EspressoVenueToTagConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Tag>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	taxonomyInfo?: Maybe<Taxonomy>;
};

/** An edge in a connection */
export type EspressoVenueToTagConnectionEdge = {
	__typename?: 'EspressoVenueToTagConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Tag>;
};

/** Arguments for filtering the EspressoVenueToTagConnection connection */
export type EspressoVenueToTagConnectionWhereArgs = {
	/** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
	cacheDomain?: Maybe<Scalars['String']>;
	/** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
	childOf?: Maybe<Scalars['Int']>;
	/**
	 * True to limit results to terms that have no children. This parameter has no
	 * effect on non-hierarchical taxonomies. Default false.
	 */
	childless?: Maybe<Scalars['Boolean']>;
	/** Retrieve terms where the description is LIKE the input value. Default empty. */
	descriptionLike?: Maybe<Scalars['String']>;
	/** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
	exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of term ids to exclude along with all of their descendant terms. If
	 * $include is non-empty, $exclude_tree is ignored. Default empty array.
	 */
	excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
	hideEmpty?: Maybe<Scalars['Boolean']>;
	/** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
	hierarchical?: Maybe<Scalars['Boolean']>;
	/** Array of term ids to include. Default empty array. */
	include?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of names to return term(s) for. Default empty. */
	name?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Retrieve terms where the name is LIKE the input value. Default empty. */
	nameLike?: Maybe<Scalars['String']>;
	/** Array of object IDs. Results will be limited to terms associated with these objects. */
	objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Field(s) to order terms by. Defaults to 'name'. */
	orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
	/** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
	padCounts?: Maybe<Scalars['Boolean']>;
	/** Parent term ID to retrieve direct-child terms of. Default empty. */
	parent?: Maybe<Scalars['Int']>;
	/** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
	search?: Maybe<Scalars['String']>;
	/**
	 * Default false. If true, only the items connected to the source item will be
	 * returned. If false, all items will be returned regardless of connection to the source
	 */
	shouldOnlyIncludeConnectedItems?: Maybe<Scalars['Boolean']>;
	/**
	 * Default false. If true, the connection will be output in a flat list instead
	 * of the hierarchical list. So child terms will be output in the same level as
	 * the parent terms
	 */
	shouldOutputInFlatList?: Maybe<Scalars['Boolean']>;
	/** Array of slugs to return term(s) for. Default empty. */
	slug?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Array of term taxonomy IDs, to match when querying terms. */
	termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to prime meta caches for matched terms. Default true. */
	updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** The general setting type */
export type GeneralSettings = {
	__typename?: 'GeneralSettings';
	/** A date format for all date strings. */
	dateFormat?: Maybe<Scalars['String']>;
	/** Site tagline. */
	description?: Maybe<Scalars['String']>;
	/** This address is used for admin purposes, like new user notification. */
	email?: Maybe<Scalars['String']>;
	/** WordPress locale code. */
	language?: Maybe<Scalars['String']>;
	/** A day number of the week that the week should start on. */
	startOfWeek?: Maybe<Scalars['Int']>;
	/** A time format for all time strings. */
	timeFormat?: Maybe<Scalars['String']>;
	/** A city in the same timezone as you. */
	timezone?: Maybe<Scalars['String']>;
	/** Site title. */
	title?: Maybe<Scalars['String']>;
	/** Site URL. */
	url?: Maybe<Scalars['String']>;
};

/** File details for a Media Item */
export type MediaDetails = {
	__typename?: 'MediaDetails';
	/** The height of the mediaItem */
	file?: Maybe<Scalars['String']>;
	/** The height of the mediaItem */
	height?: Maybe<Scalars['Int']>;
	meta?: Maybe<MediaItemMeta>;
	/** The available sizes of the mediaItem */
	sizes?: Maybe<Array<Maybe<MediaSize>>>;
	/** The width of the mediaItem */
	width?: Maybe<Scalars['Int']>;
};

/** The mediaItem type */
export type MediaItem = Node & {
	__typename?: 'MediaItem';
	/** Alternative text to display when resource is not displayed */
	altText?: Maybe<Scalars['String']>;
	/** Ancestors of the object */
	ancestors?: Maybe<Array<Maybe<PostObjectUnion>>>;
	/** The author field will return a queryable User type matching the post&#039;s author. */
	author?: Maybe<User>;
	/** The caption for the resource */
	caption?: Maybe<Scalars['String']>;
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** Whether the comments are open or closed for this particular post. */
	commentStatus?: Maybe<Scalars['String']>;
	/** Connection between the mediaItem type and the mediaItem type */
	comments?: Maybe<MediaItemToCommentConnection>;
	/** The content of the post. */
	content?: Maybe<Scalars['String']>;
	/** Post publishing date. */
	date?: Maybe<Scalars['String']>;
	/** The publishing date set in GMT. */
	dateGmt?: Maybe<Scalars['String']>;
	/** Description of the image (stored as post_content) */
	description?: Maybe<Scalars['String']>;
	/** The desired slug of the post */
	desiredSlug?: Maybe<Scalars['String']>;
	/** The user that most recently edited the object */
	editLast?: Maybe<User>;
	/**
	 * If a user has edited the object within the past 15 seconds, this will return
	 * the user and the time they last edited. Null if the edit lock doesn&#039;t
	 * exist or is greater than 15 seconds
	 */
	editLock?: Maybe<EditLock>;
	/** The RSS enclosure for the object */
	enclosure?: Maybe<Scalars['String']>;
	/** The excerpt of the post. */
	excerpt?: Maybe<Scalars['String']>;
	/**
	 * The global unique identifier for this post. This currently matches the value
	 * stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot;
	 * database table.
	 */
	guid?: Maybe<Scalars['String']>;
	/** The globally unique identifier of the attachment object. */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** Whether the object is a revision */
	isRevision?: Maybe<Scalars['Boolean']>;
	/** The permalink of the post */
	link?: Maybe<Scalars['String']>;
	/** Details about the mediaItem */
	mediaDetails?: Maybe<MediaDetails>;
	/** The id field matches the WP_Post-&gt;ID field. */
	mediaItemId: Scalars['Int'];
	/** Url of the mediaItem */
	mediaItemUrl?: Maybe<Scalars['String']>;
	/** Type of resource */
	mediaType?: Maybe<Scalars['String']>;
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/** The mime type of the mediaItem */
	mimeType?: Maybe<Scalars['String']>;
	/**
	 * The local modified time for a post. If a post was recently updated the
	 * modified field will change to match the corresponding time.
	 */
	modified?: Maybe<Scalars['String']>;
	/**
	 * The GMT modified time for a post. If a post was recently updated the modified
	 * field will change to match the corresponding time in GMT.
	 */
	modifiedGmt?: Maybe<Scalars['String']>;
	/** The parent of the object. The parent object can be of various types */
	parent?: Maybe<PostObjectUnion>;
	/** Whether the pings are open or closed for this particular post. */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** The sizes attribute value for an image. */
	sizes?: Maybe<Scalars['String']>;
	/**
	 * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name
	 * field and the post_name column in the database for the
	 * &quot;post_objects&quot; table.
	 */
	slug?: Maybe<Scalars['String']>;
	/** Url of the mediaItem */
	sourceUrl?: Maybe<Scalars['String']>;
	/**
	 * The srcset attribute specifies the URL of the image to use in different
	 * situations. It is a comma separated string of urls and their widths.
	 */
	srcSet?: Maybe<Scalars['String']>;
	/** The current status of the object */
	status?: Maybe<Scalars['String']>;
	/** Terms connected to the mediaItem */
	termNames?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Terms connected to the mediaItem */
	termSlugs?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Terms connected to the mediaItem */
	terms?: Maybe<Array<Maybe<TermObjectUnion>>>;
	/** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** URI path for the resource */
	uri?: Maybe<Scalars['String']>;
};

/** The mediaItem type */
export type MediaItemAncestorsArgs = {
	types?: Maybe<Array<Maybe<PostTypeEnum>>>;
};

/** The mediaItem type */
export type MediaItemCaptionArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The mediaItem type */
export type MediaItemCommentsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<MediaItemToCommentConnectionWhereArgs>;
};

/** The mediaItem type */
export type MediaItemContentArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The mediaItem type */
export type MediaItemDescriptionArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The mediaItem type */
export type MediaItemExcerptArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The mediaItem type */
export type MediaItemSizesArgs = {
	size?: Maybe<MediaItemSizeEnum>;
};

/** The mediaItem type */
export type MediaItemSourceUrlArgs = {
	size?: Maybe<MediaItemSizeEnum>;
};

/** The mediaItem type */
export type MediaItemSrcSetArgs = {
	size?: Maybe<MediaItemSizeEnum>;
};

/** The mediaItem type */
export type MediaItemTermNamesArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The mediaItem type */
export type MediaItemTermSlugsArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The mediaItem type */
export type MediaItemTermsArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The mediaItem type */
export type MediaItemTitleArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** Meta connected to a MediaItem */
export type MediaItemMeta = {
	__typename?: 'MediaItemMeta';
	aperture?: Maybe<Scalars['Float']>;
	camera?: Maybe<Scalars['String']>;
	caption?: Maybe<Scalars['String']>;
	copyright?: Maybe<Scalars['String']>;
	createdTimestamp?: Maybe<Scalars['Int']>;
	credit?: Maybe<Scalars['String']>;
	focalLength?: Maybe<Scalars['Int']>;
	iso?: Maybe<Scalars['Int']>;
	keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
	orientation?: Maybe<Scalars['String']>;
	shutterSpeed?: Maybe<Scalars['Float']>;
	title?: Maybe<Scalars['String']>;
};

/** The size of the media item object. */
export enum MediaItemSizeEnum {
	/** MediaItem with the large size */
	Large = 'LARGE',
	/** MediaItem with the medium size */
	Medium = 'MEDIUM',
	/** MediaItem with the medium_large size */
	MediumLarge = 'MEDIUM_LARGE',
	/** MediaItem with the post-thumbnail size */
	PostThumbnail = 'POST_THUMBNAIL',
	/** MediaItem with the thumbnail size */
	Thumbnail = 'THUMBNAIL',
	/** MediaItem with the twentytwenty-fullscreen size */
	TwentytwentyFullscreen = 'TWENTYTWENTY_FULLSCREEN',
}

/** The status of the media item object. */
export enum MediaItemStatusEnum {
	/** Objects with the auto-draft status */
	AutoDraft = 'AUTO_DRAFT',
	/** Objects with the inherit status */
	Inherit = 'INHERIT',
	/** Objects with the private status */
	Private = 'PRIVATE',
	/** Objects with the trash status */
	Trash = 'TRASH',
}

/** Connection between the mediaItem type and the mediaItem type */
export type MediaItemToCommentConnection = {
	__typename?: 'MediaItemToCommentConnection';
	/** Edges for the MediaItemToCommentConnection connection */
	edges?: Maybe<Array<Maybe<MediaItemToCommentConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Comment>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type MediaItemToCommentConnectionEdge = {
	__typename?: 'MediaItemToCommentConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Comment>;
};

/** Arguments for filtering the MediaItemToCommentConnection connection */
export type MediaItemToCommentConnectionWhereArgs = {
	/** Comment author email address. */
	authorEmail?: Maybe<Scalars['String']>;
	/** Array of author IDs to include comments for. */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to exclude comments for. */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Comment author URL. */
	authorUrl?: Maybe<Scalars['String']>;
	/** Array of comment IDs to include. */
	commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of IDs of users whose unapproved comments will be returned by the
	 * 							query regardless of status.
	 */
	commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Include comments of a given type. */
	commentType?: Maybe<Scalars['String']>;
	/** Include comments from a given array of comment types. */
	commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Exclude comments from a given array of comment types. */
	commentTypeNotIn?: Maybe<Scalars['String']>;
	/** Content object author ID to limit results by. */
	contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to retrieve comments for. */
	contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs *not* to retrieve comments for. */
	contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Limit results to those affiliated with a given content object
	 * 							ID.
	 */
	contentId?: Maybe<Scalars['ID']>;
	/**
	 * Array of content object IDs to include affiliated comments
	 * 							for.
	 */
	contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of content object IDs to exclude affiliated comments
	 * 							for.
	 */
	contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Content object name to retrieve affiliated comments for. */
	contentName?: Maybe<Scalars['String']>;
	/** Content Object parent ID to retrieve affiliated comments for. */
	contentParent?: Maybe<Scalars['Int']>;
	/**
	 * Array of content object statuses to retrieve affiliated comments for.
	 * 							Pass 'any' to match any value.
	 */
	contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
	/** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
	contentType?: Maybe<Array<Maybe<PostTypeEnum>>>;
	/**
	 * Array of IDs or email addresses of users whose unapproved comments will be
	 * returned by the query regardless of $status. Default empty
	 */
	includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Karma score to retrieve matching comments for. */
	karma?: Maybe<Scalars['Int']>;
	/** The cardinality of the order of the connection */
	order?: Maybe<OrderEnum>;
	/** Field to order the comments by. */
	orderby?: Maybe<CommentsConnectionOrderbyEnum>;
	/** Parent ID of comment to retrieve children of. */
	parent?: Maybe<Scalars['Int']>;
	/** Array of parent IDs of comments to retrieve children for. */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of parent IDs of comments *not* to retrieve children
	 * 							for.
	 */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Search term(s) to retrieve matching comments for. */
	search?: Maybe<Scalars['String']>;
	/** Comment status to limit results by. */
	status?: Maybe<Scalars['String']>;
	/** Include comments for a specific user ID. */
	userId?: Maybe<Scalars['ID']>;
};

/** Details of an available size for a media item */
export type MediaSize = {
	__typename?: 'MediaSize';
	/** The file of the for the referenced size */
	file?: Maybe<Scalars['String']>;
	/** The height of the for the referenced size */
	height?: Maybe<Scalars['String']>;
	/** The mime type of the resource */
	mimeType?: Maybe<Scalars['String']>;
	/** The referenced size name */
	name?: Maybe<Scalars['String']>;
	/** The url of the for the referenced size */
	sourceUrl?: Maybe<Scalars['String']>;
	/** The width of the for the referenced size */
	width?: Maybe<Scalars['String']>;
};

/**
 * Menus are the containers for navigation items. Menus can be assigned to menu
 * locations, which are typically registered by the active theme.
 */
export type Menu = Node & {
	__typename?: 'Menu';
	/** The number of items in the menu */
	count?: Maybe<Scalars['Int']>;
	/** The globally unique identifier of the nav menu object. */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** WP ID of the nav menu. */
	menuId?: Maybe<Scalars['Int']>;
	/** Connection between the Menu type and the Menu type */
	menuItems?: Maybe<MenuToMenuItemConnection>;
	/** Display name of the menu. Equivalent to WP_Term-&gt;name. */
	name?: Maybe<Scalars['String']>;
	/** The url friendly name of the menu. Equivalent to WP_Term-&gt;slug */
	slug?: Maybe<Scalars['String']>;
};

/**
 * Menus are the containers for navigation items. Menus can be assigned to menu
 * locations, which are typically registered by the active theme.
 */
export type MenuMenuItemsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<MenuToMenuItemConnectionWhereArgs>;
};

/** Navigation menu items are the individual items assigned to a menu. These are rendered as the links in a navigation menu. */
export type MenuItem = Node & {
	__typename?: 'MenuItem';
	/** Connection between the MenuItem type and the MenuItem type */
	childItems?: Maybe<MenuItemToMenuItemConnection>;
	/** The object connected to this menu item. */
	connectedObject?: Maybe<MenuItemObjectUnion>;
	/** Class attribute for the menu item link */
	cssClasses?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Description of the menu item. */
	description?: Maybe<Scalars['String']>;
	/** The globally unique identifier of the nav menu item object. */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** Label or title of the menu item. */
	label?: Maybe<Scalars['String']>;
	/** Link relationship (XFN) of the menu item. */
	linkRelationship?: Maybe<Scalars['String']>;
	/** WP ID of the menu item. */
	menuItemId?: Maybe<Scalars['Int']>;
	/** Target attribute for the menu item link. */
	target?: Maybe<Scalars['String']>;
	/** Title attribute for the menu item link */
	title?: Maybe<Scalars['String']>;
	/** URL or destination of the menu item. */
	url?: Maybe<Scalars['String']>;
};

/** Navigation menu items are the individual items assigned to a menu. These are rendered as the links in a navigation menu. */
export type MenuItemChildItemsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<MenuItemToMenuItemConnectionWhereArgs>;
};

export type MenuItemObjectUnion = Post | Page | EspressoEvent | EspressoVenue | Category | Tag | MenuItem;

/** Connection between the MenuItem type and the MenuItem type */
export type MenuItemToMenuItemConnection = {
	__typename?: 'MenuItemToMenuItemConnection';
	/** Edges for the MenuItemToMenuItemConnection connection */
	edges?: Maybe<Array<Maybe<MenuItemToMenuItemConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<MenuItem>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type MenuItemToMenuItemConnectionEdge = {
	__typename?: 'MenuItemToMenuItemConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<MenuItem>;
};

/** Arguments for filtering the MenuItemToMenuItemConnection connection */
export type MenuItemToMenuItemConnectionWhereArgs = {
	/** The ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** The menu location for the menu being queried */
	location?: Maybe<MenuLocationEnum>;
};

/** Registered menu locations */
export enum MenuLocationEnum {
	Expanded = 'EXPANDED',
	Footer = 'FOOTER',
	Mobile = 'MOBILE',
	Primary = 'PRIMARY',
	Social = 'SOCIAL',
}

/** Connection between the Menu type and the Menu type */
export type MenuToMenuItemConnection = {
	__typename?: 'MenuToMenuItemConnection';
	/** Edges for the MenuToMenuItemConnection connection */
	edges?: Maybe<Array<Maybe<MenuToMenuItemConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<MenuItem>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type MenuToMenuItemConnectionEdge = {
	__typename?: 'MenuToMenuItemConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<MenuItem>;
};

/** Arguments for filtering the MenuToMenuItemConnection connection */
export type MenuToMenuItemConnectionWhereArgs = {
	/** The ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** The menu location for the menu being queried */
	location?: Maybe<MenuLocationEnum>;
};

/** The MimeType of the object */
export enum MimeTypeEnum {
	ApplicationJava = 'APPLICATION_JAVA',
	ApplicationMsword = 'APPLICATION_MSWORD',
	ApplicationOctetStream = 'APPLICATION_OCTET_STREAM',
	ApplicationOnenote = 'APPLICATION_ONENOTE',
	ApplicationOxps = 'APPLICATION_OXPS',
	ApplicationPdf = 'APPLICATION_PDF',
	ApplicationRar = 'APPLICATION_RAR',
	ApplicationRtf = 'APPLICATION_RTF',
	ApplicationTtafXml = 'APPLICATION_TTAF_XML',
	ApplicationVndAppleKeynote = 'APPLICATION_VND_APPLE_KEYNOTE',
	ApplicationVndAppleNumbers = 'APPLICATION_VND_APPLE_NUMBERS',
	ApplicationVndApplePages = 'APPLICATION_VND_APPLE_PAGES',
	ApplicationVndMsAccess = 'APPLICATION_VND_MS_ACCESS',
	ApplicationVndMsExcel = 'APPLICATION_VND_MS_EXCEL',
	ApplicationVndMsExcelAddinMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_ADDIN_MACROENABLED_12',
	ApplicationVndMsExcelSheetBinaryMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_SHEET_BINARY_MACROENABLED_12',
	ApplicationVndMsExcelSheetMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_SHEET_MACROENABLED_12',
	ApplicationVndMsExcelTemplateMacroenabled_12 = 'APPLICATION_VND_MS_EXCEL_TEMPLATE_MACROENABLED_12',
	ApplicationVndMsPowerpoint = 'APPLICATION_VND_MS_POWERPOINT',
	ApplicationVndMsPowerpointAddinMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_ADDIN_MACROENABLED_12',
	ApplicationVndMsPowerpointPresentationMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_PRESENTATION_MACROENABLED_12',
	ApplicationVndMsPowerpointSlideshowMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_SLIDESHOW_MACROENABLED_12',
	ApplicationVndMsPowerpointSlideMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_SLIDE_MACROENABLED_12',
	ApplicationVndMsPowerpointTemplateMacroenabled_12 = 'APPLICATION_VND_MS_POWERPOINT_TEMPLATE_MACROENABLED_12',
	ApplicationVndMsProject = 'APPLICATION_VND_MS_PROJECT',
	ApplicationVndMsWordDocumentMacroenabled_12 = 'APPLICATION_VND_MS_WORD_DOCUMENT_MACROENABLED_12',
	ApplicationVndMsWordTemplateMacroenabled_12 = 'APPLICATION_VND_MS_WORD_TEMPLATE_MACROENABLED_12',
	ApplicationVndMsWrite = 'APPLICATION_VND_MS_WRITE',
	ApplicationVndMsXpsdocument = 'APPLICATION_VND_MS_XPSDOCUMENT',
	ApplicationVndOasisOpendocumentChart = 'APPLICATION_VND_OASIS_OPENDOCUMENT_CHART',
	ApplicationVndOasisOpendocumentDatabase = 'APPLICATION_VND_OASIS_OPENDOCUMENT_DATABASE',
	ApplicationVndOasisOpendocumentFormula = 'APPLICATION_VND_OASIS_OPENDOCUMENT_FORMULA',
	ApplicationVndOasisOpendocumentGraphics = 'APPLICATION_VND_OASIS_OPENDOCUMENT_GRAPHICS',
	ApplicationVndOasisOpendocumentPresentation = 'APPLICATION_VND_OASIS_OPENDOCUMENT_PRESENTATION',
	ApplicationVndOasisOpendocumentSpreadsheet = 'APPLICATION_VND_OASIS_OPENDOCUMENT_SPREADSHEET',
	ApplicationVndOasisOpendocumentText = 'APPLICATION_VND_OASIS_OPENDOCUMENT_TEXT',
	ApplicationVndOpenxmlformatsOfficedocumentPresentationmlPresentation = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION',
	ApplicationVndOpenxmlformatsOfficedocumentPresentationmlSlide = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDE',
	ApplicationVndOpenxmlformatsOfficedocumentPresentationmlSlideshow = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDESHOW',
	ApplicationVndOpenxmlformatsOfficedocumentPresentationmlTemplate = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_TEMPLATE',
	ApplicationVndOpenxmlformatsOfficedocumentSpreadsheetmlSheet = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET',
	ApplicationVndOpenxmlformatsOfficedocumentSpreadsheetmlTemplate = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_TEMPLATE',
	ApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT',
	ApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlTemplate = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_TEMPLATE',
	ApplicationWordperfect = 'APPLICATION_WORDPERFECT',
	ApplicationX_7ZCompressed = 'APPLICATION_X_7Z_COMPRESSED',
	ApplicationXGzip = 'APPLICATION_X_GZIP',
	ApplicationXTar = 'APPLICATION_X_TAR',
	ApplicationZip = 'APPLICATION_ZIP',
	AudioAac = 'AUDIO_AAC',
	AudioFlac = 'AUDIO_FLAC',
	AudioMidi = 'AUDIO_MIDI',
	AudioMpeg = 'AUDIO_MPEG',
	AudioOgg = 'AUDIO_OGG',
	AudioWav = 'AUDIO_WAV',
	AudioXMatroska = 'AUDIO_X_MATROSKA',
	AudioXMsWax = 'AUDIO_X_MS_WAX',
	AudioXMsWma = 'AUDIO_X_MS_WMA',
	AudioXRealaudio = 'AUDIO_X_REALAUDIO',
	ImageBmp = 'IMAGE_BMP',
	ImageGif = 'IMAGE_GIF',
	ImageJpeg = 'IMAGE_JPEG',
	ImagePng = 'IMAGE_PNG',
	ImageTiff = 'IMAGE_TIFF',
	ImageXIcon = 'IMAGE_X_ICON',
	TextCalendar = 'TEXT_CALENDAR',
	TextCss = 'TEXT_CSS',
	TextCsv = 'TEXT_CSV',
	TextPlain = 'TEXT_PLAIN',
	TextRichtext = 'TEXT_RICHTEXT',
	TextTabSeparatedValues = 'TEXT_TAB_SEPARATED_VALUES',
	TextVtt = 'TEXT_VTT',
	Video_3Gpp = 'VIDEO_3GPP',
	Video_3Gpp2 = 'VIDEO_3GPP2',
	VideoAvi = 'VIDEO_AVI',
	VideoDivx = 'VIDEO_DIVX',
	VideoMp4 = 'VIDEO_MP4',
	VideoMpeg = 'VIDEO_MPEG',
	VideoOgg = 'VIDEO_OGG',
	VideoQuicktime = 'VIDEO_QUICKTIME',
	VideoWebm = 'VIDEO_WEBM',
	VideoXFlv = 'VIDEO_X_FLV',
	VideoXMatroska = 'VIDEO_X_MATROSKA',
	VideoXMsAsf = 'VIDEO_X_MS_ASF',
	VideoXMsWm = 'VIDEO_X_MS_WM',
	VideoXMsWmv = 'VIDEO_X_MS_WMV',
	VideoXMsWmx = 'VIDEO_X_MS_WMX',
}

/** An object with an ID */
export type Node = {
	/** The globally unique ID for the object */
	id: Scalars['ID'];
};

/** The cardinality of the connection order */
export enum OrderEnum {
	Asc = 'ASC',
	Desc = 'DESC',
}

/** The page type */
export type Page = Node & {
	__typename?: 'Page';
	/** Ancestors of the object */
	ancestors?: Maybe<Array<Maybe<PostObjectUnion>>>;
	/** The author field will return a queryable User type matching the post&#039;s author. */
	author?: Maybe<User>;
	/** Connection between the page type and the page type */
	childPages?: Maybe<PageToPageConnection>;
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** Whether the comments are open or closed for this particular post. */
	commentStatus?: Maybe<Scalars['String']>;
	/** Connection between the page type and the page type */
	comments?: Maybe<PageToCommentConnection>;
	/** The content of the post. */
	content?: Maybe<Scalars['String']>;
	/** Post publishing date. */
	date?: Maybe<Scalars['String']>;
	/** The publishing date set in GMT. */
	dateGmt?: Maybe<Scalars['String']>;
	/** The desired slug of the post */
	desiredSlug?: Maybe<Scalars['String']>;
	/** The user that most recently edited the object */
	editLast?: Maybe<User>;
	/**
	 * If a user has edited the object within the past 15 seconds, this will return
	 * the user and the time they last edited. Null if the edit lock doesn&#039;t
	 * exist or is greater than 15 seconds
	 */
	editLock?: Maybe<EditLock>;
	/** The RSS enclosure for the object */
	enclosure?: Maybe<Scalars['String']>;
	/** The excerpt of the post. */
	excerpt?: Maybe<Scalars['String']>;
	/** The featured image for the object */
	featuredImage?: Maybe<MediaItem>;
	/**
	 * The global unique identifier for this post. This currently matches the value
	 * stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot;
	 * database table.
	 */
	guid?: Maybe<Scalars['String']>;
	/** The globally unique identifier of the page object. */
	id: Scalars['ID'];
	/** Whether this page is set to the static front page. */
	isFrontPage: Scalars['Boolean'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** Whether the object is a revision */
	isRevision?: Maybe<Scalars['Boolean']>;
	/** The permalink of the post */
	link?: Maybe<Scalars['String']>;
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/**
	 * The local modified time for a post. If a post was recently updated the
	 * modified field will change to match the corresponding time.
	 */
	modified?: Maybe<Scalars['String']>;
	/**
	 * The GMT modified time for a post. If a post was recently updated the modified
	 * field will change to match the corresponding time in GMT.
	 */
	modifiedGmt?: Maybe<Scalars['String']>;
	/** The id field matches the WP_Post-&gt;ID field. */
	pageId: Scalars['Int'];
	/** The parent of the object. The parent object can be of various types */
	parent?: Maybe<PostObjectUnion>;
	/** Whether the pings are open or closed for this particular post. */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Connection between the page type and the page type */
	revisions?: Maybe<PageToPageConnection>;
	/**
	 * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name
	 * field and the post_name column in the database for the
	 * &quot;post_objects&quot; table.
	 */
	slug?: Maybe<Scalars['String']>;
	/** The current status of the object */
	status?: Maybe<Scalars['String']>;
	/** Terms connected to the page */
	termNames?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Terms connected to the page */
	termSlugs?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Terms connected to the page */
	terms?: Maybe<Array<Maybe<TermObjectUnion>>>;
	/** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** URI path for the resource */
	uri?: Maybe<Scalars['String']>;
};

/** The page type */
export type PageAncestorsArgs = {
	types?: Maybe<Array<Maybe<PostTypeEnum>>>;
};

/** The page type */
export type PageChildPagesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<PageToPageConnectionWhereArgs>;
};

/** The page type */
export type PageCommentsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<PageToCommentConnectionWhereArgs>;
};

/** The page type */
export type PageContentArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The page type */
export type PageExcerptArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The page type */
export type PageRevisionsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<PageToPageConnectionWhereArgs>;
};

/** The page type */
export type PageTermNamesArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The page type */
export type PageTermSlugsArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The page type */
export type PageTermsArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The page type */
export type PageTitleArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** Connection between the page type and the page type */
export type PageToCommentConnection = {
	__typename?: 'PageToCommentConnection';
	/** Edges for the PageToCommentConnection connection */
	edges?: Maybe<Array<Maybe<PageToCommentConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Comment>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type PageToCommentConnectionEdge = {
	__typename?: 'PageToCommentConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Comment>;
};

/** Arguments for filtering the PageToCommentConnection connection */
export type PageToCommentConnectionWhereArgs = {
	/** Comment author email address. */
	authorEmail?: Maybe<Scalars['String']>;
	/** Array of author IDs to include comments for. */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to exclude comments for. */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Comment author URL. */
	authorUrl?: Maybe<Scalars['String']>;
	/** Array of comment IDs to include. */
	commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of IDs of users whose unapproved comments will be returned by the
	 * 							query regardless of status.
	 */
	commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Include comments of a given type. */
	commentType?: Maybe<Scalars['String']>;
	/** Include comments from a given array of comment types. */
	commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Exclude comments from a given array of comment types. */
	commentTypeNotIn?: Maybe<Scalars['String']>;
	/** Content object author ID to limit results by. */
	contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to retrieve comments for. */
	contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs *not* to retrieve comments for. */
	contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Limit results to those affiliated with a given content object
	 * 							ID.
	 */
	contentId?: Maybe<Scalars['ID']>;
	/**
	 * Array of content object IDs to include affiliated comments
	 * 							for.
	 */
	contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of content object IDs to exclude affiliated comments
	 * 							for.
	 */
	contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Content object name to retrieve affiliated comments for. */
	contentName?: Maybe<Scalars['String']>;
	/** Content Object parent ID to retrieve affiliated comments for. */
	contentParent?: Maybe<Scalars['Int']>;
	/**
	 * Array of content object statuses to retrieve affiliated comments for.
	 * 							Pass 'any' to match any value.
	 */
	contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
	/** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
	contentType?: Maybe<Array<Maybe<PostTypeEnum>>>;
	/**
	 * Array of IDs or email addresses of users whose unapproved comments will be
	 * returned by the query regardless of $status. Default empty
	 */
	includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Karma score to retrieve matching comments for. */
	karma?: Maybe<Scalars['Int']>;
	/** The cardinality of the order of the connection */
	order?: Maybe<OrderEnum>;
	/** Field to order the comments by. */
	orderby?: Maybe<CommentsConnectionOrderbyEnum>;
	/** Parent ID of comment to retrieve children of. */
	parent?: Maybe<Scalars['Int']>;
	/** Array of parent IDs of comments to retrieve children for. */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of parent IDs of comments *not* to retrieve children
	 * 							for.
	 */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Search term(s) to retrieve matching comments for. */
	search?: Maybe<Scalars['String']>;
	/** Comment status to limit results by. */
	status?: Maybe<Scalars['String']>;
	/** Include comments for a specific user ID. */
	userId?: Maybe<Scalars['ID']>;
};

/** Connection between the page type and the page type */
export type PageToPageConnection = {
	__typename?: 'PageToPageConnection';
	/** Edges for the PageToPageConnection connection */
	edges?: Maybe<Array<Maybe<PageToPageConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Page>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type PageToPageConnectionEdge = {
	__typename?: 'PageToPageConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Page>;
};

/** Arguments for filtering the PageToPageConnection connection */
export type PageToPageConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** An plugin object */
export type Plugin = Node & {
	__typename?: 'Plugin';
	/** Name of the plugin author(s), may also be a company name. */
	author?: Maybe<Scalars['String']>;
	/** URI for the related author(s)/company website. */
	authorUri?: Maybe<Scalars['String']>;
	/** Description of the plugin. */
	description?: Maybe<Scalars['String']>;
	/** The globally unique identifier of the plugin object. */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** Display name of the plugin. */
	name?: Maybe<Scalars['String']>;
	/** URI for the plugin website. This is useful for directing users for support requests etc. */
	pluginUri?: Maybe<Scalars['String']>;
	/** Current version of the plugin. */
	version?: Maybe<Scalars['String']>;
};

/** The post type */
export type Post = Node & {
	__typename?: 'Post';
	/** Ancestors of the object */
	ancestors?: Maybe<Array<Maybe<PostObjectUnion>>>;
	/** The author field will return a queryable User type matching the post&#039;s author. */
	author?: Maybe<User>;
	/** Connection between the post type and the post type */
	categories?: Maybe<PostToCategoryConnection>;
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** Whether the comments are open or closed for this particular post. */
	commentStatus?: Maybe<Scalars['String']>;
	/** Connection between the post type and the post type */
	comments?: Maybe<PostToCommentConnection>;
	/** The content of the post. */
	content?: Maybe<Scalars['String']>;
	/** Post publishing date. */
	date?: Maybe<Scalars['String']>;
	/** The publishing date set in GMT. */
	dateGmt?: Maybe<Scalars['String']>;
	/** The desired slug of the post */
	desiredSlug?: Maybe<Scalars['String']>;
	/** The user that most recently edited the object */
	editLast?: Maybe<User>;
	/**
	 * If a user has edited the object within the past 15 seconds, this will return
	 * the user and the time they last edited. Null if the edit lock doesn&#039;t
	 * exist or is greater than 15 seconds
	 */
	editLock?: Maybe<EditLock>;
	/** The RSS enclosure for the object */
	enclosure?: Maybe<Scalars['String']>;
	/** The excerpt of the post. */
	excerpt?: Maybe<Scalars['String']>;
	/** The featured image for the object */
	featuredImage?: Maybe<MediaItem>;
	/**
	 * The global unique identifier for this post. This currently matches the value
	 * stored in WP_Post-&gt;guid and the guid column in the &quot;post_objects&quot;
	 * database table.
	 */
	guid?: Maybe<Scalars['String']>;
	/** The globally unique identifier of the post object. */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** Whether the object is a revision */
	isRevision?: Maybe<Scalars['Boolean']>;
	/** The permalink of the post */
	link?: Maybe<Scalars['String']>;
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/**
	 * The local modified time for a post. If a post was recently updated the
	 * modified field will change to match the corresponding time.
	 */
	modified?: Maybe<Scalars['String']>;
	/**
	 * The GMT modified time for a post. If a post was recently updated the modified
	 * field will change to match the corresponding time in GMT.
	 */
	modifiedGmt?: Maybe<Scalars['String']>;
	/** The parent of the object. The parent object can be of various types */
	parent?: Maybe<PostObjectUnion>;
	/** Whether the pings are open or closed for this particular post. */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** The id field matches the WP_Post-&gt;ID field. */
	postId: Scalars['Int'];
	/** Connection between the post type and the post type */
	revisions?: Maybe<PostToPostConnection>;
	/**
	 * The uri slug for the post. This is equivalent to the WP_Post-&gt;post_name
	 * field and the post_name column in the database for the
	 * &quot;post_objects&quot; table.
	 */
	slug?: Maybe<Scalars['String']>;
	/** The current status of the object */
	status?: Maybe<Scalars['String']>;
	/** Connection between the post type and the post type */
	tags?: Maybe<PostToTagConnection>;
	/** Terms connected to the post */
	termNames?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Terms connected to the post */
	termSlugs?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Terms connected to the post */
	terms?: Maybe<Array<Maybe<TermObjectUnion>>>;
	/** The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made. */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** URI path for the resource */
	uri?: Maybe<Scalars['String']>;
};

/** The post type */
export type PostAncestorsArgs = {
	types?: Maybe<Array<Maybe<PostTypeEnum>>>;
};

/** The post type */
export type PostCategoriesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<PostToCategoryConnectionWhereArgs>;
};

/** The post type */
export type PostCommentsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<PostToCommentConnectionWhereArgs>;
};

/** The post type */
export type PostContentArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The post type */
export type PostExcerptArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** The post type */
export type PostRevisionsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<PostToPostConnectionWhereArgs>;
};

/** The post type */
export type PostTagsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<PostToTagConnectionWhereArgs>;
};

/** The post type */
export type PostTermNamesArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The post type */
export type PostTermSlugsArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The post type */
export type PostTermsArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** The post type */
export type PostTitleArgs = {
	format?: Maybe<PostObjectFieldFormatEnum>;
};

/** Set relationships between the post to categories */
export type PostCategoriesInput = {
	/**
	 * If true, this will append the category to existing related categories. If
	 * false, this will replace existing relationships. Default true.
	 */
	append?: Maybe<Scalars['Boolean']>;
	nodes?: Maybe<Array<Maybe<PostCategoriesNodeInput>>>;
};

/**
 * List of categories to connect the post to. If an ID is set, it will be used to
 * create the connection. If not, it will look for a slug. If neither are valid
 * existing terms, and the site is configured to allow terms to be created during
 * post mutations, a term will be created using the Name if it exists in the input,
 * then fallback to the slug if it exists.
 */
export type PostCategoriesNodeInput = {
	/**
	 * The description of the category. This field is used to set a description of
	 * the category if a new one is created during the mutation.
	 */
	description?: Maybe<Scalars['String']>;
	/**
	 * The ID of the category. If present, this will be used to connect to the post.
	 * If no existing category exists with this ID, no connection will be made.
	 */
	id?: Maybe<Scalars['ID']>;
	/**
	 * The name of the category. This field is used to create a new term, if term
	 * creation is enabled in nested mutations, and if one does not already exist
	 * with the provided slug or ID or if a slug or ID is not provided. If no name is
	 * included and a term is created, the creation will fallback to the slug field.
	 */
	name?: Maybe<Scalars['String']>;
	/**
	 * The slug of the category. If no ID is present, this field will be used to make
	 * a connection. If no existing term exists with this slug, this field will be
	 * used as a fallback to the Name field when creating a new term to connect to,
	 * if term creation is enabled as a nested mutation.
	 */
	slug?: Maybe<Scalars['String']>;
};

/** The format of post field data. */
export enum PostObjectFieldFormatEnum {
	/** Provide the field value directly from database */
	Raw = 'RAW',
	/** Apply the default WordPress rendering */
	Rendered = 'RENDERED',
}

/** The column to use when filtering by date */
export enum PostObjectsConnectionDateColumnEnum {
	Date = 'DATE',
	Modified = 'MODIFIED',
}

/** Field to order the connection by */
export enum PostObjectsConnectionOrderbyEnum {
	/** Order by author */
	Author = 'AUTHOR',
	/** Order by publish date */
	Date = 'DATE',
	/** Preserve the ID order given in the IN array */
	In = 'IN',
	/** Order by the menu order value */
	MenuOrder = 'MENU_ORDER',
	/** Order by last modified date */
	Modified = 'MODIFIED',
	/** Preserve slug order given in the NAME_IN array */
	NameIn = 'NAME_IN',
	/** Order by parent ID */
	Parent = 'PARENT',
	/** Order by slug */
	Slug = 'SLUG',
	/** Order by title */
	Title = 'TITLE',
}

/** Options for ordering the connection */
export type PostObjectsConnectionOrderbyInput = {
	field: PostObjectsConnectionOrderbyEnum;
	order?: Maybe<OrderEnum>;
};

export type PostObjectUnion = Post | Page | MediaItem | EspressoEvent | EspressoVenue;

/** The status of the object. */
export enum PostStatusEnum {
	/** Objects with the auto-draft status */
	AutoDraft = 'AUTO_DRAFT',
	/** Objects with the cancelled status */
	Cancelled = 'CANCELLED',
	/** Objects with the draft status */
	Draft = 'DRAFT',
	/** Objects with the future status */
	Future = 'FUTURE',
	/** Objects with the inherit status */
	Inherit = 'INHERIT',
	/** Objects with the pending status */
	Pending = 'PENDING',
	/** Objects with the postponed status */
	Postponed = 'POSTPONED',
	/** Objects with the private status */
	Private = 'PRIVATE',
	/** Objects with the publish status */
	Publish = 'PUBLISH',
	/** Objects with the request-completed status */
	RequestCompleted = 'REQUEST_COMPLETED',
	/** Objects with the request-confirmed status */
	RequestConfirmed = 'REQUEST_CONFIRMED',
	/** Objects with the request-failed status */
	RequestFailed = 'REQUEST_FAILED',
	/** Objects with the request-pending status */
	RequestPending = 'REQUEST_PENDING',
	/** Objects with the sold_out status */
	SoldOut = 'SOLD_OUT',
	/** Objects with the trash status */
	Trash = 'TRASH',
}

/** Set relationships between the post to tags */
export type PostTagsInput = {
	/**
	 * If true, this will append the tag to existing related tags. If false, this
	 * will replace existing relationships. Default true.
	 */
	append?: Maybe<Scalars['Boolean']>;
	nodes?: Maybe<Array<Maybe<PostTagsNodeInput>>>;
};

/**
 * List of tags to connect the post to. If an ID is set, it will be used to create
 * the connection. If not, it will look for a slug. If neither are valid existing
 * terms, and the site is configured to allow terms to be created during post
 * mutations, a term will be created using the Name if it exists in the input, then
 * fallback to the slug if it exists.
 */
export type PostTagsNodeInput = {
	/**
	 * The description of the tag. This field is used to set a description of the tag
	 * if a new one is created during the mutation.
	 */
	description?: Maybe<Scalars['String']>;
	/**
	 * The ID of the tag. If present, this will be used to connect to the post. If no
	 * existing tag exists with this ID, no connection will be made.
	 */
	id?: Maybe<Scalars['ID']>;
	/**
	 * The name of the tag. This field is used to create a new term, if term creation
	 * is enabled in nested mutations, and if one does not already exist with the
	 * provided slug or ID or if a slug or ID is not provided. If no name is included
	 * and a term is created, the creation will fallback to the slug field.
	 */
	name?: Maybe<Scalars['String']>;
	/**
	 * The slug of the tag. If no ID is present, this field will be used to make a
	 * connection. If no existing term exists with this slug, this field will be used
	 * as a fallback to the Name field when creating a new term to connect to, if
	 * term creation is enabled as a nested mutation.
	 */
	slug?: Maybe<Scalars['String']>;
};

/** Connection between the post type and the post type */
export type PostToCategoryConnection = {
	__typename?: 'PostToCategoryConnection';
	/** Edges for the PostToCategoryConnection connection */
	edges?: Maybe<Array<Maybe<PostToCategoryConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Category>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	taxonomyInfo?: Maybe<Taxonomy>;
};

/** An edge in a connection */
export type PostToCategoryConnectionEdge = {
	__typename?: 'PostToCategoryConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Category>;
};

/** Arguments for filtering the PostToCategoryConnection connection */
export type PostToCategoryConnectionWhereArgs = {
	/** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
	cacheDomain?: Maybe<Scalars['String']>;
	/** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
	childOf?: Maybe<Scalars['Int']>;
	/**
	 * True to limit results to terms that have no children. This parameter has no
	 * effect on non-hierarchical taxonomies. Default false.
	 */
	childless?: Maybe<Scalars['Boolean']>;
	/** Retrieve terms where the description is LIKE the input value. Default empty. */
	descriptionLike?: Maybe<Scalars['String']>;
	/** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
	exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of term ids to exclude along with all of their descendant terms. If
	 * $include is non-empty, $exclude_tree is ignored. Default empty array.
	 */
	excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
	hideEmpty?: Maybe<Scalars['Boolean']>;
	/** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
	hierarchical?: Maybe<Scalars['Boolean']>;
	/** Array of term ids to include. Default empty array. */
	include?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of names to return term(s) for. Default empty. */
	name?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Retrieve terms where the name is LIKE the input value. Default empty. */
	nameLike?: Maybe<Scalars['String']>;
	/** Array of object IDs. Results will be limited to terms associated with these objects. */
	objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Field(s) to order terms by. Defaults to 'name'. */
	orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
	/** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
	padCounts?: Maybe<Scalars['Boolean']>;
	/** Parent term ID to retrieve direct-child terms of. Default empty. */
	parent?: Maybe<Scalars['Int']>;
	/** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
	search?: Maybe<Scalars['String']>;
	/**
	 * Default false. If true, only the items connected to the source item will be
	 * returned. If false, all items will be returned regardless of connection to the source
	 */
	shouldOnlyIncludeConnectedItems?: Maybe<Scalars['Boolean']>;
	/**
	 * Default false. If true, the connection will be output in a flat list instead
	 * of the hierarchical list. So child terms will be output in the same level as
	 * the parent terms
	 */
	shouldOutputInFlatList?: Maybe<Scalars['Boolean']>;
	/** Array of slugs to return term(s) for. Default empty. */
	slug?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Array of term taxonomy IDs, to match when querying terms. */
	termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to prime meta caches for matched terms. Default true. */
	updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the post type and the post type */
export type PostToCommentConnection = {
	__typename?: 'PostToCommentConnection';
	/** Edges for the PostToCommentConnection connection */
	edges?: Maybe<Array<Maybe<PostToCommentConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Comment>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type PostToCommentConnectionEdge = {
	__typename?: 'PostToCommentConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Comment>;
};

/** Arguments for filtering the PostToCommentConnection connection */
export type PostToCommentConnectionWhereArgs = {
	/** Comment author email address. */
	authorEmail?: Maybe<Scalars['String']>;
	/** Array of author IDs to include comments for. */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to exclude comments for. */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Comment author URL. */
	authorUrl?: Maybe<Scalars['String']>;
	/** Array of comment IDs to include. */
	commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of IDs of users whose unapproved comments will be returned by the
	 * 							query regardless of status.
	 */
	commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Include comments of a given type. */
	commentType?: Maybe<Scalars['String']>;
	/** Include comments from a given array of comment types. */
	commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Exclude comments from a given array of comment types. */
	commentTypeNotIn?: Maybe<Scalars['String']>;
	/** Content object author ID to limit results by. */
	contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to retrieve comments for. */
	contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs *not* to retrieve comments for. */
	contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Limit results to those affiliated with a given content object
	 * 							ID.
	 */
	contentId?: Maybe<Scalars['ID']>;
	/**
	 * Array of content object IDs to include affiliated comments
	 * 							for.
	 */
	contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of content object IDs to exclude affiliated comments
	 * 							for.
	 */
	contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Content object name to retrieve affiliated comments for. */
	contentName?: Maybe<Scalars['String']>;
	/** Content Object parent ID to retrieve affiliated comments for. */
	contentParent?: Maybe<Scalars['Int']>;
	/**
	 * Array of content object statuses to retrieve affiliated comments for.
	 * 							Pass 'any' to match any value.
	 */
	contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
	/** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
	contentType?: Maybe<Array<Maybe<PostTypeEnum>>>;
	/**
	 * Array of IDs or email addresses of users whose unapproved comments will be
	 * returned by the query regardless of $status. Default empty
	 */
	includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Karma score to retrieve matching comments for. */
	karma?: Maybe<Scalars['Int']>;
	/** The cardinality of the order of the connection */
	order?: Maybe<OrderEnum>;
	/** Field to order the comments by. */
	orderby?: Maybe<CommentsConnectionOrderbyEnum>;
	/** Parent ID of comment to retrieve children of. */
	parent?: Maybe<Scalars['Int']>;
	/** Array of parent IDs of comments to retrieve children for. */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of parent IDs of comments *not* to retrieve children
	 * 							for.
	 */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Search term(s) to retrieve matching comments for. */
	search?: Maybe<Scalars['String']>;
	/** Comment status to limit results by. */
	status?: Maybe<Scalars['String']>;
	/** Include comments for a specific user ID. */
	userId?: Maybe<Scalars['ID']>;
};

/** Connection between the post type and the post type */
export type PostToPostConnection = {
	__typename?: 'PostToPostConnection';
	/** Edges for the PostToPostConnection connection */
	edges?: Maybe<Array<Maybe<PostToPostConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Post>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type PostToPostConnectionEdge = {
	__typename?: 'PostToPostConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Post>;
};

/** Arguments for filtering the PostToPostConnection connection */
export type PostToPostConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the post type and the post type */
export type PostToTagConnection = {
	__typename?: 'PostToTagConnection';
	/** Edges for the PostToTagConnection connection */
	edges?: Maybe<Array<Maybe<PostToTagConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Tag>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	taxonomyInfo?: Maybe<Taxonomy>;
};

/** An edge in a connection */
export type PostToTagConnectionEdge = {
	__typename?: 'PostToTagConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Tag>;
};

/** Arguments for filtering the PostToTagConnection connection */
export type PostToTagConnectionWhereArgs = {
	/** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
	cacheDomain?: Maybe<Scalars['String']>;
	/** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
	childOf?: Maybe<Scalars['Int']>;
	/**
	 * True to limit results to terms that have no children. This parameter has no
	 * effect on non-hierarchical taxonomies. Default false.
	 */
	childless?: Maybe<Scalars['Boolean']>;
	/** Retrieve terms where the description is LIKE the input value. Default empty. */
	descriptionLike?: Maybe<Scalars['String']>;
	/** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
	exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of term ids to exclude along with all of their descendant terms. If
	 * $include is non-empty, $exclude_tree is ignored. Default empty array.
	 */
	excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
	hideEmpty?: Maybe<Scalars['Boolean']>;
	/** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
	hierarchical?: Maybe<Scalars['Boolean']>;
	/** Array of term ids to include. Default empty array. */
	include?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of names to return term(s) for. Default empty. */
	name?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Retrieve terms where the name is LIKE the input value. Default empty. */
	nameLike?: Maybe<Scalars['String']>;
	/** Array of object IDs. Results will be limited to terms associated with these objects. */
	objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Field(s) to order terms by. Defaults to 'name'. */
	orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
	/** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
	padCounts?: Maybe<Scalars['Boolean']>;
	/** Parent term ID to retrieve direct-child terms of. Default empty. */
	parent?: Maybe<Scalars['Int']>;
	/** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
	search?: Maybe<Scalars['String']>;
	/**
	 * Default false. If true, only the items connected to the source item will be
	 * returned. If false, all items will be returned regardless of connection to the source
	 */
	shouldOnlyIncludeConnectedItems?: Maybe<Scalars['Boolean']>;
	/**
	 * Default false. If true, the connection will be output in a flat list instead
	 * of the hierarchical list. So child terms will be output in the same level as
	 * the parent terms
	 */
	shouldOutputInFlatList?: Maybe<Scalars['Boolean']>;
	/** Array of slugs to return term(s) for. Default empty. */
	slug?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Array of term taxonomy IDs, to match when querying terms. */
	termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to prime meta caches for matched terms. Default true. */
	updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** An Post Type object */
export type PostType = Node & {
	__typename?: 'PostType';
	/** Whether this content type should can be exported. */
	canExport?: Maybe<Scalars['Boolean']>;
	/** List of Taxonomies connected to the Post Type */
	connectedTaxonomies?: Maybe<Array<Maybe<Taxonomy>>>;
	/** A list of Taxonomies associated with the post type */
	connectedTaxonomyNames?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Whether delete this type of content when the author of it is deleted from the system. */
	deleteWithUser?: Maybe<Scalars['Boolean']>;
	/** Description of the content type. */
	description?: Maybe<Scalars['String']>;
	/** Whether to exclude posts with this post type from front end search results. */
	excludeFromSearch?: Maybe<Scalars['Boolean']>;
	/** The plural name of the post type within the GraphQL Schema. */
	graphqlPluralName?: Maybe<Scalars['String']>;
	/** The singular name of the post type within the GraphQL Schema. */
	graphqlSingleName?: Maybe<Scalars['String']>;
	/** Whether this content type should have archives. Content archives are generated by type and by date. */
	hasArchive?: Maybe<Scalars['Boolean']>;
	/** Whether the post type is hierarchical, for example pages. */
	hierarchical?: Maybe<Scalars['Boolean']>;
	/** The globally unique identifier of the post-type object. */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** Display name of the content type. */
	label?: Maybe<Scalars['String']>;
	/** Details about the post type labels. */
	labels?: Maybe<PostTypeLabelDetails>;
	/** The name of the icon file to display as a menu icon. */
	menuIcon?: Maybe<Scalars['String']>;
	/** The position of this post type in the menu. Only applies if show_in_menu is true. */
	menuPosition?: Maybe<Scalars['Int']>;
	/** The internal name of the post type. This should not be used for display purposes. */
	name?: Maybe<Scalars['String']>;
	/**
	 * Whether a post type is intended for use publicly either via the admin
	 * interface or by front-end users. While the default settings of
	 * exclude_from_search, publicly_queryable, show_ui, and show_in_nav_menus are
	 * inherited from public, each does not rely on this relationship and controls a
	 * very specific intention.
	 */
	public?: Maybe<Scalars['Boolean']>;
	/** Whether queries can be performed on the front end for the post type as part of parse_request(). */
	publiclyQueryable?: Maybe<Scalars['Boolean']>;
	/** Name of content type to diplay in REST API &quot;wp/v2&quot; namespace. */
	restBase?: Maybe<Scalars['String']>;
	/** The REST Controller class assigned to handling this content type. */
	restControllerClass?: Maybe<Scalars['String']>;
	/** Makes this post type available via the admin bar. */
	showInAdminBar?: Maybe<Scalars['Boolean']>;
	/** Whether to add the post type to the GraphQL Schema. */
	showInGraphql?: Maybe<Scalars['Boolean']>;
	/**
	 * Where to show the post type in the admin menu. To work, $show_ui must be true.
	 * If true, the post type is shown in its own top level menu. If false, no menu
	 * is shown. If a string of an existing top level menu (eg. &quot;tools.php&quot;
	 * or &quot;edit.php?post_type=page&quot;), the post type will be placed as a
	 * sub-menu of that.
	 */
	showInMenu?: Maybe<Scalars['Boolean']>;
	/** Makes this post type available for selection in navigation menus. */
	showInNavMenus?: Maybe<Scalars['Boolean']>;
	/** Whether to add the post type route in the REST API &quot;wp/v2&quot; namespace. */
	showInRest?: Maybe<Scalars['Boolean']>;
	/** Whether to generate and allow a UI for managing this post type in the admin. */
	showUi?: Maybe<Scalars['Boolean']>;
};

/** An Post Type object */
export type PostTypeConnectedTaxonomiesArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** An Post Type object */
export type PostTypeConnectedTaxonomyNamesArgs = {
	taxonomies?: Maybe<Array<Maybe<TaxonomyEnum>>>;
};

/** Allowed Post Types */
export enum PostTypeEnum {
	Attachment = 'ATTACHMENT',
	EspressoEvents = 'ESPRESSO_EVENTS',
	EspressoVenues = 'ESPRESSO_VENUES',
	Page = 'PAGE',
	Post = 'POST',
}

/** Details for labels of the PostType */
export type PostTypeLabelDetails = {
	__typename?: 'PostTypeLabelDetails';
	/** Default is ‘Add New’ for both hierarchical and non-hierarchical types. */
	addNew?: Maybe<Scalars['String']>;
	/** Label for adding a new singular item. */
	addNewItem?: Maybe<Scalars['String']>;
	/** Label to signify all items in a submenu link. */
	allItems?: Maybe<Scalars['String']>;
	/** Label for archives in nav menus */
	archives?: Maybe<Scalars['String']>;
	/** Label for the attributes meta box. */
	attributes?: Maybe<Scalars['String']>;
	/** Label for editing a singular item. */
	editItem?: Maybe<Scalars['String']>;
	/** Label for the Featured Image meta box title. */
	featuredImage?: Maybe<Scalars['String']>;
	/** Label for the table views hidden heading. */
	filterItemsList?: Maybe<Scalars['String']>;
	/** Label for the media frame button. */
	insertIntoItem?: Maybe<Scalars['String']>;
	/** Label for the table hidden heading. */
	itemsList?: Maybe<Scalars['String']>;
	/** Label for the table pagination hidden heading. */
	itemsListNavigation?: Maybe<Scalars['String']>;
	/** Label for the menu name. */
	menuName?: Maybe<Scalars['String']>;
	/** General name for the post type, usually plural. */
	name?: Maybe<Scalars['String']>;
	/** Label for the new item page title. */
	newItem?: Maybe<Scalars['String']>;
	/** Label used when no items are found. */
	notFound?: Maybe<Scalars['String']>;
	/** Label used when no items are in the trash. */
	notFoundInTrash?: Maybe<Scalars['String']>;
	/** Label used to prefix parents of hierarchical items. */
	parentItemColon?: Maybe<Scalars['String']>;
	/** Label for removing the featured image. */
	removeFeaturedImage?: Maybe<Scalars['String']>;
	/** Label for searching plural items. */
	searchItems?: Maybe<Scalars['String']>;
	/** Label for setting the featured image. */
	setFeaturedImage?: Maybe<Scalars['String']>;
	/** Name for one object of this post type. */
	singularName?: Maybe<Scalars['String']>;
	/** Label for the media frame filter. */
	uploadedToThisItem?: Maybe<Scalars['String']>;
	/** Label in the media frame for using a featured image. */
	useFeaturedImage?: Maybe<Scalars['String']>;
	/** Label for viewing a singular item. */
	viewItem?: Maybe<Scalars['String']>;
	/** Label for viewing post type archives. */
	viewItems?: Maybe<Scalars['String']>;
};

/** The reading setting type */
export type ReadingSettings = {
	__typename?: 'ReadingSettings';
	/** Blog pages show at most. */
	postsPerPage?: Maybe<Scalars['Int']>;
};

/** Input for the registerUser mutation */
export type RegisterUserInput = {
	/** User's AOL IM account. */
	aim?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/** A string containing content about the user. */
	description?: Maybe<Scalars['String']>;
	/**
	 * A string that will be shown on the site. Defaults to user's username. It is
	 * likely that you will want to change this, for both appearance and security
	 * through obscurity (that is if you dont use and delete the default admin user).
	 */
	displayName?: Maybe<Scalars['String']>;
	/** A string containing the user's email address. */
	email?: Maybe<Scalars['String']>;
	/** 	The user's first name. */
	firstName?: Maybe<Scalars['String']>;
	/** User's Jabber account. */
	jabber?: Maybe<Scalars['String']>;
	/** The user's last name. */
	lastName?: Maybe<Scalars['String']>;
	/** User's locale. */
	locale?: Maybe<Scalars['String']>;
	/** A string that contains a URL-friendly name for the user. The default is the user's username. */
	nicename?: Maybe<Scalars['String']>;
	/** The user's nickname, defaults to the user's username. */
	nickname?: Maybe<Scalars['String']>;
	/** A string that contains the plain text password for the user. */
	password?: Maybe<Scalars['String']>;
	/** The date the user registered. Format is Y-m-d H:i:s. */
	registered?: Maybe<Scalars['String']>;
	/** A string for whether to enable the rich editor or not. False if not empty. */
	richEditing?: Maybe<Scalars['String']>;
	/** A string that contains the user's username. */
	username: Scalars['String'];
	/** A string containing the user's URL for the user's web site. */
	websiteUrl?: Maybe<Scalars['String']>;
	/** User's Yahoo IM account. */
	yim?: Maybe<Scalars['String']>;
};

/** The payload for the registerUser mutation */
export type RegisterUserPayload = {
	__typename?: 'RegisterUserPayload';
	clientMutationId: Scalars['String'];
	user?: Maybe<User>;
};

/** The logical relation between each item in the array when there are more than one. */
export enum RelationEnum {
	And = 'AND',
	Or = 'OR',
}

/** Input for the resetUserPassword mutation */
export type ResetUserPasswordInput = {
	clientMutationId: Scalars['String'];
	/** Password reset key */
	key?: Maybe<Scalars['String']>;
	/** The user's login (username). */
	login?: Maybe<Scalars['String']>;
	/** The new password. */
	password?: Maybe<Scalars['String']>;
};

/** The payload for the resetUserPassword mutation */
export type ResetUserPasswordPayload = {
	__typename?: 'ResetUserPasswordPayload';
	clientMutationId: Scalars['String'];
	user?: Maybe<User>;
};

/** Input for the restoreComment mutation */
export type RestoreCommentInput = {
	clientMutationId: Scalars['String'];
	/** The ID of the comment to be restored */
	id: Scalars['ID'];
};

/** The payload for the restoreComment mutation */
export type RestoreCommentPayload = {
	__typename?: 'RestoreCommentPayload';
	clientMutationId: Scalars['String'];
	/** The restored comment object */
	comment?: Maybe<Comment>;
	/** The ID of the restored comment */
	restoredId?: Maybe<Scalars['ID']>;
};

/** The root mutation */
export type RootMutation = {
	__typename?: 'RootMutation';
	/** The payload for the UpdateCategory mutation */
	updateCategory?: Maybe<UpdateCategoryPayload>;
	/** The payload for the UpdateTag mutation */
	updateTag?: Maybe<UpdateTagPayload>;
	/** The payload for the createCategory mutation */
	createCategory?: Maybe<CreateCategoryPayload>;
	/** The payload for the createComment mutation */
	createComment?: Maybe<CreateCommentPayload>;
	/** The payload for the createEspressoDatetime mutation */
	createEspressoDatetime?: Maybe<CreateEspressoDatetimePayload>;
	/** The payload for the createEspressoEvent mutation */
	createEspressoEvent?: Maybe<CreateEspressoEventPayload>;
	/** The payload for the createEspressoPrice mutation */
	createEspressoPrice?: Maybe<CreateEspressoPricePayload>;
	/** The payload for the createEspressoTicket mutation */
	createEspressoTicket?: Maybe<CreateEspressoTicketPayload>;
	/** The payload for the createEspressoVenue mutation */
	createEspressoVenue?: Maybe<CreateEspressoVenuePayload>;
	/** The payload for the createMediaItem mutation */
	createMediaItem?: Maybe<CreateMediaItemPayload>;
	/** The payload for the createPage mutation */
	createPage?: Maybe<CreatePagePayload>;
	/** The payload for the createPost mutation */
	createPost?: Maybe<CreatePostPayload>;
	/** The payload for the createTag mutation */
	createTag?: Maybe<CreateTagPayload>;
	/** The payload for the createUser mutation */
	createUser?: Maybe<CreateUserPayload>;
	/** The payload for the deleteCategory mutation */
	deleteCategory?: Maybe<DeleteCategoryPayload>;
	/** The payload for the deleteComment mutation */
	deleteComment?: Maybe<DeleteCommentPayload>;
	/** The payload for the deleteEspressoDatetime mutation */
	deleteEspressoDatetime?: Maybe<DeleteEspressoDatetimePayload>;
	/** The payload for the deleteEspressoEvent mutation */
	deleteEspressoEvent?: Maybe<DeleteEspressoEventPayload>;
	/** The payload for the deleteEspressoPrice mutation */
	deleteEspressoPrice?: Maybe<DeleteEspressoPricePayload>;
	/** The payload for the deleteEspressoTicket mutation */
	deleteEspressoTicket?: Maybe<DeleteEspressoTicketPayload>;
	/** The payload for the deleteEspressoVenue mutation */
	deleteEspressoVenue?: Maybe<DeleteEspressoVenuePayload>;
	/** The payload for the deleteMediaItem mutation */
	deleteMediaItem?: Maybe<DeleteMediaItemPayload>;
	/** The payload for the deletePage mutation */
	deletePage?: Maybe<DeletePagePayload>;
	/** The payload for the deletePost mutation */
	deletePost?: Maybe<DeletePostPayload>;
	/** The payload for the deleteTag mutation */
	deleteTag?: Maybe<DeleteTagPayload>;
	/** The payload for the deleteUser mutation */
	deleteUser?: Maybe<DeleteUserPayload>;
	increaseCount?: Maybe<Scalars['Int']>;
	/** The payload for the registerUser mutation */
	registerUser?: Maybe<RegisterUserPayload>;
	/** The payload for the resetUserPassword mutation */
	resetUserPassword?: Maybe<ResetUserPasswordPayload>;
	/** The payload for the restoreComment mutation */
	restoreComment?: Maybe<RestoreCommentPayload>;
	/** The payload for the sendPasswordResetEmail mutation */
	sendPasswordResetEmail?: Maybe<SendPasswordResetEmailPayload>;
	/** The payload for the updateComment mutation */
	updateComment?: Maybe<UpdateCommentPayload>;
	/** The payload for the updateEspressoDatetime mutation */
	updateEspressoDatetime?: Maybe<UpdateEspressoDatetimePayload>;
	/** The payload for the updateEspressoEvent mutation */
	updateEspressoEvent?: Maybe<UpdateEspressoEventPayload>;
	/** The payload for the updateEspressoPrice mutation */
	updateEspressoPrice?: Maybe<UpdateEspressoPricePayload>;
	/** The payload for the updateEspressoTicket mutation */
	updateEspressoTicket?: Maybe<UpdateEspressoTicketPayload>;
	/** The payload for the updateEspressoVenue mutation */
	updateEspressoVenue?: Maybe<UpdateEspressoVenuePayload>;
	/** The payload for the updateMediaItem mutation */
	updateMediaItem?: Maybe<UpdateMediaItemPayload>;
	/** The payload for the updatePage mutation */
	updatePage?: Maybe<UpdatePagePayload>;
	/** The payload for the updatePost mutation */
	updatePost?: Maybe<UpdatePostPayload>;
	/** The payload for the updateSettings mutation */
	updateSettings?: Maybe<UpdateSettingsPayload>;
	/** The payload for the updateUser mutation */
	updateUser?: Maybe<UpdateUserPayload>;
};

/** The root mutation */
export type RootMutationUpdateCategoryArgs = {
	input: UpdateCategoryInput;
};

/** The root mutation */
export type RootMutationUpdateTagArgs = {
	input: UpdateTagInput;
};

/** The root mutation */
export type RootMutationCreateCategoryArgs = {
	input: CreateCategoryInput;
};

/** The root mutation */
export type RootMutationCreateCommentArgs = {
	input: CreateCommentInput;
};

/** The root mutation */
export type RootMutationCreateEspressoDatetimeArgs = {
	input: CreateEspressoDatetimeInput;
};

/** The root mutation */
export type RootMutationCreateEspressoEventArgs = {
	input: CreateEspressoEventInput;
};

/** The root mutation */
export type RootMutationCreateEspressoPriceArgs = {
	input: CreateEspressoPriceInput;
};

/** The root mutation */
export type RootMutationCreateEspressoTicketArgs = {
	input: CreateEspressoTicketInput;
};

/** The root mutation */
export type RootMutationCreateEspressoVenueArgs = {
	input: CreateEspressoVenueInput;
};

/** The root mutation */
export type RootMutationCreateMediaItemArgs = {
	input: CreateMediaItemInput;
};

/** The root mutation */
export type RootMutationCreatePageArgs = {
	input: CreatePageInput;
};

/** The root mutation */
export type RootMutationCreatePostArgs = {
	input: CreatePostInput;
};

/** The root mutation */
export type RootMutationCreateTagArgs = {
	input: CreateTagInput;
};

/** The root mutation */
export type RootMutationCreateUserArgs = {
	input: CreateUserInput;
};

/** The root mutation */
export type RootMutationDeleteCategoryArgs = {
	input: DeleteCategoryInput;
};

/** The root mutation */
export type RootMutationDeleteCommentArgs = {
	input: DeleteCommentInput;
};

/** The root mutation */
export type RootMutationDeleteEspressoDatetimeArgs = {
	input: DeleteEspressoDatetimeInput;
};

/** The root mutation */
export type RootMutationDeleteEspressoEventArgs = {
	input: DeleteEspressoEventInput;
};

/** The root mutation */
export type RootMutationDeleteEspressoPriceArgs = {
	input: DeleteEspressoPriceInput;
};

/** The root mutation */
export type RootMutationDeleteEspressoTicketArgs = {
	input: DeleteEspressoTicketInput;
};

/** The root mutation */
export type RootMutationDeleteEspressoVenueArgs = {
	input: DeleteEspressoVenueInput;
};

/** The root mutation */
export type RootMutationDeleteMediaItemArgs = {
	input: DeleteMediaItemInput;
};

/** The root mutation */
export type RootMutationDeletePageArgs = {
	input: DeletePageInput;
};

/** The root mutation */
export type RootMutationDeletePostArgs = {
	input: DeletePostInput;
};

/** The root mutation */
export type RootMutationDeleteTagArgs = {
	input: DeleteTagInput;
};

/** The root mutation */
export type RootMutationDeleteUserArgs = {
	input: DeleteUserInput;
};

/** The root mutation */
export type RootMutationIncreaseCountArgs = {
	count?: Maybe<Scalars['Int']>;
};

/** The root mutation */
export type RootMutationRegisterUserArgs = {
	input: RegisterUserInput;
};

/** The root mutation */
export type RootMutationResetUserPasswordArgs = {
	input: ResetUserPasswordInput;
};

/** The root mutation */
export type RootMutationRestoreCommentArgs = {
	input: RestoreCommentInput;
};

/** The root mutation */
export type RootMutationSendPasswordResetEmailArgs = {
	input: SendPasswordResetEmailInput;
};

/** The root mutation */
export type RootMutationUpdateCommentArgs = {
	input: UpdateCommentInput;
};

/** The root mutation */
export type RootMutationUpdateEspressoDatetimeArgs = {
	input: UpdateEspressoDatetimeInput;
};

/** The root mutation */
export type RootMutationUpdateEspressoEventArgs = {
	input: UpdateEspressoEventInput;
};

/** The root mutation */
export type RootMutationUpdateEspressoPriceArgs = {
	input: UpdateEspressoPriceInput;
};

/** The root mutation */
export type RootMutationUpdateEspressoTicketArgs = {
	input: UpdateEspressoTicketInput;
};

/** The root mutation */
export type RootMutationUpdateEspressoVenueArgs = {
	input: UpdateEspressoVenueInput;
};

/** The root mutation */
export type RootMutationUpdateMediaItemArgs = {
	input: UpdateMediaItemInput;
};

/** The root mutation */
export type RootMutationUpdatePageArgs = {
	input: UpdatePageInput;
};

/** The root mutation */
export type RootMutationUpdatePostArgs = {
	input: UpdatePostInput;
};

/** The root mutation */
export type RootMutationUpdateSettingsArgs = {
	input: UpdateSettingsInput;
};

/** The root mutation */
export type RootMutationUpdateUserArgs = {
	input: UpdateUserInput;
};

/** The root entry point into the Graph */
export type RootQuery = {
	__typename?: 'RootQuery';
	/** A 0bject */
	espressoEvent?: Maybe<EspressoEvent>;
	/** A EspressoEvent object */
	espressoEventBy?: Maybe<EspressoEvent>;
	/** A 0bject */
	espressoVenue?: Maybe<EspressoVenue>;
	/** A EspressoVenue object */
	espressoVenueBy?: Maybe<EspressoVenue>;
	/** Entry point to get all settings for the site */
	allSettings?: Maybe<Settings>;
	/** Connection between the RootQuery type and the RootQuery type */
	categories?: Maybe<RootQueryToCategoryConnection>;
	/** A 0bject */
	category?: Maybe<Category>;
	/** Returns a Comment */
	comment?: Maybe<Comment>;
	/** Connection between the RootQuery type and the RootQuery type */
	comments?: Maybe<RootQueryToCommentConnection>;
	discussionSettings?: Maybe<DiscussionSettings>;
	/** Connection between the RootQuery type and the RootQuery type */
	espressoDatetimes?: Maybe<EspressoRootQueryDatetimesConnection>;
	/** JSON encoded relational data of the models */
	espressoEventRelations?: Maybe<Scalars['String']>;
	/** Connection between the RootQuery type and the RootQuery type */
	espressoEvents?: Maybe<RootQueryToEspressoEventConnection>;
	/** Connection between the RootQuery type and the RootQuery type */
	espressoPriceTypes?: Maybe<EspressoRootQueryPriceTypesConnection>;
	/** Connection between the RootQuery type and the RootQuery type */
	espressoPrices?: Maybe<EspressoRootQueryPricesConnection>;
	/** Connection between the RootQuery type and the RootQuery type */
	espressoTickets?: Maybe<EspressoRootQueryTicketsConnection>;
	/** Connection between the RootQuery type and the RootQuery type */
	espressoVenues?: Maybe<RootQueryToEspressoVenueConnection>;
	generalSettings?: Maybe<GeneralSettings>;
	/** A 0bject */
	mediaItem?: Maybe<MediaItem>;
	/** A mediaItem object */
	mediaItemBy?: Maybe<MediaItem>;
	/** Connection between the RootQuery type and the RootQuery type */
	mediaItems?: Maybe<RootQueryToMediaItemConnection>;
	/** A WordPress navigation menu */
	menu?: Maybe<Menu>;
	/** A WordPress navigation menu item */
	menuItem?: Maybe<MenuItem>;
	/** Connection between the RootQuery type and the RootQuery type */
	menuItems?: Maybe<RootQueryToMenuItemConnection>;
	/** Connection between the RootQuery type and the RootQuery type */
	menus?: Maybe<RootQueryToMenuConnection>;
	/** Fetches an object given its ID */
	node?: Maybe<Node>;
	/** A 0bject */
	page?: Maybe<Page>;
	/** A page object */
	pageBy?: Maybe<Page>;
	/** Connection between the RootQuery type and the RootQuery type */
	pages?: Maybe<RootQueryToPageConnection>;
	/** A WordPress plugin */
	plugin?: Maybe<Plugin>;
	/** Connection between the RootQuery type and the RootQuery type */
	plugins?: Maybe<RootQueryToPluginConnection>;
	/** A 0bject */
	post?: Maybe<Post>;
	/** A post object */
	postBy?: Maybe<Post>;
	/** Connection between the RootQuery type and the RootQuery type */
	posts?: Maybe<RootQueryToPostConnection>;
	readingSettings?: Maybe<ReadingSettings>;
	/** Connection between the RootQuery type and the RootQuery type */
	revisions?: Maybe<RootQueryToContentRevisionUnionConnection>;
	/** A 0bject */
	tag?: Maybe<Tag>;
	/** Connection between the RootQuery type and the RootQuery type */
	tags?: Maybe<RootQueryToTagConnection>;
	/** A Theme object */
	theme?: Maybe<Theme>;
	/** Connection between the RootQuery type and the RootQuery type */
	themes?: Maybe<RootQueryToThemeConnection>;
	/** Returns a user */
	user?: Maybe<User>;
	/** Returns a user role */
	userRole?: Maybe<UserRole>;
	/** Connection between the RootQuery type and the RootQuery type */
	userRoles?: Maybe<RootQueryToUserRoleConnection>;
	/** Connection between the RootQuery type and the RootQuery type */
	users?: Maybe<RootQueryToUserConnection>;
	/** Returns the current user */
	viewer?: Maybe<User>;
	writingSettings?: Maybe<WritingSettings>;
};

/** The root entry point into the Graph */
export type RootQueryEspressoEventArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryEspressoEventByArgs = {
	id?: Maybe<Scalars['ID']>;
	espressoEventId?: Maybe<Scalars['Int']>;
	uri?: Maybe<Scalars['String']>;
	slug?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryEspressoVenueArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryEspressoVenueByArgs = {
	id?: Maybe<Scalars['ID']>;
	espressoVenueId?: Maybe<Scalars['Int']>;
	uri?: Maybe<Scalars['String']>;
	slug?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryCategoriesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<RootQueryToCategoryConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryCategoryArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryCommentArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryCommentsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<RootQueryToCommentConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryEspressoDatetimesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<EspressoRootQueryDatetimesConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryEspressoEventRelationsArgs = {
	eventId: Scalars['Int'];
};

/** The root entry point into the Graph */
export type RootQueryEspressoEventsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<RootQueryToEspressoEventConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryEspressoPriceTypesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryEspressoPricesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<EspressoRootQueryPricesConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryEspressoTicketsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<EspressoRootQueryTicketsConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryEspressoVenuesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<RootQueryToEspressoVenueConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryMediaItemArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryMediaItemByArgs = {
	id?: Maybe<Scalars['ID']>;
	mediaItemId?: Maybe<Scalars['Int']>;
	uri?: Maybe<Scalars['String']>;
	slug?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryMediaItemsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<RootQueryToMediaItemConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryMenuArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryMenuItemArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryMenuItemsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<RootQueryToMenuItemConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryMenusArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<RootQueryToMenuConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryNodeArgs = {
	id?: Maybe<Scalars['ID']>;
};

/** The root entry point into the Graph */
export type RootQueryPageArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryPageByArgs = {
	id?: Maybe<Scalars['ID']>;
	pageId?: Maybe<Scalars['Int']>;
	uri?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryPagesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<RootQueryToPageConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryPluginArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryPluginsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryPostArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryPostByArgs = {
	id?: Maybe<Scalars['ID']>;
	postId?: Maybe<Scalars['Int']>;
	uri?: Maybe<Scalars['String']>;
	slug?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryPostsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<RootQueryToPostConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryRevisionsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<RootQueryToContentRevisionUnionConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryTagArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryTagsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<RootQueryToTagConnectionWhereArgs>;
};

/** The root entry point into the Graph */
export type RootQueryThemeArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryThemesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryUserArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryUserRoleArgs = {
	id: Scalars['ID'];
};

/** The root entry point into the Graph */
export type RootQueryUserRolesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
};

/** The root entry point into the Graph */
export type RootQueryUsersArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<RootQueryToUserConnectionWhereArgs>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToCategoryConnection = {
	__typename?: 'RootQueryToCategoryConnection';
	/** Edges for the RootQueryToCategoryConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToCategoryConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Category>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	taxonomyInfo?: Maybe<Taxonomy>;
};

/** An edge in a connection */
export type RootQueryToCategoryConnectionEdge = {
	__typename?: 'RootQueryToCategoryConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Category>;
};

/** Arguments for filtering the RootQueryToCategoryConnection connection */
export type RootQueryToCategoryConnectionWhereArgs = {
	/** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
	cacheDomain?: Maybe<Scalars['String']>;
	/** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
	childOf?: Maybe<Scalars['Int']>;
	/**
	 * True to limit results to terms that have no children. This parameter has no
	 * effect on non-hierarchical taxonomies. Default false.
	 */
	childless?: Maybe<Scalars['Boolean']>;
	/** Retrieve terms where the description is LIKE the input value. Default empty. */
	descriptionLike?: Maybe<Scalars['String']>;
	/** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
	exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of term ids to exclude along with all of their descendant terms. If
	 * $include is non-empty, $exclude_tree is ignored. Default empty array.
	 */
	excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
	hideEmpty?: Maybe<Scalars['Boolean']>;
	/** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
	hierarchical?: Maybe<Scalars['Boolean']>;
	/** Array of term ids to include. Default empty array. */
	include?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of names to return term(s) for. Default empty. */
	name?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Retrieve terms where the name is LIKE the input value. Default empty. */
	nameLike?: Maybe<Scalars['String']>;
	/** Array of object IDs. Results will be limited to terms associated with these objects. */
	objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Field(s) to order terms by. Defaults to 'name'. */
	orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
	/** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
	padCounts?: Maybe<Scalars['Boolean']>;
	/** Parent term ID to retrieve direct-child terms of. Default empty. */
	parent?: Maybe<Scalars['Int']>;
	/** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
	search?: Maybe<Scalars['String']>;
	/**
	 * Default false. If true, only the items connected to the source item will be
	 * returned. If false, all items will be returned regardless of connection to the source
	 */
	shouldOnlyIncludeConnectedItems?: Maybe<Scalars['Boolean']>;
	/**
	 * Default false. If true, the connection will be output in a flat list instead
	 * of the hierarchical list. So child terms will be output in the same level as
	 * the parent terms
	 */
	shouldOutputInFlatList?: Maybe<Scalars['Boolean']>;
	/** Array of slugs to return term(s) for. Default empty. */
	slug?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Array of term taxonomy IDs, to match when querying terms. */
	termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to prime meta caches for matched terms. Default true. */
	updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToCommentConnection = {
	__typename?: 'RootQueryToCommentConnection';
	/** Edges for the RootQueryToCommentConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToCommentConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Comment>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToCommentConnectionEdge = {
	__typename?: 'RootQueryToCommentConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Comment>;
};

/** Arguments for filtering the RootQueryToCommentConnection connection */
export type RootQueryToCommentConnectionWhereArgs = {
	/** Comment author email address. */
	authorEmail?: Maybe<Scalars['String']>;
	/** Array of author IDs to include comments for. */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to exclude comments for. */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Comment author URL. */
	authorUrl?: Maybe<Scalars['String']>;
	/** Array of comment IDs to include. */
	commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of IDs of users whose unapproved comments will be returned by the
	 * 							query regardless of status.
	 */
	commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Include comments of a given type. */
	commentType?: Maybe<Scalars['String']>;
	/** Include comments from a given array of comment types. */
	commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Exclude comments from a given array of comment types. */
	commentTypeNotIn?: Maybe<Scalars['String']>;
	/** Content object author ID to limit results by. */
	contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to retrieve comments for. */
	contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs *not* to retrieve comments for. */
	contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Limit results to those affiliated with a given content object
	 * 							ID.
	 */
	contentId?: Maybe<Scalars['ID']>;
	/**
	 * Array of content object IDs to include affiliated comments
	 * 							for.
	 */
	contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of content object IDs to exclude affiliated comments
	 * 							for.
	 */
	contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Content object name to retrieve affiliated comments for. */
	contentName?: Maybe<Scalars['String']>;
	/** Content Object parent ID to retrieve affiliated comments for. */
	contentParent?: Maybe<Scalars['Int']>;
	/**
	 * Array of content object statuses to retrieve affiliated comments for.
	 * 							Pass 'any' to match any value.
	 */
	contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
	/** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
	contentType?: Maybe<Array<Maybe<PostTypeEnum>>>;
	/**
	 * Array of IDs or email addresses of users whose unapproved comments will be
	 * returned by the query regardless of $status. Default empty
	 */
	includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Karma score to retrieve matching comments for. */
	karma?: Maybe<Scalars['Int']>;
	/** The cardinality of the order of the connection */
	order?: Maybe<OrderEnum>;
	/** Field to order the comments by. */
	orderby?: Maybe<CommentsConnectionOrderbyEnum>;
	/** Parent ID of comment to retrieve children of. */
	parent?: Maybe<Scalars['Int']>;
	/** Array of parent IDs of comments to retrieve children for. */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of parent IDs of comments *not* to retrieve children
	 * 							for.
	 */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Search term(s) to retrieve matching comments for. */
	search?: Maybe<Scalars['String']>;
	/** Comment status to limit results by. */
	status?: Maybe<Scalars['String']>;
	/** Include comments for a specific user ID. */
	userId?: Maybe<Scalars['ID']>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToContentRevisionUnionConnection = {
	__typename?: 'RootQueryToContentRevisionUnionConnection';
	/** Edges for the RootQueryToContentRevisionUnionConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToContentRevisionUnionConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<ContentRevisionUnion>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToContentRevisionUnionConnectionEdge = {
	__typename?: 'RootQueryToContentRevisionUnionConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<ContentRevisionUnion>;
};

/** Arguments for filtering the RootQueryToContentRevisionUnionConnection connection */
export type RootQueryToContentRevisionUnionConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToEspressoEventConnection = {
	__typename?: 'RootQueryToEspressoEventConnection';
	/** Edges for the RootQueryToEspressoEventConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToEspressoEventConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoEvent>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type RootQueryToEspressoEventConnectionEdge = {
	__typename?: 'RootQueryToEspressoEventConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoEvent>;
};

/** Arguments for filtering the RootQueryToEspressoEventConnection connection */
export type RootQueryToEspressoEventConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToEspressoVenueConnection = {
	__typename?: 'RootQueryToEspressoVenueConnection';
	/** Edges for the RootQueryToEspressoVenueConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToEspressoVenueConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoVenue>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type RootQueryToEspressoVenueConnectionEdge = {
	__typename?: 'RootQueryToEspressoVenueConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoVenue>;
};

/** Arguments for filtering the RootQueryToEspressoVenueConnection connection */
export type RootQueryToEspressoVenueConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToMediaItemConnection = {
	__typename?: 'RootQueryToMediaItemConnection';
	/** Edges for the RootQueryToMediaItemConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToMediaItemConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<MediaItem>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type RootQueryToMediaItemConnectionEdge = {
	__typename?: 'RootQueryToMediaItemConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<MediaItem>;
};

/** Arguments for filtering the RootQueryToMediaItemConnection connection */
export type RootQueryToMediaItemConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToMenuConnection = {
	__typename?: 'RootQueryToMenuConnection';
	/** Edges for the RootQueryToMenuConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToMenuConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Menu>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToMenuConnectionEdge = {
	__typename?: 'RootQueryToMenuConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Menu>;
};

/** Arguments for filtering the RootQueryToMenuConnection connection */
export type RootQueryToMenuConnectionWhereArgs = {
	/** The ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** The menu location for the menu being queried */
	location?: Maybe<MenuLocationEnum>;
	/** The slug of the menu to query items for */
	slug?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToMenuItemConnection = {
	__typename?: 'RootQueryToMenuItemConnection';
	/** Edges for the RootQueryToMenuItemConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToMenuItemConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<MenuItem>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToMenuItemConnectionEdge = {
	__typename?: 'RootQueryToMenuItemConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<MenuItem>;
};

/** Arguments for filtering the RootQueryToMenuItemConnection connection */
export type RootQueryToMenuItemConnectionWhereArgs = {
	/** The ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** The menu location for the menu being queried */
	location?: Maybe<MenuLocationEnum>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToPageConnection = {
	__typename?: 'RootQueryToPageConnection';
	/** Edges for the RootQueryToPageConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToPageConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Page>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type RootQueryToPageConnectionEdge = {
	__typename?: 'RootQueryToPageConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Page>;
};

/** Arguments for filtering the RootQueryToPageConnection connection */
export type RootQueryToPageConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToPluginConnection = {
	__typename?: 'RootQueryToPluginConnection';
	/** Edges for the RootQueryToPluginConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToPluginConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Plugin>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToPluginConnectionEdge = {
	__typename?: 'RootQueryToPluginConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Plugin>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToPostConnection = {
	__typename?: 'RootQueryToPostConnection';
	/** Edges for the RootQueryToPostConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToPostConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Post>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type RootQueryToPostConnectionEdge = {
	__typename?: 'RootQueryToPostConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Post>;
};

/** Arguments for filtering the RootQueryToPostConnection connection */
export type RootQueryToPostConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToTagConnection = {
	__typename?: 'RootQueryToTagConnection';
	/** Edges for the RootQueryToTagConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToTagConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Tag>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	taxonomyInfo?: Maybe<Taxonomy>;
};

/** An edge in a connection */
export type RootQueryToTagConnectionEdge = {
	__typename?: 'RootQueryToTagConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Tag>;
};

/** Arguments for filtering the RootQueryToTagConnection connection */
export type RootQueryToTagConnectionWhereArgs = {
	/** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
	cacheDomain?: Maybe<Scalars['String']>;
	/** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
	childOf?: Maybe<Scalars['Int']>;
	/**
	 * True to limit results to terms that have no children. This parameter has no
	 * effect on non-hierarchical taxonomies. Default false.
	 */
	childless?: Maybe<Scalars['Boolean']>;
	/** Retrieve terms where the description is LIKE the input value. Default empty. */
	descriptionLike?: Maybe<Scalars['String']>;
	/** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
	exclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of term ids to exclude along with all of their descendant terms. If
	 * $include is non-empty, $exclude_tree is ignored. Default empty array.
	 */
	excludeTree?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
	hideEmpty?: Maybe<Scalars['Boolean']>;
	/** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
	hierarchical?: Maybe<Scalars['Boolean']>;
	/** Array of term ids to include. Default empty array. */
	include?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of names to return term(s) for. Default empty. */
	name?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Retrieve terms where the name is LIKE the input value. Default empty. */
	nameLike?: Maybe<Scalars['String']>;
	/** Array of object IDs. Results will be limited to terms associated with these objects. */
	objectIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Field(s) to order terms by. Defaults to 'name'. */
	orderby?: Maybe<TermObjectsConnectionOrderbyEnum>;
	/** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
	padCounts?: Maybe<Scalars['Boolean']>;
	/** Parent term ID to retrieve direct-child terms of. Default empty. */
	parent?: Maybe<Scalars['Int']>;
	/** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
	search?: Maybe<Scalars['String']>;
	/**
	 * Default false. If true, only the items connected to the source item will be
	 * returned. If false, all items will be returned regardless of connection to the source
	 */
	shouldOnlyIncludeConnectedItems?: Maybe<Scalars['Boolean']>;
	/**
	 * Default false. If true, the connection will be output in a flat list instead
	 * of the hierarchical list. So child terms will be output in the same level as
	 * the parent terms
	 */
	shouldOutputInFlatList?: Maybe<Scalars['Boolean']>;
	/** Array of slugs to return term(s) for. Default empty. */
	slug?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Array of term taxonomy IDs, to match when querying terms. */
	termTaxonomId?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Whether to prime meta caches for matched terms. Default true. */
	updateTermMetaCache?: Maybe<Scalars['Boolean']>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToThemeConnection = {
	__typename?: 'RootQueryToThemeConnection';
	/** Edges for the RootQueryToThemeConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToThemeConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Theme>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToThemeConnectionEdge = {
	__typename?: 'RootQueryToThemeConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Theme>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToUserConnection = {
	__typename?: 'RootQueryToUserConnection';
	/** Edges for the RootQueryToUserConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToUserConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<User>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToUserConnectionEdge = {
	__typename?: 'RootQueryToUserConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<User>;
};

/** Arguments for filtering the RootQueryToUserConnection connection */
export type RootQueryToUserConnectionWhereArgs = {
	/** Array of userIds to exclude. */
	exclude?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** Pass an array of post types to filter results to users who have published posts in those post types. */
	hasPublishedPosts?: Maybe<Array<Maybe<PostTypeEnum>>>;
	/** Array of userIds to include. */
	include?: Maybe<Array<Maybe<Scalars['Int']>>>;
	/** The user login. */
	login?: Maybe<Scalars['String']>;
	/** An array of logins to include. Users matching one of these logins will be included in results. */
	loginIn?: Maybe<Scalars['Int']>;
	/** An array of logins to exclude. Users matching one of these logins will not be included in results. */
	loginNotIn?: Maybe<Scalars['Int']>;
	/** The user nicename. */
	nicename?: Maybe<Scalars['String']>;
	/** An array of nicenames to include. Users matching one of these nicenames will be included in results. */
	nicenameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** An array of nicenames to exclude. Users matching one of these nicenames will not be included in results. */
	nicenameNotIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<UsersConnectionOrderbyInput>>>;
	/**
	 * An array of role names that users must match to be included in results. Note
	 * that this is an inclusive list: users must match *each* role.
	 */
	role?: Maybe<UserRoleEnum>;
	/** An array of role names. Matched users must have at least one of these roles. */
	roleIn?: Maybe<Array<Maybe<UserRoleEnum>>>;
	/** An array of role names to exclude. Users matching one or more of these roles will not be included in results. */
	roleNotIn?: Maybe<Array<Maybe<UserRoleEnum>>>;
	/**
	 * Search keyword. Searches for possible string matches on columns. When
	 * "searchColumns" is left empty, it tries to determine which column to search in
	 * based on search string.
	 */
	search?: Maybe<Scalars['String']>;
	/** Array of column names to be searched. Accepts 'ID', 'login', 'nicename', 'email', 'url'. */
	searchColumns?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Connection between the RootQuery type and the RootQuery type */
export type RootQueryToUserRoleConnection = {
	__typename?: 'RootQueryToUserRoleConnection';
	/** Edges for the RootQueryToUserRoleConnection connection */
	edges?: Maybe<Array<Maybe<RootQueryToUserRoleConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<UserRole>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type RootQueryToUserRoleConnectionEdge = {
	__typename?: 'RootQueryToUserRoleConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<UserRole>;
};

/** Input for the sendPasswordResetEmail mutation */
export type SendPasswordResetEmailInput = {
	clientMutationId: Scalars['String'];
	/** A string that contains the user's username or email address. */
	username: Scalars['String'];
};

/** The payload for the sendPasswordResetEmail mutation */
export type SendPasswordResetEmailPayload = {
	__typename?: 'SendPasswordResetEmailPayload';
	clientMutationId: Scalars['String'];
	/** The user that the password reset email was sent to */
	user?: Maybe<User>;
};

/** All of the registered settings */
export type Settings = {
	__typename?: 'Settings';
	/** Allow people to submit comments on new posts. */
	discussionSettingsDefaultCommentStatus?: Maybe<Scalars['String']>;
	/** Allow link notifications from other blogs (pingbacks and trackbacks) on new articles. */
	discussionSettingsDefaultPingStatus?: Maybe<Scalars['String']>;
	/** A date format for all date strings. */
	generalSettingsDateFormat?: Maybe<Scalars['String']>;
	/** Site tagline. */
	generalSettingsDescription?: Maybe<Scalars['String']>;
	/** This address is used for admin purposes, like new user notification. */
	generalSettingsEmail?: Maybe<Scalars['String']>;
	/** WordPress locale code. */
	generalSettingsLanguage?: Maybe<Scalars['String']>;
	/** A day number of the week that the week should start on. */
	generalSettingsStartOfWeek?: Maybe<Scalars['Int']>;
	/** A time format for all time strings. */
	generalSettingsTimeFormat?: Maybe<Scalars['String']>;
	/** A city in the same timezone as you. */
	generalSettingsTimezone?: Maybe<Scalars['String']>;
	/** Site title. */
	generalSettingsTitle?: Maybe<Scalars['String']>;
	/** Site URL. */
	generalSettingsUrl?: Maybe<Scalars['String']>;
	/** Blog pages show at most. */
	readingSettingsPostsPerPage?: Maybe<Scalars['Int']>;
	/** Default post category. */
	writingSettingsDefaultCategory?: Maybe<Scalars['Int']>;
	/** Default post format. */
	writingSettingsDefaultPostFormat?: Maybe<Scalars['String']>;
	/** Convert emoticons like :-) and :-P to graphics on display. */
	writingSettingsUseSmilies?: Maybe<Scalars['Boolean']>;
};

/** The tag type */
export type Tag = Node & {
	__typename?: 'Tag';
	/** The number of objects connected to the object */
	count?: Maybe<Scalars['Int']>;
	/** The description of the object */
	description?: Maybe<Scalars['String']>;
	/** Connection between the tag type and the tag type */
	espressoEvents?: Maybe<TagToEspressoEventConnection>;
	/** Connection between the tag type and the tag type */
	espressoVenues?: Maybe<TagToEspressoVenueConnection>;
	/** The globally unique identifier for the post_tag term object. */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** The link to the term */
	link?: Maybe<Scalars['String']>;
	/** The human friendly name of the object. */
	name?: Maybe<Scalars['String']>;
	/** Connection between the tag type and the tag type */
	posts?: Maybe<TagToPostConnection>;
	/** An alphanumeric identifier for the object unique to its type. */
	slug?: Maybe<Scalars['String']>;
	/** The id field matches the WP_Post-&gt;ID field. */
	tagId?: Maybe<Scalars['Int']>;
	/** The name of the taxonomy this term belongs to */
	taxonomy?: Maybe<Taxonomy>;
	/** The ID of the term group that this term object belongs to */
	termGroupId?: Maybe<Scalars['Int']>;
	/** The taxonomy ID that the object is associated with */
	termTaxonomyId?: Maybe<Scalars['Int']>;
};

/** The tag type */
export type TagEspressoEventsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<TagToEspressoEventConnectionWhereArgs>;
};

/** The tag type */
export type TagEspressoVenuesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<TagToEspressoVenueConnectionWhereArgs>;
};

/** The tag type */
export type TagPostsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<TagToPostConnectionWhereArgs>;
};

/** Connection between the tag type and the tag type */
export type TagToEspressoEventConnection = {
	__typename?: 'TagToEspressoEventConnection';
	/** Edges for the TagToEspressoEventConnection connection */
	edges?: Maybe<Array<Maybe<TagToEspressoEventConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoEvent>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type TagToEspressoEventConnectionEdge = {
	__typename?: 'TagToEspressoEventConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoEvent>;
};

/** Arguments for filtering the TagToEspressoEventConnection connection */
export type TagToEspressoEventConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the tag type and the tag type */
export type TagToEspressoVenueConnection = {
	__typename?: 'TagToEspressoVenueConnection';
	/** Edges for the TagToEspressoVenueConnection connection */
	edges?: Maybe<Array<Maybe<TagToEspressoVenueConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoVenue>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type TagToEspressoVenueConnectionEdge = {
	__typename?: 'TagToEspressoVenueConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoVenue>;
};

/** Arguments for filtering the TagToEspressoVenueConnection connection */
export type TagToEspressoVenueConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the tag type and the tag type */
export type TagToPostConnection = {
	__typename?: 'TagToPostConnection';
	/** Edges for the TagToPostConnection connection */
	edges?: Maybe<Array<Maybe<TagToPostConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Post>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type TagToPostConnectionEdge = {
	__typename?: 'TagToPostConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Post>;
};

/** Arguments for filtering the TagToPostConnection connection */
export type TagToPostConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** A taxonomy object */
export type Taxonomy = Node & {
	__typename?: 'Taxonomy';
	/** A list of Post Types associated with the taxonomy */
	connectedPostTypeNames?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** List of Post Types connected to the Taxonomy */
	connectedPostTypes?: Maybe<Array<Maybe<PostType>>>;
	/** Description of the taxonomy. This field is equivalent to WP_Taxonomy-&gt;description */
	description?: Maybe<Scalars['String']>;
	/** The plural name of the post type within the GraphQL Schema. */
	graphqlPluralName?: Maybe<Scalars['String']>;
	/** The singular name of the post type within the GraphQL Schema. */
	graphqlSingleName?: Maybe<Scalars['String']>;
	/** Whether the taxonomy is hierarchical */
	hierarchical?: Maybe<Scalars['Boolean']>;
	/** The globally unique identifier of the taxonomy object. */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** Name of the taxonomy shown in the menu. Usually plural. */
	label?: Maybe<Scalars['String']>;
	/** The display name of the taxonomy. This field is equivalent to WP_Taxonomy-&gt;label */
	name?: Maybe<Scalars['String']>;
	/** Whether the taxonomy is publicly queryable */
	public?: Maybe<Scalars['Boolean']>;
	/** Name of content type to diplay in REST API &quot;wp/v2&quot; namespace. */
	restBase?: Maybe<Scalars['String']>;
	/** The REST Controller class assigned to handling this content type. */
	restControllerClass?: Maybe<Scalars['String']>;
	/** Whether to show the taxonomy as part of a tag cloud widget. This field is equivalent to WP_Taxonomy-&gt;show_tagcloud */
	showCloud?: Maybe<Scalars['Boolean']>;
	/** Whether to display a column for the taxonomy on its post type listing screens. */
	showInAdminColumn?: Maybe<Scalars['Boolean']>;
	/** Whether to add the post type to the GraphQL Schema. */
	showInGraphql?: Maybe<Scalars['Boolean']>;
	/** Whether to show the taxonomy in the admin menu */
	showInMenu?: Maybe<Scalars['Boolean']>;
	/** Whether the taxonomy is available for selection in navigation menus. */
	showInNavMenus?: Maybe<Scalars['Boolean']>;
	/** Whether to show the taxonomy in the quick/bulk edit panel. */
	showInQuickEdit?: Maybe<Scalars['Boolean']>;
	/** Whether to add the post type route in the REST API &quot;wp/v2&quot; namespace. */
	showInRest?: Maybe<Scalars['Boolean']>;
	/** Whether to generate and allow a UI for managing terms in this taxonomy in the admin */
	showUi?: Maybe<Scalars['Boolean']>;
};

/** A taxonomy object */
export type TaxonomyConnectedPostTypeNamesArgs = {
	types?: Maybe<Array<Maybe<PostTypeEnum>>>;
};

/** A taxonomy object */
export type TaxonomyConnectedPostTypesArgs = {
	types?: Maybe<Array<Maybe<PostTypeEnum>>>;
};

/** Allowed taxonomies */
export enum TaxonomyEnum {
	Category = 'CATEGORY',
	Tag = 'TAG',
}

/** Options for ordering the connection by */
export enum TermObjectsConnectionOrderbyEnum {
	Count = 'COUNT',
	Description = 'DESCRIPTION',
	Name = 'NAME',
	Slug = 'SLUG',
	TermGroup = 'TERM_GROUP',
	TermId = 'TERM_ID',
	TermOrder = 'TERM_ORDER',
}

export type TermObjectUnion = Category | Tag;

/** A theme object */
export type Theme = Node & {
	__typename?: 'Theme';
	/**
	 * Name of the theme author(s), could also be a company name. This field is
	 * equivalent to WP_Theme-&gt;get( &quot;Author&quot; ).
	 */
	author?: Maybe<Scalars['String']>;
	/** URI for the author/company website. This field is equivalent to WP_Theme-&gt;get( &quot;AuthorURI&quot; ). */
	authorUri?: Maybe<Scalars['String']>;
	/** The description of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Description&quot; ). */
	description?: Maybe<Scalars['String']>;
	/** The globally unique identifier of the theme object. */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** Display name of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Name&quot; ). */
	name?: Maybe<Scalars['String']>;
	/**
	 * The URL of the screenshot for the theme. The screenshot is intended to give an
	 * overview of what the theme looks like. This field is equivalent to
	 * WP_Theme-&gt;get_screenshot().
	 */
	screenshot?: Maybe<Scalars['String']>;
	/**
	 * The theme slug is used to internally match themes. Theme slugs can have
	 * subdirectories like: my-theme/sub-theme. This field is equivalent to
	 * WP_Theme-&gt;get_stylesheet().
	 */
	slug?: Maybe<Scalars['String']>;
	/** URI for the author/company website. This field is equivalent to WP_Theme-&gt;get( &quot;Tags&quot; ). */
	tags?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * A URI if the theme has a website associated with it. The Theme URI is handy
	 * for directing users to a theme site for support etc. This field is equivalent
	 * to WP_Theme-&gt;get( &quot;ThemeURI&quot; ).
	 */
	themeUri?: Maybe<Scalars['String']>;
	/** The current version of the theme. This field is equivalent to WP_Theme-&gt;get( &quot;Version&quot; ). */
	version?: Maybe<Scalars['Float']>;
};

/** Input for the UpdateCategory mutation */
export type UpdateCategoryInput = {
	/** The slug that the category will be an alias of */
	aliasOf?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/** The description of the category object */
	description?: Maybe<Scalars['String']>;
	/** The ID of the category object to update */
	id: Scalars['ID'];
	/** The name of the category object to mutate */
	name?: Maybe<Scalars['String']>;
	/** The ID of the category that should be set as the parent */
	parentId?: Maybe<Scalars['ID']>;
	/**
	 * If this argument exists then the slug will be checked to see if it is not an
	 * existing valid term. If that check succeeds (it is not a valid term), then it
	 * is added and the term id is given. If it fails, then a check is made to
	 * whether the taxonomy is hierarchical and the parent argument is not empty. If
	 * the second check succeeds, the term will be inserted and the term id will be
	 * given. If the slug argument is empty, then it will be calculated from the term name.
	 */
	slug?: Maybe<Scalars['String']>;
};

/** The payload for the UpdateCategory mutation */
export type UpdateCategoryPayload = {
	__typename?: 'UpdateCategoryPayload';
	/** The created category */
	category?: Maybe<Category>;
	clientMutationId: Scalars['String'];
};

/** Input for the updateComment mutation */
export type UpdateCommentInput = {
	/** User agent used to post the comment. */
	agent?: Maybe<Scalars['String']>;
	/** The approval status of the comment. */
	approved?: Maybe<Scalars['String']>;
	/** The name of the comment's author. */
	author?: Maybe<Scalars['String']>;
	/** The email of the comment's author. */
	authorEmail?: Maybe<Scalars['String']>;
	/** IP address for the comment's author. */
	authorIp?: Maybe<Scalars['String']>;
	/** The url of the comment's author. */
	authorUrl?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/** The ID of the post object the comment belongs to. */
	commentOn?: Maybe<Scalars['Int']>;
	/** Content of the comment. */
	content?: Maybe<Scalars['String']>;
	/**
	 * The date of the object. Preferable to enter as year/month/day ( e.g.
	 * 01/31/2017 ) as it will rearrange date as fit if it is not specified.
	 * Incomplete dates may have unintended results for example, "2017" as the input
	 * will use current date with timestamp 20:17
	 */
	date?: Maybe<Scalars['String']>;
	/** The ID of the comment being updated. */
	id: Scalars['ID'];
	/** Parent comment of current comment. */
	parent?: Maybe<Scalars['ID']>;
	/** Type of comment. */
	type?: Maybe<Scalars['String']>;
	/** The userID of the comment's author. */
	userId?: Maybe<Scalars['Int']>;
};

/** The payload for the updateComment mutation */
export type UpdateCommentPayload = {
	__typename?: 'UpdateCommentPayload';
	clientMutationId: Scalars['String'];
	/** The comment that was created */
	comment?: Maybe<Comment>;
	/**
	 * Whether the mutation succeeded. If the comment is not approved, the server
	 * will not return the comment to a non authenticated user, but a success message
	 * can be returned if the create succeeded, and the client can optimistically add
	 * the comment to the client cache
	 */
	success?: Maybe<Scalars['Boolean']>;
};

/** Input for the updateEspressoDatetime mutation */
export type UpdateEspressoDatetimeInput = {
	/** Registration Limit for this time */
	capacity?: Maybe<Scalars['Int']>;
	clientMutationId: Scalars['String'];
	/** Description for Datetime */
	description?: Maybe<Scalars['String']>;
	/** End date and time of the Event */
	endDate?: Maybe<Scalars['String']>;
	/** Globally unique event ID of the datetime. */
	event?: Maybe<Scalars['ID']>;
	/** Event ID of the datetime. */
	eventId?: Maybe<Scalars['Int']>;
	/** The globally unique ID for the object. */
	id: Scalars['ID'];
	/** Flag indicating datetime is active */
	isActive?: Maybe<Scalars['Boolean']>;
	/** Flag indicating datetime is expired or not */
	isExpired?: Maybe<Scalars['Boolean']>;
	/** Flag indicating datetime is primary one for event */
	isPrimary?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the tickets sold for this datetime, met or exceed the registration limit */
	isSoldOut?: Maybe<Scalars['Boolean']>;
	/** Whether the date is upcoming */
	isUpcoming?: Maybe<Scalars['Boolean']>;
	/** The length of the event (start to end time) in seconds */
	length?: Maybe<Scalars['Int']>;
	/** Datetime Name */
	name?: Maybe<Scalars['String']>;
	/** The order in which the Datetime is displayed */
	order?: Maybe<Scalars['Int']>;
	/** The parent datetime ID */
	parent?: Maybe<Scalars['ID']>;
	/** Quantity of tickets reserved, but not yet fully purchased */
	reserved?: Maybe<Scalars['Int']>;
	/** How many sales for this Datetime that have occurred */
	sold?: Maybe<Scalars['Int']>;
	/** Start date and time of the Event */
	startDate?: Maybe<Scalars['String']>;
	/** Globally unique IDs of the tickets related to the datetime. Ignored if empty. */
	tickets?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** The payload for the updateEspressoDatetime mutation */
export type UpdateEspressoDatetimePayload = {
	__typename?: 'UpdateEspressoDatetimePayload';
	clientMutationId: Scalars['String'];
	espressoDatetime?: Maybe<EspressoDatetime>;
};

/** Input for the updateEspressoEvent mutation */
export type UpdateEspressoEventInput = {
	/** Limit of Additional Registrations on Same Transaction */
	additionalLimit?: Maybe<Scalars['String']>;
	/** Allow Overflow on Event */
	allowOverflow?: Maybe<Scalars['Boolean']>;
	/** The userId to assign as the author of the post */
	authorId?: Maybe<Scalars['ID']>;
	clientMutationId: Scalars['String'];
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** The comment status for the object */
	commentStatus?: Maybe<Scalars['String']>;
	/** The content of the object */
	content?: Maybe<Scalars['String']>;
	/** Date/Time Event Created */
	created?: Maybe<Scalars['String']>;
	/**
	 * The date of the object. Preferable to enter as year/month/day (e.g.
	 * 01/31/2017) as it will rearrange date as fit if it is not specified.
	 * Incomplete dates may have unintended results for example, "2017" as the input
	 * will use current date with timestamp 20:17
	 */
	date?: Maybe<Scalars['String']>;
	/** Event Description */
	desc?: Maybe<Scalars['String']>;
	/** Display Description Flag */
	displayDesc?: Maybe<Scalars['Boolean']>;
	/** Display Ticket Selector Flag */
	displayTicketSelector?: Maybe<Scalars['Boolean']>;
	/** Accept Donations? */
	donations?: Maybe<Scalars['Boolean']>;
	/** The excerpt of the object */
	excerpt?: Maybe<Scalars['String']>;
	/** URL of Event Page if hosted elsewhere */
	externalUrl?: Maybe<Scalars['String']>;
	/** The ID of the EspressoEvent object */
	id: Scalars['ID'];
	/** Flag indicating event is active */
	isActive?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the event is marked as cancelled */
	isCancelled?: Maybe<Scalars['Boolean']>;
	/** Flag indicating event is expired or not */
	isExpired?: Maybe<Scalars['Boolean']>;
	/** Flag indicating event is inactive */
	isInactive?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the event is marked as postponed */
	isPostponed?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the tickets sold for the event, met or exceed the registration limit */
	isSoldOut?: Maybe<Scalars['Boolean']>;
	/** Whether the event is upcoming */
	isUpcoming?: Maybe<Scalars['Boolean']>;
	/** Member-Only Event Flag */
	memberOnly?: Maybe<Scalars['Boolean']>;
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/**
	 * If the post is an attachment or a media file, this field will carry the
	 * corresponding MIME type. This field is equivalent to the value of
	 * WP_Post->post_mime_type and the post_mime_type column in the "post_objects"
	 * database table.
	 */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Event Name */
	name?: Maybe<Scalars['String']>;
	/** Event Menu Order */
	order?: Maybe<Scalars['Int']>;
	/** The ID of the parent object */
	parentId?: Maybe<Scalars['ID']>;
	/** The password used to protect the content of the object */
	password?: Maybe<Scalars['String']>;
	/** Event Phone Number */
	phone?: Maybe<Scalars['String']>;
	/** The ping status for the object */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Event Short Description */
	shortDesc?: Maybe<Scalars['String']>;
	/** The slug of the object */
	slug?: Maybe<Scalars['String']>;
	/** The status of the object */
	status?: Maybe<PostStatusEnum>;
	/** Set connections between the EspressoEvent and tags */
	tags?: Maybe<EspressoEventTagsInput>;
	/** Timezone (name) for Event times */
	timezoneString?: Maybe<Scalars['String']>;
	/** The title of the post */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Event Visible Date */
	visibleOn?: Maybe<Scalars['String']>;
	/** Event Creator ID */
	wpUser?: Maybe<Scalars['Int']>;
};

/** The payload for the updateEspressoEvent mutation */
export type UpdateEspressoEventPayload = {
	__typename?: 'UpdateEspressoEventPayload';
	espressoEvent?: Maybe<EspressoEvent>;
	clientMutationId: Scalars['String'];
};

/** Input for the updateEspressoPrice mutation */
export type UpdateEspressoPriceInput = {
	/** Price Amount */
	amount?: Maybe<Scalars['Float']>;
	clientMutationId: Scalars['String'];
	/** Price description */
	desc?: Maybe<Scalars['String']>;
	/** The globally unique ID for the object. */
	id: Scalars['ID'];
	/** Flag indicating price is the default one. */
	isDefault?: Maybe<Scalars['Boolean']>;
	/** Price Name */
	name?: Maybe<Scalars['String']>;
	/** Order of Application of Price. */
	order?: Maybe<Scalars['Int']>;
	/** Price ID for a global Price that will be overridden by this Price. */
	overrides?: Maybe<Scalars['Int']>;
	/** The parent price ID */
	parent?: Maybe<Scalars['ID']>;
	/** The price type ID */
	priceType?: Maybe<Scalars['ID']>;
	/** Price Creator ID */
	wpUser?: Maybe<Scalars['Int']>;
};

/** The payload for the updateEspressoPrice mutation */
export type UpdateEspressoPricePayload = {
	__typename?: 'UpdateEspressoPricePayload';
	clientMutationId: Scalars['String'];
	espressoPrice?: Maybe<EspressoPrice>;
};

/** Input for the updateEspressoTicket mutation */
export type UpdateEspressoTicketInput = {
	clientMutationId: Scalars['String'];
	/** Globally unique IDs of the datetimes related to the ticket. Ignored if empty. */
	datetimes?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Description of Ticket */
	description?: Maybe<Scalars['String']>;
	/** End date and time of the Ticket */
	endDate?: Maybe<Scalars['String']>;
	/** The globally unique ID for the object. */
	id: Scalars['ID'];
	/** Flag indicating that this ticket is a default ticket */
	isDefault?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether the ticket is free. */
	isFree?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether this ticket must be purchased with a transaction */
	isRequired?: Maybe<Scalars['Boolean']>;
	/** Flag indicating whether there is tax applied on this ticket */
	isTaxable?: Maybe<Scalars['Boolean']>;
	/** Maximum quantity of this ticket that can be purchased in one transaction */
	max?: Maybe<Scalars['Int']>;
	/** Minimum quantity of this ticket that must be purchased */
	min?: Maybe<Scalars['Int']>;
	/** Ticket Name */
	name?: Maybe<Scalars['String']>;
	/** The order in which the Datetime is displayed */
	order?: Maybe<Scalars['Int']>;
	/** The parent ticket ID */
	parent?: Maybe<Scalars['ID']>;
	/** Final calculated price for ticket */
	price?: Maybe<Scalars['Float']>;
	/** Globally unique IDs of the prices related to the ticket. Ignored if empty. */
	prices?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Quantity of this ticket that is available */
	quantity?: Maybe<Scalars['Int']>;
	/** Quantity of this ticket that is reserved, but not yet fully purchased */
	reserved?: Maybe<Scalars['Int']>;
	/**
	 * Flag indicating whether ticket calculations should run in reverse and
	 * calculate the base ticket price from the provided ticket total.
	 */
	reverseCalculate?: Maybe<Scalars['Boolean']>;
	/** How tickets are displayed in the ui */
	row?: Maybe<Scalars['Int']>;
	/** Number of this ticket sold */
	sold?: Maybe<Scalars['Int']>;
	/** Start date and time of the Ticket */
	startDate?: Maybe<Scalars['String']>;
	/** Number of datetimes this ticket can be used at */
	uses?: Maybe<Scalars['Int']>;
	/** Ticket Creator ID */
	wpUser?: Maybe<Scalars['Int']>;
};

/** The payload for the updateEspressoTicket mutation */
export type UpdateEspressoTicketPayload = {
	__typename?: 'UpdateEspressoTicketPayload';
	clientMutationId: Scalars['String'];
	espressoTicket?: Maybe<EspressoTicket>;
};

/** Input for the updateEspressoVenue mutation */
export type UpdateEspressoVenueInput = {
	/** Venue Address line 1 */
	address?: Maybe<Scalars['String']>;
	/** Venue Address line 2 */
	address2?: Maybe<Scalars['String']>;
	/** The userId to assign as the author of the post */
	authorId?: Maybe<Scalars['ID']>;
	/** Venue Capacity */
	capacity?: Maybe<Scalars['Int']>;
	/** Venue City */
	city?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** The comment status for the object */
	commentStatus?: Maybe<Scalars['String']>;
	/** The content of the object */
	content?: Maybe<Scalars['String']>;
	/** Country ISO Code */
	country?: Maybe<Scalars['String']>;
	/** Date Venue Created */
	created?: Maybe<Scalars['String']>;
	/**
	 * The date of the object. Preferable to enter as year/month/day (e.g.
	 * 01/31/2017) as it will rearrange date as fit if it is not specified.
	 * Incomplete dates may have unintended results for example, "2017" as the input
	 * will use current date with timestamp 20:17
	 */
	date?: Maybe<Scalars['String']>;
	/** Venue Description */
	desc?: Maybe<Scalars['String']>;
	/** Show Google Map? */
	enableForGmap?: Maybe<Scalars['String']>;
	/** The excerpt of the object */
	excerpt?: Maybe<Scalars['String']>;
	/** Google Map Link */
	googleMapLink?: Maybe<Scalars['String']>;
	/** The ID of the EspressoVenue object */
	id: Scalars['ID'];
	/** Venue Identifier */
	identifier?: Maybe<Scalars['String']>;
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/**
	 * If the post is an attachment or a media file, this field will carry the
	 * corresponding MIME type. This field is equivalent to the value of
	 * WP_Post->post_mime_type and the post_mime_type column in the "post_objects"
	 * database table.
	 */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Venue Name */
	name?: Maybe<Scalars['String']>;
	/** Venue order */
	order?: Maybe<Scalars['Int']>;
	/** The ID of the parent object */
	parentId?: Maybe<Scalars['ID']>;
	/** The password used to protect the content of the object */
	password?: Maybe<Scalars['String']>;
	/** Venue Phone */
	phone?: Maybe<Scalars['String']>;
	/** The ping status for the object */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Short Description of Venue */
	shortDesc?: Maybe<Scalars['String']>;
	/** The slug of the object */
	slug?: Maybe<Scalars['String']>;
	/** State ID */
	state?: Maybe<Scalars['Int']>;
	/** The status of the object */
	status?: Maybe<PostStatusEnum>;
	/** Set connections between the EspressoVenue and tags */
	tags?: Maybe<EspressoVenueTagsInput>;
	/** The title of the post */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Venue Website */
	url?: Maybe<Scalars['String']>;
	/** Call in Number */
	virtualPhone?: Maybe<Scalars['String']>;
	/** Virtual URL */
	virtualUrl?: Maybe<Scalars['String']>;
	/** Venue Creator ID */
	wpUser?: Maybe<Scalars['Int']>;
	/** Venue Zip/Postal Code */
	zip?: Maybe<Scalars['String']>;
};

/** The payload for the updateEspressoVenue mutation */
export type UpdateEspressoVenuePayload = {
	__typename?: 'UpdateEspressoVenuePayload';
	espressoVenue?: Maybe<EspressoVenue>;
	clientMutationId: Scalars['String'];
};

/** Input for the updateMediaItem mutation */
export type UpdateMediaItemInput = {
	/** Alternative text to display when mediaItem is not displayed */
	altText?: Maybe<Scalars['String']>;
	/** The userId to assign as the author of the mediaItem */
	authorId?: Maybe<Scalars['ID']>;
	/** The caption for the mediaItem */
	caption?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/** The comment status for the mediaItem */
	commentStatus?: Maybe<Scalars['String']>;
	/** The date of the mediaItem */
	date?: Maybe<Scalars['String']>;
	/** The date (in GMT zone) of the mediaItem */
	dateGmt?: Maybe<Scalars['String']>;
	/** Description of the mediaItem */
	description?: Maybe<Scalars['String']>;
	/** The file name of the mediaItem */
	filePath?: Maybe<Scalars['String']>;
	/** The file type of the mediaItem */
	fileType?: Maybe<MimeTypeEnum>;
	/** The ID of the mediaItem object */
	id: Scalars['ID'];
	/** The WordPress post ID or the graphQL postId of the parent object */
	parentId?: Maybe<Scalars['ID']>;
	/** The ping status for the mediaItem */
	pingStatus?: Maybe<Scalars['String']>;
	/** The slug of the mediaItem */
	slug?: Maybe<Scalars['String']>;
	/** The status of the mediaItem */
	status?: Maybe<MediaItemStatusEnum>;
	/** The title of the mediaItem */
	title?: Maybe<Scalars['String']>;
};

/** The payload for the updateMediaItem mutation */
export type UpdateMediaItemPayload = {
	__typename?: 'UpdateMediaItemPayload';
	clientMutationId: Scalars['String'];
	mediaItem?: Maybe<MediaItem>;
};

/** Input for the updatePage mutation */
export type UpdatePageInput = {
	/** The userId to assign as the author of the post */
	authorId?: Maybe<Scalars['ID']>;
	clientMutationId: Scalars['String'];
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** The comment status for the object */
	commentStatus?: Maybe<Scalars['String']>;
	/** The content of the object */
	content?: Maybe<Scalars['String']>;
	/**
	 * The date of the object. Preferable to enter as year/month/day (e.g.
	 * 01/31/2017) as it will rearrange date as fit if it is not specified.
	 * Incomplete dates may have unintended results for example, "2017" as the input
	 * will use current date with timestamp 20:17
	 */
	date?: Maybe<Scalars['String']>;
	/** The excerpt of the object */
	excerpt?: Maybe<Scalars['String']>;
	/** The ID of the page object */
	id: Scalars['ID'];
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/**
	 * If the post is an attachment or a media file, this field will carry the
	 * corresponding MIME type. This field is equivalent to the value of
	 * WP_Post->post_mime_type and the post_mime_type column in the "post_objects"
	 * database table.
	 */
	mimeType?: Maybe<MimeTypeEnum>;
	/** The ID of the parent object */
	parentId?: Maybe<Scalars['ID']>;
	/** The password used to protect the content of the object */
	password?: Maybe<Scalars['String']>;
	/** The ping status for the object */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** The slug of the object */
	slug?: Maybe<Scalars['String']>;
	/** The status of the object */
	status?: Maybe<PostStatusEnum>;
	/** The title of the post */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The payload for the updatePage mutation */
export type UpdatePagePayload = {
	__typename?: 'UpdatePagePayload';
	clientMutationId: Scalars['String'];
	page?: Maybe<Page>;
};

/** Input for the updatePost mutation */
export type UpdatePostInput = {
	/** The userId to assign as the author of the post */
	authorId?: Maybe<Scalars['ID']>;
	/** Set connections between the post and categories */
	categories?: Maybe<PostCategoriesInput>;
	clientMutationId: Scalars['String'];
	/**
	 * The number of comments. Even though WPGraphQL denotes this field as an
	 * integer, in WordPress this field should be saved as a numeric string for compatibility.
	 */
	commentCount?: Maybe<Scalars['Int']>;
	/** The comment status for the object */
	commentStatus?: Maybe<Scalars['String']>;
	/** The content of the object */
	content?: Maybe<Scalars['String']>;
	/**
	 * The date of the object. Preferable to enter as year/month/day (e.g.
	 * 01/31/2017) as it will rearrange date as fit if it is not specified.
	 * Incomplete dates may have unintended results for example, "2017" as the input
	 * will use current date with timestamp 20:17
	 */
	date?: Maybe<Scalars['String']>;
	/** The excerpt of the object */
	excerpt?: Maybe<Scalars['String']>;
	/** The ID of the post object */
	id: Scalars['ID'];
	/**
	 * A field used for ordering posts. This is typically used with nav menu items or
	 * for special ordering of hierarchical content types.
	 */
	menuOrder?: Maybe<Scalars['Int']>;
	/**
	 * If the post is an attachment or a media file, this field will carry the
	 * corresponding MIME type. This field is equivalent to the value of
	 * WP_Post->post_mime_type and the post_mime_type column in the "post_objects"
	 * database table.
	 */
	mimeType?: Maybe<MimeTypeEnum>;
	/** The ID of the parent object */
	parentId?: Maybe<Scalars['ID']>;
	/** The password used to protect the content of the object */
	password?: Maybe<Scalars['String']>;
	/** The ping status for the object */
	pingStatus?: Maybe<Scalars['String']>;
	/** URLs that have been pinged. */
	pinged?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** The slug of the object */
	slug?: Maybe<Scalars['String']>;
	/** The status of the object */
	status?: Maybe<PostStatusEnum>;
	/** Set connections between the post and tags */
	tags?: Maybe<PostTagsInput>;
	/** The title of the post */
	title?: Maybe<Scalars['String']>;
	/** URLs queued to be pinged. */
	toPing?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** The payload for the updatePost mutation */
export type UpdatePostPayload = {
	__typename?: 'UpdatePostPayload';
	clientMutationId: Scalars['String'];
	post?: Maybe<Post>;
};

/** Input for the updateSettings mutation */
export type UpdateSettingsInput = {
	clientMutationId: Scalars['String'];
	/** Allow people to submit comments on new posts. */
	discussionSettingsDefaultCommentStatus?: Maybe<Scalars['String']>;
	/** Allow link notifications from other blogs (pingbacks and trackbacks) on new articles. */
	discussionSettingsDefaultPingStatus?: Maybe<Scalars['String']>;
	/** A date format for all date strings. */
	generalSettingsDateFormat?: Maybe<Scalars['String']>;
	/** Site tagline. */
	generalSettingsDescription?: Maybe<Scalars['String']>;
	/** This address is used for admin purposes, like new user notification. */
	generalSettingsEmail?: Maybe<Scalars['String']>;
	/** WordPress locale code. */
	generalSettingsLanguage?: Maybe<Scalars['String']>;
	/** A day number of the week that the week should start on. */
	generalSettingsStartOfWeek?: Maybe<Scalars['Int']>;
	/** A time format for all time strings. */
	generalSettingsTimeFormat?: Maybe<Scalars['String']>;
	/** A city in the same timezone as you. */
	generalSettingsTimezone?: Maybe<Scalars['String']>;
	/** Site title. */
	generalSettingsTitle?: Maybe<Scalars['String']>;
	/** Site URL. */
	generalSettingsUrl?: Maybe<Scalars['String']>;
	/** Blog pages show at most. */
	readingSettingsPostsPerPage?: Maybe<Scalars['Int']>;
	/** Default post category. */
	writingSettingsDefaultCategory?: Maybe<Scalars['Int']>;
	/** Default post format. */
	writingSettingsDefaultPostFormat?: Maybe<Scalars['String']>;
	/** Convert emoticons like :-) and :-P to graphics on display. */
	writingSettingsUseSmilies?: Maybe<Scalars['Boolean']>;
};

/** The payload for the updateSettings mutation */
export type UpdateSettingsPayload = {
	__typename?: 'UpdateSettingsPayload';
	allSettings?: Maybe<Settings>;
	clientMutationId: Scalars['String'];
	discussionSettings?: Maybe<DiscussionSettings>;
	generalSettings?: Maybe<GeneralSettings>;
	readingSettings?: Maybe<ReadingSettings>;
	writingSettings?: Maybe<WritingSettings>;
};

/** Input for the UpdateTag mutation */
export type UpdateTagInput = {
	/** The slug that the post_tag will be an alias of */
	aliasOf?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/** The description of the post_tag object */
	description?: Maybe<Scalars['String']>;
	/** The ID of the tag object to update */
	id: Scalars['ID'];
	/** The name of the post_tag object to mutate */
	name?: Maybe<Scalars['String']>;
	/**
	 * If this argument exists then the slug will be checked to see if it is not an
	 * existing valid term. If that check succeeds (it is not a valid term), then it
	 * is added and the term id is given. If it fails, then a check is made to
	 * whether the taxonomy is hierarchical and the parent argument is not empty. If
	 * the second check succeeds, the term will be inserted and the term id will be
	 * given. If the slug argument is empty, then it will be calculated from the term name.
	 */
	slug?: Maybe<Scalars['String']>;
};

/** The payload for the UpdateTag mutation */
export type UpdateTagPayload = {
	__typename?: 'UpdateTagPayload';
	clientMutationId: Scalars['String'];
	/** The created post_tag */
	tag?: Maybe<Tag>;
};

/** Input for the updateUser mutation */
export type UpdateUserInput = {
	/** User's AOL IM account. */
	aim?: Maybe<Scalars['String']>;
	clientMutationId: Scalars['String'];
	/** A string containing content about the user. */
	description?: Maybe<Scalars['String']>;
	/**
	 * A string that will be shown on the site. Defaults to user's username. It is
	 * likely that you will want to change this, for both appearance and security
	 * through obscurity (that is if you dont use and delete the default admin user).
	 */
	displayName?: Maybe<Scalars['String']>;
	/** A string containing the user's email address. */
	email?: Maybe<Scalars['String']>;
	/** 	The user's first name. */
	firstName?: Maybe<Scalars['String']>;
	/** The ID of the user */
	id: Scalars['ID'];
	/** User's Jabber account. */
	jabber?: Maybe<Scalars['String']>;
	/** The user's last name. */
	lastName?: Maybe<Scalars['String']>;
	/** User's locale. */
	locale?: Maybe<Scalars['String']>;
	/** A string that contains a URL-friendly name for the user. The default is the user's username. */
	nicename?: Maybe<Scalars['String']>;
	/** The user's nickname, defaults to the user's username. */
	nickname?: Maybe<Scalars['String']>;
	/** A string that contains the plain text password for the user. */
	password?: Maybe<Scalars['String']>;
	/** The date the user registered. Format is Y-m-d H:i:s. */
	registered?: Maybe<Scalars['String']>;
	/** A string for whether to enable the rich editor or not. False if not empty. */
	richEditing?: Maybe<Scalars['String']>;
	/** An array of roles to be assigned to the user. */
	roles?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** A string containing the user's URL for the user's web site. */
	websiteUrl?: Maybe<Scalars['String']>;
	/** User's Yahoo IM account. */
	yim?: Maybe<Scalars['String']>;
};

/** The payload for the updateUser mutation */
export type UpdateUserPayload = {
	__typename?: 'UpdateUserPayload';
	clientMutationId: Scalars['String'];
	user?: Maybe<User>;
};

/** A User object */
export type User = Node & {
	__typename?: 'User';
	/** Avatar object for user. The avatar object can be retrieved in different sizes by specifying the size argument. */
	avatar?: Maybe<Avatar>;
	/** User metadata option name. Usually it will be &quot;wp_capabilities&quot;. */
	capKey?: Maybe<Scalars['String']>;
	/**
	 * This field is the id of the user. The id of the user matches WP_User-&gt;ID
	 * field and the value in the ID column for the &quot;users&quot; table in SQL.
	 */
	capabilities?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Connection between the User type and the User type */
	comments?: Maybe<UserToCommentConnection>;
	/** Description of the user. */
	description?: Maybe<Scalars['String']>;
	/** Email of the user. This is equivalent to the WP_User-&gt;user_email property. */
	email?: Maybe<Scalars['String']>;
	/** Connection between the User type and the User type */
	espressoEvents?: Maybe<UserToEspressoEventConnection>;
	/** Connection between the User type and the User type */
	espressoVenues?: Maybe<UserToEspressoVenueConnection>;
	/**
	 * A complete list of capabilities including capabilities inherited from a role.
	 * This is equivalent to the array keys of WP_User-&gt;allcaps.
	 */
	extraCapabilities?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** First name of the user. This is equivalent to the WP_User-&gt;user_first_name property. */
	firstName?: Maybe<Scalars['String']>;
	/** The globally unique identifier for the user object. */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** Last name of the user. This is equivalent to the WP_User-&gt;user_last_name property. */
	lastName?: Maybe<Scalars['String']>;
	/** The preferred language locale set for the user. Value derived from get_user_locale(). */
	locale?: Maybe<Scalars['String']>;
	/** Connection between the User type and the User type */
	mediaItems?: Maybe<UserToMediaItemConnection>;
	/** Display name of the user. This is equivalent to the WP_User-&gt;dispaly_name property. */
	name?: Maybe<Scalars['String']>;
	/** The nicename for the user. This field is equivalent to WP_User-&gt;user_nicename */
	nicename?: Maybe<Scalars['String']>;
	/** Nickname of the user. */
	nickname?: Maybe<Scalars['String']>;
	/** Connection between the User type and the User type */
	pages?: Maybe<UserToPageConnection>;
	/** Connection between the User type and the User type */
	posts?: Maybe<UserToPostConnection>;
	/** The date the user registered or was created. The field follows a full ISO8601 date string format. */
	registeredDate?: Maybe<Scalars['String']>;
	/** Connection between the User and Revisions authored by the user */
	revisions?: Maybe<UserToContentRevisionUnionConnection>;
	/** Connection between the User type and the User type */
	roles?: Maybe<UserToUserRoleConnection>;
	/** The slug for the user. This field is equivalent to WP_User-&gt;user_nicename */
	slug?: Maybe<Scalars['String']>;
	/** A website url that is associated with the user. */
	url?: Maybe<Scalars['String']>;
	/** The Id of the user. Equivalent to WP_User-&gt;ID */
	userId?: Maybe<Scalars['Int']>;
	/** Username for the user. This field is equivalent to WP_User-&gt;user_login. */
	username?: Maybe<Scalars['String']>;
};

/** A User object */
export type UserAvatarArgs = {
	size?: Maybe<Scalars['Int']>;
	forceDefault?: Maybe<Scalars['Boolean']>;
	rating?: Maybe<AvatarRatingEnum>;
};

/** A User object */
export type UserCommentsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<UserToCommentConnectionWhereArgs>;
};

/** A User object */
export type UserEspressoEventsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<UserToEspressoEventConnectionWhereArgs>;
};

/** A User object */
export type UserEspressoVenuesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<UserToEspressoVenueConnectionWhereArgs>;
};

/** A User object */
export type UserMediaItemsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<UserToMediaItemConnectionWhereArgs>;
};

/** A User object */
export type UserPagesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<UserToPageConnectionWhereArgs>;
};

/** A User object */
export type UserPostsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<UserToPostConnectionWhereArgs>;
};

/** A User object */
export type UserRevisionsArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
	where?: Maybe<UserToContentRevisionUnionConnectionWhereArgs>;
};

/** A User object */
export type UserRolesArgs = {
	first?: Maybe<Scalars['Int']>;
	last?: Maybe<Scalars['Int']>;
	after?: Maybe<Scalars['String']>;
	before?: Maybe<Scalars['String']>;
};

/** A user role object */
export type UserRole = Node & {
	__typename?: 'UserRole';
	/** The capabilities that belong to this role */
	capabilities?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** The display name of the role */
	displayName?: Maybe<Scalars['String']>;
	/** The globally unique identifier for the user role object. */
	id: Scalars['ID'];
	/** Whether the object is restricted from the current viewer */
	isRestricted?: Maybe<Scalars['Boolean']>;
	/** The registered name of the role */
	name?: Maybe<Scalars['String']>;
};

/** Names of available user roles */
export enum UserRoleEnum {
	Administrator = 'ADMINISTRATOR',
	Author = 'AUTHOR',
	Contributor = 'CONTRIBUTOR',
	Customer = 'CUSTOMER',
	Editor = 'EDITOR',
	EventsAdministrator = 'EVENTS_ADMINISTRATOR',
	ShopManager = 'SHOP_MANAGER',
	Subscriber = 'SUBSCRIBER',
}

/** Field to order the connection by */
export enum UsersConnectionOrderbyEnum {
	/** Order by display name */
	DisplayName = 'DISPLAY_NAME',
	/** Order by email address */
	Email = 'EMAIL',
	/** Order by login */
	Login = 'LOGIN',
	/** Preserve the login order given in the LOGIN_IN array */
	LoginIn = 'LOGIN_IN',
	/** Order by nice name */
	NiceName = 'NICE_NAME',
	/** Preserve the nice name order given in the NICE_NAME_IN array */
	NiceNameIn = 'NICE_NAME_IN',
	/** Order by registration date */
	Registered = 'REGISTERED',
	/** Order by URL */
	Url = 'URL',
}

/** Options for ordering the connection */
export type UsersConnectionOrderbyInput = {
	field: UsersConnectionOrderbyEnum;
	order?: Maybe<OrderEnum>;
};

/** Connection between the User type and the User type */
export type UserToCommentConnection = {
	__typename?: 'UserToCommentConnection';
	/** Edges for the UserToCommentConnection connection */
	edges?: Maybe<Array<Maybe<UserToCommentConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Comment>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type UserToCommentConnectionEdge = {
	__typename?: 'UserToCommentConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Comment>;
};

/** Arguments for filtering the UserToCommentConnection connection */
export type UserToCommentConnectionWhereArgs = {
	/** Comment author email address. */
	authorEmail?: Maybe<Scalars['String']>;
	/** Array of author IDs to include comments for. */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to exclude comments for. */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Comment author URL. */
	authorUrl?: Maybe<Scalars['String']>;
	/** Array of comment IDs to include. */
	commentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of IDs of users whose unapproved comments will be returned by the
	 * 							query regardless of status.
	 */
	commentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Include comments of a given type. */
	commentType?: Maybe<Scalars['String']>;
	/** Include comments from a given array of comment types. */
	commentTypeIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Exclude comments from a given array of comment types. */
	commentTypeNotIn?: Maybe<Scalars['String']>;
	/** Content object author ID to limit results by. */
	contentAuthor?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs to retrieve comments for. */
	contentAuthorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Array of author IDs *not* to retrieve comments for. */
	contentAuthorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Limit results to those affiliated with a given content object
	 * 							ID.
	 */
	contentId?: Maybe<Scalars['ID']>;
	/**
	 * Array of content object IDs to include affiliated comments
	 * 							for.
	 */
	contentIdIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of content object IDs to exclude affiliated comments
	 * 							for.
	 */
	contentIdNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Content object name to retrieve affiliated comments for. */
	contentName?: Maybe<Scalars['String']>;
	/** Content Object parent ID to retrieve affiliated comments for. */
	contentParent?: Maybe<Scalars['Int']>;
	/**
	 * Array of content object statuses to retrieve affiliated comments for.
	 * 							Pass 'any' to match any value.
	 */
	contentStatus?: Maybe<Array<Maybe<PostStatusEnum>>>;
	/** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
	contentType?: Maybe<Array<Maybe<PostTypeEnum>>>;
	/**
	 * Array of IDs or email addresses of users whose unapproved comments will be
	 * returned by the query regardless of $status. Default empty
	 */
	includeUnapproved?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Karma score to retrieve matching comments for. */
	karma?: Maybe<Scalars['Int']>;
	/** The cardinality of the order of the connection */
	order?: Maybe<OrderEnum>;
	/** Field to order the comments by. */
	orderby?: Maybe<CommentsConnectionOrderbyEnum>;
	/** Parent ID of comment to retrieve children of. */
	parent?: Maybe<Scalars['Int']>;
	/** Array of parent IDs of comments to retrieve children for. */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of parent IDs of comments *not* to retrieve children
	 * 							for.
	 */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Search term(s) to retrieve matching comments for. */
	search?: Maybe<Scalars['String']>;
	/** Comment status to limit results by. */
	status?: Maybe<Scalars['String']>;
	/** Include comments for a specific user ID. */
	userId?: Maybe<Scalars['ID']>;
};

/** Connection between the User type and the User type */
export type UserToContentRevisionUnionConnection = {
	__typename?: 'UserToContentRevisionUnionConnection';
	/** Edges for the UserToContentRevisionUnionConnection connection */
	edges?: Maybe<Array<Maybe<UserToContentRevisionUnionConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<ContentRevisionUnion>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type UserToContentRevisionUnionConnectionEdge = {
	__typename?: 'UserToContentRevisionUnionConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<ContentRevisionUnion>;
};

/** Arguments for filtering the UserToContentRevisionUnionConnection connection */
export type UserToContentRevisionUnionConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the User type and the User type */
export type UserToEspressoEventConnection = {
	__typename?: 'UserToEspressoEventConnection';
	/** Edges for the UserToEspressoEventConnection connection */
	edges?: Maybe<Array<Maybe<UserToEspressoEventConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoEvent>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type UserToEspressoEventConnectionEdge = {
	__typename?: 'UserToEspressoEventConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoEvent>;
};

/** Arguments for filtering the UserToEspressoEventConnection connection */
export type UserToEspressoEventConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the User type and the User type */
export type UserToEspressoVenueConnection = {
	__typename?: 'UserToEspressoVenueConnection';
	/** Edges for the UserToEspressoVenueConnection connection */
	edges?: Maybe<Array<Maybe<UserToEspressoVenueConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<EspressoVenue>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type UserToEspressoVenueConnectionEdge = {
	__typename?: 'UserToEspressoVenueConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<EspressoVenue>;
};

/** Arguments for filtering the UserToEspressoVenueConnection connection */
export type UserToEspressoVenueConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the User type and the User type */
export type UserToMediaItemConnection = {
	__typename?: 'UserToMediaItemConnection';
	/** Edges for the UserToMediaItemConnection connection */
	edges?: Maybe<Array<Maybe<UserToMediaItemConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<MediaItem>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type UserToMediaItemConnectionEdge = {
	__typename?: 'UserToMediaItemConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<MediaItem>;
};

/** Arguments for filtering the UserToMediaItemConnection connection */
export type UserToMediaItemConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the User type and the User type */
export type UserToPageConnection = {
	__typename?: 'UserToPageConnection';
	/** Edges for the UserToPageConnection connection */
	edges?: Maybe<Array<Maybe<UserToPageConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Page>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type UserToPageConnectionEdge = {
	__typename?: 'UserToPageConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Page>;
};

/** Arguments for filtering the UserToPageConnection connection */
export type UserToPageConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the User type and the User type */
export type UserToPostConnection = {
	__typename?: 'UserToPostConnection';
	/** Edges for the UserToPostConnection connection */
	edges?: Maybe<Array<Maybe<UserToPostConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<Post>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
	/** Information about the type of content being queried */
	postTypeInfo?: Maybe<PostType>;
};

/** An edge in a connection */
export type UserToPostConnectionEdge = {
	__typename?: 'UserToPostConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<Post>;
};

/** Arguments for filtering the UserToPostConnection connection */
export type UserToPostConnectionWhereArgs = {
	/**
	 * The user that's connected as the author of the object. Use the
	 * 							userId for the author object.
	 */
	author?: Maybe<Scalars['Int']>;
	/** Find objects connected to author(s) in the array of author's userIds */
	authorIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Find objects connected to the author by the author's nicename */
	authorName?: Maybe<Scalars['String']>;
	/**
	 * Find objects NOT connected to author(s) in the array of author's
	 * 							userIds
	 */
	authorNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Category ID */
	categoryId?: Maybe<Scalars['Int']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Use Category Slug */
	categoryName?: Maybe<Scalars['String']>;
	/**
	 * Array of category IDs, used to display objects from one
	 * 										category OR another
	 */
	categoryNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Filter the connection based on dates */
	dateQuery?: Maybe<DateQueryInput>;
	/**
	 * True for objects with passwords; False for objects without passwords;
	 * 							null for all objects with or without passwords
	 */
	hasPassword?: Maybe<Scalars['Boolean']>;
	/** Specific ID of the object */
	id?: Maybe<Scalars['Int']>;
	/** Array of IDs for the objects to retrieve */
	in?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Get objects with a specific mimeType property */
	mimeType?: Maybe<MimeTypeEnum>;
	/** Slug / post_name of the object */
	name?: Maybe<Scalars['String']>;
	/** Specify objects to retrieve. Use slugs */
	nameIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Specify IDs NOT to retrieve. If this is used in the same query as "in",
	 * 							it will be ignored
	 */
	notIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** What paramater to use to order the objects by. */
	orderby?: Maybe<Array<Maybe<PostObjectsConnectionOrderbyInput>>>;
	/**
	 * Use ID to return only children. Use 0 to return only top-level
	 * 							items
	 */
	parent?: Maybe<Scalars['String']>;
	/** Specify objects whose parent is in an array */
	parentIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Specify posts whose parent is not in an array */
	parentNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Show posts with a specific password. */
	password?: Maybe<Scalars['String']>;
	/** Show Posts based on a keyword search */
	search?: Maybe<Scalars['String']>;
	stati?: Maybe<Array<Maybe<PostStatusEnum>>>;
	status?: Maybe<PostStatusEnum>;
	/** Tag Slug */
	tag?: Maybe<Scalars['String']>;
	/** Use Tag ID */
	tagId?: Maybe<Scalars['String']>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag IDs, used to display objects from one tag OR
	 * 							another
	 */
	tagNotIn?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/**
	 * Array of tag slugs, used to display objects from one tag OR
	 * 							another
	 */
	tagSlugAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
	/**
	 * Array of tag slugs, used to exclude objects in specified
	 * 							tags
	 */
	tagSlugIn?: Maybe<Array<Maybe<Scalars['String']>>>;
	/** Title of the object */
	title?: Maybe<Scalars['String']>;
};

/** Connection between the User type and the User type */
export type UserToUserRoleConnection = {
	__typename?: 'UserToUserRoleConnection';
	/** Edges for the UserToUserRoleConnection connection */
	edges?: Maybe<Array<Maybe<UserToUserRoleConnectionEdge>>>;
	/** The nodes of the connection, without the edges */
	nodes?: Maybe<Array<Maybe<UserRole>>>;
	/** Information about pagination in a connection. */
	pageInfo?: Maybe<WpPageInfo>;
};

/** An edge in a connection */
export type UserToUserRoleConnectionEdge = {
	__typename?: 'UserToUserRoleConnectionEdge';
	/** A cursor for use in pagination */
	cursor?: Maybe<Scalars['String']>;
	/** The item at the end of the edge */
	node?: Maybe<UserRole>;
};

/** Information about pagination in a connection. */
export type WpPageInfo = {
	__typename?: 'WPPageInfo';
	/** When paginating forwards, the cursor to continue. */
	endCursor?: Maybe<Scalars['String']>;
	/** When paginating forwards, are there more items? */
	hasNextPage: Scalars['Boolean'];
	/** When paginating backwards, are there more items? */
	hasPreviousPage: Scalars['Boolean'];
	/** When paginating backwards, the cursor to continue. */
	startCursor?: Maybe<Scalars['String']>;
};

/** The writing setting type */
export type WritingSettings = {
	__typename?: 'WritingSettings';
	/** Default post category. */
	defaultCategory?: Maybe<Scalars['Int']>;
	/** Default post format. */
	defaultPostFormat?: Maybe<Scalars['String']>;
	/** Convert emoticons like :-) and :-P to graphics on display. */
	useSmilies?: Maybe<Scalars['Boolean']>;
};
