import figma from '@figma/code-connect'
import { InfoSection } from '../src/lib/InfoSection'

figma.connect(InfoSection, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=747-9493', {
  props: {
    align: figma.enum('Aling', { One: 'center', Two: 'left' }),
  },
  example: ({ align }) => (
    <InfoSection align={align} title="Section title" description="Description text" />
  ),
})
