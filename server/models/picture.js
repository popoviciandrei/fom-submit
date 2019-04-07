const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    url: { type: String } // url on the server to access the image
});

mongoose.model('picture', PictureSchema);