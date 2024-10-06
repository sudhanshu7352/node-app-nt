const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');
const errorHandler = require('./utils/errorHandler');
const rateLimiter = require('./utils/rateLimiter');

const app = express();

//mmiddleware
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send('{"response:"hello World"}')
})

// Rate Limiting
app.use(rateLimiter); 

//routes
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
