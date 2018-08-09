'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const objectAssign = require('object-assign');

module.exports = class extends Generator {
  initializing() {
    this.props = {
      isCanCreated: true,
      projectName: ''
    };

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Please input project name (react_app):',
        default: 'react_app'
      }
    ];

    return this.prompt(prompts).then(props => {
      const root = path.resolve(props.projectName);
      const dirIsExist = fs.existsSync(root);

      if (dirIsExist) {
        if (!isSafeToCreateProjectIn(root, props.projectName)) {
          process.exit(1);
        }
      }

      this.props = objectAssign({}, this.props, props);
    });
  }

  prompting() {
    var prompts = [
      {
        type: 'input',
        name: 'projectDesc',
        message: 'Please input project description:'
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'Author'
      },
      {
        type: 'input',
        name: 'projectMain',
        message: 'Main file (index.js):',
        default: 'index.js'
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Please select the package manager',
        choices: ['npm', 'yarn', 'none']
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = objectAssign({}, this.props, props);
    });
  }

  defaults() {
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }
  }

  writing() {
    var pkg = this.fs.readJSON(this.templatePath('./basic/package_tmpl.json'), {});
    pkg.name = this.props.projectName;
    pkg.description = this.props.projectDesc;
    pkg.main = this.props.projectMain;
    pkg.author = this.props.projectAuthor;

    this.fs.writeJSON(this.destinationPath(`package.json`), pkg);

    this.fs.copy(
      this.templatePath('basic/eslintrc_tmpl.js'),
      this.destinationPath(`.eslintrc.js`)
    );

    this.fs.copy(
      this.templatePath('basic/gitignore_tmpl'),
      this.destinationPath(`.gitignore`)
    );

    this.fs.copy(this.templatePath('basic/yarn_tmpl'), this.destinationPath(`yarn.lock`));

    this.fs.copy(this.templatePath('project/**/**/*.*'), this.destinationPath());
  }

  install() {
    console.clear();
    console.log();
    if (this.props.packageManager === 'npm') {
      console.log('Installing packages. This might take a couple of minutes.');
      console.log();
      this.npmInstall();
    } else if (this.props.packageManager === 'yarn') {
      console.log('Installing packages. This might take a couple of minutes.');
      console.log();
      this.yarnInstall();
    }
  }

  end() {
    if (this.props.packageManager === 'none') {
      console.log();
      console.log(chalk.green('Install successfully!'));
      console.log();
      console.log(chalk.cyan('you are bang bang di (╯°□°）╯︵ ┻━┻'));
      console.log();
      console.log();
      console.log(`Please ${chalk.cyan(`cd ${this.props.projectName}`)}`);
      console.log(`${chalk.cyan('npm install')} or ${chalk.cyan('yarn')}`);
      console.log();
    } else {
      console.log();
      console.log(chalk.green('Install successfully!'));
      console.log();
      console.log(chalk.cyan('you are bang bang di (╯°Д°）╯︵ /(.□ . \\)'));
      console.log();
      console.log();
      console.log(`Please ${chalk.cyan(`cd ${this.props.projectName}`)}`);
      console.log(`${chalk.cyan('npm start')} or ${chalk.cyan('yarn start')}`);
      console.log();
    }
  }
};

function isSafeToCreateProjectIn(root, name) {
  const validFiles = [
    '.DS_Store',
    'Thumbs.db',
    '.git',
    '.gitignore',
    '.idea',
    'README.md',
    'LICENSE',
    'web.iml',
    '.hg',
    '.hgignore',
    '.hgcheck',
    '.npmignore',
    'mkdocs.yml',
    'docs',
    '.travis.yml',
    '.gitlab-ci.yml',
    '.gitattributes'
  ];

  const conflicts = fs.readdirSync(root).filter(file => !validFiles.includes(file));

  if (conflicts.length < 1) {
    return true;
  }
  console.log();
  console.log(`The directory ${chalk.green(name)} contains files that could conflict:`);
  console.log();

  for (const file of conflicts) {
    console.log(`  ${file}`);
  }

  console.log();
  console.log('Either try using a new directory name, or remove the files listed above.');

  return false;
}
