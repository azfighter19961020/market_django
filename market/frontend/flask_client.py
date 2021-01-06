from flask import Flask,send_file


app = Flask(__name__)


@app.route('/about')
def about():
	return send_file('templates/about.html')

@app.route('/cart')
def cart():
	return send_file('templates/cart.html')

@app.route('/index')
def index():
	return send_file('templates/index.html')

@app.route('/login')
def login():
	return send_file('templates/login.html')

@app.route('/product/<productname>')
def productdetail(productname):
	return send_file('templates/product.html')

@app.route('/Register')
def register():
	return send_file('templates/Register.html')

@app.route('/self/<username>')
def self(username):
	return send_file('templates/self.html')

@app.route('/order')
def order():
	return send_file('templates/order.html')

@app.route('/checkout/<choose>')
def checkout(choose):
	return send_file('templates/checkout.html')


if __name__ == '__main__':
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(debug=True)