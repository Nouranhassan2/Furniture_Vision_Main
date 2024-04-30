from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MySQL configurations
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "futureVisionDB"
app.config["MYSQL_PASSWORD"] = "future12345"
app.config["MYSQL_DB"] = "future_vision"

mysql = MySQL(app)

@app.route("/")
def index():
    return "Welcome to the Control Panel."

# Get Categories API
@app.route("/AddItem", methods=["POST"])
def AddItem():
    # Extracting data from the request
    product_data = request.json
    productName = product_data.get('productName')
    category = product_data.get('category')
    filter = product_data.get('filter')
    imageLink = product_data.get('imageLink')

    # Insert the new product into the database
    cursor = mysql.connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO products (productName, category, filter, imageLink) VALUES (%s, %s, %s, %s)",
            (productName, category, filter, imageLink)
        )
        mysql.connection.commit()  # Commit the changes to the database
        productID = cursor.lastrowid  # Get the auto-generated ID of the newly inserted product
        result = {"success": True, "message": "Product added successfully", "productID": productID}
    except Exception as e:
        mysql.connection.rollback()  # Rollback in case of any error
        result = {"success": False, "message": str(e)}
    finally:
        cursor.close()

    return jsonify(result)

@app.route("/DeleteItem", methods=["POST"])
def DeleteItem():
    # Extracting data from the request
    product_data = request.json
    productID = product_data.get('productID')  # Assuming productID is passed in the request

    if not productID:
        return jsonify({"success": False, "message": "Product ID is required for deletion"}), 400

    # Delete the specified product from the database
    cursor = mysql.connection.cursor()
    try:
        cursor.execute(
            "DELETE FROM products WHERE productID = %s",
            (productID,)
        )
        if cursor.rowcount == 0:
            result = {"success": False, "message": "No product found with the given ID"}
        else:
            mysql.connection.commit()  # Commit the changes to the database
            result = {"success": True, "message": "Product deleted successfully"}
    except Exception as e:
        mysql.connection.rollback()  # Rollback in case of any error
        result = {"success": False, "message": str(e)}
    finally:
        cursor.close()

    return jsonify(result)

@app.route("/UpdateItem", methods=["POST"])
def UpdateItem():
    # Extracting data from the request
    product_data = request.json
    productID = product_data.get('productID')  # Product ID to identify the product
    productName = product_data.get('productName')
    category = product_data.get('category')
    filter = product_data.get('filter')
    imageLink = product_data.get('imageLink')

    if not productID:
        return jsonify({"success": False, "message": "Product ID is required for update"}), 400

    # Update the product in the database
    cursor = mysql.connection.cursor()
    try:
        query = """
        UPDATE products SET
            productName = %s,
            category = %s,
            filter = %s,
            imageLink = %s
        WHERE productID = %s
        """
        update_tuple = (productName, category, filter, imageLink, productID)
        cursor.execute(query, update_tuple)
        if cursor.rowcount == 0:
            result = {"success": False, "message": "No product found with the given ID or no changes made"}
        else:
            mysql.connection.commit()  # Commit the changes to the database
            result = {"success": True, "message": "Product updated successfully"}
    except Exception as e:
        mysql.connection.rollback()  # Rollback in case of any error
        result = {"success": False, "message": str(e)}
    finally:
        cursor.close()

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)