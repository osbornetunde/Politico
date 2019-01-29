
//for side menu dropdown
function handleDropdown1() {
  document.getElementById("dropdown1").classList.toggle("display");
} 

function handleDropdown2() { 
  document.getElementById("dropdown2").classList.toggle("display");
} 

// Close the dropdown menu if the user clicks outside of it

window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('display')) {
        openDropdown.classList.remove('display');
      }
    }
  }
};


function toggleSidebar() {
  document.getElementById("sideMenu").classList.toggle('active');
  document.getElementById("content-area").classList.toggle('active');
}

                      // Function for controlling tab in the vote page

function openOffice(office, tab, color) {
  //hide all elements with class="tabcontent" by default*/
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  
  
  //show the specific tab content
  document.getElementById(office).style.display = 'block';
  
  // Add the specific color to the button used to open the tab content
  tab.style.backgroundColor = color;
  
}

//get the element with id="default" and click on it
document.getElementById("default").click();






   