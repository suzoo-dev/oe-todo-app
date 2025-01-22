import { Resolver, Mutation, Query, Arg, Ctx } from "type-graphql";
import { Task } from "../../prisma/generated/type-graphql";

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  async getUserTasks(@Ctx() ctx: any): Promise<Task[]> {
    const userId = ctx.user;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    return ctx.prisma.task.findMany({
      where: { owner_id: userId },
    });
  }

  @Mutation(() => Task)
  async createUserTask(
    @Arg("task_name") taskName: string,
    @Ctx() ctx: any
  ): Promise<Task> {
    const task = await ctx.prisma.task.create({
      data: {
        task_name: taskName,
        owner_id: ctx.user,
      },
    });
    return task;
  }
}
