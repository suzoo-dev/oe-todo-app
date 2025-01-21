import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Task } from "../../prisma/generated/type-graphql"; // Adjust the import based on your generated types

@Resolver()
export class TaskResolver {
  @Mutation(() => Task)
  async addTask(
    @Arg("task_name") taskName: string,
    @Arg("done_flag", { nullable: true }) doneFlag: boolean | null = null,
    @Arg("due_date", { nullable: true }) dueDate: Date | null = null,
    @Ctx() ctx: any
  ): Promise<Task> {
    const task = await ctx.prisma.task.create({
      data: {
        task_name: taskName,
        done_flag: doneFlag ?? false, // Default to false if not provided
        due_date: dueDate ?? null, // Default to current date if not provided
      },
    });
    return task;
  }
}
