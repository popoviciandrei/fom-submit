const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String },
    description: { type: String },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'company'
    },
    pictures: [{
        type: Schema.Types.ObjectId,
        ref: 'picture'
    }]
});

ProductSchema.statics.addPicture = function (id, url) {
    const Picture = mongoose.model('picture');

    return this.findById(id)
        .then(product => {
            const picture = new Picture({ url, product: id })
            product.pictures.push(picture)
            return Promise.all([picture.save(), product.save()])
                .then(([picture, product]) => picture);
        });
}

ProductSchema.statics.findPictures = function (id) {
    return this.findById(id)
        .populate('pictures')
        .then(product => product.pictures)
}

mongoose.model('product', ProductSchema);