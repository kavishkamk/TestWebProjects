$(document).ready(function () {

    $("#list-items").html(localStorage.getItem("listItems")); // set from local storage

    // when add items
    $('.add-items').submit(function(event) {
        event.preventDefault();
        var item = $("#todo-list-item").val(); // get value of input field
        // if item not empty
        if (item) {
            // add item to page
            $("#list-items").append("<li><input class='checkbox' type='checkbox'/>" + item  + "<a class='remove'>X</a></li>");
            // add to local storate
            localStorage.setItem("listItems", $("#list-items").html());
            $("#todo-list-item").val(""); // clear text field
        }
    });

    // capture changers of check boxces
    $(document).on("change", ".checkbox", function() {
        // if checkd of not
        if($(this).attr("checked")) {
            $(this).removeAttr("checked", "checked"); // if checked remove attribute
        } else {
            $(this).attr("checked", "checked"); // else add attribute
        }
        $(this).parent().toggleClass("completed"); // set a class 
        localStorage.setItem("listItems", $("#list-items").html()); // update local
    });

    // remove
    $(document).on("click", ".remove", function() {
        $(this).parent().remove();
        localStorage.setItem("listItems", $("#list-items").html());
    });

});
