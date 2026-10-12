import figma from '@figma/code-connect'
import { Dropdown } from '../src/lib/Dropdown'

figma.connect(Dropdown, 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=738-3496', {
  props: {
    variant: figma.enum('use cae', {
      simple:             'simple',
      'with dividers':    'with-dividers',
      'with minimal menu icon': 'minimal',
    }),
  },
  example: ({ variant }) => (
    <Dropdown variant={variant} options={[{ label: 'Option 1', value: '1' }]} />
  ),
})
