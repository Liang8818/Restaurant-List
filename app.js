const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurants.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


//設置靜態檔案
app.use(express.static('public'))

app.get('/', (req, res) => {
  //解析 HTML 樣板並繪製出瀏覽器裡的畫面
  res.render('index', { restaurant: restaurantList.results })
})

//顯示餐廳資料
app.get('/restaurants/:restaurants_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurants_id)
  res.render('show', { restaurant: restaurant })
})

//搜尋關鍵字
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase()))

  })

  res.render('index', { restaurant: restaurants, keyword: keyword })
})





app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})