export function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          title: action.title,
          value: action.id,
          note: action.note,
        },
      ];
    }
    case "delete": {
      return tasks.filter((t) => t.id !== action.id);
    }
    case "pin": {
      return tasks.map((t) => {
        if (t.id === action.id) {
          return { ...t, pin: "pin" };
        }
        return t;
      });
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    default:
      return tasks;
  }
}
