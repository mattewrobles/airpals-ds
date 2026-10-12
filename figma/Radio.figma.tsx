import figma from '@figma/code-connect'
import { Radio } from '../src/lib/Radio'

figma.connect(Radio, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=583-215', {
  props: {
    size:     figma.enum('Size', { '16px': 'md', '14px': 'sm' }),
    position: figma.enum('Position', { Derecha: 'right', Izquierda: 'left' }),
  },
  example: ({ size, position }) => (
    <Radio size={size} labelPosition={position} label="Option label" value="option" />
  ),
})
