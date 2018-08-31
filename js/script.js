/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate

// Get the whole list ( This is the UL )
const $studentList = $(".student-list");

// Get the studentList child items (The LI's)
const $studentListItems = $(".student-list").children("li");

// The page div - we will append the pagination links as a child of this
const $page = $(".page");

// Create the pagination list
const $paginationLinksOL = $("<ol></ol>");
// Add a class to it so we can style the list
$paginationLinksOL.addClass("paginationLinksList")


console.log("The student list is: " + $studentListItems.length + " long");


// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four

// show a range of list items
function show(rangeStart, rangeEnd)
{
    // Clear the list
    $studentList.empty();
    
    // Loop through the student list items
    for(let i = rangeStart; i < rangeEnd; i++)
    {
         console.log("Showing items from: " + rangeStart + " to " + rangeEnd);
         $studentList.append($studentListItems[i]);
    }
}

// Create and append the pagination links - Creating a function that can do this is a good approach

// Create a list of pagination links
// Takes the list size as an arg
function createPaginationLinks(listCount)
{
    // The amount of pages to make
    // Round up using Math.ceil
    const pagListCount = Math.ceil(listCount / 10);
    console.log("Going to make " + pagListCount + " pages");
    
    // init the lower higher ranges array
    const ranges = [];
    let lower = 0;
    let higher = 10;
    
    // Loop through creating an li and adding an event listener to it.
    for (let i = 1; i <= pagListCount; i++)
    {
        // Create the li
        const $li = $("<li>" + i + "</li>");
        
        // Add a click listener for each li in the ol
        $($li).on("click", function(event)
        {
            // Get the page html number as the index for the array
            const pageIndex =  event.target.innerHTML - 1;
            console.log("Adding event listener: " + lower + " " + higher);
            console.log("page index: " + pageIndex);
            // Show the page ranges
            show(ranges[pageIndex][0], ranges[pageIndex][1]);

        });

        // Append the li to the ol
        $paginationLinksOL.append($li);
        
        // Push an array of range values onto the array
        ranges.push(
            [lower, higher]
        );
        
       // Increment the ranges
        lower+=10;
        higher+=10;
        console.log("Incrementing range to " + lower + " " + higher);

    }
    
    console.log(ranges);    
    // Append the ordered list to the page div
    $page.append($paginationLinksOL);
}

// Create the searchBox and button
function createSearchBox()
{
    // Create the search box
    const $searchBox = $('<input type="text">');
    $searchBox.addClass("searchBox");
    $page.prepend($searchBox);
    
    // Create the button
    const $searchButton = $("<button type='button'>Search</button>");
    $searchButton.addClass("searchBox");
    $page.prepend($searchButton);
    
    // Add the listener for the search button
    $($searchButton).on("click", function()
    {
        runSearch( $($searchBox).val() );
    });
}

// Show the results number
function setResultsCount(numResults)
{
    $(".resultsView").text(numResults + " results");
}

// Add the results view
function addResultsView()
{
     // Create the results view
    const $resultsNum = $("<h2>Sorry, no results</h2>");
    $resultsNum.addClass("resultsView");
    $studentList.prepend($resultsNum);
}

// Run the query
function runSearch(query)
{
    
    // Check for null input
    if(query !== "")
    {
        // Clear the list
        $studentList.empty();
        // Add a results counter
        let resultCount = 0;
        // Loop through the students and check for a match
        for (let i = 0; i < $studentListItems.length; i++)
        {
                // Store the persons name 
                const personName = $studentListItems[i].children[0].children[1].innerHTML;
                // Store the email address
                const personEmail =
                      $studentListItems[i].children[0].children[2].innerHTML;
                // If the persons name matches
                console.log("Check person name: " + personName);
                if(personName.toLowerCase().includes(query.toLowerCase())
                  || personEmail.toLowerCase().includes(query.toLowerCase()))
                {
                    console.log("query: " + query + " matches: " + personName);
                    $studentList.append($studentListItems[i]);
                    
                    // Increment results counter
                    resultCount++
                }
            
            
        }
        
        if(resultCount > 0)
        {
            addResultsView();
            setResultsCount(resultCount);
            
        }
        else{
            addResultsView();
            setResultsCount(0);
        }
        
        resultsCount = 0;
    }
   
}

// MAIN 
show(0, 10);

// Once we filter the list show the pagination links
createPaginationLinks($studentListItems.length);

// Add the search box to the page
createSearchBox();


