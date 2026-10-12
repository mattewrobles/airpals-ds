import figma from '@figma/code-connect'
import { TableCell } from '../src/lib/Table'

figma.connect(TableCell, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=742-59045', {
  props: {
    type: figma.enum('Type', {
      'Text + Subtext': 'text',
      More:             'more',
      Empty:            'empty',
      Toggle:           'toggle',
      'Avatar Group':   'avatar-group',
      Badge:            'badge',
      'Link Button':    'link',
    }),
    text:    figma.string('↳ Text#1376:14'),
    subtext: figma.string('↳ Subtext#1376:28'),
  },
  example: ({ type, text, subtext }) => (
    <TableCell type={type} text={text} subtext={subtext} />
  ),
})
