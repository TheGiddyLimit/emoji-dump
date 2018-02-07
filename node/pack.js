const fs = require('fs');

const index = require('../emojis');

const all = {};
index.emojis.forEach(e => {
	if (e.unicode && e.shortname) {
		try {
			const f = `../18x18/${e.unicode}.png`;
			if (fs.existsSync(f)) {
				copyFile(f, `../out/${e.shortname.replace(/:/g, "")}.png`, (msg) => {if (msg) console.log(msg);});
				all[e.shortname] = true;
			} else {
				debugger
			}
		} catch (e) {
			debugger
		}
	}
});

fs.writeFileSync("../index.json", JSON.stringify(all), "utf8");

function copyFile(source, target, cb) {
	var cbCalled = false;

	var rd = fs.createReadStream(source);
	rd.on("error", function(err) {
		done(err);
	});
	var wr = fs.createWriteStream(target);
	wr.on("error", function(err) {
		done(err);
	});
	wr.on("close", function(ex) {
		done();
	});
	rd.pipe(wr);

	function done(err) {
		if (!cbCalled) {
			cb(err);
			cbCalled = true;
		}
	}
}