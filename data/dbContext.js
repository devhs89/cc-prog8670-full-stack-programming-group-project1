const mongoose = require('mongoose');

// Mongoose Settings
mongoose.set({ strictQuery: false });

// Connect to MongoDB
const connStr = `mongodb+srv://${dbUser}:${dbPassword}@cc-prog8670-cluster.kizkzcv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(connStr, { useNewUrlParser: true });
