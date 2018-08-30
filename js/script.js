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


console.log("The student list is: " + $studentListItems.length + " long");


// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four

// show a range of list items
// 
function show(rangeStart, rangeEnd)
{
    // Clear the list
    $studentList.empty();
    
    // Loop through the student list items
    for(let i = rangeStart; i <= rangeEnd; i++)
    {
         console.log("Showing items from: " + rangeStart + " to " + rangeEnd);
         $studentList.append($studentListItems[i]);
    }
    
    createPaginationLinks($studentListItems.length);
    
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
    
    // Create the pagination list
    const $paginationLinksOL = $("<ol></ol>");
    $paginationLinksOL.addClass("paginationLinksList")
     
    for (let i = 0; i < pagListCount; i++)
    {
        const li = $("<li>" + i + "</li>");
        $paginationLinksOL.append(li)
    }
    
    
    $page.append($paginationLinksOL);
}



// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here



// MAIN 

show(50, 54);




