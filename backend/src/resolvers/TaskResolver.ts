import { Resolver, Mutation, Query, Arg, Ctx } from "type-graphql";
import { Task } from "../../prisma/generated/type-graphql";
import { containsCityName, cityMap } from "../data/processCities";
import { getWeatherByCity } from "../data/weatherApi";

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  async getUserTasks(@Ctx() ctx: any): Promise<Task[]> {
    const userId = ctx.user;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    return ctx.prisma.task.findMany({
      where: { owner_id: userId, deleted_flag: false },
    });
  }

  @Mutation(() => Task)
  async createUserTask(
    @Arg("task_name") taskName: string,
    @Ctx() ctx: any
  ): Promise<Task> {
    let note = null;
    const city = containsCityName(cityMap, taskName);
    if (city) {
      const weather = await getWeatherByCity(city);
      note = `( ${weather.current.temp_c} °C)`;
    }
    const task = await ctx.prisma.task.create({
      data: {
        task_name: taskName,
        owner_id: ctx.user,
        notes: note,
      },
    });
    return task;
  }
}
