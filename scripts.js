function onConvertToJson()
{
    // runConverterForLocalBookmarksDotHtmlFile(function() {
    //     alert("Conversion complete.\nFor large HTML files, give the browser a few seconds to display the results in the text box.");
    // });

    runConverterSelectedFile(function() {
        alert("Conversion complete.\nFor large HTML files, give the browser a few seconds to display the results in the text box.");
    });
}


/**
 * Read a bookmarks.html file in the same folder.
 */
function runConverterForLocalBookmarksDotHtmlFile(callback)
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



function runConverterSelectedFile(callback)
{
    var chromBookmarkConverter = new ChromBookmarkConverter();

    // Read content from the selected file.
    var fileContents = $("#input").val();
    
    // Convert the Chrome bookmarks
    chromBookmarkConverter.processChromeBookmarksContent(fileContents);

    console.log("bookmarks=", chromBookmarkConverter.bookmarks);

    // Convert to JSON
    var bookmarksJson = JSON.stringify(chromBookmarkConverter.bookmarks);

    $("#output").val(bookmarksJson);

    callback();
}


/**
 * Read the contents of a selected file.
 */
function onReadSelectedFile()
{
    // Referneces: 
    //      https://ourcodeworld.com/articles/read/191/how-to-read-a-computer-file-using-javascript-in-the-browser
    //      https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications

    var selectedFile = document.getElementById('bookmarksFile').files[0];

    //console.log("selectedFile", selectedFile);
    //console.log("file", selectedFile);

    var timer;
    var startValue = $("#input").val();

    if (selectedFile) 
    {
        // Validate file is HTML
        if (selectedFile.type != "text/html")
        {
            alert("Select file must be a HTML file");
            return;
        }

        timer = setInterval(function() { 
            var currentValue = $("#input").val();

            if (currentValue != startValue)
            {
                // textarea has been updated.
                onInputChanged();
                clearInterval(timer);
            }
        }, 500);

        var reader = new FileReader();
        
        reader.onload = function (evt) 
        {
            //console.log(evt);
            //console.log("evt.target.result=", evt.target.result);
            document.getElementById("input").value = evt.target.result;

            alert("Read complete.\nFor large HTML files, give the browser a few seconds to display the results in the text box.");
        };

        reader.onerror = function (evt) 
        {
            console.error("An error ocurred reading the file",evt);
        };

        reader.readAsText(selectedFile, "UTF-8");
    }
}



function onInputChanged()
{
    $("#convertToJson").prop("disabled", false);
    alert("Ready to convert");
}