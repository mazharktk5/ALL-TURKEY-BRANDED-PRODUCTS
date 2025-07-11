import jwt from "jsonwebtoken"

const adminAuth = async (req,res,next)=>{
    try {
        
         const {token} = req.headers;

         if(!token){
            return res.json({
                success:false,
                message:"Access Denied"
            })
         }

         const token_decode = jwt.verify(token,process.env.JWT_SECRET);

         if (token_decode !== process.env.ADMIN_EMAIL) {
            return res.json({
                success:false,
                message:"Access Denied"
            })
         }
         next()

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"error.message"
        })
        
    }

    
}

export default adminAuth