import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404).send(`Object of ID: ${req.params.id} not found`);
    return;
  }
  next();
}

export default checkId;
