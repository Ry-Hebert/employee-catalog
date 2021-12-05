require('dotenv').config()

const Express = require('express')
const Mongoose = require('mongoose')
const bodyParser = require('body-parser')

const server = new Express()

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(Express.json())
server.use(Express.urlencoded())
server.use('/', Express.static('./public'))

Mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

server.listen(process.env.PORT || 3001, () =>{
    console.log('Server is running now')
})

server.get('/', (req, res) => {
    Employees.find({}, (err, people) =>{

        if(err){console.log(handleError(err))}
        res.json(people)
    })
})

server.get('/', (req, res) => {
    Employees.find({}, (err, employees) =>{

        if(err){console.log(handleError(err))}
        res.json(employees)
    })
})

server.get('/employees/:id', (req, res) => {
    Employees.find({}, (err, employees) =>{

        if(err){console.log(handleError(err))}
        res.json(employees)
    })
})

server.post('/', (req, res) => {
    person.create({
    id: req.body.id,
    })
    res.send('Successfully added person')
})

server.post('/', (req, res) => {
    console.log(req.query)
    
    Categories.create({
    category: req.query.category
    })
    res.send('Successfully added Group')
})

server.put('/people/:id', (req, res) =>{
    console.log('hit')
    Categories.findOne({id: req.params.id}, (err, categories) =>{
        if(err){console.log(handleError(err))}
        console.log(todo)
        console.log(req.body)
        todo.update(req.body, (err) =>{
            // if(err){console.log(handleError(err))}
            Groups.find({}, (err, group) =>{
                if(err){console.log(handleError(err))}
                res.json(group)
            })
        })
    })
})

server.put('/groups/:id', (req, res) =>{
    Grpoups.findById(req.params.id, (err, group) =>{
        if(err){console.log(handleError(err))}
        group.update(req.query, (err) =>{
            if(err){console.log(handleError(err))}
            Groups.find({}, (err, groupX) =>{
                if(err){console.log(handleError(err))}
                res.json(groupX)
            })
        })
    })
})

server.delete('/employee/:id', (req, res) =>{
    Employees.remove({id: req.params.id}, (err) => {
        if(err){console.log(handleError(err))}
        Employees.find((err, employee) =>{
            if(err){console.log(handleError(err))}
            res.json(employee)
        })
    })
})

server.delete('/groups/:id', (req, res) =>{
    Groups.remove({_id: req.params.id}, (err) => {
        if(err){console.log(handleError(err))}
        Groups.find((err, group) =>{
            if(err){console.log(handleError(err))}
            res.json(group)
        })
    })
})