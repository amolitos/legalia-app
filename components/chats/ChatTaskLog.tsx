import { Task, TaskContent, TaskItem, TaskTrigger } from "../ai-elements/task";
import { TaskNotification } from "./ChatMessages";

export const ChatTaskLog = ({ taskLog }: { taskLog: TaskNotification[] }) => {
  return (
    <Task className="w-full">
      <TaskTrigger title="Generando documento" />
      <TaskContent>
        {taskLog.map((tt, index) => (
          <TaskItem key={index}>{tt.message}</TaskItem>
        ))}
      </TaskContent>
    </Task>
  );
};
