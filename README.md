# 🌈 Greender – Una app de citas para el colectivo LGBTIQ+

## 📝 Descripción

**Greender** es una alternativa a Grindr, pensada para quienes buscan una experiencia más segura, ética y libre de excesiva publicidad.  
La app pone en el centro a las personas, no al dinero.

Nuestro objetivo es ofrecer un espacio más amable, donde los usuarios puedan conocerse con tranquilidad y sin interrupciones constantes.

## 🔐 Autenticación

La autenticación está implementada con **Clerk**, lo que permite un acceso rápido y seguro.  
Actualmente se puede iniciar sesión con email o cuenta de Google.

## 💬 Funcionalidades actuales

- ✅ Creación de perfiles
- ✅ Chat en tiempo real
- ✅ Visualización en formato _grid_ de los usuarios cercanos
- ✅ Online/Offline

## 🚧 En desarrollo

- 📍 Geolocalización
- 🖼️ Subida de avatares
- 🛠️ Editor avanzado de perfiles
- 🖼️ Albumes
- 👀 "Gazes"

## La estructura del proyecto

- **tests**/
  - integration/
- app/
  - (auth)/
    - sign-in/
    - sign-up/
  - (main)/
    - about/
    - blog/
    - contact/
  - (web)/
    - (verified)/
      - profile/
  - api/
    - chat/
    - env/
    - user/
    - webhooks/
  - assets/
  - generated/
    - prisma/
- components/
  - auth/
  - main/
  - staff/
  - svg/
    - social/
    - staff/
  - ui/
  - web/
    - member/
    - members/
    - settings/
    - user/
- lib/
  - api/
    - member/
    - stream/
    - user/
  - helpers/
    - chat/
    - member/
    - user/
  - hooks/
    - chat/
    - members/
    - settings/
    - user/
  - prisma/
  - stores/
- prisma/
  - migrations/
- public/
  - Facebook Brand Asset Pack/
  - old/
  - test_faces/
  - ui-icons/

## 🔗 URL del proyecto

👉 [https://wwww.greenderchat.com](https://www.greenderchat.com)
