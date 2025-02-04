import { io } from "socket.io-client";

export const socket = io("https://testwork2.onrender.com:3000");
export default ({ app }) => {
    // Создаем подключение к серверу

    // Глобально предоставляем сокет через provide/inject
    app.config.globalProperties.$socket = socket;

    // Обработка событий при подключении
    socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
    });

    socket.on("welcome", (data) => {
        console.log(data.message);
    });
};
