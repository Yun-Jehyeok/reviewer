const { Server } = require("socket.io");

module.exports = (server) => {
    const io = new Server(server, {
        path: "/api/video",
        cors: { origin: "*", methods: ["GET", "POST"] },
    });

    io.on("connection", (socket) => {
        console.log("New user connected:", socket.id);

        socket.on("join_room", ({ room }) => {
            socket.join(room);
            const allUsers = Array.from(io.sockets.adapter.rooms.get(room) || []);
            io.to(room).emit(
                "all_users",
                allUsers.map((id) => ({ id }))
            );
        });

        // Offer 수신
        socket.on("offer", (sdp, room) => {
            socket.to(room).emit("getOffer", sdp);
        });

        // Answer 수신
        socket.on("answer", (sdp, room) => {
            socket.to(room).emit("getAnswer", sdp);
        });

        // ICE Candidate 수신
        socket.on("candidate", (candidate, room) => {
            socket.to(room).emit("getCandidate", candidate);
        });

        // 사용자 연결 종료
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};
