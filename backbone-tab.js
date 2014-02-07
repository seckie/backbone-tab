/**
 * backbone-tab
 *
 * @author     Naoki Sekiguchi
 * @url        http://likealunatic.jp
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 */

;(function($, _, Backbone, window, document, undefined) {

$.Tab = Backbone.View.extend({
	events: {
		'click': 'clickHandler'
	},
	initialize: function (options) {
		this.opt = {
			onClassName: 'on',
			defaultIndex: 0,
			effect: true
		};
		_.extend(this.opt, options);

		// elements
		this.$targets = $({});
		this.initTarget();
		this.$container = this.$targets.parent();

		this.$targets.eq(this.opt.defaultIndex).show();

		this.render();
	},

	render: function () {
		var self = this;
		this.$el.each(function (i, el) {
			if (i === self.opt.defaultIndex) {
				$(el).addClass(self.opt.onClassName);
			} else {
				$(el).removeClass(self.opt.onClassName);
			}
		});
		this.watchURI();
	},

	initTarget: function () {
		var self = this;
		this.$el.each(function (i, el) {
			var $el = $(el),
				targetId = $el.attr('href'),
				target;
			targetId = targetId.slice(targetId.lastIndexOf('#'));
			target = $(targetId).hide();
			self.$targets = self.$targets.add(target);
			$el.data('index', i);
		});
	},

	clickHandler: function (e) {
		var target = e.currentTarget;
		if (this.$container.is(':animated')) {
			// animation is in progress
			return false;
		}
		this.show(target);
		this.switchTab(target);
		e.preventDefault();
	},

	switchTab: function (clickedTab) {
		var self = this;
		this.$el.each(function (i, el) {
			var $el = $(el);
			if (clickedTab === el) {
				$el.addClass(self.opt.onClassName);
			} else {
				$el.removeClass(self.opt.onClassName);
			}
		});
	},

	show: function (clickedTab) {
		var self = this,
			currentTarget,
			currentHeight = this.$container.height();
		this.$targets.each(function (i, target) {
			if (parseInt($(clickedTab).data('index'), 10) === i) {
				currentTarget = target;
				$(target).css('visibility', 'hidden').show();
			} else {
				$(target).hide();
			}
		});
		if (this.opt.effect) {
			// with effect
			this.$container.stop(true, true).css({
				overflow: 'hidden',
				height: currentHeight 
			}).animate({
				height: $(currentTarget).outerHeight()
			}, 350, function() {
				$(currentTarget).hide().css('visibility', 'visible').fadeIn();
				self.$container.css({
					overflow: '',
					height: ''
				});
			});
		} else {
			// no effect
			$(currentTarget).css('visibility', 'visible');
		}
	},

	watchURI: function () {
		// initial hash modulation
		var targetTab = this.getTargetTabFromURI(location.href);
		if (targetTab) {
			this.show(targetTab);
			this.switchTab(targetTab);
		}
	},

	getTargetTabFromURI: function (uri) {
		var targetTab,
			hash = '',
			hashRegExp = /#[a-zA-Z0-9\-_]+$/;
		if (hashRegExp.test(uri)) {
			hash = uri.slice(uri.search(hashRegExp));
			this.$el.each(function (i, el) {
				if (typeof el.href != 'string') {
					return true;
				}
				if (hash === el.href.slice(el.href.search(hashRegExp))) {
					targetTab = el;
				}
			});
			if (targetTab) {
				return targetTab;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

});

})(jQuery, _, Backbone, this, this.document);
