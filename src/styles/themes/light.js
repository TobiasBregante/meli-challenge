import { createTheme, NextUIProvider, Text } from "@nextui-org/react"
const lightTheme = createTheme({
    type: "light",
    theme: {
        colors: {
            primary: '#D90429',
            secondary: '#EF233C',
            thertiary: '#EDF2F4',
            blue: '#2B2D42',
            blue_light: '#8D99AE',
            whatsapp: "#25d366"
        },
    }
})

// $shadow-blue: #778da9ff;
// $honeydew: #ecfff8ff;
// $fuchsia-rose: #c94277ff;
// $purple: #5f00baff;
// $sandy-brown: #f4a261ff;

export default lightTheme