Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});

//
// Example pages routes
//
Router.route('/login', function () {
    this.render('login');
    this.layout('blankLayout')
});

Router.route('/forgotPassword', function () {
    this.render('forgotPassword');
    this.layout('blankLayout')
});

Router.route('/register', function () {
    this.render('register');
    this.layout('blankLayout')
});

Router.route('/campaigns', function () {
    this.render('campaigns');
});

Router.route('/widgets', function () {
    this.render('widgets');
});

Router.route('/leaderboard', function () {
    this.render('leaderboard');
});

Router.route('/rt_leaderboard', function () {
    this.render('rt_leaderboard');
});

Router.route('/interactions', function () {
    this.render('interactions');
});

Router.route('/widget_profiles', function () {
    this.render('widget_profiles');
});

Router.route('/participants', function () {
    this.render('participants');
});

Router.route('/', function () {
    Router.go('login');
});
