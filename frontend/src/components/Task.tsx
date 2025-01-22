import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { HiMenuAlt1, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

const GET_USER_TASKS = gql`
  query GetUserTasks {
    getUserTasks {
      task_id
      task_name
      due_date
      tags
      notes
      done_flag
      deleted_flag
    }
  }
`;

const UPDATE_ONE_TASK = gql`
  mutation UpdateOneTask(
    $taskId: Int!
    $doneFlag: BoolFieldUpdateOperationsInput
    $deletedFlag: BoolFieldUpdateOperationsInput
  ) {
    updateOneTask(
      data: { done_flag: $doneFlag, deleted_flag: $deletedFlag }
      where: { task_id: $taskId }
    ) {
      task_id
      done_flag
    }
  }
`;

const CREATE_USER_TASK = gql`
  mutation CreateUserTask($taskName: String!) {
    createUserTask(task_name: $taskName) {
      task_id
      task_name
      due_date
      tags
      notes
      done_flag
      deleted_flag
    }
  }
`;

interface Task {
  task_id: string;
  task_name: string;
  due_date: string;
  tags: string;
  notes: string;
  done_flag: boolean;
  deleted_flag: boolean;
}

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);

  const { data } = useQuery(GET_USER_TASKS);

  const [createUserTask] = useMutation(CREATE_USER_TASK, {
    onCompleted: (data) => {
      if (data.createUserTask) {
        setTasks((prevState) => [...prevState, data.createUserTask]);
      }
    },
  });

  const [updateOneTask] = useMutation(UPDATE_ONE_TASK);

  useEffect(() => {
    if (data?.getUserTasks) {
      setTasks(data.getUserTasks);
    }
  }, [data]);

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskName(e.target.value);
  };

  const handleTaskNameBlur = async () => {
    if (newTaskName.trim() === "") {
      setIsAddingTask(false);
      return;
    }

    await createUserTask({ variables: { taskName: newTaskName } });
    setNewTaskName("");
    setIsAddingTask(false);
  };

  return (
    <div className="flex flex-col bg-white m-6">
      <div className="flex flex-row justify-between items-center h-[100px]">
        <h2 className="text-3xl font-bold mb-2">My Tasks for the next month</h2>
        <div>
          <input
            className="rounded-md border border-gray-300 mr-2 p-2"
            placeholder="Search"
          />
          <button className="border border-gray-950 rounded-md p-2">
            logout
          </button>
        </div>
      </div>
      <div>
        <button
          className="bg-teal-500 text-white py-3 px-8 rounded-md my-12"
          onClick={handleAddTask}
        >
          + Add task
        </button>
      </div>
      <div>
        <h2 className="font-bold mb-4 text-xl">Tasks to do</h2>
        <table className="w-full border-separate border border-gray-300 rounded-md table-auto">
          <thead>
            <tr>
              <th className="font-light text-sm text-left"></th>
              <th className="flex items-center font-light text-sm text-left">
                <HiMenuAlt1 className="mr-2" />
                Task name
              </th>
              <th className="font-light text-sm text-left">Due date</th>
              <th className="font-light text-sm text-left">Tag</th>
              <th className="font-light text-sm text-left">Note</th>
              <th className="font-light text-sm text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.task_id} className="divide-y divide-solid">
                <td>
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded"
                      checked={task.done_flag}
                      onChange={async (e) => {
                        const newDoneFlag = e.target.checked;
                        await updateOneTask({
                          variables: {
                            taskId: parseInt(task.task_id, 10),
                            doneFlag: { set: newDoneFlag },
                          },
                        });
                        setTasks((prevTasks) =>
                          prevTasks.map((t) =>
                            t.task_id === task.task_id
                              ? { ...t, done_flag: newDoneFlag }
                              : t
                          )
                        );
                      }}
                    />
                  </div>
                </td>
                <td>{task.task_name}</td>
                <td>{task.due_date}</td>
                <td>{task.tags}</td>
                <td>{task.notes}</td>
                <td>
                  <button>
                    <HiOutlinePencil className="mr-2" />
                  </button>
                  <button
                    onClick={async () => {
                      await updateOneTask({
                        variables: {
                          taskId: parseInt(task.task_id, 10),
                          deletedFlag: { set: true },
                        },
                      });
                      setTasks((prevTasks) =>
                        prevTasks.filter((t) => t.task_id !== task.task_id)
                      );
                    }}
                  >
                    <HiOutlineTrash className="mr-2" />
                  </button>
                </td>
              </tr>
            ))}
            {isAddingTask && (
              <tr>
                <td>
                  <input
                    type="text"
                    value={newTaskName}
                    onChange={handleTaskNameChange}
                    onBlur={handleTaskNameBlur}
                    autoFocus
                    className="border border-gray-200 p-2 w-full rounded"
                  />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
