Package.describe({
  summary: "A package that provides a blog at /blog",
  version: "0.8.7",
  name: "ryw:blog",
  git: "https://github.com/meteor-blog/meteor-blog.git"
});

Package.onUse(function(api) {
  api.versionsFrom(["1.2", "2.3.5"]);

  var both = ['client', 'server'];

  // PACKAGES FOR SERVER AND CLIENT

  api.use([
    'underscore',
    'coffeescript',
    'accounts-base',
    'iron:url@1.0.9',
    'kaptron:minimongoid@0.9.9',
    'momentjs:moment@2.10.6',
    'alanning:roles@3.4.0',
    'communitypackages:fast-render',
    'meteorhacks:subs-manager@1.6.2',
    'cfs:standard-packages@0.5.11',
    'cfs:gridfs@0.0.33',
    'cfs:s3@0.1.3'
  ], both);

  // FILES FOR SERVER AND CLIENT

  api.addFiles([
    'lib/boot.coffee',
    'collections/author.coffee',
    'collections/post.coffee',
    'collections/comment.coffee',
    'collections/tag.coffee',
    'collections/files.coffee',
    'router.coffee'
  ], both);

  // PACKAGES FOR CLIENT

  api.use([
    'session',
    'templating',
    'tracker',
    'reactive-var',
    'less@4.0.0',
    'aslagle:reactive-table@0.5.5',
    'liberation:shareit@1.1.3',
    'flawless:meteor-toastr@1.0.1'
  ], 'client');

  // FILES FOR CLIENT

  api.addFiles([
    'client/boot.coffee',

    // STYLESHEETS
    'client/stylesheets/loading.less',
    'client/stylesheets/lib/side-comments/side-comments.css',
    'client/stylesheets/lib/side-comments/default.css',
    'client/compatibility/bower_components/medium-editor/dist/css/medium-editor.css',
    'client/compatibility/bower_components/medium-editor/dist/css/themes/bootstrap.css',
    'client/compatibility/bower_components/medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.css',
    'client/stylesheets/lib/bootstrap-tagsinput.css',
    'client/stylesheets/lib/medium-editor-insert-plugin.css',

    // JAVASCRIPT LIBS
    'client/compatibility/side-comments.js',
    'client/compatibility/bower_components/medium-editor/dist/js/medium-editor.js',
    'client/compatibility/bower_components/handlebars/handlebars.runtime.js',
    'client/compatibility/handlebars.noconflict.js',
    'client/compatibility/bower_components/jquery-sortable/source/js/jquery-sortable.js',
    'client/compatibility/bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
    'client/compatibility/bower_components/blueimp-file-upload/js/jquery.iframe-transport.js',
    'client/compatibility/bower_components/blueimp-file-upload/js/jquery.fileupload.js',
    'client/compatibility/bower_components/medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin.js',
    'client/compatibility/bootstrap-tagsinput.js',
    'client/compatibility/typeahead.jquery.js',
    'client/compatibility/beautify-html.js',
    'client/compatibility/highlight.pack.js',

    // PACKAGE FILES
    'client/views/loading.html',
    'client/views/admin/admin.less',
    'client/views/admin/admin.html',
    'client/views/admin/admin.coffee',
    'client/views/admin/edit.html',
    'client/views/admin/editor.coffee',
    'client/views/admin/edit.coffee',
    'client/stylesheets/variables.import.less',
    'client/views/blog/blog.less',
    'client/views/blog/blog.html',
    'client/views/blog/show.html',
    'client/views/blog/blog.coffee',
    'client/views/widget/latest.html',
    'client/views/widget/latest.coffee'
  ], 'client');

  // STATIC ASSETS FOR CLIENT

  api.addAssets([
    'public/default-user.png',
  ], 'client');

  // FILES FOR SERVER

  api.addFiles([
    'collections/config.coffee',
    'server/boot.coffee',
    'server/rss.coffee',
    'server/publications.coffee'
  ], 'server');

  // PACKAGES FOR SERVER

  api.use([
    'check',
    'simple:json-routes@1.0.4'
  ], 'server');

  Npm.depends({ rss: '0.0.4' });
});

Package.onTest(function (api) {
  api.use('kadira:flow-router');
  api.use('ryw:blog');
  api.use('tinytest');
  api.use('coffeescript');

  Npm.depends({ rss: '0.0.4' });

  api.addFiles('test/server/rss.coffee', 'server');
});
