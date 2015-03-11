Package.describe({
    name: 'fbinsights',
    summary: "Facebook Insights package",
    version: '1.0.0'
});

Package.onUse(function (api) {
    api.versionsFrom('0.9.4');
    api.addFiles('fbinsights.js', 'server');
    api.export('Fbinsights');
});