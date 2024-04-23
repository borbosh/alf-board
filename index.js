// We enclose this in window.onload.
// So we don't have ridiculous errors.
window.onload = function() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCkWbskMV3kst4Z0vnJHpOry-SN2t054p4",
    authDomain: "alfurqan-board.firebaseapp.com",
    projectId: "alfurqan-board",
    storageBucket: "alfurqan-board.appspot.com",
    messagingSenderId: "718920357539",
    appId: "1:718920357539:web:5def6b632371f2fa481116"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // This is very IMPORTANT!! We're going to use "db" a lot.
  var db = firebase.database()

  // We're going to use oBjEcT OrIeNtEd PrOgRaMmInG. Lol
  class MEME_CHAT{
    // Home() is used to create the home page
    home(){
      // First clear the body before adding in
      // a title and the join form
      document.body.innerHTML = ''
      this.create_title()
      this.create_join_form()
    }
    // chat() is used to create the chat page
    chat(){
      this.create_title()
      this.create_chat()
    }
    // create_title() is used to create the title
    create_title(){
      // This is the title creator. 🎉
      var title_container = document.createElement('div')
      title_container.setAttribute('id', 'title_container')
      var title_inner_container = document.createElement('div')
      title_inner_container.setAttribute('id', 'title_inner_container')

      var title = document.createElement('h1')
      title.setAttribute('id', 'title')
      title.textContent = 'Alfurqan Board'

      title_inner_container.append(title)
      title_container.append(title_inner_container)
      document.body.append(title_container)
    }
    // create_join_form() creates the join form
    create_join_form(){
      var parent = this;

      var join_container = document.createElement('div')
      join_container.setAttribute('id', 'join_container')
      var join_inner_container = document.createElement('div')
      join_inner_container.setAttribute('id', 'join_inner_container')

      var join_button_container = document.createElement('div')
      join_button_container.setAttribute('id', 'join_button_container')

      var join_button = document.createElement('button')
      join_button.setAttribute('id', 'join_button')
      join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>'

      var update_log = document.createElement('center')
      update_log.setAttribute('class', 'updateLog')
      update_log.innerHTML = `<h2>i</h2><br><h2>i</h2><br><h2>i</h2><br><h3>Private messaging coming soon....</h3>`; //🎉   🥳

      var join_input_container = document.createElement('div')
      join_input_container.setAttribute('id', 'join_input_container')

      var join_input = document.createElement('input')
      join_input.setAttribute('id', 'join_input')
      join_input.setAttribute('maxlength', 12)
      join_input.placeholder = 'Enter Your Name!'
      // Every time we type into the join_input
      join_input.onkeyup  = function(){
        // If the input we have is longer that 0 letters
        if (join_input.value.toLowerCase().includes("shab") || join_input.value.toLowerCase().includes("perv") || join_input.value.toLowerCase().includes("hafsa") || join_input.value.toLowerCase().includes("fuck") || join_input.value.toLowerCase().includes("shit") || join_input.value.toLowerCase().includes("bitch")|| join_input.value.toLowerCase().includes("sarosh") || join_input.value.toLowerCase().includes("ms") || join_input.value.toLowerCase().includes("ass") || join_input.value.toLowerCase().includes("nigg") || join_input.value.toLowerCase().includes("cock") || join_input.value.toLowerCase().includes("dick") || join_input.value.toLowerCase().includes("ball")) {
            join_button.classList.remove('enabled')
        } else {
            if(join_input.value.trim().length > 3){
                // Make the button light up
                join_button.classList.add('enabled')
                // Allow the user to click the button
                join_button.onclick = function(){
                  // Save the name to local storage. Passing in
                  // the join_input.value
                  parent.save_name(join_input.value)
                  // Remove the join_container. So the site doesn't look weird.
                  join_container.remove()
                  // parent = this. But it is not the join_button
                  // It is (MEME_CHAT = this).
                  parent.create_chat()
                }
              }else{
                // If the join_input is empty then turn off the
                // join button
                join_button.classList.remove('enabled')
              }
        }
      }

      // Append everything to the body
      join_button_container.append(join_button)
      join_input_container.append(join_input)
      join_inner_container.append(join_input_container, join_button_container)
      join_container.append(join_inner_container)
      document.body.append(join_container)
      join_inner_container.append(update_log)
    }
    // create_load() creates a loading circle that is used in the chat container
    create_load(container_id){
      // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.
      var parent = this;

      // This is a loading function. Something cool to have.
      var container = document.getElementById(container_id)
      container.innerHTML = ''

      var loader_container = document.createElement('div')
      loader_container.setAttribute('class', 'loader_container')

      var loader = document.createElement('div')
      loader.setAttribute('class', 'loader')

      loader_container.append(loader)
      container.append(loader_container)

    }
    // create_chat() creates the chat container and stuff
    create_chat(){
      // Again! You need to have (parent = this)
      var parent = this;
      // GET THAT MEMECHAT HEADER OUTTA HERE
      var title_container = document.getElementById('title_container')
      var title = document.getElementById('title')
      title_container.classList.add('chat_title_container')
      // Make the title smaller by making it 'chat_title'
      title.classList.add('chat_title')

      var chat_container = document.createElement('div')
      chat_container.setAttribute('id', 'chat_container')

      var chat_inner_container = document.createElement('div')
      chat_inner_container.setAttribute('id', 'chat_inner_container')

      var chat_content_container = document.createElement('div')
      chat_content_container.setAttribute('id', 'chat_content_container')

      var chat_input_container = document.createElement('div')
      chat_input_container.setAttribute('id', 'chat_input_container')

      var chat_input_send = document.createElement('button')
      chat_input_send.setAttribute('id', 'chat_input_send')
      chat_input_send.setAttribute('disabled', true)
      chat_input_send.innerHTML = `<button class="buttonman"></button>` //button image

      var chat_input = document.createElement('input')
      chat_input.setAttribute('id', 'chat_input')
      // Only a max message length of 1000
      chat_input.setAttribute('maxlength', 1000)
      // Get the name of the user
      chat_input.placeholder = `Hey ${parent.get_name()} Say Something...`
      
      var isCooldown = false;
      let istosend = false;

      chat_input.onkeyup = function(event) {
          if (event.keyCode === 13 && !isCooldown && chat_input.value.toLowerCase().includes("shit") === false && chat_input.value.toLowerCase().includes("fuck") === false && chat_input.value.toLowerCase().includes("bitch") === false && chat_input.value.toLowerCase().includes("sex") === false && chat_input.value.toLowerCase().includes("nigg") === false && chat_input.value.toLowerCase().includes("dick") === false && chat_input.value.toLowerCase().includes("cock") === false && chat_input.value.toLowerCase().includes("ball") === false && chat_input.value.toLowerCase().includes("rizz") === false && chat_input.value.toLowerCase().includes("stank") === false) {
              event.preventDefault(); // Prevents the default behavior of the Enter key
              if (localStorage.getItem('admin') && chat_input.value.substring(3,4) === ":") {
                //del:(number/index of the message)
                if (chat_input.value.substring(0,4) === "del:") {
                var ref = db.ref('chats/message_' + chat_input.value.slice(4) + '/index');
                ref.update({
                    index: 0
                })
                }

                //deleted all chats
                if (chat_input.value.substring(0,4) === "ref:") {
                var ref = db.ref('chats/');
                ref.remove()
                }

                //unbans everyone
                if (chat_input.value.substring(0,4) === "uba:") {
                var ref = db.ref('ban/');
                ref.remove()
                }

                //edits a mesagae
                if (chat_input.value.substring(0,4) === "edi:") {
                  let numberIndex = 4;
                  function checkIfInt() {
                    if (!isNaN(chat_input.value.substring(numberIndex, numberIndex + 1))) {
                      numberIndex = numberIndex + 1;  
                      checkIfInt();
                    } else {
                      numberIndex = numberIndex - 1;
                      var ref = db.ref('chats/message_' + chat_input.value.substring(4,numberIndex+1));
                      ref.update({
                        message: chat_input.value.slice(numberIndex+1)
                      })
                    }
                  }
                  checkIfInt();
                }

                //diabled chat (ref: to enable)
                if (chat_input.value.substring(0,4) === "dis:") {
                var ref = db.ref('chats/message_1');
                ref.remove()
                }

                //
                if (chat_input.value.substring(0,4) === "dis:") {
                  var ref = db.ref('chats/message_1');
                  ref.remove()
                }

                //makes a link
                if (chat_input.value.substring(0,4) === "lin:") {
                  let messageTable = chat_input.value.split(";");
                  let atagtitle = messageTable[0].substring(4, messageTable[0].length);
                  let ataghref = messageTable[1]
                  
                  parent.create_load('chat_content_container');
                  parent.send_message(`<a href="${ataghref}" target="_blank ">${atagtitle}</a>`);
                  chat_input.value = '';
                  chat_input.focus();
                }

                //bans someone
                if (chat_input.value.substring(0,4) === "ban:") {
                  let numberIndex = 4;
                  function checkIfInt() {
                    if (!isNaN(chat_input.value.substring(numberIndex, numberIndex + 1))) {
                      numberIndex = numberIndex + 1;  
                      checkIfInt();
                    } else {
                      numberIndex = numberIndex - 1;
                      var ref = db.ref('ban/');
                      var banref = db.ref('ban/banned'+chat_input.value.substring(4, numberIndex+1));
                      banref.set({
                        name: chat_input.value.slice(numberIndex+1)
                      })
                    }
                  }
                  checkIfInt();
                }
                
                chat_input.value = '';
                chat_input.focus();
              } else {
                var nodeRef = db.ref("ban/");
                nodeRef.update({status:"Working"});

                nodeRef.once("value").then(function(snapshot) {
                    var numChildren = snapshot.numChildren();
                    var isAllowedToSend = true; // Flag to check if message sending is allowed
                    istosend = true;
                    snapshot.forEach(function(childSnapshot) {
                      var childData = childSnapshot.val();
                      if (childData && childData.name) {
                          if (localStorage.getItem('name').toLowerCase() === (childData.name).toLowerCase()) {
                            isAllowedToSend = false;
                            istosend = false;

                            if (localStorage.getItem("admin")) {
                              isAllowedToSend = true;
                              istosend = true;
                            }
                          }
                      }
                    });

                    if (isAllowedToSend && chat_input.value.trim().length > 0) {
                        // Enable the loading circle in the 'chat_content_container'
                        parent.create_load('chat_content_container');
                        // Send the message. Pass in the chat_input.value
                        parent.send_message(chat_input.value.trim());
                        // Clear the chat input box
                        chat_input.value = '';
                        // Focus on the input just after
                        chat_input.focus();

                        // Set cooldown
                        isCooldown = true;
                        setTimeout(function() {
                            isCooldown = false;
                        }, 700); // 1 second cooldown
                    } else {
                      if (isAllowedToSend === false && chat_input.value.trim().length > 0) {
                        alert("You Cant Type When Your Banned!");
                      }
                    }
                });
              }
          }
      };

      var chat_logout_container = document.createElement('div')
      chat_logout_container.setAttribute('id', 'chat_logout_container')

      var chat_logout = document.createElement('button')
      chat_logout.setAttribute('id', 'chat_logout')
      chat_logout.textContent = `${parent.get_name()} • logout`
      // "Logout" is really just deleting the name from the localStorage
      chat_logout.onclick = function(){
        if (istosend === true) {
          localStorage.clear()
          // Go back to home page
          parent.home()
        } else {
          alert("An error has occurred! Try typing in chat to fix this.\nError : 2a1b14c"+(Math.random() * 2).toFixed(4));
        }
      }

      chat_logout_container.append(chat_logout)
      chat_input_container.append(chat_input, chat_input_send)
      chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container)
      chat_container.append(chat_inner_container)
      document.body.append(chat_container)
      // After creating the chat. We immediatly create a loading circle in the 'chat_content_container'
      parent.create_load('chat_content_container')
      // then we "refresh" and get the chat data from Firebase
      parent.refresh_chat()
    }
    // Save name. It literally saves the name to localStorage
    save_name(name){
      // Save name to localStorage
      localStorage.setItem('name', name)
    }
    // Sends message/saves the message to firebase database
    send_message(message){
      var parent = this
      if(parent.get_name() == null && message == null){
        return
      }

      // Get the firebase database value
      db.ref('chats/').once('value', function(message_object) {
        // This index is mortant. It will help organize the chat in order
        var index = parseFloat(message_object.numChildren()) + 1
        db.ref('chats/' + `message_${index}`).set({
          name: parent.get_name(),
          message: message,
          index: index
        })
        .then(function(){
          // After we send the chat refresh to get the new messages
          parent.refresh_chat()
        })
      })
    }
    // Get name. Gets the username from localStorage
    get_name(){
      // Get the name from localstorage
      if(localStorage.getItem('name') != null){
        return localStorage.getItem('name')
      }else{
        this.home()
        return null
      }
    }
    // Refresh chat gets the message/chat data from firebase
    refresh_chat(){
      var chat_content_container = document.getElementById('chat_content_container')

      // Get the chats from firebase
      db.ref('chats/').on('value', function(messages_object) {
        // When we get the data clear chat_content_container
        chat_content_container.innerHTML = ''
        // if there are no messages in the chat. Retrun . Don't load anything
        if(messages_object.numChildren() == 0){
          return
        }

        // OK! SO IF YOU'RE A ROOKIE CODER. THIS IS GOING TO BE
        // SUPER EASY-ISH! I THINK. MAYBE NOT. WE'LL SEE!

        // convert the message object values to an array.
        var messages = Object.values(messages_object.val());
        var guide = [] // this will be our guide to organizing the messages
        var unordered = [] // unordered messages
        var ordered = [] // we're going to order these messages

        for (var i, i = 0; i < messages.length; i++) {
          // The guide is simply an array from 0 to the messages.length
          guide.push(i+1)
          // unordered is the [message, index_of_the_message]
          unordered.push([messages[i], messages[i].index]);
        }

        // Now this is straight up from stack overflow 🤣
        // Sort the unordered messages by the guide
        guide.forEach(function(key) {
          var found = false
          unordered = unordered.filter(function(item) {
            if(!found && item[1] == key) {
              // Now push the ordered messages to ordered array
              ordered.push(item[0])
              found = true
              return false
            }else{
              return true
            }
          })
        })

        // Now we're done. Simply display the ordered messages
        ordered.forEach(function(data) {
          var name = data.name
          if (localStorage.getItem('admin')) {name = data.index + "_" + data.name};
          var message = data.message

          var message_container = document.createElement('div')
          message_container.setAttribute('class', 'message_container')

          var message_inner_container = document.createElement('div')
          message_inner_container.setAttribute('class', 'message_inner_container')

          var message_user_container = document.createElement('div')
          message_user_container.setAttribute('class', 'message_user_container')

          var message_user = document.createElement('p')
          message_user.setAttribute('class', 'message_user')
          message_user.textContent = `${name}`

          var message_content_container = document.createElement('div')
          message_content_container.setAttribute('class', 'message_content_container')

          var message_content = document.createElement('p')
          message_content.setAttribute('class', 'message_content')
          if (message.startsWith('https://')) {
             fetch(message)
                .then(response => {
                  if (response.ok && response.headers.get('content-type').startsWith('image/')) {
                    // If it's an image URL
                    message_content.innerHTML = `<img src="${message}" alt="Image">`;
                  } else {
                    // If it's a regular URL
                    message_content.innerHTML = `<a href="${message}" target="_blank">${message}</a>`;
                  }
                })
                .catch(error => {
                    // If there's an error fetching the URL
                    console.error('Error fetching URL:', error);
                    // Display the message as a link
                    message_content.innerHTML = `<a href="${message}" target="_blank">${message}</a>`;
                });
          } else {
            message_content.innerHTML = message;
          }

          message_user_container.append(message_user)
          message_content_container.append(message_content)
          message_inner_container.append(message_user_container, message_content_container)
          message_container.append(message_inner_container)

          chat_content_container.append(message_container)
        });
        // Go to the recent message at the bottom of the container
        chat_content_container.scrollTop = chat_content_container.scrollHeight;
    })

    }
  }
  // So we've "built" our app. Let's make it work!!
  var app = new MEME_CHAT()
  // If we have a name stored in localStorage.
  // Then use that name. Otherwise , if not.
  // Go to home.
  if(app.get_name() != null){
    app.chat()
  }
}