// scripts/postbuild.js
const { cpSync } = require('fs')
const { join } = require('path')

cpSync('README.md', join('dist', 'README.md'))
cpSync('LICENSE', join('dist', 'LICENSE'))
