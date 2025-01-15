const mongoos = require('mongoose')
async function connectDB() {
    try {
        await mongoos.connect('mongodb://localhost:27017/Acdmy');
        console.log('concted db')
    } catch (error) {
        console.log('not concted db')
    }
}
module.exports = connectDB;;