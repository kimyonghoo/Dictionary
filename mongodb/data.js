/*
command line to make account of mongo db

> mongod
> mongo
> use admin
> db.createUser({user:'root', pwd:'admin', roles: ['root']})

 */

//insert mongodb to users collection

const user1 = {
    name: 'chenlin',
    age: 40,
    married: false,
    comment: 'nihao',
    createdAt: new Date()
}
//db.users.mongodb(user1)

const user2 = {
    name: 'kim',
    age: 30,
    married: true,
    comment: '안녕하세요',
    createdAt: new Date()
}
//db.users.mongodb(user2)