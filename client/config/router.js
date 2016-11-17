Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound'

});

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

Router.route('/survey', function () {
    this.render('survey');
});

Router.route('/contact', function () {
    this.render('contact');
});

Router.route('/account', function () {
    this.render('account');
});

Router.route('/', function () {
    Router.go('login');
});
