## Overview

[Titanium](https://github.com/appcelerator/titanium) is a [Command Line Tool (CLI)](http://en.wikipedia.org/wiki/Command-line_interface)
for managing and deploying Titanium Mobile applications and modules. It's open-source and easy to use. [We've](https://github.com/appcelerator)
designed Titanium to be suitable for command line beginners, but still be powerful and extensible enough for production usage.

## Local Installation

    [sudo] npm install titanium -g

## Bleeding Edge

    // do this once
    git clone https://github.com/appcelerator/titanium.git
    
    // do this frequently
    cd /path/to/titanium
    git pull origin master
    [sudo] npm install -g .

## Usage

    titanium <command> [options]

## Built-in Commands

### config

Configure your CLI settings.

**Implementation not complete**

    titanium config <setting> <value>

### help

Displays help or help for a specific command.

    titanium

    titanium help

    titanium --help

    titanium help <command>

    titanium <command> --help

### login

Logs into the Appcelerator Network

**Implementation not complete**

Login requires both user and password options to be passed in.

    titanium login --user <username> --password <password>

If you omit an option, the CLI will prompt you for the value.

    titanium login

### logout

Logs out of the Appcelerator Network

**Implementation not complete**

    titanium logout

### sdk

Download and install Titanium SDKs

#### sdk install

Installs a specific version of the Titanium SDK. If no version is specified, it assumes the latest.

    titanium sdk install

    titanium sdk install <version>

    titanium sdk install <version> --force

Download, install <version>, and set as default SDK.

    titanium sdk install <version> --default

Download and install the latest version for the specified branch

    titanium sdk install --branch master

#### sdk list

Lists all installed Titanium SDKs. Optionally lists all branches and releases.

    titanium sdk list

    titanium sdk list -b
    titanium sdk list --branches

    titanium sdk list -r
    titanium sdk list --releases

    titanium sdk list -br
    titanium sdk list --branches --releases

#### sdk update

Checks if there is a new version of the Titanium SDK available.

    titanium sdk update

Download and install the latest version.

    titanium sdk update --force

Download and install the latest version for the specified branch if not already installed.

    titanium sdk update --branch master

### status

Checks authentication, SDK, and project status.

**Implementation not complete**

    titanium status

    titanium status --dir /path/to/project

### version

Displays the current version of the CLI and exits.

    titanium version
    titanium --version

## License

This project is open source and provided under the Apache Public License (version 2). Please make sure you see the `LICENSE` file
included in this distribution for more details on the license.  Also, please take notice of the privacy notice at the end of the file.

#### (C) Copyright 2012, [Appcelerator](http://www.appcelerator.com/) Inc. All Rights Reserved.
