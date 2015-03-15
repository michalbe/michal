# michal by [@michalbe](http://github.com/michalbe) #
M.I.C.H.A.L - My Initialization Config Handling Automator. LOL.

### What? ###
Michal is commandline tool I use to setup all the things I need to start a new project. It:
  * creates `package.json` file with proper name, repo & author
  * installs packages:
     * [precommit-hook](https://www.npmjs.org/package/precommit-hook)
     * [jshint](https://www.npmjs.org/package/jshint)
     * [fancom](https://github.com/michalbe/fancom)
     * [assert](https://www.npmjs.org/package/assert)
  * Modifies ``.jshintrc` file with my favorite configuration
  * Creates `test` directory with example file

![michal](https://raw.githubusercontent.com/michalbe/michal/master/screen.jpg)

### How to use? ###
Install with:
```bash```
 $ sudo npm install michal -g
```

Then in new, recently cloned `git` repo, to install all the packages:
```bash
$ michal -a
```

Voila!
