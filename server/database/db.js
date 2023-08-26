import mongoose from "mongoose";

const connection = async (username, userpassword) => {
  // const URL = `mongodb://${username}:${userpassword}@ac-d0ithy9-shard-00-00.8be5zle.mongodb.net:27017,ac-d0ithy9-shard-00-01.8be5zle.mongodb.net:27017,ac-d0ithy9-shard-00-02.8be5zle.mongodb.net:27017/WEATHERPRACTICE?ssl=true&replicaSet=atlas-jgmzac-shard-0&authSource=admin&retryWrites=true&w=majority`;
  // const URL = `mongodb+srv://abdullahsiraj95:abdullahsiraj95@mefa.s4s27wc.mongodb.net/`;
  const URL =
    "mongodb+srv://maazurrehman:admin@cluster0.8xauhiv.mongodb.net/newuser";
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`database connected successfully`);
  } catch (error) {
    console.log(`Error occur in connecting to database ${error}`);
  }
};

export default connection;
