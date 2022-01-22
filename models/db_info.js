module.exports = (function () {
    return {
      local: { // localhost
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'limdongju',
        database: 'nodejs_study'
      },
      real: { // real server db info
        host: '',
        port: '',
        user: '',
        password: '!',
        database: ''
      },
      dev: { // dev server db info
        host: '',
        port: '',
        user: '',
        password: '',
        database: ''
      }
    }
  })();
