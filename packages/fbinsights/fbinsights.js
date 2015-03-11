Fbinsights = {};

Fbinsights.getPostImpressions = function(fid){
    if(!Meteor.settings.fbtoken)
        throw new Meteor.Error(500, 'Please provide a Facebook token in Meteor.settings');
    var link = "https://graph.facebook.com/v2.2/" + fid + "/insights/post_impressions/lifetime?access_token=" + Meteor.settings.fbtoken;
    var Response = Meteor.http.get(link);
    return Response.data.data[0].values[0].value
}

Fbinsights.getPosts = function(from_id){
    if(!Meteor.settings.fbtoken)
        throw new Meteor.Error(500, 'Please provide a Facebook token in Meteor.settings');
    var link = "https://graph.facebook.com/v2.2/" + fid + "/insights/post_impressions/lifetime?access_token=" + Meteor.settings.fbtoken;
    var Response = Meteor.http.get(link);
    return Response.data.data[0].values[0].value
}

