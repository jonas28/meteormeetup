Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var post = {
            object_id: $(e.target).find('[name=objectid]').val(),
            from_id: $(e.target).find('[name=fromid]').val(),
            url: $(e.target).find('[name=url]').val()
        };

        var errors = validatePost(post);
        if (errors.object_id || errors.from_id || errors.url)
            return Session.set('postSubmitErrors', errors);

        Meteor.call('postInsert', post, function(error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);

            // show this result but route anyway
            if (result.postExists)
                throwError('This link has already been posted');

            Router.go('postPage', {_id: result._id});
        });
    }
});