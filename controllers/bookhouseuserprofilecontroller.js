const BookHouseUser = require("../models/bookhouserusermodel");

exports.findProfileByUserId = (request, response, next, id) => {
  BookHouseUser.findById(id).exec((error, bookhouseuser) => {
    if (error || !bookhouseuser) {
      return response.status(400).json({
        error: "No User"
      });
    }
    request.profile = bookhouseuser;
    next();
  });
};

exports.getsingleUser = (request, response) => {
  return response.json(request.profile);
};

exports.updateUser = (request, response) => {
  BookHouseUser.findOneAndUpdate(
    { _id: request.profile._id },
    { $set: request.body },
    { new: true },
    (error, updateduser) => {
      if (error) {
        return response.status(400).json({
          error: "Error in updation"
        });
      }
      //updateduser.password_hashed = undefined;
      //updateduser.salt = undefined;
      response.json(updateduser);
    }
  );
};
