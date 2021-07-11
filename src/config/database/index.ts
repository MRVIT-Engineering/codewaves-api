import mongoose from 'mongoose';

export const initDb = () => {
  mongoose.connect(
    process.env.ATLAS_CONNECTION_STRING || '',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (error: any) => {
      // eslint disable-next-line
      if (error) console.log(error);
      // eslint disable-next-line
      else console.log('Connected to Atlas.');
    }
  );
};
