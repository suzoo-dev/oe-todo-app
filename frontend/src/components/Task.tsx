import React from "react";

const Task: React.FC = () => {
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
        <button className="bg-teal-500 text-white py-3 px-8 rounded-md my-12">
          + Add task
        </button>
      </div>
      <div>
        <h2 className="font-bold mb-4 text-xl">Tasks to do</h2>
        <table className="w-full border-separate border border-gray-300 rounded-md">
          <thead>
            <tr>
              <th></th>
            </tr>
            <tr>
              <th className="font-light text-sm">Task name</th>
            </tr>
            <tr>
              <th className="font-light text-sm">Due date</th>
            </tr>
            <tr>
              <th className="font-light text-sm">Tag</th>
            </tr>
            <tr>
              <th className="font-light text-sm">Note</th>
            </tr>
            <tr>
              <th className="font-light text-sm">Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
