Template.contact.rendered = function(){

    // Set white background color for top navbar
    $('body').addClass('light-navbar');
};

Template.contact.destroyed = function(){
    // Remove special class
    $('body').removeClass('light-navbar');
};
