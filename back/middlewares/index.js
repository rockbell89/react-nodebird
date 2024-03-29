// 로그인 상태일때
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // passport 제공 (≒ req.user )
    next();
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

// 로그인상태 아닐때
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};
