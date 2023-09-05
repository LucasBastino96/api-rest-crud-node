import passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from './pruebaDBModels.js'

passport.use(new Strategy({
   usernameField: 'nombre',
   passwordField: 'password' 
}, async(nombre, password, done) =>{
    // busca si existe el usuario
    console.log('entro a method local')
    console.log(nombre, password)
    const user = await User.findOne({nombre: nombre})
    // console.log(user)
    if (!user) {
        console.log('usuario no encontrado')
        return done(null, false, {message: 'usuario no encontrado'})
        
    // compara la contraseña
    } else {
        console.log('usuario encontrado')
        const verificacion = await user.compararPassword(password) // me falta encriptar la password creando el user
        if (verificacion) {
            return done (null, user) // no hay error, osea null y guarda el user en la sesion
        } else {
            console.log('contraseña incorrecta')
            return done(null, false, {message: 'Contraseña incorrecta'})
        }
    }
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user) =>{
        done(err, user);
    });
});

