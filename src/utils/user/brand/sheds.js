const sheds = [{
    shed: "GALERIAS",
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.251300780364!2d-58.47948052885518!3d-34.72405947806682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3d15fd2cded10201!2sLa%20Salada%20Punta%20Mogote!5e0!3m2!1ses-419!2sar!4v1661968176091!5m2!1ses-419!2sar",
    galleries:[{
        name:"QUIVINCHA",
        hallways:["Rojo","Amarillo","Verde"],
    },{
        name:"COLORES",
        hallways:["Rojo","Amarillo","Verde"],

    },
    {
        name:"FELIPE",
        hallways:["Rojo","Amarillo","Verde"],
        sides:["Pasillo","Afuera"]
    },{
        name:"27 DE MAYO",
        hallways:[1,2,3,4],
        sides:["Pasillo","Afuera","Lateral"]
    },{
        name:"GAL. AMALIA",
    },{
        name:"TILKARA",
    },{
        name:"GAL. VALENCIA",
        sides:["Pasillo","Al fondo"]
    },{
        name:"MARÍA CONCEPCIÓN",
        sides:["Pasillo","Al fondo"]
    },{
        name:"GAL. MILAGROS",
        sides:["Pasillo","Al fondo"]
    },{
        name:"GAL. SAN JORGE",
        sides:["Pasillo","Al fondo"]
    },{
        name:"FACTORY",
        hallways:["A","B","C","D"],
        sides:["Pasillo","Al fondo"]
    },{
        name:"IMPERIO",
        hallways:[1,2,3],
        sides:["Pasillo","Al fondo"]
    },{
        name:"El TRÉBOL",
        sides:["Pasillo","Al fondo"]
    },{
        name:"LA UNIÓN",
        sides:["Pasillo","Al fondo"]
    },{
        name:"JR",
        sides:["Pasillo","Al fondo"]
    },{
        name:"TRINIDAD",
        sides:["Pasillo","Al fondo"]
    },{
        name:"ARCO IRIS",
        hallways:["A","B"],
        sides:["Pasillo","Al fondo"]
    },{
        name:"EL ÁRBOL",
        hallways:["AMARILLO","VERDE","CELESTE"],
        sides:["Pasillo","Lateral"],
        requestRow:true
    },{
        name:"ANGIE",
        sides:["Pasillo","Al fondo"]
    },{
        name:"COTY",
        sides:["Pasillo","Afuera","Lateral"],
        stallLetter:true
    },{
        name:"SAN CAYETANO",
    },{
        name:"JJ VALLE 3062",
    },{
        name:"LA ARAÑITA",
    },{
        name:"VIRGILIO",
        hallways:["A","B","C","D","E"]
    }]
},{
    shed:"LOS KOREANOS",
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1378.8245366603808!2d-58.47612711419445!3d-34.71990967333496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccf28651ba4a1%3A0xf445c3475d5e37d7!2sGaleria%20los%20koreanos!5e0!3m2!1ses-419!2sar!4v1661968485864!5m2!1ses-419!2sar",
    floors:["PB","1"],
    sides:["Pasillo","Afuera","Lateral"],
    requestHallway:true
},{
    shed:"PUNTA MOGOTE",
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.3114621382333!2d-58.47742059233173!3d-34.72254275385594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcce8619f93d77%3A0x3fa36660f6bf5fa7!2sFeria%20Punta%20Mogote%20(La%20Salada)!5e0!3m2!1ses-419!2sar!4v1661968355308!5m2!1ses-419!2sar",
    floors:["PB","1", "Terma" ],
    sides:["Pasillo","Afuera","Lateral"],
    requestHallway:true
},{
    shed:"OCEAN",
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.2677403397574!2d-58.47906210424884!3d-34.72364502712098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccfb33a45966d%3A0xf691e01e96ebd688!2sFERIA%20OCEAN!5e0!3m2!1ses-419!2sar!4v1661968287568!5m2!1ses-419!2sar",
    floors:["PB","1"],
    sides:["Pasillo","Afuera","Lateral"],
    requestHallway:true
},{
    shed:"URKUPIÑA",
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.3114621382333!2d-58.47742059233173!3d-34.72254275385594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbf179bd9cbd13e52!2sFeria%20Urkupi%C3%B1a%20s.a.Paseo%20de%20compras%20Gonzalo%20R.%20Rojas!5e0!3m2!1ses-419!2sar!4v1661968397670!5m2!1ses-419!2sar",
    requestHallway:true,
    requestRow: true,
    sides:["Pasillo","Lateral"],
},{
    shed:"ATLANTIDA",
    map:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.2677403397574!2d-58.47906210424884!3d-34.72364502712098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcaefb23d746cefed!2sFeria%20Atlantida!5e0!3m2!1ses-419!2sar!4v1661968319308!5m2!1ses-419!2sar"
}]

export default sheds