var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];




Template.home.helpers({

})

Template.month.rendered = function() {
	if(!window.location.hash) {
		var d = new Date()
		Session.set('currentMonth', d.getMonth())
		Session.set('currentYear', d.getFullYear())
	} else {
		Session.set('currentMonth', _.indexOf(monthNames, window.location.hash.substring(5)))
		Session.set('currentYear', parseInt(window.location.hash.substring(1,5)))
	}

	// Render the month view
	this.autorun(function() {
		var m = Session.get('currentMonth')
		var y = Session.get('currentYear')

		d = new Date(y, m)
		nbrOfDays = new Date(y, m+1, 0).getDate();
		var weekNbr = 0;
		var newWeek = false;
		var startingDay = d.getDay(y,m,1)
		if(startingDay == 0) {
			startingDay = 6
		} else {
			startingDay = startingDay-1
		}
		$('#week-container').empty();
		// Render first week of month
		Blaze.renderWithData(Template.week, {'weekNbr': weekNbr}, $('#week-container').get(0))

		//Render dummy days if the month starts in the middle of the week
		for(var i = 0; i < startingDay; i++) {
			Blaze.renderWithData(Template.day, {'id': 'dummy-'+i}, $('#week-'+weekNbr).get(0))
		}
		var date = 1;
		// Render the days of the month
		for(var i = startingDay; i < nbrOfDays+startingDay; i++) {
			if(newWeek) {
				Blaze.renderWithData(Template.week, {'weekNbr': weekNbr}, $('#week-container').get(0))
				newWeek = false
			}
			Blaze.renderWithData(Template.day, {'id': y +"-"+m+"-"+date, 'date': date}, $('#week-'+weekNbr).get(0))
			date++;
			if((i%7) == 6) {
				newWeek = true;
				weekNbr++;
			}
		}
	})

	// Render all events in the calendar
	this.autorun(function() {
		var m = Session.get('currentMonth')
		var y = Session.get('currentYear')

		var events = Events.find({year: y, month: m}).fetch();
		events.forEach(function(event) {
			$('#'+y+"-"+m+"-"+event.day).append('<a href="/event/'+event._id+'">'+event.name+'</a>')
		})
	})
};

Template.month.helpers({
	currentMonthAndYear: function() {
		var m = Session.get('currentMonth')
		var y = Session.get('currentYear') 
		return monthNames[m] + ", " + y
	},

	inOrg: function(userID) {
		var orgs = Organizations.find({ "members": {$in :[userID._id] }}).fetch()
		if(orgs.length > 0) {
			return orgs
		} else {
			console.log("no org")
		}
	}
})

Template.month.events({
	'click input#next-month': function(evt, template) {
		var m = Session.get('currentMonth')
		var y = Session.get('currentYear')
		if(m == 11) {
			m = -1
			y = y+1
			Session.set('currentYear', y)
		}
		m= m+1
		Session.set('currentMonth', m)
		document.location.hash = y+monthNames[m]
	},

	'click input#prev-month': function(evt, template) {
		var m = Session.get('currentMonth')
		var y = Session.get('currentYear')
		if(m == 0) {
			m = 12
			y = y-1	
			Session.set('currentYear', y)
		}
		m = m-1
		Session.set('currentMonth', m)
		document.location.hash = y+monthNames[m]	
	},

	'mouseenter a': function(evt,template) {
		// Add a tooltip for the event
	},

	'mouseleave a': function(evt,template) {
		// Remove the tooltip for the event
	}
})

Template.eventList.helpers({
	events: function() {
		return Events.find();
	}
})

Template.eventCreate.rendered = function() {
	this.$('.datepicker').datepicker({
		dateFormat: "yy-mm-dd",
		minDate: 0
	});
}

Template.eventCreate.helpers({
	organizations: function() {
		return Organizations.find();
	}
})

Template.eventCreate.events({
	'submit form': function(evt, template) {
		event.preventDefault();
		var eventName = evt.target.eventName.value;
		var org = evt.target.org.value;
		var date = evt.target.date.value;
		var y = parseInt(date.substring(0,4))
		var m = parseInt(date.substring(5,7))
		m = m-1
		var d = parseInt(date.substring(8,10))
		Events.insert({
			createdAt: new Date(),
			name: eventName,
			org: org,
			year: y,
			month: m,
			day: d,
			date: date
		})
		Router.go('eventList')
	}
})

Template.orgList.helpers({
	organizations: function() {
		return Organizations.find();	
	}
})

Template.orgView.helpers({
	getMember: function(userID) {
		return Meteor.users.findOne({"_id": userID}).profile.name
	}
})

Template.orgCreate.events({
	'submit form': function(evt, template) {
		event.preventDefault();
		var orgName = evt.target.orgName.value;
		var owner = Meteor.user()._id;
		Organizations.insert({
			createdAt: new Date(),
			owner: owner,
			members: [owner],
			name: orgName
		})
		Router.go('orgList')
	}
})
