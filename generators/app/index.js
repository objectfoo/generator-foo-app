const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
	constructor (args, opts) {
		super(args, opts);

		this.argument('appname', {
			type: String,
			default: this.appname
		});
		this._copyFile = this._copyFile.bind(this);
		this._copyTmpl = this._copyTmpl.bind(this);
	}

	configuring () {
		const done = this.async();
		if (this.appname !== this.options.appname) {
			this.appname = this.options.appname;
			const newRoot = this.destinationPath(this.appname);
			mkdirp(newRoot, (err) => {
				this.destinationRoot(newRoot);
				done(err);
			});
		} else {
			done();
		}
	}

	writing () {
		// bulk copy src folder
		this.fs.copy(
			this.templatePath('src/**/*.*'),
			this.destinationPath('src')
		);

		// copy root files
		[
			'index.js',
			'_editorconfig',
			'_eslintrc.yml',
			'_gitignore',
			'_npmignore'
		].forEach(this._copyFile);

		// template
		[
			'package.json',
			'readme.md'
		].forEach(this._copyTmpl);
	}

	installing () {
		this.npmInstall();
	}

	end () {
		this.log('Thanks for generating a foo-app.');
	}

	_copyFile (path) {
		this.fs.copy(
			this.templatePath(path),
			this.destinationPath(path.replace('_', '.'))
		);
	}

	_copyTmpl (path) {
		this.fs.copyTpl(
			this.templatePath(path),
			this.destinationPath(path),
			{
				appname: this.appname,
				pkgname: this.appname.replace(/\s+/g, '-')
			}
		);
	}
};
