'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
    BASE_API: '" https://easy-mock.com/mock/5ab4c3188f5cd55a31bf9042/jouryjc-blog"',
})
