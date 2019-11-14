/**
 * Chrome Bookmarks Converter
 * v1.0.0
 *
 * Convert a standard exported Google Chrome bookmarks HTML file into a JSON file using JavaScript
 *
 * @summary Use JavaScript to convert an exported Chrome bookmarks HTML file. Export the results to JSON.
 * @author Jason Snelders <jason@jsnelders.com>
 *
 * Created at     : 2019-11-14 22:34:00
 * Last modified  : 2019-11-14 22:34:00
 */
var jHtml = null;

var bookmarks = {
    folders: []
};



function runConverterOnClick()
{
    runConverter(function() {
        alert("Conversion complete");
    });
}

function runConverter(callback)
{
    // Load the contents of the Chrome bookmarks file
    var name = "bookmarks.html";
    $.get(name, function(response) 
    {  
        // First, strip all <p> and <DT>
        var html = stripUnneededTags(response);

        // Convert to a JavaScript object
        processChromeBookmarksContent(html);

        console.log("bookmarks=", bookmarks);

        // Convert to JSON
        var bookmarksJson = JSON.stringify(bookmarks);

        $("#output").val(bookmarksJson);

        callback();
    });
}



function stripUnneededTags(html)
{
    html = html.replace(/<p>/gi, "");
    html = html.replace(/<P>/gi, "");
    html = html.replace(/<dt>/gi, "");
    html = html.replace(/<DT>/gi, "");

    return html;
}


