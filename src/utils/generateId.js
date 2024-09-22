const crypto = require('crypto');

const generateId =() => {
  const epochTime = Date.now().toString();
  const randomBytes = crypto.randomBytes(6).toString('hex');
  return `${epochTime}-${randomBytes}`;
}

module.exports = generateId;