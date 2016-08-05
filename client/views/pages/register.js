if (Meteor.isClient) {
    Template.register.events({
        'submit form': function(event) {
            event.preventDefault();
            var emailVar = event.target.registerEmail.value;
            var passwordVar = event.target.registerPassword.value;
            var nameVar = event.target.registerName.value;
            var opt_in = event.target.opt_in.value;
            console.log("Form submitted.");
            Accounts.createUser({
                email: emailVar,
                password: passwordVar,
                name: nameVar,
                opt_in: opt_in
            });
            Router.go('campaigns');
        }
    });
}
