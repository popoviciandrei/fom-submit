const mongoose = require('mongoose');
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString
} = graphql;

const Picture = mongoose.model('picture');

const PictureType = new GraphQLObjectType({
    name: 'PictureType',
    fields: () => ({
        id: { type: GraphQLID },
        url: { type: GraphQLString },
        product: {
            type: require('./product_type'),
            resolve(parentValue) {
                return Picture.findById(parentValue).populate('product')
                    .then(picture => {
                        return picture.product
                    });
            }
        }
    })
});

module.exports = PictureType;