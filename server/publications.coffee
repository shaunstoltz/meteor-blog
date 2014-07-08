Meteor.publish 'commentsBySlug', (slug) ->
  check slug, String

  Comment.find slug: slug

Meteor.publish 'singlePostBySlug', (slug) ->
  check slug, String

  Post.find slug: slug

Meteor.publish 'singlePostById', (id) ->
  check id, String

  Post.find _id: id

Meteor.publish 'postTags', ->
  initializing = true
  tags = Tag.first().tags

  handle = Post.find({}, {fields: {tags: 1}}).observeChanges
    added: (id, fields) =>
      if fields.tags
        doc = Tag.first()
        tags = _.uniq doc.tags.concat(Post.splitTags(fields.tags))
        doc.update tags: tags
        @changed('blog_tags', 42, {tags: tags}) unless initializing

    changed: (id, fields) =>
      if fields.tags
        doc = Tag.first()
        tags = _.uniq doc.tags.concat(Post.splitTags(fields.tags))
        doc.update tags: tags
        @changed('blog_tags', 42, {tags: tags}) unless initializing

  initializing = false
  @added 'blog_tags', 42, {tags: tags}
  @ready()
  @onStop -> handle.stop()

Meteor.publish 'posts', (limit) ->
  check limit, Match.Optional(Number)

  Post.find {},
    fields: body: 0
    sort: publishedAt: -1
    limit: limit

Meteor.publish 'taggedPosts', (tag) ->
  check tag, String

  Post.find {tags: tag},
    fields: body: 0
    sort: publishedAt: -1

Meteor.publish 'authors', ->
  ids = _.pluck Post.all fields: id: 1, 'id'

  Author.find
    id: $in: ids
  ,
    fields:
      profile: 1
      username: 1
      emails: 1
