$(document).ready(function() {
    // Add Product
    $('#addProductForm').submit(function(e) {
        e.preventDefault();
        var productName = $('#productName').val();
        var category = $('#category').val();
        var filter = $('#filter').val();
        var imageLink = $('#imageLink').val();

        $.ajax({
            url: 'http://localhost:5000/AddItem',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                productName: productName,
                category: category,
                filter: filter,
                imageLink: imageLink
            }),
            success: function(response) {
                alert('Product added: ' + response.productID);
                $('#addProductForm')[0].reset();
            },
            error: function(error) {
                alert('Error adding product: ' + error.responseText);
            }
        });
    });

    // Update Product
    $('#updateProductForm').submit(function(e) {
        e.preventDefault();
        var productID = $('#updateProductID').val();
        var productName = $('#updateProductName').val();
        var category = $('#updateCategory').val();
        var filter = $('#updateFilter').val();
        var imageLink = $('#updateImageLink').val();

        $.ajax({
            url: 'http://localhost:5000/UpdateItem',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                productID: productID,
                productName: productName,
                category: category,
                filter: filter,
                imageLink: imageLink
            }),
            success: function(response) {
                alert('Product updated: ' + response.message);
                $('#updateProductForm')[0].reset();
            },
            error: function(error) {
                alert('Error updating product: ' + error.responseText);
            }
        });
    });

    // Delete Product
    $('#deleteProductForm').submit(function(e) {
        e.preventDefault();
        var productID = $('#deleteProductID').val();

        $.ajax({
            url: 'http://localhost:5000/DeleteItem',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                productID: productID
            }),
            success: function(response) {
                alert('Product deleted: ' + response.message);
                $('#deleteProductForm')[0].reset();
            },
            error: function(error) {
                alert('Error deleting product: ' + error.responseText);
            }
        });
    });
});