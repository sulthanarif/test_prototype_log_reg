// import Users from "../model/users";
// import jwt  from "jsonwebtoken";

// export const refreshToken = async (req, res) => {
//     try {
//      const refreshToken = req.cookies.refreshToken;
//      if (refreshToken) return res.status(401).json({ message: "refresh token not found" });   
//      const user = await Users.findAll({ where: { refreshToken: refreshToken } });
//         if (!user[0]) return res.status(403).json({ message: error })
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//             if (err) return res.sendStatus(403);
//             const userid = user[0].id;
//             const email = user[0].email;
//             const name = user[0].name;
//             const accessToken = jwt.sign({ userid, name, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
//             res.json({ accessToken:
//             accessToken, decoded: decoded });

//         });
//     } 
    
    
//     catch (error) {
//         console.log(error);
//     }







// }