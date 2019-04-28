// Constantes
const btnEnviarUI = document.querySelector('#btnEnviar');
const btnEnviarUI2 = document.querySelector('#btnEnviar2');
const contenidoUI = document.querySelector('#contenido');



// Functions

const Registrar = () =>{
    let emailUI = document.querySelector('#email2').value;
    let contrasenaUI = document.querySelector('#contrasena2').value;

    firebase.auth().createUserWithEmailAndPassword(emailUI, contrasenaUI)
    .then(function(){
        Verificar();
    })
    
    .catch(function(error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ...
      });
}

const Ingresar = () =>{
    let emailUI2 = document.querySelector('#email').value;
    let contrasenaUI2 = document.querySelector('#contrasena').value;

    firebase.auth().signInWithEmailAndPassword(emailUI2, contrasenaUI2)
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        contenidoUI.innerHTML=`
        <div class="alert alert-warning" role="alert">
        ${errorCode} <br> ${errorMessage}
        </div>`       
      });
    }

      const Observador = () =>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              Aparece(user);

              var displayName = user.displayName;
              var email = user.email;
              console.log('*******************************************')
                console.log(user.emailVerified)
              console.log('*******************************************')

              var emailVerified = user.emailVerified;
              var photoURL = user.photoURL;
              var isAnonymous = user.isAnonymous;
              var uid = user.uid;
              var providerData = user.providerData;
              // ...
            } else {
              // User is signed out.
              contenidoUI.innerHTML=`
              <div class="alert alert-warning" role="alert">
              No existe Usuario activo
              </div>
              `
              // ...
            }
          });
      }
      
    Observador();

const Aparece = (usuario) =>{
    let user = usuario;

    if(user.emailVerified){
    contenidoUI.innerHTML=`
    <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">Bienvenido ${user.email}</h4>
      <p></p>
      <hr>
      <button class="btn btn-danger btn-sm" id="btncerrarSesion" onclick="CerrarSesion()">Cerrar Sesion</button>
    </div>
    <p></p>
    `
    }
}

const CerrarSesion = () =>{
    firebase.auth().signOut()
    .then( function(){
        console.log('Saliendo..')
    })
    .catch(function(){
        console.log('error')
    })
}

const Verificar = () =>{
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
    // Email sent.
    console.log('Enviando Correo...')
    }).catch(function(error) {
    // An error happened.
    console.log(error);  
    });

}

// AddEventListener
btnEnviarUI.addEventListener('click', (e)=>{
    e.preventDefault();
    Ingresar();
})
btnEnviarUI2.addEventListener('click', (e)=>{
    e.preventDefault();
    Registrar();
})
