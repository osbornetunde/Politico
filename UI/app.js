
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






   