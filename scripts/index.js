// When the window has loaded, execute the following function
window.addEventListener('load', function() {
    var html = document.getElementsByTagName('html')[0];
    var body = document.body;
    var manifestoOriginal = document.getElementById("manifesto-container");
    var terminal = document.getElementById('terminal');
    var btn_hideTerminal = document.getElementById('btn_hideTerminal');
    var code;

    // git
    fetch('https://raw.githubusercontent.com/noelcosta/Manifesto/main/index.html', {
        cache: 'no-cache'
      })
      .then(response => response.text())
      .then(data => {
          code = data;
      });

    // // local
    // fetch('../index.html', {
    //     cache: 'no-cache'
    //   })
    //   .then(response => response.text())
    //   .then(data => {
    //       code = data;
    //   });

    // // create a new XMLHttpRequest object
    // var xhr = new XMLHttpRequest();

    // // specify the details of the GET request
    // xhr.open('GET', 'index.html', true);

    // // set a callback function to be executed when the request's state changes
    // xhr.onreadystatechange = function() {
    //     // check if the request has completed successfully
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         // if successful, assign the response text to a variable named "code"
    //         code = xhr.responseText;
    //     }
    // };

      
    /* --- Normal Mode --- */
    document.getElementById("btn_hideTerminal").addEventListener('click', function(event) {
        html.classList.remove('terminal-mode');
        body.classList.remove('terminal-mode');
        manifestoOriginal.classList.remove('hidden');
        btn_hideTerminal.parentElement.classList.add("hidden");
        terminal.innerHTML = '';
    });

    /* --- Terminal Mode --- */
    document.getElementById("btn_showTerminal").addEventListener('click', function(event) {
        // Hide Original Manifesto
        manifestoOriginal.classList.add('hidden');
        
        // Add Terminal Style
        html.classList.add('terminal-mode');
        body.classList.add('terminal-mode');

        // Split the code into lines
        var lines = code.split('\n');

        // Show Terminal
        terminal.classList.remove('hidden');

        // Display each line of the code with a delay of 0.1 seconds
        var i = 0;
        var intervalId = setInterval(function() {
            if (i < lines.length)
            {
                terminal.innerHTML += '<p>' + lines[i].replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;') + '</p>';
                
                // Scroll to the last line
                document.querySelector('#terminal :last-child').scrollIntoView({ behavior: 'auto' });
        
                i++;
        
                // Generate a new random delay for the next line of code
                var delay = Math.floor(Math.random() * (150 - 5)) + 5;
                
                // Set a new interval with the random delay
                clearInterval(intervalId);
                intervalId = setInterval(arguments.callee, delay);
            }
            else
            {
                // All lines have been displayed
                clearInterval(intervalId);
        
                // Show + Scroll To Button
                btn_hideTerminal.parentElement.classList.remove("hidden");
                btn_hideTerminal.scrollIntoView({ behavior: 'auto' });
            }
        }, 100);
    });

    /* Carousel Code */
    // Get all the letter elements
    var letters = document.getElementsByClassName('letter');

    // Add a click event listener to each letter element
    for (var i = 0; i < letters.length; i++) {
    letters[i].addEventListener('click', function(event) {
        // Remove the active class from all letters
        for (var j = 0; j < letters.length; j++) {
        letters[j].classList.remove('active');
        }

        // Add the active class to the clicked letter
        event.target.classList.add('active');

        var index = parseInt(event.target.getAttribute('data-card-index'));
        var cards = document.getElementsByClassName('card');
        
        // Loop through all card elements and set their display property
        for (var j = 0; j < cards.length; j++) {
        if (j === index) {
            cards[j].style.display = 'block';
        } else {
            cards[j].style.display = 'none';
        }}
    });}
});
