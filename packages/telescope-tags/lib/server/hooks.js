// make sure all categories in the post.categories array exist in the db
var checkCategories = function (post) {

  // if there are not categories, stop here
  if (!post.categories || post.categories.length === 0) {
    return;
  }

  // check how many of the categories given also exist in the db
  var categoryCount = Categories.find({_id: {$in: post.categories}}).count();

  if (post.categories.length !== categoryCount) {
    throw new Meteor.Error('invalid_category', i18n.t('invalid_category'));
  }
};

function postSubmitCheckCategories (post) {
  checkCategories(post);
  return post;
}
Telescope.callbacks.register("submitPost", postSubmitCheckCategories);

function postEditCheckCategories (updateObject) {
  var post = updateObject.$set;
  checkCategories(post);
  return updateObject;
}
Telescope.callbacks.register("submitPost", postEditCheckCategories);