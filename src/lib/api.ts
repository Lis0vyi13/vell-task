import { ITodo } from "@/types/todo";

export const fetchTodos = async (): Promise<ITodo[]> => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(
      `Failed to fetch todos: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const addTodoRequest = async (title: string): Promise<ITodo> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title,
        completed: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(
      `Failed to add todo: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const deleteTodoRequest = async (id: number): Promise<void> => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(
      `Failed to delete todo: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
