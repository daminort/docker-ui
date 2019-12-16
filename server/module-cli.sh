#!/bin/bash

# A tool for generating Nest modules with services and controllers
#
# Usage:
# ./module-cli <module-name>
#
# For example, the command
#   ./module-cli user
# will create folder 'user' with files:
# - user.module.ts
# - user.service.ts
# - user.controller.ts

moduleName=${1}
modulePath="modules/$moduleName"

if [ -z "${moduleName}" ]
then
  echo "No module name/path provided"
  exit
fi

nest generate module "${modulePath}"
nest generate service "${modulePath}"
nest generate controller "${modulePath}"
