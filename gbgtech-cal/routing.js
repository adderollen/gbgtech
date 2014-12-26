Router.route('/', function() {
	this.render('home')
}, {
	name: 'home'
})

Router.route('/organization', function() {
	this.render('orgList')
}, {
	name: 'orgList'
})

Router.route('/organization/new', function() {
	this.render('orgCreate')
}, {
	name: 'orgCreate'
})

Router.route('/organization/:_id', function() {
	this.render('orgView', {
		data: function() {
			templateData = { org: Organizations.findOne({_id: this.params._id})};
			return templateData;
		}
	})
})

Router.route('/event', function() {
	this.render('eventList')
}, {
	name: 'eventList'
})

Router.route('/event/new', function() {
	this.render('eventCreate')
}, {
	name: 'eventCreate'
})

Router.route('/event/:_id', function() {
	this.render('eventView', {
		data: function() {
			templateData = { event: Events.findOne({_id: this.params._id})};
			return templateData;
		}
	})
})

