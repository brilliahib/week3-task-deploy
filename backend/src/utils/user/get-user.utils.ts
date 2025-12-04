export async function getUserFromJWT(jwt: any, headers: any, set: any) {
  const authorization = headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    set.status = 401;
    return null;
  }

  const token = authorization.slice(7);

  try {
    const user = await jwt.verify(token);
    if (!user) {
      set.status = 401;
      return null;
    }

    return user;
  } catch (err) {
    set.status = 401;
    return null;
  }
}
