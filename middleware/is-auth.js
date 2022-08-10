module.exports =(req,res,next)=>{

if(!req.session.isLoggedIn)
{
    res.json({ error:"not Log In" });
}
next();

}