from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_mail import Mail, Message
from flask import Flask, session, request, jsonify
from flask_cors import CORS

from flask_session import Session  # Import Session

app = Flask(__name__)

import os

app.secret_key = os.environ.get("SECRET_KEY", "a_default_secret_key_here")
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
CORS(app)



# MySQL configurations
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "futureVisionDB"
app.config["MYSQL_PASSWORD"] = "future12345"
app.config["MYSQL_DB"] = "future_vision"

# Configure the email settings
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "nourhanmegahed591@gmail.com"
app.config["MAIL_PASSWORD"] = "nacr wibg yznm sdgy" #App Password
app.config["MAIL_DEFAULT_SENDER"] = "alaakhedr361@gmail.com"

mysql = MySQL(app)
mail = Mail(app)


@app.route("/")
def index():
    return "Welcome to Future Vision Furniture Store!"


# Get Categories API
@app.route("/categories")
def get_categories():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT DISTINCT category FROM products")
    categories = cursor.fetchall()
    cursor.close()

    # Convert the tuple result to a list
    category_list = [category[0] for category in categories]

    return jsonify({"categories": category_list})


# Get Products by Category API
@app.route("/products/<category>")
def get_products_by_category(category):
    cursor = mysql.connection.cursor()
    query = "SELECT productID, productName, filter, imageLink FROM products WHERE category = %s"
    cursor.execute(query, (category,))
    products = cursor.fetchall()
    cursor.close()

    # Convert the tuple result to a list of dictionaries
    product_list = [
        {
            "productID": product[0],
            "productName": product[1],
            "filter": product[2],
            "imageLink": product[3],
        }
        for product in products
    ]

    # Include the category name at the top of the JSON response
    return jsonify({"category": category, "products": product_list})


# Get Product Details API
@app.route("/product/<int:product_id>")
def get_product_details(product_id):
    cursor = mysql.connection.cursor()
    query = "SELECT * FROM products WHERE productID = %s"
    cursor.execute(query, (product_id,))
    product = cursor.fetchone()
    cursor.close()

    if product:
        # Convert the tuple result to a dictionary
        product_details = {
            "productID": product[0],
            "productName": product[1],
            "category": product[2],
            "filter": product[3],
            "imageLink": product[4],
        }
        return jsonify({"product": product_details})
    else:
        return jsonify({"message": "Product not found"}), 404


# Get Products by Filter API
@app.route("/products/filter/<filter>")
def get_products_by_filter(filter):
    cursor = mysql.connection.cursor()
    query = "SELECT productID, productName, category, imageLink FROM products WHERE filter = %s"
    cursor.execute(query, (filter,))
    products = cursor.fetchall()
    cursor.close()

    # Convert the tuple result to a list of dictionaries
    product_list = [
        {
            "productID": product[0],
            "productName": product[1],
            "category": product[2],
            "imageLink": product[3],
        }
        for product in products
    ]

    return jsonify({"products": product_list})


@app.route("/submit_order", methods=["POST"])
def submit_order():
    order_details = request.json
    msg = Message("New Order Received", recipients=["Sales@future-vision.asia"])
    msg.body = f"""
    New order has been placed with the following details:
    Name: {order_details['name']}
    Email: {order_details['email']}
    Phone: {order_details['phone']}
    Items Code: {order_details['itemsCode']}
    """
    mail.send(msg)

    return jsonify({"message": "Order submitted successfully"}), 200


# Get Products by Category and Filter API
@app.route("/products/<category>/<filter>")
def get_products_by_category_and_filter(category, filter):
    cursor = mysql.connection.cursor()
    query = "SELECT productID, productName, imageLink FROM products WHERE category = %s AND filter = %s"
    cursor.execute(query, (category, filter))
    products = cursor.fetchall()
    cursor.close()

    # Convert the tuple result to a list of dictionaries
    product_list = [
        {
            "productID": product[0],
            "productName": product[1],
            "imageLink": product[2],
        }
        for product in products
    ]

    return jsonify({"products": product_list})


# Contact Us API
# Contact Us API
@app.route("/contact_us", methods=["POST"])
def contact_us():
    contact_details = request.json
    msg = Message("New Contact Request", recipients=["Sales@future-vision.asia"])
    msg.body = f"""
    A new contact request has been received:
    Name: {contact_details['name']}
    Email: {contact_details['email']}
    Message: {contact_details['message']}
    """
    mail.send(msg)

    return jsonify({"message": "Your message has been sent successfully"}), 200


# Create an endpoint to add a product to the cart
@app.route("/add_to_cart", methods=["POST"])
def add_to_cart():
    product_id = request.json.get("productID")

    if "cart" not in session:
        session["cart"] = []  # Initialize a cart if it doesn't exist

    # Fetch product details from the database
    cursor = mysql.connection.cursor()
    cursor.execute(
        "SELECT productName, imageLink FROM products WHERE productID = %s",
        (product_id,),
    )
    product = cursor.fetchone()
    cursor.close()

    if product:
        # Append product details to the cart
        session["cart"].append(
            {
                "productID": product_id,
                "productName": product[0],
                "imageLink": product[1],
            }
        )
        session.modified = True  # Mark the session as modified to save changes
        return jsonify({"message": "Product added to cart", "cart": session["cart"]})
    else:
        return jsonify({"message": "Product not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)

# 1. Test the Index Endpoint:
# curl http://127.0.0.1:5000/

# 2. Test the Get Categories API:
# curl http://127.0.0.1:5000/categories

# 3. Test the Get Products by Category API:
# curl http://127.0.0.1:5000/products/<category>

# 4. Test the Get Product Details API:
# curl http://127.0.0.1:5000/product/<product_id>

# 5. Test the Get Products by Filter API:
# curl http://127.0.0.1:5000/products/filter/<filter>

# 6. Test the Submit Order Endpoint:
# curl -X POST \
#   http://127.0.0.1:5000/submit_order \
#   -H 'Content-Type: application/json' \
#   -d '{
#     "name": "John Doe",
#     "email": "john@example.com",
#     "phone": "1234567890",
#     "itemsCode": "1575, 1566"
#   }'

# 7. Testing the Add to Cart API
# curl -X POST \
#   http://127.0.0.1:5000/add_to_cart \
#   -H 'Content-Type: application/json' \
#   -d '{"productID": "123"}'

# 8. Curl Command to Test the "Contact Us" Form API
# curl -X POST \
#   http://127.0.0.1:5000/contact_us \
#   -H 'Content-Type: application/json' \
#   -d '{
#     "name": "John Doe",
#     "email": "john.doe@example.com",
#     "message": "This is a test message from John."
#   }'
