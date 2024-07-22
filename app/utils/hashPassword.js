import bcrypt from 'bcrypt';

export default async function hashPassword(newPassword) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(newPassword, salt);
  return hash;
}