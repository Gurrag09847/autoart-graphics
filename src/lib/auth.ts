import bcrypt from 'bcryptjs';
const password = "$2a$12$TMr2Lwnvf4Ik0JG9aJp3luVkjP7MlmthOpYlv5HYsTTW7OcCrC0fW"
export async function comparePassword(plainTextPassword: string) {
  const adminPasswordHash = password;
  if (!adminPasswordHash) {
    throw new Error('Inget lösenord hittades');
  }

  return await bcrypt.compare(plainTextPassword, adminPasswordHash);
}
