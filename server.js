const app = express();

// Serve only the static files from the dist directory
app.use(express.static(__dirname + '/dist/guitarchive_frontend'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/guitarchive_frontend/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
