/**
 * Chrome Bookmarks Converter
 * v1.0.0
 *
 * Convert a standard exported Google Chrome bookmarks HTML file into a JavaScript oject structure.
 * 
 * Dependencies: jQuery (latest).
 *
 * @summary Use JavaScript to convert an exported Chrome bookmarks HTML file. Export the results to JSON.
 * @author Jason Snelders <jason@jsnelders.com>
 *
 * Created at     : 2019-11-14 22:34:00
 * Last modified  : 2019-11-14 22:34:00
 */





function ChromBookmarkConverter()
{
    this.bookmarks = {
        folders: []
    };





    /**
     * Remove <p> and <DT> tags from the HTML. It's not needed.
     */
    this.stripUnneededTags = function(html)
    {
        html = html.replace(/<p>/gi, "");
        html = html.replace(/<P>/gi, "");
        html = html.replace(/<dt>/gi, "");
        html = html.replace(/<DT>/gi, "");
    
        return html;
    }
    



    
    /**
     * Parse the HTML content of a Chrome bookmarks file.
     * Populate the `bookmarks` object.
     * 
     * @param string html Contents of a Chrome bookmarks file.
     * 
     * @return void
     */
    this.processChromeBookmarksContent = function(html)
    {
        var parentThis = this;

        // First, strip all <p> and <DT>
        var html = this.stripUnneededTags(html);
    
        var jHtml = $.parseHTML(html);

        $.each( jHtml, function( i, el ) 
        {
            if (el.tagName == "DL")
            {
                var currentFolder = {
                    type: "folder",
                    items: []
                };

                parentThis.bookmarks.folders.push(currentFolder);

                parentThis.processDL(el, 1, currentFolder);
            }
            else
            {
                // Not handled
            }
        });
    }
    
    
    
    

    /** 
     * Process a <DL> element and all its children.
    */
    this.processDL = function(dl, parentCounter, parent)
    {
        var parentThis = this;

        //var folder = [];
        var counter = 0;
        var h3 = {};
        var currentFolder = {
            type: "folder",
            title: "",
            add_date: "",
            last_modified: "",
            items: []
        };
        var link = {};

        var dlElement = $(dl);

        var h3_ready = false;   // When set to true, the last elements was a H3, so expecting the next to be a DL


        $.each( dlElement.children(), function( i, el ) 
        {
            counter = counter + 1;
            var currentID = parentCounter + "." + counter;


            if (h3_ready == true && el.tagName.toLowerCase() != "DL".toLowerCase())
            {
                // Expecting a folder next but not found. Cancel the ready, and raise a warning.
                h3_ready = false;
                parentThis.warnIt("H3 Ready. Expecting a DL but not found. Next element is (" + el.tagName + "): ", el);

                console.log("h3", h3);

                // Push the last heading, and continue normally.
                currentFolder.items.push(h3);
            }


            if (el.tagName.toLowerCase() == "DL".toLowerCase())
            {
                currentFolder = {
                    type: "folder",
                    title: h3.title,
                    add_date: h3.add_date,
                    last_modified: h3.last_modified,
                    items: []
                };

                if (h3_ready == true)
                {
                    // Last elements was a heading. Add,it to the new sub-solder
                    //currentFolder.items.push(h3);

                    h3_ready = false;
                }

                parent.items.push(currentFolder);

                parentThis.processDL(el, currentID, currentFolder);
            }


            if (el.tagName.toLowerCase() == "H3".toLowerCase())
            {
                // Title of a folder/sub-folder
                var h3Element = $(el);
                var h3Text = h3Element.text();
                var h3AddDate = h3Element.attr("add_date");
                var h3LastModified = h3Element.attr("last_modified");

                h3 = {
                    type: "header",
                    title: h3Text,
                    add_date: h3AddDate,
                    last_modified: h3LastModified
                };

                h3_ready = true;

                // If next child element is a DL, then it contains the the links in the "folder"
            }


            if (el.tagName.toLowerCase() == "a")
            {
                // Link
                var aElement = $(el);
                var aText = aElement.text();
                var aHref = aElement.attr("href");
                var aAddDate = aElement.attr("add_date");
                var aIcon = aElement.attr("icon");


                link = {
                    type: "link",
                    title: aText,
                    href: aHref,
                    add_date: aAddDate,
                    icon: aIcon
                };

                console.log("link", link);

                parent.items.push(link);
            }
        });


        //parent.items.push(currentFolder);
    }





    this.logIt = function(value1, value2, value3, value4, value5)
    {
        if (value4 != undefined) console.log(value1, value2, value3, value4, value5);
        else if (value4 != undefined) console.log(value1, value2, value3, value4);
        else if (value3 != undefined) console.log(value1, value2, value3);
        else if (value2 != undefined) console.log(value1, value2);
        else console.log(value1);
    }
    




    this.warnIt = function(value1, value2, value3, value4)
    {
        if (value4 != undefined) console.warn(value1, value2, value3, value4);
        else if (value3 != undefined) console.warn(value1, value2, value3);
        else if (value2 != undefined) console.warn(value1, value2);
        else console.warn(value1);
    }
}