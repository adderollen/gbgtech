Meteor.methods({
	removeEvents: function (orgID) {
		console.log(orgID)
		var n = Events.find({"org": orgID}).fetch().length
		Events.remove({"org": orgID})
		return n;
	}
})