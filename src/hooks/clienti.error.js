// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
    return async context => {
        if ( context.error ){
            context.error.code = 400;
            context.error.message = "Bad request or Not authorized!" ;
        }
        return context;
    };
  };
  