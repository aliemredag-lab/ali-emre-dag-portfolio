const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const newPassword = 'Admin5168';
const configPath = path.join(__dirname, '..', 'data', 'admin-config.json');

bcrypt.hash(newPassword, 12).then(passwordHash => {
  const config = {
    passwordHash,
    lastChanged: new Date().toISOString(),
    version: '2.0'
  };

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log('✅ Password successfully changed to: Admin5168');
  console.log('Hash:', passwordHash);
}).catch(err => {
  console.error('Error:', err);
});
