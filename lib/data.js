/*
  * Library for storing and editing data
  * CRUD
*/

// Dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

// Container for the module (to be exported)
var lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = function(dir, file, data, callback){
  // Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data to string
      var stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData, function(err){
        if(!err){
          fs.close(fileDescriptor, function(err){
            if(!err){
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file, it may already exist');
    }
  });
};

// Read data from a file
lib.read = function(dir, file, callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf-8',function(err, data){
    if(!err && data){
      var parsedData = helpers.parseJsonToObject(data);
      callback(false, parsedData);
    } else {
      callback(err, data);
    }
  });
};

// Update data inside a file
lib.update = (dir, file, data, callback) => {
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+',(err, fd) => {
    if(!err && fd) {
      const stringData = JSON.stringify(data);
        fs.truncate(fd, (err) => {
          if(!err) {
            fs.writeFile(fd, stringData, (err) => {
              if(!err) {
                fs.close(fd, (err) => {
                  if(!err) {
                    callback(false);
                  } else { 
                    callback('Error closing file');
                  }
                });
              } else {
                callback('Error writing to existing file');
              }
            });
        } else {
          callback('Error truncating file');
        }
      });
    } else {
      callback('Could not open the file for updating, it may not exist yet');
    }
  });
};

// Delete a file
lib.delete = (dir, file, callback) => {
  // Unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', (err) => {
    if(!err){
      callback(false);
    } else {
      callback('Error deleting file');
    }
  });
};

module.exports = lib;
