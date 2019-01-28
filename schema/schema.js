const graphql = require('graphql');
//const {GraphQLObjectType}=graphql;
const _ = require('lodash');
const Radio = require('../models/radio');
const Location = require('../models/location');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// dummy data
//var radios = [
//    { alias: 'Radio100', id: '100', locationId: '1' },
  //  {  alias: 'Radio101', id: '101', locationId: '3' },
  //  {  alias: 'Radio100', id: '100', locationId: '2' },
  //  {  alias: 'Radio101', id: '101', locationId: '2' },
  //  {  alias: 'Radio101', id: '101', locationId: '3' }

//];

//var locations = [
  //  { name: 'CPH_1',  id: '1' },
    //{ name: 'CPH_2',  id: '2' },
    //{ name: 'CPH_3',  id: '3' }
//];

const RadioType = new GraphQLObjectType({
    name: 'Radio',
    fields: ( ) => ({
        id: { type: GraphQLID },
        //name: { type: GraphQLString },
        alias: { type: GraphQLString },
        location: {
            type: LocationType,
            resolve(parent, args){
              //  return _.find(locations, { id: parent.locationId });
              //  return _.find(locations, { id: parent.locationId });
              return Location.findById(parent.locationId);
            }
        }
    })
});

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        //age: { type: GraphQLInt },
        radios: {
            type: new GraphQLList(RadioType),
            resolve(parent, args){
                //return _.filter(radios, { locationId: parent.id });
                return Radio.find({locationId:parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        radio: {
            type: RadioType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
              //  return _.find(radios, { id: args.id });
              return Radio.findById(args.id);
            }
        },
        location: {
            type: LocationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
              //  return _.find(locations, { id: args.id });
              return Location.findById(args.id);
            }
        },
        radios: {
          type: new GraphQLList(RadioType),
          resolve(parent,args){
            //return radios
            return Radio.find({});
          }
        },
        locations: {
          type: new GraphQLList(LocationType),
          resolve(parent, args){
            return Location.find({});
          }
        }
    }
});

const Mutation=new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addLocation:{
      type:LocationType,
      args:{
        name:{type:new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent,args){
        let location = new Location({
          name: args.name
        });
        return location.save();
      }
    },
    addRadio:{
      type:RadioType,
      args:{
        alias:{type: new GraphQLNonNull(GraphQLString)},
        locationId:{type:new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
        let radio = new Radio({
          alias:args.alias,
          locationId:args.locationId
        });
        return radio.save();
      }
    }
  }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
