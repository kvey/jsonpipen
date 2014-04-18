var should = require('chai').should(),
		exec = 	 require('child_process').exec,
		path = 	 require('path'),
		format = require('fomatto').Formatter();

var testFile = path.join(__dirname, '/youtube.json'),
		bin = 		 path.join(__dirname, '../bin/json');

// execute the given command, print stdout and stderr to the console, and invoke the callback when done.
var run = function(command, cb) {
	exec(command, function(error, stdout, stderr) {
		console.log(command);
		console.log(stdout);
		console.error(stderr);
		cb(error, stdout);
	});
};

describe('jsonpipen', function() {

  it('should select a string', function(done) {
  	run(format('cat {} | {} data.items[0].accessControl.embed', testFile, bin), function(err, output) {
  		output.should.equal('"allowed"');
  		done(err);
  	});
  });

  it('should select a number', function(done) {
  	run(format('cat {} | {} data.totalItems', testFile, bin), function(err, output) {
  		output.should.equal('800');
  		done(err);
  	});
  });

  it('should select a boolean', function(done) {
  	run(format('cat {} | {} data.testBool', testFile, bin), function(err, output) {
  		output.should.equal('true');
  		done(err);
  	});
  });

  it('should select null', function(done) {
  	run(format('cat {} | {} data.testNull', testFile, bin), function(err, output) {
  		output.should.equal('null');
  		done(err);
  	});
  });

  it('should select a subsection of json', function(done) {
  	run(format('cat {} | {} data.items[0].accessControl', testFile, bin), function(err, output) {
  		JSON.parse(output).should.deep.equal({
			  "syndicate": "allowed",
			  "commentVote": "allowed",
			  "rate": "allowed",
			  "list": "allowed",
			  "comment": "allowed",
			  "embed": "allowed",
			  "videoRespond": "moderated"
			});
  		done(err);
  	});
  });

  // -r
  it('should select a string and output without quotes with -r option', function(done) {
  	run(format('cat {} | {} -r data.items[0].accessControl.embed', testFile, bin), function(err, output) {
  		output.should.equal('allowed\n');
  		done(err);
  	});
  });

  it('should select a number with -r option', function(done) {
  	run(format('cat {} | {} -r data.totalItems', testFile, bin), function(err, output) {
  		output.should.equal('800\n');
  		done(err);
  	});
  });

  it('should select a boolean with -r option', function(done) {
  	run(format('cat {} | {} -r data.testBool', testFile, bin), function(err, output) {
  		output.should.equal('true\n');
  		done(err);
  	});
  });

  it('should select null with -r option', function(done) {
  	run(format('cat {} | {} -r data.testNull', testFile, bin), function(err, output) {
  		output.should.equal('null\n');
  		done(err);
  	});
  });

  it('should output "grepable" format with -r option', function(done) {
  	run(format('cat {} | {} -r data.items[0].accessControl', testFile, bin), function(err, output) {
  		output.should.deep.equal([
				'/syndicate/	allowed',
				'/commentVote/	allowed',
				'/rate/	allowed',
				'/list/	allowed',
				'/comment/	allowed',
				'/embed/	allowed',
				'/videoRespond/	moderated',
				''
				].join('\n'));
  		done(err);
  	});
  });
});
