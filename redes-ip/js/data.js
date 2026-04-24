/* =========================================================
   DATA.JS — Contenido conceptual del mapa
   Referencias de diapositivas apuntan al material original
   del curso "Configuración de Redes" (PPT 1 y PPT 2).
   ========================================================= */

const CATEGORIAS = {
    identificacion: { nombre: "Identificación", color: "#3b82f6", descripcion: "Cómo se nombran los equipos en la red" },
    organizacion:   { nombre: "Organización",   color: "#10b981", descripcion: "Cómo se estructura y divide la red" },
    funcionamiento: { nombre: "Funcionamiento", color: "#a855f7", descripcion: "Cómo operan las direcciones dentro de la red" },
    operacion:      { nombre: "Operación",      color: "#f97316", descripcion: "Servicios y asignación práctica en producción" }
};

/* Posiciones en coordenadas lógicas (se centran en el viewport). */
const NODES = [
    /* ------------ RAÍZ ------------ */
    {
        id: "root", tipo: "root", titulo: "¿Cómo funciona una red?",
        subtitulo: "Punto de partida",
        categoria: null,
        x: 0, y: 0,
        definicion: "Una red de computadoras es un conjunto de equipos conectados que pueden **intercambiar información** siguiendo reglas comunes llamadas *protocolos*. Para que dos equipos se comuniquen, cada uno debe tener una **identificación única** (dirección IP), pertenecer a una **red organizada** y usar servicios que permitan su **operación** diaria.",
        simple: "Imagina la red como una ciudad: cada casa necesita una dirección única (IP), las calles se organizan en barrios (subredes) y el correo (DNS, DHCP) se encarga de que los mensajes lleguen.",
        ejemplo: "PC del laboratorio → <span class='hl'>192.168.1.25</span>\nImpresora          → <span class='hl'>192.168.1.50</span>\nRouter (gateway)   → <span class='hl'>192.168.1.1</span>\n<span class='cm'># Todos comparten la red 192.168.1.0/24</span>",
        relaciones: ["direccion-ip", "clases-red", "direccion-red", "ip-privada"],
        diapositiva: "PPT 1 — Diapositivas 1-2",
        archivo: "Redes_Parte1.pptx"
    },

    /* ============ IDENTIFICACIÓN ============ */
    {
        id: "identificacion", tipo: "hub", titulo: "Identificación",
        subtitulo: "Cómo se nombran los equipos",
        categoria: "identificacion",
        x: -650, y: -350,
        definicion: "Rama que agrupa los conceptos necesarios para **identificar de manera única** cada dispositivo dentro de una red: la dirección IP, su versión IPv4, cómo se divide en octetos y cómo se representa en binario.",
        simple: "Esta rama responde a la pregunta: ¿cómo sé quién es quién dentro de la red?",
        ejemplo: "Cada PC necesita un nombre numérico único:\n  PC-01 → <span class='hl'>192.168.1.10</span>\n  PC-02 → <span class='hl'>192.168.1.11</span>\n  PC-03 → <span class='hl'>192.168.1.12</span>",
        relaciones: ["direccion-ip", "ipv4", "octetos", "binario", "conversion"],
        diapositiva: "PPT 1 — Diapositivas 3-4",
        archivo: "Redes_Parte1.pptx"
    },
    {
        id: "direccion-ip", tipo: "leaf", titulo: "Dirección IP",
        subtitulo: "Identificador único",
        categoria: "identificacion",
        x: -950, y: -550,
        definicion: "Una **dirección IP** (*Internet Protocol Address*) es un número que identifica de forma única a un dispositivo dentro de una red. Funciona como el RUT del equipo: nadie más en la misma red puede tener la misma dirección.",
        simple: "Es la 'matrícula' que lleva cada computador para que los demás puedan encontrarlo en la red.",
        ejemplo: "Computador del profesor: <span class='hl'>192.168.10.1</span>\nComputador de alumno:    <span class='hl'>192.168.10.25</span>\n<span class='cm'># Dos direcciones distintas = dos equipos distintos</span>",
        relaciones: ["ipv4", "octetos", "ip-privada", "ip-publica", "identificacion"],
        diapositiva: "PPT 1 — Diapositiva 3",
        archivo: "Redes_Parte1.pptx"
    },
    {
        id: "ipv4", tipo: "leaf", titulo: "IPv4",
        subtitulo: "Versión 4 del protocolo",
        categoria: "identificacion",
        x: -1050, y: -350,
        definicion: "**IPv4** es la versión más utilizada del protocolo IP. Usa direcciones de **32 bits** divididas en 4 grupos de 8 bits (octetos), lo que permite aproximadamente **4.294 millones** de direcciones únicas.",
        simple: "Es el formato estándar de direcciones que verás en casi todas las redes: cuatro números separados por puntos.",
        ejemplo: "Formato IPv4:\n  <span class='hl'>192.168.1.1</span>\n  <span class='hl'>10.0.0.254</span>\n  <span class='hl'>172.16.5.100</span>\n<span class='cm'># 4 números · 0 a 255 cada uno · separados por puntos</span>",
        relaciones: ["direccion-ip", "octetos", "binario"],
        diapositiva: "PPT 1 — Diapositiva 4",
        archivo: "Redes_Parte1.pptx"
    },
    {
        id: "octetos", tipo: "leaf", titulo: "Octetos",
        subtitulo: "4 bloques de 8 bits",
        categoria: "identificacion",
        x: -900, y: -150,
        definicion: "Cada dirección IPv4 se divide en **4 octetos**. Un *octeto* es un grupo de **8 bits**, por eso cada número decimal va de **0 a 255** (2⁸ = 256 combinaciones posibles).",
        simple: "Los 4 números separados por puntos de una IP se llaman octetos. Cada uno tiene 8 bits por dentro.",
        ejemplo: "<span class='hl'>192</span> . <span class='hl'>168</span> . <span class='hl'>1</span> . <span class='hl'>25</span>\n 1°     2°    3°   4°   ← octetos\n\nEn binario cada octeto tiene 8 bits:\n  192 = <span class='num'>11000000</span>\n  168 = <span class='num'>10101000</span>\n    1 = <span class='num'>00000001</span>\n   25 = <span class='num'>00011001</span>",
        relaciones: ["ipv4", "binario", "conversion"],
        diapositiva: "PPT 1 — Diapositivas 4-5",
        archivo: "Redes_Parte1.pptx"
    },
    {
        id: "binario", tipo: "leaf", titulo: "Sistema binario",
        subtitulo: "Base 2 · solo 0 y 1",
        categoria: "identificacion",
        x: -1050, y: 50,
        definicion: "El **sistema binario** usa solo dos dígitos (0 y 1). Los computadores trabajan internamente en binario: cada posición representa una potencia de 2. Toda dirección IP es, por debajo, una cadena de **32 bits**.",
        simple: "Los computadores no entienden '192', entienden ceros y unos. Por eso toda IP se traduce a binario por dentro.",
        ejemplo: "Potencias de 2 en un octeto:\n<span class='num'>128  64  32  16   8   4   2   1</span>\n  1    1   0   0   0   0   0   0   = 192\n\n<span class='cm'># Suma: 128 + 64 = 192 ✓</span>",
        relaciones: ["octetos", "conversion", "ipv4"],
        diapositiva: "PPT 1 — Diapositivas 5-6",
        archivo: "Redes_Parte1.pptx"
    },
    {
        id: "conversion", tipo: "leaf", titulo: "Conversión decimal ↔ binaria",
        subtitulo: "Traducir entre bases",
        categoria: "identificacion",
        x: -800, y: 150,
        definicion: "Convertir un número **decimal** a **binario** consiste en restar la potencia de 2 más alta que quepa e ir escribiendo 1 o 0. Para pasar de binario a decimal, se suman las potencias donde hay un 1.",
        simple: "Es el 'traductor' entre cómo escribimos las IPs (decimal) y cómo las entiende el computador (binario).",
        ejemplo: "Convertir 200 a binario:\n  200 ≥ 128 → <span class='num'>1</span>   (queda 72)\n   72 ≥ 64  → <span class='num'>1</span>   (queda 8)\n    8 ≥ 8   → <span class='num'>1</span>   (queda 0)\n  resto 0   → <span class='num'>11001000</span>\n\n<span class='cm'># 128 + 64 + 8 = 200 ✓</span>",
        relaciones: ["binario", "octetos"],
        diapositiva: "PPT 1 — Diapositivas 6-7",
        archivo: "Redes_Parte1.pptx"
    },

    /* ============ ORGANIZACIÓN ============ */
    {
        id: "organizacion", tipo: "hub", titulo: "Organización",
        subtitulo: "Cómo se estructura la red",
        categoria: "organizacion",
        x: 650, y: -350,
        definicion: "Rama que agrupa los mecanismos para **estructurar y dividir** una red: las clases históricas (A, B, C), la máscara de subred que separa red de host, y el prefijo de red que indica cuántos bits corresponden a la red.",
        simple: "Esta rama responde: ¿cómo decido qué parte de una IP es la 'calle' y qué parte es el 'número de casa'?",
        ejemplo: "IP:       <span class='hl'>192.168.1.25</span>\nMáscara:  <span class='hl'>255.255.255.0</span>\n\nRed  (calle):  192.168.1\nHost (casa):   .25",
        relaciones: ["clases-red", "mascara", "prefijo"],
        diapositiva: "PPT 1 — Diapositivas 8-10",
        archivo: "Redes_Parte1.pptx"
    },
    {
        id: "clases-red", tipo: "leaf", titulo: "Clases de red",
        subtitulo: "A, B, C (D, E)",
        categoria: "organizacion",
        x: 1000, y: -520,
        definicion: "Las **clases de red** fueron la primera forma de organizar el espacio IPv4. Se definen por el valor del **primer octeto**:\n\n• **Clase A**: 1 – 126 · redes muy grandes\n• **Clase B**: 128 – 191 · redes medianas\n• **Clase C**: 192 – 223 · redes pequeñas (la más común en LANs)",
        simple: "Según con qué número parta la IP, corresponde a un 'tamaño' distinto de red. La mayoría de redes escolares son Clase C.",
        ejemplo: "<span class='hl'>10.0.0.1</span>      → Clase A (grande)\n<span class='hl'>172.16.5.4</span>    → Clase B (mediana)\n<span class='hl'>192.168.1.10</span>  → Clase C (pequeña) ← la típica",
        relaciones: ["direccion-ip", "mascara", "ip-privada"],
        diapositiva: "PPT 1 — Diapositiva 8",
        archivo: "Redes_Parte1.pptx"
    },
    {
        id: "mascara", tipo: "leaf", titulo: "Máscara de subred",
        subtitulo: "Separa red de host",
        categoria: "organizacion",
        x: 1080, y: -330,
        definicion: "La **máscara de subred** es un número con el mismo formato que una IP. Sus bits en **1** marcan la parte de **red** y sus bits en **0** marcan la parte de **host**. Así el computador sabe qué equipos están en su misma red.",
        simple: "Es como un molde que se pone encima de la IP para separar 'a qué red pertenece' de 'qué número de equipo es dentro de la red'.",
        ejemplo: "IP:       <span class='hl'>192.168.1.25</span>\nMáscara:  <span class='hl'>255.255.255.0</span>\n\n<span class='num'>11111111.11111111.11111111</span>.<span class='cm'>00000000</span>\n         RED (24 bits)        HOST (8 bits)\n\nRed  → 192.168.1.0\nHost → .25",
        relaciones: ["prefijo", "direccion-red", "direccion-host", "clases-red"],
        diapositiva: "PPT 1 — Diapositivas 9-10",
        archivo: "Redes_Parte1.pptx"
    },
    {
        id: "prefijo", tipo: "leaf", titulo: "Prefijo de red (/n)",
        subtitulo: "Notación CIDR",
        categoria: "organizacion",
        x: 980, y: -150,
        definicion: "El **prefijo de red** o notación **CIDR** indica con una barra (**/**) cuántos bits de la IP son para la red. Equivale a escribir la máscara pero más corto y claro.",
        simple: "Es una forma abreviada de escribir la máscara. /24 significa 'los primeros 24 bits son la red'.",
        ejemplo: "<span class='hl'>192.168.1.0/24</span>   ≡  máscara 255.255.255.0\n<span class='hl'>10.0.0.0/8</span>       ≡  máscara 255.0.0.0\n<span class='hl'>172.16.0.0/16</span>    ≡  máscara 255.255.0.0",
        relaciones: ["mascara", "direccion-red"],
        diapositiva: "PPT 1 — Diapositiva 10",
        archivo: "Redes_Parte1.pptx"
    },

    /* ============ FUNCIONAMIENTO ============ */
    {
        id: "funcionamiento", tipo: "hub", titulo: "Funcionamiento",
        subtitulo: "Cómo operan las direcciones",
        categoria: "funcionamiento",
        x: 650, y: 350,
        definicion: "Rama que explica **qué papel cumple cada dirección** dentro de una red: cuál identifica a la red completa, cuál a un equipo específico, cuál sirve para hablarle a todos al mismo tiempo y qué direcciones están reservadas para usos especiales.",
        simple: "Esta rama responde: dentro del rango de una red, ¿para qué sirve cada número?",
        ejemplo: "Red 192.168.1.0/24:\n  <span class='hl'>192.168.1.0</span>   → dirección de red\n  <span class='hl'>192.168.1.1</span>   → router (host)\n  <span class='hl'>192.168.1.25</span>  → PC alumno (host)\n  <span class='hl'>192.168.1.255</span> → broadcast",
        relaciones: ["direccion-red", "direccion-host", "broadcast", "direcciones-especiales"],
        diapositiva: "PPT 2 — Diapositivas 1-3",
        archivo: "Redes_Parte2.pptx"
    },
    {
        id: "direccion-red", tipo: "leaf", titulo: "Dirección de red",
        subtitulo: "Identifica a la red completa",
        categoria: "funcionamiento",
        x: 1050, y: 180,
        definicion: "La **dirección de red** es la **primera** dirección del rango. Tiene todos los bits de host en **0**. No se asigna a ningún equipo: representa a la red en su conjunto.",
        simple: "Es el 'nombre de la calle' completa. Nadie vive ahí, solo identifica al barrio.",
        ejemplo: "Red 192.168.1.0/24\n  Dirección de red: <span class='hl'>192.168.1.0</span>\n                    <span class='cm'>(host = .0, no se asigna)</span>",
        relaciones: ["mascara", "direccion-host", "broadcast"],
        diapositiva: "PPT 2 — Diapositiva 1",
        archivo: "Redes_Parte2.pptx"
    },
    {
        id: "direccion-host", tipo: "leaf", titulo: "Dirección de host",
        subtitulo: "Identifica a un equipo",
        categoria: "funcionamiento",
        x: 1100, y: 380,
        definicion: "Una **dirección de host** es la que se asigna efectivamente a un equipo (PC, impresora, celular). Son todas las direcciones entre la dirección de red y la de broadcast, **exclusivas**.",
        simple: "Es el 'número de la casa'. Cada equipo conectado necesita una dirección de host única.",
        ejemplo: "Red 192.168.1.0/24 admite 254 hosts:\n  <span class='hl'>192.168.1.1</span>   ← primer host\n  <span class='hl'>192.168.1.2</span>\n  ...\n  <span class='hl'>192.168.1.254</span> ← último host",
        relaciones: ["direccion-red", "broadcast", "asignacion-estatica", "asignacion-dinamica"],
        diapositiva: "PPT 2 — Diapositiva 2",
        archivo: "Redes_Parte2.pptx"
    },
    {
        id: "broadcast", tipo: "leaf", titulo: "Broadcast",
        subtitulo: "Mensaje para todos",
        categoria: "funcionamiento",
        x: 950, y: 550,
        definicion: "La **dirección de broadcast** es la **última** del rango, con todos los bits de host en **1**. Al enviar un paquete a esa dirección, **todos los equipos de la red** lo reciben al mismo tiempo.",
        simple: "Es el 'altoparlante' de la red: cuando algo va a esa dirección, se escucha en todos los equipos.",
        ejemplo: "Red 192.168.1.0/24\n  Broadcast: <span class='hl'>192.168.1.255</span>\n\n<span class='cm'># Usado por DHCP, ARP y descubrimiento de servicios</span>",
        relaciones: ["direccion-red", "direccion-host", "dhcp"],
        diapositiva: "PPT 2 — Diapositiva 3",
        archivo: "Redes_Parte2.pptx"
    },
    {
        id: "direcciones-especiales", tipo: "leaf", titulo: "Direcciones especiales",
        subtitulo: "Reservadas por protocolo",
        categoria: "funcionamiento",
        x: 780, y: 560,
        definicion: "Algunos rangos están **reservados** y no se usan como IPs públicas normales:\n\n• **127.0.0.1** → *loopback*, el propio equipo\n• **0.0.0.0** → ruta por defecto / sin configurar\n• **169.254.x.x** → APIPA (fallo de DHCP)\n• **255.255.255.255** → broadcast limitado",
        simple: "Son direcciones que los sistemas operativos se guardan para usos internos, no se asignan a equipos.",
        ejemplo: "<span class='hl'>127.0.0.1</span>       → mi propio equipo (localhost)\n<span class='hl'>169.254.0.5</span>     → DHCP falló (autoasignación)\n<span class='hl'>0.0.0.0</span>         → ruta por defecto",
        relaciones: ["broadcast", "dhcp"],
        diapositiva: "PPT 2 — Diapositiva 4",
        archivo: "Redes_Parte2.pptx"
    },

    /* ============ OPERACIÓN ============ */
    {
        id: "operacion", tipo: "hub", titulo: "Operación",
        subtitulo: "Servicios y asignación",
        categoria: "operacion",
        x: -650, y: 350,
        definicion: "Rama que agrupa los conceptos **prácticos** del día a día: cuándo una IP es privada o pública, cómo se asigna (manual o automática), y los servicios que hacen funcionar Internet (DHCP, NAT, DNS).",
        simple: "Esta rama responde: en la vida real, ¿cómo se entregan y administran las IPs?",
        ejemplo: "En tu casa:\n  PC → pide IP → <span class='hl'>DHCP</span> del router\n  Router → traduce con <span class='hl'>NAT</span> a IP pública\n  Navegador → pregunta a <span class='hl'>DNS</span> por 'google.cl'",
        relaciones: ["ip-privada", "ip-publica", "asignacion-estatica", "asignacion-dinamica", "dhcp", "nat", "dns"],
        diapositiva: "PPT 2 — Diapositivas 5-10",
        archivo: "Redes_Parte2.pptx"
    },
    {
        id: "ip-privada", tipo: "leaf", titulo: "IP privada",
        subtitulo: "Solo dentro de la red local",
        categoria: "operacion",
        x: -1050, y: 180,
        definicion: "Una **IP privada** solo es válida **dentro de una red local** (LAN). Son rangos reservados que cualquiera puede reutilizar en su casa o empresa:\n\n• 10.0.0.0/8\n• 172.16.0.0/12\n• 192.168.0.0/16",
        simple: "Es la IP que te entrega tu router en casa o en el liceo. Funciona adentro, pero no en Internet.",
        ejemplo: "Tu PC en el laboratorio:  <span class='hl'>192.168.1.25</span>\nTu PC en tu casa:         <span class='hl'>192.168.0.10</span>\n<span class='cm'># Mismos rangos reutilizados en distintas redes</span>",
        relaciones: ["ip-publica", "nat", "clases-red", "dhcp"],
        diapositiva: "PPT 2 — Diapositiva 5",
        archivo: "Redes_Parte2.pptx"
    },
    {
        id: "ip-publica", tipo: "leaf", titulo: "IP pública",
        subtitulo: "Única en Internet",
        categoria: "operacion",
        x: -1130, y: 380,
        definicion: "Una **IP pública** es **única en todo Internet** y la asigna el proveedor (ISP). Permite que un equipo o servidor sea alcanzable desde cualquier parte del mundo.",
        simple: "Es la 'matrícula internacional' de tu conexión: todas las páginas web del mundo usan IPs públicas.",
        ejemplo: "IP pública de ejemplo:\n  <span class='hl'>200.14.28.47</span>  ← entregada por tu ISP\n\n<span class='cm'># Cuando visitas una web, tu IP pública aparece del otro lado</span>",
        relaciones: ["ip-privada", "nat", "dns"],
        diapositiva: "PPT 2 — Diapositiva 6",
        archivo: "Redes_Parte2.pptx"
    },
    {
        id: "asignacion-estatica", tipo: "leaf", titulo: "Asignación estática",
        subtitulo: "IP fija, manual",
        categoria: "operacion",
        x: -950, y: 560,
        definicion: "En la **asignación estática** el administrador configura **manualmente** la IP en el equipo. La dirección **no cambia** aunque se reinicie el equipo. Se usa en servidores, impresoras y routers.",
        simple: "Es escribir la IP 'a mano' y que el equipo la mantenga siempre igual.",
        ejemplo: "Configurar manualmente en el PC:\n  IP:       <span class='hl'>192.168.1.50</span>\n  Máscara:  <span class='hl'>255.255.255.0</span>\n  Gateway:  <span class='hl'>192.168.1.1</span>\n  DNS:      <span class='hl'>8.8.8.8</span>",
        relaciones: ["asignacion-dinamica", "direccion-host", "dhcp"],
        diapositiva: "PPT 2 — Diapositiva 7",
        archivo: "Redes_Parte2.pptx"
    },
    {
        id: "asignacion-dinamica", tipo: "leaf", titulo: "Asignación dinámica",
        subtitulo: "IP automática, vía DHCP",
        categoria: "operacion",
        x: -780, y: 600,
        definicion: "En la **asignación dinámica** el equipo pide una IP a un servidor **DHCP** cada vez que se conecta. La IP puede **cambiar** entre sesiones. Es lo más común en redes de usuarios.",
        simple: "El equipo llega a la red, pide 'una IP por favor' y el router le entrega una libre automáticamente.",
        ejemplo: "Al conectar el celular al WiFi del liceo:\n  <span class='num'>1.</span> El celular pregunta: ¿hay DHCP?\n  <span class='num'>2.</span> Router responde: toma <span class='hl'>192.168.1.47</span>\n  <span class='num'>3.</span> Celular usa esa IP hasta desconectarse",
        relaciones: ["dhcp", "asignacion-estatica", "direccion-host"],
        diapositiva: "PPT 2 — Diapositiva 7",
        archivo: "Redes_Parte2.pptx"
    },
    {
        id: "dhcp", tipo: "leaf", titulo: "DHCP",
        subtitulo: "Dynamic Host Configuration Protocol",
        categoria: "operacion",
        x: -550, y: 600,
        definicion: "**DHCP** es el protocolo que **entrega IPs automáticamente** a los equipos de una red. Además de la IP, entrega máscara, puerta de enlace y servidores DNS. Vive normalmente en el router.",
        simple: "Es el 'repartidor' de direcciones IP: cada vez que un equipo se conecta, DHCP le entrega todo lo necesario para funcionar.",
        ejemplo: "Respuesta típica de un DHCP:\n  IP:       <span class='hl'>192.168.1.47</span>\n  Máscara:  <span class='hl'>255.255.255.0</span>\n  Gateway:  <span class='hl'>192.168.1.1</span>\n  DNS:      <span class='hl'>8.8.8.8</span>, <span class='hl'>1.1.1.1</span>\n  Lease:    24 horas",
        relaciones: ["asignacion-dinamica", "broadcast", "ip-privada", "dns"],
        diapositiva: "PPT 2 — Diapositiva 8",
        archivo: "Redes_Parte2.pptx"
    },
    {
        id: "nat", tipo: "leaf", titulo: "NAT",
        subtitulo: "Network Address Translation",
        categoria: "operacion",
        x: -340, y: 560,
        definicion: "**NAT** traduce las **IPs privadas** de una red local a una única **IP pública** para salir a Internet. Por eso 20 equipos en una casa pueden navegar usando una sola IP pública.",
        simple: "Es el 'traductor' que tiene tu router: adentro todos tenemos IPs privadas, pero hacia Internet salimos como una sola IP pública.",
        ejemplo: "LAN interna:              Internet:\n  PC  <span class='hl'>192.168.1.10</span>  →\n  Tel <span class='hl'>192.168.1.11</span>  →   <span class='hl'>200.14.28.47</span>\n  Tab <span class='hl'>192.168.1.12</span>  →   (IP pública única)\n\n<span class='cm'># Router hace la traducción con NAT</span>",
        relaciones: ["ip-privada", "ip-publica"],
        diapositiva: "PPT 2 — Diapositiva 9",
        archivo: "Redes_Parte2.pptx"
    },
    {
        id: "dns", tipo: "leaf", titulo: "DNS",
        subtitulo: "Domain Name System",
        categoria: "operacion",
        x: -200, y: 400,
        definicion: "**DNS** es el servicio que **traduce nombres de dominio** (como `google.cl`) a **direcciones IP** reales. Sin DNS tendríamos que memorizar números en vez de nombres para navegar.",
        simple: "Es la 'guía telefónica' de Internet: tú escribes un nombre y DNS te dice la IP verdadera.",
        ejemplo: "Al escribir en el navegador:\n  <span class='hl'>www.google.cl</span>\n    ↓  (consulta DNS)\n  <span class='hl'>142.250.80.67</span>\n    ↓\n  El navegador se conecta a esa IP",
        relaciones: ["ip-publica", "dhcp"],
        diapositiva: "PPT 2 — Diapositiva 10",
        archivo: "Redes_Parte2.pptx"
    }
];

