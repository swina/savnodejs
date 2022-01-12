// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    let origin = context.params.headers.origin;
    let authorize = false;
    authorize = context.app.get('sites').filter(site=>{
      return site === context.params.headers.origin;
    })
    if (typeof origin === "undefined"){
      console.log ( 'using REST API LOCAL')
      context.result = {
        msg: 'not valid domain',
        error: 'Not Authorized'
      };
      return context;
    } else {
      if ( !authorize.length ) {
        context.result = {
          msg: 'You need a valid license',
          error: 'Authorization failed'
        }
        return context;
      } else {
        return context;
      }
    }
  };
};
