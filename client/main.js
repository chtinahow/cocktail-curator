const Tram = require('tram-one')

const app = new Tram()
app.addRoute('/', require('./pages/home'))
app.addRoute('/404', require('./pages/404'))
app.addRoute('/drink/:drinkId', require('./pages/drink'))
app.addActions({drinkStore: require('./actions/drinkById')})
app.start('.main')
