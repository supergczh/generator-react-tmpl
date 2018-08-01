'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  prompting() {
    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Please input project name (react_app):',
        default: 'react_app'
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: 'Please input project description:'
      },
      {
        type: 'input',
        name: 'projectMain',
        message: 'Main file (index.js):',
        default: 'index.js'
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'Author',
        default: ''
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    var pkg = this.fs.readJSON(this.templatePath('./basic/package_tmpl.json'), {});

    pkg.name = this.props.projectName;
    pkg.description = this.props.projectDesc;
    pkg.main = this.props.projectMain;
    pkg.author = this.props.projectAuthor;

    this.fs.writeJSON(
      this.destinationPath(`${this.props.projectName}/package.json`),
      pkg
    );

    this.fs.copy(
      this.templatePath('basic/eslintrc_tmpl.js'),
      this.destinationPath(`${this.props.projectName}/.eslintrc.js`)
    );

    this.fs.copy(
      this.templatePath('basic/gitignore_tmpl'),
      this.destinationPath(`${this.props.projectName}/.gitignore`)
    );

    this.fs.copy(
      this.templatePath('basic/yarn_tmpl'),
      this.destinationPath(`${this.props.projectName}/yarn.lock`)
    );

    this.fs.copy(
      this.templatePath('project/**/**/*.*'),
      this.destinationPath(this.props.projectName)
    );
  }

  install() {
    console.log(chalk.green('success!'));
    console.log(`Please ${chalk.green(`cd ${this.props.projectName}`)}`);
    console.log(`${chalk.green('npm install')} or ${chalk.green('yarn')}`);
  }
};
