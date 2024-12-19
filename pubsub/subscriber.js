const redis = require('redis');

// Create a Redis client
const subscriber = redis.createClient({
    password: 'zlFnUEdm3hB2NJ3maHmXCz8VkETNuJ9x',
    socket: {
        host: 'redis-17570.c100.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 17570
    }
})

// Function to handle connection and subscription
async function initializeSubscriber() {
    try {
        await subscriber.connect();
        console.log('Subscriber connected to Redis server');

        // Subscribe to the 'questions' channel
        await subscriber.subscribe('questions', (message, channel) => {
            console.log(`Received message from ${channel}: ${message}`);
        });
        console.log('Subscribed to the questions channel.');

    } catch (err) {
        console.error('Failed to connect or subscribe:', err);
    }
}

// Start the subscriber
initializeSubscriber();

// Handle process exit
process.on('SIGINT', async () => {
    console.log('Terminating subscriber...');
    try {
        await subscriber.unsubscribe('questions');
        console.log('Unsubscribed successfully.');
    } catch (err) {
        console.error('Error during unsubscribe:', err);
    }

    try {
        await subscriber.quit();
        console.log('Subscriber disconnected from Redis.');
    } catch (err) {
        console.error('Error during quit:', err);
    }
    process.exit();
});
