const mongoose = require('mongoose');
const mongoURI = 'mongodb://imsinghsahil2020:hellosahil@ac-49cvjli-shard-00-00.otrj5fd.mongodb.net:27017,ac-49cvjli-shard-00-01.otrj5fd.mongodb.net:27017,ac-49cvjli-shard-00-02.otrj5fd.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-8xrfwp-shard-0&authSource=admin&retryWrites=true&w=majority';
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })

            })
        }
    });
}

module.exports = mongoDB;