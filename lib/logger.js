/*
 * logger.js: Titanium CLI logger
 *
 * Copyright (c) 2012, Appcelerator, Inc.  All Rights Reserved.
 * See the LICENSE file for more information.
 *
 * Portions derived from winston under the MIT license.
 * Copyright (c) 2010 Charlie Robbins
 * https://github.com/flatiron/winston
 */

var path = require('path'),
	winston = require('winston'),
	common = require(path.join(path.dirname(require.resolve('winston')), 'winston', 'common.js')),
	sprintf = require('sprintf').sprintf,
	config = require('./config'),
	consoul = new winston.transports.Console({
		level: config.cli.logLevel || 'warn',
		colorize: !!config.cli.colors
	}),
	logger = exports = module.exports = new winston.Logger({
		transports: [ consoul ],
		silent: !!config.cli.quiet
	}),
	origLoggerLog = logger.log,
	bannerEnabled = true;

logger.silence = function (val) {
	consoul.silent = val;
};

logger.getLevels = function () {
	return Object.keys(logger.levels).filter(function (x) {
		return x != '_';
	});
};

logger.setLevel = function (n) {
	consoul.level = n;
};

logger.log = function () {
	var args = Array.prototype.slice.call(arguments),
		padLevels = logger.padLevels;
	
	// if there are no args (i.e. a blank line), we need at least one space
	args.length || args.unshift(' ');
	
	// if we're not being called from info/warn/error/debug, then set this as a general log entry
	args[0] in logger.levels || args.unshift('_');
	
	// turn off padding
	logger.padLevels = false;
	
	// if we're logging an error, we need to cast to a string so that sprintf doesn't complain
	if (args[1] instanceof Error || Object.prototype.toString.call(args[1]) == '[object Error]') {
		args[1] = (args[1].stack || args[1].toString()) + '\n';
	}
	
	// call the original logger with our cleaned up args
	origLoggerLog.apply(logger, [args[0], sprintf.apply(null, args.slice(1))]);
	
	// restore padding
	logger.padLevels = padLevels;
	
	return logger;
};

logger.banner = function () {
	var info = require('node-appc').pkginfo.package(module, 'version', 'about');
	bannerEnabled && logger.log(info.about.name.cyan.bold + ', version ' + info.version + '\n' + info.about.copyright + '\n');
};

logger.bannerEnabled = function (b) {
	bannerEnabled = !!b;
};

// override the Console log() function to strip off the ':' after the level
consoul.log = function (level, msg, meta, callback) {
	if (this.silent) {
		return callback(null, true);
	}
	
	if (level != '_') {
		msg = '\b\b' + msg;
	}
	
	this.colorize || (msg = msg.stripColors);
	
	var output = common.log({
		colorize:    true,
		json:        this.json,
		level:       level,
		message:     level == 'error' ? msg.red : msg,
		meta:        meta,
		stringify:   this.stringify,
		timestamp:   this.timestamp,
		prettyPrint: this.prettyPrint,
		raw:         this.raw
	});
	
	if (/^\: /.test(output) && level == '_') {
		output = output.substring(2);
	}
	
	if (level === 'error' || level === 'debug') {
		console.error(output);
	} else {
		console.log(output);
	}
	
	this.emit('logged');
	callback(null, true);
};

// override the colorize() function so we can change the level formatting
winston.config.colorize = function (level) {
	return level == '_' ? '' : ('[' + level.toUpperCase() + '] ')[winston.config.allColors[level]];
};

logger.exception = function (ex) {
	if (ex.stack) {
		ex.stack.split('\n').forEach(logger.error);
	} else {
		logger.error(ex.toString());
	}
	logger.log();
};

// init the logger with sensible cli defaults
logger.cli();

// override levels, must be done after calling cli()
logger.setLevels({
	trace: 0,
	debug: 1,
	info: 2,
	warn: 3,
	error: 4,
	_: 5 // generic log() call
});

// override colors, must be done after calling cli()
winston.addColors({
	trace: 'grey',
	debug: 'magenta'
});