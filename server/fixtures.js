if (Posts.find().count() === 0) {
    Posts.insert({
        title: 'Google',
        url: 'http://google.de'
    });

    Posts.insert({
        title: 'Facebook',
        url: 'http://facebook.com'
    });

    Posts.insert({
        title: 'YouTube',
        url: 'http://youtube.com'
    });
}