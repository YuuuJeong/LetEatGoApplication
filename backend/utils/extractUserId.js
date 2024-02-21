function extractUserId(req) {
  return req.session.user.id;
}

module.exports = extractUserId;
