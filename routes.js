const express=require('express');
const router=new express.Router();

//get a list of items
router.get('/', function(req,res){
    res.json(global.items);
});

//add a new item to global list
router.post('/', function(req,res){
    const newItem={name:req.body.name, price:req.body.price};
    global.items.push(newItem);
    res.status(201).json({added:newItem});
});

//get a single item from global list
router.get('/:name', function(req,res){
    const singleItem=global.items.find(i=>i.name===req.params.name);
    if(singleItem){
        res.json(singleItem);
    } else {
        res.status(404).json({message:'Item not found'});
    }
});

//PATCH, update an item in global list
router.patch('/:name', function(req,res){
    const updateItem=global.items.find(i=>i.name===req.params.name);
    if(updateItem){
        updateItem.name=req.body.name !== undefined ? req.body.name : updateItem.name;
        updateItem.price=req.body.price !== undefined ? req.body.price : updateItem.price;
        res.json({updated:updateItem});
    } else{
        res.status(404).json({message:'Item not found'});
    }
});

//Delete
router.delete('/:name', function(res,req){
    const deletedItem=global.items.findIndex(i=>i.name===req.params.name);
    if(deletedItem !== -1){
        global.items.splice(deletedItem,1);
        res.json({message:'Deleted'});
    } else{
        res.status(404).json({message:'Item not found'});
    }
});

module.exports=router;