"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoRequest, fetchTodos, addTodoRequest } from "@/lib/api";
import { toast } from "sonner";

import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import Loader from "../common/Loader";

import { ITodo } from "@/types/todo";

export default function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    if (data) setTodos(data);
  }, [data]);

  const queryClient = useQueryClient();

  const addTodoMutation = useMutation({
    mutationFn: (title: string) => addTodoRequest(title),
    onSuccess: (todo) => {
      const previousTodos = queryClient.getQueryData<ITodo[]>(["todos"]);

      queryClient.setQueryData<ITodo[]>(
        ["todos"],
        [{ ...todo, id: Math.random() }, ...(previousTodos || [])]
      );

      toast.success("Todo added successfully!");
    },
    onError: () => {
      toast.error("Failed to add todo!");
    },
  });

  const deleteTodoMutation = useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteTodoRequest(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<ITodo[]>(["todos"], (oldData) => {
        return oldData?.filter((todo) => todo.id !== id);
      });

      toast.success("Todo deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete todo!");
    },
  });

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-sm flex flex-col items-center justify-center p-2">
      <div className="w-full min-h-[675px] max-w-xl bg-[#2c2c2c] rounded-lg shadow-md p-6 overflow-hidden">
        <h1 className="text-2xl font-bold mb-6 text-center">Todo List</h1>

        <TodoForm
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodoMutation={addTodoMutation}
        />

        {isLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-500">
            No todos yet. Add one above!
          </p>
        ) : (
          <ul className="space-y-2 scrollbar">
            <AnimatePresence>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  setTodos={setTodos}
                  deleteTodoMutation={deleteTodoMutation}
                />
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
