import TodoList from "@/components/TodoList";
import Provider from "./providers";

export default function Home() {
  return (
    <Provider>
      <TodoList />
    </Provider>
  );
}
