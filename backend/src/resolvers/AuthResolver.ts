import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getEnvVar } from "../utils/getEnvVar";

@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async signup(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Arg("confirmPassword") confirmPassword: string,
    @Ctx() ctx: any
  ): Promise<string> {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await ctx.prisma.user.create({
      data: { email, user_name: username, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.user_id }, getEnvVar("JWT_SECRET"));
    return token;
  }

  @Mutation(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: any
  ): Promise<string> {
    const user = await ctx.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.user_id }, getEnvVar("JWT_SECRET"));
    return token;
  }
}
