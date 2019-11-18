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
                parentThis.processDL(el, 1, parentThis.bookmarks, parentThis.bookmarks.folders);
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
    this.processDL = function(dl, parentCounter, bookmarks, parent)
    {
        var parentThis = this;

        var folder = [];
        var counter = 0;
        var h3 = {};
        var newSubFolder = [];
        var link = {};

        var dlElement = $(dl);

        var h3_ready = false;   // When set to true, the last elements was a H3, so expecting the next to be a DL


        $.each( dlElement.children(), function( i, el ) 
        {
            counter = counter + 1;
            var currentID = parentCounter + "." + counter;


            if (h3_ready == true && el.tagName != "DL")
            {
                // Expecting a folder next but not found. Cancel the ready, and raise a warning.
                h3_ready = false;
                parentThis.warnIt("H3 Ready. Expecting a DL but not found. Next element is (" + el.tagName + "): ", el);

                // Push the last heading, and continue normally.
                folder.push(h3);
            }


            if (el.tagName == "DL")
            {
                newSubFolder = [];

                if (h3_ready == true)
                {
                    // Last elements was a heading. Addi t to the new sub-solder
                    newSubFolder.push(h3);
                }


                parent.push(newSubFolder);

                parentThis.processDL(el, currentID, bookmarks, newSubFolder);
            }


            if (el.tagName == "H3")
            {
                // Title of a folder/sub-folder
                var h3Element = $(el);
                var h3Text = h3Element.text();
                var h3AddDate = h3Element.attr("add_date");
                var h3LastModified = h3Element.attr("last_modified");
                var h3PersonalToolbarFolder = h3Element.attr("personal_toolbar_folder");

                h3 = {
                    type: "header",
                    title: h3Text,
                    add_date: h3AddDate,
                    last_modified: h3LastModified
                };

                h3_ready = true;

                // If next child element is a DL, then it contains the the links in the "folder"
            }


            if (el.tagName == "A")
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

                folder.push(link);
            }
        });


        parent.push(folder);
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