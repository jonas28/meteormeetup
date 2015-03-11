Template.postsGet.events({
    'submit form': function(e) {
        e.preventDefault();

        var post = {
            from_id: $(e.target).find('[name=fromid]').val()
        };

        Meteor.call('postsGet', post, function(error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);

            // show this result but route anyway
            if (result.postExists)
                throwError('This link has already been posted');

            Router.go('postsList');
        });

    }
});