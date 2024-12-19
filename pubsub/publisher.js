const { createClient } = require('redis');
const client = createClient({
    password: 'zlFnUEdm3hB2NJ3maHmXCz8VkETNuJ9x',
    socket: {
        host: 'redis-17570.c100.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 17570
    }
})
async function processSubmission(submission) {
    const { problemId, code, language } = JSON.parse(submission);

    console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    // Here you would add your actual processing logic

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log(`Finished processing submission for problemId ${submission}.`);
    client.publish("questions",submission );
}

async function startWorker() {
    try {
        await client.connect();
        console.log("Worker connected to Redis.");

        // Main loop
        while (true) {
            try {
                const submission = "hi nikhil";
                // @ts-ignore
                await processSubmission(submission);
            } catch (error) {
                console.error("Error processing submission:", error);
                // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startWorker();
