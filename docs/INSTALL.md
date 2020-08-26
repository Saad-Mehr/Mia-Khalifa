# Installation Guide

## Cloning
Clone the git repository to your file system using the `git` command-line tool.
``` 
git clone https://gitlab.com/csun3801920/team-3/mia-khalifa
```

Alternatively, a GUI git client can be utilized. A comprehensive list of such clients can be found here:
* [GUI Git Clients](https://git-scm.com/downloads/guis)

## NodeJS 

This project uses the NodeJS runtime. Detailed installation instructions for your system can be found on the official NodeJS website:
* [Windows](https://nodejs.org/en/download/package-manager/#windows)
* [Linux](https://nodejs.org/en/download/package-manager/#arch-linux)
* [macOS](https://nodejs.org/en/download/package-manager/#macos)

### Install modules

The necessary dependencies can be installed using the `npm` command-line tool. This tool is included with a standard NodeJS installation.
```
cd mia-khalifa
npm install
```

### Modify configuration

Modify the `env.json` file in the root directory to configure the following information:
* Encryption keys
* WebTokens
* Database credentials
* TLS/SSL certificates

### Start server
The development server can be started with the following command:
```
npm start
```
This server does not make use of HTTPS, as to avoid certificate configuration.
However, when running on a production machine, the pigeon server should be started with:
```
npm run prod
```

## MongoDB

A MongoDB instance is required in order to start the server. This can be connected to through `localhost` or through the internet. Configuration for this can be specified in the `env.json` file.
* [MongoDB Installation Instructions](https://docs.mongodb.com/manual/installation/)

## Troubleshooting
Ensure that your `PATH` environmental variable is properly configured in order to enable the use of the command line tools. In Windows, receiving the following error is a sign that the `PATH` variable is not properly configured.
```
"npm" is not recognized as an internal or external command, operable program or batch file.
```
* [How to Add to Windows PATH Environment Variable](https://helpdeskgeek.com/windows-10/add-windows-path-environment-variable/)
