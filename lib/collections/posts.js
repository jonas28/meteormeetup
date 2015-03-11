Posts = new Mongo.Collection('posts');

validatePost = function (post) {
    var errors = {};

    if (!post.object_id)
        errors.object_id = "Please fill in a object_id";

    if (!post.from_id)
        errors.from_id =  "Please fill in a from_id";

    return errors;
}

Meteor.methods({
    postInsert: function(postAttributes) {
        check(this.userId, String);
        check(postAttributes, {
            object_id: String,
            from_id: String,
            url: String
        });

        var errors = validatePost(postAttributes);
        if (errors.object_id || errors.from_id)
            throw new Meteor.Error('invalid-post', "You must set a object ID and from ID for your post");

        var postWithSameLink = Posts.findOne({object_id: postAttributes.object_id});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            submitted: new Date()
        });

        // shorten link URL
        if(Meteor.isServer){
            var shortUrl = Bitly.shortenURL(post.url);
            if(post.url && shortUrl)
                post.shortUrl = shortUrl;
                var fid = post.from_id + "_" + post.object_id;
                post.post_impressions = Fbinsights.getPostImpressions(fid);
        }

        var postId = Posts.insert(post);

        return {
            _id: postId
        };
    },
    postsGet: function(postAttributes) {
        check(postAttributes, {
            from_id: String
        });

        var errors = validatePost(postAttributes);
        if (errors.from_id)
            throw new Meteor.Error('invalid-post', "You must set a Page ID");

        var self = this;
        // TODO Page ID muss noch aus dem Formular gezogen werden.
        var link = "https://graph.facebook.com/v2.2/133615754492/posts?limit=10&access_token=" + Meteor.settings.fbtoken;
        try {
            var response = HTTP.get(link);
            _.each(response.data.data, function (item) {
                var doc = {
                    fid: item.id,
                    picture: item.picture
                    // TODO Hier noch mehr Insights aus der posts abfrage hinzufügen.
                    // TODO weitere Insights z.B. mit Fbinsights.getPostImpressions hinzufügen.
                };
                var postId = Posts.insert(doc);
                return {
                    _id: postId
                };
            });
        } catch (error) {
            console.log(error);
        }
    }
});
