const roleMiddleware = (requiredRole) => (req, res, next)=>{
    console.log("========== ROLE MIDDLEWARE ==========");
    console.log("Required role:", requiredRole);
    console.log("req.user:", req.user);
    console.log("User role:", req.user?.role);

    if (req.user?.role !== requiredRole) {
        console.log("❌ Role rejected");

        console.log(req.user.role)
        return res.status(401).json({
            message: "Not authorized"
        }); 
    }

    console.log("✅ Role accepted");
    next();
}


module.exports = roleMiddleware
