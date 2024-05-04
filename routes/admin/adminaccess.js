const express = require('express');
const { messageModel } = require('../../models/userschema');
const Route = express.Router();
const { ObjectId } = require('mongodb');
const { adminlogincontroll } = require('./login');


Route.delete('/:id', async (req, res) => {
   
  
    const { id } = req.params;
    console.log("deletion id",id);

  try {
    // Find and delete the document by ID
    const deletedDocument = await messageModel.findOneAndDelete({ _id: id });
    // Check if any document was deleted
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    return res.status(200).json({ message: 'Document deleted successfully', deletedDocument });
  } catch (error) {
    console.error('Error deleting document:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  });
Route.put('/resolved/:id', async (req, res) => {
    try {
      // Connect to MongoDB
     ;
  
     const { id } = req.params;
     const updateData = req.body;
     console.log("idddddddddddddddddddddddddddddddd",id,updateData.resolveStatus);
  
     const idObject = new ObjectId(id);
     console.log(idObject);
      const result = await  messageModel.findOneAndUpdate(
        { _id: idObject },
        { $set: updateData}
      );
  console.log("result",result);
      
      if (result._id) {
        res.status(200).json({ message: 'Item updated successfully' });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
     
     
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });





  Route.post('/login',adminlogincontroll);

 

module.exports=Route;