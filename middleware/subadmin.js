const subAdminMiddleware = (req, res, next) => {
  try {
    const checkifSubAdmin = req.userInfo.userRole;
    if (checkifSubAdmin == "subadmin") {
      next();
    }
    else {
      return res.status(403).json({
        success : false ,
        message : "User Doesn't have access to this page"
      })
    }
  }
  catch (error) {
    return res.status(500).json({
      success : false ,
      "messaage": "Internal Server Occur"
    })
  }
}

module.exports = subAdminMiddleware;