import figma from '@figma/code-connect'
import { Accordion, AccordionGroup } from '../src/lib/Accordion'

figma.connect(AccordionGroup, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=740-27940', {
  props: {
    size: figma.enum('Sizes', { Mobile: 'mobile', Desktop: 'desktop' }),
  },
  example: ({ size }) => (
    <AccordionGroup size={size}>
      <Accordion title="Section title">Content goes here</Accordion>
      <Accordion title="Section title">Content goes here</Accordion>
    </AccordionGroup>
  ),
})
