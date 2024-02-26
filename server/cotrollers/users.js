import User from '../models/user.js';

//Read
export async function getUser (req, res, next){
  try{
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  }catch(err){
    res.status(404).json({message: err.message})
  }
}

export async function getUserFriends(req, res, next){
  try{
    const {id} = req.params;
    const user = await User.findById(id);
    
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(({_id, firstname, lastname, occupation, location, picturePath, bio}) => {
      return {_id, firstname, lastname, occupation, location, picturePath, bio} 
    });
    res.status(200).json(formattedFriends);
  }catch(err){
    res.status(404).json({message: err.message})
  }
}

//Update
export async function addRemoveFriend (req, res, next){
  try{
    const {id, friendId} = req.params;
    const user = await User.findById(id);
    
    const friend = await User.findById(friendId);
    
    if(user.friends.includes(friendId)){
      user.friends = user.friends.filter( (id) => id !== friendId);
      friend.friends = friend.friends.filter( (id) => id !== id)
    }
    else{
      user.friends.push(friendId);
      friend.friends.push(id)
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(({_id, firstname, lastname, occupation, location, picturePath, bio}) => {
      return {_id, firstname, lastname, occupation, location, picturePath, bio} 
    });
   
    res.status(200).json(formattedFriends);
  }catch(err){
    res.status(404).json({message: err.message})
  }
}

//Search for user
export async function searchUser(req, res){
  try{
    const {searchedItem} = req.query;
    console.log(searchedItem);
    const [firstWord, lastWord] = searchedItem.split(" ");
    const regexQueryFirst = new RegExp(firstWord, 'i'); // 'i' flag for case-insensitive search
    const regexQueryLast = new RegExp(lastWord, 'i'); 
    const users = await User.find()
      .or([
          { firstname: { $regex: regexQueryFirst }, lastname: { $regex: regexQueryLast} }, 
          { lastname: { $regex: regexQueryFirst }, firstname: { $regex: regexQueryLast } } 
      ])
      .exec();

    res.status(200).json(users)
    
  }catch (err) {
    res.status(404).json({message: err.message})
  }
}