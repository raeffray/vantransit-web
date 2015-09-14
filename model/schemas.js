var mongoose = require( 'mongoose' );

/**
* Represents a configuration set
*
**/
var apiConfigurationSchema = new mongoose.Schema({
    client_id: String,
    client_secret: String,
    callback_success: String,
    callback_fail : String
},{ collection : 'apiConfiguration' });

var ApiConfiguration = module.exports = mongoose.model('apiConfiguration', apiConfigurationSchema);

module.exports = {
  ApiConfiguration: ApiConfiguration
}
