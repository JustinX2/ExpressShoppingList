const express=require('express');
const itemsRoutes=require('./routes/items');
require('./fakeDb');

const app=express();

app.use(express.json());
app.use('/items', itemsRoutes);

const PORT=Process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log(`Server is listening on port ${PORT}`);
});

module.exports=app;