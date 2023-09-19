const { default: mongoose } = require("mongoose");

let isConnected = false;

const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) return console.log("MongoDB is connected");
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        isConnected = true;
    } catch (error) {
        console.log('ERROR DB :>> ', error);
    }
}

export default connectToDB