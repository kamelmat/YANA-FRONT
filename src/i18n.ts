import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  lng: navigator.language || "es",
  fallbackLng: "es",
  debug: true,
  resources: {
    en: {
      translation: {
        login: {
          access: "Access",
          email: "Email",
          password: "Password",
          remember: "Remember me",
          forgot: "Forgot my password",
          login: "Log in",
          loginGoogle: "Log in with Google",
          dontHaveAccount: "Don't have an account?",
          register: "Register",
          failed: "No active account found with the given credentials.",
        },
        register: {
          method: {
            title: "Create an account",
            subtitle: "Your information is confidential. We will not share it with anyone.",
            useEmail: "Register with email",
            useGoogle: "Use Google to register",
            privacyText: "By creating an account, you agree to our",
            privacyLink: "Terms of service and privacy policy",
            haveAccount: "Already have an account?",
            login: "Log in",
          },
          email: {
            title: "Create a profile with your email",
            subtitle:
              "Complete the data and receive a verification code by email to validate your account.",
            nameField: {
              label: "Name",
              placeholder: "Enter your name",
              error: {
                required: "Name is required.",
                tooShort: "Name must be at least 2 characters long.",
              },
            },
            lastNameField: {
              label: "Last name",
              placeholder: "Enter your last name",
              error: {
                required: "Last name is required.",
                tooShort: "Last name must be at least 2 characters long.",
              },
            },
            emailField: {
              label: "Email",
              placeholder: "Complete your email",
              error: {
                required: "The email is required.",
                invalid: "Please enter a valid email address.",
                taken: "This email is already registered.",
              },
            },
          },
          password: {
            title: "Create a secure password",
            subtitle: "Please create a secure password for your account.",
            passwordField: {
              label: "Password",
              placeholder: "Create a password (minimum 8 characters)",
              error: {
                required: "Please enter the password.",
                invalid: "The password is missing the following requirements: {{requirements}}",
              },
            },
            requirements: {
              length: "minimum 8 characters",
              number: "at least one number",
              special: "at least one special character",
              uppercase: "at least one uppercase letter",
              lowercase: "at least one lowercase letter",
            },
            passwordStrength: {
              text: "Password strength",
              weak: "Weak",
              medium: "Medium",
              strong: "Strong",
            },
            repeatPasswordField: {
              label: "Repeat password",
              placeholder: "Repeat your password",
              error: {
                required: "Please repeat the password.",
                mismatch: "The passwords do not match.",
              },
            },
          },
          done: {
            title: "Done",
            subtitle: "Thank you for being part of the You are not alone community!",
          },
          continue: "Continue",
        },
        "/resources": {
          menu: "Resources",
          title: "Organizations",
        },
        "/profile": {
          menu: "Profile",
          title: "My Profile",
          account: "Edit Profile",
          interactions: "My interactions",
          configuration: "Configuration",
          help: "Emergency: I need help",
          logout: "Log out",
          avatar: "Choose avatar",
          notifications: "Notifications",
          personification: "Customize background",
          mode: "Mode",
          light: "Light",
          dark: "Dark",
          appSounds: "App sounds",
          fontsize: "Font size",
          small: "Small",
          large: "Large",
          saveHistory: "Save interaction history",
          hideStatus: "Hide my status or activity",
          mute: "Mute interactions",
          deleteAccount: "Delete account",
        },
        "/contacts": {
          menu: "Contacts",
          title: "Contacts",
        },
        "/FAQ": {
          menu: "FAQ",
          title: "FAQ",
        },
        "/settings": {
          menu: "Settings",
          title: "Settings",
        },
        "/logout": {
          menu: "Exit",
          title: "Exit",
        },
        footer: {
          products: "Products",
          support: "Support",
          medicalAssistance: "Medical Assistance",
          resources: "Resources",
          legal: "Legal",
          terms: "Terms",
          conditions: "Conditions",
          privacy: "Privacy",
          contact: "Contact",
          copyright: "©2025 You are not alone - All rights reserved",
          address:
            "YANA S. de R.L. de C.V. Renato Peña 490 Sur, Centro. Monterrey, Nuevo León, México. C.P. 6400",
        },
        header: {
          welcome: "Hello, {{name}}",
        },
        common: {
          cancel: "Cancel",
          confirm: "Confirm",
          delete: "Delete",
          deleteAccount: "Delete Account",
          deleteAccountMessage: "Are you sure you want to delete your account?",
          start: "Start",
        },
        onboarding: {
          step1: {
            title: "Start your journey",
            subtitle: "Discover everything you can do on this platform.",
          },
          step2: {
            title: "Share your emotions in a safe space",
            subtitle: "Choose an emotion every day, express it and connect with other people.",
          },
          step3: {
            title: "Participate in a shared emotions map",
            subtitle:
              "Discover how other people feel in an interactive interface. Send and receive support through predefined messages. Explore links with empathy.",
          },
          step4: {
            title: "Get help whenever you need it",
            subtitle:
              "Access contacts and resources to feel better. Remember that you are part of a community that supports you.",
          },
          deleteAccountMessage: "Do you confirm that you want to delete your account?",
          passwordPlaceholder: "Enter your password",
        },
      },
    },
    es: {
      translation: {
        // login
        login: {
          access: "Acceder",
          email: "Email",
          password: "Contraseña",
          remember: "Recorderme",
          forgot: "Olvidé la contraseña",
          login: "Ingresar",
          loginGoogle: "Iniciar sesión con Google",
          dontHaveAccount: "¿No tienes una cuenta?",
          register: "Regístrate",
          failed: "No se encontró una cuenta activa con las credenciales proporcionadas.",
        },

        // register stages
        register: {
          method: {
            title: "Crear una cuenta",
            subtitle: "Tu información es confidencial. No vamos a compartir tus datos.",
            useEmail: "Registrarse con correo electrónico",
            useGoogle: "Crear una cuenta con Google",
            privacyText: "Al crear una cuenta, aceptas los",
            privacyLink: "Términos de uso y políticas de privacidad.",
            haveAccount: "¿Tienes una cuenta?",
            login: "Ingresar",
          },
          email: {
            title: "Crea un perfil con tu email",
            subtitle:
              "Completa los datos y recibe un código por correo electrónico para validar tu cuenta.",
            nameField: {
              label: "Nombre",
              placeholder: "Ingresa tu nombre",
              error: {
                required: "El nombre es requerido.",
                tooShort: "El nombre debe tener al menos 2 caracteres.",
              },
            },
            lastNameField: {
              label: "Apellido(s)",
              placeholder: "Ingresa tu apellido(s)",
              error: {
                required: "El apellido es requerido.",
                tooShort: "El apellido debe tener al menos 2 caracteres.",
              },
            },
            emailField: {
              label: "Correo electrónico",
              placeholder: "Completa tu email",
              error: {
                required: "El correo es requerido.",
                invalid: "Por favor, introduce un correo electrónico válido.",
                taken: "Este correo electrónico ya está registrado.",
              },
            },
          },
          password: {
            title: "Crear contraseña",
            subtitle: "Por favor, crea una contraseña segura para tu cuenta.",
            passwordField: {
              label: "Contraseña",
              placeholder: "Crea tu contraseña (mínimo 8 caracteres, número y carácter especial)",
              error: {
                required: "Por favor, introduce la contraseña.",
                invalid: "La contraseña no cumple con los siguientes requisitos: {{requirements}}",
              },
            },
            requirements: {
              length: "mínimo 8 caracteres",
              number: "al menos un número",
              special: "al menos un carácter especial",
              uppercase: "al menos una letra mayúscula",
              lowercase: "al menos una letra minúscula",
            },
            passwordStrength: {
              text: "Seguridad de la contraseña",
              weak: "Débil",
              medium: "Media",
              strong: "Fuerte",
            },
            repeatPasswordField: {
              label: "Repetir contraseña",
              placeholder: "Repite tu contraseña",
              error: {
                required: "Por favor, repite la contraseña.",
                mismatch: "Las contraseñas no coinciden.",
              },
            },
          },
          done: {
            title: "¡Listo!",
            subtitle: "¡Gracias por ser parte de la comunidad You are not alone!",
          },
          continue: "Continuar",
        },
        "/": {
          menu: "Home",
        },
        "/resources": {
          menu: "Recursos",
          title: "Organizaciones",
        },
        "/profile": {
          menu: "Perfil",
          title: "Mi Perfil",
          account: "Editar Perfil",
          interactions: "Mis interacciones",
          configuration: "Configuración",
          help: "Emergencia: necesito ayuda",
          logout: "Cerrar sesión",
          notifications: "Notificaciones",
          avatar: "Elegir avatar",
          personification: "Personalizar fondo",
          mode: "Modo",
          light: "Claro",
          dark: "Oscuro",
          appSounds: "Sonidos de la app",
          fontsize: "Tamaño de fuente",
          small: "Pequeño",
          large: "Grande",
          saveHistory: "Guardar historia de interacciones",
          hideStatus: "Ocultar mi estado o actividad",
          mute: "Silenciar interacciones",
          deleteAccount: "Eliminar cuenta",
        },
        "/contacts": {
          menu: "Contactos",
          title: "Contactos",
        },
        "/FAQ": {
          menu: "FAQ",
          title: "FAQ",
        },
        "/settings": {
          menu: "Configuración",
          title: "Configuración",
        },
        "/logout": {
          menu: "Cerrar sesión",
          title: "Cerrar sesión",
        },
        footer: {
          products: "Productos",
          support: "Soporte",
          medicalAssistance: "Asistencia médica",
          resources: "Recursos",
          legal: "Legal",
          terms: "Términos",
          conditions: "Condiciones",
          privacy: "Privacidad",
          contact: "Contacto",
          copyright: "©2025 You are not alone - Todos los derechos reservados",
          address:
            "YANA S. de R.L. de C.V. Renato Peña 490 Sur, Centro. Monterrey, Nuevo León, México. C.P. 6400",
        },
        header: {
          welcome: "Hola, {{name}}",
        },
        common: {
          cancel: "Cancelar",
          confirm: "Confirmar",
          delete: "Eliminar",
          deleteAccount: "Eliminar cuenta",
          deleteAccountMessage: "¿Estás seguro de querer eliminar tu cuenta?",
          start: "Comenzar",
        },
        onboarding: {
          step1: {
            title: "Comienza tu recorrido",
            subtitle: "Descubre todo lo que puedes hacer en esta plataforma.",
          },
          step2: {
            title: "Comparte tus emociones en un espacio seguro",
            subtitle: "Elige un estado de ánimo cada día, exprésalo y conecta con otras personas.",
          },
          step3: {
            title: "Participa en un mapa de emociones compartidas",
            subtitle:
              "Conoce cómo se sienten otras personas en una interfaz interactiva. Envía y recibe apoyo a través de mensajes predeterminados. Explora vínculos con empatía.",
          },
          step4: {
            title: "Obtén ayuda cada vez que la necesites",
            subtitle:
              "Accede a contactos y recursos para sentirte mejor. Recuerda que eres parte de una comunidad que te acompaña.",
          },
          deleteAccountMessage: "¿Confirmas que quieres eliminar tu cuenta?",
          passwordPlaceholder: "Ingresa tu contraseña",
        },
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
