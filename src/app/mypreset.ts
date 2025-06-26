import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura'



const MyPreset = definePreset(Aura, {

    semantic: {
        primary: {
            50: '{green.50}',
            100: '{green.400}',
            200: '{green.500}',
            300: '{green.600}',
            400: '{green.700}',
            500: '{green.500}',
            600: '{green.500}',
            700: '{green.500}',
            800: '{green.500}',
            900: '{green.500}',
            950: '{green.500}'
        },
        surface : {
            color: {
                600: '#6c757d', // Podría ser el color para texto secundario
          700: '#495057', // Un gris oscuro para texto general
          800: '#343a40',
          900: '#212529', // <-- Color de texto principal (generalmente `var(--text-color)`)
          950: '#1a1d20'  
            }
        }
        
    }
});



export default MyPreset;
