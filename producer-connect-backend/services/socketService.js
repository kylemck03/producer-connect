const socketIO = require('socket.io');

class SocketService {
    constructor(server) {
        this.io = socketIO(server);
        this.onlineUsers = new Map();

        this.io.on('connection', (socket) => {
            console.log('New client connected');

            // Handle user online status
            socket.on('user_online', (userId) => {
                this.onlineUsers.set(userId, socket.id);
                this.broadcastUserStatus(userId, 'online');
            });

            // Real-time messaging
            socket.on('send_message', (data) => {
                const receiverSocket = this.onlineUsers.get(data.receiverId);
                if (receiverSocket) {
                    this.io.to(receiverSocket).emit('new_message', data);
                }
            });

            // Virtual studio room
            socket.on('join_studio', (roomId) => {
                socket.join(`studio_${roomId}`);
                this.io.to(`studio_${roomId}`).emit('user_joined_studio', {
                    userId: socket.userId,
                    timestamp: new Date()
                });
            });

            socket.on('disconnect', () => {
                // Handle disconnect logic
            });
        });
    }

    broadcastUserStatus(userId, status) {
        this.io.emit('user_status_change', { userId, status });
    }
}

module.exports = SocketService;
