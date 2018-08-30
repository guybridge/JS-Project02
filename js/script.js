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
$paginationLinksOL.addClass("paginationLinksList")


console.log("The student list is: " + $studentListItems.length + " long");


// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four

// show a range of list items
// 
function show(rangeStart, rangeEnd)
{
    // Clear the list
    $studentList.empty();
    // Clear the ordered list
   // $paginationLinksOL.empty();
    
    
    // Loop through the student list items
    for(let i = rangeStart; i <= rangeEnd; i++)
    {
         console.log("Showing items from: " + rangeStart + " to " + rangeEnd);
         $studentList.append($studentListItems[i]);
    }
    

    
}

// Create and append the pagination links - Creating a function that can do this is a good approach

// Create a list of pagination links
// Takes the whole list size as an arg
function createPaginationLinks(listCount)
{
    // The amount of pages to make
    // Round up using Math.ceil
    const pagListCount = Math.ceil(listCount / 10);
    console.log("Going to make " + pagListCount + " pages");
    
    // init the lower higher ranges
    const ranges = [];
    
    let lower = 0;
    let higher = 10;
    
    // Loop through creating an li and adding an event listener to it.
    for (let i = 0; i < pagListCount; i++)
    {
        // Create the li
        const $li = $("<li>" + i + "</li>");
        
        // Add a click listener for each li in the ol
        $($li).on("click", function(event)
        {
            const pageIndex =  event.target.innerHTML
            console.log("Adding event listener: " + lower + " " + higher);
            console.log("page index: " + pageIndex);
            
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



// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here



// MAIN 

show(0, 10);

// Once we filter the list show the pagination links
createPaginationLinks($studentListItems.length);


