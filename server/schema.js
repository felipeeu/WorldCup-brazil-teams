const _ = require('lodash');
const graphql = require('graphql')
const Player = require('./models/player');
const WorldCup = require('./models/cup')

const {
    // These are the basic GraphQL types need in this tutorial
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    // This is used to create required fields and arguments
    GraphQLNonNull,
    // This is the class we need to create the schema
    GraphQLSchema,
    GraphQLID,
    GraphQLInt

} = graphql;

const WorldCupType = new GraphQLObjectType({
    name: "WorldCup",
    description: "This represent a World Cup",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        year: {type: new GraphQLNonNull(GraphQLInt)},
        img: {type: GraphQLString},
        country: {type:GraphQLString}
    })
});

const PlayerType = new GraphQLObjectType({
    name: "Player",
    description: "This represent a player",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        position: {type: new GraphQLNonNull(GraphQLString)},
        img: {type: GraphQLString},
        cup: {type: new GraphQLNonNull(GraphQLInt)}
    })
});


// This is the Root Query
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    description: "Schema Root",
    fields: () => ({

        player: {
            type: PlayerType,
            args: {id: {type: GraphQLID}},
            description: "Player by id",
            resolve(parent, args) {
                return Player.findById(args.id)
            }
        },
        players: {
            type: new GraphQLList(PlayerType),
            description: "List of all Players",
            args: {cup: {type: GraphQLInt}},
            resolve(parent, args) {
                return Player.find({cup: args.cup})
            }
        },

        worldcup: {
            type: WorldCupType,
            args: {year: {type: GraphQLInt}},
            description: "Worldcup by year",
            resolve(parent, args) {
                return WorldCup.findOne({year: args.year})
            }
        },

       worldcups: {
            type: new GraphQLList(WorldCupType),
            description: "All Worldcups",
            resolve(parent, args) {
                return WorldCup.find({})
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCup: {
            type: WorldCupType,
            args: {
                year: {type: GraphQLInt},
                img: {type: GraphQLString}

            },
            resolve(parent, args) {
                let cup = new WorldCup({
                    year: args.year,
                    img: args.img
                });
                return cup.save()
            }
        },
    }
})

// This is the schema declaration
const PlayerAppSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
});

module.exports = PlayerAppSchema;

