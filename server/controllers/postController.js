// import Posts from "../models/postModel.js";

// export const createPost = async(req, res, next) => {
//     try {
//         const {userId} = req.body.user;
//         const {description, image} = req.body;

//             if(!description) {
//                 next("You must provide a description");
//                 return;
//             }

//                 const post = await Posts.create({
//                     userId,
//                     description,
//                     image,
//                 });

//                 res.status(200).json({
//                     success: true,
//                     message: "Post created succesfully",
//                     data: post,
//                 });
//     } catch (error) {
//         console.log(error);
//         res.status(404).json({message: error.message});
//     }
// }

// export const getPosts = async(req, res, next) => {
// try {
//     const {userId} = req.body.user;
//     const{search} = req.body;

//     const user = await Users.findById(userId);
//     const friends = user?.friends?.toString().split(",") ?? [];
//     friends.push(userId);

//     const  searchPostQuery = {
//         $or: [
//             {
//                 description: {$regex: search, $options: "i"},
//             },
//         ],
//     };

//     const posts = await Posts.find(search ? searchPostQuery : {}).populate({
//         path: "userId",
//         select: "userName -password",
//     })
//     .sort({ _id: -1});

//     const friendsPosts = posts?.filter((post) => {
//         return friends.includes(post?.userId?._id.toString());
//     });

//     const otherPosts = posts?.filter((post) => 
//         !friends.includes(post?.userId?._id.toString())
//     );

// } catch (error) {
//     console.log(error);
//     res.status(404).json({message: error.message});
// }
// };