function runConverterOnClick()
{
    runConverter(function() {
        alert("Conversion complete");
    });
}


function runConverter(callback)
{
    var chromBookmarkConverter = new ChromBookmarkConverter();

    // Load the contents of the Chrome bookmarks file
    var name = "bookmarks.html";
    $.get(name, function(fileContents) 
    {  
        // Convert the Chrome bookmarks
        chromBookmarkConverter.processChromeBookmarksContent(fileContents);

        console.log("bookmarks=", chromBookmarkConverter.bookmarks);

        // Convert to JSON
        var bookmarksJson = JSON.stringify(chromBookmarkConverter.bookmarks);

        $("#output").val(bookmarksJson);

        callback();
    });
}