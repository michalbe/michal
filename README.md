# michal by [@michalbe](http://github.com/michalbe) #
M.I.C.H.A.L - My Initialization Config Handling Automator. LOL.

### What? ###
Michal is commandline tool I use to setup all the things I need to start a new project. It:
  * creates `package.json` file with proper name, repo & author
  * installs `rollupjs` with `babel` and my fav configuration
  * Modifies ``.eslintrc` file with my favorite configuration
  * Creates `test` directory with example file

![michal](https://raw.githubusercontent.com/michalbe/michal/master/screen.png)

### How to use? ###

Install with:
```bash
 $ sudo npm install michal -g
```

Then in new, recently cloned `git` repo, to install all the packages:
```bash
$ michal -a
```
To check available options run the command without parameters:
```bash
$ michal
```
Voila!
