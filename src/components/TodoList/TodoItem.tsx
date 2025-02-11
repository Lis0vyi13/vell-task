import { Dispatch, SetStateAction } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { ITodo } from "@/types/todo";

interface TodoItemProps {
  todo: ITodo;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  deleteTodoMutation: UseMutationResult<void, Error, number>;
}

export function TodoItem({
  todo,
  setTodos,
  deleteTodoMutation,
}: TodoItemProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="flex justify-between items-center bg-gray-50 p-2 rounded-md hover:bg-gray-200"
    >
      <span className="break-words text-black flex-1 mr-4">{todo.title}</span>
      <button
        className="transition-all duration-200 bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:scale-90"
        onClick={() => {
          setTodos((prevTodos) =>
            prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
          );
          deleteTodoMutation.mutate(todo.id);
        }}
      >
        Delete
      </button>
    </motion.li>
  );
}
