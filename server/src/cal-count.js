import User from '../model/user.js';
import Food from '../model/food.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

export async function handleFoodGetReq(token) {
  let userName;
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    userName = userData.username;
  } catch (error) {
    return {status: 'error', error: 'Corronped Token'};
  }

  const user = await User.findOne({userName}).lean();
  if ( ! user ) return {status: 'error', error: 'Invalid Username'};

  const foodEntries = [];

  for (const item of user.food) {
    const res = await Food.findById(item._id).lean();
    foodEntries.push( {
      id: item._id,
      name: res.foodName,
      carbs: res.carbs,
      protein: res.protein,
      fat: res.fat} );
  };

  return {status: 'ok', foodEntries};
}

export async function handleFoodPostReq(token, fields) {
  let userName;
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    userName = userData.username;
  } catch (error) {
    return {status: 'error', error: 'Corronped Token'};
  }

  const user = await User.findOne({userName}).lean();
  if ( ! user ) return {status: 'error', error: 'Invalid Username'};

  const res = await Food.create( {
    foodName: fields.name,
    carbs: fields.carbs,
    protein: fields.protein,
    fat: fields.fat,
  } );

  await User.findByIdAndUpdate( user._id,
      {'$push': {'food': res._id}},
  );

  return {status: 'ok', id: res._id};
}

export async function handleFoodDeleteReq(token) {
  let userName;
  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    userName = userData.username;
  } catch (error) {
    return {status: 'error', error: 'Corronped Token'};
  }

  const user = await User.findOne({userName}).lean();
  if ( ! user ) return {status: 'error', error: 'Invalid Username'};

  await User.findByIdAndUpdate( user._id,
      {'$set': {'food': []}},
  );

  return {status: 'ok'};
}
