import mongoose from 'mongoose';
const connection = {};

export async function connectDB () {
   if(connection.isConnected){
      console.log('Already connect to the datbase.');
      return;
   };
   if(mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if(connection.isConnected === 1 ) {
         console.log('Use provious connection to the database.')
         return;
      };
      await mongoose.disconnect();
   };
   const db = await mongoose.connect(process.env.MONGODB_URL) 
   console.log("New Connection to the Database.");
   connection.isConnected = db.connections[0].readyState;
}

export async function disconnectDB () {
   if(connection.isConnected){
      if(process.env.NODE_ENV === "production"){
         await mongoose.disconnect();
         connection.isConnected = false;
      } else {
         console.log("Not disconnecting from the database.");
      }
   }
}

const db = {connectDB, disconnectDB};
export default db;