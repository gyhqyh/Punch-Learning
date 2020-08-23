# mongoDB

### 连接与退出

```shell
# 连接
moggo
```

```shell
# 退出
exit
```
```shell
# 退出
exit
```
### 基本命令

- show dbs
    - 查看显示所有数据库  
- db
    - 查看当前操作数据库   
- use DBname  
    - 切换到指定的数据库（没有就会新建） 
- db.students.insertOne({"name": "gzj"})  
    - 向当前数据库（db代表了），插入集合students， 并存储一条数据  
- show collections
    - 查询当前数据库（db）中所有的集合  
- db.students.find()
    - 查询当前数据库，students集合中的所有数据  

## 在node中如何操作MongoDB数据库

#### 使用官方的包 mongodb

#### 使用第三方包 [mongose](https://github.com/cesanta/mongoose)

https://github.com/cesanta/mongoose