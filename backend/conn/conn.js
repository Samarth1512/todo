const mongoose = require("mongoose");
const uri = 'mongodb://127.0.0.1:27017/todo'; // replace 'your_database_name' with the actual name of your database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = async () => {
  try {
    await mongoose.connection
      .once('open', () => {
        console.log('Connected to MongoDB');
      })
      .on('error', (error) => {
        console.error('Error connecting to MongoDB:', error);
      });
  } catch (error) {
    console.log(error);
  }
};

conn();
