const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const radioSchema=new Schema({
  alias:String,
  locationId:String

});

module.exports=mongoose.model('Radio',radioSchema);
