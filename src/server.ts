import app from './app';
import 'dotenv/config';
import connectToDatabase from './Model/Connection';

const PORT = process.env.PORT || 3001;

connectToDatabase().then(() => {
  app.listen(PORT, () => console.log(`Running server in ${PORT}`));
}).catch((error) => {
  console.log('Error in Connection');
  console.error(error);
  process.exit(0);
})

app.listen()