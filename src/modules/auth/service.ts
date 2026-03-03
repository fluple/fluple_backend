import * as repo from "./repository";
import { hashPassword, comparePassword } from "../../utils/hash";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";
import bcrypt from "bcrypt";

export async function register({
  name,
  email,
  password,
}: {
  name?: string;
  email: string;
  password: string;
}) {
  const exists = await repo.findUserByEmail(email);
  if (exists) throw { status: 400, message: "Email already used" };
  const passwordHash = await hashPassword(password);
  const user = await repo.createUser({ name, email, password: passwordHash });
  const accessToken = signAccessToken({ userId: user.id });
  const refreshToken = signRefreshToken({ userId: user.id });
  await repo.saveRefreshToken({
    userId: user.id,
    tokenHash: await bcrypt.hash(refreshToken, 12),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  return {
    user: { id: user.id, email: user.email, name: user.name },
    accessToken,
    refreshToken,
  };
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await repo.findUserByEmail(email);
  if (!user) throw { status: 401, message: "Invalid credentials" };
  const ok = await comparePassword(password, user.password);
  if (!ok) throw { status: 401, message: "Invalid credentials" };
  const accessToken = signAccessToken({ userId: user.id });
  const refreshToken = signRefreshToken({ userId: user.id });
  await repo.saveRefreshToken({
    userId: user.id,
    tokenHash: await bcrypt.hash(refreshToken, 12),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  return {
    user: { id: user.id, email: user.email, name: user.name },
    accessToken,
    refreshToken,
  };
}
