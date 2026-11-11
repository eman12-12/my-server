const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// رابط الاتصال الصحيح والمحدث
const uri = "mongodb://admin123:mypass1234@ac-qroc3eq-shard-00-00.xazo8ps.mongodb.net:27017,ac-qroc3eq-shard-00-01.xazo8ps.mongodb.net:27017,ac-qroc3eq-shard-00-02.xazo8ps.mongodb.net:27017/?ssl=true&replicaSet=atlas-uvhagy-shard-0&authSource=admin";

mongoose.connect(uri)
  .then(() => {
    console.log("تم الاتصال بقاعدة البيانات السحابية بنجاح! 📦☁️");
  })
  .catch((err) => {
    console.log("خطأ في الاتصال بقاعدة البيانات:", err);
  });

const taskSchema = new mongoose.Schema({
  name: String
});
const Task = mongoose.model('Task', taskSchema);

app.get('/', async (req, res) => {
  try {
    const foundTasks = await Task.find({});
    res.render('index', { tasks: foundTasks, username: "إيمان" }); // أضفنا username هنا
  } catch (err) {
    console.log("خطأ في جلب المهام:", err);
  }
});
app.post('/add-task', async (req, res) => {
  const userTask = req.body.newTask;
  try {
    const newTask = new Task({ name: userTask });
    await newTask.save();
    res.redirect('/');
  } catch (err) {
    console.log("خطأ في حفظ المهمة:", err);
  }
});

app.listen(port, () => {
  console.log(`السيرفر شغال تمام على الرابط: http://localhost:${port}`);
});