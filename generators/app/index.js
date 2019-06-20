const Generator = require('yeoman-generator')
const path = require('path')
const kebabCase = require('lodash.kebabcase')

const makeGeneratorName = (name) => kebabCase(name)

module.exports = class extends Generator {
  // initializing () {}

  async prompting () {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'pkgname',
        message: 'Enter package name',
        default: makeGeneratorName(path.basename(process.cwd())),
        filter: makeGeneratorName
      }
    ])
  }

  // configuring () {}
  // default () {}

  writing () {
    // bulk copy src folder
    this._copy('src/**/*.*', 'src')

    // copy root level files
    this._copy('index.js', 'index.js')
    this._copy('_editorconfig', '.editorconfig')
    this._copy('_gitignore', '.gitignore')
    this._copy('_npmignore', '.npmignore')

    // copy root level templates
    const data = { pkgname: this.answers.pkgname }
    this._copyTpl('package.json', 'package.json', data)
    this._copyTpl('readme.md', 'readme.md', data)
  }

  // conflicts () {}
  // install () {}

  end () {
    this.log('Thanks for generating a foo-app.')
  }

  _copy (src, dest) {
    return this.fs.copy(this.templatePath(src), this.destinationPath(dest))
  }

  _copyTpl (src, dest, data) {
    return this.fs.copyTpl(this.templatePath(src), this.destinationPath(dest), data)
  }
}
