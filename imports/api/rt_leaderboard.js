if(Meteor.isServer) {
  var database = new MongoInternals.RemoteCollectionDriver("mongodb://mongospreview.urup.com:27017/urup");
  export const RT_Leaderboard = new Mongo.Collection("leaderboards", { _driver: database });

  Meteor.publish('rt_leaders', function() {
    console.log("rt_leaders: " + RT_Leaderboard.find().count());
    return RT_Leaderboard.find();
  });
}

if (Meteor.isClient) {
//  Meteor.subscribe('rt_leaders');
  export const RT_Leaderboard = new Mongo.Collection("rt_leaders");
  Template.rt_leaderboard.onCreated(function rtlbOnCreated() {
  //  this.state = new ReactiveDict();
    Meteor.subscribe('rt_leaders');
  });
}

Template.rt_leaderboard.helpers({
  rt_lead:  function() {
    var widget = Session.get('widget_id');
    console.log("widget: " + widget);
    return RT_Leaderboard.find({'leaderboard.widget_id':widget}, {'leaderboard.list_entries':{$slice:10}});
  }
});
