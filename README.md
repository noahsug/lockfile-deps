# lockfile-deps
> lists recursive dependencies of a package by parsing npm-shrinkwrap.json or package-lock.json

## Install
```
npm i -g lockfile-deps
```

## Examples
```sh
lockfile-deps @babel/highlight

# reads <cwd>/package-lock.json or <cwd>/npm-shrinkwrap.json and outputs:
# [
#   {
#     "name": "@babel/highlight",
#     "version": "7.0.0"
#   },
#   {
#     "name": "ansi-styles",
#     "version": "3.2.1"
#   },
#   {
#     "name": "chalk",
#     "version": "2.4.2"
#   },
#   ...
# ]
```

```sh
lockfile-deps @babel/highlight @babel/parser # supports multiple packages

```

```sh
lockfile-deps # root project is used by default
```
