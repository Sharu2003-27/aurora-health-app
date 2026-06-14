import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Aurora backend (dev) running on http://localhost:${PORT}`);
});