// Parse a Chrome bookmarks file content
function processChromeBookmarksContent(html)
{
    //console.log(html);

    jHtml = $.parseHTML(html);

    //console.log("jHtml=", jHtml);


    $.each( jHtml, function( i, el ) 
    {
        //console.log("el=", $(el));
        //console.log("el.tagName=", el.tagName);

        if (el.tagName == "DL")
        {
            //console.log("Is DL");
            processDL(el, 1, bookmarks, bookmarks.folders);
        }
    });



/*
<H1>Bookmarks</H1>
<DL>
    <H3 ADD_DATE="1524922383" LAST_MODIFIED="1573713811" PERSONAL_TOOLBAR_FOLDER="true">Bookmarks bar</H3>
    <DL>
        <H3 ADD_DATE="1564649672" LAST_MODIFIED="1568539347">Mail</H3>
        <DL>
            <A HREF="https://mail.google.com/mail/u/?authuser=jsnelders@gmail.com" ADD_DATE="1560413967" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jdWSP2gTcRTHP793l+R+eAdtcjlJqxVHFy2Ci0tFuougkzh2bHUr1UVXF1c3N2dBJEIHcbLin0Whi4Z2MKLUpInJJbnf5X4OV21KOws+ePCG9x7f9/k++O9DAWxeXbTFqWn8lVXcudOHmqy1f+t0u0H3wT3iVov59Q0lAJ1RArttevdXSdafIyJHZvLiGb/WVlDtFt3hCAAX4Gc8IDaGGc8jfvIYs/kJf2kZdczPFcR9+o8ekrx9jcksX+OY7/0YAAE4XnIZJAlbZ87RMwbz/g27d2+TbjdIt77QWVsmebdBL01pX7xEs9cncGVfgSfCrFdicOUajahG7WWdcOcHnTu3wALWsoOQ3FgiOH+BSv0pssfFBSDLcIHa7AkKC5f5XKliXtUJvzXBWtozJ0mu3yScO4XvBzQnALt7nPN7RIiiCDk7TyMIkI8fcByHdGGRahihtUaJAmtz+/4ssFk2YawirIb4gU+zXEG0JiqXKRQKiAhKJB9WakLBvs0AaK3RWlMslRgOR7iug1IKJQpRCgWoAwysBSwigtaa8XiMtRbtebiOQ2IMjkg+nL/OQQbdQpHScABK0ev3D30iQGIMSgRHxpjMkk1NH9n37+M3o82oek+NzDgAAAAASUVORK5CYII=">jsnelders@gmail.com</A>
            <A HREF="https://mail.google.com/mail/u/?authuser=jason@jsnelders.com" ADD_DATE="1560414104" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jdWSP2gTcRTHP793l+R+eAdtcjlJqxVHFy2Ci0tFuougkzh2bHUr1UVXF1c3N2dBJEIHcbLin0Whi4Z2MKLUpInJJbnf5X4OV21KOws+ePCG9x7f9/k++O9DAWxeXbTFqWn8lVXcudOHmqy1f+t0u0H3wT3iVov59Q0lAJ1RArttevdXSdafIyJHZvLiGb/WVlDtFt3hCAAX4Gc8IDaGGc8jfvIYs/kJf2kZdczPFcR9+o8ekrx9jcksX+OY7/0YAAE4XnIZJAlbZ87RMwbz/g27d2+TbjdIt77QWVsmebdBL01pX7xEs9cncGVfgSfCrFdicOUajahG7WWdcOcHnTu3wALWsoOQ3FgiOH+BSv0pssfFBSDLcIHa7AkKC5f5XKliXtUJvzXBWtozJ0mu3yScO4XvBzQnALt7nPN7RIiiCDk7TyMIkI8fcByHdGGRahihtUaJAmtz+/4ssFk2YawirIb4gU+zXEG0JiqXKRQKiAhKJB9WakLBvs0AaK3RWlMslRgOR7iug1IKJQpRCgWoAwysBSwigtaa8XiMtRbtebiOQ2IMjkg+nL/OQQbdQpHScABK0ev3D30iQGIMSgRHxpjMkk1NH9n37+M3o82oek+NzDgAAAAASUVORK5CYII=">jason@jsnelders.com</A>
            <A HREF="https://mail.google.com/mail/u/?authuser=jason@vylesk.com" ADD_DATE="1560414012" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jdWSP2gTcRTHP793l+R+eAdtcjlJqxVHFy2Ci0tFuougkzh2bHUr1UVXF1c3N2dBJEIHcbLin0Whi4Z2MKLUpInJJbnf5X4OV21KOws+ePCG9x7f9/k++O9DAWxeXbTFqWn8lVXcudOHmqy1f+t0u0H3wT3iVov59Q0lAJ1RArttevdXSdafIyJHZvLiGb/WVlDtFt3hCAAX4Gc8IDaGGc8jfvIYs/kJf2kZdczPFcR9+o8ekrx9jcksX+OY7/0YAAE4XnIZJAlbZ87RMwbz/g27d2+TbjdIt77QWVsmebdBL01pX7xEs9cncGVfgSfCrFdicOUajahG7WWdcOcHnTu3wALWsoOQ3FgiOH+BSv0pssfFBSDLcIHa7AkKC5f5XKliXtUJvzXBWtozJ0mu3yScO4XvBzQnALt7nPN7RIiiCDk7TyMIkI8fcByHdGGRahihtUaJAmtz+/4ssFk2YawirIb4gU+zXEG0JiqXKRQKiAhKJB9WakLBvs0AaK3RWlMslRgOR7iug1IKJQpRCgWoAwysBSwigtaa8XiMtRbtebiOQ2IMjkg+nL/OQQbdQpHScABK0ev3D30iQGIMSgRHxpjMkk1NH9n37+M3o82oek+NzDgAAAAASUVORK5CYII=">jason@vylesk.com</A>
            <H3 ADD_DATE="1564649672" LAST_MODIFIED="1568539353">Secondary</H3>
            <DL>
                <A HREF="https://mail.google.com/mail/u/?authuser=admin@jsnelders.com" ADD_DATE="1560414035" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jdWSP2gTcRTHP793l+R+eAdtcjlJqxVHFy2Ci0tFuougkzh2bHUr1UVXF1c3N2dBJEIHcbLin0Whi4Z2MKLUpInJJbnf5X4OV21KOws+ePCG9x7f9/k++O9DAWxeXbTFqWn8lVXcudOHmqy1f+t0u0H3wT3iVov59Q0lAJ1RArttevdXSdafIyJHZvLiGb/WVlDtFt3hCAAX4Gc8IDaGGc8jfvIYs/kJf2kZdczPFcR9+o8ekrx9jcksX+OY7/0YAAE4XnIZJAlbZ87RMwbz/g27d2+TbjdIt77QWVsmebdBL01pX7xEs9cncGVfgSfCrFdicOUajahG7WWdcOcHnTu3wALWsoOQ3FgiOH+BSv0pssfFBSDLcIHa7AkKC5f5XKliXtUJvzXBWtozJ0mu3yScO4XvBzQnALt7nPN7RIiiCDk7TyMIkI8fcByHdGGRahihtUaJAmtz+/4ssFk2YawirIb4gU+zXEG0JiqXKRQKiAhKJB9WakLBvs0AaK3RWlMslRgOR7iug1IKJQpRCgWoAwysBSwigtaa8XiMtRbtebiOQ2IMjkg+nL/OQQbdQpHScABK0ev3D30iQGIMSgRHxpjMkk1NH9n37+M3o82oek+NzDgAAAAASUVORK5CYII=">admin@jsnelders.com</A>
                <A HREF="https://mail.google.com/mail/u/?authuser=support@vylesk.com" ADD_DATE="1560414027" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jdWSP2gTcRTHP793l+R+eAdtcjlJqxVHFy2Ci0tFuougkzh2bHUr1UVXF1c3N2dBJEIHcbLin0Whi4Z2MKLUpInJJbnf5X4OV21KOws+ePCG9x7f9/k++O9DAWxeXbTFqWn8lVXcudOHmqy1f+t0u0H3wT3iVov59Q0lAJ1RArttevdXSdafIyJHZvLiGb/WVlDtFt3hCAAX4Gc8IDaGGc8jfvIYs/kJf2kZdczPFcR9+o8ekrx9jcksX+OY7/0YAAE4XnIZJAlbZ87RMwbz/g27d2+TbjdIt77QWVsmebdBL01pX7xEs9cncGVfgSfCrFdicOUajahG7WWdcOcHnTu3wALWsoOQ3FgiOH+BSv0pssfFBSDLcIHa7AkKC5f5XKliXtUJvzXBWtozJ0mu3yScO4XvBzQnALt7nPN7RIiiCDk7TyMIkI8fcByHdGGRahihtUaJAmtz+/4ssFk2YawirIb4gU+zXEG0JiqXKRQKiAhKJB9WakLBvs0AaK3RWlMslRgOR7iug1IKJQpRCgWoAwysBSwigtaa8XiMtRbtebiOQ2IMjkg+nL/OQQbdQpHScABK0ev3D30iQGIMSgRHxpjMkk1NH9n37+M3o82oek+NzDgAAAAASUVORK5CYII=">support@vylesk.com</A>
            </DL>
        </DL>
        <H3 ADD_DATE="1564619273" LAST_MODIFIED="1573707048">#</H3>
        <DL>
            <H3 ADD_DATE="1572777580" LAST_MODIFIED="1572777585">CodePen</H3>
            <DL>
                <A HREF="https://codepen.io/jsnelders/pen/vYYpbbm" ADD_DATE="1572774975" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACTElEQVQ4jY2TMW/iQBCF36yNlDQkSnGUaJsUSFGCDBWhgdoNPVT8DeTkf9DwExA/ggonSFSuQIqE7honHdKu510RGyXKFbfdm52dHT29DyRHJN9IFiQ9SaqqOudYHeccVVVL6cveN5IjIfkbwC8ACkCKokAQBAAgLy8vAIB2uw0A/HJHAAbAH5RTC1VV772WGzBJEgZBwCAImCQJqwW891puU5CklI9FRCAistlsMJ1O+fHxIRcXFwCA0+mEq6srzudziaKo+hTGGBpVNcYYcc7JbDZDp9Nhs9mUNE3R7XbR7XaRpimazaZ0Oh3OZjN478UYI6pqoKq63++11+uptVZXq9XZvMFgwMFgcNar1YrWWn18fNT9fq+qqiDJxWJBAGy1WsyyjMfjkXEcs16vs16vM45jHo9HZlnGVqtFAFwsFiTJkCScc7i9vUWv18Pd3R2ur69hrcVmswEAjMdjPDw84P39HZPJBN57OOdAEiEAiAgAQFVRmnnW1anqVa3qMSKCWq2GLMuwXq+x2+2w3W7RaDQQRRGiKEKj0cB2u8Vut8N6vUaWZajVap9DVFUPh4P2+3211upyuTybNhwOORwOz3q5XNJaq/1+Xw+Hw6eJRVGc45okCUVE4zhmnuccj8ecTCbM85xxHNMYo0mSsIp5URQ/g5SmKabTKfM8l8vLS5DE6XTCzc0N5/O5tNvtb0E6R5mkOucqYPj09MQwDBmGIZ+fn7+CpSS/RfkHTMYYiIi8vr5CRHB/f4+SkX/C9BXn4j9wrvreSI7+AvzfT4EQnpIjAAAAAElFTkSuQmCC">VueJS (2.x) - Test</A>
                <A HREF="https://codepen.io/OriginalEXE/pen/jrvgKE" ADD_DATE="1572777573" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACTElEQVQ4jY2TMW/iQBCF36yNlDQkSnGUaJsUSFGCDBWhgdoNPVT8DeTkf9DwExA/ggonSFSuQIqE7honHdKu510RGyXKFbfdm52dHT29DyRHJN9IFiQ9SaqqOudYHeccVVVL6cveN5IjIfkbwC8ACkCKokAQBAAgLy8vAIB2uw0A/HJHAAbAH5RTC1VV772WGzBJEgZBwCAImCQJqwW891puU5CklI9FRCAistlsMJ1O+fHxIRcXFwCA0+mEq6srzudziaKo+hTGGBpVNcYYcc7JbDZDp9Nhs9mUNE3R7XbR7XaRpimazaZ0Oh3OZjN478UYI6pqoKq63++11+uptVZXq9XZvMFgwMFgcNar1YrWWn18fNT9fq+qqiDJxWJBAGy1WsyyjMfjkXEcs16vs16vM45jHo9HZlnGVqtFAFwsFiTJkCScc7i9vUWv18Pd3R2ur69hrcVmswEAjMdjPDw84P39HZPJBN57OOdAEiEAiAgAQFVRmnnW1anqVa3qMSKCWq2GLMuwXq+x2+2w3W7RaDQQRRGiKEKj0cB2u8Vut8N6vUaWZajVap9DVFUPh4P2+3211upyuTybNhwOORwOz3q5XNJaq/1+Xw+Hw6eJRVGc45okCUVE4zhmnuccj8ecTCbM85xxHNMYo0mSsIp5URQ/g5SmKabTKfM8l8vLS5DE6XTCzc0N5/O5tNvtb0E6R5mkOucqYPj09MQwDBmGIZ+fn7+CpSS/RfkHTMYYiIi8vr5CRHB/f4+SkX/C9BXn4j9wrvreSI7+AvzfT4EQnpIjAAAAAElFTkSuQmCC">Vue Router Transition</A>
                <A HREF="https://codepen.io/patrickodacre/pen/zxwWPO" ADD_DATE="1572777576" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACTElEQVQ4jY2TMW/iQBCF36yNlDQkSnGUaJsUSFGCDBWhgdoNPVT8DeTkf9DwExA/ggonSFSuQIqE7honHdKu510RGyXKFbfdm52dHT29DyRHJN9IFiQ9SaqqOudYHeccVVVL6cveN5IjIfkbwC8ACkCKokAQBAAgLy8vAIB2uw0A/HJHAAbAH5RTC1VV772WGzBJEgZBwCAImCQJqwW891puU5CklI9FRCAistlsMJ1O+fHxIRcXFwCA0+mEq6srzudziaKo+hTGGBpVNcYYcc7JbDZDp9Nhs9mUNE3R7XbR7XaRpimazaZ0Oh3OZjN478UYI6pqoKq63++11+uptVZXq9XZvMFgwMFgcNar1YrWWn18fNT9fq+qqiDJxWJBAGy1WsyyjMfjkXEcs16vs16vM45jHo9HZlnGVqtFAFwsFiTJkCScc7i9vUWv18Pd3R2ur69hrcVmswEAjMdjPDw84P39HZPJBN57OOdAEiEAiAgAQFVRmnnW1anqVa3qMSKCWq2GLMuwXq+x2+2w3W7RaDQQRRGiKEKj0cB2u8Vut8N6vUaWZajVap9DVFUPh4P2+3211upyuTybNhwOORwOz3q5XNJaq/1+Xw+Hw6eJRVGc45okCUVE4zhmnuccj8ecTCbM85xxHNMYo0mSsIp5URQ/g5SmKabTKfM8l8vLS5DE6XTCzc0N5/O5tNvtb0E6R5mkOucqYPj09MQwDBmGIZ+fn7+CpSS/RfkHTMYYiIi8vr5CRHB/f4+SkX/C9BXn4j9wrvreSI7+AvzfT4EQnpIjAAAAAElFTkSuQmCC">Vue Router Pass Params As Props</A>
            </DL>
*/

    function processDL(dl, parentCounter, bookmarks, parent)
    {
        var folder = [];
        
        var dlElement = $(dl);
        var children = dlElement.children();
        //logIt("processDL(" + parentCounter + ")=", dlElement);
        //logIt("processDL.children()=",children);

        var counter = 0;

        var h3 = {};
        var newSubFolder = [];
        var link = {};

        var h3_ready = false;   // When set to true, the last elements was a H3, so expecting the next to be a DL

        $.each( dlElement.children(), function( i, el ) 
        {
            counter = counter + 1;
            var currentID = parentCounter + "." + counter;

            // logIt("processDL(" + currentID + "): el=", $(el));
            // logIt("processDL(" + currentID + "): el.tagName=", el.tagName);
            

            if (h3_ready == true && el.tagName != "DL")
            {
                // Expecting a folder next but not found. Cancel the ready, and raise a warning.
                h3_ready = false;
                warnIt("H3 Ready. Expecting a DL but not found. Next element is (" + el.tagName + "): ", el);


                // Push the last heading, and continue normally.
                folder.push(h3);
                //h3 = {};
            }


            if (el.tagName == "DL")
            {
                newSubFolder = [];

                if (h3_ready == true)
                {
                    // Last elements was a heading. Addi t to the new sub-solder
                    newSubFolder.push(h3);
                    //h3 = {};
                }

                parent.push(newSubFolder);

                //logIt("processDL(" + parentCounter + ")=" + ": Found DL");
                processDL(el, currentID, bookmarks, newSubFolder);
            }


            if (el.tagName == "H3")
            {
                // Title of a folder/sub-folder
                var h3Element = $(el);
                var h3Text = h3Element.text();
                var h3AddDate = h3Element.attr("add_date");
                var h3LastModified = h3Element.attr("last_modified");
                var h3PersonalToolbarFolder = h3Element.attr("personal_toolbar_folder");

                //logIt("h3Element=", h3Element);
                //logIt("processDL(" + currentID + "): H3 = ", h3Text, h3AddDate, h3LastModified, h3PersonalToolbarFolder);


                h3 = {
                    type: "header",
                    title: h3Text,
                    add_date: h3AddDate,
                    last_modified: h3LastModified
                };
                //folder.push(h3);

                //h3 = {};

                h3_ready = true;
                // If next child element is a DL, then it contains the the links in the "folder"
            }


            if (el.tagName == "A")
            {
                // Link
                //logIt("processDT(" + parentCounter + ")=" + ": Found A");

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

                //link = {};

                //logIt("processDL(" + currentID + "): A =", aText, aHref, aAddDate, aIcon);

                //<A HREF="https://mail.google.com/mail/u/?authuser=jsnelders@gmail.com" 
                //ADD_DATE="1560413967" 
                //ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jdWSP2gTcRTHP793l+R+eAdtcjlJqxVHFy2Ci0tFuougkzh2bHUr1UVXF1c3N2dBJEIHcbLin0Whi4Z2MKLUpInJJbnf5X4OV21KOws+ePCG9x7f9/k++O9DAWxeXbTFqWn8lVXcudOHmqy1f+t0u0H3wT3iVov59Q0lAJ1RArttevdXSdafIyJHZvLiGb/WVlDtFt3hCAAX4Gc8IDaGGc8jfvIYs/kJf2kZdczPFcR9+o8ekrx9jcksX+OY7/0YAAE4XnIZJAlbZ87RMwbz/g27d2+TbjdIt77QWVsmebdBL01pX7xEs9cncGVfgSfCrFdicOUajahG7WWdcOcHnTu3wALWsoOQ3FgiOH+BSv0pssfFBSDLcIHa7AkKC5f5XKliXtUJvzXBWtozJ0mu3yScO4XvBzQnALt7nPN7RIiiCDk7TyMIkI8fcByHdGGRahihtUaJAmtz+/4ssFk2YawirIb4gU+zXEG0JiqXKRQKiAhKJB9WakLBvs0AaK3RWlMslRgOR7iug1IKJQpRCgWoAwysBSwigtaa8XiMtRbtebiOQ2IMjkg+nL/OQQbdQpHScABK0ev3D30iQGIMSgRHxpjMkk1NH9n37+M3o82oek+NzDgAAAAASUVORK5CYII=">
                //jsnelders@gmail.com</A>
            }
        });


        parent.push(folder);
    }


    // function processDT(dt, parentCounter)
    // {
    //     var dtElement = $(dt);
    //     var children = dtElement.children();
    //     console.log("--processDT(" + parentCounter + ")=", dtElement);
    //     //console.log("--processDT(" + parentCounter + ").children()=",children);

    //     var counter = 0;

    //     $.each( dtElement.children(), function( i, el ) 
    //     {
    //         counter = counter + 1;
    //         var currentID = parentCounter + "." + counter;

    //         console.log("--processDT(" + currentID + "): el=", $(el));
    //         console.log("--processDT(" + currentID + "): el.tagName=", el.tagName);

    //         // if (el.tagName == "DT")
    //         // {
    //         //     // Item in a folder
    //         //     console.log("processDT(" + parentCounter + ")=" + ": Found DT");
    //         // }

    //         if (el.tagName == "H3")
    //         {
    //             // Title of a folder/sub-folder
    //             console.log("processDT(" + parentCounter + ")=" + ": Found H3");

    //             //<H3 ADD_DATE="1524922383" LAST_MODIFIED="1573713811" PERSONAL_TOOLBAR_FOLDER="true">Bookmarks bar</H3>

    //             // If next child element is a DL, then it contains the the links in the "folder"
    //         }

    //         if (el.tagName == "A")
    //         {
    //             // Link
    //             console.log("processDT(" + parentCounter + ")=" + ": Found A");

    //             //<A HREF="https://mail.google.com/mail/u/?authuser=jsnelders@gmail.com" 
    //             //ADD_DATE="1560413967" 
    //             //ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jdWSP2gTcRTHP793l+R+eAdtcjlJqxVHFy2Ci0tFuougkzh2bHUr1UVXF1c3N2dBJEIHcbLin0Whi4Z2MKLUpInJJbnf5X4OV21KOws+ePCG9x7f9/k++O9DAWxeXbTFqWn8lVXcudOHmqy1f+t0u0H3wT3iVov59Q0lAJ1RArttevdXSdafIyJHZvLiGb/WVlDtFt3hCAAX4Gc8IDaGGc8jfvIYs/kJf2kZdczPFcR9+o8ekrx9jcksX+OY7/0YAAE4XnIZJAlbZ87RMwbz/g27d2+TbjdIt77QWVsmebdBL01pX7xEs9cncGVfgSfCrFdicOUajahG7WWdcOcHnTu3wALWsoOQ3FgiOH+BSv0pssfFBSDLcIHa7AkKC5f5XKliXtUJvzXBWtozJ0mu3yScO4XvBzQnALt7nPN7RIiiCDk7TyMIkI8fcByHdGGRahihtUaJAmtz+/4ssFk2YawirIb4gU+zXEG0JiqXKRQKiAhKJB9WakLBvs0AaK3RWlMslRgOR7iug1IKJQpRCgWoAwysBSwigtaa8XiMtRbtebiOQ2IMjkg+nL/OQQbdQpHScABK0ev3D30iQGIMSgRHxpjMkk1NH9n37+M3o82oek+NzDgAAAAASUVORK5CYII=">
    //             //jsnelders@gmail.com</A>
    //         }
    //     });
    // }

}



function logIt(value1, value2, value3, value4, value5)
{
    if (value4 != undefined) console.log(value1, value2, value3, value4, value5);
    else if (value4 != undefined) console.log(value1, value2, value3, value4);
    else if (value3 != undefined) console.log(value1, value2, value3);
    else if (value2 != undefined) console.log(value1, value2);
    else console.log(value1);
}

function warnIt(value1, value2, value3, value4)
{
    if (value4 != undefined) console.warn(value1, value2, value3, value4);
    else if (value3 != undefined) console.warn(value1, value2, value3);
    else if (value2 != undefined) console.warn(value1, value2);
    else console.warn(value1);
}