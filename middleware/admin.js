const adminMiddleware = (req, res , next) => {
  try {
     const checkifAdmin  = req.userInfo.userRole ;
     if ( checkifAdmin == "admin") {
      next();
     }
     else {
      return res.status(403).json( {
        success : false ,
        message: "You are not authorized to access this route"
      })
     }

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      "message": "Internal Server Error "
    })
  }
}

module.exports = adminMiddleware;