/* Aristas del grafo (padre → hijo).
   Por defecto se derivan desde el hub de cada categoría. */
const EDGES = [
    // Raíz → hubs
    { from: "root", to: "identificacion" },
    { from: "root", to: "organizacion" },
    { from: "root", to: "funcionamiento" },
    { from: "root", to: "operacion" },

    // Identificación
    { from: "identificacion", to: "direccion-ip" },
    { from: "identificacion", to: "ipv4" },
    { from: "identificacion", to: "octetos" },
    { from: "identificacion", to: "binario" },
    { from: "identificacion", to: "conversion" },

    // Organización
    { from: "organizacion", to: "clases-red" },
    { from: "organizacion", to: "mascara" },
    { from: "organizacion", to: "prefijo" },

    // Funcionamiento
    { from: "funcionamiento", to: "direccion-red" },
    { from: "funcionamiento", to: "direccion-host" },
    { from: "funcionamiento", to: "broadcast" },
    { from: "funcionamiento", to: "direcciones-especiales" },

    // Operación
    { from: "operacion", to: "ip-privada" },
    { from: "operacion", to: "ip-publica" },
    { from: "operacion", to: "asignacion-estatica" },
    { from: "operacion", to: "asignacion-dinamica" },
    { from: "operacion", to: "dhcp" },
    { from: "operacion", to: "nat" },
    { from: "operacion", to: "dns" }
];

/* Índices rápidos */
const NODE_MAP = Object.fromEntries(NODES.map(n => [n.id, n]));
