import figma from '@figma/code-connect'
import { ClickableLink } from '../src/lib/ClickableLink'

figma.connect(ClickableLink, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=574-60', {
  props: {
    size:  figma.enum('Size', { SM: 'sm', Large: 'lg' }),
    color: figma.enum('Color', { Blue: 'blue', 'Dark Blue': 'navy' }),
    form:  figma.enum('Form', { Normal: 'normal', Line: 'underline' }),
  },
  example: ({ size, color, form }) => (
    <ClickableLink size={size} color={color} form={form} href="#">Link text</ClickableLink>
  ),
})
