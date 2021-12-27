const express = require('express')
const app = express()

app.use(express.json())

const { Sequelize, DataTypes } = require('sequelize')

const conn = new Sequelize('mysql://root:@172.16.5.99/node24122021') // Example for postgres

// const conn = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'mkdb.sqlite'
//   });

// const myconn = async ()=>{
//   try {
//     await conn.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// myconn()

// user model

const userModel = conn.define('user', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    }
  }, {
    freezeTableName: true
    // Other model options go here
  });

//   userModel.sync({ force: true });

app.get('/', (req, res) => {
    res.send('api server')
})

app.get('/user/getall', async (req, res) => {
    const getallusers = await userModel.findAll()
    console.log(getallusers)
    res.json(getallusers)
})

app.post('/user/create', async (req, res) => {
    const getuser = await userModel.create(req.body)
    res.json(getuser)
})

app.get('/user/edit/:id', async (req, res) => {
    // const getuserdata = await userModel.findOne({where:{id:2}})
    const getuserdata = await userModel.findByPk(req.params.id)
    res.json(getuserdata)
})

app.post('/user/update/:id', async(req, res) => {
    const getuser = await userModel.update(req.body, {where:{id:req.params.id}})
    res.send(getuser)
})

app.listen(3000)